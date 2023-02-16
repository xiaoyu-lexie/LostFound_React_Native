import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import Card from "../components/Card";

const LostDetail = () => {
  const route = useRoute();

  const data = route.params.data;

  //到时候能不能借助redux进行优化，用redux记住itemData，而不是再去find
  // const selected = DUMMY_LOST.find((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Text>{data.title}</Text>
      <Text>{data.date}</Text>
      <Text>{data.description}</Text>
      <Text>Please text me: {data.contact}</Text>
    </View>
  );
};

export default LostDetail;

const styles = StyleSheet.create({
  container: {
    borderColor: "#1a188e",
    borderWidth: 3,
    width: "80%",
    padding: 20,
    marginTop: 40,
    marginHorizontal: "10%",
  },
});
