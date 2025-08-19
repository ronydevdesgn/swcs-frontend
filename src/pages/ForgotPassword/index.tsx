import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormForgot } from "../../components/Form/formForgot";

export function ForgotPassword() {
  return (
    <div className="container-main">
      <FormForgot />
      <div className="generec-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
      </div>
    </div>
  );
}