from fastapi import FastAPI
from pydantic import BaseModel
import openai, sqlite3, json

app = FastAPI()

openai.api_key = "YOUR_API_KEY"

conn = sqlite3.connect("database.db", check_same_thread=False)
cur = conn.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS ideas(id INTEGER PRIMARY KEY, topic TEXT, ideas TEXT)")
conn.commit()

class TopicIn(BaseModel):
    topic: str

@app.post("/generate")
def generate(topic: TopicIn):
    prompt = f"Brainstorm 5 creative ideas related to '{topic.topic}'. Return as a simple numbered list."
    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    ideas_text = response.choices[0].message.content.strip()
    cur.execute("INSERT INTO ideas(topic, ideas) VALUES(?, ?)", (topic.topic, ideas_text))
    conn.commit()
    return {"topic": topic.topic, "ideas": ideas_text}
