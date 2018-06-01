function RenderIndexPage(reqObject, resObject) {
    resObject.render('index', { title: 'Express' });
}

function RenderBookinfoPage(reqObject, resObject) {
    resObject.send('OK');
}
function RenderBookshelfPage(reqObject, resObject) {
    resObject.send('OK');
}
function RenderHistoryPage(reqObject, resObject) {
    resObject.send('OK');
}
function RenderProfilePage(reqObject, resObject) {
    resObject.send('OK');
}
function RenderSearchResultPage(reqObject, resObject) {
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