module.exports = {
  PAGE_TITLE: process.env.APP_NAME,
  DISCORD_LOGIN_URL: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${process.env.APP_URL}:${process.env.APP_PORT}/authorize&response_type=code&scope=identify+guilds`,
};