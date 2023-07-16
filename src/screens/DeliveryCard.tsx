import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Divider, Icon } from "@rneui/themed";
import MapView, { Marker } from "react-native-maps";

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order }: Props) => {
  return (
    <Card containerStyle={styles.card}>
      <View>
        <Icon name="box" type="entypo" size={50} color="white" />
        <View>
          <Text style={styles.text1}>
            {order.carrier} -{order.trackingId}
          </Text>
          <Text style={styles.text2}>
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.text3}>Address</Text>
          <Text style={styles.text4}>
            {order.Address} {order.City}
          </Text>
          <Text style={[styles.text4, styles.text5]}>
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>

        <Divider color="white" />
        <View style={{ padding: 20 }}>
          {order.trackingItems.items.map(item => (
            <View style={styles.quantity} key={item.item_id}>
              <Text style={[styles.text5, styles.text4]}>{item.name}</Text>
              <Text style={styles.text4}>{item.quantity}</Text>
            </View>
          ))}
        </View>
        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          style={styles.map}
        >
          {order.Lat && order.Lng && (
            <Marker
              coordinate={{
                latitude: order.Lat,
                longitude: order.Lng,
              }}
              title="Delivery Location"
              description={order.Address}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;

const styles = StyleSheet.create({
  card: {
    padding: 0,
    paddingTop: 16,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#59C1CC",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  text1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  text2: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "700",
  },
  cardFooter: {
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 20,
  },
  text3: {
    color: "white",
    marginTop: 20,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  text4: {
    color: "white",
    textAlign: "center",
  },
  text5: {
    fontStyle: "italic",
    fontSize: 10,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 200,
  },
});
