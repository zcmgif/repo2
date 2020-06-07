using Flowers.Model;
using Flowers.Web.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flowers.BLL;
using System.Text;
using System.Drawing;
using System.IO;
using Flowers.Common;

namespace Flowers.Web.Controllers
{
    public class OwnerController :BaseController
    {
        GoodsBLL bll = new GoodsBLL();
        // GET: Owner
        public ActionResult Index()
        {
            ViewBag.uname = CurrentUserName;
            return View();
        }
        public ActionResult Goods()
        {
            ViewBag.uname = CurrentUserName;
            return View();
        }
        public ActionResult GetSOList()
        {
            int count = 0;
            //string sql = @"select p.Uname,p.Sex,p.roleId,p.truename,p.UId from Users p order by UId desc";
            //string sql = @"select * ,(select top 1 truename from [dbo].Users where UId=m.UId) as truename, (select roleName from Role where roleId in(select top 1  roleId from Users where UId=m.UId)) as roelName  from .[dbo].Users m  where  " + strWhere;
            DataSet ds = bll.GetsOrdermin();
            // DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, 7, rows, "UId desc"), out count);
            List<VOrderSminxi> list = TBToList<VOrderSminxi>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<VOrderSminxi>>();
            grid.total = count;
            grid.rows = list;
            return Json(grid, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddGoods()
        {
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult GetGoodsList()
        {
            int count = 0;
            //string sql = @"select p.Uname,p.Sex,p.roleId,p.truename,p.UId from Users p order by UId desc";
            //string sql = @"select * ,(select top 1 truename from [dbo].Users where UId=m.UId) as truename, (select roleName from Role where roleId in(select top 1  roleId from Users where UId=m.UId)) as roelName  from .[dbo].Users m  where  " + strWhere;
            DataSet ds = bll.GetGoodsList();
            List<Goods> list = TBToList<Goods>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<Goods>>();
            grid.total = count;
            grid.rows = list;
            return Json(grid, JsonRequestBehavior.AllowGet);
        }
        public ActionResult OrderShopminxi()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }
        
        public class EasyuiDataGrid<t>
        {
            public int total { get; set; }
            public t rows { get; set; }
        }
        #region 上传图像
        public ActionResult SavePicture(string picString)
        {
            JsonModel jm = new JsonModel();
            var tmpArr = picString.Split(',');
            byte[] bytes = Convert.FromBase64String(tmpArr[1]);

            MemoryStream ms = new MemoryStream(bytes);
            ms.Write(bytes, 0, bytes.Length);
            var img = Image.FromStream(ms, true);
            var path = System.AppDomain.CurrentDomain.BaseDirectory;
            var imagesPath = System.IO.Path.Combine(path, @"\Content\FlowerShop\product\" + "\\");
            if (!System.IO.Directory.Exists(imagesPath))
                System.IO.Directory.CreateDirectory(imagesPath);
            string fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + ".png";

            var bitImage = GetThumbnailImage(img, 250, 250);
            //string newPath = imagesPath + fileName;

            bitImage.Save(imagesPath + fileName);
            if (fileName != null)
            {
                jm.status = 1;
                jm.msg = fileName;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有上传成功！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }

        //图片压缩
        public static Image GetThumbnailImage(Image srcImage, int width, int height)
        {
            Image bitmap = new Bitmap(width, height);
            Graphics g = Graphics.FromImage(bitmap);

            //设置高质量插值法 
            g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.High;
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighSpeed;

            //在指定位置并且按指定大小绘制原图片的指定部分 
            g.DrawImage(srcImage, new Rectangle(0, 0, width, width),
                new Rectangle(0, 0, srcImage.Width, srcImage.Height),
                GraphicsUnit.Pixel);

            return bitmap;
        }
        #endregion
        public ActionResult AddnewGoods(string Imgurl,string input_field, string messagetext,decimal price, int num, int uid)
        {
            JsonModel jm = new JsonModel();
            Goods n = new Goods();
            n.Gpicture = Imgurl;
            n.Gname = input_field;
            n.Gprice = price;
            n.Gintroduce = messagetext;
            n.Gnumber = num;
            int m = bll.AddGoods(n);
            if (m > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "添加失败！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        
    }
}