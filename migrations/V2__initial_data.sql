start transaction
;

INSERT INTO socials (social_name, social_url) VALUES
    ('instagram', 'https://www.instagram.com/noam_fvr/?utm_source=ig_web_button_share_sheet'),
    ('linkedin', 'www.linkedin.com/in/noam-favier-5461b7297'),
    ('github', 'https://github.com/NoamFav'),
    ('leetcode', 'https://leetcode.com/u/letraceur/');

INSERT INTO contacts (contact_name, contact_value) VALUES
    ('email', 'noam.favier@icloud.com'),
    ('phone', '+33619773133'),
    ('address', 'Maastricht, Netherlands');

INSERT INTO skills (skill_name, skill_percentage) VALUES
    ('Programming', 80),
    ('Data Analysis', 70),
    ('Machine Learning', 60),
    ('Web Development', 50),
    ('DevOps', 40),
    ('Networking', 40),
    ('Databases', 70),
    ('Software Engineering', 80),
    ('Team Management', 70),
    ('Project Management', 60),
    ('Problem Solving', 80),
    ('Communication', 70),
    ('Creativity', 60),
    ('Algorithms', 80),
    ('Data Structures', 80),
    ('Statistics', 70),
    ('Mathematics', 70),
    ('Physics', 60),
    ('Business Development', 50),
    ('Product Management', 50),
    ('Design', 40),
    ('UX/UI', 40),
    ('Writing', 40),
    ('Public Speaking', 80),
    ('Languages', 90);

INSERT INTO educations (school_name, degree, field_of_study, start_date, end_date) VALUES
    ("Lycee Jeanne D'arc", 'French Baccalaureate', 'Math, Physics, English', '2020-09-01', '2023-06-30'),
    ('Maastricht University', 'Bachelor of Science', 'Data Science and Artificial Intelligence', '2023-09-01', '2026-06-30');

INSERT INTO work_experience (company_name, position, start_date, end_date, description) VALUES
    ('Freelance', 'Web Developer', '2020-09-01', NULL, 'Developing websites for clients'),
    ('Freelance','Software Engineer','2022-09-01',NULL,'Developing software solutions for clients'),
(
    'Capgemini',
    'Internship',
    '2020-02-01',
    '2020-03-01',
    'Developing web applications using Java and Spring'
),
(
    'Duplessi Farm',
    'Data management',
    '2021-07-01',
    '2021-08-01',
    'Managing and analyzing data for the farm'
),
(
    'Maastricht University',
    'Student Ambassador',
    '2024-10-12',
    '2026-06-30',
    'Representing the university at events and fairs'
),
(
    'Maastricht University',
    'Project Manager',
    '2023-09-01',
    '2024-01-20',
    'Managing a team of developers on a research project'
),
(
    'Maastricht University',
    'Project Manager',
    '2024-02-01',
    '2024-06-30',
    'Leading a team of researchers on a data analysis project'
),
(
    'Maastricht University',
    'Project Manager',
    '2024-09-01',
    '2025-01-20',
    'Coordinating a team of developers on a software project'
);


INSERT INTO certifications (certification_name, certification_date, grade, organization) VALUES
    ('French Baccalaureate', '2023-06-30', 75, 'French Ministry of Educations'),
    ('TOEFL IBT', '2022-06-22', 85, 'ETS'),
    ('Python Sololearn', '2022-12-24', NULL, 'Sololearn'),
    ('Java Sololearn', '2023-11-01', NULL, 'Sololearn'),
    ('HTML Sololearn', '2022-04-07', NULL, 'Sololearn'),
    ('SQL Sololearn', '2024-10-13', NULL, 'Sololearn'),
    ('Machine Learning Sololearn', '2023-04-03', NULL, 'Sololearn');

