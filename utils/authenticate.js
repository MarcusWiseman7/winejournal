// authentication middleware
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.session.error = 'Please sign in!';
  res.redirect('/');
};

module.exports = { ensureAuthenticated };
