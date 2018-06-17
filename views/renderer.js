var business = require('../controller/business');
const async = require('async');

// bool loginStatus: To determine the user has logged in or not
function RenderIndexPage(reqObject, resObject, loginStatus) {
    var rows = business.GetTopBookshelves(4, 1);
    for (var i = 0; i < rows.length; i++) {
        //
        // rows[i].ten_user = business.GetUsernameByIDBookshelf(rows[i].id);
        rows[i].ten_user = business.GetAccountInfo(rows[i].id).ten_user;
        rows[i].avatar_user = business.GetAccountInfo(rows[i].id).avatar;
    }


    var vm = {
        viewbook: rows,
        isLogged: loginStatus,
    }

    // Render view khi da login
    if (loginStatus) {
        vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
        vm.id_user = reqObject.session.userid;
    }

    
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
        isAvailable: status,
        isLogged: loginStatus
    }

    // Render view khi da login
    if (loginStatus) {
        vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
        vm.id_user = reqObject.session.userid;
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
        user: User,
        isLogged: loginStatus
    }

    // Render view khi da login
    if (loginStatus) {
        vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
        vm.id_user = reqObject.session.userid;
    }

    resObject.render('bookshelf/bookshelf', vm);
    //resObject.send('OK');
}
function RenderHistoryPage(reqObject, resObject, loginStatus) {
    var userid = reqObject.param('id_user');
    console.log(userid);
    var _borrow_request = business.GetBorrowingRequest(userid);
    var _lend_request = business.GetLentingRequest(userid);
    var _history_borrow_request = business.GetBorrowingHistory(userid);
    var _history_lend_request = business.GetLentingHistory(userid);

    console.log(_borrow_request,"=================", _lend_request,"=========================", _history_borrow_request,"=================", _history_lend_request);

    for(var i=0;i<_borrow_request.length;i++){
        _borrow_request[i].ten_user=business.GetAccountInfo(_borrow_request[i].id_user_cho_muon).ten_user;
        _borrow_request[i].ten_sach=business.GetBookInfo(_borrow_request[i].id_sach).ten_sach;
    }
    for(var i = 0;i<_lend_request.length;i++){
        _lend_request[i].ten_sach = business.GetBookInfo(_lend_request[i].id_sach).ten_sach;
        _lend_request[i].ten_user = business.GetAccountInfo(_lend_request[i].id_user_muon).ten_user;
    }
    for(var i=0;i<_history_borrow_request.length;i++){
        _history_borrow_request[i].ten_sach = business.GetBookInfo(_history_borrow_request[i].id_sach).ten_sach;
        _history_borrow_request[i].ten_user = business.GetAccountInfo(_history_borrow_request[i].id_user_cho_muon).ten_user;
    }
    
    var vm = {
        borrow_request:_borrow_request,
        list_borrow_request: _history_borrow_request,
        lend_request: _lend_request,
        list_lend_request: _history_lend_request
        
    };
    // Render view khi da login
    if (loginStatus) {
        vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
        vm.id_user = reqObject.session.userid;
        vm.isLogged = loginStatus;
    }

    resObject.render('history/history', vm);
}

function RenderSearchResultPage(reqObject, resObject, loginStatus) {
    var search_str = reqObject.param('search');
    var result_book;
    var result_user;
    async.series([
        function (callback) {
            result_book = business.SearchForBook(search_str, callback);
        },

        function (callback) {
            result_user = business.SearchForUser(search_str, callback);
        },

        function (callback) {
            var vm = {
                search_book: result_book,
                search_user: result_user,
                // search_user: result_user,
                isLogged: loginStatus,
                nBookResult: result_book != null ? result_book.length : 0,
                nUserResult: result_user != null ? result_user.length : 0
            }

            // Render view khi da login
            if (loginStatus) {
                vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
                vm.id_user = reqObject.session.userid;
            }

            resObject.render('search/search-result', vm);
            callback();
        }
    ]);
    // var result_user = business.SearchForUser(search_str);

}


function RenderAccountSettingsPage(reqObject, resObject, loginStatus) {
    if (loginStatus === true) {
        var username = reqObject.param('id_user');
        var account_info = business.GetAccountInfo(username);
        if(account_info.gioi_tinh === "Nam"){
            var gender = true;
        }
        else{
            var gender = false;
        }
        var vm = {
            user: account_info,
            isLogged: loginStatus,
            _gioi_tinh: gender
        }

        // Render view khi da login
        if (loginStatus) {
            vm.username = business.GetAccountInfo(reqObject.session.userid).ten_user;
            vm.id_user = reqObject.session.userid;
        }
        resObject.render('account/profile', vm);
    } else {
        resObject.redirect('/');
        console.log('Chua login');
    }
}

var exportObj = {
    RenderIndexPage: RenderIndexPage,
    RenderBookinfoPage: RenderBookinfoPage,
    RenderBookshelfPage: RenderBookshelfPage,
    RenderHistoryPage: RenderHistoryPage,
    RenderSearchResultPage: RenderSearchResultPage,
    RenderAccountSettingsPage: RenderAccountSettingsPage
}
module.exports = exportObj;