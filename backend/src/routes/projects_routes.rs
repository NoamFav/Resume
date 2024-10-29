// backend/src/routes/projects_routes.rs
use actix_web::{web, HttpResponse, Responder};
use crate::models::projects::{Project, ProjectTag, ProjectLanguage, ProjectFramework, ProjectTool, ProjectContributor, ProjectLink, ProjectImage, ProjectLike, ProjectComment, ProjectCommentLike, ProjectRoadmap};
use diesel::r2d2::{ConnectionManager, Pool};
use diesel::mysql::MysqlConnection;
use actix_web::web::{Data, Path};
use serde_json::{json, Value};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/projects", web::get().to(get_projects));
    cfg.route("/projects/{id}", web::get().to(get_project_by_id));
    cfg.route("/projects/new", web::post().to(post_project));
    cfg.route("/projects/{id}/update", web::put().to(put_project));
    cfg.route("/projects/{id}/delete", web::delete().to(delete_project));
    cfg.route("/projects/{id}/tags", web::get().to(get_project_tags));
    cfg.route("/projects/{id}/tags/new", web::post().to(post_project_tag));
    cfg.route("/projects/{id}/tags/{tag_id}/update", web::put().to(put_project_tag));
    cfg.route("/projects/{id}/tags/{tag_id}/delete", web::delete().to(delete_project_tag));

    cfg.route("/projects/{id}/languages", web::get().to(get_project_languages));
    cfg.route("/projects/{id}/languages/new", web::post().to(post_project_language));
    cfg.route("/projects/{id}/languages/{language_id}/update", web::put().to(put_project_language));
    cfg.route("/projects/{id}/languages/{language_id}/delete", web::delete().to(delete_project_language));

    cfg.route("/projects/{id}/frameworks", web::get().to(get_project_frameworks));
    cfg.route("/projects/{id}/frameworks/new", web::post().to(post_project_framework));
    cfg.route("/projects/{id}/frameworks/{framework_id}/update", web::put().to(put_project_framework));
    cfg.route("/projects/{id}/frameworks/{framework_id}/delete", web::delete().to(delete_project_framework));

    cfg.route("projects/{id}/tools", web::get().to(get_project_tools));
    cfg.route("projects/{id}/tools/new", web::post().to(post_project_tool));
    cfg.route("projects/{id}/tools/{tool_id}/update", web::put().to(put_project_tool));
    cfg.route("projects/{id}/tools/{tool_id}/delete", web::delete().to(delete_project_tool));

    cfg.route("projects/{id}/contributors", web::get().to(get_project_contributors));
    cfg.route("projects/{id}/contributors/new", web::post().to(post_project_contributor));
    cfg.route("projects/{id}/contributors/{contributor_id}/update", web::put().to(put_project_contributor));
    cfg.route("projects/{id}/contributors/{contributor_id}/delete", web::delete().to(delete_project_contributor));

    cfg.route("projects/{id}/links", web::get().to(get_project_links));
    cfg.route("projects/{id}/links/new", web::post().to(post_project_link));
    cfg.route("projects/{id}/links/{link_id}/update", web::put().to(put_project_link));
    cfg.route("projects/{id}/links/{link_id}/delete", web::delete().to(delete_project_link));

    cfg.route("projects/{id}/images", web::get().to(get_project_images));
    cfg.route("projects/{id}/images/new", web::post().to(post_project_image));
    cfg.route("projects/{id}/images/{image_id}/update", web::put().to(put_project_image));
    cfg.route("projects/{id}/images/{image_id}/delete", web::delete().to(delete_project_image));

    cfg.route("projects/{id}/likes", web::get().to(get_project_likes));
    cfg.route("projects/{id}/likes/new", web::post().to(post_project_like));
    cfg.route("projects/{id}/likes/{like_id}/delete", web::delete().to(delete_project_like));

    cfg.route("projects/{id}/comments", web::get().to(get_project_comments));
    cfg.route("projects/{id}/comments/new", web::post().to(post_project_comment));
    cfg.route("projects/{id}/comments/{comment_id}/update", web::put().to(put_project_comment));
    cfg.route("projects/{id}/comments/{comment_id}/delete", web::delete().to(delete_project_comment));

    cfg.route("projects/{id}/comments/{comment_id}/likes", web::get().to(get_project_comment_likes));
    cfg.route("projects/{id}/comments/{comment_id}/likes/new", web::post().to(post_project_comment_like));
    cfg.route("projects/{id}/comments/{comment_id}/likes/{like_id}/delete", web::delete().to(delete_project_comment_like));

    cfg.route("projects/{id}/roadmaps", web::get().to(get_project_roadmaps));
    cfg.route("projects/{id}/roadmaps/new", web::post().to(post_project_roadmap));
    cfg.route("projects/{id}/roadmaps/{roadmap_id}/update", web::put().to(put_project_roadmap));
    cfg.route("projects/{id}/roadmaps/{roadmap_id}/delete", web::delete().to(delete_project_roadmap));

}