INSERT INTO programming_languages (name, percentage, favorite, learning) VALUES
    ('Java', 90, TRUE, FALSE),
    ('Python', 70, FALSE, FALSE),
    ('Rust', 50, TRUE, TRUE),
    ('C++', 30, TRUE, TRUE),
    ('Swift', 20, FALSE, TRUE),
    ('C', 70, FALSE, FALSE),
    ('Javascript', 60, FALSE, TRUE),
    ('Typescript', 50, TRUE, FALSE),
    ('HTML/CSS', 90, FALSE, FALSE),
    ('SQL', 50, FALSE, TRUE),
    ('Go', 0, TRUE, FALSE),
    ('C#', 40, FALSE, FALSE),
    ('Lua', 60, TRUE, TRUE),
    ('Kotlin', 20, FALSE, FALSE),
    ('PHP', 20, FALSE, FALSE),
    ('Ruby', 20, FALSE, FALSE),
    ('Perl', 10, FALSE, FALSE),
    ('Scala', 10, FALSE, FALSE),
    ('Haskell', 10, FALSE, FALSE),
    ('R', 20, FALSE, FALSE),
    ('Matlab', 40, FALSE, FALSE),
    ('Julia', 10, FALSE, FALSE),
    ('Dart', 10, FALSE, FALSE),
    ('Objective-C', 10, FALSE, FALSE),
    ('Shell', 30, FALSE, TRUE),
    ('Bash', 60, FALSE, TRUE),
    ('Powershell', 20, FALSE, TRUE),
    ('Vimscript', 40, FALSE, TRUE),
    ('Groovy', 0, FALSE, FALSE),
    ('Erlang', 0, FALSE, FALSE),
    ('Elixir', 0, FALSE, FALSE),
    ('F#', 0, FALSE, FALSE),
    ('Fortran', 0, FALSE, FALSE),
    ('COBOL', 0, FALSE, FALSE),
    ('Pascal', 0, FALSE, FALSE),
    ('Zig', 0, FALSE, FALSE),
    ('Assembly', 0, FALSE, FALSE),
    ('Crystal', 0, FALSE, FALSE),
    ('Nim', 0, FALSE, FALSE),
    ('D', 0, FALSE, FALSE),
    ('Ada', 0, FALSE, FALSE),
    ('Scheme', 0, FALSE, FALSE),
    ('Lisp', 0, FALSE, FALSE),
    ('Prolog', 0, FALSE, FALSE),
    ('Smalltalk', 0, FALSE, FALSE),
    ('Dylan', 0, FALSE, FALSE),
    ('Eiffel', 0, FALSE, FALSE),
    ('Tcl', 0, FALSE, FALSE),
    ('Forth', 0, FALSE, FALSE),
    ('APL', 0, FALSE, FALSE),
    ('Logo', 0, FALSE, FALSE),
    ('Rexx', 0, FALSE, FALSE),
    ('Awk', 0, FALSE, FALSE),
    ('Sed', 0, FALSE, FALSE),
    ('MUMPS', 0, FALSE, FALSE),
    ('J', 0, FALSE, FALSE),
    ('K', 0, FALSE, FALSE),
    ('Visual Basic', 0, FALSE, FALSE),
    ('RPG', 0, FALSE, FALSE),
    ('V', 0, FALSE, FALSE),
    ('Turing', 0, FALSE, FALSE),
    ('ActionScript', 0, FALSE, FALSE),
    ('ColdFusion', 0, FALSE, FALSE),
    ('OCaml', 0, FALSE, FALSE);

INSERT INTO frameworks (name, percentage, favorite, learning, language_id) VALUES
-- Java frameworks (language_id = 1)
    ('Spring', 90, TRUE, FALSE, 1),
    ('Hibernate', 0, FALSE, FALSE, 1),
    ('LWJGL', 80, TRUE, TRUE, 1),
    ('Apache Kafka', 40, FALSE, FALSE, 1),
    ('Maven', 80, TRUE, TRUE, 1),
    ('Gradle', 50, FALSE, FALSE, 1),
    ('Quarkus', 0, FALSE, FALSE, 1),
    ('Micronaut', 0, FALSE, FALSE, 1),
    ('Jersey', 0, FALSE, FALSE, 1),
    ('JavaFX', 90, TRUE, FALSE, 1),
    ('Swing', 70, FALSE, FALSE, 1),
    ('JUnit', 0, FALSE, FALSE, 1),
    ('Mockito', 0, FALSE, FALSE, 1),

