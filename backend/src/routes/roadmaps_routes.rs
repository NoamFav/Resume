// backend/src/routes/roadmaps_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/roadmaps", web::get().to(get_roadmaps));
}

async fn get_roadmaps() -> impl Responder {
    HttpResponse::Ok().body("Roadmaps will be listed here")
}