type DbPool = Pool<ConnectionManager<MysqlConnection>>;

async fn get_projects(pool: Data<DbPool>) -> impl Responder {
    let projects = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match Project::all(&mut conn) {
            Ok(projects) => projects,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load projects"),
        }
    };

    let project_tags = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectTag::all(&mut conn) {
            Ok(tags) => tags,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project tags"),
        }
    };

    let project_languages = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectLanguage::all(&mut conn) {
            Ok(languages) => languages,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project languages"),
        }
    };

    let project_frameworks = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectFramework::all(&mut conn) {
            Ok(frameworks) => frameworks,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project frameworks"),
        }
    };

    let project_tools = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectTool::all(&mut conn) {
            Ok(tools) => tools,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project tools"),
        }
    };

    let project_contributors = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectContributor::all(&mut conn) {
            Ok(contributors) => contributors,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project contributors"),
        }
    };

    let project_links = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectLink::all(&mut conn) {
            Ok(links) => links,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project links"),
        }
    };

    let project_images = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectImage::all(&mut conn) {
            Ok(images) => images,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project images"),
        }
    };

    let project_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectRoadmap::all(&mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project roadmaps"),
        }
    };

    let merge_projects = merge_projects(
        projects,
        project_tags,
        project_languages,
        project_frameworks,
        project_tools,
        project_contributors,
        project_links,
        project_images,
        project_roadmaps
        );

    HttpResponse::Ok().json(merge_projects)
}

