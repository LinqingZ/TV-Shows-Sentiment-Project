//This function will be middleware for helping validate request's body
function validateBody(schema){ //The schema is a Zod schema which is used for validation.
  //Return a function that runs the actual middleware
    return function(req, res, next){ //This is going to return middleware to the server to be used on individual routes
        const parsed = schema.safeParse(req.body); //The schema is going to try to parse the data that is coming from the client

        if(parsed.success){ //If it works out successfully
            next(); //Move to the next middleware OR the routes actual functionality
        } else {
          //If the parsing fails, that means the client didn't provide a field when the data was sent
            return res.status(400).json({
                success: false,
                message: parsed.error.message
            })
        }
    }

}

module.exports = validateBody;
