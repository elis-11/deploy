import { useRef } from "react";
import { useDataContext } from "../contexts/DataProvider";
import '../App.scss';

export const Login = () => {
  const { login } = useDataContext();

  const emailRef = useRef();
  const passwordRef = useRef();

  const onLogin = async (e) => {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <div className="login">
      <form onSubmit={onLogin}>
        <div>
          <label>Email</label>
          <input type="email" ref={emailRef} defaultValue="u2@u2.com" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordRef} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};
