from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# DEV_NOTE: Define a more specific list of origins for production.
# For development, "*" is often used, but ensure frontend_url is correctly configured.
# frontend_url = "http://localhost:3000" # Example for local dev

origins = [
    "http://localhost:3000", # Default React dev server
    "http://localhost:80",   # If accessing frontend via Docker through Nginx on port 80
    # Add other origins as needed (e.g., deployed frontend URL)
]

app = FastAPI(
    title="CoreForge Nexus API",
    description="API for the CoreForge Nexus K-12 learning platform.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/health", tags=["Utility"])
async def health_check():
    """
    Simple health check endpoint to confirm the API is running.
    """
    return {"status": "ok"}

# Import and include routers
try:
    from backend.routers import curriculum as curriculum_router
    from backend.routers import problem_generator
    from backend.routers import auth
    from backend.routers import assessment
except ImportError:
    from routers import curriculum as curriculum_router
    from routers import problem_generator
    from routers import auth
    from routers import assessment

app.include_router(curriculum_router.router)
app.include_router(problem_generator.router)
app.include_router(auth.router)
app.include_router(assessment.router)

if __name__ == "__main__":
    import uvicorn
    # This is for direct execution (e.g., python backend/main.py)
    # In Docker, uvicorn is typically run directly as a command.
    # DEV_NOTE: Ensure 'reload=True' is only for development.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
