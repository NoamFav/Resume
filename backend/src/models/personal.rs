// backend/src/models/personal.rs
use crate::schema::certifications;
use crate::schema::contacts;
use crate::schema::educations;
use crate::schema::socials;
use crate::schema::work_experience;
use diesel::mysql::MysqlConnection;
use diesel::prelude::*;
use diesel::r2d2::{ConnectionManager, PooledConnection};
use serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = work_experience)]
#[diesel(primary_key(work_id))]
pub struct WorkExperience {
    pub work_id: i32,
    pub company_name: String,
    pub position: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: Option<chrono::NaiveDate>,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = socials)]
#[diesel(primary_key(social_id))]
pub struct Social {
    pub social_id: i32,
    pub social_name: String,
    pub social_url: String,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = contacts)]
#[diesel(primary_key(contact_id))]
pub struct Contact {
    pub contact_id: i32,
    pub contact_name: String,
    pub contact_value: String,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = educations)]
#[diesel(primary_key(education_id))]
pub struct Education {
    pub education_id: i32,
    pub school_name: String,
    pub degree: String,
    pub major: String,
    pub start_date: chrono::NaiveDate,
    pub end_date: chrono::NaiveDate,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = certifications)]
#[diesel(primary_key(certification_id))]
pub struct Certification {
    pub certification_id: i32,
    pub certification_name: String,
    pub certification_date: chrono::NaiveDate,
    pub grade: Option<f32>,
}

type PersonalConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl WorkExperience {
    pub fn all(conn: &mut PersonalConnection) -> QueryResult<Vec<WorkExperience>> {
        work_experience::table.load::<WorkExperience>(conn)
    }
}

impl Social {
    pub fn all(conn: &mut PersonalConnection) -> QueryResult<Vec<Social>> {
        socials::table.load::<Social>(conn)
    }
}

impl Contact {
    pub fn all(conn: &mut PersonalConnection) -> QueryResult<Vec<Contact>> {
        contacts::table.load::<Contact>(conn)
    }
}

impl Education {
    pub fn all(conn: &mut PersonalConnection) -> QueryResult<Vec<Education>> {
        educations::table.load::<Education>(conn)
    }
}

impl Certification {
    pub fn all(conn: &mut PersonalConnection) -> QueryResult<Vec<Certification>> {
        certifications::table.load::<Certification>(conn)
    }
}
