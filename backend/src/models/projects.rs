// backend/src/models/projects.rs
use serde::{Deserialize, Serialize};
use r2d2::{PooleConnection, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::projects;
use crate::models::user::User;
use crate::models::frameworks::Framework;
use crate::models::programming_languages::ProgrammingLanguage;
use crate::models::tools::Tool;
use crate::models::roadmaps::Roadmap;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "projects"]
#[primary_key(project_id)]
pub struct Project {
    pub project_id: i32,
    pub name: String,
    pub description: String,
    pub git_url: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_tags"]
#[primary_key(project_tag_id)]
#[belongs_to(Project, foreign_key = "project_id")]
pub struct ProjectTag {
    pub project_tag_id: i32,
    pub project_id: i32,
    pub tag_name: String,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_contributors"]
#[primary_key(project_id, user_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(User, foreign_key = "user_id")]
pub struct ProjectContributor {
    pub project_id: i32,
    pub user_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_languages"]
#[primary_key(project_id, language_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(ProgrammingLanguage, foreign_key = "language_id")]
pub struct ProjectLanguage {
    pub project_id: i32,
    pub language_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_frameworks"]
#[primary_key(project_id, framework_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(Framework, foreign_key = "framework_id")]
pub struct ProjectFramework {
    pub project_id: i32,
    pub framework_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_tools"]
#[primary_key(project_id, tools_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(Tool, foreign_key = "tools_id")]
pub struct ProjectTool {
    pub project_id: i32,
    pub tools_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_images"]
#[primary_key(image_id)]
#[belongs_to(Project, foreign_key = "project_id")]
pub struct ProjectImage {
    pub image_id: i32,
    pub project_id: Option<i32>,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_links"]
#[primary_key(link_id)]
#[belongs_to(Project, foreign_key = "project_id")]
pub struct ProjectLink {
    pub link_id: i32,
    pub project_id: Option<i32>,
    pub link_name: Option<String>,
    pub link_url: Opion<String>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_likes"]
#[primary_key(like_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(User, foreign_key = "user_id")]
pub struct ProjectLike {
    pub like_id: i32,
    pub project_id: Option<i32>,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_comments"]
#[primary_key(comment_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(User, foreign_key = "user_id")]
pub struct ProjectComment {
    pub comment_id: i32,
    pub project_id: Option<i32>,
    pub user_id: Option<i32>,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_comment_likes"]
#[primary_key(like_id)]
#[belongs_to(ProjectComment, foreign_key = "comment_id")]
#[belongs_to(User, foreign_key = "user_id")]
pub struct ProjectCommentLike {
    pub like_id: i32,
    pub comment_id: Option<i32>,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "project_roadmaps"]
#[primary_key(roadmap_id, project_id)]
#[belongs_to(Project, foreign_key = "project_id")]
#[belongs_to(Roadmap, foreign_key = "roadmap_id")]
pub struct ProjectRoadmap {
    pub roadmap_id: i32,
    pub project_id: i32,
}
