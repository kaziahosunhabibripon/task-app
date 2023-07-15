import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import useCustomerOrders from "../hooks/useCustomerOrders";
import { useNavigation } from "@react-navigation/native";
import { CustomersScreenNavigationProp } from "../src/screens/CustomersScreen";
import { Card, Icon } from "@rneui/themed";

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, name, userId }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MyModal", {
          name: name,
          userId: userId,
        })
      }
    >
      <Card containerStyle={styles.container}>
        <View>
          <View style={styles.view}>
            <View>
              <Text style={styles.view1}>{name}</Text>
              <Text style={styles.view2}>ID: {userId}</Text>
            </View>
            <View style={styles.view3}>
              <Text>{loading ? "loading...." : `${orders.length} x`}</Text>
              <Icon
                name="box"
                type="entypo"
                color="#59C1CC"
                style={styles.icon}
                size={50}
              />
            </View>
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view1: {
    fontSize: 20,
    fontWeight: "bold",
  },
  view2: {
    fontSize: 12,
    color: "#59C1CC",
  },
  view3: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginBottom: 25,
    marginLeft: "auto",
  },
});
