import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import firebase_admin
from firebase_admin import credentials, auth

# Load environment variables
load_dotenv()
e = os.environ

# Set up Firebase credentials
cred = credentials.Certificate({
    "type": e.get("FIREBASE_TYPE"),
    "project_id": e.get("FIREBASE_PROJECT_ID"),
    "private_key_id": e.get("FIREBASE_PRIVATE_KEY_ID"),
    "private_key": e.get("FIREBASE_PRIVATE_KEY"),
    "client_email": e.get("FIREBASE_CLIENT_EMAIL"),
    "client_id": e.get("FIREBASE_CLIENT_ID"),
    "auth_uri": e.get("FIREBASE_AUTH_URI"),
    "token_uri": e.get("FIREBASE_TOKEN_URI"),
    "auth_provider_x509_cert_url": e.get("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
    "client_x509_cert_url": e.get("FIREBASE_CLIENT_X509_CERT_URL")
})

# Initialize Firebase app
if not firebase_admin._apps:
    firebase_app = firebase_admin.initialize_app(cred)

# Define HTTP Bearer scheme for token authentication
token_auth_scheme = HTTPBearer()


def authenticate(request: Request, token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)) -> str:
    try:
        decoded_token = auth.verify_id_token(token.credentials)
        request.state.uid = decoded_token["uid"]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )


def authorize(request: Request) -> None:
    if request.state.uid != request.path_params.get("user_id", ""):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to access this resource.",
        )
