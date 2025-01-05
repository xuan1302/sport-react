import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Import the generated route tree
import { Provider } from "react-redux";
import GlobalLoading from "./components/base/loading/loadding";
import { routeTree } from "./routeTree.gen";
import store from "./store/store";
import { isAdmin } from "./utils/auth";

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});
// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} context={{ isAdmin }} />
      <GlobalLoading />
    </Provider>
  </StrictMode>
);
