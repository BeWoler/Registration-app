import { React, useState } from "react";
import { Form, Button } from "bootstrap-4-react";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import "../styles/loginForm.css";

export default function LoginForm() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState(" ");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      email: email,
      password: password,
      name: fName,
    }).then((response) => {
      if(response.data.message) {
        setLoginStatus(response.data.message);
        setTimeout( () => setLoginStatus(""), 3000);
      }
    });
  };

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      email: email,
      password: password,
    }).then((response) => {
      if(!response.data.auth) {
        setLoginStatus(false);
      }
      else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
        history.go(0)
      }
    });
  }

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/login").then((response) => {
  //     if(response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].email)
  //     }
  //   })
  // }, [])

  return (
    <Form>
      <div className="errorLogin">{loginStatus}</div>
      <Form.Group>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Form.Input
          type="email"
          id="email"
          placeholder="Enter email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputPassword1">Your name</label>
        <Form.Input
          type="text"
          id="fName"
          placeholder="Your name"
          onChange={(e) => {
            setFName(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputPassword1">Password</label>
        <Form.Input
          type="password"
          id="password"
          placeholder="Password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <div className="btn__sign">
        <Button
          id="btnSignIn"
          primary
          type="submit"
          onClick={login}
        >
          Sign in
        </Button>
        <Button id="btnSignUp" primary type="submit" onClick={register}>
          Sign up
        </Button>
      </div>
    </Form>
  );
}