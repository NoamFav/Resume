// backend/src/database.rs
use sqlx::{mysql::MySqlPoolOptions, MySqlPool};

pub async fn connect() -> MySqlPool {
    let db_url = crate::config::get_database_url();
    MySqlPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await
        .expect("Failed to connect to MySQL")
}
