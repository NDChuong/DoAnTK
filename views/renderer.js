function RenderIndexPage(resObject) {
    resObject.render('index', { title: 'Express' });
}

function RenderBookinfoPage(resObject) {
    resObject.send('OK');
}
function RenderBookshelfPage(resObject) {
    resObject.send('OK');
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