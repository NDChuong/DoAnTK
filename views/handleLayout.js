var business = require('../controller/business');

module.exports = (req, res, next)=>{
    if(req.session.isLogged === undefined){
        req.session.isLogged = false;
    }
    var info = business.GetAccountInfo(req.session.userid);
    res.local.layout = {
        isLogged: req.session.isLogged,
        username: req.session.userid
    }
}