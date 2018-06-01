var express = require('express');
var router = express.Router();
var lib = require('./lib');

const user = require('../model/User');
const report = require('../model/BaoCao');
const bookshelf = require('../model/TuSach');


/* GET users listing. */

// router.get('/', function (req, res, next) {
//     // bookshelf.LayRaToanBoSach();
//     for (var i = 0; i < 5; i++) {
//         report.ThemBaoCao('1512095', '1512043', 'Thích');
//         report.XoaBaoCao((i+1).toString());
//     }
//     report.GhiDuLieu();
//     res.send('OK');
// });


// Check the existing of User <username>
function userIsExisting(username) {
    return (lib.UserJSON2Obj(user.LayRaMotUser(username)) != null) ? true : false;
}

// User registers a new account
// return 1 for success, 0 for failure
function RegisterAccount(username, pass, email, phone, name, birthday, sex) {
    user.ThemUser(username, name, birthday, sex, phone, email, pass);
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
    return lib.UserJSON2Obj(user.LayRaMotUser(username));
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

// Get information of a book
// return JSON
function GetBookInfo(bookID) {
    return lib.BookJSON2Obj(bookshelf.LayRaMotCuonSach(bookID));
}

// Get all books
// return array of Book object
function GetAllBook() {
    
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

// Sort list of books by views/ratings
// int by: 
// 1 : views
// 2: ratings
// return JSON
function SortBookBy(bookList, by) {

}



// Search for an item
// return JSON
function SearchForBook(keyword) {
    var bookList = GetAllBook();
    var result = [];

    for (x of bookList) {
        var str = x.id.toLowerCase();
        if (str.indexOf(keyword.toLowerCase()) != -1) {
            result.push(x);
        }
    }

    return result;
}

// Search for bookshelf
// return array of bookshelves found
function SearchForBookshelf(keyword) {
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

// Borrow a book
// return bool
function BorrowBook(username1, username2, bookID, bookshelfID) {

}

var exportObj = {
    userIsExisting: userIsExisting,
    RegisterAccount: RegisterAccount,
    Login: Login,
    ChangeBirthday: ChangeBirthday,
    GetAccountInfo: GetAccountInfo,
    ChangePhone: ChangePhone,
    GetBookshelf: GetBookshelf,
    GetAllBookshelves: GetAllBookshelves,
    GetTopBookshelves: GetTopBookshelves,
    GetBookInfo: GetBookInfo,
    GetAllBook: GetAllBook,
    GetTopBooks: GetTopBooks,
    GetNBookInfo: GetNBookInfo,
    SortBookBy: SortBookBy,
    SearchForBook: SearchForBook,
    SearchForBookshelf: SearchForBookshelf,
    BorrowBook: BorrowBook
}

// Create a borrowing request
// ============ DEBUG ===============
// module.exports = router;
module.exports = exportObj;