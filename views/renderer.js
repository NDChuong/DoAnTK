var business = require('../controller/business');

function RenderIndexPage(resObject) {
    var rows = business.GetAllBookshelves();     
    for(var i = 0 ;i<rows.length;i++){
        //ten_user.push(business.GetUsernameByIDBookshelf(rows[i].id));
        rows[i].ten_user=business.GetUsernameByIDBookshelf(rows[i].id);
    }
    var vm={
        viewbook: rows        
    }   
    resObject.render('home/index', vm);   
    //resObject.send('OK');
}

function RenderBookinfoPage(resObject) {
    var Obj = business.GetBookInfo();
    for(var i = 0 ;i<Obj.length;i++){
        //ten_user.push(business.GetUsernameByIDBookshelf(rows[i].id));
        Obj[i].ten_user=business.GetUsernameByIDBook(Obj[i].id);
    }
    var vm = {
        book:Obj
    }
    resObject.render('bookshelf/bookinfo', vm);
    //resObject.send('OK');
}
function RenderBookshelfPage(reqObject, resObject) {
    var username = reqObject.param('id_user');
    var Bookshelf = business.GetBookshelf(username).bookList;
    var User = business.GetAccountInfo(username);
    console.log(username);
    console.log(Bookshelf);
    console.log(User);
    var vm={
        user: User,
        bookshelf: Bookshelf
    }
    resObject.render('bookshelf/bookshelf', vm);
    //resObject.send('OK');
}
function RenderHistoryPage(resObject) {
    resObject.send('OK');
}
function RenderProfilePage(resObject) {
    resObject.send('OK');
}
function RenderSearchResultPage(resObject) {
    resObject.send('OK');
}

var exportObj = {
    RenderIndexPage: RenderIndexPage,
    RenderBookinfoPage: RenderBookinfoPage,
    RenderBookshelfPage: RenderBookshelfPage,
    RenderHistoryPage: RenderHistoryPage,
    RenderProfilePage: RenderProfilePage,
    RenderSearchResultPage: RenderSearchResultPage
}
module.exports = exportObj;