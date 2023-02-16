import {
  View,
  StyleSheet,
  Button,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState } from "react";

import Input from "../Input";
import FlatButtion from "./FlatButton";

const AuthForm = ({ isLogin, submitAuthHandler }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    isValid: true,
    isEmpty: false,
  });
  const [confirmEmail, setConfirmEmail] = useState({
    value: "",
    isValid: true,
    isEmpty: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: true,
    isEmpty: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isValid: true,
    isEmpty: false,
  });

  const onChangeHandler = (inputType, enteredValue) => {
    // all isValid change to true and all isEmpty change to false, means as long as user change text, isValid becomes to true, and isEmpty becomes to false
    switch (inputType) {
      case "email":
        setEmail((prev) => ({
          ...prev,
          value: enteredValue,
          isValid: true,
          isEmpty: false,
        }));
        setConfirmEmail((prev) => ({
          ...prev,
          isValid: true,
        }));
        break;
      case "confirmEmail":
        setConfirmEmail((prev) => ({
          ...prev,
          value: enteredValue,
          isValid: true,
          isEmpty: false,
        }));
        setEmail((prev) => ({
          ...prev,
          isValid: true,
        }));
        break;
      case "password":
        setPassword((prev) => ({
          ...prev,
          value: enteredValue,
          isValid: true,
          isEmpty: false,
        }));
        break;
      case "confirmPassword":
        setConfirmPassword((prev) => ({
          ...prev,
          value: enteredValue,
          isValid: true,
          isEmpty: false,
        }));
        break;
    }
  };

  const onBlurHandler = (inputType) => {
    switch (inputType) {
      case "email":
        const regex = /@test.com/;
        if (email.value.length === 0) {
          setEmail((prev) => ({ ...prev, isValid: false, isEmpty: true }));
          break;
        }
        if (!regex.test(email.value)) {
          setEmail((prev) => ({ ...prev, isValid: false, isEmpty: false }));
        }
        if (
          email.value !== confirmEmail.value &&
          confirmEmail.value.length > 0
        ) {
          setEmail((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: false,
          }));
          setConfirmEmail((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: false,
          }));
        }
        break;
      case "confirmEmail":
        if (confirmEmail.value.length === 0) {
          setConfirmEmail((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: true,
          }));

          break;
        }
        if (email.value !== confirmEmail.value) {
          setConfirmEmail((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: false,
          }));
          // setEmail((prev) => ({
          //   ...prev,
          //   isValid: false,
          // }));
        }
        break;
      case "password":
        if (password.value.length === 0) {
          setPassword((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: true,
          }));
          break;
        }
        if (password.value.length < 6) {
          setPassword((prev) => ({ ...prev, isValid: false, isEmpty: false }));
        }
        break;
      case "confirmPassword":
        if (confirmPassword.value.length === 0) {
          setConfirmPassword((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: true,
          }));
          break;
        }
        if (password.value !== confirmPassword.value) {
          setConfirmPassword((prev) => ({
            ...prev,
            isValid: false,
            isEmpty: false,
          }));
        }
        break;
    }
  };

  const submitHandler = () => {
    Keyboard.dismiss();
    // console.log(
    //   email.isValid,
    //   email.isEmpty,
    //   password.isValid,
    //   password.isEmpty,
    //   confirmEmail.isValid,
    //   confirmEmail.isEmpty,
    //   confirmPassword.isValid,
    //   confirmPassword.isEmpty
    // );

    // empty check (complementation to onBlur validality check), this is to check the senario that when the user didn't touch any input and click the login buttion directly, and this senario cannot be captured by onBlur validality check
    if (isLogin && (email.value.length === 0 || password.value.length === 0)) {
      Alert.alert("login Input cannot be empty, please check.");

      if (email.value.length === 0) {
        setEmail((prev) => ({ ...prev, isEmpty: true }));
      }

      if (password.value.length === 0) {
        setPassword((prev) => ({ ...prev, isEmpty: true }));
      }

      return;
    } else if (
      !isLogin &&
      (email.value.length === 0 ||
        confirmEmail.value.length === 0 ||
        password.value.length === 0 ||
        confirmPassword.value.length === 0)
    ) {
      Alert.alert("Input cannot be empty, please check.");

      if (email.value.length === 0) {
        setEmail((prev) => ({ ...prev, isEmpty: true }));
      }

      if (confirmEmail.value.length === 0) {
        setConfirmEmail((prev) => ({
          ...prev,
          isEmpty: true,
        }));
      }

      if (password.value.length === 0) {
        setPassword((prev) => ({ ...prev, isEmpty: true }));
      }

      if (confirmPassword.value.length === 0) {
        setConfirmPassword((prev) => ({ ...prev, isEmpty: true }));
      }

      return;
    }

    //不能用isEmpty来做if条件，因为来不及
    // if (
    //   email.isEmpty ||
    //   confirmEmail.isEmpty ||
    //   password.isEmpty ||
    //   confirmPassword.isEmpty
    // ) {
    //   console.log("empty wrong");
    //   Alert.alert("Please check your input");
    //   return;
    // }

    // onBlur validality check
    if (
      !email.isValid ||
      !confirmEmail.isValid ||
      !password.isValid ||
      !confirmPassword.isValid
    ) {
      console.log("somwthing wrong");
      Alert.alert("Please check your input");
      return;
    }

    submitAuthHandler(email.value, password.value);
  };

  return (
    <View>
      <Input
        label="Email"
        style={{
          marginVertical: 3,
        }}
        onChangeHandler={(enteredValue) =>
          onChangeHandler("email", enteredValue)
        }
        blurValidationHandler={() => onBlurHandler("email")}
        value={email.value}
        isValid={email.isValid}
        notValidText={"Not valid email"}
        isEmpty={email.isEmpty}
        textInputConfig={{
          keyboardType: "email-address",
          autoCapitalize: "none",
        }}
      />
      {!isLogin && (
        <Input
          label="Confirm Email"
          style={{ marginVertical: 3 }}
          onChangeHandler={(enteredValue) =>
            onChangeHandler("confirmEmail", enteredValue)
          }
          value={confirmEmail.value}
          blurValidationHandler={() => onBlurHandler("confirmEmail")}
          isValid={confirmEmail.isValid}
          notValidText={"Not same Email"}
          isEmpty={confirmEmail.isEmpty}
          textInputConfig={{
            keyboardType: "email-address",
            autoCapitalize: "none",
          }}
        />
      )}
      <Input
        label="Password"
        style={{ marginVertical: 3 }}
        onChangeHandler={(enteredValue) =>
          onChangeHandler("password", enteredValue)
        }
        value={password.value}
        blurValidationHandler={() => onBlurHandler("password")}
        isValid={password.isValid}
        notValidText={"The length of password should be greater than 5"}
        isEmpty={password.isEmpty}
        textInputConfig={{
          autoCapitalize: "none",
        }}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          style={{ marginVertical: 3 }}
          onChangeHandler={(enteredValue) =>
            onChangeHandler("confirmPassword", enteredValue)
          }
          value={confirmPassword.value}
          blurValidationHandler={() => onBlurHandler("confirmPassword")}
          isValid={confirmPassword.isValid}
          notValidText={"Not same password"}
          isEmpty={confirmPassword.isEmpty}
          textInputConfig={{
            autoCapitalize: "none",
          }}
        />
      )}
      <FlatButtion
        buttonText={isLogin ? "Log In" : "Sign Up"}
        onPressHandler={submitHandler}
      />
    </View>
  );
};

export default AuthForm;
