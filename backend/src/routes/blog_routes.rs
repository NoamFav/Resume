// backend/src/routes/blog_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/blog", web::get().to(get_blog_posts));
}

async fn get_blog_posts() -> impl Responder {
    HttpResponse::Ok().body("Blog posts will be listed here")
}
