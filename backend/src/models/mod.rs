// backend/mod.rs

#![allow(unused)]

pub mod user;
pub mod programming_languages;
pub mod frameworks;
pub mod tools;
pub mod roadmaps;
pub mod projects;
pub mod blog;
pub mod personal;
pub mod git;
pub mod skills;

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
pub use roadmaps::RoadmapProgress;
pub use roadmaps::RoadmapEvent;

//Project struct
pub use projects::Project;
pub use projects::ProjectTag;
pub use projects::ProjectContributor;
pub use projects::ProjectLanguage;
pub use projects::ProjectFramework;
pub use projects::ProjectTool;
pub use projects::ProjectImage;
pub use projects::ProjectLink;
pub use projects::ProjectRoadmap;
pub use projects::ProjectLike;
pub use projects::ProjectComment;
pub use projects::ProjectCommentLike;

//Blog struct
pub use blog::BlogPost;
pub use blog::Comment;
pub use blog::Like;
pub use blog::CommentLike;

//Personal struct
pub use personal::WorkExperience;
pub use personal::Education;
pub use personal::Certification;
pub use personal::Social;
pub use personal::Contact;

//skills struct
pub use skills::Skill;
pub use skills::SkillRoadmap;

//Git struct
pub use git::GitUpdate;

//User struct
pub use user::User;
pub use user::UserImage;
pub use user::Achievement;
pub use user::NewUser;
pub use user::NewUserImage;
pub use user::NewAchievement;
pub use user::UpdateUser;
