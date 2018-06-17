var express = require('express');
var router = express.Router();
var lib = require('./lib');
const async = require('async');
const user = require('../model/User');
const report = require('../model/BaoCao');
const bookshelf = require('../model/TuSach');


/* GET users listing. */

// ================== DEBUGGING business.js ===================

router.get('/', function (req, res, next) {
    console.log('connected');
    // bookshelf.LayRaToanBoSach();

    var a = GetBorrowingHistory("0000000");
    console.log(a);

    res.send('OK');
});

// ================== DEBUGGING business.js ===================



// ========================== Account

// Check the existing of User <username>
function userIsExisting(username) {
    return (lib.UserJSON2Obj(user.LayRaMotUser(username)) != null) ? true : false;
}

// User registers a new account
// return 1 for success, 0 for failure
function RegisterAccount(username, pass, email, phone, name, birthday, sex, avatarLink) {
    user.ThemUser(username, name, birthday, sex, phone, email, pass, avatarLink);
    return userIsExisting(username);
}

// User logins to website
// return 1 for success, 0 for failure
function Login(username, pass) {
    var x = GetAccountInfo(username);
    if (x != null) {
        if (x.password == pass) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// User log out
// return 1 for success, 0 for failure
// function Logout(resObject) {
//     return lib.RemoveCookie(resObject, 'id');
// }


// User change birthday
// return 1 for success, 0 for failure
function ChangeBirthday(username, newBirthDay) {
    if (userIsExisting(username)) {
        var x = lib.UserJSON2Obj(user.LayRaMotUser(username));
        try {
            user.CapNhatThongTinUser(username, x.ten_user, newBirthDay, x.gioi_tinh, x.so_dien_thoai, x.email, x.pass);
            return true;
        } catch (ee) {
            return false;
        }
    }
    return false;
}

// Get full information of a account
// return a User object
function GetAccountInfo(username) {
    try {

        return lib.UserJSON2Obj(user.LayRaMotUser(username));
    } catch (e) {
        return null;
    }
}

// User change phone number
// return 1 for success, 0 for failure
function ChangePhone(username, newPhoneNum) {
    if (userIsExisting(username)) {
        var x = lib.UserJSON2Obj(user.LayRaMotUser(username));
        try {
            user.CapNhatThongTinUser(username, x.ten_user, x.ngay_sinh, x.gioi_tinh, newPhoneNum, x.email, x.pass);
            return true;
        } catch (ee) {
            return false;
        }
    }
    return false;
}


// Get all account in the system
function GetAllAccount(cb) {
    try {
        var result = [];
        var users = JSON.parse(user.LayHetDuLieuRa()).elements[0].elements;

        for (var x of users) {
            result.push(x.attributes);
        }

        cb();

        return result;
    } catch (ee) {
        console.log(ee);
        cb();
        return null;
    }
}

function SearchForUser(keyword, callback) {
    try {
        var result = [];
        var userList;
        async.series([
            function (cb) {
                userList = GetAllAccount(cb);
            },

            function (cb) {
                if (userList.length > 0) {
                    for (var x of userList) {
                        var str = x.ten_user.toLowerCase();
                        if (str.indexOf(keyword.toLowerCase()) != -1) {
                            result.push(x);
                        }
                    }
                }
                cb();
            }
        ]);

    } catch (ee) {
        console.log(ee);
        return null;
    }

    if (result.length > 0) {
        callback();
        return result;
    }
    else {
        callback();
        return null;
    }
}

// ========================== Bookshelf

// Get a bookshelf
// return a bookshelf object
function GetBookshelf(username) {
    return lib.BookshelfJSON2Obj(bookshelf.LayRaMotTuSach(username));
}

// Get all bookshelves
// return array of Bookshelf object
function GetAllBookshelves() {
    try {
        var result = [];
        var bookshelves = JSON.parse(bookshelf.LayHetDuLieuRa());
        bookshelves = bookshelves.elements[0].elements;

        for (var x of bookshelves) {
            result.push(GetBookshelf(x.attributes.id_chu));
        }

        return result;
    } catch (ee) {
        console.log(ee);
        return null;
    }
}

// Get list of top n bookshelves
// int criterion:
//  1: ratings
//  2: views
// return array of bookshelf objects
function GetTopBookshelves(n, criterion) {
    try {
        var arr = GetAllBookshelves();
        switch (criterion) {
            case 1:
                arr.sort(function (a, b) {
                    return b.ratings - a.ratings;
                });
                break;
        }
        return arr.slice(0, n);
    } catch (ee) {
        return null;
    }
}

// Search for bookshelf
// return array of bookshelves found
function SearchForBookshelf(keyword, callback) {
    var bookshelfList = GetAllBookshelves();
    var result = [];

    for (x of bookshelfList) {
        var str = x.id.toLowerCase();
        if (str.indexOf(keyword.toLowerCase()) != -1) {
            result.push(x);
        }
    }

    return result;
}


// ========================== Book

// Get information of a book
// return Book object
function GetBookInfo(bookID) {
    var result = lib.BookJSON2Obj(bookshelf.LayRaMotCuonSach(bookID));
    return result;
}

// Get all books
// return array of Book object
function GetAllBook(callback) {
    try {
        var books = JSON.parse(bookshelf.LayRaToanBoSach()).elements[0].elements;

        var result = [];
        for (var x of books) {
            result.push(x.attributes);
        }
        callback();
        return result;
    } catch (ee) {
        console.log(ee);
        return null;
    }
}

// Get list of top n books
// int criterion:
//  1: ratings
// return JSON
function GetTopBooks(n, criterion) {

}

// Get information of all books 
// between the startIndex book and 
// endIndex book from a bookshelf
// return JSON
function GetNBookInfo(bookshelfID, startIndex, endIndex) {

}


// Search for an item
// return JSON
function SearchForBook(keyword, callback) {
    try {
        var result = [];
        var bookList;
        async.series([
            function (cb) {
                bookList = GetAllBook(cb);
            },

            function (cb) {
                if (bookList.length > 0) {
                    for (var x of bookList) {
                        var str = x.ten_sach.toLowerCase();
                        if (str.indexOf(keyword.toLowerCase()) != -1) {
                            x.ten_user = GetAccountInfo(x.id_chu).ten_user;
                            result.push(x);
                        }
                    }
                }
                cb();
            }
        ]);

    } catch (ee) {
        console.log(ee);
        return null;
    }

    if (result.length > 0) {
        callback();
        return result;
    }
    else {
        callback();
        return null;
    }
}

function AddBook(username, bookID, name, author, ISBN, publisher, status, quantity, link) {
    try {
        bookshelf.ThemSachVaoTu(username, bookID, name, author, ISBN, publisher, status, quantity, link);
        return true;
    }
    catch (ee) {
        return false;
    }
}


// ========================== Request and History

// Borrow a book
// username1 borrows book from username2
// return bool
function BorrowBook(username1, username2, bookID, borrowDate, returnDate) {
    // user1 muon sach tu user1:
    try {

        var id1 = GetAccountInfo(username1).id_user;
        var id2 = GetAccountInfo(username2).id_user;

        // Them YeuCauMuon vao User1
        bookshelf.ThemYeuCauMuonSach(id2, id1, bookID, borrowDate, returnDate);
        // Them YeuCauChoMuon vao User2
        bookshelf.ThemYeuCauChoMuonSach(id2, id1, bookID, borrowDate, returnDate);
    } catch (ee) {
        console.log(ee);
        return null;
    }
}


//User accept a borrowing request
function AcceptRequest(requestID) {
    try {
        var bRequest = GetBorrowingRequest(requestID);
        var lRequest = GetLentingRequest(requestID);

        // Them vao lich su
        bookshelf.ThemSachVaoLichSuMuon(lRequest.id_user_muon, bRequest.id_user_cho_muon, bRequest.id_sach, bRequest.ngay_muon, bRequest.ngay_tra);
        bookshelf.ThemSachVaoLichSuChoMuon(bRequest.id_user_cho_muon, lRequest.id_user_muon, bRequest.id_sach, bRequest.ngay_muon, bRequest.ngay_tra);

        // Xoa yeu cau
        bookshelf.XoaYeuCau(requestID);
        return true;
    } catch (ee) {
        console.log(ee)
        return false;
    }
}

// User reject a request
function RejectRequest(requestID) {
    try {
        // Xoa yeu cau
        bookshelf.XoaYeuCau(requestID);
        return true;
    } catch (ee) {
        console.log(ee)
        return false;
    }
}

// return borrowing request obj
function GetBorrowingRequest(id) {
    try {
        return JSON.parse(bookshelf.LayRaMotYeuCauMuonSach(id)).elements[0].attributes;
    } catch (ee) {
        return null;
    }
}

// return lenting request obj
function GetLentingRequest(id) {
    try {
        return JSON.parse(bookshelf.LayRaMotYeuCauChoMuonSach(id)).elements[0].attributes;
    } catch (ee) {
        return null;
    }
}

// Get history array
function GetBorrowingHistory(username) {
    try {
        var r = GetBookshelf(username).borrowingHistory;
        if (r === undefined) {
            return null;
        } else {
            return r;
        }
        return "";
    } catch (ee) {
        return null;
    }
}

function GetLentingHistory(username) {
    try {
        var r = GetBookshelf(username).lentingHistory;
        if (r === undefined) {
            return null;
        } else {
            return r;
        }
        return "";
    } catch (ee) {
        return null;
    }
}

function GetBorrowingRequest(username) {
    try {
        var r = GetBookshelf(username).borrowingRequests;
        if (r === undefined) {
            return null;
        } else {
            return r;
        }
        return "";
    } catch (ee) {
        return null;
    }
}

function GetLentingRequest(username) {
    try {
        var r = GetBookshelf(username).lentingRequests;
        if (r === undefined) {
            return null;
        } else {
            return r;
        }
        return "";
    } catch (ee) {
        return null;
    }
}


var exportObj = {
    userIsExisting: userIsExisting,
    RegisterAccount: RegisterAccount,
    Login: Login,
    ChangeBirthday: ChangeBirthday,
    GetAccountInfo: GetAccountInfo,
    ChangePhone: ChangePhone,
    SearchForUser: SearchForUser,
    GetBookshelf: GetBookshelf,
    GetAllBookshelves: GetAllBookshelves,
    GetTopBookshelves: GetTopBookshelves,
    SearchForBookshelf: SearchForBookshelf,
    AddBook: AddBook,
    GetBookInfo: GetBookInfo,
    GetAllBook: GetAllBook,
    GetTopBooks: GetTopBooks,
    GetNBookInfo: GetNBookInfo,
    SearchForBook: SearchForBook,
    BorrowBook: BorrowBook,
    AcceptRequest: AcceptRequest,
    RejectRequest: RejectRequest,
    GetBorrowingRequest: GetBorrowingRequest,
    GetLentingRequest: GetLentingRequest,
    GetBorrowingHistory: GetBorrowingHistory,
    GetLentingHistory: GetLentingHistory,
    GetBorrowingRequest: GetBorrowingRequest,
    GetLentingRequest: GetLentingRequest
}


// ================== DEBUGGING business.js ===================
// module.exports = router;
// ================== DEBUGGING business.js ===================
module.exports = exportObj;
