import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDyFY4Xu5_aflnFxfwrwPqNu8skeGKbZ2g",
  authDomain: "susurrosevangelio.firebaseapp.com",
  projectId: "susurrosevangelio",
  storageBucket: "susurrosevangelio.appspot.com",
  messagingSenderId: "824566245243",
  appId: "1:824566245243:web:1e9f470e16608dc1417fde",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
