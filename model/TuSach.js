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

var _idYeuCau=0;

class TuSach {
  GetIdYeuCau(){
    return _idYeuCau++;
  }
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

  //--------------------------------SACH------------------------------------------

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

  ThemSachVaoTu(idChu, idSach, tenSach, tacGia, maISBN, NXB, tinhTrang, soLuong,link) { 
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for(var i =0;i<danhSachTuSach.length; i++){
      if(danhSachTuSach[i].getAttribute("id_chu")==idChu){
        var sach = Node_goc.createElementNS(xmlns_v,"sach");
        sach.setAttributeNS(xmlns_v,"id_chu",idChu);
        sach.setAttributeNS(xmlns_v,"id_sach",idSach);
        sach.setAttributeNS(xmlns_v,"ten_sach",tenSach);
        sach.setAttributeNS(xmlns_v,"tac_gia",tacGia);
        sach.setAttributeNS(xmlns_v,"ma_ISBN",maISBN);
        sach.setAttributeNS(xmlns_v,"NXB",NXB);
        sach.setAttributeNS(xmlns_v,"tinh_trang",tinhTrang);
        sach.setAttributeNS(xmlns_v,"so_luong",soLuong);
        sach.setAttributeNS(xmlns_v,"link",link);
        danhSachTuSach[i].getElementsByTagName('danh_sach_sach')[0].appendChild(sach);
      }
    }
  }

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

  LayRaToanBoSach() {
    this.DocDuLieu("DanhSachTuSach.xml");
    var danhSachSach = duLieu.getElementsByTagName("sach");
    var soLuong = danhSachSach.length;
    var sach = Node_goc.createElementNS(xmlns_v,"sach");
    for (var i = 0; i < soLuong; i++) {
      sach.appendChild(danhSachSach[i]);
    }
    return this.ConvertToJson(sach);
  }

  LayRaMotCuonSach(idSach) {
    this.DocDuLieu("DanhSachTuSach.xml");
    var x = duLieu.getElementsByTagName("sach");
    for (var i = 0; i < x.length; i++) {
      if (idSach == x[i].getAttribute("id_sach")) {
        return this.ConvertToJson(x[i]);
      }
    }
    return "null";
  }

//-----------------------------------END--------------------------------------------

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

  //----------------------------------YEU CAU-------------------------------------------

  LayRaMotYeuCauChoMuonSach( idYeuCau ){
    var yeuCau = duLieu.getElementsByTagName("yeu_cau_cho_muon");
    for( var i = 0; i<yeuCau.length; i++){
      if( yeuCau[i].getAttribute('id_yeu_cau')==idYeuCau ){
        return this.ConvertToJson(yeuCau[i]);
      }
    }
    return 'null';
  }

  LayRaToanBoYeuCauChoMuonSach(){
    var danhSachYeuCauChoMuonSach = duLieu.getElementsByTagName('yeu_cau_cho_muon');
    var soLuong = danhSachYeuCauChoMuonSach.length; 
    var result = Node_goc.createElementNS(xmlns_v,'danh_sach');
    for( var i = 0 ; i < soLuong ; i++ ){
      result.appendChild(danhSachYeuCauChoMuonSach[i]);
    }
    return this.ConvertToJson(result);
  }

  LayRaMotYeuCauMuonSach( idYeuCau ){
    var yeuCau = duLieu.getElementsByTagName("yeu_cau_muon");
    for( var i = 0; i<yeuCau.length; i++){
      if( yeuCau[i].getAttribute('id_yeu_cau')==idYeuCau ){
        return this.ConvertToJson(yeuCau[i]);
      }
    }
    return 'null';
  }

  LayRaToanBoYeuCauMuonSach(){
    var danhSachYeuCauMuonSach = duLieu.getElementsByTagName('yeu_cau_muon');
    var soLuong = danhSachYeuCauMuonSach.length; 
    var result = Node_goc.createElementNS(xmlns_v,'danh_sach');
    for( var i = 0 ; i < soLuong ; i++ ){
      result.appendChild(danhSachYeuCauMuonSach[i]);
    }
    return this.ConvertToJson(result);
  }

