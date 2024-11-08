// backend/src/routes/skills_routes.rs
use crate::models::skills::{Skill, SkillRoadmap};
use actix_web::web::{Data, Path};
use actix_web::{web, HttpResponse, Responder};
use diesel::mysql::MysqlConnection;
use diesel::r2d2::{ConnectionManager, Pool};
use serde_json::{json, Value};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/skills", web::get().to(get_skills));
    cfg.route("/skill_roadmaps", web::get().to(get_skill_roadmaps));
}

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

async fn get_skills(pool: Data<DbPool>) -> impl Responder {
    let skills = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match Skill::all(&mut conn) {
            Ok(skills) => skills,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load skills"),
        }
    };

    HttpResponse::Ok().json(skills)
}

async fn get_skill_roadmaps(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let skill_id = id.into_inner();

    let skill_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to get DB connection")
            }
        };
        match SkillRoadmap::find_by_skill_id(skill_id, &mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => {
                return HttpResponse::InternalServerError().body("Failed to load skill roadmaps")
            }
        }
    };

    HttpResponse::Ok().json(skill_roadmaps)
}
