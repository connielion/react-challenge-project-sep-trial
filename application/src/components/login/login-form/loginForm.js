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
    dispatch(login({ email, password })).then(()=>history.push('/view-orders'));
  };

  const onChange = (key, val) => {
    if (key === "email") setEmail(val);
    if (key === "password") setPassword(val);
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
          onClick={(e) => loginOnClick(e)}
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
