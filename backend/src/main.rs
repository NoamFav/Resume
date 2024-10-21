use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use env_logger::Env;
use log::info;

async fn index() -> impl Responder {
    HttpResponse::Ok().body("Hello, world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize the logger
    env_logger::Builder::from_env(Env::default().default_filter_or("info")).init();

    info!("Starting server at http://0.0.0.0:8000");

    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(index)) // Route for '/'
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
