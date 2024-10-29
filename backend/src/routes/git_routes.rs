// backend/src/routes/git_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/git", web::get().to(get_git_repositories));
}

async fn get_git_repositories() -> impl Responder {
    HttpResponse::Ok().body("Git repositories will be listed here")
}
