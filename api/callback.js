function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(title, message, script) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>${escapeHtml(title)}</title></head>
<body>
  <h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p>
  <script>${script}</script>
</body>
</html>`;
}

// Tell Decap CMS why authentication failed instead of leaving the popup silent.
function notifyError(message) {
  const payload = JSON.stringify({ message });
  const script = `
(function () {
  var sent = false;
  var attempts = 0;
  function post(data) {
    if (window.opener) window.opener.postMessage(data, '*');
  }
  function finish() {
    if (sent) return;
    sent = true;
    clearInterval(timer);
    post('authorization:github:error:' + ${JSON.stringify(payload)});
    setTimeout(function () { window.close(); }, 400);
  }
  function onMessage(e) {
    if (e.data === 'authorizing:github') {
      window.removeEventListener('message', onMessage, false);
      finish();
    }
  }
  window.addEventListener('message', onMessage, false);
  var timer = setInterval(function () {
    post('authorizing:github');
    if (++attempts >= 8) finish();
  }, 250);
  post('authorizing:github');
})();
  `;
  return script;
}

export default async function handler(request, response) {
  const { query } = request;
  const code = query.code;
  const error = query.error;

  if (error) {
    response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page("Authentication Error", String(error), notifyError(String(error))));
    return;
  }

  if (!code) {
    response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
    response.end(
      page("Error", "No authorization code provided.", notifyError("No authorization code provided."))
    );
    return;
  }

  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    const detail = "OAuth credentials not configured. Please set OAUTH_GITHUB_CLIENT_ID and OAUTH_GITHUB_CLIENT_SECRET in Vercel environment variables.";
    response.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page("Configuration Error", detail, notifyError(detail)));
    return;
  }

  try {
    const baseUrl = process.env.COMPLETE_URL || new URL(request.url).origin;
    const redirectUri = `${baseUrl}/api/callback`;

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.error || !tokenData.access_token) {
      const detail = tokenData.error_description || tokenData.error || "GitHub did not return an access token.";
      response.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
      response.end(page("Token Exchange Error", detail, notifyError(detail)));
      return;
    }

    const payload = JSON.stringify({
      token: tokenData.access_token,
      provider: "github",
    });
    const msg = "authorization:github:success:" + payload;

    // Decap CMS first expects a "authorizing:github" handshake from this popup,
    // then a "authorization:github:success:<json>" message. Repeat the handshake
    // briefly in case the opener misses the first one, then send the token once.
    const html = page(
      "Authorization Complete",
      "You can close this window.",
      `
(function () {
  var sent = false;
  var attempts = 0;
  function post(data) {
    if (window.opener) window.opener.postMessage(data, '*');
  }
  function finish() {
    if (sent) return;
    sent = true;
    clearInterval(timer);
    post(${JSON.stringify(msg)});
    setTimeout(function () { window.close(); }, 500);
  }
  function onMessage(e) {
    if (e.data === 'authorizing:github') {
      window.removeEventListener('message', onMessage, false);
      finish();
    }
  }
  window.addEventListener('message', onMessage, false);
  var timer = setInterval(function () {
    post('authorizing:github');
    if (++attempts >= 8) finish();
  }, 250);
  post('authorizing:github');
})();
      `
    );

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(html);
  } catch (err) {
    const detail = err.message || "Server error";
    response.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
    response.end(page("Server Error", detail, notifyError(detail)));
  }
}
