import requests

BASE_URL = "https://www.govtrack.us/api/v2/vote"


def search_votes(query=""):
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

        for vote in data.get("objects", []):
            results.append({
                "question": vote.get("question"),
                "result": vote.get("result"),
                "date": vote.get("created"),
                "link": f"https://www.govtrack.us/congress/votes/{vote.get('id')}"
            })

        return results

    except:
        return []