from bottle import Bottle,run, route, template, static_file


app = Bottle()

# Route to serve static files like images, CSS, etc.
@route('/static/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./static')


@app.route('/')
def index():
    return template('index')

# Route for home page (shows albums or general content)  
@route('/')
def index():
    return template('index')  # Make sure you have an 'index.tpl' template in the 'views/' folder

@route('/about-us')
def about_us():
    return template('about-us.html')

@route('/contact')
def contact():
    return template('contact.html')

@route('/interiorclean')
def interiorclean():
    return template('interiorclean.html')

@route('/exteriorclean')
def exteriorclean():
    return template('exteriorclean.html')

@route('/enginebayclean')
def enginebayclean():
    return template('enginebayclean.html')

# Route for google verification (shows albums or general content) 
@route('/google37826803ac2e632c.html')
def google37826803ac2e632c():
    return template('google37826803ac2e632c.html')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for google verification (shows albums or general content) 
@route('/robots.txt')
def robots():
    return template('robots.txt')  # Make sure you have an 'index.tpl' template in the 'views/' folder

# Route for google verification (shows albums or general content) 
@route('/sitemap.xml')
def sitemap():
    return template('sitemap.xml')  # Make sure you have an 'index.tpl' template in the 'views/' folder


if __name__ == "__main__":
    run(reloader=True)