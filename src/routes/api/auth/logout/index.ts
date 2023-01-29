import { APIEvent } from "solid-start";
import { logout } from "~/routes/sesion.server";

export async function POST({ request }: APIEvent) {
  return await logout(request);
}
