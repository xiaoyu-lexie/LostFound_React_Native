import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import LostPage from "./screens/LostPage";
import FoundPage from "./screens/FoundPage";
import Account from "./screens/Account";
import AddLost from "./screens/AddLost";
import AddFound from "./screens/AddFound";
import LostDetail from "./screens/LostDetail";
import FoundDetail from "./screens/FoundDetail";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";

import DUMMY_FOUND from "./DUMMY_DATA/DUMMY_FOUND";
import DUMMY_LOST from "./DUMMY_DATA/DUMMY_LOST";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const LostAndAdd = ({ navigation }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerRight: ({ tintColor }) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("AddLost");
                }}
              >
                <View>
                  <Ionicons name="add" size={24} />
                </View>
              </Pressable>
            );
          },
        }}
      >
        <Stack.Screen name="LostPage" options={{ title: "What I lost" }}>
          {() => <LostPage data={DUMMY_LOST} />}
        </Stack.Screen>
        <Stack.Screen name="LostDetailPage" options={{ title: "Details" }}>
          {() => <LostDetail />}
        </Stack.Screen>
        <Stack.Screen
          name="AddLost"
          component={AddLost}
          options={{ presentation: "modal", title: "Create a new lost" }}
        />
      </Stack.Navigator>
    );
  };

  const FoundAndAdd = ({ navigation }) => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerRight: ({ tintColor }) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("AddFound");
                }}
              >
                <View>
                  <Ionicons name="add" size={24} />
                </View>
              </Pressable>
            );
          },
        }}
      >
        <Stack.Screen name="FoundPage" options={{ title: "What I found" }}>
          {() => <FoundPage data={DUMMY_FOUND} />}
        </Stack.Screen>
        <Stack.Screen name="FoundDetailPage" options={{ title: "Details" }}>
          {() => <FoundDetail />}
        </Stack.Screen>
        <Stack.Screen
          name="AddFound"
          component={AddFound}
          options={{ presentation: "modal", title: "Create a new found" }}
        />
      </Stack.Navigator>
    );
  };

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          // options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          // options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="I Lost"
          component={LostAndAdd}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="I found"
          component={FoundAndAdd}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Account" component={Account} />
        <Tab.Screen name="Auth" component={AuthStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
