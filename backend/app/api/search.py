from fastapi import APIRouter
from app.plugins.search_plugins import search_plugin
from pydantic import BaseModel
router = APIRouter()

class SearchRequest(BaseModel):
    query: str
    deepthink: bool = False


@router.post("/search", tags=["search"])
async def search(request: SearchRequest):
    print(request.deepthink)
    
    return search_plugin(request.query, request.deepthink)
