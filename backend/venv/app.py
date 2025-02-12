from flask import Flask

from routes.auth_routes import auth_routes
from routes.test_routes import test_routes
from routes.product_routes import prod_routes
from routes.user_routes import user_routes

from flask_graphql import GraphQLView
from services.graphql_schema import schema 

app = Flask(__name__)

app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(prod_routes, url_prefix="/prod")
app.register_blueprint(test_routes, url_prefix="/test")
app.register_blueprint(user_routes, url_prefix="/users")

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True,
    ),
)

if __name__ == "__main__":
    app.run(debug=True)
