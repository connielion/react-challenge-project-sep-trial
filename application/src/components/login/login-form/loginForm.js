import React, { useState } from "react";
import { login } from "../../../redux-toolkit/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const loginOnClick = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then(() =>
      history.push("/view-orders")
    );
  };

  const onChange = (key, val) => {
    if (key === "email") setEmail(val);
    if (key === "password") setPassword(val);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="test@test.com"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
        ></input>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={(e) =>
            email.length >= 6 && validateEmail(email) && password.length >= 6
              ? loginOnClick(e)
              : alert(
                  "Please enter valid email and password with at least 6 characters!"
                )
          }
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
