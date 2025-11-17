import admin from "firebase-admin";
import serviceAccount from "./firebase.config.js";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

export default db;
export { admin };
