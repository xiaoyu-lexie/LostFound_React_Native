import { TextInput, View, Text, StyleSheet } from "react-native";

const Input = ({
  label,
  style,
  textInputConfig,
  onChangeHandler,
  value,
  blurValidationHandler,
  isValid,
  notValidText,
  isEmpty,
}) => {
  return (
    <View style={style}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        {...textInputConfig}
        onChangeText={onChangeHandler}
        value={value}
        onBlur={blurValidationHandler}
        isEmpty={isEmpty}
      />

      {isEmpty ? (
        <Text>Cannot be empty</Text>
      ) : isValid ? null : (
        <Text>{notValidText}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderColor: "#554dc8",
    borderWidth: 2,
    borderRadius: 6,
    height: 45,
  },
});
