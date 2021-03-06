"user strict";

var convert = require('xml-js');
var File = require("fs");
var duongDanThuMucDatabase = "./database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xmlns_v = "urn:v";
var Node_goc = new DOMParser().parseFromString("<Du_lieu />", "text/xml");

var duongDan;
var duLieu;
var idBaoCao = 0;

class BaoCao {

  constructor() {
    this.DocDuLieu("DanhSachBaoCao.xml");
  }

  DocDuLieu(tenFile) {
    duongDan = duongDanThuMucDatabase + "/" + tenFile;
    var chuoiXML = File.readFileSync(duongDan, "UTF-8");//Dang chuoi
    duLieu = new DOMParser().parseFromString(chuoiXML, "text/xml").documentElement;//chuyen sang dang xml
  }

  GhiDuLieu() {
    var temp = new XMLSerializer().serializeToString(duLieu);//chuyen sang dang chuoi
    File.writeFile(duongDan, temp, err => {
      if (err != null) {
        console.log("--> Cannot write data to file");
      } else {
        console.log("--> Write data to file successfully! <--");
      }
    });
  }
  ThemBaoCao(idUserBaoCao, idUserBiBaoCao, lyDoBaoCao) {
    idBaoCao++;
    // Them node bao cao moi
    var flag = 0;

    for (var i = 0; i < duLieu.getElementsByTagName("bao_cao").length; i++) {
      if (duLieu.getElementsByTagName("bao_cao")[i].getAttribute("id_user_bao_cao") == idUserBaoCao) {//nếu đã từng báo cáo trước đó thì thêm vào node đã có
        var Node_moi = Node_goc.createElementNS(xmlns_v, "user");
        Node_moi.setAttributeNS(xmlns_v, "id_bao_cao", idBaoCao);
        Node_moi.setAttributeNS(xmlns_v, "id_user_bi_bao_cao", idUserBiBaoCao);
        Node_moi.textContent = lyDoBaoCao;
        flag = 1;
        duLieu.getElementsByTagName("bao_cao")[i].insertBefore(Node_moi, duLieu.getElementsByTagName("bao_cao")[i].getElementsByTagName("user")[0]);//chèn vào đầu
      }
    }
    if (flag == 0) {//nếu chưa từng báo cáo bao giờ
      var bao_cao = Node_goc.createElementNS(xmlns_v, "bao_cao");
      bao_cao.setAttributeNS(xmlns_v, "id_user_bao_cao", idUserBaoCao);
      var user = Node_goc.createElementNS(xmlns_v, "user");
      user.setAttributeNS(xmlns_v, "id_bao_cao", idBaoCao);
      user.setAttributeNS(xmlns_v, "id_user_bi_bao_cao", idUserBiBaoCao);
      user.textContent = lyDoBaoCao;
      bao_cao.appendChild(user);
      duLieu.appendChild(bao_cao);
    }
  }

  XoaBaoCao(id_bao_cao) {
    var danhSachBaoCao = duLieu.getElementsByTagName("user");
    for (var i = 0; i < danhSachBaoCao.length; i++) {
      if (danhSachBaoCao[i].getAttribute("id_bao_cao") == id_bao_cao) {
        var y = danhSachBaoCao[i];
        duLieu.removeChild(y);
        break;//thiếu chỗ này thì nó sẽ xóa all dữ liệu
      }
    }
  }

  LayHetDuLieuRa() {
    return this.ConvertToJson(duLieu);
  }

  ConvertToJson(data) {
    var xml = new XMLSerializer().serializeToString(data);//chuyen xml dang object sang text
    var temp = convert.xml2json(xml, { compact: false, spaces: 4 });//xu ly xml text sang json text
    console.log(temp);
    var result = JSON.parse(temp);
    // console.log(result.elements[0].type);
    return result;
  }
}

var baoCao = new BaoCao();
module.exports = baoCao;