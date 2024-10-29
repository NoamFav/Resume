// backend/src/routes/auth_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/login", web::get().to(login));
    cfg.route("/register", web::post().to(register));
    cfg.route("/logout", web::get().to(logout));
}

async fn login() -> impl Responder {
    HttpResponse::Ok().json("Login Successful")
}

async fn register() -> impl Responder {
    HttpResponse::Ok().json("Registration Successful")
}

async fn logout() -> impl Responder {
    HttpResponse::Ok().json("Logout Successful")
}
