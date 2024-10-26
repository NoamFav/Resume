// backend/src/models/personal.rs
use serde::{Deserialize, Serialize};
use r2d2::{PooleConnection, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::personal;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "work_experience"]
#[primary_key(work_id)]
pub struct WorkExperience {
    pub work_id: i32,
    pub company_name: String,
    pub position: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: Option<chrono::NaiveDate>,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "socials"]
#[primary_key(social_id)]
pub struct Social {
    pub social_id: i32,
    pub social_name: String,
    pub social_url: String,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "contacts"]
#[primary_key(contact_id)]
pub struct Contact {
    pub contact_id: i32,
    pub contact_name: String,
    pub contact_value: String,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "educations"]
#[primary_key(education_id)]
pub struct Education {
    pub education_id: i32,
    pub school_name: String,
    pub degree: String,
    pub major: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: chrono::NaiveDate,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "certifications"]
#[primary_key(certification_id)]
pub struct Certification {
    pub certification_id: i32,
    pub certification_name: String,
    pub certification_date: chrono::NaiveDate,
    pub grade: Option<f32>,
}
