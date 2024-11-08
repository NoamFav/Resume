use crate::models::frameworks::{Framework, FrameworkImage, FrameworkRoadmap};
use actix_web::web::{Data, Path};
use actix_web::{web, HttpResponse, Responder};
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use serde_json::{json, Value};

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/frameworks", web::get().to(get_frameworks));
    cfg.route(
        "/frameworks/{id}/roadmaps",
        web::get().to(get_frameworks_roadmaps),
    );
}

async fn get_frameworks(pool: Data<DbPool>) -> impl Responder {
    let frameworks = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match Framework::all(&mut conn) {
            Ok(frameworks) => frameworks,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load frameworks"),
        }
    };

    let framework_images = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match FrameworkImage::all(&mut conn) {
            Ok(images) => images,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to load framework images")
            }
        }
    };

    let merged_list = merge_frameworks(frameworks, framework_images);

    HttpResponse::Ok().json(merged_list)
}

async fn get_frameworks_roadmaps(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let framework_id = id.into_inner();

    let framework_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match FrameworkRoadmap::find_by_framework_id(framework_id, &mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => {
                return HttpResponse::InternalServerError()
                    .body("Failed to load framework roadmaps")
            }
        }
    };

    HttpResponse::Ok().json(framework_roadmaps)
}

fn merge_frameworks(
    frameworks: Vec<Framework>,
    framework_images: Vec<FrameworkImage>,
) -> Vec<Value> {
    let mut merged_list = Vec::new();

    for framework in frameworks {
        let matching_image = framework_images
            .iter()
            .find(|image| image.framework_id == framework.frameworks_id);

        let merged_json = json!({
            "id": framework.frameworks_id,
            "name": framework.name,
            "image_url": matching_image.map(|img| img.image_url.clone()),
            "caption": matching_image.and_then(|img| img.caption.clone()),
            "alt_text": matching_image.and_then(|img| img.alt_text.clone()),
        });

        merged_list.push(merged_json);
    }

    merged_list
}
