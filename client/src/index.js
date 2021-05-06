import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

/*const client = new ApolloClient({
  uri: "http://localhost:5000/api",
  cache: new InMemoryCache(),
}); */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
