import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { DataProvider } from "./context/ContextForData.tsx";
import { StoreProvider } from "./context/StoreContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </StoreProvider>
);
