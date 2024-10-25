// backend/src/model/framework.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::frameworks;
use crate::models::programming_languages::ProgrammingLanguage;
use crate::models::roadmaps::Roadmaps;

#[derive(Queryable, Serialize, Deserialize, Debug, Associations)]
#[table_name = "frameworks"]
#[primary_key(frameworks_id)]
#[belongs_to(ProgrammingLanguage, foreign_key = "language_id")]
pub struct Framework {
    pub frameworks_id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
    pub language_id: Option<i32>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "framework_images"]
#[primary_key(image_id)]
#[belongs_to(Framework, foreign_key = "framework_id")]
pub struct FrameworkImage {
    pub image_id: i32,
    pub framework_id: Option<i32>,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "framework_roadmaps"]
#[primary_key(roadmap_id, framework_id)]
#[belongs_to(Framework, foreign_key = "framework_id")]
#[belongs_to(Roadmaps, foreign_key = "roadmap_id")]
pub struct FrameworkRoadmap {
    pub roadmap_id: i32,
    pub framework_id: i32,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl Framework {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<Framework>> {
        frameworks::table.load::<Framework>(conn)
    }
}

impl FrameworkImage {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<FrameworkImage>> {
        framework_images::table.load::<FrameworkImage>(conn)
    }
}

impl FrameworkRoadmap {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<FrameworkRoadmap>> {
        framework_roadmaps::table.load::<FrameworkRoadmap>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "frameworks"]
pub struct NewFramework {
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
    pub language_id: Option<i32>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "framework_images"]
pub struct NewFrameworkImage {
    pub framework_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "framework_roadmaps"]
pub struct NewFrameworkRoadmap {
    pub framework_id: i32,
    pub roadmap_id: i32,
}
