from flask import Flask
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes  # Import de la route de test

app = Flask(__name__)

# Enregistrer les routes
app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(test_routes, url_prefix="/test")

if __name__ == "__main__":
    app.run(debug=True)
