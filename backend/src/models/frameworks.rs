// backend/src/model/framework.rs
use serde::{Deserialize, Serialize};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::frameworks;
use crate::models::programming_languages::ProgrammingLanguage;

#[derive(Queryable, Serialize, Deserialize, Debug, Associations)]
#[belongs_to(ProgrammingLanguage, foreign_key = "language_id")]
pub struct Framework {
    pub frameworks_id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learning: Option<bool>,
    pub language_id: Option<i32>,
}

impl Framework {
    pub fn all(conn: &mut MysqlConnection) -> QueryResult<Vec<Framework>> {
        frameworks::table.load::<Framework>(conn)
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