fn merge_projects(
    projects: Vec<Project>,
    tags: Vec<ProjectTag>,
    languages: Vec<ProjectLanguage>,
    frameworks: Vec<ProjectFramework>,
    tools: Vec<ProjectTool>,
    contributors: Vec<ProjectContributor>,
    links: Vec<ProjectLink>,
    images: Vec<ProjectImage>,
    roadmaps: Vec<ProjectRoadmap>,
) -> Vec<Value> {
    let mut merged_list = Vec::new();

    for project in projects {
        let project_tags = tags.iter().filter(|t| t.project_id == project.project_id).collect::<Vec<_>>();
        let project_languages = languages.iter().filter(|l| l.project_id == project.project_id).collect::<Vec<_>>();
        let project_frameworks = frameworks.iter().filter(|f| f.project_id == project.project_id).collect::<Vec<_>>();
        let project_tools = tools.iter().filter(|t| t.project_id == project.project_id).collect::<Vec<_>>();
        let project_contributors = contributors.iter().filter(|c| c.project_id == project.project_id).collect::<Vec<_>>();
        let project_links = links.iter().filter(|l| l.project_id == project.project_id).collect::<Vec<_>>();
        let project_images = images.iter().filter(|i| i.project_id == project.project_id).collect::<Vec<_>>();
        let project_roadmaps = roadmaps.iter().filter(|r| r.project_id == project.project_id).collect::<Vec<_>>();

        let project_json = json!({
            "id": project.project_id,
            "title": project.title,
            "description": project.description,
            "git_url": project.git_url,
            "created_at": project.created_at,
            "updated_at": project.updated_at,
            "tags": project_tags.iter().map(|t| json!({"id": t.project_tag_id, "name": t.tag_name})).collect::<Vec<_>>(),
            "languages": project_languages.iter().map(|l| json!({"id": l.language_id})).collect::<Vec<_>>(),
            "frameworks": project_frameworks.iter().map(|f| json!({"id": f.framework_id})).collect::<Vec<_>>(),
            "tools": project_tools.iter().map(|t| json!({"id": t.tools_id})).collect::<Vec<_>>(),
            "contributors": project_contributors.iter().map(|c| json!({"user_id": c.user_id})).collect::<Vec<_>>(),
            "links": project_links.iter().map(|l| json!({"id": l.link_id, "name": l.link_name, "url": l.link_url})).collect::<Vec<_>>(),
            "images": project_images.iter().map(|i| json!({"id": i.image_id, "url": i.image_url, "caption": i.caption, "alt_text": i.alt_text})).collect::<Vec<_>>(),
            "roadmaps": project_roadmaps.iter().map(|r| json!({"roadmap_id": r.roadmap_id})).collect::<Vec<_>>(),
        });

        merged_list.push(project_json);
    }

    merged_list
}
async fn get_project_by_id(pool: Data<DbPool>, id: Path<i32>) -> impl Responder {
    let projects_id = id.into_inner();

    let project = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match Project::find_by_id(projects_id, &mut conn) {
            Ok(project) => project,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project"),
        }
    };

    let project_tags = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectTag::find_by_project_id(projects_id, &mut conn) {
            Ok(tags) => tags,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project tags"),
        }
    };

    let project_languages = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectLanguage::find_by_project_id(projects_id, &mut conn) {
            Ok(languages) => languages,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project languages"),
        }
    };

    let project_frameworks = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectFramework::find_by_project_id(projects_id, &mut conn) {
            Ok(frameworks) => frameworks,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project frameworks"),
        }
    };

    let project_tools = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectTool::find_by_project_id(projects_id, &mut conn) {
            Ok(tools) => tools,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project tools"),
        }
    };

    let project_contributors = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectContributor::find_by_project_id(projects_id, &mut conn) {
            Ok(contributors) => contributors,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project contributors"),
        }
    };

    let project_links = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectLink::find_by_project_id(projects_id, &mut conn) {
            Ok(links) => links,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project links"),
        }
    };

    let project_images = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectImage::find_by_project_id(projects_id, &mut conn) {
            Ok(images) => images,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project images"),
        }
    };

    let project_likes = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectLike::find_by_project_id(projects_id, &mut conn) {
            Ok(likes) => likes,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project likes"),
        }
    };

    let project_comments = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectComment::find_by_project_id(projects_id, &mut conn) {
            Ok(comments) => comments,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project comments"),
        }
    };

    let project_comment_likes = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectCommentLike::find_by_project_id(projects_id, &mut conn) {
            Ok(comment_likes) => comment_likes,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project comment likes"),
        }
    };

    let project_roadmaps = {
        let mut conn = match pool.get() {
            Ok(conn) => conn,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to get DB connection"),
        };
        match ProjectRoadmap::find_by_project_id(projects_id, &mut conn) {
            Ok(roadmaps) => roadmaps,
            Err(_) => return HttpResponse::InternalServerError().body("Failed to load project roadmaps"),
        }
    };

    let merge_projects = merge_project(
        project,
        project_tags,
        project_languages,
        project_frameworks,
        project_tools,
        project_contributors,
        project_links,
        project_images,
        project_likes,
        project_comments,
        project_comment_likes,
        project_roadmaps
    );

    HttpResponse::Ok().json(merge_projects)
}

