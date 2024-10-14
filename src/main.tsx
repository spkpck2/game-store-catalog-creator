import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import awsExports from "../amplify_outputs.json";
Amplify.configure(awsExports);
import { Authenticator } from "@aws-amplify/ui-react";
import "./index.css";
import "@aws-amplify/ui-react/styles.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Authenticator>
        <App />
      </Authenticator>
    </BrowserRouter>
  </StrictMode>
);
