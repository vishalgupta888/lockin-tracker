import { Provider } from "react-redux";
import "./App.css";
import store from "./store/store";
import { Container, Typography } from "@mui/material";
import AddLockinForm from "./components/add-lockin-form";
import LockinList from "./components/lockin-list";
import LockinStats from "./components/lockin-stats";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h2" variant="h1" align="center">
          Lockin Tracker
        </Typography>
        <AddLockinForm />
        <LockinList />
        <LockinStats />
      </Container>
    </Provider>
  );
}

export default App;