-- Python frameworks (language_id = 2)
    ('Flask', 70, FALSE, FALSE, 2),
    ('Django', 30, FALSE, FALSE, 2),
    ('Tkinter', 60, FALSE, TRUE, 2),
    ('Matplotlib', 90, FALSE, TRUE, 2),
    ('Scikit-learn', 60, TRUE, TRUE, 2),
    ('Pandas', 80, TRUE, FALSE, 2),
    ('PyTorch', 50, TRUE, TRUE, 2),
    ('TensorFlow', 60, FALSE, TRUE, 2),
    ('FastAPI', 60, FALSE, FALSE, 2),
    ('NumPy', 85, TRUE, TRUE, 2),
    ('Pydantic', 0, FALSE, FALSE, 2),
    ('Celery', 0, FALSE, FALSE, 2),

-- Rust frameworks (language_id = 3)
    ('Rocket', 0, FALSE, FALSE, 3),
    ('Tide', 0, FALSE, FALSE, 3),
    ('Actix', 30, FALSE, FALSE, 3),
    ('Tokio', 20, FALSE, FALSE, 3),
    ('Diesel', 60, FALSE, TRUE, 3),
    ('Serde', 0, FALSE, FALSE, 3),
    ('Hyper', 0, FALSE, FALSE, 3),
    ('Warp', 0, FALSE, FALSE, 3),

-- C++ frameworks (language_id = 4)
    ('Qt', 0, FALSE, FALSE, 4),
    ('Boost', 0, FALSE, FALSE, 4),
    ('OpenGL', 60, TRUE, FALSE, 4),
    ('Poco', 0, FALSE, FALSE, 4),
    ('Boost.Asio', 0, FALSE, FALSE, 4),

-- Swift frameworks (language_id = 5)
    ('SwiftUI', 60, TRUE, TRUE, 5),
    ('Vapor', 0, FALSE, FALSE, 5),

-- JavaScript frameworks (language_id = 7)
    ('React', 80, TRUE, TRUE, 7),
    ('Vue.js', 0, FALSE, FALSE, 7),
    ('Node.js', 70, TRUE, TRUE, 7),
    ('Express.js', 0, FALSE, FALSE, 7),
    ('Angular', 0, FALSE, FALSE, 7),
    ('Svelte', 0, FALSE, FALSE, 7),
    ('Electron', 0, FALSE, FALSE, 7),
    ('Jest', 0, FALSE, FALSE, 7),
    ('Mocha', 0, FALSE, FALSE, 7),

-- TypeScript frameworks (language_id = 8)
    ('Next.js', 0, FALSE, FALSE, 8),
    ('Gatsby', 0, FALSE, FALSE, 8),

-- HTML/CSS frameworks (language_id = 9)
    ('Tailwind', 30, TRUE, TRUE, 9),
    ('Bootstrap', 0, FALSE, FALSE, 9),
    ('Sass', 0, FALSE, FALSE, 9),
    ('Less', 0, FALSE, FALSE, 9),

-- Go frameworks (language_id = 11)
    ('GORM', 0, FALSE, FALSE, 11),
    ('Gin', 0, FALSE, FALSE, 11),
    ('Echo', 0, FALSE, FALSE, 11),
    ('Beego', 0, FALSE, FALSE, 11),

-- C# frameworks (language_id = 12)
    ('ASP.NET', 0, FALSE, FALSE, 12),
    ('Unity', 80, TRUE, TRUE, 12),
    ('Blazor', 0, FALSE, FALSE, 12),
    ('Entity Framework', 0, FALSE, FALSE, 12),

-- Ruby frameworks (language_id = 16)
    ('Rails', 0, FALSE, FALSE, 16),
    ('Sinatra', 0, FALSE, FALSE, 16),

-- PHP frameworks (language_id = 15)
    ('Laravel', 0, FALSE, FALSE, 15),
    ('Symfony', 0, FALSE, FALSE, 15),
    ('Zend', 0, FALSE, FALSE, 15),

-- Elixir frameworks (language_id = 31)
    ('Phoenix', 0, FALSE, FALSE, 31),

-- Kotlin frameworks (language_id = 14)
    ('Ktor', 0, FALSE, FALSE, 14),
    ('Exposed', 0, FALSE, FALSE, 14),

-- Scala frameworks (language_id = 18)
    ('Play', 0, FALSE, FALSE, 18),
    ('Akka', 0, FALSE, FALSE, 18),

-- Haskell frameworks (language_id = 19)
    ('Yesod', 0, FALSE, FALSE, 19),

-- R frameworks (language_id = 20)
    ('Shiny', 0, FALSE, FALSE, 20),
    ('ggplot2', 0, FALSE, FALSE, 20),

