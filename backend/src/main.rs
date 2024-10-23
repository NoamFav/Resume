// src/main.rs
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use log::{info};

mod config;
mod database;
mod models;
mod routes;
mod services;
mod schema;

use models::ProgrammingLanguage;

async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    config::init();

    info!("Starting server at http://0.0.0.0:8000");

    let pool = database::establish_connection();
    info!("Connected to database");

    let programming_languages = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        ProgrammingLanguage::all(&mut conn).expect("Failed to load programming languages")
    };

    info!("Programming Languages: {:?}", programming_languages);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::user_routes::config)
            .configure(routes::auth_routes::config)
            .route("/", web::get().to(index))
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
