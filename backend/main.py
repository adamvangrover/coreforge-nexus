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

# Import and include curriculum router
from backend.routers import curriculum as curriculum_router # Use 'backend.routers' for absolute import if needed by uvicorn structure
# DEV_NOTE: Depending on how uvicorn runs, you might need `from .routers import curriculum as curriculum_router` if backend is a package.
# Or `from routers import curriculum as curriculum_router` if uvicorn runs from /app/backend directory.
# Assuming standard project structure where `backend` is the root for python path for now.
app.include_router(curriculum_router.router)


# DEV_NOTE: Placeholder for other future routers
# from .routers import user_router # Example
# app.include_router(user_router.router)

if __name__ == "__main__":
    import uvicorn
    # This is for direct execution (e.g., python backend/main.py)
    # In Docker, uvicorn is typically run directly as a command.
    # DEV_NOTE: Ensure 'reload=True' is only for development.
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
