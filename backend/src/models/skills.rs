// backend/src/models/skills.rs
use serde::{Deserialize, Serialize};
use r2d2::{PooleConnection, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::skills;

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "skills"]
#[primary_key(skill_id)]
pub struct Skill {
    pub skill_id: i32,
    pub skill_name: String,
    pub skill_percentage: f32,
}
