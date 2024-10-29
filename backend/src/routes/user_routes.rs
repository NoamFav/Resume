// backend/src/routes/user_routes.rs
use actix_web::{web, HttpResponse, Responder};
use crate::models::{User, Achievement, NewUser, NewUserImage, NewAchievement, UpdateUser};
use crate::schema::{users, user_image, achievements};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::mysql::MysqlConnection;
use actix_web::web::{Data, Path, Json};
use serde_json::json;
use diesel::prelude::*;
use diesel::QueryDsl;
use diesel::RunQueryDsl;

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/user", web::get().to(get_users));
    cfg.route("/user/{id}", web::get().to(get_user_by_id));
    cfg.route("/user/{id}/achievements", web::get().to(get_user_achievements));
    cfg.route("/user/new", web::post().to(post_user));

    cfg.route("/user/{id}/image/new", web::post().to(post_user_image));
    cfg.route("/user/{id}/image/{image_id}/update", web::put().to(put_user_image));
    cfg.route("/user/{id}/image/{image_id}/delete", web::delete().to(delete_user_image));

    cfg.route("/user/{id}/update", web::put().to(put_user));
    cfg.route("/user/{id}/delete", web::delete().to(delete_user));
    cfg.route("/user/{id}/achievements/new", web::post().to(post_user_achievement));
}

async fn get_users(pool: Data<DbPool>) -> impl Responder {
    let users = {
        let mut conn = pool.get().expect("Failed to get DB connection from pool");
        User::all(&mut conn).expect("Failed to load users")
    };

    HttpResponse::Ok().json(users)
}

async fn get_user_by_id(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let user_id = id.into_inner();
    let user = {
        let mut conn = pool.get().expect("Failed to get DB connection from pool");
        User::find_by_id(user_id, &mut conn).ok()
    };

    match user {
        Some(user) => HttpResponse::Ok().json(user),
        None => HttpResponse::NotFound().json(json!({"error": "User not found"})),
    }
}

async fn get_user_achievements(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let user_id = id.into_inner();
    let achievements = {
        let mut conn = pool.get().expect("Failed to get DB connection from pool");
        Achievement::find_by_user_id(user_id, &mut conn).expect("Failed to load achievements")
    };

    HttpResponse::Ok().json(achievements)
}

async fn post_user(pool: Data<DbPool>, new_user: Json<NewUser>) -> impl Responder {
    let mut conn = pool.get().expect("Failed to get DB connection from pool");
    let new_user = new_user.into_inner();

    let result = diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Created().json("User created successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to create user: {:?}", err)})),
    }
}

async fn put_user(pool: Data<DbPool>, id: Path<i32>, updated_user: Json<UpdateUser>) -> impl Responder {
    let user_id = id.into_inner();
    let mut conn = pool.get().expect("Failed to get DB connection from pool");

    let result = diesel::update(users::table.find(user_id))
        .set(&updated_user.into_inner())
        .execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Ok().json("User updated successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to update user: {:?}", err)})),
    }
}

async fn delete_user(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let user_id = id.into_inner();
    let mut conn = pool.get().expect("Failed to get DB connection from pool");

    let result = diesel::delete(users::table.find(user_id)).execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Ok().json("User deleted successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to delete user: {:?}", err)})),
    }
}

async fn post_user_achievement(pool: Data<DbPool>, id: Path<i32>, new_achievement: Json<NewAchievement>) -> impl Responder {
    let user_id = id.into_inner();
    let mut conn = pool.get().expect("Failed to get DB connection from pool");

    let mut achievement = new_achievement.into_inner();
    achievement.user_id = user_id; // Associate with user

    let result = diesel::insert_into(achievements::table)
        .values(&achievement)
        .execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Created().json("Achievement created successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to create achievement: {:?}", err)})),
    }
}

async fn post_user_image(
    pool: web::Data<DbPool>,
    id: web::Path<i32>,
    image_data: web::Json<NewUserImage>,
) -> impl Responder {
    let user_id = id.into_inner();
    let new_image = NewUserImage {
        user_id,
        image_url: image_data.image_url.clone(),
        caption: image_data.caption.clone(),
        alt_text: image_data.alt_text.clone(),
        uploaded_at: Some(chrono::Local::now().naive_local()), // Optional timestamp
    };

    let mut conn = pool.get().expect("Failed to get a DB connection from the pool");

    match diesel::insert_into(user_image::table)
        .values(&new_image)
        .execute(&mut conn)
    {
        Ok(_) => HttpResponse::Ok().json("Image added successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to add image: {:?}", err)})),
    }
}

async fn put_user_image(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32)>,
    updated_image: web::Json<NewUserImage>,
) -> impl Responder {
    let (user_id, image_id) = path.into_inner();

    let mut conn = pool.get().expect("Failed to get a DB connection from the pool");

    let result = diesel::update(user_image::table.find(image_id))
        .set((
            user_image::image_url.eq(&updated_image.image_url),
            user_image::caption.eq(&updated_image.caption),
            user_image::alt_text.eq(&updated_image.alt_text),
        ))
        .execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Ok().json("Image updated successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to update image: {:?}", err)})),
    }
}

async fn delete_user_image(
    pool: web::Data<DbPool>,
    path: web::Path<(i32, i32)>,
) -> impl Responder {
    let (user_id, image_id) = path.into_inner();

    let mut conn = pool.get().expect("Failed to get a DB connection from the pool");

    let result = diesel::delete(user_image::table.find(image_id))
        .execute(&mut conn);

    match result {
        Ok(_) => HttpResponse::Ok().json("Image deleted successfully"),
        Err(err) => HttpResponse::InternalServerError().json(json!({"error": format!("Failed to delete image: {:?}", err)})),
    }
}
