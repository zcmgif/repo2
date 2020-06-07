using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.Web.Script.Serialization;
using System.IO;
using Flowers.BLL;
using Flowers.DAL;
using Flowers.Common;
using Flowers.Model;
using Flowers.Common.Post;
using System.Drawing;
using Flowers.Web.Models;
using System.Text;

namespace Flowers.Web.Controllers
{
    public class HomeController :BaseController
    {
        




        UserBLL bll = new UserBLL();
        GoodsBLL gbll = new GoodsBLL();
        #region 登陆
        // GET: Home
        public ActionResult Login()
        {
            if (Session["OtherLogin"] != null && Convert.ToBoolean(Session["OtherLogin"]) == true)
            {

                HttpContext.Response.Write(" <script type='text/javascript'> window.top.location = '/Home/Login'; alert('您的账号已在其它地方登录，被迫退出。'); </script>");
                Session["OtherLogin"] = null;
            }
            else
            {
                ViewBag.Msg = "";
            }
            return View();
        }
        public ActionResult LoginVail(string UserName, string Password)
        {
            JsonModel jm = new JsonModel();
            Users user = new Users();
            if (Session["CheckCode"] != null && Session["CheckCode"].ToString().ToLower() != DNTRequest.GetString("VailCode").Trim().ToLower())
            {
                jm.status = 0;
                jm.msg = "验证码错误";
            }
            else
            {
                DataSet ds = new DataSet();
                user.Uname = UserName;
                user.Pwd = Password;
                ds = bll.GetUserNameList(user);
                if(ds.Tables[0].Rows.Count>0)
                {
                    int roleid = Convert.ToInt32(ds.Tables[0].Rows[0]["roleId"]);
                    user.ImgUrl = ds.Tables[0].Rows[0]["ImgUrl"].ToString();
                    user.UId = Convert.ToInt32(ds.Tables[0].Rows[0]["UId"].ToString());
                    user.bankCard = ds.Tables[0].Rows[0]["bankCard"].ToString();
                    if (roleid==1)
                    {
                        jm.status = 1;
                        AdminPage.WriteUserCookie(user);
                    }
                    else if(roleid==2)
                    {
                        jm.status = 2;
                        AdminPage.WriteUserCookie(user);
                    }
                    else
                    {
                        jm.status = 3;
                        AdminPage.WriteUserCookie(user);
                    }
                    
                }
                else
                {
                    jm.status = 0;
                    jm.msg = "用户名或密码错误";
                }
            }

            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 注册
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult RegisterVail(string UserName, string Password,int roleId)
        {
            JsonModel jm = new JsonModel();
            Users user = new Users();
            string msg = "";
            DataSet ds = new DataSet();
            user.Uname = UserName;
            user.Pwd = Password;
            ds = bll.GetUserNameList(user);
            if (ds.Tables[0].Rows.Count > 0)
            {
                jm.status = 0;
                jm.msg = "此用户已经存在！";
            }
            else
            {
                user.roleId = roleId;
                int n = bll.AddUser(user);
                //int n = bll.AddUser(UserName,Password,roleId);
                if (n>0)
                {
                    jm.status = 1;
                }
                else
                {
                    jm.status = 0;
                    jm.msg = msg;
                }
            }

            return Json(jm, JsonRequestBehavior.AllowGet);
        }
   
        #endregion
       
        #region 完善用户信息
        public ActionResult UserImprovement()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult UserImprovementVail(string UserName,DateTime calendar1,string sex,string bankcard,string str,string phone,string email,int id,string Imgurl)
        {
            JsonModel jm = new JsonModel();
            Users user = new Users();
            dizhi d = new dizhi();
            user.bankCard = bankcard;
            user.Sex = sex;
            user.Email = email;
            user.Birthday = calendar1;
            user.ImgUrl = Imgurl;
            user.UId = id;
            user.Uname = CurrentUserName;
            int n = bll.UpUser(user);
            d.uid = id;
            d.newname = UserName;
            d.phone = phone;
            d.adress = str;
            int m = gbll.Addadress(d);
            if(n>0&&m>0)
            {
                jm.status = 1;
                //AdminPage.WriteUserCookieimg(user);
            }
            else
            {
                jm.status = 0;
                jm.msg = "信息完善失败！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 上传头像

        public ActionResult SavePicture(string picString)
        {
            JsonModel jm = new JsonModel();
            var tmpArr = picString.Split(',');
            byte[] bytes = Convert.FromBase64String(tmpArr[1]);

            MemoryStream ms = new MemoryStream(bytes);
            ms.Write(bytes, 0, bytes.Length);
            var img = Image.FromStream(ms, true);
            var path = System.AppDomain.CurrentDomain.BaseDirectory;
            var imagesPath = System.IO.Path.Combine(path, @"Content\Home\touImg\" + "\\");
            if (!System.IO.Directory.Exists(imagesPath))
                System.IO.Directory.CreateDirectory(imagesPath);
            string fileName = DateTime.Now.ToString("yyyyMMddHHmmss") + ".png";
            //string urlpath = Server.MapPath(@"Content\Home\touImg\") + "\\" + fileName;

            var bitImage = GetThumbnailImage(img, 91, 135);
            //string newPath = imagesPath + fileName;

            bitImage.Save(imagesPath + fileName);
            //bitImage.Save(urlpath);
            //保存图片，放到文件HeadImg下
            //.SaveAs(urlpath);

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

        #region 三级联动 省、市、镇
        public JsonResult GetProvincelist()
        {
            var list = ProvinceList();
            return Json(list,JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCitylist(int pid)
        {
            var list = CityList(pid);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetDistrylist(int cid)
        {
            var list = DistryList(cid);
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public List<S_Province> ProvinceList()
        {
            List<S_Province> list = new List<S_Province>();
            DataSet ds = new DataSet();
            ds = bll.Getprovince();
            for(int i=0;i<ds.Tables[0].Rows.Count;i++)
            {
                list.Add(new S_Province() { ProvinceID =Convert.ToInt64(ds.Tables[0].Rows[i]["ProvinceID"].ToString()), ProvinceName =ds.Tables[0].Rows[i]["ProvinceName"].ToString() });
            }
            return list;
        }
        public List<S_City> CityList(int provinceID)
        {
            List<S_City> list = new List<S_City>();
            DataSet ds = new DataSet();
            ds = bll.Getcity(provinceID);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                list.Add(new S_City() { CityID = Convert.ToInt64(ds.Tables[0].Rows[i]["CityID"].ToString()), CityName = ds.Tables[0].Rows[i]["CityName"].ToString() });
            }
            return list;
        }
        public List<S_District> DistryList(int cityID)
        {
            List<S_District> list = new List<S_District>();
            DataSet ds = new DataSet();
            ds = bll.Getdistry(cityID);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                list.Add(new S_District() { DistrictID = Convert.ToInt64(ds.Tables[0].Rows[i]["DistrictID"].ToString()), DistrictName = ds.Tables[0].Rows[i]["DistrictName"].ToString() });
            }
            return list;
        }
        #endregion

        #region 修改密码
        public ActionResult UserEdit()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            DataSet ds = new DataSet();
            ds = bll.GetUseroldPw(CurrentUserID);
            if (ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.pwd= ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                ViewBag.pwd = "";
            }
            return View();
        }
        public ActionResult UpdatePw(int uid,string newPw)
        {
            JsonModel jm = new JsonModel();
            Users user = new Users();
            string msg = "修改失败！";
            user.UId = uid;
            user.Pwd = newPw;
            int n= bll.UpUserPw(user);
            if (n > 0)
            {
                jm.status = 1;
                jm.msg = "修改成功！";
            }
            else
            {
                jm.status = 0;
                jm.msg = msg;
            }

            return Json(jm, JsonRequestBehavior.AllowGet);
        }

        #endregion

    }
}