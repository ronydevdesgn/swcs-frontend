import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormLogin } from "../../components/formLogin";

export function Login() {
  return (
    <div className="container">
    <FormLogin />
    <div className="generec-img">
      <img src={Illustrator} alt="Ilustração de cards flutuando" />
    </div>
  </div>
  )
}