const SpotifyWebApi = require("spotify-web-api-node");
const client_id = "7e1d3c1eb7a44aac85896d68d2a6af2a";
const client_secret = "9da92c83ca934d208d50d3c0f89743ff";
const redirect_uri = "http://localhost:4000/callback";
const scope = "  streaming  ";
const login = (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    redirectUri: redirect_uri,
  });

  const authUrl = spotifyApi.createAuthorizeURL(scope);
  res.redirect(authUrl);
};

const callback = async (req, res) => {
  const code = req.query.code || null;
  const spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri,
  });

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const accessToken = data.body.access_token;
    const refreshToken = data.body.refresh_token;
    const expiresIn = data.body.expires_in;

    // res.json({
    //   accessToken,
    //   refreshToken,
    //   expiresIn,
    // });
    console.log(
      `AccessToken:${accessToken},RefreshToken:${refreshToken},expireIn:${expiresIn}`
    );
    res.redirect(
      `http://localhost:5174/get-started/recommendations?accesstoken=${accessToken}&refreshtoken=${refreshToken}&expiresin=${expiresIn}&scope=${scope}`
    );
  } catch (error) {
    console.error("Error during callback:", error);
    res.sendStatus(400);
  }
};

module.exports = { login, callback };
