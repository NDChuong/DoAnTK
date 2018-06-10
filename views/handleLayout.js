var business = require('../controller/business');

module.exports = (req, res, next)=>{
    if(req.session.isLogged === undefined){
        req.session.isLogged = false;
    }
    if(req.session.isLogged === true){
        var info = business.GetAccountInfo(req.session.userid)
        res.locals.layout={
            isLogged:req.session.isLogged,
            username: req.session.userid
        };
        //next();
        
    } 
    next();   
    console.log(business.GetAccountInfo(req.session.userid));
}