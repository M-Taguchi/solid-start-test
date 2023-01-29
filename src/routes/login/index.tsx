import { Title } from "solid-start";
import axios from "axios";

export default function Login() {
  return (
    <main>
      <Title>Login</Title>
      <h1>Hello world!</h1>
      <button
        onClick={() => {
          axios.get("http://localhost:3000/api/auth/login").then((res) => {
            window.location.href = res.headers["location"] || "/";
          });
        }}
      >
        login
      </button>
    </main>
  );
}
