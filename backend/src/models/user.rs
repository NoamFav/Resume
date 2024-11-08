// backend/src/models/user.rs
use crate::schema::achievements;
use crate::schema::user_image;
use crate::schema::users;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, PooledConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = users)]
#[diesel(primary_key(user_id))]
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
#[diesel(table_name = user_image)]
#[diesel(primary_key(image_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct UserImage {
    pub image_id: i32,
    pub user_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = achievements)]
#[diesel(primary_key(achievement_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct Achievement {
    pub achievement_id: i32,
    pub user_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub issued_by: Option<String>,
    pub issued_date: Option<chrono::NaiveDate>,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl User {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<User>> {
        users::table.load::<User>(conn)
    }

    pub fn find_by_id(user_id: i32, conn: &mut DbConnection) -> QueryResult<User> {
        users::table.find(user_id).first(conn)
    }
}

impl UserImage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<UserImage>> {
        user_image::table.load::<UserImage>(conn)
    }

    pub fn find_by_user_id(user_id: i32, conn: &mut DbConnection) -> QueryResult<Vec<UserImage>> {
        user_image::table
            .filter(user_image::user_id.eq(user_id))
            .load::<UserImage>(conn)
    }
}

impl Achievement {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Achievement>> {
        achievements::table.load::<Achievement>(conn)
    }

    pub fn find_by_user_id(user_id: i32, conn: &mut DbConnection) -> QueryResult<Vec<Achievement>> {
        achievements::table
            .filter(achievements::user_id.eq(user_id))
            .load::<Achievement>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub age: Option<i32>,
    pub password_hash: String,
    pub is_admin: Option<bool>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub last_login: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug, AsChangeset)]
#[diesel(table_name = users)]
pub struct UpdateUser {
    pub username: Option<String>,
    pub email: Option<String>,
    pub age: Option<i32>,
    pub is_admin: Option<bool>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub last_login: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = user_image)]
pub struct NewUserImage {
    pub user_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = achievements)]
pub struct NewAchievement {
    pub user_id: i32,
    pub title: String,
    pub description: Option<String>,
    pub issued_by: Option<String>,
    pub issued_date: Option<chrono::NaiveDate>,
}
