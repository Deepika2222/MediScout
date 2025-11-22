from flask_pymongo import PyMongo
from flask import current_app, g

def get_db():
    if 'db' not in g:
        mongo = PyMongo(current_app)
        g.db = mongo.db
    return g.db

def init_db(app):
    app.config["MONGO_URI"] = app.config.get("MONGO_URI")
    mongo = PyMongo(app)
    return mongo
