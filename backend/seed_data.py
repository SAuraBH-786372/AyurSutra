from sqlalchemy.orm import Session
from database import SessionLocal, Hospital, Slot, Mantra, Recipe, DietPlan
import json

def seed_hospitals_and_slots():
    db = SessionLocal()
    
    # Check if data already exists
    existing_hospital = db.query(Hospital).first()
    if existing_hospital:
        print("Hospitals already exist, skipping seeding")
        db.close()
        return
    
    # Sample hospitals
    hospitals_data = [
        {
            "name": "Ayurveda Wellness Center",
            "location": "Mumbai, Maharashtra",
            "specialties": json.dumps(["Panchakarma", "Ayurvedic Medicine", "Yoga Therapy"]),
            "rating": 4.5
        },
        {
            "name": "Kerala Ayurveda Hospital",
            "location": "Kochi, Kerala",
            "specialties": json.dumps(["Traditional Panchakarma", "Herbal Medicine", "Meditation"]),
            "rating": 4.8
        },
        {
            "name": "Himalayan Ayurveda Clinic",
            "location": "Rishikesh, Uttarakhand",
            "specialties": json.dumps(["Detox Therapy", "Stress Management", "Ayurvedic Consultation"]),
            "rating": 4.3
        }
    ]
    
    hospitals = []
    for hospital_data in hospitals_data:
        hospital = Hospital(**hospital_data)
        db.add(hospital)
        hospitals.append(hospital)
    
    db.commit()
    
    # Sample slots
    slots_data = [
        # Hospital 1 slots
        {"hospital_id": 1, "doctor_name": "Dr. Priya Sharma", "specialty": "Panchakarma", "date": "2024-01-15", "time": "09:00", "price": 1500.0},
        {"hospital_id": 1, "doctor_name": "Dr. Priya Sharma", "specialty": "Panchakarma", "date": "2024-01-15", "time": "11:00", "price": 1500.0},
        {"hospital_id": 1, "doctor_name": "Dr. Rajesh Kumar", "specialty": "Ayurvedic Medicine", "date": "2024-01-16", "time": "10:00", "price": 800.0},
        {"hospital_id": 1, "doctor_name": "Dr. Rajesh Kumar", "specialty": "Ayurvedic Medicine", "date": "2024-01-16", "time": "14:00", "price": 800.0},
        
        # Hospital 2 slots
        {"hospital_id": 2, "doctor_name": "Dr. Meera Nair", "specialty": "Traditional Panchakarma", "date": "2024-01-15", "time": "08:00", "price": 2000.0},
        {"hospital_id": 2, "doctor_name": "Dr. Meera Nair", "specialty": "Traditional Panchakarma", "date": "2024-01-15", "time": "15:00", "price": 2000.0},
        {"hospital_id": 2, "doctor_name": "Dr. Suresh Pillai", "specialty": "Herbal Medicine", "date": "2024-01-17", "time": "09:30", "price": 1200.0},
        
        # Hospital 3 slots
        {"hospital_id": 3, "doctor_name": "Dr. Anand Mishra", "specialty": "Detox Therapy", "date": "2024-01-16", "time": "07:00", "price": 1800.0},
        {"hospital_id": 3, "doctor_name": "Dr. Anand Mishra", "specialty": "Detox Therapy", "date": "2024-01-16", "time": "16:00", "price": 1800.0},
        {"hospital_id": 3, "doctor_name": "Dr. Kavita Joshi", "specialty": "Stress Management", "date": "2024-01-18", "time": "10:30", "price": 1000.0},
    ]
    
    for slot_data in slots_data:
        slot = Slot(**slot_data)
        db.add(slot)
    
    db.commit()
    db.close()

