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
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={styles.input}
        {...textInputConfig}
        onChangeText={onChangeHandler}
        value={value}
        onBlur={blurValidationHandler}
        isEmpty={isEmpty}
      />
      {isEmpty ? (
        <Text style={styles.warnText}>Cannot be empty</Text>
      ) : isValid ? null : (
        <Text style={styles.warnText}>{notValidText}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  labelText: {
    color: "#014098",
    fontSize: 16,
    marginVertical: 5,
  },
  input: {
    borderColor: "#7ab1e4",
    borderWidth: 2,
    borderRadius: 6,
    height: 45,
    fontSize: 20,
    padding: 5,
    color: "#0a4ba7",
  },
  warnText: {
    color: "#ae5a06",
    fontSize: 12,
    fontWeight: "bold",
  },
});
