
var business = require('../controller/business');

// bool loginStatus: To determine the user has logged in or not
function RenderIndexPage(reqObject, resObject, loginStatus) {
    var rows = business.GetTopBookshelves(4,1);
    for (var i = 0; i < rows.length; i++) {
        //
        // rows[i].ten_user = business.GetUsernameByIDBookshelf(rows[i].id);
        rows[i].ten_user = business.GetAccountInfo(rows[i].id).ten_user;
        rows[i].avatar_user = business.GetAccountInfo(rows[i].id).avatar;
    }
    var vm = {
        viewbook: rows
    }
    console.log(rows);
    resObject.render('home/index', vm);
    //resObject.send('OK');
}

function RenderBookinfoPage(reqObject, resObject, loginStatus) {
    var userid = reqObject.param('id_user');
    var bookid = reqObject.param('id_book');
    var Obj = business.GetBookInfo(bookid);
    var User = business.GetAccountInfo(userid);
    var status;
    if (Obj.tinh_trang === 'true')
        status = true;
    else
        status = false;
    console.log(Obj);
    for (var i = 0; i < Obj.length; i++) {
        //ten_user.push(business.GetUsernameByIDBookshelf(rows[i].id));
        Obj[i].ten_user = business.GetUsernameByIDBook(Obj[i].id);
    }
    var vm = {
        book: Obj,
        user: User,
        isAvailable: status
    }
    resObject.render('bookshelf/bookinfo', vm);
    //resObject.send('OK');
}
function RenderBookshelfPage(reqObject, resObject, loginStatus) {
    var userid = reqObject.param('id_user');
    var Bookshelf = business.GetBookshelf(userid).bookList;
    var User = business.GetAccountInfo(userid);
    for (var i = 0; i < Bookshelf.length; i++) {
        Bookshelf[i].id_user = userid;
    }
    var vm = {
        bookshelf: Bookshelf,
        user: User
    }
    resObject.render('bookshelf/bookshelf', vm);
    //resObject.send('OK');
}
function RenderHistoryPage(reqObject, resObject, loginStatus) {

    resObject.render('history/history');
}

function RenderProfilePage(reqObject, resObject) {
    
}
function RenderSearchResultPage(reqObject, resObject, loginStatus) {
    var search_str = reqObject.param('search');
    var result_book = business.SearchForBook(search_str);
    var result_user = business.SearchForUser(search_str);
    var vm = {
        search_book: result_book,
        search_user: result_user
    }
    resObject.render('search/search-result', vm);
}


function RenderAccountSettingsPage(reqObject, resObject, loginStatus) {
    if(loginStatus === true){
        var username = reqObject.param('username');
        var account_info = business.GetAccountInfo(username);
     console.log(account_info);
        var vm={
         user: account_info
        }
        resObject.render('account/profile',vm);
    }    
}

var exportObj = {
    RenderIndexPage: RenderIndexPage,
    RenderBookinfoPage: RenderBookinfoPage,
    RenderBookshelfPage: RenderBookshelfPage,
    RenderHistoryPage: RenderHistoryPage,
    RenderProfilePage: RenderProfilePage,
    RenderSearchResultPage: RenderSearchResultPage,
    RenderAccountSettingsPage: RenderAccountSettingsPage
}
module.exports = exportObj;