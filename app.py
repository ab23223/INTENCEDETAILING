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

# Route for home page (shows albums or general content) 
@route('/interiorclean.html')
def interiorclean():
    return template('interiorclean.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for home page (shows albums or general content) 
@route('/exteriorclean.html')
def exteriorclean():
    return template('exteriorclean.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for home page (shows albums or general content) 
@route('/enginebayclean.html')
def enginebayclean():
    return template('enginebayclean.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for home page (shows albums or general content) 
@route('/contact.html')
def contact():
    return template('contact.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for home page (shows albums or general content) 
@route('/about-us.html')
def aboutus():
    return template('about-us.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder


# Route for google verification (shows albums or general content) 
@route('/google37826803ac2e632c.html')
def google37826803ac2e632c():
    return template('google37826803ac2e632c.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Run the app
run(reloader=True)