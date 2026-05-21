from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.backend.routes import design_route

app = FastAPI(
    title="AutoSysDesign Crew API",
    description="FastAPI backend for AI Crew system design generator",
    version="1.0.0"
)

# Enable CORS for the React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://archdesign-ai-10-dev.vercel.app"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the design routes
app.include_router(design_route.router)

@app.get("/")
def root_endpoint():
    return {"message": "Welcome to ArchDesign AI Crew API. Go to /docs for Swagger UI."}
