import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import { config } from "./config/msal-config";

const pca = new PublicClientApplication({
  auth: { clientId: config.auth.clientId },
});



//getAccessToken(pca,pca.getAllAccounts()[0])

//<AuthContextProvider></AuthContextProvider>


const AppProvider = () => (
  <MsalProvider instance={pca}>
      <App />
  </MsalProvider>
);

ReactDOM.render(<AppProvider />, document.getElementById("root"));
