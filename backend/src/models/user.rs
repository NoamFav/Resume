// backend/src/models/user.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::users;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "users"]
#[primary_key(user_id)]
pub struct User {
    pub user_id: i32,
    pub username: String,
    pub email: String,
    pub age: Option<i32>,
    pub password_hash: String,
    pub is_admin: Option<bool>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub last_login: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "user_image"]
#[primary_key(image_id)]
#[belongs_to(User, foreign_key = "user_id")]
pub struct UserImage {
    pub image_id: i32,
    pub user_id: Option<i32>,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "achievements"]
#[primary_key(achievement_id)]
#[belongs_to(User, foreign_key = "user_id")]
pub struct Achievement {
    pub achievement_id: i32,
    pub user_id: Option<i32>,
    pub title: String,
    pub description: Option<String>,
    pub issued_by: Option<String>,
    pub issued_date: Option<chrono::NaiveDate>,
}
