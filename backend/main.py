from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
import os
import json
from dotenv import load_dotenv

from services.google_civic_api import get_representatives
from services.bills_api import search_bills
from services.voting_api import search_votes

# -----------------------
# ENV
# -----------------------
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# -----------------------
# APP
# -----------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# LOAD DATA
# -----------------------
with open("constitution.json", "r") as f:
    constitution_data = json.load(f)

with open("politicians.json", "r") as f:
    politicians_data = json.load(f)

with open("lobbying.json", "r") as f:
    lobbying_data = json.load(f)

# -----------------------
# LEGAL SEARCH
# -----------------------
def find_relevant_section(question: str):
    question = question.lower()
    best_match = None
    best_score = 0

    for section in constitution_data:
        score = 0

        for keyword in section["keywords"]:
            if keyword in question:
                score += 5

        for word in question.split():
            if word in section["content"].lower():
                score += 1

        if score > best_score:
            best_score = score
            best_match = section

    return best_match

# -----------------------
# ROUTES
# -----------------------
@app.get("/")
def root():
    return {"message": "Backend running"}

# -----------------------
# RIGHTS AI
# -----------------------
@app.get("/ask")
def ask(question: str):
    section = find_relevant_section(question)
    context = section["content"] if section else "No legal match found"

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": f"""
You are a civic rights assistant.

Use this law:
{context}

Respond clearly:

1. Explanation
2. Your Rights
3. What To Do
"""
                },
                {"role": "user", "content": question}
            ]
        )

        answer = response.choices[0].message.content

    except:
        answer = f"(Fallback Mode)\n\n{context}"

    return {
        "answer": answer,
        "source": section["title"] if section else "None"
    }

# -----------------------
# REPRESENTATIVES
# -----------------------
@app.get("/representatives")
def get_reps(address: str = ""):
    return get_representatives(address)

# -----------------------
# BILLS
# -----------------------
@app.get("/bills")
def get_bills(query: str = ""):
    return search_bills(query)

# -----------------------
# VOTES
# -----------------------
@app.get("/votes")
def get_votes(query: str = ""):
    return search_votes(query)

# -----------------------
# LOBBYING / MONEY
# -----------------------
@app.get("/lobbying")
def get_lobbying(name: str = ""):
    if not name:
        return lobbying_data

    results = [
        l for l in lobbying_data
        if name.lower() in l["politician"].lower()
        or name.lower() in l["organization"].lower()
    ]

    return results