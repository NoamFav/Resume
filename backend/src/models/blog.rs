// backend/src/models/blog.rs
use crate::models::frameworks::Framework;
use crate::models::programming_languages::ProgrammingLanguage;
use crate::models::user::User;
use crate::schema::blog_posts;
use crate::schema::comment_likes;
use crate::schema::comments;
use crate::schema::likes;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, PooledConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = blog_posts)]
#[diesel(primary_key(post_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
#[diesel(belongs_to(ProgrammingLanguage, foreign_key = language_id))]
#[diesel(belongs_to(Framework, foreign_key = framework_id))]
pub struct BlogPost {
    pub post_id: i32,
    pub title: String,
    pub content: String,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
    pub language_id: Option<i32>,
    pub framework_id: Option<i32>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = comments)]
#[diesel(primary_key(comment_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
#[diesel(belongs_to(BlogPost, foreign_key = post_id))]
pub struct Comment {
    pub comment_id: i32,
    pub post_id: i32,
    pub user_id: Option<i32>,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = likes)]
#[diesel(primary_key(like_id))]
#[diesel(belongs_to(BlogPost, foreign_key = post_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct Like {
    pub like_id: i32,
    pub post_id: i32,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = comment_likes)]
#[diesel(primary_key(like_id))]
#[diesel(belongs_to(Comment, foreign_key = comment_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct CommentLike {
    pub like_id: i32,
    pub comment_id: i32,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl BlogPost {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<BlogPost>> {
        blog_posts::table.load::<BlogPost>(conn)
    }
}

impl Comment {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Comment>> {
        comments::table.load::<Comment>(conn)
    }
}

impl Like {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Like>> {
        likes::table.load::<Like>(conn)
    }
}

impl CommentLike {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<CommentLike>> {
        comment_likes::table.load::<CommentLike>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = blog_posts)]
pub struct NewBlogPost {
    pub title: String,
    pub content: String,
    pub user_id: Option<i32>,
    pub language_id: Option<i32>,
    pub framework_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = comments)]
pub struct NewComment {
    pub post_id: Option<i32>,
    pub user_id: Option<i32>,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = likes)]
pub struct NewLike {
    pub post_id: Option<i32>,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = comment_likes)]
pub struct NewCommentLike {
    pub comment_id: i32,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}
