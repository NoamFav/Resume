// backend/src/routes/git_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/git", web::get().to(get_git_repositories));
    cfg.route("/git/{id}", web::get().to(get_git_repository_by_id));
}

async fn get_git_repositories() -> impl Responder {
    HttpResponse::Ok().body("Git repositories will be listed here")
}

async fn get_git_repository_by_id() -> impl Responder {
    HttpResponse::Ok().body("Git repository will be shown here")
}
