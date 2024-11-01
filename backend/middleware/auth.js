const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization; //We are going to access the authorization header in the request that is coming from the client
  if (!token) return res.status(401).json({ error: "Unauthorized" }); //If no token is found, then we are going to let the client know they cannot access the route

  //Using the jsonwebtoken library, we are going to verify that the token being provided comes from our server.
  //The process.env.JWT_SECRET comes from our .env file
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" }); //If there was an error validating the token, send an error back to the client. 99% of the time, this is because the token provided is not from our server
    req.user = user; //Attach a new property to the request object, and add the parsed user details to the property's value
    next(); //Move to the next middleware OR the routes actual functionality
  });
};

module.exports = {
  authenticateToken,
};
