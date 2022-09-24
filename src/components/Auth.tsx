import { useState, useEffect, useContext } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import FirebaseApp from "../utils/firebase";
import {
  signInAction,
  signOutAction,
  UserContext,
  UserDispatchContext,
} from "../state/UserContext";

const auth = getAuth(FirebaseApp);
const provider = new GoogleAuthProvider();

function AuthContainer() {
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);
  useEffect(() => {
    if (dispatch) {
      onAuthStateChanged(auth, (user) => {
        setLoading(false);
        if (user) {
          signInAction(dispatch, user);
        } else {
          signOutAction(dispatch);
        }
      });
    }
  }, [dispatch]);

  const signUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      signInAction(dispatch!, user);
    } catch (error) {}
  };

  const signOut = async () => {
    await auth.signOut();
    signOutAction(dispatch!);
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
        Sign in with Google
      </Button>
    </Skeleton>
  );
}

export default AuthContainer;
