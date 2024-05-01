import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import axios from "axios";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sign, setSign] = useState("signin");
  const [heading, setHeading] = useState("Sign In");
  const [password, setPassword] = useState("");
  const [loadings, setLoadings] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setISAuthenticated] = useState(() => JSON.parse(localStorage.getItem("token")) ? true : false);


  useEffect(function () {
    if (isAuthenticated) {
      navigate('/Redux-Todo-List', { replace: true });
    }
  }, [isAuthenticated, navigate])

  async function signinBtn(e) {
    e.preventDefault();
    if (sign === "signup") {
      setSign("signin");
      setHeading("Sign In")
      return;
    }
    try {
      setLoadings(true);
      const res = await axios.post('https://todo-node.up.railway.app/api/v1/users/login', {
        email: email,
        password: password
      })
      const token = res.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem("token", JSON.stringify(token));
      setISAuthenticated(true);
      setLoadings(false);
      navigate('/Redux-Todo-List');
    } catch (error) {
      console.log(error);
    }



  }
  async function signupBtn(e) {
    e.preventDefault();
    if (sign === "signin") {
      setSign("signup");
      setHeading("Sign Up")
      return;
    }
    try {
      setLoadings(true);
      const res = await axios.post('https://todo-node.up.railway.app/api/v1/users/signup', {
        name: name,
        email: email,
        password: password,
        confirmPassword: password
      })
      const token = res.data.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem("token", JSON.stringify(token));
      setISAuthenticated(true);
      setLoadings(false);
      navigate('/Redux-Todo-List');

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <main className='.login'>
      <div className="container">
        <div className="form-box">
          <h1 id="title">{heading}</h1>
          {loadings ? <Spinner /> : <form>
            <div className="input-box">
              {sign === "signup" && <div className="input-field" id="nameField">
                <i className="fa-solid fa-user"></i>
                <input className="login-input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>}

              <div className="input-field">
                <i className="fa-solid fa-envelope"></i>
                <input className="login-input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="input-field">
                <i className="fa-solid fa-lock"></i>
                <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>
            </div>
            <div className="btn-box">
              <button type="button" id="login-button" className={sign !== "signin" ? "disable" : ""} onClick={(e) => signinBtn(e)}>Sign In</button>
              <button type="button" id="signup-button" className={sign !== "signup" ? "disable" : ""} onClick={(e) => signupBtn(e)}>Sign Up</button>
            </div>
          </form>}
        </div>
      </div>
    </main>
  );
}
