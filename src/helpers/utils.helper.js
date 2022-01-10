exports.console = (value) => {
  if (process.env.APP_DEBUG) {
    return console.log(value);
  }
};

exports.makeConfig = (authorizationToken) => {
  data = {
    headers: {
      authorization: `Bearer ${authorizationToken}`,
    },
  };
  
  return data;
};
