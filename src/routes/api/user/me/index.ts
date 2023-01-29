import { APIEvent, json } from "solid-start";
import { getUserSession } from "~/routes/sesion.server";

export async function GET({ request }: APIEvent) {
  const session = await getUserSession(request);
  let userName = await session.get("userName");
  userName = userName ? decodeURIComponent(userName) : null;

  return json({ userName });
}
