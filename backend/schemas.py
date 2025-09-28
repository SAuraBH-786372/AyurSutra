from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime
import re

# User schemas
class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    dosha: Optional[str] = "vata"
    
    @validator('email')
    def validate_email(cls, v):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    wallet_balance: float
    dosha: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

# Booking schemas
class BookingCreate(BaseModel):
    slot_id: int

class BookingResponse(BaseModel):
    id: int
    slot_id: int
    status: str
    booking_date: datetime
    slot: dict

    class Config:
        from_attributes = True

# Slot schemas
class SlotResponse(BaseModel):
    id: int
    hospital_id: int
    doctor_name: str
    specialty: str
    date: str
    time: str
    price: float
    is_available: bool
    hospital: dict

    class Config:
        from_attributes = True

# Content schemas
class MantraResponse(BaseModel):
    id: int
    title: str
    content: str
    dosha: str
    benefits: str
    duration: str

    class Config:
        from_attributes = True

class RecipeResponse(BaseModel):
    id: int
    title: str
    ingredients: str
    instructions: str
    dosha: str
    prep_time: str
    benefits: str

    class Config:
        from_attributes = True

class DietPlanResponse(BaseModel):
    id: int
    title: str
    description: str
    dosha: str
    meal_plan: str
    duration: str

    class Config:
        from_attributes = True

# Chatbot schema
class ChatMessage(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
