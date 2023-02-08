import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import AuthForm from "../components/Auth/AuthForm";
import FlatButtion from "../components/Auth/FlatButton";

const LoginScreen = ({ navigation }) => {
  const height = useHeaderHeight();

  const onPressHandler = () => {
    navigation.replace("Signup");
  };

  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={height + 100}
        behavior="padding"
      >
        <ScrollView>
          <AuthForm isLogin={true} />
          <FlatButtion
            buttonText="Create a new user"
            onPressHandler={onPressHandler}
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
