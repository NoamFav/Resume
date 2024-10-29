// backend/src/models/skills.rs
use serde::{Deserialize, Serialize};
use diesel::r2d2::{ConnectionManager, PooledConnection};
use diesel::prelude::*;
use diesel::mysql::MysqlConnection;
use crate::schema::skills;
use crate::schema::skill_roadmaps;
use crate::models::roadmaps::Roadmap;

#[derive(Queryable, Identifiable, Serialize, Deserialize, Debug)]
#[diesel(table_name = skills)]
#[diesel(primary_key(skill_id))]
pub struct Skill {
    pub skill_id: i32,
    pub skill_name: String,
    pub skill_percentage: f32,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize, Debug)]
#[diesel(table_name = skill_roadmaps)]
#[diesel(primary_key(roadmap_id, skill_id))]
#[diesel(belongs_to(Skill, foreign_key = skill_id))]
#[diesel(belongs_to(Roadmap, foreign_key = roadmap_id))]
pub struct SkillRoadmap {
    pub roadmap_id: i32,
    pub skill_id: i32,
}

type SkillConnection = PooledConnection<ConnectionManager<MysqlConnection>>;
impl Skill {
    pub fn all(conn: &mut SkillConnection) -> QueryResult<Vec<Skill>> {
        skills::table.load::<Skill>(conn)
    }
}

impl SkillRoadmap {
    pub fn all(conn: &mut SkillConnection) -> QueryResult<Vec<SkillRoadmap>> {
        skill_roadmaps::table.load::<SkillRoadmap>(conn)
    }

    pub fn find_by_skill_id(skill_id: i32, conn: &mut SkillConnection) -> QueryResult<Vec<SkillRoadmap>> {
        skill_roadmaps::table.filter(skill_roadmaps::skill_id.eq(skill_id)).load::<SkillRoadmap>(conn)
    }
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = skills)]
pub struct NewSkill {
    pub skill_name: String,
    pub skill_percentage: f32,
}

#[derive(Insertable, Serialize, Deserialize, Debug)]
#[diesel(table_name = skill_roadmaps)]
pub struct NewSkillRoadmap {
    pub roadmap_id: i32,
    pub skill_id: i32,
}
