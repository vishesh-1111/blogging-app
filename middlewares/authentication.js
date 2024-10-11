var jwt = require('jsonwebtoken');

function VerifyUser(req,res,next){
const token = req.cookies['token'];
if(!token){
   return next();
}
try {
  var payload = jwt.verify(token, 'secret');
} catch(err) {
  //throw new Error('TOKEN VERIFICATION FAILED');
  return next(err);

}
req.user=payload;
return next();
}

module.exports= {
    VerifyUser,
}