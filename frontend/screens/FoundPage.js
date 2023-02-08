import { Text, FlatList, View } from "react-native";
import { useState } from "react";

import ListItem from "../components/ListItem";

const FoundPage = ({ data }) => {
  const [list, setList] = useState(data);

  return (
    <View>
      <FlatList
        data={list}
        renderItem={(itemData) => (
          <ListItem
            foundOrLost="found"
            item={itemData.item}
            borderColor={{ borderColor: "#8eb1e7" }}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

export default FoundPage;
