from flask import Flask

#ROutes
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes
from routes.product_routes import prod_routes
from routes.user_routes import user_routes
from routes.order_routes import order_routes
from routes.review_routes import review_routes
from routes.recommandation_routes import recommend_routes


#packges

app = Flask(__name__)

app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(prod_routes, url_prefix="/prod")
app.register_blueprint(test_routes, url_prefix="/test")
app.register_blueprint(user_routes, url_prefix="/users")
app.register_blueprint(order_routes, url_prefix="/orders")
app.register_blueprint(review_routes, url_prefix="/review")
app.register_blueprint(recommend_routes, url_prefix="/reco")





if __name__ == "__main__":
    app.run(debug=True)
