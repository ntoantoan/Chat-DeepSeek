from typing import Dict, List, Optional
from datetime import datetime
import requests
from app.prompt.search_prompt import search_prompt
def search_plugin(query: str, 
          web_search: bool,
          categories: Optional[str] = "general", 
          num_results: int = 10) -> Dict:
    """
    Perform a search query and return formatted results.
    
    Args:
        query: Search query string
        categories: Category to search in (default: "general")
        num_results: Number of results to return (default: 10)
    
    Returns:
        Dict containing search results with 'data' key containing list of results
    """
    # Base search URL
    base_url = "http://localhost:4000/search"
    
    # Prepare search parameters
    params = {
        'q': query,
        'categories': categories,
        'format': 'json',
        'num': num_results,
        'time_range': {'year': '2025'}
    }
    try:
        # Make the search request
        response = requests.get(base_url, params=params)
        response.raise_for_status()  # Raise exception for bad status codes
        results = response.json()

        # Format the response data
        formatted_results = {
            "data": [
                {
                    "result": item.get("content", ""),
                    "url": item.get("url", ""),
                    "title": item.get("title", ""),
                }
                for item in results.get("results", [])
            ]
        }

        if web_search:
            return formatted_results
        else:
            #Current date & time in ISO format (UTC timezone) is: {date}.
            return search_prompt.format(context=formatted_results, date=datetime.now().isoformat())
    
    except requests.RequestException as e:
        # Handle any request errors
        return {"data": [], "error": str(e)}
