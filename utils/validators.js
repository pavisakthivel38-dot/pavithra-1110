exports.validateRegister = (user) => {
  if (!user.name || !user.email || !user.password) return false;
  return true;
};

exports.validateLogin = (user) => {
  if (!user.email || !user.password) return false;
  return true;
};
