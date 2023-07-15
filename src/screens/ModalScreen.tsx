import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/themed";
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
import useCustomerOrders from "../../hooks/useCustomerOrders";
import DeliveryCard from "./DeliveryCard";

type ModalScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList>,
  NativeStackNavigationProp<RootStackParamList, "MyModal">
>;

type ModalScreenProp = RouteProp<RootStackParamList, "MyModal">;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenProp>();
  const { loading, error, orders } = useCustomerOrders(userId);
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} style={styles.view1}>
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View style={styles.view2}>
        <View style={styles.view3}>
          <Text style={styles.text1}>{name}</Text>
          <Text style={styles.text2}>Deliveries</Text>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.flatList}
        data={orders}
        keyExtractor={order => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
      />
    </View>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  view1: {
    top: 5,
    left: 0,
    right: 5,
    bottom: 0,
    padding: 25,
    alignItems: "flex-end",
  },
  view2: {
    marginTop: 10,
  },
  view3: {
    paddingBottom: 20,
    borderBottomColor: "#59C1CC",
    borderBottomWidth: 1,
  },
  text1: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#59C1CC",
  },
  text2: {
    textAlign: "center",
    fontSize: 12,
    color: "#0f0f0f",
  },
  flatList: {
    paddingBottom: 200,
  },
});
