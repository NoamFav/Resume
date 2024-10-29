// backend/src/routes/projects_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/projects", web::get().to(get_projects));
}

async fn get_projects() -> impl Responder {
    HttpResponse::Ok().body("Projects will be listed here")
}
