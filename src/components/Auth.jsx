import React, { useState, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import FirebaseApp from "../utils/firebase";

const auth = getAuth(FirebaseApp);
const provider = new GoogleAuthProvider();

function AuthContainer() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      setUser(user);
    } catch (error) {}
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };
  return !!user ? (
    <Flex alignItems="center" justify="space-between" w="20%">
      <Text as="span">{user.providerData[0].displayName}</Text>
      <Button colorScheme="red" onClick={signOut}>
        Sign out
      </Button>
    </Flex>
  ) : (
    <Skeleton isLoaded={!loading} startColor="green.100" endColor="green.800">
      <Button colorScheme="green" onClick={signUp}>
        Sign up with Google
      </Button>
    </Skeleton>
  );
}

export default AuthContainer;
