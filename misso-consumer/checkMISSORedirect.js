const url = require('url');
const axios = require('axios');
const { URL } = url;
const { verifyJwtToken } = require('./jwt_verify');
const validReferOrigin = 'http://localhost:3001';
const ssoServerJWTURL = 'http://localhost:3001/misso/verifytoken';

// TODO: Check functions in this file.

const missoRedirect = () => {
  return async function (req, res, next) {
    // check if the req has the queryParameter as missoToken
    // and who is the referer.
    const { missoToken } = req.query;
    if (missoToken != null) {
      // to remove the missoToken in query parameter redirect.
      const redirectURL = url.urlWithQueryString(req.url).pathname;
      try {
        const response = await axios.get(
          `${missoServerJWTURL}?missoToken=${missoToken}`,
          {
            headers: {
              Authorization: 'Bearer l1Q7zkOL59cRqWBkQ12ZiGVW2DBL',
            },
          }
        );
        const { token } = response.data;
        const decoded = await verifyJwtToken(token);
        // now that we have the decoded jwt, use the,
        // global-session-id as the session id so that
        // the logout can be implemented with the global session.
        req.session.user = decoded;
      } catch (err) {
        return next(err);
      }

      return res.redirect(`${redirectURL}`);
    }

    return next();
  };
};

module.exports = missoRedirect;
