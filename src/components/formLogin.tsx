import Logoswcs from "/logoswcs.svg";
import "./formLogin.css"
export function FormLogin() {
  return (
    <div className="group-form">
      <img src={Logoswcs} alt="logotipo do sistema" />
      <form action="#" method="get">
        <div className="group-title">
          <h1>Acesse o sistema</h1>
          <p>Preencha os campos abaixos se tiver uma conta</p>
        </div>
        <div className="group-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Preencha com o seu nome"
            required
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Preencha com o seu e-mail"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Preencha com a sua senha"
            required
          />
          <select name="cargo" id="cargo" required>
            <option disabled selected value="" className="Placeholder">
            Selecione o seu cargo
            </option>
            <option value="sumarista">Sumarista</option>
            <option value="professor">Professor</option>
          </select>
        </div>
        <div className="group-button">
          <button type="button">Entrar agora</button>
          <a href="#">Esqueceu da senha?</a>
        </div>
      </form>
    </div>
  );
}
