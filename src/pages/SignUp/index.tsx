import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormSignup } from "../../components/Form/formSignup";

export function SignUp() {
  return (
    <div className="container-main">
      <FormSignup />
      <div className="generic-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
      </div>
    </div>
  );
}
