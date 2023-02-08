import { Alert, Button, View, Image, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermission, requestPermission] = useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insifficient Permissions to access your camera",
        "You nedd to grant camera permissions to use this app"
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    //console.log('image', image)

    setPickedImage(image.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.container}>
        {pickedImage && (
          <Image style={styles.imagePreview} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  imagePreview: {
    width: "90%",
    height: 200,
    marginVertical: 8,
  },
});
