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
    user_id INT,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
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
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

CREATE TABLE achievements (
    achievement_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    issued_by VARCHAR(100),
    issued_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
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
    language_id INT,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
);

CREATE TABLE frameworks (
    framework_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    percentage FLOAT CHECK (percentage >= 0 AND percentage <= 100) NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    learning BOOLEAN DEFAULT FALSE,
    language_id INT,
    FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
);

CREATE TABLE framework_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    framework_id INT,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
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
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (language_id) REFERENCES programming_languages(language_id),
    FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
);

CREATE TABLE comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comment_likes (
    comment_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    git_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    language_id INT,
    framework_id INT,
    FOREIGN KEY (language_id) REFERENCES programming_languages(language_id),
    FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
);

CREATE TABLE project_images (
    image_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),
    alt_text VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE project_tags (
    tag_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    tag_name VARCHAR(50),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE project_links (
    link_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    link_name VARCHAR(50),
    link_url VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE project_comments (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE project_likes (
    like_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE project_comment_likes (
    comment_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_id) REFERENCES project_comments(comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE project_contributors (
    contributor_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    user_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE git_updates (
    update_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    commit_hash VARCHAR(40) NOT NULL,
    message TEXT NOT NULL,
    is_commit BOOLEAN DEFAULT TRUE,
    is_pull_request BOOLEAN DEFAULT FALSE,
    is_issue BOOLEAN DEFAULT FALSE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE analytics (
    analytics_id INT PRIMARY KEY AUTO_INCREMENT,
    page_name VARCHAR(100),
    views INT DEFAULT 0,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE roadmaps (
    roadmap_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_title VARCHAR(255) NOT NULL,
    roadmap_description TEXT
);

CREATE TABLE skill_roadmaps (
    roadmap_id INT,
    skill_id INT,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

CREATE TABLE programming_language_roadmaps (
    roadmap_id INT,
    language_id INT,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id),
    FOREIGN KEY (language_id) REFERENCES programming_languages(language_id)
);

CREATE TABLE framework_roadmaps (
    roadmap_id INT,
    framework_id INT,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id),
    FOREIGN KEY (framework_id) REFERENCES frameworks(framework_id)
);

CREATE TABLE project_roadmaps (
    roadmap_id INT,
    project_id INT,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

CREATE TABLE milestones (
    milestone_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT,
    milestone_title VARCHAR(255) NOT NULL,
    milestone_description TEXT,
    milestone_link VARCHAR(255),
    target_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
);

CREATE TABLE roadmap_events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT,
    event_title VARCHAR(255) NOT NULL,
    event_description TEXT,
    event_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_type ENUM('milestone', 'completed', 'in_progress') NOT NULL,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
);

CREATE TABLE roadmap_progress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    roadmap_id INT,
    progress_percentage FLOAT CHECK (progress_percentage BETWEEN 0 AND 100),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
);

-- Indexing frequently accessed foreign key columns
CREATE INDEX idx_user_id ON users(user_id);
CREATE INDEX idx_post_id ON blog_posts(post_id);
CREATE INDEX idx_project_id ON projects(project_id);

-- Indexing foreign key columns in related tables for faster lookups
CREATE INDEX idx_comment_user ON comments(user_id);
CREATE INDEX idx_like_post ON likes(post_id);
CREATE INDEX idx_project_contributors_user ON project_contributors(user_id);

-- Indexing roadmaps for faster access
CREATE INDEX idx_skill_roadmap ON skill_roadmaps(skill_id);
CREATE INDEX idx_milestone_roadmap ON milestones(roadmap_id);

-- Add cascade delete and update rules
ALTER TABLE user_image
ADD CONSTRAINT fk_user_image_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE project_contributors
ADD CONSTRAINT fk_project_contributors_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE SET NULL ON UPDATE CASCADE;

-- Set comments to be deleted if the post is deleted
ALTER TABLE comments
ADD CONSTRAINT fk_comments_post
FOREIGN KEY (post_id) REFERENCES blog_posts(post_id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- Handle projects and related data
ALTER TABLE project_images
ADD CONSTRAINT fk_project_images
FOREIGN KEY (project_id) REFERENCES projects(project_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE project_comments
ADD CONSTRAINT fk_project_comments
FOREIGN KEY (project_id) REFERENCES projects(project_id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE milestones
ADD CONSTRAINT fk_milestones_roadmap
FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
ON DELETE CASCADE ON UPDATE CASCADE;
