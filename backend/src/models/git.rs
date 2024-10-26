// backend/src/models/git.rs
use serde::{Deserialize, Serialize};
use r2d2::{PooleConnection, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::git_updates;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "git_updates"]
#[primary_key(update_id)]
pub struct GitUpdate {
    pub update_id: i32,
    pub project_id: Option<i32>,
    pub commit_hash: String,
    pub message: String,
    pub is_commit: Option<bool>,
    pub is_pull_request: Option<bool>,
    pub is_issue: Option<bool>,
    pub timestamp: Option<chrono::NaiveDateTime>,
}
