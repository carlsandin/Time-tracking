import React, { useState } from "react";
import "./Register.css";
import Register from "./Register";
import request from "../../graphQL/request";
import { SIGN_IN } from "../../graphQL/queries";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(true);

  const signIn = async (e) => {
    e.preventDefault();
    await request(SIGN_IN, { email: email, password: password })
      .then((data) => {
        if (data.errors) setError(data.errors[0].message);
        console.log(data);
        if (data.data.login) {
          localStorage.setItem("user", JSON.stringify(data.data.login));
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reg_container">
      {!login ? (
        <Register setLogin={setLogin} passEmail={setEmail} />
      ) : (
        <div className="reg_layout">
          <h1>Log in</h1>
          {error && <div className="error">{error}</div>}
          <form onSubmit={signIn}>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit" className="reg_btn">
              Log in
            </button>
          </form>

          <div className="register_link">
            <p>Don't have an account?</p>
            <span onClick={(prev) => setLogin(!prev)}>Register</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
