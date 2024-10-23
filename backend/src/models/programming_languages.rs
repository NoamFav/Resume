// backend/src/models/programming_languages.rs
use serde::{Deserialize, Serialize};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::programming_languages;

#[derive(Queryable, Serialize, Deserialize, Debug)]
pub struct ProgrammingLanguage {
    pub id: i32,
    pub name: String,
    pub percentage: f32,
    pub favorite: Option<bool>,
    pub learn: Option<bool>,
}

impl ProgrammingLanguage {
    pub fn all(conn: &mut MysqlConnection) -> QueryResult<Vec<ProgrammingLanguage>> {
        programming_languages::table.load::<ProgrammingLanguage>(conn)
    }
}
