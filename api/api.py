# coding=utf-8
from datetime import datetime
from flask.globals import request
 
import gevent
from socketio import socketio_manage
from socketio.mixins import BroadcastMixin
from werkzeug.exceptions import BadRequest
 
from gevent import monkey
monkey.patch_all()
 
from socketio.namespace import BaseNamespace
from socketio.server import SocketIOServer
from werkzeug.wsgi import SharedDataMiddleware
from werkzeug.serving import run_with_reloader
 
from flask.app import Flask
from TwitterAPI import TwitterAPI
 
app = Flask(__name__)
app.config['DEBUG'] = True
 
TwitterApi = TwitterAPI(
    'RfJOrhv4ElNAGb4dQnJZ3A',
    'dwEu677epT6xzwWrVu2UwVwNH9FPr6LwDUOippVb4',
    '39249210-Fl4xReKp6Uh0cIUV4rHS3FCh9J8uj9y9DVHwRQSHP',
    'v0XwZ2ma1xdpA35as6a02YR9ihONT55BtjWMLc0Npsr6o'
)
 
def send_tweets(socket, hashtag_value):
    tweets = TwitterApi.request('statuses/filter', {'track': hashtag_value})
 
    for tweet in tweets.get_iterator():
        socket.emit('tweet', tweet)
        gevent.sleep()
 
class HacknightNamespace(BaseNamespace):
    def __init__(self, *args, **kwargs):
        super(HacknightNamespace, self).__init__(*args, **kwargs)
 
    def on_hashtag(self, hashtag):
        hashtag_value = hashtag.get('value')
        gevent.spawn(send_tweets, self, hashtag_value)
 
    def on_test(self, data):
        while True:
            self.emit('datetime', str(datetime.utcnow()))
            gevent.sleep(1)
 
def main_endpoint(remaining_path):
    socketio_manage(request.environ, {'/main': HacknightNamespace}, request)
 
app.add_url_rule('/socket.io/<path:remaining_path>', 'main', main_endpoint)
 
 
 
@run_with_reloader
def run_server():
    #app.run('0.0.0.0', 8080, debug=True)
    global app
 
    print 'Starting SocketIO Server with Gevent Mode ...'
    app = SharedDataMiddleware(app, {})
    http_server = SocketIOServer(('', 80), app, namespace="socket.io", policy_server=False)
    http_server.serve_forever()
 
if __name__ == '__main__':
    run_server()
