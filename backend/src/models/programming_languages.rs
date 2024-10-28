// backend/src/models/programming_languages.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use chrono::NaiveDateTime;
use crate::schema::programming_languages;
use crate::schema::programming_language_images;
use crate::schema::programming_language_roadmaps;
use crate::models::roadmaps::Roadmap;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_languages)]
#[diesel(primary_key(language_id))]
pub struct ProgrammingLanguage {
    pub language_id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_language_images)]
#[diesel(primary_key(image_id))]
#[diesel(belongs_to(ProgrammingLanguage, foreign_key = language_id))]
pub struct ProgrammingLanguageImage {
    pub image_id: i32,
    pub language_id: Option<i32>,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_language_roadmaps)]
#[diesel(primary_key(roadmap_id, language_id))]
#[diesel(belongs_to(ProgrammingLanguage, foreign_key = language_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct ProgrammingLanguageRoadmap {
    pub roadmap_id: i32,
    pub language_id: i32,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl ProgrammingLanguage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProgrammingLanguage>> {
        programming_languages::table.load::<ProgrammingLanguage>(conn)
    }
}

impl ProgrammingLanguageImage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProgrammingLanguageImage>> {
        programming_language_images::table.load::<ProgrammingLanguageImage>(conn)
    }
}

impl ProgrammingLanguageRoadmap {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProgrammingLanguageRoadmap>> {
        programming_language_roadmaps::table.load::<ProgrammingLanguageRoadmap>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_languages)]
pub struct NewProgrammingLanguage {
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_language_images)]
pub struct NewProgrammingLanguageImage {
    pub language_id: i32,
    pub image_url: String,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = programming_language_roadmaps)]
pub struct NewProgrammingLanguageRoadmap {
    pub language_id: i32,
    pub roadmap_id: i32,
}
