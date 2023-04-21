import "./login.scss";
import { useContext, useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { publicRequest } from "../../helpers/requestMethods";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const { dispatch, loading, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN_START",
    });
    try {
      const res = await publicRequest.post("/api/auth/login", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data,
      });
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.response.data,
      });
    }
  };

  return (
    <div className="login">
      <div className="inputContainer">
        <div className="top">
          <img src="https://i.hizliresim.com/hmttz34.png" alt="logo" />
          <h1>database</h1>
        </div>
        <div className="input">
          <input ref={usernameRef} placeholder="Kullanıcı adı" />
          <PersonIcon className="icon" />
        </div>
        <div className="input">
          <input ref={passwordRef} type="password" placeholder="Şifre" />
          <KeyIcon className="icon" />
        </div>
        <div className="btnContainer">
          <button onClick={handleLogin} disabled={loading}>
            Giriş Yap
          </button>
          {error && <span className="error">{error.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Login;
