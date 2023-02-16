import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

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
  const [isAuth, setIsAuth] = useState({
    isAuthenticated: false,
    token: "",
  });
  const [losts, setLosts] = useState([]);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");
        // verify the token?

        if (token) {
          setIsAuth({ isAuthenticated: true, token: token });
        }
      } catch (err) {
        console.log(err);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    const fetchAllLosts = async () => {
      const url = "http://192.168.1.8:5003/graphql";

      try {
        const data = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            query {
              lostList {
               id,
                title,
                description,
                location,
                date,
                contact

              }
            }
            `,
          }),
        }).then((res) => res.json());

        setLosts(data.data.lostList);
      } catch (err) {
        console.log("fetch losts error", err);
      }
    };

    fetchAllLosts();
  }, []);

  const changeToAuthedHandler = async (token) => {
    await SecureStore.setItemAsync("token", token);
    setIsAuth({ isAuthenticated: true, token });
  };

  const logoutHandler = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuth({ isAuthenticated: false });
  };

  const LostAndAdd = ({ navigation }) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LostPage"
          options={{
            title: "What I lost",
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
          {() => <LostPage data={losts} />}
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
        <Stack.Screen name="Login">
          {() => <LoginScreen changeToAuthedHandler={changeToAuthedHandler} />}
        </Stack.Screen>
        <Stack.Screen name="Signup">
          {() => <SignupScreen changeToAuthedHandler={changeToAuthedHandler} />}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };

  const AlreadyAuthedStack = () => {
    return (
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
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerRight: ({ tintColor }) => {
              return (
                <Pressable onPress={logoutHandler}>
                  <View style={styles.logoutContainer}>
                    <Text style={styles.logoutText}>Logout</Text>
                  </View>
                </Pressable>
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!isAuth.isAuthenticated && <AuthStack />}
      {isAuth.isAuthenticated && AlreadyAuthedStack()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    borderWidth: 2,
    borderColor: "#6676c8",
    marginRight: "15%",
    padding: 3,
    borderRadius: 5,
    backgroundColor: "#c2dbf1",
  },
  logoutText: {
    color: "#554dc8",
    fontSize: 14,
    fontWeight: "bold",
  },
});
