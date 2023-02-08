import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import AuthForm from "../components/Auth/AuthForm";
import FlatButtion from "../components/Auth/FlatButton";

const SignupScreen = ({ navigation }) => {
  const height = useHeaderHeight();

  const onPressHandler = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={height + 100}
        behavior="padding"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthForm />
          <FlatButtion
            buttonText="Go to Login"
            onPressHandler={onPressHandler}
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
