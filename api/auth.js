export default async function handler(request, response) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const baseUrl = process.env.COMPLETE_URL || new URL(request.url).origin;
  const redirectUri = `${baseUrl}/api/callback`;
  const scope = "repo";

  if (!clientId) {
    response.writeHead(500, { "Content-Type": "text/html" });
    response.end(`<h1>Configuration Error</h1><p>OAuth client ID not configured. Please set OAUTH_GITHUB_CLIENT_ID in Vercel environment variables.</p>`);
    return;
  }

  const authUrl =
    "https://github.com/login/oauth/authorize" +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}`;

  response.writeHead(302, { Location: authUrl });
  response.end();
}
