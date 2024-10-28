diesel::table! {
    achievements (achievement_id) {
        achievement_id -> Integer,
        user_id -> Nullable<Integer>,
        #[max_length = 255]
        title -> Varchar,
        description -> Nullable<Text>,
        #[max_length = 100]
        issued_by -> Nullable<Varchar>,
        issued_date -> Nullable<Date>,
    }
}

diesel::table! {
    analytics (analytics_id) {
        analytics_id -> Integer,
        #[max_length = 100]
        page_name -> Nullable<Varchar>,
        views -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
    }
}

diesel::table! {
    blog_posts (post_id) {
        post_id -> Integer,
        #[max_length = 255]
        title -> Varchar,
        content -> Text,
        user_id -> Nullable<Integer>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
        language_id -> Nullable<Integer>,
        framework_id -> Nullable<Integer>,
    }
}

diesel::table! {
    certifications (certification_id) {
        certification_id -> Integer,
        #[max_length = 255]
        certification_name -> Varchar,
        certification_date -> Date,
        grade -> Nullable<Float>,
    }
}

diesel::table! {
    comment_likes (like_id) {
        like_id -> Integer,
        comment_id -> Integer,
        user_id -> Nullable<Integer>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    comments (comment_id) {
        comment_id -> Integer,
        post_id -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
        comment -> Text,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    contacts (contact_id) {
        contact_id -> Integer,
        #[max_length = 50]
        contact_name -> Varchar,
        #[max_length = 255]
        contact_value -> Varchar,
    }
}

diesel::table! {
    educations (education_id) {
        education_id -> Integer,
        #[max_length = 100]
        school_name -> Varchar,
        #[max_length = 100]
        degree -> Varchar,
        #[max_length = 100]
        field_of_study -> Varchar,
        start_date -> Date,
        end_date -> Date,
    }
}

diesel::table! {
    flyway_schema_history (installed_rank) {
        installed_rank -> Integer,
        #[max_length = 50]
        version -> Nullable<Varchar>,
        #[max_length = 200]
        description -> Varchar,
        #[sql_name = "type"]
        #[max_length = 20]
        type_ -> Varchar,
        #[max_length = 1000]
        script -> Varchar,
        checksum -> Nullable<Integer>,
        #[max_length = 100]
        installed_by -> Varchar,
        installed_on -> Timestamp,
        execution_time -> Integer,
        success -> Bool,
    }
}

diesel::table! {
    framework_images (image_id) {
        image_id -> Integer,
        framework_id -> Integer,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        caption -> Nullable<Varchar>,
        #[max_length = 255]
        alt_text -> Nullable<Varchar>,
        uploaded_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    framework_roadmaps (roadmap_id, framework_id) {
        roadmap_id -> Integer,
        framework_id -> Integer,
    }
}

diesel::table! {
    frameworks (framework_id) {
        framework_id -> Integer,
        #[max_length = 100]
        name -> Varchar,
        percentage -> Float,
        favorite -> Nullable<Bool>,
        learning -> Nullable<Bool>,
        language_id -> Nullable<Integer>,
    }
}

diesel::table! {
    git_updates (update_id) {
        update_id -> Integer,
        project_id -> Nullable<Integer>,
        #[max_length = 40]
        commit_hash -> Varchar,
        message -> Text,
        is_commit -> Nullable<Bool>,
        is_pull_request -> Nullable<Bool>,
        is_issue -> Nullable<Bool>,
        timestamp -> Nullable<Timestamp>,
    }
}

diesel::table! {
    likes (like_id) {
        like_id -> Integer,
        post_id -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    milestones (milestone_id) {
        milestone_id -> Integer,
        roadmap_id -> Nullable<Integer>,
        #[max_length = 255]
        milestone_title -> Varchar,
        milestone_description -> Nullable<Text>,
        #[max_length = 255]
        milestone_link -> Nullable<Varchar>,
        completed -> Nullable<Bool>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    programming_language_images (image_id) {
        image_id -> Integer,
        language_id -> Integer,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        caption -> Nullable<Varchar>,
        #[max_length = 255]
        alt_text -> Nullable<Varchar>,
        uploaded_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    programming_language_roadmaps (roadmap_id, language_id) {
        roadmap_id -> Integer,
        language_id -> Integer,
    }
}

diesel::table! {
    programming_languages (language_id) {
        language_id -> Integer,
        #[max_length = 50]
        name -> Varchar,
        percentage -> Float,
        favorite -> Nullable<Bool>,
        learning -> Nullable<Bool>,
    }
}

diesel::table! {
    project_comment_likes (like_id) {
        like_id -> Integer,
        comment_id -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    project_comments (comment_id) {
        comment_id -> Integer,
        project_id -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
        comment -> Text,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    project_contributors (project_id, user_id) {
        project_id -> Integer,
        user_id -> Integer,
    }
}

diesel::table! {
    project_frameworks (project_id, framework_id) {
        project_id -> Integer,
        framework_id -> Integer,
    }
}

diesel::table! {
    project_images (image_id) {
        image_id -> Integer,
        project_id -> Integer,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        caption -> Nullable<Varchar>,
        #[max_length = 255]
        alt_text -> Nullable<Varchar>,
        uploaded_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    project_languages (project_id, language_id) {
        project_id -> Integer,
        language_id -> Integer,
    }
}

diesel::table! {
    project_likes (like_id) {
        like_id -> Integer,
        project_id -> Nullable<Integer>,
        user_id -> Nullable<Integer>,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    project_links (link_id) {
        link_id -> Integer,
        project_id -> Nullable<Integer>,
        #[max_length = 50]
        link_name -> Nullable<Varchar>,
        #[max_length = 255]
        link_url -> Nullable<Varchar>,
    }
}

diesel::table! {
    project_roadmaps (roadmap_id, project_id) {
        roadmap_id -> Integer,
        project_id -> Integer,
    }
}

diesel::table! {
    project_tags (tag_id) {
        tag_id -> Integer,
        project_id -> Nullable<Integer>,
        #[max_length = 50]
        tag_name -> Nullable<Varchar>,
    }
}

diesel::table! {
    project_tools (project_id, tools_id) {
        project_id -> Integer,
        tools_id -> Integer,
    }
}

diesel::table! {
    projects (project_id) {
        project_id -> Integer,
        #[max_length = 255]
        title -> Varchar,
        description -> Text,
        #[max_length = 255]
        git_url -> Varchar,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    roadmap_events (event_id) {
        event_id -> Integer,
        roadmap_id -> Nullable<Integer>,
        #[max_length = 255]
        event_title -> Varchar,
        event_description -> Nullable<Text>,
        event_date -> Nullable<Timestamp>,
        #[max_length = 50]
        event_type -> Varchar,
    }
}

diesel::table! {
    roadmap_progress (progress_id) {
        progress_id -> Integer,
        roadmap_id -> Nullable<Integer>,
        progress_percentage -> Nullable<Float>,
        last_updated -> Nullable<Timestamp>,
    }
}

diesel::table! {
    roadmaps (roadmap_id) {
        roadmap_id -> Integer,
        #[max_length = 255]
        roadmap_title -> Varchar,
        roadmap_description -> Nullable<Text>,
    }
}

diesel::table! {
    skill_roadmaps (roadmap_id, skill_id) {
        roadmap_id -> Integer,
        skill_id -> Integer,
    }
}

diesel::table! {
    skills (skill_id) {
        skill_id -> Integer,
        #[max_length = 50]
        skill_name -> Varchar,
        skill_percentage -> Float,
    }
}

diesel::table! {
    socials (social_id) {
        social_id -> Integer,
        #[max_length = 50]
        social_name -> Varchar,
        #[max_length = 255]
        social_url -> Varchar,
    }
}

diesel::table! {
    tools (tools_id) {
        tools_id -> Integer,
        #[max_length = 255]
        name -> Varchar,
        percentage -> Float,
        favorite -> Bool,
        learning -> Bool,
    }
}

diesel::table! {
    tools_image (image_id) {
        image_id -> Integer,
        tools_id -> Integer,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        caption -> Nullable<Varchar>,
        #[max_length = 255]
        alt_text -> Nullable<Varchar>,
        uploaded_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    tools_roadmaps (roadmap_id, tools_id) {
        roadmap_id -> Integer,
        tools_id -> Integer,
    }
}

diesel::table! {
    user_image (image_id) {
        image_id -> Integer,
        user_id -> Integer,
        #[max_length = 255]
        image_url -> Varchar,
        #[max_length = 255]
        caption -> Nullable<Varchar>,
        #[max_length = 255]
        alt_text -> Nullable<Varchar>,
        uploaded_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Integer,
        #[max_length = 100]
        username -> Varchar,
        #[max_length = 100]
        email -> Varchar,
        age -> Nullable<Integer>,
        #[max_length = 255]
        password_hash -> Varchar,
        is_admin -> Nullable<Bool>,
        created_at -> Nullable<Timestamp>,
        last_login -> Nullable<Timestamp>,
    }
}

diesel::table! {
    work_experience (work_id) {
        work_id -> Integer,
        #[max_length = 100]
        company_name -> Varchar,
        #[max_length = 100]
        position -> Varchar,
        start_date -> Date,
        end_date -> Nullable<Date>,
    }
}

diesel::joinable!(achievements -> users (user_id));
diesel::joinable!(analytics -> users (user_id));
diesel::joinable!(blog_posts -> frameworks (framework_id));
diesel::joinable!(blog_posts -> programming_languages (language_id));
diesel::joinable!(blog_posts -> users (user_id));
diesel::joinable!(comment_likes -> comments (comment_id));
diesel::joinable!(comment_likes -> users (user_id));
diesel::joinable!(comments -> blog_posts (post_id));
diesel::joinable!(comments -> users (user_id));
diesel::joinable!(framework_images -> frameworks (framework_id));
diesel::joinable!(framework_roadmaps -> frameworks (framework_id));
diesel::joinable!(framework_roadmaps -> roadmaps (roadmap_id));
diesel::joinable!(frameworks -> programming_languages (language_id));
diesel::joinable!(git_updates -> projects (project_id));
diesel::joinable!(likes -> blog_posts (post_id));
diesel::joinable!(likes -> users (user_id));
diesel::joinable!(milestones -> roadmaps (roadmap_id));
diesel::joinable!(programming_language_images -> programming_languages (language_id));
diesel::joinable!(programming_language_roadmaps -> programming_languages (language_id));
diesel::joinable!(programming_language_roadmaps -> roadmaps (roadmap_id));
diesel::joinable!(project_comment_likes -> project_comments (comment_id));
diesel::joinable!(project_comment_likes -> users (user_id));
diesel::joinable!(project_comments -> projects (project_id));
diesel::joinable!(project_comments -> users (user_id));
diesel::joinable!(project_contributors -> projects (project_id));
diesel::joinable!(project_contributors -> users (user_id));
diesel::joinable!(project_frameworks -> frameworks (framework_id));
diesel::joinable!(project_frameworks -> projects (project_id));
diesel::joinable!(project_images -> projects (project_id));
diesel::joinable!(project_languages -> programming_languages (language_id));
diesel::joinable!(project_languages -> projects (project_id));
diesel::joinable!(project_likes -> projects (project_id));
diesel::joinable!(project_likes -> users (user_id));
diesel::joinable!(project_links -> projects (project_id));
diesel::joinable!(project_roadmaps -> projects (project_id));
diesel::joinable!(project_roadmaps -> roadmaps (roadmap_id));
diesel::joinable!(project_tags -> projects (project_id));
diesel::joinable!(project_tools -> projects (project_id));
diesel::joinable!(project_tools -> tools (tools_id));
diesel::joinable!(roadmap_events -> roadmaps (roadmap_id));
diesel::joinable!(roadmap_progress -> roadmaps (roadmap_id));
diesel::joinable!(skill_roadmaps -> roadmaps (roadmap_id));
diesel::joinable!(skill_roadmaps -> skills (skill_id));
diesel::joinable!(tools_image -> tools (tools_id));
diesel::joinable!(tools_roadmaps -> roadmaps (roadmap_id));
diesel::joinable!(tools_roadmaps -> tools (tools_id));
diesel::joinable!(user_image -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    achievements,
    analytics,
    blog_posts,
    certifications,
    comment_likes,
    comments,
    contacts,
    educations,
    flyway_schema_history,
    framework_images,
    framework_roadmaps,
    frameworks,
    git_updates,
    likes,
    milestones,
    programming_language_images,
    programming_language_roadmaps,
    programming_languages,
    project_comment_likes,
    project_comments,
    project_contributors,
    project_frameworks,
    project_images,
    project_languages,
    project_likes,
    project_links,
    project_roadmaps,
    project_tags,
    project_tools,
    projects,
    roadmap_events,
    roadmap_progress,
    roadmaps,
    skill_roadmaps,
    skills,
    socials,
    tools,
    tools_image,
    tools_roadmaps,
    user_image,
    users,
    work_experience,
);
