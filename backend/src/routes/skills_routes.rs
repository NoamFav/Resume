// backend/src/routes/skills_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/skills", web::get().to(get_skills));
}

async fn get_skills() -> impl Responder {
    HttpResponse::Ok().body("Skills will be listed here")
}
