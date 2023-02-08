import { View, StyleSheet } from "react-native";

const Card = (props) => {
  return (
    <View style={[styles.container, props.borderColor]}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 3,
    marginHorizontal: 20,
    marginVertical: "3%",
    width: "90%",
    borderRadius: 8,
    borderWidth: 2,
  },
});
