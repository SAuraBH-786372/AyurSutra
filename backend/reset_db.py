#!/usr/bin/env python3

from database import Base, engine, create_tables
from seed_data import seed_all_data
from sqlalchemy import text

def reset_database():
    print("Dropping all tables with CASCADE...")
    
    # Drop tables manually with CASCADE
    with engine.connect() as conn:
        conn.execute(text("DROP TABLE IF EXISTS bookings CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS slots CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS hospitals CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS users CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS mantras CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS recipes CASCADE"))
        conn.execute(text("DROP TABLE IF EXISTS diet_plans CASCADE"))
        conn.commit()
    
    print("Creating tables...")
    create_tables()
    
    print("Seeding data...")
    seed_all_data()
    
    print("Database reset complete!")

if __name__ == "__main__":
    reset_database()
