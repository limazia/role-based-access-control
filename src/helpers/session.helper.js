const cookieParser = require("cookie-parser");

export async function serializeSession(request, user) {
  request.session.user = user;
  request.user = user;

  const session = sessionRepository.create({
    sessionId: request.sessionID,
    expiresAt: request.session.cookie.expires,
    data: JSON.stringify(user),
  });

  return sessionRepository.save(session);
}

export async function deserializeSession(request, response, next) {
  const { DISCORD_OAUTH2_SESSION_ID } = request.cookies;
  if (!DISCORD_OAUTH2_SESSION_ID) return next();

  const sessionId = cookieParser
    .signedCookie(DISCORD_OAUTH2_SESSION_ID, 'ASDSAJHDGASJDHASDABSDHJASGDAJHD')
    .toString();
  const sessionDB = await sessionRepository.findOne({
    sessionId: sessionId,
  });

  if (!sessionDB) {
    console.log('No Session');
    return next();
  }

  const currentTime = new Date();

  if (sessionDB.expiresAt < currentTime) {
    console.log('Session Expired');
    await sessionRepository.delete(sessionDB);
    console.log('Session Deleted');
  } else {
    console.log('Session Not Expired');
    const data = JSON.parse(sessionDB.data);
    request.user = data;
  }

  next();
}