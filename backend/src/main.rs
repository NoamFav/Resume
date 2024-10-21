// backend/src/main.rs
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use log::info;

// Module declarations
mod config;
mod database;
mod models;
mod routes;
mod services;

// A simple handler for the root path
async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize configuration and logging
    config::init();

    info!("Starting server at http://0.0.0.0:8000");

    // Create the database pool
    let pool = database::connect().await;

    // Start the HTTP server
    HttpServer::new(move || {
        App::new()
            .data(pool.clone()) // Make the pool available to handlers
            .configure(routes::user_routes::config) // Register user routes
            .configure(routes::auth_routes::config) // Register auth routes
            .route("/", web::get().to(index)) // Root route
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
