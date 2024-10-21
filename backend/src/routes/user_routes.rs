use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/user", web::get().to(get_user));
}

async fn get_user() -> impl Responder {
    HttpResponse::Ok().json("User Route")
}
