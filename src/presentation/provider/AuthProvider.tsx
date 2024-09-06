import React, { PropsWithChildren, useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { obtenerUsuarioPorId } from "../../actions/user.action";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LoadingScreen } from "../components/shared/LoadinScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const checkStatus = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const user = await obtenerUsuarioPorId(currentUser?.uid!);
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
      setLoading(false);
      return () => checkStatus();
    });
  }, []);
  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};
