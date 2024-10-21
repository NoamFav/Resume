// backend/src/models/user.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub password: String,
    pub created_at: String,
    pub updated_at: String,
    pub is_admin: bool,
}
