// src/main.rs
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use log::info;

mod config;
mod database;
mod models;
mod routes;
mod services;
mod schema;

use models::ProgrammingLanguage;
use models::Framework;
use models::Tool;
use models::Roadmap;
use models::Project;
use models::Skill;

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

    let frameworks = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        Framework::all(&mut conn).expect("Failed to load frameworks")
    };

    let tools = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        Tool::all(&mut conn).expect("Failed to load tools")
    };

    let roadmaps = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        Roadmap::all(&mut conn).expect("Failed to load roadmaps")
    };

    let projects = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        Project::all(&mut conn).expect("Failed to load projects")
    };

    let skills = {
        let mut conn = pool.get().expect("Failed to get a connection from the pool");

        Skill::all(&mut conn).expect("Failed to load skills")
    };

    info!("Programming Languages: {:?}", programming_languages);
    info!("Frameworks: {:?}", frameworks);
    info!("Tools: {:?}", tools);
    info!("Roadmaps: {:?}", roadmaps);
    info!("Projects: {:?}", projects);
    info!("Skills: {:?}", skills);

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes::user_routes::config)
            .configure(routes::auth_routes::config)
            .configure(routes::programming_languages_routes::config)
            .configure(routes::frameworks_routes::config)
            .configure(routes::tools_routes::config)
            .configure(routes::roadmaps_routes::config)
            .configure(routes::projects_routes::config)
            .configure(routes::skills_routes::config)
            .configure(routes::personal_routes::config)
            .configure(routes::git_routes::config)
            .configure(routes::blog_routes::config)
            .route("/", web::get().to(index))
    })
    .bind(("0.0.0.0", 8000))?
    .run()
    .await
}
