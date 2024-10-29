// backend/src/routes/personal_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/personal", web::get().to(get_personal_info));
}

async fn get_personal_info() -> impl Responder {
    HttpResponse::Ok().body("Personal information will be listed here")
}
