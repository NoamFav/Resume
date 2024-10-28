// backend/src/models/roadmaps.roadmaps
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use diesel::mysql::MysqlConnection;
use crate::schema::roadmaps;
use crate::schema::roadmap_progress;
use crate::schema::roadmap_events;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = roadmaps)]
#[diesel(primary_key(roadmap_id))]
pub struct Roadmap {
    pub roadmap_id: i32,
    pub roadmap_name: String,
    pub description: Option<String>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = roadmap_progress)]
#[diesel(primary_key(progress_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct RoadmapProgress {
    pub progress_id: i32,
    pub roadmap_id: Option<i32>,
    pub progress_percentage: Option<f32>,
    pub last_updated: Option<chrono::NaiveDateTime>,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, Associations, QueryableByName, Selectable)]
#[diesel(table_name = roadmap_events)]
#[diesel(primary_key(event_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct RoadmapEvent {
    pub event_id: i32,
    pub roadmap_id: Option<i32>,
    pub event_title: String,
    pub event_description: Option<String>,
    pub event_date: Option<chrono::NaiveDateTime>,
    pub event_type: String,
}


type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl Roadmap {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<Roadmap>> {
        roadmaps::table.load::<Roadmap>(conn)
    }
}

impl RoadmapProgress {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<RoadmapProgress>> {
        roadmap_progress::table.load::<RoadmapProgress>(conn)
    }
}

impl RoadmapEvent {
    pub fn all(conn: &mut DbConnection) -> QueryResult<Vec<RoadmapEvent>> {
        roadmap_events::table.load::<RoadmapEvent>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = roadmaps)]
pub struct NewRoadmap {
    pub roadmap_title: String,
    pub roadmap_description: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = roadmap_progress)]
pub struct NewRoadmapProgress {
    pub roadmap_id: Option<i32>,
    pub progress_percentage: Option<f32>,
    pub last_updated: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = roadmap_events)]
pub struct NewRoadmapEvent {
    pub roadmap_id: Option<i32>,
    pub event_title: String,
    pub event_description: Option<String>,
    pub event_date: Option<chrono::NaiveDateTime>,
    pub event_type: String,
}
