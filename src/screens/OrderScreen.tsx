import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {}, [order]);
  return (
    <View style={styles.container}>
      <Text>Orders Screen</Text>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: -10,
  },
});
