const fetch = require('node-fetch');
const { URLSearchParams } = require('whatwg-url');

const config = {
  clientId: process.env.GITHUB_CLIENT_ID || 'c8f093640cc7de9f4d8f',
  redirectUri: process.env.GITHUB_REDIRECT_URI || 'http://localhost:5000/github_callback',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '4235f614c00b7600c53f4446d37e64b60a43a583',
};

module.exports = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    res.json({ data: 'Hello!', errors: null });
    return;
  }

  const { clientId, redirectUri, clientSecret } = config;

  const url = `https://github.com/login/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`;
  const response = await fetch(url, { method: 'POST' });
  const text = await response.text();

  const params = new URLSearchParams(text);
  const token = params.get('access_token');

  if (!token) {
    res.status(400);
    res.json({ data: null, errors: [`Invalid token`] });
    return;
  }

  // res.json({ data: { token }, errors: null });
  res.redirect(`https://alicanc-stargazer.herokuapp.com/login?token=${token}`);
  return;
};
