from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    wallet_balance = Column(Float, default=0.0)
    dosha = Column(String(20), default="vata")  # vata, pitta, kapha
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    bookings = relationship("Booking", back_populates="user")

class Hospital(Base):
    __tablename__ = "hospitals"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    location = Column(String(200))
    specialties = Column(Text)  # JSON string of specialties
    rating = Column(Float, default=4.0)
    
    slots = relationship("Slot", back_populates="hospital")

class Slot(Base):
    __tablename__ = "slots"
    
    id = Column(Integer, primary_key=True, index=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    doctor_name = Column(String(100))
    specialty = Column(String(100))
    date = Column(String(20))  # YYYY-MM-DD format
    time = Column(String(10))  # HH:MM format
    price = Column(Float)
    is_available = Column(Boolean, default=True)
    
    hospital = relationship("Hospital", back_populates="slots")
    bookings = relationship("Booking", back_populates="slot")

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    slot_id = Column(Integer, ForeignKey("slots.id"))
    status = Column(String(20), default="confirmed")  # confirmed, cancelled
    booking_date = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="bookings")
    slot = relationship("Slot", back_populates="bookings")

class Mantra(Base):
    __tablename__ = "mantras"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    content = Column(Text)
    dosha = Column(String(20))  # vata, pitta, kapha, all
    benefits = Column(Text)
    duration = Column(String(50))  # e.g., "5 minutes"

class Recipe(Base):
    __tablename__ = "recipes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    ingredients = Column(Text)
    instructions = Column(Text)
    dosha = Column(String(20))  # vata, pitta, kapha, all
    prep_time = Column(String(50))
    benefits = Column(Text)

class DietPlan(Base):
    __tablename__ = "diet_plans"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), index=True)
    description = Column(Text)
    dosha = Column(String(20))  # vata, pitta, kapha, all
    meal_plan = Column(Text)  # JSON string of meal plans
    duration = Column(String(50))  # e.g., "7 days"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)