def seed_content():
    db = SessionLocal()
    
    # Check if data already exists
    if db.query(Mantra).first():
        db.close()
        return
    
    # Sample mantras
    mantras_data = [
        {
            "title": "Om Gam Ganapataye Namaha",
            "content": "ॐ गं गणपतये नमः",
            "dosha": "all",
            "benefits": "Removes obstacles, brings prosperity and wisdom",
            "duration": "5 minutes"
        },
        {
            "title": "Vata Balancing Mantra",
            "content": "ॐ वायवे नमः",
            "dosha": "vata",
            "benefits": "Calms the nervous system, reduces anxiety",
            "duration": "10 minutes"
        },
        {
            "title": "Pitta Cooling Mantra",
            "content": "ॐ सोमाय नमः",
            "dosha": "pitta",
            "benefits": "Cools the body and mind, reduces anger",
            "duration": "8 minutes"
        },
        {
            "title": "Kapha Energizing Mantra",
            "content": "ॐ सूर्याय नमः",
            "dosha": "kapha",
            "benefits": "Increases energy, reduces lethargy",
            "duration": "7 minutes"
        }
    ]
    
    for mantra_data in mantras_data:
        mantra = Mantra(**mantra_data)
        db.add(mantra)
    
    # Sample recipes
    recipes_data = [
        {
            "title": "Golden Milk (Turmeric Latte)",
            "ingredients": "1 cup almond milk, 1 tsp turmeric powder, 1/2 tsp ginger powder, pinch of black pepper, 1 tsp honey",
            "instructions": "Heat almond milk gently. Add turmeric, ginger, and black pepper. Simmer for 2-3 minutes. Add honey before serving.",
            "dosha": "all",
            "prep_time": "5 minutes",
            "benefits": "Anti-inflammatory, immune boosting, aids digestion"
        },
        {
            "title": "Vata Pacifying Kitchari",
            "ingredients": "1/2 cup basmati rice, 1/4 cup mung dal, 1 tsp ghee, 1/2 tsp cumin seeds, 1/4 tsp turmeric, salt to taste",
            "instructions": "Wash rice and dal. Heat ghee, add cumin seeds. Add rice, dal, turmeric. Add 3 cups water and cook until soft.",
            "dosha": "vata",
            "prep_time": "30 minutes",
            "benefits": "Easy to digest, grounding, nourishing"
        },
        {
            "title": "Pitta Cooling Cucumber Raita",
            "ingredients": "1 cucumber, 1 cup yogurt, 1 tsp cumin powder, fresh mint leaves, salt to taste",
            "instructions": "Grate cucumber. Mix with yogurt, cumin powder, chopped mint, and salt. Chill before serving.",
            "dosha": "pitta",
            "prep_time": "10 minutes",
            "benefits": "Cooling, hydrating, aids digestion"
        }
    ]
    
    for recipe_data in recipes_data:
        recipe = Recipe(**recipe_data)
        db.add(recipe)
    
    # Sample diet plans
    diet_plans_data = [
        {
            "title": "7-Day Vata Balancing Plan",
            "description": "A warming and grounding diet plan to balance Vata dosha",
            "dosha": "vata",
            "meal_plan": json.dumps({
                "breakfast": "Warm oatmeal with ghee and dates",
                "lunch": "Kitchari with steamed vegetables",
                "dinner": "Soup with whole grain bread",
                "snacks": "Warm milk with almonds"
            }),
            "duration": "7 days"
        },
        {
            "title": "Pitta Cooling Diet",
            "description": "A cooling diet plan to balance Pitta dosha",
            "dosha": "pitta",
            "meal_plan": json.dumps({
                "breakfast": "Fresh fruit salad with coconut",
                "lunch": "Quinoa salad with cucumber",
                "dinner": "Steamed vegetables with rice",
                "snacks": "Coconut water and sweet fruits"
            }),
            "duration": "10 days"
        },
        {
            "title": "Kapha Energizing Plan",
            "description": "A light and energizing diet plan to balance Kapha dosha",
            "dosha": "kapha",
            "meal_plan": json.dumps({
                "breakfast": "Spiced tea with light breakfast",
                "lunch": "Vegetable curry with quinoa",
                "dinner": "Light soup with salad",
                "snacks": "Herbal teas and spiced nuts"
            }),
            "duration": "14 days"
        }
    ]
    
    for diet_plan_data in diet_plans_data:
        diet_plan = DietPlan(**diet_plan_data)
        db.add(diet_plan)
    
    db.commit()
    db.close()

def seed_all_data():
    seed_hospitals_and_slots()
    seed_content()
    print("Database seeded successfully!")
