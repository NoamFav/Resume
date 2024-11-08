// backend/mod.rs

#![allow(unused)]

pub mod blog;
pub mod frameworks;
pub mod git;
pub mod personal;
pub mod programming_languages;
pub mod projects;
pub mod roadmaps;
pub mod skills;
pub mod tools;
pub mod user;

//ProgrammingLanguage struct
pub use programming_languages::ProgrammingLanguage;
pub use programming_languages::ProgrammingLanguageImage;
pub use programming_languages::ProgrammingLanguageRoadmap;

//Framework struct
pub use frameworks::Framework;
pub use frameworks::FrameworkImage;
pub use frameworks::FrameworkRoadmap;

//Tool struct
pub use tools::Tool;
pub use tools::ToolImage;
pub use tools::ToolRoadmap;

//Roadmap struct
pub use roadmaps::Roadmap;
pub use roadmaps::RoadmapEvent;
pub use roadmaps::RoadmapProgress;

//Project struct
pub use projects::Project;
pub use projects::ProjectComment;
pub use projects::ProjectCommentLike;
pub use projects::ProjectContributor;
pub use projects::ProjectFramework;
pub use projects::ProjectImage;
pub use projects::ProjectLanguage;
pub use projects::ProjectLike;
pub use projects::ProjectLink;
pub use projects::ProjectRoadmap;
pub use projects::ProjectTag;
pub use projects::ProjectTool;

//Blog struct
pub use blog::BlogPost;
pub use blog::Comment;
pub use blog::CommentLike;
pub use blog::Like;

//Personal struct
pub use personal::Certification;
pub use personal::Contact;
pub use personal::Education;
pub use personal::Social;
pub use personal::WorkExperience;

//skills struct
pub use skills::Skill;
pub use skills::SkillRoadmap;

//Git struct
pub use git::GitUpdate;

//User struct
pub use user::Achievement;
pub use user::NewAchievement;
pub use user::NewUser;
pub use user::NewUserImage;
pub use user::UpdateUser;
pub use user::User;
pub use user::UserImage;
