import re


def parse_constitution(file_path: str):
    with open(file_path, "r", encoding="utf-8") as file:
        text = file.read()

    # Split by Article or Amendment
    sections = re.split(r"(Article\s+[IVX]+|Amendment\s+[IVX]+)", text)

    results = []

    # sections will look like:
    # ["", "Article I", "text...", "Article II", "text...", ...]

    for i in range(1, len(sections), 2):
        title = sections[i].strip()
        content = sections[i + 1].strip()

        results.append({
            "title": title,
            "content": content
        })

    return results


if __name__ == "__main__":
    data = parse_constitution("constitution.txt")

    for section in data:
        print(section["title"])
        print(section["content"][:100], "...\n")