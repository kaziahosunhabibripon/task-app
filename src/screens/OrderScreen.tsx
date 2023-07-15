import { StyleSheet, ActivityIndicator, View, Text } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamList } from "../navigator/RootNavigator";
import { TabStackParamList } from "../navigator/TabNavigator";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useOrders from "../../hooks/useOrders";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Image } from "@rneui/themed";
import OrderCard from "../../components/OrderCard";

type OrderScreenRouteProp = RouteProp<RootStackParamList, "Order">;

export type OrderScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrderScreen = () => {
  const navigation = useNavigation<OrderScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? "#EB6A7C" : color, fontSize: 10 }}>
          Orders
        </Text>
      ),
    });
  });

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../image/customer.jpg")}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View>
        <Button
          color="pink"
          titleStyle={{ color: "gray", fontWeight: "400" }}
          onPress={() => setAscending(!ascending)}
          containerStyle={styles.button}
        >
          {ascending
            ? "Showing :  Oldest First"
            : "Showing : Most Recent First"}
        </Button>

        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(b.createdAt) > new Date(a.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map(order => (
            <OrderCard key={order.trackingId} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrderScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EB6A7C",
  },
  view: {
    color: "#EB6A7C",
    fontSize: 20,
    fontWeight: "400",
    padding: 10,
  },
  image: { width: "100%", height: 225 },
  button: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});
