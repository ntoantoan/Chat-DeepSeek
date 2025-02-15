from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import router as api_router

app = FastAPI(
    title="Chat DeepSeek API",
    description="Backend API for Chat DeepSeek application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router)

if __name__ == "__main__":
    import uvicorn
    import os
    
    # Get the current file's directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Change to the current directory to ensure proper module imports
    os.chdir(current_dir)
    
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8002, 
        reload_excludes=["../venv/*", "../.venv/*"]  # Adjust venv path relative to backend directory
    ) 