  ThemYeuCauChoMuonSach(idChu, idNguoiMuon, idSach, ngayMuon, ngayTra,idYeuCau) {

    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (idChu == danhSachTuSach[i].getAttribute("id_chu")) {
        var Node_moi = Node_goc.createElementNS(xmlns_v, "yeu_cau_cho_muon");
        Node_moi.setAttributeNS(xmlns_v,"id_yeu_cau",idYeuCau);
        Node_moi.setAttributeNS(xmlns_v, "id_user_muon", idNguoiMuon);
        Node_moi.setAttributeNS(xmlns_v, "id_sach", idSach);
        Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
        Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

        danhSachTuSach[i]
          .getElementsByTagName("yeu_cau_cho_muon_sach")[0]
          .insertBefore(
            Node_moi,
            danhSachTuSach[i]
              .getElementsByTagName("yeu_cau_cho_muon_sach")[0]
              .getElementsByTagName("yeu_cau_cho_muon")[0]
          ); //chèn vào đầu
      }
    }
  }

  ThemYeuCauMuonSach(idChu, idNguoiChoMuon, idSach, ngayMuon, ngayTra, idYeuCau) {

    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (idChu == danhSachTuSach[i].getAttribute("id_chu")) {
        var Node_moi = Node_goc.createElementNS(xmlns_v, "yeu_cau_muon");
        Node_moi.setAttributeNS(xmlns_v,"id_yeu_cau",idYeuCau);
        Node_moi.setAttributeNS(xmlns_v, "id_user_cho_muon", idNguoiChoMuon);
        Node_moi.setAttributeNS(xmlns_v, "id_sach", idSach);
        Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
        Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

        danhSachTuSach[i]
          .getElementsByTagName("yeu_cau_muon_sach")[0]
          .insertBefore(
            Node_moi,
            danhSachTuSach[i]
              .getElementsByTagName("yeu_cau_muon_sach")[0]
              .getElementsByTagName("yeu_cau_muon")[0]
          ); //chèn vào đầu
      }
    }
  }

  XoaYeuCau(idYeuCau){//id yeu cau cho muon sach va yeu cau muon sach la 1
    var danhSachYeuCau=duLieu.getElementsByTagName("yeu_cau_cho_muon");
    for(var i=0;i<danhSachYeuCau.length;i++){
      if(danhSachYeuCau[i].getAttribute("id_yeu_cau")==idYeuCau){
        duLieu.removeChild(danhSachYeuCau[i]);
      }
    }
    
    var danhSachYeuCau=duLieu.getElementsByTagName("yeu_cau_muon");
    for(var i=0;i<danhSachYeuCau.length;i++){
      if(danhSachYeuCau[i].getAttribute("id_yeu_cau")==idYeuCau){
        duLieu.removeChild(danhSachYeuCau[i]);
      }
    }
  }
//-------------------------------------END------------------------------------------

