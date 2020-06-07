using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using Flowers.DAL;
using Flowers.Model;

namespace Flowers.Web.Models
{
    public class AdminPage
    {
        public static void Logout()
        {

            HttpCookie cookie = new HttpCookie("AdminCookie");
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddDays(-1);
                HttpContext.Current.Response.AppendCookie(cookie);
                FormsAuthentication.SignOut();
            }
        }
        ///<summary>
        ///写登陆用户的cookie
        ///</summary>
        public static void WriteUserCookie(Users usersinfo)
        {
            if (usersinfo == null)
                return;
            string guid = Guid.NewGuid().ToString();
            HttpCookie cookie = new HttpCookie("AdminCookie");
            cookie.Values["Uname"] = HttpUtility.UrlEncode(usersinfo.Uname);
            cookie.Values["ImgUrl"] = HttpUtility.UrlEncode(usersinfo.ImgUrl);
            cookie.Values["roleId"] = HttpUtility.UrlEncode(usersinfo.roleId.ToString());
            cookie.Values["UId"] = HttpUtility.UrlEncode(usersinfo.UId.ToString());
            cookie.Values["bankCard"] = HttpUtility.UrlEncode(usersinfo.bankCard.ToString());
            cookie.Values["Guid"] = guid;
            DataSet dss = DbHelperSQL.Query("select * from Users where UId='" + usersinfo.UId + "'");
            if (dss != null)
            {
                string ids = "";
                //string names = "";
                //string namess = "";
                foreach (DataRow dr in dss.Tables[0].Rows)
                {
                    ids += dr["Uname"] + ",";
                    //names += "'" + dr["StoreName"] + "',";
                    //namess += "" + dr["StoreName"] + ",";
                }
                cookie.Values["StoreId"] = HttpUtility.UrlEncode(ids.TrimEnd(','));
                //cookie.Values["StoreName"] = HttpUtility.UrlEncode(names.TrimEnd(','));
                //cookie.Values["StoreNames"] = HttpUtility.UrlEncode(namess.TrimEnd(','));
            }
            else
            {
                cookie.Values["StoreId"] = HttpUtility.UrlEncode("0");
                cookie.Values["StoreName"] = HttpUtility.UrlEncode("未设置门店");
            }

            cookie.Expires = DateTime.Now.AddMinutes(200);
            HttpContext.Current.Response.AppendCookie(cookie);

            System.Web.Caching.Cache cache = HttpRuntime.Cache;
            cache.Insert(usersinfo.UId.ToString(), guid, null, System.DateTime.Now.AddMinutes(10), TimeSpan.Zero);
        }
        //public static void WriteUserCookieimg(Users usersinfo)
        //{
        //    if (usersinfo == null)
        //        return;
        //    HttpCookie cookie = new HttpCookie("AdminCookie");
        //    cookie.Values["ImgUrl"] = HttpUtility.UrlEncode(usersinfo.ImgUrl);
        //    cookie.Expires = DateTime.Now.AddMinutes(200);
        //    HttpContext.Current.Response.AppendCookie(cookie);
        //}
        /// <summary>
        /// 网站登录用户ID
        /// </summary>
        /// <returns></returns>
        public static int UserID()
        {
            int userid = -1;
            try
            {

                HttpCookie cookie = HttpContext.Current.Request.Cookies["AdminCookie"];
                userid = Convert.ToInt32(cookie.Values["UserID"]);
            }
            catch
            {
                userid = -1;
            }
            return userid;
        }
        public static string LoginName()
        {
            string str = "";
            try
            {
                HttpCookie cookie = HttpContext.Current.Request.Cookies["AdminCookie"];
                str = Convert.ToString(cookie.Values["UserName"]);
            }
            catch
            {
                str = "";
            }
            return str;
        }
        /// <summary>
        /// 用户角色
        /// </summary>
        /// <returns></returns>
        public static int RoleID()
        {
            int str = 0;
            try
            {

                HttpCookie cookie = HttpContext.Current.Request.Cookies["AdminCookie"];
                str = Convert.ToInt32(cookie.Values["RoleID"]);

            }
            catch
            {
                str = 0;
            }
            return str;
        }
    }
}