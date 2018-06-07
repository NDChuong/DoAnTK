var business = require('../controller/business');

function RenderIndexPage(resObject) {
    var rows = business.GetAllBookshelves();
    for (var i = 0; i < rows.length; i++) {
        //
        rows[i].ten_user = business.GetUsernameByIDBookshelf(rows[i].id);
    }
    var vm = {
        viewbook: rows
    }
    resObject.render('home/index', vm);
    //resObject.send('OK');
}

function RenderBookinfoPage(reqObject, resObject) {
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
function RenderBookshelfPage(reqObject, resObject) {
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
function RenderHistoryPage(reqobject, resObject) {

    resObject.render('history/history');
}
function RenderProfilePage(reqObject, resObject) {
    resObject.render('account/profile');
}
function RenderSearchResultPage(reqObject, resObject) {
    var search_str = reqObject.param('search');
    var result_book = business.SearchForBook(search_str);
    var result_user = business.SearchForUser(search_str);
    var vm = {
        search_book: result_book,
        search_user: result_user
    }
    resObject.render('search/search-result', vm);
}

function RenderAccountSettingsPage(reqObject, resObject) {
    resObject.send('OK');
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