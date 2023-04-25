const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;


// const withAuth = (req, res, next) => {
//   if (!req.session.user_id) {
//       res.redirect('/login');
//   } else {
//       next();
//   }
// };

// module.exports = withAuth;