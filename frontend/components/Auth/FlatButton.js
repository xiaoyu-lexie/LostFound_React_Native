import { Pressable, View, Text, StyleSheet } from "react-native";

const FlatButtion = ({ buttonText, onPressHandler }) => {
  return (
    <Pressable onPress={onPressHandler}>
      <View style={styles.button}>
        <Text style={styles.text}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default FlatButtion;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#c5dcf1",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    marginVertical: 17,
  },
  text: {
    color: "#014098",
    fontSize: 18,
    fontWeight: "bold",
  },
});
