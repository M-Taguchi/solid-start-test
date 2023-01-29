import { Title, useNavigate, useRouteData } from "solid-start";
import axios from "axios";
import { createServerData$, redirect } from "solid-start/server";

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = (
      await axios.get("http://localhost:3000/api/user/me", {
        headers: { Cookie: request.headers.get("Cookie") },
      })
    ).data;

    if (!user.userName) throw redirect("/login");

    const items = (
      await axios.get("http://localhost:3000/api/file", {
        headers: { Cookie: request.headers.get("Cookie") },
      })
    ).data;

    return { userName: user.userName, items: items.items };
  });
}

export default function Home() {
  const serverData = useRouteData<typeof routeData>();
  const navigate = useNavigate();

  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <p>Hello, {serverData()?.userName}!</p>
      <ul>
        {serverData()?.items.map((item: any) => (
          <li>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          axios.post("http://localhost:3000/api/auth/logout").finally(() => {
            navigate("/login");
          });
        }}
      >
        logout
      </button>
    </main>
  );
}
