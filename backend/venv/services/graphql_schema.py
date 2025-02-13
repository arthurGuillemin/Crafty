import graphene
from graphene import ObjectType, String, Field
from services.supabase import create_user, login_user  # Import des services existants


class UserType(ObjectType):
    email = String()
    token = String()

class CreateUser(graphene.Mutation):
    class Arguments:
        nom = graphene.String(required=True)
        email = graphene.String(required=True)
        mot_de_passe = graphene.String(required=True)

    user = graphene.Field(UserType)
    error = graphene.String()

    def mutate(self, info, nom, email, mot_de_passe):
        result = create_user(nom, email, mot_de_passe)
        if "error" in result:
            raise Exception(result["error"])
        
        return CreateUser(user=result)  # Assurez-vous que result est bien un utilisateur


class LoginUser(graphene.Mutation):
    class Arguments:
        email = String(required=True)
        mot_de_passe = String(required=True)

    user = Field(UserType)
    error = String()

    def mutate(self, info, email, mot_de_passe):
        result = login_user(email, mot_de_passe)
        if result.get("error"):
            return LoginUser(error=result["error"])
        return LoginUser(user=UserType(email=email, token=result.get("token")))


class Mutation(ObjectType):
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()


schema = graphene.Schema(mutation=Mutation)
