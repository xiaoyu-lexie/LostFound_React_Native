import { View, Pressable, Image, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Card from "./Card";

const ListItem = ({ foundOrLost, item, borderColor }) => {
  const navigation = useNavigation();
  const navegateTo =
    foundOrLost === "found" ? "FoundDetailPage" : "LostDetailPage";
  const itemPressHandler = () => {
    navigation.navigate(navegateTo, {
      itemId: item.id,
    });
  };

  return (
    <Card borderColor={borderColor}>
      <Pressable onPress={itemPressHandler}>
        <View>
          <Text style={styles.clickText}>
            Click me to get contact information
          </Text>
        </View>
        <View style={styles.contentBox}>
          {foundOrLost === "found" && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
          <Text>{item.title}</Text>
          <Text>{item.location}</Text>
          <Text>{item.date}</Text>
        </View>
      </Pressable>
    </Card>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  clickText: {
    textAlign: "center",
    color: "#1a188e",
  },
  contentBox: {
    marginTop: 8,
  },
});
