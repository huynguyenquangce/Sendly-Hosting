import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { LoginUser } from "../../redux/slice/user/loginSlice";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  interface LoginResponse {
    payload: {
      data: {
        access_token: string;
        refresh_token: string;
        message: string;
        user: {
          email: string;
          userID: string;
        };
      };
    };
  }
  const onButtonClick = async () => {
    const loginObject = { email: email, password: password };
    try {
      const response = (await dispatch(
        LoginUser(loginObject)
      )) as LoginResponse;
      console.log("check response", response);
      if (response && response.payload) {
        const access_token = response.payload.data?.access_token;
        const refresh_token = response.payload.data?.refresh_token;
        if (access_token && refresh_token) {
          console.log(access_token, "check access_token");
          console.log(refresh_token, " check refresh_token");
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
        } else {
          console.error("Can not get token", response);
        }
      } else {
        console.error("Unexpected response structure:", response);
      }
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {}
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
