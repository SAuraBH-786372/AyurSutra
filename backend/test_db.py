#!/usr/bin/env python3

import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from database import Base, engine, create_tables
from seed_data import seed_all_data

load_dotenv()

def test_database():
    try:
        # Test basic connection
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✓ Database connection successful")
        
        # Create tables
        print("Creating tables...")
        create_tables()
        print("✓ Tables created successfully")
        
        # Test seeding
        print("Seeding data...")
        seed_all_data()
        print("✓ Data seeded successfully")
        
        # Test basic query
        with engine.connect() as conn:
            result = conn.execute(text("SELECT COUNT(*) FROM hospitals"))
            count = result.scalar()
            print(f"✓ Found {count} hospitals in database")
            
        print("✓ Database setup complete!")
        
    except Exception as e:
        print(f"✗ Database error: {e}")
        return False
    
    return True

if __name__ == "__main__":
    test_database()
