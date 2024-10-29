// backend/src/routes/tools_routes.rs
use actix_web::{web, HttpResponse, Responder};
use crate::models::{Tool, ToolImage, ToolRoadmap};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::mysql::MysqlConnection;
use actix_web::web::{Data, Path};
use serde_json::{json, Value};

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/tools", web::get().to(get_tools));
    cfg.route("/tools/{id}/roadmaps", web::get().to(get_tool_roadmaps));
}

async fn get_tools(pool: Data<DbPool>) -> impl Responder {
    let tools = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match Tool::all(&mut conn) {
            Ok(tools) => tools,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load tools"),
        }
    };

    let tool_images = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ToolImage::all(&mut conn) {
            Ok(images) => images,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load tool images"),
        }
    };

    let merged_list = merged_tools(tools, tool_images);

    HttpResponse::Ok().json(merged_list)
}

async fn get_tool_roadmaps(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let tool_id = id.into_inner();

    let tool_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ToolRoadmap::find_by_tool_id(tool_id, &mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load tool roadmaps"),
        }
    };

    HttpResponse::Ok().json(tool_roadmaps)
}

fn merged_tools(tools: Vec<Tool>, tool_images: Vec<ToolImage>) -> Vec<Value> {
    let mut merged_list = Vec::new();
    for tool in tools {
        let matching_images = tool_images
            .iter()
            .find(|image| image.tools_id == tool.tools_id);

        let merged_json = json!({
            "id": tool.tools_id,
            "name": tool.name,
            "images_url": matching_images.map(|img| img.image_url.clone()),
            "caption": matching_images.map(|img| img.caption.clone()),
            "alt_text": matching_images.map(|img| img.alt_text.clone()),
        });

        merged_list.push(merged_json);
    }
    merged_list
}