-- SQL frameworks (language_id = 10)
    ('SQLAlchemy', 50, FALSE, FALSE, 10),
    ('Flyway', 70, FALSE, TRUE, 10),
    ('Liquibase', 0, FALSE, FALSE, 10),

-- Shell frameworks (language_id = 25)
    ('Bash', 60, TRUE, TRUE, 25),  -- 'Shell' is language_id = 25
    ('Powershell', 40, FALSE, TRUE, 27),

-- Julia frameworks (language_id = 22)
    ('Flux', 0, FALSE, FALSE, 22),

-- Dart frameworks (language_id = 23)
    ('Flutter', 0, FALSE, FALSE, 23),

-- Lua frameworks (language_id = 13)
    ('Love2D', 0, FALSE, FALSE, 13),

-- Lisp frameworks (language_id = 43)
    ('CLASP', 0, FALSE, FALSE, 43);

INSERT INTO tools (name, percentage, favorite, learning) VALUES
    ('Git', 90, TRUE, TRUE),
    ('Docker', 70, FALSE, TRUE),
    ('Kubernetes', 0, FALSE, TRUE),
    ('Jenkins', 0, FALSE, FALSE),
    ('Travis CI', 0, FALSE, FALSE),
    ('Circle CI', 0, FALSE, FALSE),
    ('Github Actions', 40, FALSE, FALSE),
    ('Jira', 0, FALSE, FALSE),
    ('Confluence', 0, FALSE, FALSE),
    ('Trello', 0, FALSE, FALSE),
    ('Slack', 0, FALSE, FALSE),
    ('Postman', 0, FALSE, FALSE),
    ('Insomnia', 0, FALSE, FALSE),
    ('Swagger', 0, FALSE, FALSE),
    ('Kibana', 0, FALSE, FALSE),
    ('Grafana', 0, FALSE, FALSE),
    ('Prometheus', 0, FALSE, FALSE),
    ('Elasticsearch', 0, FALSE, FALSE),
    ('Logstash', 0, FALSE, FALSE),
    ('Kafka', 0, FALSE, FALSE),
    ('RabbitMQ', 0, FALSE, FALSE),
    ('Redis', 0, FALSE, FALSE),
    ('MongoDB', 0, FALSE, FALSE),
    ('MySQL', 60, TRUE, TRUE),
    ('PostgreSQL', 0, FALSE, FALSE),
    ('SQLite', 0, FALSE, FALSE),
    ('Oracle', 0, FALSE, FALSE),
    ('SQL Server', 0, FALSE, FALSE),
    ('MariaDB', 0, FALSE, FALSE),
    ('Cassandra', 0, FALSE, FALSE),
    ('Hadoop', 0, FALSE, FALSE),
    ('Ansible', 0, FALSE, FALSE),
    ('Terraform', 0, FALSE, FALSE),
    ('Chef', 0, FALSE, FALSE),
    ('Puppet', 0, FALSE, FALSE),
    ('Vagrant', 0, FALSE, FALSE),
    ('Zabbix', 0, FALSE, FALSE),
    ('Nagios', 0, FALSE, FALSE),
    ('New Relic', 0, FALSE, FALSE),
    ('Splunk', 0, FALSE, FALSE),
    ('VMware', 0, FALSE, FALSE),
    ('VirtualBox', 0, FALSE, FALSE),
    ('Packer', 0, FALSE, FALSE),
    ('Artifactory', 0, FALSE, FALSE),
    ('SonarQube', 0, FALSE, FALSE),
    ('Harbor', 0, FALSE, FALSE);

