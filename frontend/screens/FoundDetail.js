import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  Button,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import Card from "../components/Card";

import DUMMY_FOUND from "../DUMMY_DATA/DUMMY_FOUND";
import Input from "../components/Input";

const FoundDetail = () => {
  const route = useRoute();

  const id = route.params.itemId;

  //到时候能不能借助redux进行优化，用redux记住itemData，而不是再去find
  const selected = DUMMY_FOUND.find((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Text>{selected.title}</Text>
      <Image source={{ uri: selected.image }} style={styles.image} />
      <Text>{selected.date}</Text>
      <Text>{selected.location}</Text>
      <Text>Answer this question to get contact: {selected.question}</Text>
      <Input
        label="Answer question to get contact number"
        textInputConfig={{
          multiline: true,
          textAlignVertical: "top",
          minHeight: 100,
        }}
      />
      <Input label="your contact" />
      <Button title="Submit"></Button>
    </View>
  );
};

export default FoundDetail;

const styles = StyleSheet.create({
  container: {
    borderColor: "#1a188e",
    borderWidth: 3,
    width: "80%",
    padding: 20,
    marginTop: 40,
    marginHorizontal: "10%",
  },
  image: {
    width: "100%",
    height: 200,
  },
});
