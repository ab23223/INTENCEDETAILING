from bottle import Bottle,run, route, template, static_file


app = Bottle()

@app.route('/')
def index():
    return template('index')

# Route to serve static files like images, CSS, etc.
@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')

# Route for home page (shows albums or general content) 
@route('/')
def index():
    return template('index')  # Make sure you have an 'index.tpl' template in the 'views/' folder


# Run the app
run(reloader=True)