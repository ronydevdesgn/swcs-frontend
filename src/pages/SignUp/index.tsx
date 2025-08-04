import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormSignup } from "../../components/Form/formSigup";

export function SignUp() {
  return (
    <div className="container">
      <FormSignup />
      <div className="generec-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
      </div>
    </div>
  );
}
