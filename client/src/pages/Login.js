import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [Login, setLogin] = useState("");
  const [Password, setPassword] = useState("");
  const [authOn, setAuth] = useState(false);

  const location = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", "");
  }, []);

  useEffect(()=> {
    if (authOn === true) {
       localStorage.setItem("user", true);
      location('/viewFilms')
    }
  }, [authOn,location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { Login, Password });
  };

  async function axioss() {
    const passData = new URLSearchParams();

    passData.append("Usuario", String(Login));
    passData.append("Senha", String(Password));
    let auth = await axios({
      method: "POST",
      url: "http://localhost/projetophp+react/desafio-php/api/valida.php",
      data: passData,
    });
    if (auth.data === true) {
      setAuth(true);
    } else {
      alert("usuario nao encontrado");
    }
  }

  return (
    <div id="Logar">
      <div className="title">Login</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="Field">
          <label htmlFor="Login">Login</label>
          <input
            type="Login"
            name="Login"
            id="Login"
            value={Login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="Field">
          <label htmlFor="Password">Senha</label>
          <input
            type="Password"
            name="Password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button
            onClick={() => {
              axioss();
            }}
            value="ok"
            red
          >
            entrar
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
