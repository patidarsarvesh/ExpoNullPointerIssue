import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import { useRef, useEffect } from "react";
import { AppState } from "react-native";

export const useRootEnteredForegroundEffect = (onForegroundEntered) => {
  const state = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      try {
        console.log("prev:", state.current.match, "next:", nextAppState)
        if (state.current.match(/inactive|background/) && nextAppState === 'active')
          await onForegroundEntered?.();
      } catch (err) {
        console.error(err);
      }

      state.current = nextAppState;
    });

    return () => subscription.remove();
  }, [onForegroundEntered]);
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  console.log('app render');

  useEffect(() => {
    requestForegroundPermissionsAsync();
  }, []);

  useRootEnteredForegroundEffect(async () => {
    getCurrentPositionAsync().catch((_err) => console.log('could not get location (expected)'));
    Notifications.getPermissionsAsync().catch((_err) => console.log('could not get notifications (expected)'));
    
    await Updates.reloadAsync();
    console.log('may not log (expected)');
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
