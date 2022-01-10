const url = require("url");
const { newUser } = require("../../helpers/user.helper");

const discord = require("../../services/discord");

let accessToken = "";
let refreshToken = "";

class AuthController {
  async userAuthorize(request, response, next) {
    try {
      const { code } = request.query;

      if (code) {
        try {
          const config = new url.URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: code.toString(),
            redirect_uri: `${process.env.APP_URL}:${process.env.APP_PORT}/authorize`,
          });

          const { data } = await discord.post("/oauth2/token", config.toString(), {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const { access_token, refresh_token } = data;

          accessToken = access_token;
          refreshToken = refresh_token;

          const { data: userResponse } = await discord.get("/users/@me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const {
            id,
            username,
            avatar,
            discriminator,
            public_flags,
            flags,
            banner,
            banner_color,
            accent_color,
            locale,
            mfa_enabled,
            premium_type,
          } = userResponse;

          const user = {
            id,
            username,
            avatar,
            discriminator,
            public_flags,
            flags,
            banner,
            banner_color,
            accent_color,
            locale,
            mfa_enabled,
            premium_type,
          };

          newUser(user);

          request.session.user = userResponse;

          return response.redirect("/");
        } catch (err) {
          console.log(err);
          return response.sendStatus(400);
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async getUser(request, response, next) {
    try {
      const { data } = await discord.get("/users/@me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { id, username, discriminator, avatar } = data;
      const user = {
        id,
        username,
        discriminator,
        avatar,
      };

      newUser(user);

      return response.json(data);
    } catch (error) {
      next(error);
    }
  }

  async revokeUser(request, response, next) {
    try {
      const config = new url.URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        token: accessToken,
      });

      await discord.post("/oauth2/token/revoke", config.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      request.session.user = null;

      return response.redirect("/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();