fn merge_project(
    project: Project,
    tags: Vec<ProjectTag>,
    languages: Vec<ProjectLanguage>,
    frameworks: Vec<ProjectFramework>,
    tools: Vec<ProjectTool>,
    contributors: Vec<ProjectContributor>,
    links: Vec<ProjectLink>,
    images: Vec<ProjectImage>,
    likes: Vec<ProjectLike>,
    comments: Vec<ProjectComment>,
    comment_likes: Vec<ProjectCommentLike>,
    roadmaps: Vec<ProjectRoadmap>
) -> Vec<Value> {
    let mut merged_list = Vec::new();

    let project_tags = tags.iter().filter(|t| t.project_id == project.project_id).collect::<Vec<_>>();
    let project_languages = languages.iter().filter(|l| l.project_id == project.project_id).collect::<Vec<_>>();
    let project_frameworks = frameworks.iter().filter(|f| f.project_id == project.project_id).collect::<Vec<_>>();
    let project_tools = tools.iter().filter(|t| t.project_id == project.project_id).collect::<Vec<_>>();
    let project_contributors = contributors.iter().filter(|c| c.project_id == project.project_id).collect::<Vec<_>>();
    let project_links = links.iter().filter(|l| l.project_id == project.project_id).collect::<Vec<_>>();
    let project_images = images.iter().filter(|i| i.project_id == project.project_id).collect::<Vec<_>>();
    let project_likes = likes.iter().filter(|like| like.project_id == project.project_id).collect::<Vec<_>>();
    let project_comments = comments.iter().filter(|c| c.project_id == project.project_id).collect::<Vec<_>>();
    let project_comment_likes = comment_likes.iter().filter(|cl| cl.like_id == project.project_id).collect::<Vec<_>>();
    let project_roadmaps = roadmaps.iter().filter(|r| r.project_id == project.project_id).collect::<Vec<_>>();

    let project_json = json!({
        "id": project.project_id,
        "title": project.title,
        "description": project.description,
        "git_url": project.git_url,
        "created_at": project.created_at,
        "updated_at": project.updated_at,
        "tags": project_tags.iter().map(|t| json!({"id": t.project_tag_id, "name": t.tag_name})).collect::<Vec<_>>(),
        "languages": project_languages.iter().map(|l| json!({"id": l.language_id})).collect::<Vec<_>>(),
        "frameworks": project_frameworks.iter().map(|f| json!({"id": f.framework_id})).collect::<Vec<_>>(),
        "tools": project_tools.iter().map(|t| json!({"id": t.tools_id})).collect::<Vec<_>>(),
        "contributors": project_contributors.iter().map(|c| json!({"user_id": c.user_id})).collect::<Vec<_>>(),
        "links": project_links.iter().map(|l| json!({"id": l.link_id, "name": l.link_name, "url": l.link_url})).collect::<Vec<_>>(),
        "images": project_images.iter().map(|i| json!({"id": i.image_id, "url": i.image_url, "caption": i.caption, "alt_text": i.alt_text})).collect::<Vec<_>>(),
        "likes": project_likes.iter().map(|like| json!({"user_id": like.user_id})).collect::<Vec<_>>(),
        "comments": project_comments.iter().map(|c| json!({"comment_id": c.comment_id, "user_id": c.user_id, "text": c.comment})).collect::<Vec<_>>(),
        "comment_likes": project_comment_likes.iter().map(|cl| json!({"user_id": cl.user_id})).collect::<Vec<_>>(),
        "roadmaps": project_roadmaps.iter().map(|r| json!({"roadmap_id": r.roadmap_id})).collect::<Vec<_>>(),
    });

    merged_list.push(project_json);

    merged_list
}

async fn post_project() -> impl Responder {
    HttpResponse::Ok().body("Project will be listed here")
}

async fn put_project() -> impl Responder {
    HttpResponse::Ok().body("Project will be listed here")
}

async fn delete_project() -> impl Responder {
    HttpResponse::Ok().body("Project will be listed here")
}

async fn get_project_tags() -> impl Responder {
    HttpResponse::Ok().body("Project tags will be listed here")
}

async fn post_project_tag() -> impl Responder {
    HttpResponse::Ok().body("Project tags will be listed here")
}

async fn put_project_tag() -> impl Responder {
    HttpResponse::Ok().body("Project tags will be listed here")
}

async fn delete_project_tag() -> impl Responder {
    HttpResponse::Ok().body("Project tags will be listed here")
}

async fn get_project_languages() -> impl Responder {
    HttpResponse::Ok().body("Project languages will be listed here")
}

async fn post_project_language() -> impl Responder {
    HttpResponse::Ok().body("Project languages will be listed here")
}

async fn put_project_language() -> impl Responder {
    HttpResponse::Ok().body("Project languages will be listed here")
}

