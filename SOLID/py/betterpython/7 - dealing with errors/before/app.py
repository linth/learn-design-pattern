'''
simple flask application
    - please refer to the youtube video.

Reference:
    - https://www.youtube.com/watch?v=ZsvftkbbrR0&list=PLC0nd42SBTaNuP4iB4L6SJlMaHE71FG6N&index=6
    - https://github.com/ArjanCodes/betterpython/tree/main/7%20-%20dealing%20with%20errors
'''

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


app.run()