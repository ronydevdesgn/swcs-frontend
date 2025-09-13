import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormLogin } from "../../components/Form/formLogin";

export function Login() {
  return (
    <div className="container-main">
      <FormLogin />
      <div className="generic-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
      </div>
    </div>
  );
}
