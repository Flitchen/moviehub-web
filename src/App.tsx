import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

import { store, persistor } from "./store";
import AppRouter from "./router";

function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ClerkProvider publishableKey={clerkPubKey}>
          <BrowserRouter>
            <AppRouter />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1e293b",
                  color: "#f1f5f9",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                },
                success: {
                  iconTheme: {
                    primary: "#0ea5e9",
                    secondary: "#f1f5f9",
                  },
                },
              }}
            />
          </BrowserRouter>
        </ClerkProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
