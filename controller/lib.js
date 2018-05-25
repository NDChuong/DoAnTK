var obj = {
    // Convert User JSON to User Object
    UserJSON2Obj: function (jsonText) {
        return jsonText == 'null' ? null : JSON.parse(jsonText).elements[0].attributes;
    },

    // Convert Bookshelf JSON to Bookshelf Object
    BookshelfJSON2Obj: function (jsonText) {
        if (jsonText == 'null') {
            return null;
        }

        var i;
        var books = JSON.parse(jsonText).elements[0].elements[0].elements;
        for (i = 0; i < books.length; i++) {
            books[i] = books[i].attributes;
        }

        var loaningRequests = JSON.parse(jsonText).elements[0].elements[1].elements;
        for (i = 0; i < loaningRequests.length; i++) {
            loaningRequests[i] = loaningRequests[i].attributes;
        }

        var borrowingRequests = JSON.parse(jsonText).elements[0].elements[2].elements;
        for (i = 0; i < borrowingRequests.length; i++) {
            borrowingRequests[i] = borrowingRequests[i].attributes;
        }

        var borrowingHistory = JSON.parse(jsonText).elements[0].elements[3].elements;
        for (i = 0; i < borrowingHistory.length; i++) {
            var obj1 = borrowingHistory[i].attributes;
            var obj2 = borrowingHistory[i].elements[0].attributes;
            for (var att in obj2) {
                obj1[att] = obj2[att];
            }

            borrowingHistory[i] = obj1;
        }

        var loaningHistory = JSON.parse(jsonText).elements[0].elements[4].elements;
        for (i = 0; i < loaningHistory.length; i++) {
            var obj1 = loaningHistory[i].attributes;
            var obj2 = loaningHistory[i].elements[0].attributes;
            for (var att in obj2) {
                obj1[att] = obj2[att];
            }

            loaningHistory[i] = obj1;
        }

        return {
            id: JSON.parse(jsonText).elements[0].attributes.id_chu,
            ratings: JSON.parse(jsonText).elements[0].attributes.diem_danh_gia,
            bookList: books,
            borrowingRequests: borrowingRequests,
            borrowingHistory: borrowingHistory,
            loaningRequests: loaningRequests,
            loaningHistory: loaningHistory
        }
    },

    // Convert Bookshelf JSON to Bookshelf Object
    BookJSON2Obj: function (jsonText) {
        return jsonText == 'null' ? null : JSON.parse(jsonText).elements[0].attributes;
    },

    // Get a specific cookie from cookie string
    GetCookie: function (reqObject, name) {
        var cookieString = reqObject.headers.cookie;
        if (cookieString === undefined || cookieString.indexOf(name) === -1) {
            return null;
        } else {
            value = '';
            var i = 0;
            var valueIsStarted = false;
            for (i = cookieString.indexOf(name); i < cookieString.length && cookieString[i] !== ';'; i++) {
                if (valueIsStarted) {
                    value += cookieString[i];
                }

                if (cookieString[i] === '=') {
                    valueIsStarted = true;
                }
            }

            return value;
        }
    },

    SetCookie: function (resObject, name, value, expires) {
        try {
            resObject.cookie(name, value, { expires: new Date(Date.now() + expires) });
            return true;
        } catch (ee) {
            return false;
        }
    },

    RemoveCookie: function (resObject, name) {
        try {
            resObject.cookie(name, { maxAge: Date.now() });
            return true;
        } catch (ee) {
            return false;
        }
    }
}

module.exports = obj;