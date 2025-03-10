// backend/src/models/projects.rs
use crate::models::frameworks::Framework;
use crate::models::programming_languages::ProgrammingLanguage;
use crate::models::roadmaps::Roadmap;
use crate::models::tools::Tool;
use crate::models::user::User;
use crate::schema::project_comment_likes;
use crate::schema::project_comments;
use crate::schema::project_contributors;
use crate::schema::project_frameworks;
use crate::schema::project_images;
use crate::schema::project_languages;
use crate::schema::project_likes;
use crate::schema::project_links;
use crate::schema::project_roadmaps;
use crate::schema::project_tags;
use crate::schema::project_tools;
use crate::schema::projects;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, PooledConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = projects)]
#[diesel(primary_key(project_id))]
pub struct Project {
    pub project_id: i32,
    pub title: String,
    pub description: String,
    pub git_url: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_tags)]
#[diesel(primary_key(project_tag_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
pub struct ProjectTag {
    pub project_tag_id: i32,
    pub project_id: i32,
    pub tag_name: String,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_contributors)]
#[diesel(primary_key(project_id, user_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct ProjectContributor {
    pub project_id: i32,
    pub user_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_languages)]
#[diesel(primary_key(project_id, language_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(ProgrammingLanguage, foreign_key = language_id))]
pub struct ProjectLanguage {
    pub project_id: i32,
    pub language_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_frameworks)]
#[diesel(primary_key(project_id, framework_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(Framework, foreign_key = framework_id))]
pub struct ProjectFramework {
    pub project_id: i32,
    pub framework_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_tools)]
#[diesel(primary_key(project_id, tools_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(Tool, foreign_key = tools_id))]
pub struct ProjectTool {
    pub project_id: i32,
    pub tools_id: i32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_images)]
#[diesel(primary_key(image_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
pub struct ProjectImage {
    pub image_id: i32,
    pub project_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_links)]
#[diesel(primary_key(link_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
pub struct ProjectLink {
    pub link_id: i32,
    pub project_id: i32,
    pub link_name: String,
    pub link_url: String,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_likes)]
#[diesel(primary_key(like_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct ProjectLike {
    pub like_id: i32,
    pub project_id: i32,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_comments)]
#[diesel(primary_key(comment_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct ProjectComment {
    pub comment_id: i32,
    pub project_id: i32,
    pub user_id: Option<i32>,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_comment_likes)]
#[diesel(primary_key(like_id))]
#[diesel(belongs_to(ProjectComment, foreign_key = comment_id))]
#[diesel(belongs_to(User, foreign_key = user_id))]
pub struct ProjectCommentLike {
    pub like_id: i32,
    pub comment_id: i32,
    pub user_id: Option<i32>,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_roadmaps)]
#[diesel(primary_key(roadmap_id, project_id))]
#[diesel(belongs_to(Project, foreign_key = project_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct ProjectRoadmap {
    pub roadmap_id: i32,
    pub project_id: i32,
}

