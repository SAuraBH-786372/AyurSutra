from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
import google.generativeai as genai
import os
from dotenv import load_dotenv

from database import get_db, create_tables, User, Hospital, Slot, Booking, Mantra, Recipe, DietPlan
from auth import get_password_hash, verify_password, create_access_token, get_current_user
from schemas import (
    UserCreate, UserLogin, UserResponse, Token, BookingCreate, BookingResponse,
    SlotResponse, MantraResponse, RecipeResponse, DietPlanResponse,
    ChatMessage, ChatResponse
)
from seed_data import seed_all_data

load_dotenv()

app = FastAPI(title="SwasthyaSetu API", description="Ayurveda and Panchakarma Booking Platform")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-pro')

SIGNUP_BONUS = float(os.getenv("SIGNUP_BONUS", 1000))

@app.on_event("startup")
async def startup_event():
    create_tables()
    try:
        seed_all_data()
    except Exception as e:
        print(f"Seeding completed or skipped: {e}")

# Authentication endpoints
@app.post("/auth/signup", response_model=dict)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        # Check if user already exists
        db_user = db.query(User).filter(
            (User.username == user.username) | (User.email == user.email)
        ).first()
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered"
            )
        
        # Validate input
        if len(user.username) < 3:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username must be at least 3 characters long"
            )
        
        if len(user.password) < 6:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password must be at least 6 characters long"
            )
        
        # Create new user
        hashed_password = get_password_hash(user.password)
        db_user = User(
            username=user.username,
            email=user.email,
            hashed_password=hashed_password,
            wallet_balance=SIGNUP_BONUS,
            dosha=user.dosha
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        return {"message": "User created successfully", "wallet_bonus": SIGNUP_BONUS}
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"Signup error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal server error during signup"
        )

@app.post("/auth/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    # Try to find user by username first, then by email
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user:
        db_user = db.query(User).filter(User.email == user.username).first()
    
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password"
        )
    
    access_token_expires = timedelta(minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)))
    access_token = create_access_token(
        data={"sub": db_user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=UserResponse)
async def get_current_user_info(current_user: User = Depends(get_current_user)):
    return current_user

# Slot and booking endpoints
@app.get("/slots", response_model=list[SlotResponse])
async def get_available_slots(db: Session = Depends(get_db)):
    slots = db.query(Slot).filter(Slot.is_available == True).all()
    result = []
    for slot in slots:
        slot_dict = {
            "id": slot.id,
            "hospital_id": slot.hospital_id,
            "doctor_name": slot.doctor_name,
            "specialty": slot.specialty,
            "date": slot.date,
            "time": slot.time,
            "price": slot.price,
            "is_available": slot.is_available,
            "hospital": {
                "id": slot.hospital.id,
                "name": slot.hospital.name,
                "location": slot.hospital.location,
                "rating": slot.hospital.rating
            }
        }
        result.append(slot_dict)
    return result

@app.post("/bookings", response_model=dict)
async def create_booking(
    booking: BookingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Check if slot exists and is available
    slot = db.query(Slot).filter(Slot.id == booking.slot_id, Slot.is_available == True).first()
    if not slot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Slot not found or not available"
        )
    
    # Check if user has sufficient balance
    if current_user.wallet_balance < slot.price:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient wallet balance"
        )
    
    # Create booking
    db_booking = Booking(user_id=current_user.id, slot_id=slot.id)
    db.add(db_booking)
    
    # Update user wallet and slot availability
    current_user.wallet_balance -= slot.price
    slot.is_available = False
    
    db.commit()
    
    return {"message": "Booking created successfully", "remaining_balance": current_user.wallet_balance}

@app.get("/bookings", response_model=list[BookingResponse])
async def get_user_bookings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    bookings = db.query(Booking).filter(Booking.user_id == current_user.id).all()
    result = []
    for booking in bookings:
        booking_dict = {
            "id": booking.id,
            "slot_id": booking.slot_id,
            "status": booking.status,
            "booking_date": booking.booking_date,
            "slot": {
                "doctor_name": booking.slot.doctor_name,
                "specialty": booking.slot.specialty,
                "date": booking.slot.date,
                "time": booking.slot.time,
                "price": booking.slot.price,
                "hospital_name": booking.slot.hospital.name
            }
        }
        result.append(booking_dict)
    return result

@app.put("/bookings/{booking_id}/cancel")
async def cancel_booking(
    booking_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(
        Booking.id == booking_id,
        Booking.user_id == current_user.id
    ).first()
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    
    if booking.status == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already cancelled"
        )
    
    # Cancel booking and refund
    booking.status = "cancelled"
    slot = db.query(Slot).filter(Slot.id == booking.slot_id).first()
    slot.is_available = True
    current_user.wallet_balance += slot.price
    
    db.commit()
    
    return {"message": "Booking cancelled successfully", "refunded_amount": slot.price}

# Content endpoints
@app.get("/mantras", response_model=list[MantraResponse])
async def get_mantras(dosha: str = None, db: Session = Depends(get_db)):
    query = db.query(Mantra)
    if dosha:
        query = query.filter((Mantra.dosha == dosha) | (Mantra.dosha == "all"))
    return query.all()

@app.get("/recipes", response_model=list[RecipeResponse])
async def get_recipes(dosha: str = None, db: Session = Depends(get_db)):
    query = db.query(Recipe)
    if dosha:
        query = query.filter((Recipe.dosha == dosha) | (Recipe.dosha == "all"))
    return query.all()

@app.get("/diet-plans", response_model=list[DietPlanResponse])
async def get_diet_plans(dosha: str = None, db: Session = Depends(get_db)):
    query = db.query(DietPlan)
    if dosha:
        query = query.filter((DietPlan.dosha == dosha) | (DietPlan.dosha == "all"))
    return query.all()

# Chatbot endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    message: ChatMessage,
    current_user: User = Depends(get_current_user)
):
    try:
        # Create a context-aware prompt for Ayurveda
        prompt = f"""
        You are an expert Ayurveda and Panchakarma consultant. The user's dosha is {current_user.dosha}.
        Please provide helpful, accurate information about Ayurveda, Panchakarma treatments, diet recommendations,
        lifestyle advice, and general wellness tips. Keep responses informative but concise.
        
        User question: {message.message}
        """
        
        response = model.generate_content(prompt)
        return ChatResponse(response=response.text)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error generating AI response"
        )

# Wallet endpoint
@app.get("/wallet")
async def get_wallet_balance(current_user: User = Depends(get_current_user)):
    return {"balance": current_user.wallet_balance}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
