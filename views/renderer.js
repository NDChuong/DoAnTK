
// bool loginStatus: To determine the user has logged in or not
function RenderIndexPage(reqObject, resObject, loginStatus) {
    resObject.render('index', { title: 'Express' });
}

function RenderBookinfoPage(reqObject, resObject, loginStatus) {
    resObject.send('OK');
}
function RenderBookshelfPage(reqObject, resObject, loginStatus) {
    resObject.send('OK');
}
function RenderHistoryPage(reqObject, resObject, loginStatus) {
    resObject.send('OK');
}
function RenderProfilePage(reqObject, resObject, loginStatus) {
    resObject.send('OK');
}
function RenderSearchResultPage(reqObject, resObject, loginStatus) {
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