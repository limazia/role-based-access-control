const connection = require("../database/connection");

exports.newUser = async (user) => {
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
  } = user;

  const getUser = await connection("users").select("*").where({ id });
  const trx = await connection.transaction();
  
  if (getUser.length === 0) {
    await trx("users").insert({
      id,
      username,
      discriminator,
      avatar,
    });

    await trx("users_details").insert({
      user_id: id,
      public_flags,
      flags,
      banner,
      banner_color,
      accent_color,
      locale,
      mfa_enabled,
      premium_type,
    });

    await trx.commit();
  } else {
    await trx("users")
      .update({
        username,
        discriminator,
        avatar,
      })
      .where({ id });

    await trx("users_details")
      .update({
        public_flags,
        flags,
        banner,
        banner_color,
        accent_color,
        locale,
        mfa_enabled,
        premium_type,
      })
      .where({ user_id: id });

    await trx.commit();
  }
};
