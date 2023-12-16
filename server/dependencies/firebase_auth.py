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


async def firebase_auth_dependency(request: Request, token: HTTPAuthorizationCredentials = Depends(token_auth_scheme)) -> str:
    """
    Checks if the token is valid and if the user ID in the token matches the user ID in the request path.
    """
    # Extract user_id from path parameters
    user_id = request.path_params.get("user_id")

    # Verify the Firebase ID token
    try:
        decoded_token = auth.verify_id_token(token.credentials)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e),
        )

    # Check if the user ID in the token matches the user ID in the request path
    if user_id and user_id != decoded_token.get("uid"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User ID does not match the one in the token",
        )

    return decoded_token
