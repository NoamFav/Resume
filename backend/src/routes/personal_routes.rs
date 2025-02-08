// backend/src/routes/personal_routes.rs
use actix_web::{
    web::{self, Data},
    HttpResponse, Responder,
};
use diesel::{r2d2::ConnectionManager, MysqlConnection};
use r2d2::Pool;

use crate::models::{Contact, Education, Social, WorkExperience};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/personal/work", web::get().to(get_work_experience));
    cfg.route(
        "/personal/work/{id}",
        web::get().to(get_work_experience_by_id),
    );
    cfg.route("/personal/work/new", web::post().to(post_work_experience));
    cfg.route(
        "/personal/work/{id}/update",
        web::put().to(put_work_experience),
    );
    cfg.route(
        "/personal/work/{id}/delete",
        web::delete().to(delete_work_experience),
    );

    cfg.route("/personal/socials", web::get().to(get_socials));
    cfg.route("/personal/socials/{id}", web::get().to(get_social_by_id));
    cfg.route("/personal/socials/new", web::post().to(post_social));
    cfg.route("/personal/socials/{id}/update", web::put().to(put_social));
    cfg.route(
        "/personal/socials/{id}/delete",
        web::delete().to(delete_social),
    );

    cfg.route("/personal/contacts", web::get().to(get_contacts));
    cfg.route("/personal/contacts/{id}", web::get().to(get_contact_by_id));
    cfg.route("/personal/contacts/new", web::post().to(post_contact));
    cfg.route("/personal/contacts/{id}/update", web::put().to(put_contact));
    cfg.route(
        "/personal/contacts/{id}/delete",
        web::delete().to(delete_contact),
    );

    cfg.route("/personal/educations", web::get().to(get_educations));
    cfg.route(
        "/personal/educations/{id}",
        web::get().to(get_education_by_id),
    );
    cfg.route("/personal/educations/new", web::post().to(post_education));
    cfg.route(
        "/personal/educations/{id}/update",
        web::put().to(put_education),
    );
    cfg.route(
        "/personal/educations/{id}/delete",
        web::delete().to(delete_education),
    );

    cfg.route(
        "/personal/certifications",
        web::get().to(get_certifications),
    );
    cfg.route(
        "/personal/certifications/{id}",
        web::get().to(get_certification_by_id),
    );
    cfg.route(
        "/personal/certifications/new",
        web::post().to(post_certification),
    );
    cfg.route(
        "/personal/certifications/{id}/update",
        web::put().to(put_certification),
    );
    cfg.route(
        "/personal/certifications/{id}/delete",
        web::delete().to(delete_certification),
    );
}

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

async fn get_work_experience_by_id() -> impl Responder {
    HttpResponse::Ok().body("Work experience will be listed here")
}

async fn post_work_experience() -> impl Responder {
    HttpResponse::Ok().body("Work experience will be listed here")
}

async fn put_work_experience() -> impl Responder {
    HttpResponse::Ok().body("Work experience will be listed here")
}

async fn delete_work_experience() -> impl Responder {
    HttpResponse::Ok().body("Work experience will be listed here")
}

async fn get_work_experience(pool: Data<DbPool>) -> impl Responder {
    let work_experience = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match WorkExperience::all(&mut conn) {
            Ok(experience) => experience,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to load work experience")
            }
        }
    };

    HttpResponse::Ok().json(work_experience)
}

async fn get_socials(pool: Data<DbPool>) -> impl Responder {
    let socials = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match Social::all(&mut conn) {
            Ok(socials) => socials,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load socials"),
        }
    };

    HttpResponse::Ok().json(socials)
}

async fn get_social_by_id() -> impl Responder {
    HttpResponse::Ok().body("Socials will be listed here")
}

async fn post_social() -> impl Responder {
    HttpResponse::Ok().body("Socials will be listed here")
}

async fn put_social() -> impl Responder {
    HttpResponse::Ok().body("Socials will be listed here")
}

async fn delete_social() -> impl Responder {
    HttpResponse::Ok().body("Socials will be listed here")
}

async fn get_contacts(pool: Data<DbPool>) -> impl Responder {
    let contacts = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match Contact::all(&mut conn) {
            Ok(contacts) => contacts,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load contacts"),
        }
    };

    HttpResponse::Ok().json(contacts)
}

async fn get_contact_by_id() -> impl Responder {
    HttpResponse::Ok().body("Contacts will be listed here")
}

async fn post_contact() -> impl Responder {
    HttpResponse::Ok().body("Contacts will be listed here")
}

async fn put_contact() -> impl Responder {
    HttpResponse::Ok().body("Contacts will be listed here")
}

async fn delete_contact() -> impl Responder {
    HttpResponse::Ok().body("Contacts will be listed here")
}

async fn get_educations(pool: Data<DbPool>) -> impl Responder {
    let educations = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match Education::all(&mut conn) {
            Ok(educations) => educations,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load educations"),
        }
    };

    HttpResponse::Ok().json(educations)
}

async fn get_education_by_id() -> impl Responder {
    HttpResponse::Ok().body("Educations will be listed here")
}

async fn post_education() -> impl Responder {
    HttpResponse::Ok().body("Educations will be listed here")
}

async fn put_education() -> impl Responder {
    HttpResponse::Ok().body("Educations will be listed here")
}

async fn delete_education() -> impl Responder {
    HttpResponse::Ok().body("Educations will be listed here")
}

async fn get_certifications() -> impl Responder {
    HttpResponse::Ok().body("Certifications will be listed here")
}

async fn get_certification_by_id() -> impl Responder {
    HttpResponse::Ok().body("Certifications will be listed here")
}

async fn post_certification() -> impl Responder {
    HttpResponse::Ok().body("Certifications will be listed here")
}

async fn put_certification() -> impl Responder {
    HttpResponse::Ok().body("Certifications will be listed here")
}

async fn delete_certification() -> impl Responder {
    HttpResponse::Ok().body("Certifications will be listed here")
}
