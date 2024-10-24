// backend/src/model/tools.rs
use serde::{Deserialize, Serialize};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::tools;
use crate::schema::tools_image;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "tools"]
#[primary_key(tools_id)]
pub struct Tool {
    pub tools_id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: bool,
    pub learning: bool,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug, Associations)]
#[table_name = "tools_image"]
#[primary_key(image_id)]
#[belongs_to(Tool, foreign_key = "tools_id")]
pub struct ToolImage {
    pub image_id: i32,
    pub tools_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

impl Tool {
    pub fn all(conn: &mut MysqlConnection) -> QueryResult<Vec<Tool>> {
        tools::table.load::<Tool>(conn)
    }
}

impl ToolImage {
    pub fn all(conn: &mut MysqlConnection) -> QueryResult<Vec<ToolImage>> {
        tools_image::table.load::<ToolImage>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "tools"]
pub struct NewTool {
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
}
