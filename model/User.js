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

class User {

  constructor(){
    this.DocDuLieu("DanhSachUser.xml");
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

  ThemUser(idUser, tenUser, ngaySinh, gioiTinh, soDienThoai, email, password) {
    // Them node user moi
    var Node_moi = Node_goc.createElementNS(xmlns_v, "user");
    Node_moi.setAttributeNS(xmlns_v, "id_user", idUser);
    Node_moi.setAttributeNS(xmlns_v, "ten_user", tenUser);
    Node_moi.setAttributeNS(xmlns_v, "ngay_sinh", ngaySinh);
    Node_moi.setAttributeNS(xmlns_v, "gioi_tinh", gioiTinh);
    Node_moi.setAttributeNS(xmlns_v, "so_dien_thoai", soDienThoai);
    Node_moi.setAttributeNS(xmlns_v, "email", email);
    Node_moi.setAttributeNS(xmlns_v, "password", password);

    duLieu.appendChild(Node_moi);
  }

  XoaUser(idUser) {
    for(var i=0;i<duLieu.getElementsByTagName("user").length;i++){
      if(duLieu.getElementsByTagName("user")[i].getAttribute("id_user")==idUser){
        var y = duLieu.getElementsByTagName("user")[i];
        duLieu.removeChild(y);
      }
    }
  }

  CapNhatThongTinUser(idUser, tenUser, ngaySinh, gioiTinh, soDienThoai, email, password) {
    for(var i=0;i<duLieu.getElementsByTagName("user").length;i++){
      if(duLieu.getElementsByTagName("user")[i].getAttribute("id_user")==idUser){
        {
          var nodeReplace=duLieu.getElementsByTagName("user")[i];
          nodeReplace.setAttribute("ten_user", tenUser);//replace content of attribute
          nodeReplace.setAttribute("ngay_sinh", ngaySinh);
          nodeReplace.setAttribute("gioi_tinh", gioiTinh);
          nodeReplace.setAttribute("so_dien_thoai", soDienThoai);
          nodeReplace.setAttribute("email", email);
          nodeReplace.setAttribute("password", password);
        }
      }
    }
  }

  LayHetDuLieuRa() {
    return this.ConvertToJson(duLieu);
  }

  LayRaMotUser(idUser){
    for(var i=0;i<duLieu.getElementsByTagName("user").length;i++){
      if(idUser==duLieu.getElementsByTagName("user")[i].getAttribute("id_user")){
        return this.ConvertToJson(duLieu.getElementsByTagName("user")[i]);
      }
    }
    return "null";
  }

  ConvertToJson(data){
    var xml =new XMLSerializer().serializeToString(data);//chuyen xml dang object sang text
    var temp = convert.xml2json(xml, {compact: false, spaces: 4});//xu ly xml text sang json text
    // console.log(temp);
    // var result=JSON.parse(temp);
    // console.log(result.elements[0].type);
    return temp;
  }
}

var user = new User();
module.exports = user;