INSERT INTO projects (title, description, git_url, created_at, updated_at) VALUES
    ('Resume', 'My resume website', 'https://github.com/NoamFav/Resume', '2024-07-12', '2024-10-23'),
    ('Pot_Pot_Golf', 'A mini-golf game in java', 'https://github.com/NoamFav/Pot_Pot_Golf', '2024-03-15', '2024-10-13'),
    ('QueryCrust', 'A pizzaria website with databases', 'https://github.com/NoamFav/QueryCrust', '2024-09-15', '2024-10-16'),
    ('Shadowed Hunter', 'A 2D puzzle, rogue like, text based game', 'https://github.com/NoamFav/ShadowedHunter', '2023-12-25', '2024-10-20'),
    ('Neovim Config', 'My neovim configuration', 'https://github.com/NoamFav/Nvim-config', '2024-09-19', '2024-10-18'),
    ('Chess Bot', 'A chess bot in rust', 'https://github.com/NoamFav/chess-bot', '2024-09-02', '2024-10-08'),
    ('PyNexus', 'An app in swift for learning Python (on hold)', 'https://github.com/NoamFav/PyNexus', '2024-09-03', '2024-09-17'),
    ('2077.nvim', 'Forked from 2077 theme, upgraded with lualine', 'https://github.com/NoamFav/2077.nvim', '2024-09-07', '2024-09-17'),
    ('Jarvis', 'Creating a personal assistant for macOS, in swift', 'https://github.com/NoamFav/daddy-s-home', '2024-09-23', '2024-10-04'),
    ('Mock-carpool', 'A basic destination app with pathfinding', 'https://github.com/NoamFav/Mock-Carpool', '2024-09-06','2024-09-17');

INSERT INTO project_languages (project_id, language_id) VALUES
-- Resume
    (1, 3), -- Rust (language_id = 3)
    (1, 7), -- JavaScript (language_id = 7)
    (1, 9), -- HTML/CSS (language_id = 9)
    (1, 26), -- Bash (language_id = 26)

-- Pot_Pot_Golf
    (2, 1), -- Java (language_id = 1)

-- QueryCrust
    (3, 2), -- Python (language_id = 2)
    (3, 9), -- HTML/CSS (language_id = 9)
    (3, 10), -- SQL (language_id = 10)
    (3, 26), -- Bash (language_id = 26)
    (3, 7), -- JavaScript (language_id = 7)

-- Shadowed Hunter
    (4, 1), -- Java (language_id = 1)

-- Neovim Config
    (5, 13), -- Lua (language_id = 13)
    (5, 28), -- Vimscript (language_id = 28)

-- Chess Bot
    (6, 3), -- Rust (language_id = 3)

-- PyNexus
    (7, 5), -- Swift (language_id = 5)

-- 2077.nvim
    (8, 13), -- Lua (language_id = 13)
    (8, 28), -- Vimscript (language_id = 28)

-- Jarvis
    (9, 5), -- Swift (language_id = 5)

-- Mock-carpool
    (10, 5);  -- Swift (language_id = 5)

INSERT INTO project_frameworks (project_id, framework_id) VALUES
-- Resume
    (1, 30),  -- Diesel (framework_id = 30)
    (1, 41),  -- React (framework_id = 41)
    (1, 52),  -- Tailwind (framework_id = 52)

-- Pot_Pot_Golf
    (2, 3),   -- LWJGL (framework_id = 3)
    (2, 5),   -- Maven (framework_id corrected from 6 to 5)

-- QueryCrust
    (3, 41),  -- React (framework_id = 41)
    (3, 52),  -- Tailwind (framework_id = 52)
    (3, 14),  -- Flask (framework_id = 14)
    (3, 77),  -- SQLAlchemy (framework_id = 77)

-- Shadowed Hunter
    (4, 11),  -- Swing (framework_id = 11)

-- PyNexus
    (7, 39),  -- SwiftUI (framework_id = 39)

-- Mock-Carpool
    (10, 39);  -- SwiftUI (framework_id = 39)

INSERT INTO project_tags (project_id, tag_name) VALUES

-- Resume
    (1, 'Web Development'),
    (1, 'React-based'),
    (1, 'Rust backend'),
    (1, 'Tailwind CSS'),
    (1, 'Databases'),
    (1, 'ORM'),

-- Pot_Pot_Golf
    (2, 'Game Development'),
    (2, 'Java'),
    (2, '3D'),
    (2, 'Physics'),
    (2, 'Bots AI'),

-- QueryCrust
    (3, 'Web Development'),
    (3, 'Flask'),
    (3, 'SQLAlchemy'),
    (3, 'Databases'),
    (3, 'Tailwind CSS'),
    (3, 'ORM'),

-- Shadowed Hunter
    (4, 'Game Development'),
    (4, 'Java'),
    (4, 'Text-based'),
    (4, 'Puzzle'),
    (4, 'Rogue-like'),

-- Neovim Config
    (5, 'Vim'),
    (5, 'Neovim'),
    (5, 'IDE'),

