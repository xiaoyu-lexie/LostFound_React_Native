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

const LoginScreen = ({ changeToAuthedHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const height = useHeaderHeight();
  const navigation = useNavigation();

  const onPressHandler = () => {
    navigation.replace("Signup");
  };

  const submitAuthHandler = async (email, password) => {
    setIsLoading(true);

    try {
      const data = await authenticate("login", email, password);
      await changeToAuthedHandler(data.data.loginUser.token);
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
        <ScrollView>
          <AuthForm isLogin={true} submitAuthHandler={submitAuthHandler} />

          <Button
            title="Create a new user"
            onPress={onPressHandler}
            color="#014098"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 30,
    width: "85%",
  },
});
