// backend/src/models/blog.rs
use serde::{Deserialize, Serialize};
use r2d2::{PooleConnection, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::blogs;
use crate::models::user::User;
use crate::models::programming_languages::ProgrammingLanguage;
use crate::models::frameworks::Framework;
use crate::models::tools::Tool;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "blog_posts"]
#[primary_key(blog_id)]
#[belongs_to(User, foreign_key = "user_id")]
#[belongs_to(ProgrammingLanguage, foreign_key = "language_id")]
#[belongs_to(Framework, foreign_key = "framework_id")]
pub struct BlogPost {
    pub post_id: i32,
    pub title: String,
    pub content: String,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
    pub language_id: Option<i32>,
    pub framework_id: Option<i32>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "comments"]
#[primary_key(comment_id)]
#[belongs_to(User, foreign_key = "user_id")]
#[belongs_to(BlogPost, foreign_key = "post_id")]
pub struct Comment {
    pub comment_id: i32,
    pub post_id: Option<i32>,
    pub user_id: Option<i32>,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "likes"]
#[primary_key(like_id)]
#[belongs_to(BlogPost, foreign_key = "post_id")]
#[belongs_to(User, foreign_key = "user_id")]
pub struct Like {
    pub like_id: i32,
    pub post_id: Option<i32>,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}