-- Chess Bot
    (6, 'Game Development'),
    (6, 'Chess'),
    (6, 'AI'),

-- PyNexus
    (7, 'App Development'),
    (7, 'Learning'),

-- 2077.nvim
    (8, 'Vim'),
    (8, 'Neovim'),
    (8, 'Theme'),
    (8, 'Lualine'),

-- Jarvis
    (9, 'App Development'),
    (9, 'Personal Assistant'),
    (9, 'macOS'),

-- Mock-carpool
    (10, 'App Development'),
    (10, 'Pathfinding'),
    (10, 'Destination');

INSERT INTO project_tools (project_id, tools_id) VALUES
-- Resume
    (1, 1),  -- Git (tools_id = 1)
    (1, 2),  -- Docker (tools_id = 2)
    (1, 7),  -- Github Actions (tools_id = 7)
    (1, 24), -- MySQL (tools_id = 24)

-- Pot_Pot_Golf
    (2, 1),  -- Git (tools_id = 1)

-- QueryCrust
    (3, 1),  -- Git (tools_id = 1)
    (3, 7),  -- Github Actions (tools_id = 7)
    (3, 24), -- MySQL (tools_id = 24)

-- Shadowed Hunter
    (4, 1),  -- Git (tools_id = 1)

-- Neovim Config
    (5, 1),  -- Git (tools_id = 1)

-- Chess Bot
    (6, 1),  -- Git (tools_id = 1)

-- PyNexus
    (7, 1),  -- Git (tools_id = 1)

-- 2077.nvim
    (8, 1),  -- Git (tools_id = 1)

-- Jarvis
    (9, 1),  -- Git (tools_id = 1)

-- Mock-carpool
    (10, 1);  -- Git (tools_id = 1)

INSERT INTO roadmaps (roadmap_id, roadmap_title, roadmap_description) VALUES
(1, 'Programming Language Roadmap', 'Roadmap for mastering programming languages'),
(2, 'Skills Roadmap', 'Roadmap for improving skills'),
(3, 'Tools Roadmap', 'Roadmap for mastering tools'),
(4, 'Frameworks Roadmap', 'Roadmap for mastering frameworks');

INSERT INTO programming_language_roadmaps (roadmap_id, language_id)
SELECT 1, language_id FROM programming_languages;

INSERT INTO skill_roadmaps (roadmap_id, skill_id)
SELECT 2, skill_id FROM skills;

INSERT INTO tools_roadmaps (roadmap_id, tools_id)
SELECT 3, tools_id FROM tools;

INSERT INTO framework_roadmaps (roadmap_id, framework_id)
SELECT 4, framework_id FROM frameworks;

INSERT INTO milestones (roadmap_id, milestone_title, milestone_description) VALUES

-- Programming language milestones
(1, 'Understand the Basics', 'Learn the syntax and basic constructs of the language'),
(1, 'Advanced Features', 'Dive into advanced topics and language features'),
(1, 'Build a Project', 'Create a project using the language'),
(1, 'Contribute to Open Source', 'Contribute to open-source projects in this language'),
(1, 'Achieve Mastery', 'Become an expert in the language'),

-- Skills milestones
(2, 'Assess Current Level', 'Evaluate your current skill level'),
(2, 'Set Improvement Goals', 'Define specific goals to improve the skill'),
(2, 'Practice Regularly', 'Engage in regular practice'),
(2, 'Seek Feedback', 'Get feedback from peers or mentors'),
(2, 'Achieve Proficiency', 'Reach a high level of proficiency'),

-- Tools milestones
(3, 'Install and Configure', 'Set up the tool in your environment'),
(3, 'Basic Usage', 'Understand basic commands and operations'),
(3, 'Advanced Features', 'Learn advanced functionalities'),
(3, 'Integrate into Workflow', 'Incorporate the tool into your regular workflow'),
(3, 'Optimize Usage', 'Use the tool more efficiently'),

-- Frameworks milestones
(4, 'Setup Environment', 'Install and configure the framework'),
(4, 'Simple Application', 'Create a basic app using the framework'),
(4, 'Best Practices', 'Study best practices and design patterns'),
(4, 'Complex Applications', 'Build more complex applications'),
(4, 'Master the Framework', 'Gain deep understanding and expertise');

commit
;

