from fastapi import APIRouter

from app.api.search import router as search_router
from app.api.check import router as check_router

router = APIRouter(prefix="/api")
router.include_router(search_router)
router.include_router(check_router)




