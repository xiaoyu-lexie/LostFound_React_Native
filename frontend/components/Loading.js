import { View, Text, ActivityIndicator } from "react-native";

const Loading = ({ message }) => {
  return (
    <View>
      <Text>{message}</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;
