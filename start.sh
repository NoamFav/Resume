#!/bin/bash

# Create the backend directory structure
echo "Setting up the Rust backend..."
mkdir -p backend/src/routes backend/src/models backend/src/services

# Create essential backend files
cat <<EOL > backend/Cargo.toml
[package]
name = "my_rust_project"
version = "0.1.0"
edition = "2021"

[dependencies]
actix-web = "4.0"
sqlx = { version = "0.5", features = ["mysql", "runtime-tokio-native-tls"] }
dotenv = "0.15"
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
tokio = { version = "1", features = ["full"] }

EOL

# Create the .env file for backend environment variables
cat <<EOL > backend/.env
DATABASE_URL=mysql://root:example@db:3306/my_db
RUST_LOG=info
EOL

# Create the Dockerfile for Rust backend
cat <<EOL > backend/Dockerfile
FROM rust:1.56 as builder

WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt-get install -y libmysqlclient-dev
RUN cargo build --release

FROM debian:buster-slim
COPY --from=builder /usr/src/app/target/release/my_rust_project /usr/local/bin/my_rust_project

CMD ["my_rust_project"]
EOL

# Create backend source files
cat <<EOL > backend/src/main.rs
use actix_web::{web, App, HttpServer};
mod routes;
mod services;
mod models;
mod config;
mod database;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .configure(routes::auth_routes::config)
            .configure(routes::user_routes::config)
    })
    .bind("0.0.0.0:8000")?
    .run()
    .await
}
EOL

# Create routes files
cat <<EOL > backend/src/routes/auth_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/login", web::get().to(login));
}

async fn login() -> impl Responder {
    HttpResponse::Ok().json("Login Successful")
}
EOL

cat <<EOL > backend/src/routes/user_routes.rs
use actix_web::{web, HttpResponse, Responder};

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.route("/user", web::get().to(get_user));
}

async fn get_user() -> impl Responder {
    HttpResponse::Ok().json("User Route")
}
EOL

# Create config.rs and database.rs
cat <<EOL > backend/src/config.rs
use dotenv::dotenv;
use std::env;

pub fn init() {
    dotenv().ok();
    env_logger::init();
}

pub fn get_database_url() -> String {
    env::var("DATABASE_URL").expect("DATABASE_URL must be set")
}
EOL

cat <<EOL > backend/src/database.rs
use sqlx::{MySqlPool, Pool};

pub async fn connect() -> Pool<MySql> {
    let db_url = crate::config::get_database_url();
    MySqlPool::connect(&db_url).await.expect("Failed to connect to MySQL")
}
EOL

# Create models and services files
cat <<EOL > backend/src/models/user.rs
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
}
EOL

cat <<EOL > backend/src/models/mod.rs
pub mod user;
EOL

cat <<EOL > backend/src/services/user_service.rs
pub fn get_user_info() -> String {
    "User info".to_string()
}
EOL

cat <<EOL > backend/src/services/auth_service.rs
pub fn login_user() -> String {
    "Login success".to_string()
}
EOL

# Frontend setup
echo "Setting up the React frontend with Tailwind CSS..."
mkdir -p frontend/src/{components,pages,styles} frontend/public

# Create essential frontend files
cat <<EOL > frontend/package.json
{
  "name": "frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "axios": "^0.24.0",
    "tailwindcss": "^2.2.19"
  },
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
EOL

# Create frontend .env
cat <<EOL > frontend/.env
REACT_APP_API_URL=http://localhost:8000
EOL

# Create Webpack and Tailwind configuration files
cat <<EOL > frontend/webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    port: 3000
  }
};
EOL

cat <<EOL > frontend/tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
EOL

cat <<EOL > frontend/postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOL

# Create React app entry file
cat <<EOL > frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
EOL

# Create basic App component
cat <<EOL > frontend/src/App.jsx
import React from 'react';

const App = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl">Welcome to React with Tailwind and Rust API!</h1>
    </div>
  );
}

export default App;
EOL

# Create Tailwind CSS base file
cat <<EOL > frontend/src/styles/tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

# Create HTML template
cat <<EOL > frontend/public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Rust + React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

# Docker Compose setup
echo "Creating docker-compose.yml..."
cat <<EOL > docker-compose.yml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    env_file:
      - ./backend/.env
    depends_on:
      - db
    networks:
      - app-network

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: example
      MYSQL_DATABASE: my_db
    volumes:
      - db_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - app-network

volumes:
  db_data:

networks:
  app-network:
EOL

# Additional setup files
touch .gitignore README.md
echo "node_modules/" > .gitignore

# Final message
echo "Project structure set up successfully!"
