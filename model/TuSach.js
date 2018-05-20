"user strict";

var convert = require('xml-js');
var File = require("fs");
var duongDanThuMucDatabase = "../DoAnTK/database";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var xmlns_v = "urn:v";
var Node_goc = new DOMParser().parseFromString("<Du_lieu />", "text/xml");

var duongDan;
var duLieu;

class TuSach {
  constructor() {
    this.DocDuLieu("DanhSachTuSach.xml");
  }

  DocDuLieu(tenFile) {
    duongDan = duongDanThuMucDatabase + "/" + tenFile;
    var chuoiXML = File.readFileSync(duongDan, "UTF-8"); //Dang chuoi
    duLieu = new DOMParser().parseFromString(chuoiXML, "text/xml")
      .documentElement; //chuyen sang dang xml
  }

  GhiDuLieu() {
    var temp = new XMLSerializer().serializeToString(duLieu); //chuyen sang dang chuoi
    File.writeFile(duongDan, temp, err => {
      if (err != null) {
        console.log("--> Cannot write data to file");
      } else {
        console.log("--> Write data to file successfully! <--");
      }
    });
  }

  CapNhatThongTinSach(idChu, idSach, tenSach, tacGia, maISBN, NXB, tinhTrang, soLuong) {
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongMotTu = danhSachTuSach[i]
          .getElementsByTagName("danh_sach_sach")[0]
          .getElementsByTagName("sach");
        for (var j = 0; j < danhSachSachTrongMotTu.length; j++) {
          if (danhSachSachTrongMotTu[j].getAttribute("id_sach") == idSach) {
            danhSachSachTrongMotTu[j].setAttribute("ten_sach", tenSach);
            danhSachSachTrongMotTu[j].setAttribute("tac_gia", tacGia);
            danhSachSachTrongMotTu[j].setAttribute("ma_ISBN", maISBN);
            danhSachSachTrongMotTu[j].setAttribute("NXB", NXB);
            danhSachSachTrongMotTu[j].setAttribute("tinh_trang", tinhTrang);
            danhSachSachTrongMotTu[j].setAttribute("so_luong", soLuong);
            break;
          }
        }
      }
    }
  }

  ThemSachVaoTu() {} //chưa đụng đến

  XoaSach(idChu, idSach) {
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongMotTu = danhSachTuSach[i]
          .getElementsByTagName("danh_sach_sach")[0]
          .getElementsByTagName("sach");
        for (var j = 0; j < danhSachSachTrongMotTu.length; j++) {
          if (danhSachSachTrongMotTu[j].getAttribute("id_sach") == idSach) {
            var y = danhSachSachTrongMotTu[j];
            duLieu.removeChild(y);
            break;
          }
        }
      }
    }
  }

  CapNhatDiemDanhGia(idChu, soLuongDiemCongThem) {
    //số lượng điểm cộng thêm có thể âm hoặc vote up or vote down
    for (var i = 0; i < duLieu.getElementsByTagName("tu_sach").length; i++) {
      if (
        duLieu.getElementsByTagName("tu_sach")[i].getAttribute("id_chu") ==
        idChu
      ) {
        soLuongDiemCongThem = parseInt(soLuongDiemCongThem, 10);
        var diemBanDau = parseInt(
          duLieu
            .getElementsByTagName("tu_sach")
            [i].getAttribute("diem_danh_gia"),
          10
        );
        duLieu
          .getElementsByTagName("tu_sach")
          [i].setAttribute("diem_danh_gia", diemBanDau + soLuongDiemCongThem);
      }
    }
  }

  ThemYeuCau(idChu, idNguoiMuon, idSach,ngayMuon, ngayTra, loaiYeuCau) {
    //hoán đổi 2 id để dùng cho các yêu cầu tương ứng
    var loaiIdUser;
    if (loaiYeuCau == "yeu_cau_cho_muon_sach") {
      loaiIdUser = "id_user_muon";
    } else {
      loaiIdUser = "id_user_cho_muon";
    }
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (idChu == danhSachTuSach[i].getAttribute("id_chu")) {
        var Node_moi = Node_goc.createElementNS(xmlns_v, "yeu_cau");
        Node_moi.setAttributeNS(xmlns_v, loaiIdUser, idNguoiMuon);
        Node_moi.setAttributeNS(xmlns_v, "id_sach", idSach);
        Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
        Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

        danhSachTuSach[i]
          .getElementsByTagName(loaiYeuCau)[0]
          .insertBefore(
            Node_moi,
            danhSachTuSach[i]
              .getElementsByTagName(loaiYeuCau)[0]
              .getElementsByTagName("yeu_cau")[0]
          ); //chèn vào đầu
      }
    }
  }

  XoaYeuCau(idChu, idNguoiMuon, idSach, loaiYeuCau) {
    var loaiIdUser;
    if (loaiYeuCau == "yeu_cau_cho_muon_sach") {
      loaiIdUser = "id_user_muon";
    } else {
      loaiIdUser = "id_user_cho_muon";
    }

    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (idChu == danhSachTuSach[i].getAttribute("id_chu")) {
        var danhSachYeuCau = danhSachTuSach[i]
          .getElementsByTagName(loaiYeuCau)[0]
          .getElementsByTagName("yeu_cau");
        for (var j = 0; j < danhSachYeuCau.length; j++) {
          if (
            danhSachYeuCau[j].getAttribute(loaiIdUser) == idNguoiMuon &&
            idSach == danhSachYeuCau[j].getAttribute("id_sach")
          ) {
            var y = danhSachYeuCau[j];
            duLieu.removeChild(y);
            break;
          }
        }
        break;
      }
    }
  }

  ThemSachVaoLichSu(idChu, idNguoiMuon, idSach, ngayMuon, ngayTra, loaiLichSu) {
    var loaiIdUser;
    if (loaiLichSu == "lich_su_cho_muon_sach") {
      loaiIdUser = "id_user_muon";
    } else {
      loaiIdUser = "id_user_cho_muon";
    }

    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName(loaiLichSu)[0]
          .getElementsByTagName("sach");
        var j;
        for (j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {//Nếu sách đã có trong lịch sử
            var Node_moi = Node_goc.createElementNS(xmlns_v, "user");
            Node_moi.setAttributeNS(xmlns_v, loaiIdUser, idNguoiMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

            danhSachSachTrongLichSu[j].insertBefore(
              Node_moi,
              danhSachSachTrongLichSu[j].getElementsByTagName("user")[0]
            ); //chèn vào đầu
            break;
          }
        }
        if(j==danhSachSachTrongLichSu.length){//nếu sách chưa có trong lịch sử
          var sach = Node_goc.createElementNS(xmlns_v, "sach");
          sach.setAttributeNS(xmlns_v, "id_sach", idSach);
          var user = Node_goc.createElementNS(xmlns_v, "user");
            user.setAttributeNS(xmlns_v, loaiIdUser, idNguoiMuon);
            user.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
            user.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);
            sach.appendChild(user);

            danhSachTuSach[i]
            .getElementsByTagName(loaiLichSu)[0].appendChild(sach);
          break;
        }
      }
    }
  }

  XoaSachKhoiLichSu(idChu, idNguoiMuon, idSach, loaiLichSu) {
    var loaiIdUser;
    if (loaiLichSu == "lich_su_cho_muon_sach") {
      loaiIdUser = "id_user_muon";
    } else {
      loaiIdUser = "id_user_cho_muon";
    }

    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName(loaiLichSu)[0]
          .getElementsByTagName("sach");
        for (var j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {
            var danhSachNguoiMuonSachNay = danhSachSachTrongLichSu[
              j
            ].getElementsByTagName("user");
            for (var k = 0; k < danhSachNguoiMuonSachNay.length; k++) {
              if (
                idNguoiMuon ==
                danhSachNguoiMuonSachNay[k].getAttribute(loaiIdUser)
              ) {
                var y=danhSachNguoiMuonSachNay[k];
                if(danhSachNguoiMuonSachNay.length==1){//Nếu chỉ có 1 người đang mượn khi xóa sẽ xóa luôn cuốn sách ra khỏi danh sách
                 duLieu.removeChild(danhSachSachTrongLichSu[j]);
                }
                else{
                  danhSachSachTrongLichSu[j].removeChild(y);
                }
                break;
              }
            }
          break;
          }
        }
        break;
      }
    }
  }

  LayRaMotTuSach(idChu){
    for(var i=0;i<duLieu.getElementsByTagName("tu_sach").length;i++){
      if(idChu==duLieu.getElementsByTagName("tu_sach")[i].getAttribute("id_chu")){
        return this.ConvertToJson(duLieu.getElementsByTagName("tu_sach")[i]);
      }
    }
    return "null";
  }

  LayHetDuLieuRa() {
    return this.ConvertToJson(duLieu);
  }

  ConvertToJson(data){
    var xml =new XMLSerializer().serializeToString(data);//chuyen xml dang object sang text
    var temp = convert.xml2json(xml, {compact: false, spaces: 4});//xu ly xml text sang json text
    console.log(temp);
    var result=JSON.parse(temp);
    // console.log(result.elements[0].type);
    return result;
  }
}

var tuSach = new TuSach();
module.exports = tuSach;