type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl Project {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Project>> {
        projects::table.load::<Project>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<Project> {
        projects::table.find(id).first(conn)
    }
}

impl ProjectTag {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectTag>> {
        project_tags::table.load::<ProjectTag>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectTag> {
        project_tags::table.find(id).first(conn)
    }

    pub fn find_by_project_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectTag>> {
        project_tags::table
            .filter(project_tags::project_id.eq(id))
            .load::<ProjectTag>(conn)
    }
}

impl ProjectContributor {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectContributor>> {
        project_contributors::table.load::<ProjectContributor>(conn)
    }

    pub fn find_by_id(
        id: i32,
        user_id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<ProjectContributor> {
        project_contributors::table.find((id, user_id)).first(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectContributor>> {
        project_contributors::table
            .filter(project_contributors::project_id.eq(id))
            .load::<ProjectContributor>(conn)
    }
}

impl ProjectLanguage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectLanguage>> {
        project_languages::table.load::<ProjectLanguage>(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectLanguage>> {
        project_languages::table
            .filter(project_languages::project_id.eq(id))
            .load::<ProjectLanguage>(conn)
    }
}

impl ProjectFramework {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectFramework>> {
        project_frameworks::table.load::<ProjectFramework>(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectFramework>> {
        project_frameworks::table
            .filter(project_frameworks::project_id.eq(id))
            .load::<ProjectFramework>(conn)
    }
}

impl ProjectTool {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectTool>> {
        project_tools::table.load::<ProjectTool>(conn)
    }

    pub fn find_by_project_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectTool>> {
        project_tools::table
            .filter(project_tools::project_id.eq(id))
            .load::<ProjectTool>(conn)
    }
}

impl ProjectImage {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectImage>> {
        project_images::table.load::<ProjectImage>(conn)
    }

    pub fn find_by_project_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectImage>> {
        project_images::table
            .filter(project_images::project_id.eq(id))
            .load::<ProjectImage>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectImage> {
        project_images::table.find(id).first(conn)
    }
}

impl ProjectLink {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectLink>> {
        project_links::table.load::<ProjectLink>(conn)
    }

    pub fn find_by_project_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectLink>> {
        project_links::table
            .filter(project_links::project_id.eq(id))
            .load::<ProjectLink>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectLink> {
        project_links::table.find(id).first(conn)
    }

    pub fn find_by_user_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectLink>> {
        project_links::table
            .filter(project_links::project_id.eq(id))
            .load::<ProjectLink>(conn)
    }
}

impl ProjectLike {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectLike>> {
        project_likes::table.load::<ProjectLike>(conn)
    }

    pub fn find_by_project_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectLike>> {
        project_likes::table
            .filter(project_likes::project_id.eq(id))
            .load::<ProjectLike>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectLike> {
        project_likes::table.find(id).first(conn)
    }
}

impl ProjectComment {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectComment>> {
        project_comments::table.load::<ProjectComment>(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectComment>> {
        project_comments::table
            .filter(project_comments::project_id.eq(id))
            .load::<ProjectComment>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectComment> {
        project_comments::table.find(id).first(conn)
    }

    pub fn find_by_user_id(id: i32, conn: &mut DbConnection) -> QueryResult<Vec<ProjectComment>> {
        project_comments::table
            .filter(project_comments::user_id.eq(id))
            .load::<ProjectComment>(conn)
    }
}

impl ProjectCommentLike {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectCommentLike>> {
        project_comment_likes::table.load::<ProjectCommentLike>(conn)
    }

    pub fn find_by_comment_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectCommentLike>> {
        project_comment_likes::table
            .filter(project_comment_likes::comment_id.eq(id))
            .load::<ProjectCommentLike>(conn)
    }

    pub fn find_by_id(id: i32, conn: &mut DbConnection) -> QueryResult<ProjectCommentLike> {
        project_comment_likes::table.find(id).first(conn)
    }

    pub fn find_by_user_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectCommentLike>> {
        project_comment_likes::table
            .filter(project_comment_likes::user_id.eq(id))
            .load::<ProjectCommentLike>(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectCommentLike>> {
        project_comment_likes::table
            .filter(project_comment_likes::comment_id.eq(id))
            .load::<ProjectCommentLike>(conn)
    }
}

impl ProjectRoadmap {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<ProjectRoadmap>> {
        project_roadmaps::table.load::<ProjectRoadmap>(conn)
    }

    pub fn find_by_project_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectRoadmap>> {
        project_roadmaps::table
            .filter(project_roadmaps::project_id.eq(id))
            .load::<ProjectRoadmap>(conn)
    }

    pub fn find_by_roadmap_id(
        id: i32,
        conn: &mut DbConnection,
    ) -> QueryResult<Vec<ProjectRoadmap>> {
        project_roadmaps::table
            .filter(project_roadmaps::roadmap_id.eq(id))
            .load::<ProjectRoadmap>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = projects)]
pub struct NewProject {
    pub title: String,
    pub description: String,
    pub git_url: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_tags)]
pub struct NewProjectTag {
    pub project_id: i32,
    pub tag_name: String,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_contributors)]
pub struct NewProjectContributor {
    pub project_id: i32,
    pub user_id: i32,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_languages)]
pub struct NewProjectLanguage {
    pub project_id: i32,
    pub language_id: i32,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_frameworks)]
pub struct NewProjectFramework {
    pub project_id: i32,
    pub framework_id: i32,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_tools)]
pub struct NewProjectTool {
    pub project_id: i32,
    pub tools_id: i32,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_images)]
pub struct NewProjectImage {
    pub project_id: i32,
    pub image_url: String,
    pub caption: Option<String>,
    pub alt_text: Option<String>,
    pub uploaded_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_links)]
pub struct NewProjectLink {
    pub project_id: i32,
    pub link_name: Option<String>,
    pub link_url: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_likes)]
pub struct NewProjectLike {
    pub project_id: i32,
    pub user_id: i32,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_comments)]
pub struct NewProjectComment {
    pub project_id: i32,
    pub user_id: i32,
    pub comment: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_comment_likes)]
pub struct NewProjectCommentLike {
    pub comment_id: i32,
    pub user_id: i32,
    pub created_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = project_roadmaps)]
pub struct NewProjectRoadmap {
    pub roadmap_id: i32,
    pub project_id: i32,
}
