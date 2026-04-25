import requests

BASE_URL = "https://www.govtrack.us/api/v2/bill"


def search_bills(query=""):
    params = {
        "q": query,
        "limit": 10
    }

    try:
        res = requests.get(BASE_URL, params=params)

        if res.status_code != 200:
            return []

        data = res.json()

        results = []

        for bill in data.get("objects", []):
            results.append({
                "title": bill.get("title"),
                "summary": bill.get("summary", "No summary available"),
                "status": bill.get("current_status"),
                "link": f"https://www.govtrack.us/congress/bills/{bill.get('id')}"
            })

        return results

    except:
        return []