import "./index.css";
import Illustrator from "../../assets/img/Illustrator.svg";
import { FormLogin } from "../../components/Form/formLogin";
// import { ConnectionStatus } from '../../components/Shared/ConnectionStatus';

export function Login() {
  return (
    <div className="container-main">
      <FormLogin />
      <div className="generic-img">
        <img src={Illustrator} alt="Ilustração de cards flutuando" />
        {/* Adicionar status de conexão durante desenvolvimento */}
        {/* {import.meta.env.DEV && <ConnectionStatus />} */}
      </div>
    </div>
  );
}
