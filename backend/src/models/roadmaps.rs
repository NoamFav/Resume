// backend/src/models/roadmaps.roadmaps
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel_derive_enum::DbEnum;
use diesel::mysql::MysqlConnection;
use crate::schema::roadmaps;
use crate::schema::roadmap_progress;
use crate::schema::roadmap_events;

#[derive(Debug, Serialize, Deserialize, DbEnum)]
pub enum RoadmapEventsEventTypeEnum {
    Milestone,
    Completed,
    InProgress,
}

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[table_name = "roadmaps"]
#[primary_key(roadmap_id)]
pub struct Roadmap {
    pub roadmap_id: i32,
    pub roadmap_name: String,
    pub description: Option<String>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[table_name = "roadmap_progress"]
#[primary_key(progress_id)]
#[belongs_to(Roadmap, foreign_key = "roadmap_id")]
pub struct RoadmapProgress {
    pub progress_id: i32,
    pub roadmap_id: Option<i32>,
    pub progress_percentage: Option<f32>,
    pub last_updated: Option<chrono::NaiveDateTime>,
}

#[derive(Debug, Serialize, Deserialize, Queryable, Identifiable, Associations, QueryableByName, Selectable)]
#[table_name = "roadmap_events"]
#[primary_key(event_id)]
#[belongs_to(Roadmap, foreign_key = "roadmap_id")]
pub struct RoadmapEvent {
    pub event_id: i32,
    pub roadmap_id: Option<i32>,
    pub event_title: String,
    pub event_description: Option<String>,
    pub event_date: Option<chrono::NaiveDateTime>,
    pub event_type: RoadmapEventsEventTypeEnum,
}


type DbConnection = PooledConnection<ConnectionManager<MysqlConnection>>;

impl Roadmap {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<Roadmap>> {
        roadmaps::table.load::<Roadmap>(conn)
    }
}

impl RoadmapProgress {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<RoadmapProgress>> {
        roadmap_progress::table.load::<RoadmapProgress>(conn)
    }
}

impl RoadmapEvent {
    pub fn all(conn: &DbConnection) -> QueryResult<Vec<RoadmapEvent>> {
        roadmap_events::table.load::<RoadmapEvent>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "roadmaps"]
pub struct NewRoadmap {
    pub roadmap_name: String,
    pub description: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "roadmap_progress"]
pub struct NewRoadmapProgress {
    pub roadmap_id: Option<i32>,
    pub progress_percentage: Option<f32>,
    pub last_updated: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[table_name = "roadmap_events"]
pub struct NewRoadmapEvent {
    pub roadmap_id: Option<i32>,
    pub event_title: String,
    pub event_description: Option<String>,
    pub event_date: Option<chrono::NaiveDateTime>,
    pub event_type: RoadmapEventsEventTypeEnum,
}
