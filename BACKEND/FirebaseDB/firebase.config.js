import dotenv from "dotenv";
dotenv.config();
const envfile = process.env;

const serviceAccount = {
  type: envfile.FIREBASE_TYPE,
  project_id: envfile.FIREBASE_PROJECT_ID,
  private_key_id: envfile.FIREBASE_PRIVATE_KEY_ID,
  private_key: envfile.FIREBASE_PRIVATE_KEY,
  client_email: envfile.FIREBASE_CLIENT_EMAIL,
  client_id: envfile.FIREBASE_CLIENT_ID,
  auth_uri: envfile.FIREBASE_AUTH_URI,
  token_uri: envfile.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: envfile.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: envfile.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: envfile.FIREBASE_UNIVERSE_DOMAIN,
};

export default serviceAccount;
