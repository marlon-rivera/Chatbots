import json
from nltk.chat.util import Chat
from flask import Flask, jsonify, request
from flask_cors import CORS
import re
import unicodedata

app = Flask(__name__)
CORS(app)


def load_json(src_file):
    with open(src_file, "r", encoding="utf-8") as file:
        return json.load(file)
    
files = ['./robots.json', './economicos.json', './conversacion.json', './astronautas.json']
reflections = load_json("./reflections.json")

def process_phrase(frase):
    frase_sin_tildes = ''.join((c for c in unicodedata.normalize('NFD', frase) if unicodedata.category(c) != 'Mn'))
    caracteres_especiales = r'[^a-zA-Z0-9\s]'
    frase_sin_especiales = re.sub(caracteres_especiales, '', frase_sin_tildes)

    return frase_sin_especiales

conversations_chat = []
for file in files:
    conversations = load_json(file)
    for req, res in conversations.items():
        conversations_chat.append((process_phrase(req), res))

chat = Chat(conversations_chat, reflections)

for pair in chat._pairs:
    print(pair)

@app.route('/start', methods=['GET'])
def start():
    return jsonify({"message" : "¡Bienvenido a nuestro chatbot todo terreno! 🌐 Estoy aquí para responder tus preguntas, hablar sobre una amplia variedad de temas y, por supuesto, ¡pasar un buen rato contigo! Siéntete libre de preguntarme sobre cualquier cosa, desde curiosidades y datos interesantes hasta asesoramiento o simplemente charlar. ¡Vamos a explorar juntos el mundo del conocimiento y la diversión! ¿En qué puedo ayudarte hoy? 🤖🌟", "from" : "chatty"})

@app.route('/sendMessage', methods=['POST'])
def response_a_request():
    data = request.get_json()
    message = data.get("message", "")
    response = chat.respond(process_phrase(message))
    if response == None:
        return jsonify({"message" : "No tengo ese conocimiento preguntame otra cosa", "from" : "chatty"})
    return jsonify({"message" : response, "from" : "chatty"})

if __name__ == "__main__":
    app.run(debug=True, port=5002)