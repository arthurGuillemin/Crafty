from flask import Flask
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes 
from flask_graphql import GraphQLView
from services.graphql_schema import schema 

app = Flask(__name__)

# Enregistrer les routes
app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(test_routes, url_prefix="/test")

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,  # Active l'interface web GraphiQL
    ),
)


if __name__ == "__main__":
    app.run(debug=True)
