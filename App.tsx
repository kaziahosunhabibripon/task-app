import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigator/RootNavigator";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://chataparru.stepzen.net/api/task-app/__graphql",
  headers: {
    Authorization:
      "apikey chataparru::stepzen.io+1000::bdf18a290d13bbb824f98066e4b9cdb6e9c6b6445c04117eec0538ec0f60a4eb",
  },
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    //@ts-ignore - TailwindProvider is missing a type definition
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
