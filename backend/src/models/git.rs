// backend/src/models/git.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::git_updates;
use crate::models::projects::Project;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = git_updates)]
#[diesel(primary_key(update_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
pub struct GitUpdate {
    pub update_id: i32,
    pub project_id: i32,
    pub commit_hash: String,
    pub message: String,
    pub is_commit: Option<bool>,
    pub is_pull_request: Option<bool>,
    pub is_issue: Option<bool>,
    pub timestamp: Option<chrono::NaiveDateTime>,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl GitUpdate {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<GitUpdate>> {
        git_updates::table.load::<GitUpdate>(conn)
    }
}