//-------------------------------------LICH SU--------------------------------------

  ThemSachVaoLichSuChoMuon(idChu, idNguoiMuon, idSach, ngayMuon, ngayTra) {
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName("lich_su_cho_muon_sach")[0]
          .getElementsByTagName("sach_cho_muon");
        var flag=0;
        for (var j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {//Nếu sách đã có trong lịch sử
            var Node_moi = Node_goc.createElementNS(xmlns_v, "user_muon");
            Node_moi.setAttributeNS(xmlns_v, "id_user_muon", idNguoiMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

            danhSachSachTrongLichSu[j].insertBefore(
              Node_moi,
              danhSachSachTrongLichSu[j].getElementsByTagName("user")[0]
            ); //chèn vào đầu
            flag=1;
            break;
          }
        }
        if (flag==0) {//nếu sách chưa có trong lịch sử
          var sach = Node_goc.createElementNS(xmlns_v, "sach_cho_muon");
          sach.setAttributeNS(xmlns_v, "id_sach", idSach);
          var user = Node_goc.createElementNS(xmlns_v, "user_muon");
          user.setAttributeNS(xmlns_v, "id_user_muon", idNguoiMuon);
          user.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
          user.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);
          sach.appendChild(user);

          danhSachTuSach[i]
            .getElementsByTagName("lich_su_cho_muon_sach")[0].appendChild(sach);
          break;
        }
      }
    }
  }

  ThemSachVaoLichSuMuon(idChu, idNguoiChoMuon, idSach, ngayMuon, ngayTra) {
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName("lich_su_muon_sach")[0]
          .getElementsByTagName("sach_muon");
        var flag=0;
        for (var j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {//Nếu sách đã có trong lịch sử
            var Node_moi = Node_goc.createElementNS(xmlns_v, "user_cho_muon");
            Node_moi.setAttributeNS(xmlns_v, "id_user_cho_muon", idNguoiChoMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
            Node_moi.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);

            danhSachSachTrongLichSu[j].insertBefore(
              Node_moi,
              danhSachSachTrongLichSu[j].getElementsByTagName("user_cho_muon")[0]
            ); //chèn vào đầu
            flag=1;
            break;
          }
        }
        if (flag==0) {//nếu sách chưa có trong lịch sử
          var sach = Node_goc.createElementNS(xmlns_v, "sach_muon");
          sach.setAttributeNS(xmlns_v, "id_sach", idSach);
          var user = Node_goc.createElementNS(xmlns_v, "user_cho_muon");
          user.setAttributeNS(xmlns_v, "id_user_cho_muon", idNguoiChoMuon);
          user.setAttributeNS(xmlns_v, "ngay_muon", ngayMuon);
          user.setAttributeNS(xmlns_v, "ngay_tra", ngayTra);
          sach.appendChild(user);

          danhSachTuSach[i]
            .getElementsByTagName("lich_su_muon_sach")[0].appendChild(sach);
          break;
        }
      }
    }
  }

  XoaSachKhoiLichSuChoMuonSach(idChu, idNguoiMuon, idSach) {
    var loaiIdUser;
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName("lich_su_cho_muon_sach")[0]
          .getElementsByTagName("sach_cho_muon");
        for (var j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {
            var danhSachNguoiMuonSachNay = danhSachSachTrongLichSu[
              j
            ].getElementsByTagName("user_muon");
            for (var k = 0; k < danhSachNguoiMuonSachNay.length; k++) {
              if (
                idNguoiMuon ==
                danhSachNguoiMuonSachNay[k].getAttribute("id_user_muon")
              ) {
                var y = danhSachNguoiMuonSachNay[k];
                if (danhSachNguoiMuonSachNay.length == 1) {//Nếu chỉ có 1 người đang mượn khi xóa sẽ xóa luôn cuốn sách ra khỏi danh sách
                  duLieu.removeChild(danhSachSachTrongLichSu[j]);
                }
                else {
                  danhSachSachTrongLichSu[j].removeChild(y);
                }
                return;
              }
            }
          }
        }
      }
    }
  }

  XoaSachKhoiLichSuMuonSach(idChu, idNguoiChoMuon, idSach) {
    var loaiIdUser;
    var danhSachTuSach = duLieu.getElementsByTagName("tu_sach");
    for (var i = 0; i < danhSachTuSach.length; i++) {
      if (danhSachTuSach[i].getAttribute("id_chu") == idChu) {
        var danhSachSachTrongLichSu = danhSachTuSach[i]
          .getElementsByTagName("lich_su_muon_sach")[0]
          .getElementsByTagName("sach_muon");
        for (var j = 0; j < danhSachSachTrongLichSu.length; j++) {
          if (danhSachSachTrongLichSu[j].getAttribute("id_sach") == idSach) {
            var danhSachNguoiMuonSachNay = danhSachSachTrongLichSu[
              j
            ].getElementsByTagName("user_cho_muon");
            for (var k = 0; k < danhSachNguoiMuonSachNay.length; k++) {
              if (
                idNguoiChoMuon ==
                danhSachNguoiMuonSachNay[k].getAttribute("id_user_cho_muon")
              ) {
                var y = danhSachNguoiMuonSachNay[k];
                if (danhSachNguoiMuonSachNay.length == 1) {//Nếu chỉ có 1 người đang mượn khi xóa sẽ xóa luôn cuốn sách ra khỏi danh sách
                  duLieu.removeChild(danhSachSachTrongLichSu[j]);
                }
                else {
                  danhSachSachTrongLichSu[j].removeChild(y);
                }
                return;
              }
            }
          }
        }
      }
    }
  }

//------------------------------------END--------------------------------------

  LayRaMotTuSach(idChu) {
    this.DocDuLieu("DanhSachTuSach.xml");
    for (var i = 0; i < duLieu.getElementsByTagName("tu_sach").length; i++) {
      if (idChu == duLieu.getElementsByTagName("tu_sach")[i].getAttribute("id_chu")) {
        return this.ConvertToJson(duLieu.getElementsByTagName("tu_sach")[i]);
      }
    }
    return "null";
  }

  LayHetDuLieuRa() {
    this.DocDuLieu("DanhSachTuSach.xml");
    return this.ConvertToJson(duLieu);
  }

  ConvertToJson(data) {
    var xml = new XMLSerializer().serializeToString(data);//chuyen xml dang object sang text
    var temp = convert.xml2json(xml, { compact: false, spaces: 4 });//xu ly xml text sang json text
    // console.log(temp);
    // var result=JSON.parse(temp);
    // console.log(result.elements[0].type);
    return temp;
  }
}

var tuSach = new TuSach();
module.exports = tuSach;