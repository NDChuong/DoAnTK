var express = require("express");
var router = express.Router();

var convert = require('xml-js');
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

var baoCao=require("../model/BaoCao.js");
var tuSach=require("../model/TuSach.js");
var user = require("../model/User.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  
  var danhSachUser, danhSachBaoCao, danhSachTuSach;
  user.DocDuLieu("DanhSachUser.xml");
  baoCao.DocDuLieu("DanhSachBaoCao.xml");
  tuSach.DocDuLieu("DanhSachTuSach.xml");

//Chuyển xml sang string
var xml =new XMLSerializer().serializeToString(baoCao.LayHetDuLieuRa());//chuyen xml dang object sang text
var result1 = convert.xml2json(xml, {compact: true, spaces: 4});//xu ly xml text sang json text
// console.log(result1);

  //Dữ liệu đang thao tác trên bộ nhớ và chưa ghi xuống file để ghi xuống file sử dụng [doiTuong].GhiDuLieu()
  var yeuCau="LayRaMotTuSach";

  switch (yeuCau) {//Trung tâm điều phối
    //Khu vực 
    case "LayRaMotUser":
      var motUser = user.LayRaMotUser("1512043");
      console.log(new XMLSerializer().serializeToString(motUser)); 
      break;
    case "LoadDanhSachUser":
      danhSachUser = user.LayHetDuLieuRa();//chua du lieu dang xml
      break;
    case "CapNhatThongTinUser":
      user.CapNhatThongTinUser( "1512043","Võ Phương Sa xxx","20/10/2030","Nam","0123","abc","123");
      break;
    case "XoaUser":
      user.XoaUser("1512043");
      break;
    case "ThemUser":
      user.ThemUser("1512043","Võ Phương Sa xxx","20/10/2030","Nam","0123","abc","123");
      break;
      //Khu vực báo cáo
    case "LoadDanhSachBaoCao":
      danhSachBaoCao=baoCao.LayHetDuLieuRa();
      break;
    case "ThemBaoCao":
      baoCao.ThemBaoCao("15120xx","1111111","hihi");
      break;
    case "XoaBaoCao":
      baoCao.XoaBaoCao("15120xx","1111111","hihi");
      break;
      //Khu vực tủ sách
    case "LayRaMotTuSach":
      var motTuSach = tuSach.LayRaMotTuSach("15120xx");
      console.log(new XMLSerializer().serializeToString(motTuSach)); 
      break;
    case "LoadDanhSachTuSach":
      danhSachTuSach= tuSach.LayHetDuLieuRa();
      break;
    case "CapNhatThongTinSach":
      tuSach.CapNhatThongTinSach("15120xx","NMLT","Nhập mun nhập trình :)","Trần Mạnh Chung","00000000","ĐH KHTN","false","9");
      break;
    case "CapNhatDiemDanhGia":
      tuSach.CapNhatDiemDanhGia("15120xx","12");
      break;
    case "XoaSach":
      tuSach.XoaSach("15120xx","NMLT");
      break;
      //Khu vực yêu cầu
    case "XoaYeuCau"://để xóa yêu cầu cho mượn sách thay đổi tham số cuối và đảo ngược vị trí 2 id cho nhau --tham số cuối: yeu_cau_muon_sach
      tuSach.XoaYeuCau("15120xx","151211xx","NMLT","yeu_cau_cho_muon_sach");
      break;
    case "ThemYeuCau"://để thêm yêu cầu cho mượn sách thay đổi tham số cuối và đảo ngược vị trí 2 id cho nhau --tham số cuối: yeu_cau_muon_sach
      tuSach.ThemYeuCau("15120xx","xxxxxxxx","NMLT","20/11/2018","yeu_cau_cho_muon_sach");
      break;
      //Khu vực lịch sử
    case "ThemSachVaoLichSuMuon"://để thêm vào lịch sử mượn sách thay đổi tham số cuối và đảo ngược vị trí 2 id cho nhau --tham số cuối: lich_su_muon_sach
      tuSach.ThemSachVaoLichSu("15120xx","11111111","xxxxxxxxx","20/11/2011","20/11/2011","lich_su_cho_muon_sach");
      break;
    case "XoaSachKhoiLichSu"://để xóa khỏi lịch sử mượn sách thay đổi tham số cuối và đảo ngược vị trí 2 id cho nhau --tham số cuối: lich_su_muon_sach
      tuSach.XoaSachKhoiLichSu("15120xx","11111111","xxxxxxxxx","lich_su_cho_muon_sach");
      break;
  }

  res.render("index", { title: "Express" });
});

module.exports = router;
