use sqlx::{MySqlPool, Pool};

pub async fn connect() -> Pool<MySql> {
    let db_url = crate::config::get_database_url();
    MySqlPool::connect(&db_url).await.expect("Failed to connect to MySQL")
}
