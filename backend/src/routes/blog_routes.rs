// backend/src/routes/blog_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/blog", web::get().to(get_blog_posts));
    cfg.route("/blog/{id}", web::get().to(get_blog_post_by_id));
    cfg.route("/blog/new", web::post().to(post_blog_post));
    cfg.route("/blog/{id}/update", web::put().to(put_blog_post));
    cfg.route("/blog/{id}/delete", web::delete().to(delete_blog_post));
    cfg.route("/blog/{id}/comments", web::get().to(get_blog_post_comments));
    cfg.route(
        "/blog/{id}/comments/new",
        web::post().to(post_blog_post_comment),
    );
    cfg.route(
        "/blog/{id}/comments/{comment_id}/update",
        web::put().to(put_blog_post_comment),
    );
    cfg.route(
        "/blog/{id}/comments/{comment_id}/delete",
        web::delete().to(delete_blog_post_comment),
    );
    cfg.route("/blog/{id}/likes", web::get().to(get_blog_post_likes));
    cfg.route("/blog/{id}/likes/new", web::post().to(post_blog_post_like));
    cfg.route(
        "/blog/{id}/likes/{like_id}/delete",
        web::delete().to(delete_blog_post_like),
    );
    cfg.route(
        "/blog/{id}/comments/{comment_id}/likes",
        web::get().to(get_blog_post_comment_likes),
    );
    cfg.route(
        "/blog/{id}/comments/{comment_id}/likes/new",
        web::post().to(post_blog_post_comment_like),
    );
    cfg.route(
        "/blog/{id}/comments/{comment_id}/likes/{like_id}/delete",
        web::delete().to(delete_blog_post_comment_like),
    );
}

async fn get_blog_posts() -> impl Responder {
    HttpResponse::Ok().body("Blog posts will be listed here")
}

async fn get_blog_post_by_id() -> impl Responder {
    HttpResponse::Ok().body("Blog post will be displayed here")
}

async fn post_blog_post() -> impl Responder {
    HttpResponse::Ok().body("Blog post will be created here")
}

async fn put_blog_post() -> impl Responder {
    HttpResponse::Ok().body("Blog post will be updated here")
}

async fn delete_blog_post() -> impl Responder {
    HttpResponse::Ok().body("Blog post will be deleted here")
}

async fn get_blog_post_comments() -> impl Responder {
    HttpResponse::Ok().body("Blog post comments will be listed here")
}

async fn post_blog_post_comment() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment will be created here")
}

async fn put_blog_post_comment() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment will be updated here")
}

async fn delete_blog_post_comment() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment will be deleted here")
}

async fn get_blog_post_likes() -> impl Responder {
    HttpResponse::Ok().body("Blog post likes will be listed here")
}

async fn post_blog_post_like() -> impl Responder {
    HttpResponse::Ok().body("Blog post like will be created here")
}

async fn delete_blog_post_like() -> impl Responder {
    HttpResponse::Ok().body("Blog post like will be deleted here")
}

async fn get_blog_post_comment_likes() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment likes will be listed here")
}

async fn post_blog_post_comment_like() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment like will be created here")
}

async fn delete_blog_post_comment_like() -> impl Responder {
    HttpResponse::Ok().body("Blog post comment like will be deleted here")
}
