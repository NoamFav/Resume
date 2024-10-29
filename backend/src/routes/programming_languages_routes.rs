use actix_web::{web, HttpResponse, Responder};
use crate::models::{ProgrammingLanguage, ProgrammingLanguageImage, ProgrammingLanguageRoadmap};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::mysql::MysqlConnection;
use actix_web::web::{Data, Path};
use serde_json::{json, Value};

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/programming_languages", web::get().to(get_programming_languages));
    cfg.route("/programming_languages/{id}/roadmaps", web::get().to(get_programming_language_roadmaps));
}

async fn get_programming_languages(pool: Data<DbPool>) -> impl Responder {
    let programming_languages = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProgrammingLanguage::all(&mut conn) {
            Ok(languages) => languages,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load programming languages"),
        }
    };

    let programming_language_images = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProgrammingLanguageImage::all(&mut conn) {
            Ok(images) => images,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load programming language images"),
        }
    };

    let merged_list = merged_programming_languages(programming_languages, programming_language_images);

    HttpResponse::Ok().json(merged_list)
}

async fn get_programming_language_roadmaps(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let language_id = id.into_inner();

    let programming_language_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProgrammingLanguageRoadmap::find_by_language_id(language_id, &mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load programming language roadmaps"),
        }
    };

    HttpResponse::Ok().json(programming_language_roadmaps)
}

fn merged_programming_languages(
    programming_languages: Vec<ProgrammingLanguage>,
    programming_language_images: Vec<ProgrammingLanguageImage>
) -> Vec<Value> {
    let mut merged_list = Vec::new();

    for programming_language in programming_languages {
        let matching_image = programming_language_images
            .iter()
            .find(|image| image.language_id == programming_language.language_id);

        // Construct JSON object with merged data
        let merged_json = json!({
            "id": programming_language.language_id,
            "name": programming_language.name,
            "image_url": matching_image.map(|img| img.image_url.clone()),
            "caption": matching_image.and_then(|img| img.caption.clone()),
            "alt_text": matching_image.and_then(|img| img.alt_text.clone()),
        });

        merged_list.push(merged_json);
    }

    merged_list
}
