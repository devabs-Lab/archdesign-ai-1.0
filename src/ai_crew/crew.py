import os
from crewai import Agent, Task, Crew, Process, LLM
from dotenv import load_dotenv
import yaml

load_dotenv()



# 🔥 Gemini LLM
llm = LLM(
    model="gemini/gemini-2.5-flash-lite",
    api_key=os.getenv("GEMINI_API_KEY")
)



# ---------- Load YAML ----------
def load_yaml(path):
    with open(path, "r", encoding="utf-8") as f:
        return yaml.safe_load(f)

agents_config = load_yaml("src/ai_crew/config/agents.yaml")
tasks_config = load_yaml("src/ai_crew/config/tasks.yaml")



# ---------- Agents ----------
analyst = Agent(
    role=agents_config["analyst"]["role"],
    goal=agents_config["analyst"]["goal"],
    backstory=agents_config["analyst"]["backstory"],
    llm=llm,
    verbose=False
)



engineer = Agent(
    role=agents_config["engineer"]["role"],
    goal=agents_config["engineer"]["goal"],
    backstory=agents_config["engineer"]["backstory"],
    llm=llm,
    verbose=False
)

reviewer = Agent(
    role=agents_config["reviewer"]["role"],
    goal=agents_config["reviewer"]["goal"],
    backstory=agents_config["reviewer"]["backstory"],
    llm=llm,
    verbose=False
)


# ---------- Tasks ----------
task1 = Task(
    description=tasks_config["analyst_task"]["description"],
    expected_output=tasks_config["analyst_task"]["expected_output"],
    agent=analyst
)


task2 = Task(
    description=tasks_config["engineer_task"]["description"],
    expected_output=tasks_config["engineer_task"]["expected_output"],
    agent=engineer
)

task3 = Task(
    description=tasks_config["reviewer_task"]["description"],
    expected_output=tasks_config["reviewer_task"]["expected_output"],
    agent=reviewer
)

# ---------- Crew ----------
crew = Crew(
    agents=[analyst, engineer, reviewer],
    tasks=[task1, task2, task3],
    process=Process.sequential,
    verbose=False
)

def run_crew(input_text: str):
    return crew.kickoff(inputs={"input": input_text})
