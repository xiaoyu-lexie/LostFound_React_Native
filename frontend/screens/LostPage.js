import { Text, FlatList, View } from "react-native";
import { useState } from "react";

import ListItem from "../components/ListItem";

const LostPage = ({ data }) => {
  const [list, setList] = useState(data);

  return (
    <View>
      <FlatList
        data={list}
        renderItem={(itemData) => (
          <ListItem
            foundOrLost="lost"
            item={itemData.item}
            borderColor={{ borderColor: "#efd184" }}
          />
        )}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

export default LostPage;
