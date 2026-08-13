"""
Auto-Update Knowledge Script for Goa Exam Prep
Scrapes latest Goa GK, Current Affairs, and Aptitude questions from reliable RSS feeds / web APIs
and automatically appends them into local Markdown (.md) question banks.
"""

import os
import re
import datetime
import urllib.request
import xml.etree.ElementTree as ET

# RSS & News Feeds relevant for India & Goa Current Affairs / GK
FEEDS = [
    "https://news.google.com/rss/search?q=Goa+government+scheme+exam+OR+GPSC&hl=en-IN&gl=IN&ceid=IN:en",
    "https://news.google.com/rss/search?q=Goa+Liberation+Day+OR+Mandovi+river&hl=en-IN&gl=IN&ceid=IN:en"
]

DATA_DIR = "data"
GOA_GK_FILE = os.path.join(DATA_DIR, "goa_special_gk.md")

def fetch_feed_items(url):
    """Fetch RSS news items without external heavy libraries"""
    items = []
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as response:
            xml_data = response.read()
            root = ET.fromstring(xml_data)
            for item in root.findall('.//item'):
                title = item.find('title').text if item.find('title') is not None else ""
                link = item.find('link').text if item.find('link') is not None else ""
                pubDate = item.find('pubDate').text if item.find('pubDate') is not None else ""
                items.append({'title': title, 'link': link, 'date': pubDate})
    except Exception as e:
        print(f"[Warning] Could not fetch feed {url}: {e}")
    return items

def convert_news_to_markdown_question(news_item, index):
    """Generates a structured multiple choice question block from news headline"""
    title = news_item['title']
    clean_title = re.sub(r' - .*$', '', title) # Remove source name
    
    question_block = f"""
---

### Question {index}
**Current Affairs ({datetime.date.today().strftime('%B %Y')}): {clean_title}?**
- A) Statement mentioned in recent Goa State developments
- B) Incorrect historical event
- C) Outdated policy
- D) None of the above

**Answer:** A) Statement mentioned in recent Goa State developments
**Explanation:** Source news reference: {news_item['title']} ({news_item['date']}). Link: {news_item['link']}
"""
    return question_block

def auto_update_gk():
    print("=" * 60)
    print("[AUTO-UPDATE KNOWLEDGE BANK SCRIPT]")
    print("=" * 60)

    if not os.path.exists(GOA_GK_FILE):
        print(f"[Error] File not found: {GOA_GK_FILE}")
        return

    print("Fetching latest Goa Current Affairs & State updates...")
    all_news = []
    for feed in FEEDS:
        items = fetch_feed_items(feed)
        all_news.extend(items[:3]) # Get top 3 latest items

    if not all_news:
        print("No new updates found at this time.")
        return

    # Count existing questions
    with open(GOA_GK_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    existing_count = len(re.findall(r'### Question \d+', content))
    next_idx = existing_count + 1

    new_questions = ""
    for news in all_news[:5]: # Add top 5 distinct items
        new_questions += convert_news_to_markdown_question(news, next_idx)
        next_idx += 1

    # Append to Goa GK Markdown file
    with open(GOA_GK_FILE, 'a', encoding='utf-8') as f:
        f.write(new_questions)

    print(f"[Success] Added {min(len(all_news), 5)} new auto-generated current affairs questions to {GOA_GK_FILE}!")
    print(f"[Info] Total questions in Goa Special GK is now: {next_idx - 1}")

if __name__ == "__main__":
    auto_update_gk()
