import React, { useState } from "react";
import request from "../../graphQL/request";
import { REGISTER_USER } from "../../graphQL/mutations";
import { FaCheckCircle } from "react-icons/fa";

function Register({ setLogin, passEmail }) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const registerUser = (e) => {
    e.preventDefault();
    //const validEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
    if (
      email === "" ||
      displayName === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      setError("Please fill out all fields");
      return;
    } else if (!validEmail) {
      setError("Not valid email");
      return;
    } else if (password !== passwordConfirm) {
      setError("Passwords doesn't match");
      return;
    }

    request(REGISTER_USER, {
      email: email,
      password: password,
      displayName: displayName,
      avatar: "",
    })
      .then((data) => {
        if (data.errors) setError(data.errors[0].message);
        setSuccess(null);
        console.log(data);
        if (!data.errors) {
          console.log(data);
          setSuccess("Success");
          passEmail(email);
          setLogin(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="reg_layout">
      <h1>Register</h1>
      {error ? <p className="error">{error}</p> : null}
      <form onSubmit={registerUser}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Password Confirm"
        />
        <button type="submit" className="reg_btn">
          Register
        </button>
      </form>
      {success && (
        <div className="register_success">
          <FaCheckCircle />
        </div>
      )}
      <div className="register_link">
        <p>Already have an account?</p>
        <span onClick={(prev) => setLogin(!prev)}>Login</span>
      </div>
    </div>
  );
}

export default Register;
