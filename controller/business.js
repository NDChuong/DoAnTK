// User registers a new account
// return 1 for success, 0 for failure
function RegisterAccount(username, pass, email,phone, name, brithday, sex) {
    // User.ThemUser(username, name, birthday, sex, phone, email, pass);
}

// User logins to website
// return 1 for success, 0 for failure
function Login(username, pass) {

}

// User log out
// return 1 for success, 0 for failure
function Logout(username) {

}

// User change birthday
// return 1 for success, 0 for failure
function ChangeBrithday(newBrithDay) {

}

// User change phone number
// return 1 for success, 0 for failure

function ChangePhone(newPhoneNum) {
    
}

// Get list of top n books
// int criterion:
//  1: views
// return JSON
function GetTopBooks(n, criterion) {

}

// Get list of top n bookshelves
// int criterion:
//  1: views
//  2: ratings
// return JSON
function GetTopBookshelves(n, criterion) {

}

// Get full information of a account
// return JSON
function GetAccountInfo(username) {

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

// Get information of a book
// return JSON
function GetBookInfo(bookID) {

}

// Borrow a book
// return bool
function BorrowBook(username1, username2, bookID, bookshelfID) {

}

// Search for an item
// return JSON
function SearchForBook(keyword) {

}

// Search for bookshelf
function SearchForBookshelf(keyword) {

}