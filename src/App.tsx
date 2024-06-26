import "./App.css";
import Illustrator from "../src/assets/img/Illustrator.svg";
import { FormLogin } from "./components/formLogin";

function App() {
  return (
    <div className="container">
      <FormLogin />
      <div className="generec-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
      </div>
    </div>
  );
}

export default App;
