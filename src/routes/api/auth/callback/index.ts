import { APIEvent } from "solid-start";
import axios from "axios";
import { createUserSession } from "~/routes/sesion.server";

export async function GET({ request }: APIEvent) {
  const query = new URL(request.url).searchParams;
  const accessToken = await axios
    .post("https://api.box.com/oauth2/token", {
      client_id: import.meta.env.VITE_BOX_ID,
      client_secret: import.meta.env.VITE_BOX_SECRET,
      code: query.get("code"),
      grant_type: "authorization_code",
    })
    .then((res) => {
      return res.data.access_token;
    });

  const user = await axios
    .get("https://api.box.com/2.0/users/me", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        contentType: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    });

  return createUserSession(accessToken, user.name, "http://localhost:3000/");
}
