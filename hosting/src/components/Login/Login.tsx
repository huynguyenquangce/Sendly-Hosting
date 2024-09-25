import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { LoginUser } from "../../redux/slice/user/loginSlice";
import "./Login.css";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onButtonClick = async () => {
    const loginObject = { email: email, password: password };
    const response = await dispatch(LoginUser(loginObject));
    setPassword("");
    setEmail("");
    console.log(response.payload);
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="email"
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => {
            setEmail(ev.target.value);
          }}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          className={"inputBox"}
        />
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value={"Log in"}
        />
      </div>
    </div>
  );
};

export default Login;
