export async function GET() {
  const query = new URLSearchParams({
    client_id: import.meta.env.VITE_BOX_ID,
    client_secret: import.meta.env.VITE_BOX_SECRET,
    response_type: "code",
  });
  return new Response(null, {
    status: 200,
    headers: {
      Location: `https://account.box.com/api/oauth2/authorize?${query.toString()}`,
    },
  });
}
