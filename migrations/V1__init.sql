CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    password_hash VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_image (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_image_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE socials (
    social_id INT PRIMARY KEY AUTO_INCREMENT,
    social_name VARCHAR(50) NOT NULL,
    social_url VARCHAR(255) NOT NULL
);

CREATE TABLE contacts (
    contact_id INT PRIMARY KEY AUTO_INCREMENT,
    contact_name VARCHAR(50) NOT NULL,
    contact_value VARCHAR(255) NOT NULL
);

CREATE TABLE skills (
    skill_id INT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(50) NOT NULL,
    skill_percentage FLOAT CHECK (skill_percentage >= 0 AND skill_percentage <= 100) NOT NULL
);

CREATE TABLE educations (
    education_id INT PRIMARY KEY AUTO_INCREMENT,
    school_name VARCHAR(100) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    field_of_study VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE work_experience (
    work_id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) NOT NULL,
    position VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NULL
);

CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issued_by VARCHAR(100),
    issued_date DATE,
    CONSTRAINT fk_achievements_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE certifications (
    certification_id INT PRIMARY KEY AUTO_INCREMENT,
    certification_name VARCHAR(255) NOT NULL,
    certification_date DATE NOT NULL,
    grade FLOAT CHECK (grade >= 0 AND grade <= 100),
    organization VARCHAR(100)
);

CREATE TABLE programming_languages (
    language_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    percentage FLOAT CHECK (percentage >= 0 AND percentage <= 100) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    learning BOOLEAN DEFAULT FALSE
);

CREATE TABLE programming_language_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    language_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_programming_language_images_language
        FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE frameworks (
    framework_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    percentage FLOAT CHECK (percentage >= 0 AND percentage <= 100) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    learning BOOLEAN DEFAULT FALSE,
    language_id INT,
    CONSTRAINT fk_frameworks_language
        FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE framework_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    framework_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_framework_images_framework
        FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tools (
    tools_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    percentage FLOAT CHECK (percentage >= 0 AND percentage <= 100) NOT NULL,
    favorite BOOLEAN NOT NULL,
    learning BOOLEAN NOT NULL
);

CREATE TABLE tools_image (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    tools_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tools_image_tools
        FOREIGN KEY (tools_id) REFERENCES tools(tools_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE blog_posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    language_id INT,
    framework_id INT,
    CONSTRAINT fk_blog_posts_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_blog_posts_language
        FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT fk_blog_posts_framework
        FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_post
        FOREIGN KEY (post_id) REFERENCES blog_posts(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comments_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_likes_post
        FOREIGN KEY (post_id) REFERENCES blog_posts(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_likes_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE comment_likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_id INT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_likes_comment
        FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_comment_likes_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT unique_comment_user
        UNIQUE (comment_id, user_id)
);

CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    git_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE project_languages (
    project_id INT NOT NULL,
    language_id INT NOT NULL,
    PRIMARY KEY (project_id, language_id),
    CONSTRAINT fk_project_languages_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_languages_language
        FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_frameworks (
    project_id INT NOT NULL,
    framework_id INT NOT NULL,
    PRIMARY KEY (project_id, framework_id),
    CONSTRAINT fk_project_frameworks_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_frameworks_framework
        FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_tools (
    project_id INT NOT NULL,
    tools_id INT NOT NULL,
    PRIMARY KEY (project_id, tools_id),
    CONSTRAINT fk_project_tools_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_tools_tools
        FOREIGN KEY (tools_id) REFERENCES tools(tools_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_images
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    CONSTRAINT fk_project_tags_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_links (
    link_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    link_name VARCHAR(50) NOT NULL,
    link_url VARCHAR(255) NOT NULL,
    CONSTRAINT fk_project_links_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_comments_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_comments_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_likes_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_likes_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT unique_project_user
        UNIQUE (project_id, user_id)
);

CREATE TABLE project_comment_likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    comment_id INT NOT NULL,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_comment_likes_comment
        FOREIGN KEY (comment_id) REFERENCES project_comments(comment_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_comment_likes_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT unique_project_comment_user
        UNIQUE (comment_id, user_id)
);

CREATE TABLE project_contributors (
    project_id INT NOT NULL,
    user_id INT,
    PRIMARY KEY (project_id, user_id),
    CONSTRAINT fk_project_contributors_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_contributors_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE git_updates (
    update_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT NOT NULL,
    commit_hash VARCHAR(40) NOT NULL,
    message TEXT NOT NULL,
    is_commit BOOLEAN DEFAULT TRUE,
    is_pull_request BOOLEAN DEFAULT FALSE,
    is_issue BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_git_updates_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE analytics (
    analytics_id INT PRIMARY KEY AUTO_INCREMENT,
    page_name VARCHAR(100),
    views INT DEFAULT 0,
    user_id INT,
    CONSTRAINT fk_analytics_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE roadmaps (
    roadmap_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_title VARCHAR(255) NOT NULL,
    roadmap_description TEXT
);

CREATE TABLE skill_roadmaps (
    roadmap_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (roadmap_id, skill_id),
    CONSTRAINT fk_skill_roadmaps_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_skill_roadmaps_skill
        FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE programming_language_roadmaps (
    roadmap_id INT NOT NULL,
    language_id INT NOT NULL,
    PRIMARY KEY (roadmap_id, language_id),
    CONSTRAINT fk_plr_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_plr_language
        FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE framework_roadmaps (
    roadmap_id INT NOT NULL,
    framework_id INT NOT NULL,
    PRIMARY KEY (roadmap_id, framework_id),
    CONSTRAINT fk_framework_roadmaps_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_framework_roadmaps_framework
        FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE project_roadmaps (
    roadmap_id INT NOT NULL,
    project_id INT NOT NULL,
    PRIMARY KEY (roadmap_id, project_id),
    CONSTRAINT fk_project_roadmaps_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_project_roadmaps_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tools_roadmaps (
    roadmap_id INT NOT NULL,
    tools_id INT NOT NULL,
    PRIMARY KEY (roadmap_id, tools_id),
    CONSTRAINT fk_tools_roadmaps_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_tools_roadmaps_tools
        FOREIGN KEY (tools_id) REFERENCES tools(tools_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE milestones (
    milestone_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT NOT NULL,
    milestone_title VARCHAR(255) NOT NULL,
    milestone_description TEXT,
    milestone_link VARCHAR(255),
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_milestones_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE roadmap_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT NOT NULL,
    event_title VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type VARCHAR(50) NOT NULL,
    CONSTRAINT fk_roadmap_events_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE roadmap_progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT NOT NULL,
    progress_percentage FLOAT CHECK (progress_percentage >= 0 AND progress_percentage <= 100) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_roadmap_progress_roadmap
        FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexing foreign key columns in related tables for faster lookups
CREATE INDEX idx_comment_user ON comments(user_id);
CREATE INDEX idx_like_post ON likes(post_id);
CREATE INDEX idx_project_contributors_user ON project_contributors(user_id);

-- Indexing roadmaps for faster access
CREATE INDEX idx_skill_roadmap_skill ON skill_roadmaps(skill_id);
CREATE INDEX idx_milestone_roadmap ON milestones(roadmap_id);

CREATE INDEX idx_plr_language_roadmap_language ON programming_language_roadmaps(language_id);
CREATE INDEX idx_tools_roadmap_tool ON tools_roadmaps(tools_id);
CREATE INDEX idx_framework_roadmap_framework ON framework_roadmaps(framework_id);

