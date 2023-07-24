from flask import Flask, request, render_template
from flask_cors import CORS
import json

import os
from dotenv import load_dotenv
import openai

OPENAI_KEY=input('Enter-your-key: ')


load_dotenv()
# os.environ['OPENAI_API_KEY'] = OPENAI_KEY
openai.api_key = OPENAI_KEY #os.environ.get(OPENAI_KEY)
completion = openai.Completion()

app = Flask(__name__)

CORS(app)

@app.route('/chatbot', methods=['GET'])
def root():
    return json.dumps({'message':"Yes I'm chatbot"})

@app.route('/chatbot/botMessage', methods=['POST', 'GET'])
def ask():
    args = request.args
    prompt = args.get('prompt')
    response = completion.create(
        prompt=prompt, engine="text-davinci-003", stop=['\nHuman'], temperature=0.9,
        top_p=1, frequency_penalty=0, presence_penalty=0.6, best_of=1,
        max_tokens=150)
    answer = response.choices[0].text.strip()
    # answer = 'OpenAI response: '
    return json.dumps({'response': answer})

if __name__=='__main__':
    app.run()
