import { APIEvent } from "solid-start";
import { json, redirect } from "solid-start/server";
import axios from "axios";
import { getUserSession } from "~/routes/sesion.server";

export async function GET({ request }: APIEvent) {
  const session = await getUserSession(request);
  const accessToken = session.get("token");
  const items = await axios
    .get("https://api.box.com/2.0/folders/0/items", {
      headers: {
        authorization: `Bearer ${accessToken}`,
        contentType: "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      throw redirect("/login");
    });

  return json({ items: items.entries });
}
