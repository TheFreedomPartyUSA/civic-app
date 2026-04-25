import requests
import os

API_KEY = os.getenv("GOOGLE_API_KEY")

BASE_URL = "https://www.googleapis.com/civicinfo/v2/representatives"


def get_representatives(address=""):
    params = {
        "key": API_KEY,
        "address": address if address else "United States"
    }

    try:
        res = requests.get(BASE_URL, params=params)

        if res.status_code != 200:
            return []

        data = res.json()

        officials = data.get("officials", [])
        offices = data.get("offices", [])

        results = []

        for office in offices:
            for index in office["officialIndices"]:
                official = officials[index]

                results.append({
                    "name": official.get("name"),
                    "role": office.get("name"),
                    "party": official.get("party", "Unknown"),
                    "state": address if address else "USA"
                })

        return results

    except:
        return []