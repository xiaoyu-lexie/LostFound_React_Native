import { View, StyleSheet } from "react-native";

import Input from "../components/Input";
import ImagePicker from "../components/ImagePicker";

const AddFound = () => {
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
          label="verify question to contact you"
          textInputConfig={{
            multiline: false,
          }}
        />
        <ImagePicker />
      </View>
    </View>
  );
};

export default AddFound;

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
