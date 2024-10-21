use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/login", web::get().to(login));
}

async fn login() -> impl Responder {
    HttpResponse::Ok().json("Login Successful")
}
