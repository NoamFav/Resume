// backend/src/models/user.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct ProgrammingLanguage {
    pub id: i32,
    pub name: String,
    pub percentage: f32,
}
