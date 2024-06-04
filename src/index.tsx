import ReactDOM from "react-dom/client";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "services/store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <SnackbarProvider
    maxSnack={2}
    preventDuplicate
    dense
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
  >
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </SnackbarProvider>
);
