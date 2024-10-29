// backend/src/model/tools.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::tools;
use crate::schema::tools_image;
use crate::schema::tools_roadmaps;
use crate::models::roadmaps::Roadmap;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = tools)]
#[diesel(primary_key(tools_id))]
pub struct Tool {
    pub tools_id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: bool,
    pub learning: bool,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug, Associations)]
#[diesel(table_name = tools_image)]
#[diesel(primary_key(image_id))]
#[diesel(belongs_to(Tool, foreign_key = tools_id))]
pub struct ToolImage {
    pub image_id: i32,
    pub tools_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable,Serialize, Deserialize, Debug, Associations)]
#[diesel(table_name = tools_roadmaps)]
#[diesel(primary_key(roadmap_id, tools_id))]
#[diesel(belongs_to(Tool, foreign_key = tools_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct ToolRoadmap {
    pub roadmap_id: i32,
    pub tools_id: i32,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl Tool {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Tool>> {
        tools::table.load::<Tool>(conn)
    }
}

impl ToolImage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ToolImage>> {
        tools_image::table.load::<ToolImage>(conn)
    }
}

impl ToolRoadmap {
    pub fn find_by_tool_id(tool_id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ToolRoadmap>> {
        tools_roadmaps::table.filter(tools_roadmaps::tools_id.eq(tool_id)).load::<ToolRoadmap>(conn)
    }

    pub fn find_by_roadmap_id(roadmap_id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ToolRoadmap>> {
        tools_roadmaps::table.filter(tools_roadmaps::roadmap_id.eq(roadmap_id)).load::<ToolRoadmap>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = tools)]
pub struct NewTool {
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = tools_image)]
pub struct NewToolImage {
    pub tools_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = tools_roadmaps)]
pub struct NewToolRoadmap {
    pub roadmap_id: i32,
    pub tools_id: i32,
}
