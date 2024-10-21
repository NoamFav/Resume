use actix_web::{web, App, HttpServer};
mod routes;
mod services;
mod models;
mod config;
mod database;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(routes::auth_routes::config)
            .configure(routes::user_routes::config)
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
