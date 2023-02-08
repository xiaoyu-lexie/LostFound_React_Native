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
    backgroundColor: "#c2dbf1",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  text: {
    color: "#554dc8",
    fontSize: 15,
    fontWeight: "bold",
  },
});
