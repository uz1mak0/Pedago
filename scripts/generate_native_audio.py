#!/usr/bin/env python3
import os
import time
import urllib.parse
import urllib.request

flashcards_data = [
    {
        "id": "vocab-1",
        "word": "Salamat",
        "example": "Maraming salamat sa tulong mo!"
    },
    {
        "id": "vocab-2",
        "word": "Magandang umaga",
        "example": "Magandang umaga po sa inyong lahat."
    },
    {
        "id": "vocab-3",
        "word": "Kumusta",
        "example": "Kumusta ka na? Matagal na tayong hindi nagkita."
    },
    {
        "id": "vocab-4",
        "word": "Po at Opo",
        "example": "Opo, tapos na po ako kumain."
    },
    {
        "id": "vocab-5",
        "word": "Bayad po",
        "example": "Bayad po, isa pong estudyante papuntang Cubao."
    },
    {
        "id": "vocab-6",
        "word": "Para po",
        "example": "Para po sa tabi, sa may kanto lang po."
    },
    {
        "id": "vocab-7",
        "word": "Masarap",
        "example": "Napakasarap ng sinigang na luto ni Lola!"
    },
    {
        "id": "vocab-8",
        "word": "Kain tayo",
        "example": "Kain tayo! May mainit pang kanin at adobo rito."
    },
    {
        "id": "vocab-9",
        "word": "Magkano",
        "example": "Magkano po ang isang kilo ng mangga?"
    },
    {
        "id": "vocab-10",
        "word": "Tawad",
        "example": "Ate, baka puwedeng humingi ng kaunting tawad?"
    },
    {
        "id": "vocab-11",
        "word": "Mano po",
        "example": "Mano po, Lolo at Lola."
    },
    {
        "id": "vocab-12",
        "word": "Kilig",
        "example": "Sobrang kilig ko noong ngumiti siya sa akin!"
    },
    {
        "id": "vocab-13",
        "word": "Gigil",
        "example": "Nanggigigil ako sa pisngi ng sanggol na iyan!"
    },
    {
        "id": "vocab-14",
        "word": "Bayanihan",
        "example": "Kitang-kita ang diwa ng bayanihan noong nagtulungan ang mga kapitbahay."
    },
    {
        "id": "vocab-15",
        "word": "Pala",
        "example": "Ikaw pala ang bagong guro rito!"
    },
    {
        "id": "vocab-16",
        "word": "Kasi",
        "example": "Hindi ako nakapunta kasi umulan nang malakas."
    },
    {
        "id": "vocab-17",
        "word": "Naman",
        "example": "Ikaw naman! Huwag mo akong biruin."
    },
    {
        "id": "vocab-18",
        "word": "Ingat",
        "example": "Ingat ka sa biyahe mo pauwi!"
    },
    {
        "id": "vocab-19",
        "word": "Tara",
        "example": "Tara na, baka ma-late pa tayo sa klase!"
    },
    {
        "id": "vocab-20",
        "word": "Busog",
        "example": "Busog na busog ako sa pista kanina."
    },
    {
        "id": "vocab-21",
        "word": "Tampo",
        "example": "May tampo siya sa akin dahil nakalimutan ko ang kaarawan niya."
    },
    {
        "id": "vocab-22",
        "word": "Kumain",
        "example": "Kumain na si Maria ng mangga."
    },
    {
        "id": "vocab-23",
        "word": "Kinain",
        "example": "Kinain ni Maria ang mangga."
    },
    {
        "id": "vocab-24",
        "word": "Saan",
        "example": "Saan po ang sakayan ng jeep papuntang Makati?"
    },
    {
        "id": "vocab-25",
        "word": "Bakit",
        "example": "Bakit ka nag-aaral ng wikang Tagalog?"
    }
]

output_dir = os.path.join(os.getcwd(), "public", "audio", "vocab")
os.makedirs(output_dir, exist_ok=True)

def fetch_and_save(text, filepath):
    if os.path.exists(filepath) and os.path.getsize(filepath) > 500:
        return
    encoded = urllib.parse.quote(text)
    url = f"https://translate.google.com/translate_tts?ie=UTF-8&q={encoded}&tl=tl&client=tw-ob"
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = resp.read()
            with open(filepath, "wb") as f:
                f.write(data)
            print(f"Saved: {filepath} ({len(data)} bytes)")
    except Exception as e:
        print(f"Error fetching '{text}': {e}")
    time.sleep(0.15)

for item in flashcards_data:
    card_id = item["id"]
    word_path = os.path.join(output_dir, f"{card_id}.mp3")
    fetch_and_save(item["word"], word_path)

    example_path = os.path.join(output_dir, f"{card_id}-example.mp3")
    fetch_and_save(item["example"], example_path)

print("Finished generating all native Tagalog audio clips in /public/audio/vocab/")
