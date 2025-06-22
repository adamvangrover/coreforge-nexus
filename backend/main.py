from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import curriculum # Import the curriculum router

app = FastAPI(
    title="CoreForge Nexus Learning Platform API",
    description="API for managing curriculum, user progress, and other platform features.",
    version="0.1.0"
)

# CORS (Cross-Origin Resource Sharing)
origins = [
    "http://localhost",         # Common local dev
    "http://localhost:3000",    # Default for create-react-app
    "http://localhost:8080",    # Common local dev
    "http://localhost:5173",    # Default for Vite
    # Add any other origins as needed (e.g., deployed frontend URL)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(curriculum.router)

@app.get("/", tags=["General"])
async def read_root():
    """
    Root endpoint for the API.
    Provides a welcome message and API status.
    """
    return {"message": "Welcome to the CoreForge Nexus Learning Platform API!"}

@app.get("/health", tags=["General"])
async def health_check():
    """
    Health check endpoint.
    Returns the status of the API.
    """
    return {"status": "ok", "message": "API is healthy"}

# DEV_NOTES:
# Future considerations for main.py:
# - More sophisticated logging setup
# - Environment variable management for settings (e.g., origins, database URLs)
# - Router inclusion for modularizing endpoints (e.g., app.include_router(curriculum_router))
# - Global exception handlers
# - Startup and shutdown events (e.g., for database connections)

if __name__ == "__main__":
    import uvicorn
    # This is for local development running `python backend/main.py`
    # For production, use Gunicorn with Uvicorn workers:
    # gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
