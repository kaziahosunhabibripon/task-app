import { ActivityIndicator, ScrollView, StyleSheet, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { TabStackParamList } from "../navigator/TabNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigator/RootNavigator";
import { Image, Input } from "@rneui/themed";
import { GET_CUSTOMERS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import CustomerCard from "../../components/CustomerCard";
export type CustomersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, "Customers">,
  NativeStackNavigationProp<RootStackParamList>
>;
const CustomersScreen = () => {
  const navigation = useNavigation<CustomersScreenNavigationProp>();
  const [input, setInput] = useState<string>("");
  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../image/order.jpeg")}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <Input
        placeholder="Search by Customers"
        value={input}
        onChangeText={setInput}
        containerStyle={styles.input}
      />
      {data?.getCustomers
        ?.filter((customer: CustomerList) =>
          customer.value.name.includes(input)
        )
        .map(({ name: ID, value: { email, name } }: CustomerResponse) => (
          <CustomerCard key={ID} email={email} name={name} userId={ID} />
        ))}
    </ScrollView>
  );
};

export default CustomersScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#59C1CC",
    flex: 1,
  },
  image: {
    width: "100%",
    height: 225,
  },
  input: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 5,
  },
});
