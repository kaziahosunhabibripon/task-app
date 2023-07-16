import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, Icon } from "@rneui/themed";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../src/navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../src/navigator/RootNavigator";

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Orders">,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Order", { order: item })}
    >
      <Card containerStyle={styles.card}>
        <View style={styles.container}>
          <View>
            <Icon
              name="truck-delivery"
              color="#EB6A7C"
              type="material-community"
            />
            <Text style={{ fontSize: 10 }}>
              {new Date(item.createdAt).toDateString()}
            </Text>
          </View>

          <View>
            <Text style={styles.text}>
              {item.carrier} - {item.trackingId}
            </Text>

            <Text style={styles.text1}>{item.trackingItems.customer.name}</Text>
          </View>

          <View style={styles.view1}>
            <Text style={styles.text2}>
              {item.trackingItems.items.length} x
            </Text>
            <Icon style={styles.iconText} name="box" type="feather" />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  view1: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: { color: "gray", fontWeight: "400", fontSize: 10 },
  text1: { color: "gray", fontWeight: "500" },
  text2: {
    fontSize: 12,
    color: "#EB6A7C",
  },
  iconText: {
    marginLeft: 5,
    marginRight: 5,
  },
});
