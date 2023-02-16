import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

import Input from "../components/Input";
import AuthForm from "../components/Auth/AuthForm";

const AddLost = () => {
  const height = useHeaderHeight();
  return (
    <View style={styles.outer}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={height}
        behavior="padding"
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <AuthForm submitAuthHandler={() => {}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );

  //   <View style={styles.outer}>
  //     <View style={styles.container}>
  //       <Input
  //         label="title"
  //         textInputConfig={{
  //           multiline: false,
  //         }}
  //       />
  //       <View style={styles.row}>
  //         <Input
  //           label="location"
  //           style={{ flex: 1, marginRight: 5 }}
  //           textInputConfig={{
  //             multiline: false,
  //           }}
  //         />
  //         <Input
  //           label="date"
  //           style={{ flex: 1 }}
  //           textInputConfig={{
  //             multiline: false,
  //           }}
  //         />
  //       </View>
  //       <Input
  //         label="description"
  //         style={{
  //           flex: 1,
  //           marginVertical: 3,
  //           borderColor: "blue",
  //           borderWidth: 3,
  //         }}
  //         textInputConfig={{
  //           multiline: true,
  //           textAlignVertical: "top",
  //           minHeight: 100,
  //         }}
  //       />
  //       <Input
  //         label="text phone number"
  //         style={{ marginVertical: 3 }}
  //         textInputConfig={{
  //           multiline: false,
  //         }}
  //       />
  //     </View>
  //   </View>
  // );
};

export default AddLost;

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    borderColor: "red",
    borderWidth: 3,
    flex: 1,
  },
  container: {
    marginTop: 30,
    width: "85%",
    flex: 1,
    // borderColor: "blue",
    // borderWidth: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
