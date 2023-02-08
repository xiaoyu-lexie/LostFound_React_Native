import { View, StyleSheet } from "react-native";

import Input from "../components/Input";

const AddLost = () => {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Input
          label="title"
          textInputConfig={{
            multiline: false,
          }}
        />
        <View style={styles.row}>
          <Input
            label="location"
            style={{ flex: 1, marginRight: 5 }}
            textInputConfig={{
              multiline: false,
            }}
          />
          <Input
            label="date"
            style={{ flex: 1 }}
            textInputConfig={{
              multiline: false,
            }}
          />
        </View>
        <Input
          label="description"
          textInputConfig={{
            multiline: true,
            textAlignVertical: "top",
            minHeight: 100,
          }}
        />
        <Input
          label="text phone number"
          textInputConfig={{
            multiline: false,
          }}
        />
      </View>
    </View>
  );
};

export default AddLost;

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
  },
  container: {
    marginTop: 30,
    width: "85%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
