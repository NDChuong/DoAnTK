"user strict";

var File = require("fs");
var duongDanThuMucDatabase = "../DoAnTK/database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xmlns_v = "urn:v";
var Node_goc = new DOMParser().parseFromString("<Du_lieu />", "text/xml");

var duongDan;
var duLieu;

class BaoCao {
  
  constructor(){
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

  ThemBaoCao(idUserBaoCao,idUserBiBaoCao,lyDoBaoCao) {
    // Them node bao cao moi
    var i;
    for(i=0;i<duLieu.getElementsByTagName("bao_cao").length;i++){
        if(duLieu.getElementsByTagName("bao_cao")[i].getAttribute("id_user_bao_cao")==idUserBaoCao){//nếu đã từng báo cáo trước đó thì thêm vào node đã có
            var Node_moi = Node_goc.createElementNS(xmlns_v,"user");
            Node_moi.setAttributeNS(xmlns_v,"id_user_bi_bao_cao", idUserBiBaoCao);
            Node_moi.textContent=lyDoBaoCao;
            duLieu.getElementsByTagName("bao_cao")[i].insertBefore(Node_moi,duLieu.getElementsByTagName("bao_cao")[i].getElementsByTagName("user")[0]);//chèn vào đầu
        }
    }
    if(i==duLieu.getElementsByTagName("bao_cao").length){//nếu chưa từng báo cáo bao giờ
        var bao_cao = Node_goc.createElementNS(xmlns_v, "bao_cao");
        bao_cao.setAttributeNS(xmlns_v, "id_user_bao_cao", idUserBaoCao);
        var user=Node_goc.createElementNS(xmlns_v,"user");
        user.setAttributeNS(xmlns_v,"id_user_bi_bao_cao",idUserBiBaoCao);
        user.textContent = lyDoBaoCao;
        bao_cao.appendChild(user);
        duLieu.appendChild(bao_cao);
    }
  }

  XoaBaoCao(idUserBaoCao,idUserBiBaoCao,lyDoBaoCao) {
      var danhSachBaoCao = duLieu.getElementsByTagName("bao_cao");
      for(var i=0;i<danhSachBaoCao.length;i++){
          if(danhSachBaoCao[i].getAttribute("id_user_bao_cao")==idUserBaoCao){
              var danhSachUserTaiMotNode=danhSachBaoCao[i].getElementsByTagName("user");
              for(var j=0;j<danhSachUserTaiMotNode.length;j++){
                  if(danhSachUserTaiMotNode[j].getAttribute("id_user_bi_bao_cao")==idUserBiBaoCao&&danhSachUserTaiMotNode[j].textContent==lyDoBaoCao){
                    var y = danhSachUserTaiMotNode[j];
                    duLieu.removeChild(y);
                    break;//thiếu chỗ này thì nó sẽ xóa all dữ liệu
                  }
              }
          }
      }
  }

  LayHetDuLieuRa() {
    return duLieu;
  }
}

var baoCao = new BaoCao();
module.exports = baoCao;