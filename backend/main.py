from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class User(db.Model):
    """
    User in database
    """

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.String(30), unique=False, nullable=False)
    last_name = db.Column(db.String(30), unique=False, nullable=False)
    age = db.Column(db.Integer, unique=False, nullable=False)

    def __init__(self, first_name, last_name, age):
        self.first_name = first_name
        self.last_name = last_name
        self.age = age

@app.route("/add_user", methods=['POST'])
def add_user():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    age = int(request.json.get("age"))

    new_user = User(first_name, last_name, age)

    print(new_user)

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return {"error": f"{e}"}, 400
    

    return {"message": "User created"}, 200

if __name__ == '__main__':
    with app.app_context():
        db.drop_all()
        db.create_all()
    app.run(debug=True)