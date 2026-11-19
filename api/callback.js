export default async function handler(request, response) {
  const { query } = request;
  const code = query.code;
  const error = query.error;

  if (error) {
    response.writeHead(400, { "Content-Type": "text/html" });
    response.end(`<h1>Authentication Error</h1><p>${error}</p>`);
    return;
  }

  if (!code) {
    response.writeHead(400, { "Content-Type": "text/html" });
    response.end("<h1>Error</h1><p>No authorization code provided.</p>");
    return;
  }

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    response.writeHead(500, { "Content-Type": "text/html" });
    response.end(`<h1>Configuration Error</h1><p>OAuth credentials not configured. Please set OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel environment variables.</p>`);
    return;
  }

  try {
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      response.writeHead(400, { "Content-Type": "text/html" });
      response.end(
        `<h1>Token Exchange Error</h1><p>${tokenData.error_description || tokenData.error}</p>`
      );
      return;
    }

    const payload = JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
    });
    const msg = JSON.stringify("authorization:github:success:" + payload);

    const html = `
<!DOCTYPE html>
<html>
<body>
<script>
  function sendMsg(msg) {
    var done = false;
    window.addEventListener("message", function (e) {
      if (!done && typeof e.data === "string" && e.data.indexOf("authorizing:github") === 0) {
        done = true;
        window.opener.postMessage(msg, e.origin || "*");
        setTimeout(function () { window.close(); }, 300);
      }
    });
    if (window.opener) window.opener.postMessage("authorizing:github", "*");
    setTimeout(function () {
      if (!done && window.opener) {
        done = true;
        window.opener.postMessage(msg, "*");
        setTimeout(function () { window.close(); }, 300);
      }
    }, 1000);
  }
  sendMsg(${JSON.stringify(msg)});
</script>
</body>
</html>
    `;

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(html);
  } catch (err) {
    response.writeHead(500, { "Content-Type": "text/html" });
    response.end(`<h1>Server Error</h1><p>${err.message}</p>`);
  }
}
