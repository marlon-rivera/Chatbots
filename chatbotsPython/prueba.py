import json
from nltk.chat.util import Chat

import re
import unicodedata


def load_json(src_file):
    with open(src_file, "r", encoding="utf-8") as file:
        return json.load(file)
    

conversations = load_json("./conversacion.json")
reflections = load_json("./reflections.json")

def process_phrase(frase):
    # Eliminar tildes
    frase_sin_tildes = ''.join((c for c in unicodedata.normalize('NFD', frase) if unicodedata.category(c) != 'Mn'))

    # Eliminar caracteres especiales (puedes personalizar esta lista según tus necesidades)
    caracteres_especiales = r'[^a-zA-Z0-9\s]'
    frase_sin_especiales = re.sub(caracteres_especiales, '', frase_sin_tildes)

    return frase_sin_especiales

conversations_chat = []
for req, res in conversations.items():
    conversations_chat.append((process_phrase(req), res))

chat = Chat(conversations_chat, reflections)

if __name__ == "__main__":
    print(chat.respond("Hola" , "parce"))