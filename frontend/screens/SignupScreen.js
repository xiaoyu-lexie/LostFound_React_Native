import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Button,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import AuthForm from "../components/Auth/AuthForm";
import FlatButtion from "../components/Auth/FlatButton";
import authenticate from "../util/auth";
import Loading from "../components/Loading";

const SignupScreen = ({ changeToAuthedHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.replace("Login");
  };

  const submitAuthHandler = async (email, password) => {
    setIsLoading(true);

    try {
      const data = await authenticate("signup", email, password);
      await changeToAuthedHandler(data.data.addUser.token);
    } catch (err) {
      Alert.alert(err.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading message="Loading..." />;
  }

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={height}
        behavior="padding"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthForm submitAuthHandler={submitAuthHandler} />
          <Button
            title="Go to Login"
            onPress={onPressHandler}
            color="#014098"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 30,
    width: "85%",
  },
});
