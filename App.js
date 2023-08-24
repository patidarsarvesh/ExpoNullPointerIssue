import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { setNotificationHandler } from "expo-notifications";
import { requestForegroundPermissionsAsync } from "expo-location";

export default function App() {
  requestForegroundPermissionsAsync();

  setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
