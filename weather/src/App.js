import "./App.css";
import ConnectedCard from "./components/cardCity";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import { Modal } from "./components/modal";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ConnectedCard />
        <Modal />
      </div>
    </Provider>
  );
}

export default App;
