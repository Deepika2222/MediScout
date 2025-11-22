from app.services.db import db

class Medicine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    price = db.Column(db.Float)
    pharmacy_name = db.Column(db.String(100))
    pharmacy_address = db.Column(db.String(200))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    available = db.Column(db.Boolean, default=True)
    link = db.Column(db.String(500)) # External purchase link

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'pharmacy': self.pharmacy_name,
            'address': self.pharmacy_address,
            'lat': self.latitude,
            'lon': self.longitude,
            'available': self.available,
            'link': self.link
        }
