import React from "react";
import { Form, Button } from "bootstrap-4-react";
import "../styles/loginForm.css";

export default function RegistratrionForm() {
  return (
    <Form>
      <Form.Group>
        <label htmlFor="exampleInputEmail1">Email address</label>
        <Form.Input type="email" id="email" placeholder="Enter email" />
      </Form.Group>
      <Form.Group>
        <label htmlFor="exampleInputPassword1">Password</label>
        <Form.Input type="password" id="password" placeholder="Password" />
      </Form.Group>
      <div className="btn__sign">
        <Button
          id="btnSignIn"
          primary
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          Sign in
        </Button>
        <Button
          id="btnSignUp"
          primary
          type="submit"
          onClick={(e) => e.preventDefault()}
        >
          Sign up
        </Button>
      </div>
    </Form>
  );
}
