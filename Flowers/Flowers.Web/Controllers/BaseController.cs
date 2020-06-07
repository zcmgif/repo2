using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace Flowers.Web.Controllers
{
    public class BaseController : Controller
    {
        // GET: Base
        //public ActionResult Index()
        //{
        //    return View();
        //}

        /// <summary>
        /// 当前的用户id
        /// </summary>
        protected int CurrentUserID
        {
            get
            {
                if (Request != null && Request.Cookies["AdminCookie"] != null)
                {
                    HttpCookie cookie = Request.Cookies["AdminCookie"];
                    return Convert.ToInt32(cookie.Values["UId"]);
                }
                else
                {
                    return 0;
                }

            }
        }
        /// <summary>
        /// 当前的用户的信用卡
        /// </summary>
        protected string UserbankCard
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["bankCard"].ToString());
            }
        }
        /// <summary>
        /// 当前的用户名
        /// </summary>
        protected string CurrentUserName
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["Uname"].ToString());
            }
        }
        protected string DBName
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["name"].ToString());
            }
        }
        protected string Imgurl
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["ImgUrl"].ToString());
            }
        }

        protected string StoreName
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["StoreName"].ToString());
            }
        }
        protected string StoreNames
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "";
                }
                return HttpUtility.UrlDecode(cookie.Values["StoreNames"].ToString());
            }
        }
        protected string StoreId
        {
            get
            {
                HttpCookie cookie = Request.Cookies["AdminCookie"];
                if (cookie == null)
                {
                    return "'0'";
                }
                return HttpUtility.UrlDecode(cookie.Values["StoreId"].ToString().TrimEnd(','));
            }
        }
    }
}