async fn delete_project_language() -> impl Responder {
    HttpResponse::Ok().body("Project languages will be listed here")
}

async fn get_project_frameworks() -> impl Responder {
    HttpResponse::Ok().body("Project frameworks will be listed here")
}

async fn post_project_framework() -> impl Responder {
    HttpResponse::Ok().body("Project frameworks will be listed here")
}

async fn put_project_framework() -> impl Responder {
    HttpResponse::Ok().body("Project frameworks will be listed here")
}

async fn delete_project_framework() -> impl Responder {
    HttpResponse::Ok().body("Project frameworks will be listed here")
}

async fn get_project_tools() -> impl Responder {
    HttpResponse::Ok().body("Project tools will be listed here")
}

async fn post_project_tool() -> impl Responder {
    HttpResponse::Ok().body("Project tools will be listed here")
}

async fn put_project_tool() -> impl Responder {
    HttpResponse::Ok().body("Project tools will be listed here")
}

async fn delete_project_tool() -> impl Responder {
    HttpResponse::Ok().body("Project tools will be listed here")
}

async fn get_project_contributors() -> impl Responder {
    HttpResponse::Ok().body("Project contributors will be listed here")
}

async fn post_project_contributor() -> impl Responder {
    HttpResponse::Ok().body("Project contributors will be listed here")
}

async fn put_project_contributor() -> impl Responder {
    HttpResponse::Ok().body("Project contributors will be listed here")
}

async fn delete_project_contributor() -> impl Responder {
    HttpResponse::Ok().body("Project contributors will be listed here")
}

async fn get_project_links() -> impl Responder {
    HttpResponse::Ok().body("Project links will be listed here")
}

async fn post_project_link() -> impl Responder {
    HttpResponse::Ok().body("Project links will be listed here")
}

async fn put_project_link() -> impl Responder {
    HttpResponse::Ok().body("Project links will be listed here")
}

async fn delete_project_link() -> impl Responder {
    HttpResponse::Ok().body("Project links will be listed here")
}

async fn get_project_images() -> impl Responder {
    HttpResponse::Ok().body("Project images will be listed here")
}

async fn post_project_image() -> impl Responder {
    HttpResponse::Ok().body("Project images will be listed here")
}

async fn put_project_image() -> impl Responder {
    HttpResponse::Ok().body("Project images will be listed here")
}

async fn delete_project_image() -> impl Responder {
    HttpResponse::Ok().body("Project images will be listed here")
}

async fn get_project_likes() -> impl Responder {
    HttpResponse::Ok().body("Project likes will be listed here")
}

async fn post_project_like() -> impl Responder {
    HttpResponse::Ok().body("Project likes will be listed here")
}

async fn delete_project_like() -> impl Responder {
    HttpResponse::Ok().body("Project likes will be listed here")
}

async fn get_project_comments() -> impl Responder {
    HttpResponse::Ok().body("Project comments will be listed here")
}

async fn post_project_comment() -> impl Responder {
    HttpResponse::Ok().body("Project comments will be listed here")
}

async fn put_project_comment() -> impl Responder {
    HttpResponse::Ok().body("Project comments will be listed here")
}

async fn delete_project_comment() -> impl Responder {
    HttpResponse::Ok().body("Project comments will be listed here")
}

async fn get_project_comment_likes() -> impl Responder {
    HttpResponse::Ok().body("Project comment likes will be listed here")
}

async fn post_project_comment_like() -> impl Responder {
    HttpResponse::Ok().body("Project comment likes will be listed here")
}

async fn delete_project_comment_like() -> impl Responder {
    HttpResponse::Ok().body("Project comment likes will be listed here")
}

async fn get_project_roadmaps() -> impl Responder {
    HttpResponse::Ok().body("Project roadmaps will be listed here")
}

async fn post_project_roadmap() -> impl Responder {
    HttpResponse::Ok().body("Project roadmaps will be listed here")
}

async fn put_project_roadmap() -> impl Responder {
    HttpResponse::Ok().body("Project roadmaps will be listed here")
}

async fn delete_project_roadmap() -> impl Responder {
    HttpResponse::Ok().body("Project roadmaps will be listed here")
}
