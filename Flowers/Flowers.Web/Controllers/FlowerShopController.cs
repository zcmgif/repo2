using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Flowers.Model;
using Flowers.BLL;
using System.Data;
using System.Data.SqlClient;
using Flowers.Common;
using Flowers.Web.Models;
using System.Collections;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Web.Security;
using System.IO;
using System.Drawing;

namespace Flowers.Web.Controllers
{
    public class FlowerShopController : BaseController
    {
        GoodsBLL bll = new GoodsBLL();

        // GET: FlowerShop
        #region 首页
        public ActionResult index()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult GoodsVail()
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getgoods();
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int j = i + 1;
                    if (j % 4 == 0)
                    {
                        str.Append("<div class='product_box no_margin_right'>");
                    }
                    else
                    {
                        str.Append("<div class='product_box'>");
                    }
                    str.Append("<a href = 'shoppingCart'>");
                    str.Append("<img src = '/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='floral set " + j + "' /></a>");
                    str.Append("<h3>" + ds.Tables[0].Rows[i]["Gintroduce"] + "--" + ds.Tables[0].Rows[i]["Gname"] + "</h3>");
                    str.Append("<p class='product_price'>￥" + ds.Tables[0].Rows[i]["Gprice"] + "</p>");
                    str.Append("<p class='add_to_cart' id='"+ds.Tables[0].Rows[i]["GId"]+"'>");
                    str.Append("<a href = '#' id='AddshopCar'>详情</a>");
                    int n = Convert.ToInt32(ds.Tables[0].Rows[i]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid="+n+"')";
                    str.Append("<a href='javascript:;' onclick="+url+">加入购物车</a>");
                    str.Append("</p></div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品",JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GoodsVail1(int menuId)
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getgoods1(menuId);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int j = i + 1;
                    if (j % 4 == 0)
                    {
                        str.Append("<div class='product_box no_margin_right'>");
                    }
                    else
                    {
                        str.Append("<div class='product_box'>");
                    }
                    str.Append("<a href = 'shoppingCart'>");
                    str.Append("<img src = '/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='floral set " + j + "' /></a>");
                    str.Append("<h3>" + ds.Tables[0].Rows[i]["Gintroduce"] + "--" + ds.Tables[0].Rows[i]["Gname"] + "</h3>");
                    str.Append("<p class='product_price'>￥" + ds.Tables[0].Rows[i]["Gprice"] + "</p>");
                    str.Append("<p class='add_to_cart' id='" + ds.Tables[0].Rows[i]["GId"] + "'>");
                    str.Append("<a href = '#' id='AddshopCar'>详情</a>");
                    int n = Convert.ToInt32(ds.Tables[0].Rows[i]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                    str.Append("<a href='javascript:;' onclick=" + url + ">加入购物车</a>");
                    str.Append("</p></div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult GoodsVail2(string name)
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getguanj(name);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int j = i + 1;
                    if (j % 4 == 0)
                    {
                        str.Append("<div class='product_box no_margin_right'>");
                    }
                    else
                    {
                        str.Append("<div class='product_box'>");
                    }
                    str.Append("<a href = 'shoppingCart'>");
                    str.Append("<img src = '/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='floral set " + j + "' /></a>");
                    str.Append("<h3>" + ds.Tables[0].Rows[i]["Gintroduce"] + "--" + ds.Tables[0].Rows[i]["Gname"] + "</h3>");
                    str.Append("<p class='product_price'>￥" + ds.Tables[0].Rows[i]["Gprice"] + "</p>");
                    str.Append("<p class='add_to_cart' id='" + ds.Tables[0].Rows[i]["GId"] + "'>");
                    str.Append("<a href = '#' id='AddshopCar'>详情</a>");
                    int n = Convert.ToInt32(ds.Tables[0].Rows[i]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                    str.Append("<a href='javascript:;' onclick=" + url + ">加入购物车</a>");
                    str.Append("</p></div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult LuckyVail()
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetLuck();
            if (ds.Tables[0].Rows.Count > 0)
            {
                int n = Convert.ToInt32(ds.Tables[0].Rows[0]["GId"].ToString());
                string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                str.Append("<a href='javascript:;' onclick=" + url + "><img src = '/Content/FlowerShop/images/" + ds.Tables[0].Rows[0]["Gpicture"] + " ' alt = 'Flowers' /></a>");
                str.Append("<a href='javascript:;' onclick=" + url + ">" + ds.Tables[0].Rows[0]["Gintroduce"] + "--" + ds.Tables[0].Rows[0]["Gname"] + "</a>");
                str.Append("<p>");
                str.Append("Price:");
                str.Append("<span class='price normal_price'>￥" + ds.Tables[0].Rows[0]["GOprice"] + "</span>&nbsp;&nbsp;");
                str.Append("<span class='price special_price'>￥" + ds.Tables[0].Rows[0]["Gprice"] + "</span>");
                str.Append("</p>");
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult CategoriesVail()
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetMenu();
            if (ds.Tables[0].Rows.Count > 0)
            {
                for(int i=0;i<ds.Tables[0].Rows.Count;i++)
                {
                    string url = "GetGoods1("+Convert.ToInt32(ds.Tables[0].Rows[i]["MenuID"].ToString()) +")";
                    str.Append("<li id='Menu"+ ds.Tables[0].Rows[i]["MenuID"] + "'><a href='javascript:;' onclick="+url+">" + ds.Tables[0].Rows[i]["MenuName"] + "</a></li>");
                }
                //<a href='#' name='menu'>"+ds.Tables[0].Rows[i]["MenuName"]+"</a><input type='button' name='menu' value='"+ ds.Tables[0].Rows[i]["MenuName"] + "'/>
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult sliderVail()
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getslider();
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int n = Convert.ToInt32(ds.Tables[0].Rows[0]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                    str.Append("<a href='#' onclick=" + url + "><img src = '/Content/FlowerShop/images/portfolio/" + ds.Tables[0].Rows[i]["Gpicture"] + " ' alt = 'slider image "+i+1+"' /></a>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        //加入购物车
        public ActionResult AddCainum(int gid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.gid = gid;
            return View();
        }
        public ActionResult AddShopCar1(int gid,int uid,int num)
        {
            JsonModel jm = new JsonModel();
            DataSet ds= bll.Getgoods(gid);
            OrDetailId detailId = new OrDetailId();
            if(ds.Tables[0].Rows.Count > 0)
            {
                decimal price =Convert.ToDecimal(ds.Tables[0].Rows[0]["Gprice"].ToString());
                decimal zj = num * price;
                detailId.GId = gid;
                detailId.UserId = uid;
                detailId.num = num;
                detailId.total = zj;
                detailId.price = price;
                detailId.createTime = DateTime.Now;
                int n = bll.InsetGw(detailId);
                if (n > 0)
                {
                    jm.status = 1;
                }
                else
                {
                    jm.status = 0;
                    jm.msg = "没有加入成功，请重新添加";
                }
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有删除成功，请重新删除";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 购物车
        public ActionResult shoppingCart()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult AddCarVail(int uid)
        {
            JsonModel jm = new JsonModel();
            Users users = new Users();
            if (uid == 0)
            {
                return Json("登陆已失效，请重新登陆。", JsonRequestBehavior.AllowGet);
            }
            else
            {
                users.UId = uid;
                StringBuilder str = new StringBuilder();
                str.Append("<tr bgcolor='#395015'>");
                str.Append("<th width='7%' align='left'></th>");
                str.Append("<th width='24%' align='left'>花卉</th>");
                str.Append("<th width='22.8%' align='left'>名称</th>");
                str.Append("<th width='8.5%' align='center'>数量</th>");
                str.Append("<th width='8.4%' align='right'>价格</th>");
                str.Append("<th width='11.4%' align='right'>总计</th>");
                str.Append("<th width='9.1%'> </th>");
                str.Append("</tr>");
                DataSet ds = new DataSet();
                ds = bll.GetShopCar(users);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int j = i + 1;
                        str.Append("<tr bgcolor='#41581B'>");
                        str.Append("<td><input class='"+ ds.Tables[0].Rows[i]["orDetailId"] + "' name='check' id='" + ds.Tables[0].Rows[i]["GId"] + "' type='checkbox' /></td>");
                        str.Append("<td><img src='/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='flower image " + j + "' /></td>");
                        str.Append("<td>" + ds.Tables[0].Rows[i]["Gname"] + "</td>");
                        str.Append("<td align='center'><input name='quantity" + j + "' type='text' id='num" + ds.Tables[0].Rows[i]["GId"] + "' value='" + ds.Tables[0].Rows[i]["num"] + "' size='6' maxlength='2' /></td>");
                        str.Append("<td align='right'>￥<label>" + ds.Tables[0].Rows[i]["price"] + "</label></td>");
                        str.Append("<td align='right'>￥<label>" + ds.Tables[0].Rows[i]["total"] + "</label></td>");
                        str.Append("<td align='center'> <a href='javascript:;' name='delecar'><img src='/Content/FlowerShop/images/remove.png' alt='remove' /><br />删除</a></td>");
                        str.Append("</tr>");
                    }
                    str.Append("<tr bgcolor='#41581B'>");
                    str.Append("<td colspan='4'><a href='javascript:;' id='allcheck'><strong>全选/</strong></a><a href='javascript:;' id='fancheck'><strong>反选/</strong></a><a href='javascript:;' id='delecheck'><strong>全不选</strong></a></td>");
                    str.Append("<td align='right'><h4>总价格:</h4></td>");
                    str.Append("<td align='right'>￥<label id='zj'>0</label></td>");
                    str.Append("<td></td>");
                    str.Append("</tr>");
                    return Json(str.ToString(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
                }
            }
        }
        //删除购物车
        public ActionResult DeleteCarVail(int uid,int gid)
        {
            JsonModel jm = new JsonModel();
            OrDetailId orDetail = new OrDetailId();
            orDetail.UserId = uid;
            orDetail.GId = gid;
            int n = bll.deleteOrdetail(orDetail);
            if (n > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有删除成功！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        //修改购物车数量和金额
        public ActionResult UpdateCarVail(int num,decimal total,int Gid)
        {
            JsonModel jm = new JsonModel();
            OrDetailId orDetail = new OrDetailId();
            orDetail.num = num;
            orDetail.total = total;
            orDetail.GId = Gid;
            int n = bll.UpOrdetail(orDetail);
            if (n > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有加入购物车成功，请重新加入";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        //提交订单
        public ActionResult AddOrderVail(int uid,int len,float zj,string str)
        {
            JsonModel jm = new JsonModel();
            string s1 = str.Substring(10);
            Order order1 = new Order();
            order1.UId = uid;
            order1.Onum = len;
            order1.Oprice = zj;
            order1.state = 2;//1是付款，2是未付款
            order1.createTime = DateTime.Now;
            bool minxi=true;
            int orderid=0;
            //提交订单
            int n = bll.AddOrdervail(order1);
            if (n > 0)
            {
                DataSet ds = new DataSet();
                //检查添加的订单编号
                ds = bll.GetOrderid();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    orderid = Convert.ToInt32(ds.Tables[0].Rows[0]["orderId"]);
                    Orderminxi orderminxi = new Orderminxi();
                    orderminxi.orderid = orderid;
                    DataSet ds1 = new DataSet();
                    //查询购物车中选择的商品
                    ds1 = bll.SeleOrdetail(s1);
                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        for (int i = 0; i < ds1.Tables[0].Rows.Count; i++)
                        {
                            //查询商品表中的库存量
                            DataSet ds2 = new DataSet();
                            ds2 = bll.Getgoods(Convert.ToInt32(ds1.Tables[0].Rows[i]["GId"].ToString()));
                            Goods goods = new Goods();
                            goods.Gnumber = Convert.ToInt32(ds2.Tables[0].Rows[0]["Gnumber"].ToString());
                            goods.GpNum = Convert.ToInt32(ds2.Tables[0].Rows[0]["GpNum"].ToString());
                            if(goods.Gnumber>0)
                            {
                                orderminxi.sid = Convert.ToInt32(ds1.Tables[0].Rows[i]["GId"]);
                                orderminxi.snum = Convert.ToInt32(ds1.Tables[0].Rows[i]["num"]);
                                orderminxi.sprice = Convert.ToDouble(ds1.Tables[0].Rows[i]["total"]);
                                int gnum = Convert.ToInt32(goods.Gnumber) - Convert.ToInt32(orderminxi.snum);
                                int snum = Convert.ToInt32(goods.GpNum) + Convert.ToInt32(orderminxi.snum);
                                if(gnum>0)
                                {
                                    //添加订单明细
                                    int p = bll.AddOrderminvail(orderminxi);
                                    if (p > 0)
                                    {
                                        //修改商品库存量
                                        int b=bll.Updategoodsnum(gnum,snum, Convert.ToInt32(ds1.Tables[0].Rows[i]["GId"]));
                                        //删除购物车中已购买的商品
                                        if (bll.deleteOrdetail(Convert.ToInt32(ds1.Tables[0].Rows[i]["orDetailId"])) > 0&&b>0)
                                        {
                                            minxi = true;
                                        }
                                    }
                                    else
                                    {
                                        minxi = false;
                                    }
                                }
                                else
                                {
                                    jm.msg = "商品库存量不足";
                                }
                                
                            }
                            else
                            {
                                jm.msg = "商品库存量不足";
                            }
                           
                        }
                    }
                }
                if(minxi==true)
                {
                    jm.status = 1;
                    jm.msg =orderid.ToString();
                }
                else
                {
                    jm.status = 0;
                    jm.msg = "没有添加订单明细成功！";
                }
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有添加订单成功！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion
        
        #region 店铺
        public ActionResult About()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        //加载到首页
        public ActionResult shopIndex(int sid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.sid = sid;
            return View();
        }

        public ActionResult getShopgoods1(int sid,string name)
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getshopgoods1(sid,name);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int j = i + 1;
                    if (j % 4 == 0)
                    {
                        str.Append("<div class='product_box no_margin_right'>");
                    }
                    else
                    {
                        str.Append("<div class='product_box'>");
                    }
                    str.Append("<a href = 'shoppingCart'>");
                    str.Append("<img src = '/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='floral set " + j + "' /></a>");
                    str.Append("<h3>" + ds.Tables[0].Rows[i]["Gintroduce"] + "--" + ds.Tables[0].Rows[i]["Gname"] + "</h3>");
                    str.Append("<p class='product_price'>￥" + ds.Tables[0].Rows[i]["Gprice"] + "</p>");
                    str.Append("<p class='add_to_cart' id='" + ds.Tables[0].Rows[i]["GId"] + "'>");
                    str.Append("<a href = '#' id='AddshopCar'>详情</a>");
                    int n = Convert.ToInt32(ds.Tables[0].Rows[i]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                    str.Append("<a href='javascript:;' onclick=" + url + ">加入购物车</a>");
                    str.Append("</p></div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        
        public ActionResult getShopgoods(int sid)
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.Getshopgoods(sid);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    int j = i + 1;
                    if (j % 4 == 0)
                    {
                        str.Append("<div class='product_box no_margin_right'>");
                    }
                    else
                    {
                        str.Append("<div class='product_box'>");
                    }
                    str.Append("<a href = 'shoppingCart'>");
                    str.Append("<img src = '/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='floral set " + j + "' /></a>");
                    str.Append("<h3>" + ds.Tables[0].Rows[i]["Gintroduce"] + "--" + ds.Tables[0].Rows[i]["Gname"] + "</h3>");
                    str.Append("<p class='product_price'>￥" + ds.Tables[0].Rows[i]["Gprice"] + "</p>");
                    str.Append("<p class='add_to_cart' id='" + ds.Tables[0].Rows[i]["GId"] + "'>");
                    str.Append("<a href = '#' id='AddshopCar'>详情</a>");
                    int n = Convert.ToInt32(ds.Tables[0].Rows[i]["GId"].ToString());
                    string url = "getnum('/FlowerShop/AddCainum?gid=" + n + "')";
                    str.Append("<a href='javascript:;' onclick=" + url + ">加入购物车</a>");
                    str.Append("</p></div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult ShopVail()
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetShop();
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string url = "shopIndex?sid=" + Convert.ToInt32(ds.Tables[0].Rows[i]["SId"].ToString());
                    str.Append("<li><div class='shop_img'><a href="+url+"><img src='/Content/FlowerShop/Img/"+ds.Tables[0].Rows[i]["SURL"]+ "' /></a></div>");
                    str.Append("<div class='shop_text'><a href=" + url + "> " + ds.Tables[0].Rows[i]["Sname"] + "</a><br />");
                    str.Append("<p>"+ds.Tables[0].Rows[i]["Sintroduce"]+"</p></div>");
                    str.Append("<div class='shop_go'><a href=" + url + " > 进店逛逛 &nbsp; &nbsp;<img src = '/Content/FlowerShop/Img/go.png' /></a></div></li>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult ShopVail1(string name)
        {
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetShop1(name);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    string url = "shopIndex?sid=" + Convert.ToInt32(ds.Tables[0].Rows[i]["SId"].ToString());
                    str.Append("<li><div class='shop_img'><a href=" + url + "><img src='/Content/FlowerShop/Img/" + ds.Tables[0].Rows[i]["SURL"] + "' /></a></div>");
                    str.Append("<div class='shop_text'><a href=" + url + "> " + ds.Tables[0].Rows[i]["Sname"] + "</a><br />");
                    str.Append("<p>" + ds.Tables[0].Rows[i]["Sintroduce"] + "</p></div>");
                    str.Append("<div class='shop_go'><a href=" + url + " > 进店逛逛 &nbsp; &nbsp;<img src = '/Content/FlowerShop/Img/go.png' /></a></div></li>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("对不起，没有找到货品", JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        #region 订单明细表
        public ActionResult products()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult GetminVail(int uid)
        {
            JsonModel jm = new JsonModel();
            if (uid == 0)
            {
                return Json("登陆已失效，请重新登陆。", JsonRequestBehavior.AllowGet);
            }
            else
            {
                StringBuilder str = new StringBuilder();
                str.Append("<tr bgcolor='#395015'>");
                str.Append("<th width='7%' align='left'></th>");
                str.Append("<th width='20%' align='center'>图片</th>");
                str.Append("<th width='17.8%' align='center'>名称</th>");
                str.Append("<th width='8.5%' align='center'>数量</th>");
                str.Append("<th width='16.4%' align='center'>价格</th>");
                str.Append("<th width='15.4%' align='center'>状态</th>");
                str.Append("<th width='8%' align='center'></th>");
                str.Append("</tr>");
                DataSet ds = new DataSet();
                ds = bll.Getorderminxi(uid);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int j = i + 1;
                        str.Append("<tr bgcolor='#41581B' style='border-bottom:solid 1px red;'>");
                        str.Append("<td align='center'><input type='button' class='minxi' id='pl" + ds.Tables[0].Rows[i]["sid"] + "' name='quhuo' value='评论' /></td>");
                        str.Append("<td align='center'><img src='/Content/FlowerShop/product/" + ds.Tables[0].Rows[i]["Gpicture"] + "' alt='flower image " + j + "' /></td>");
                        str.Append("<td align='center'>" + ds.Tables[0].Rows[i]["Gname"] + "</td>");
                        str.Append("<td align='center'>" + ds.Tables[0].Rows[i]["snum"] + "</td>");
                        str.Append("<td align='center'>￥" + ds.Tables[0].Rows[i]["sprice"] + "</td>");
                        if(Convert.ToInt32(ds.Tables[0].Rows[i]["isget"].ToString())==1)
                        {
                            str.Append("<td align='center'><input type='button' class='minxi' id='minxi"+ ds.Tables[0].Rows[i]["minxiid"] + "' name='delecar' value='未取货' /></td>");
                        }
                        else
                        {
                            str.Append("<td align='center'> 已取货</td>");
                        }
                        str.Append("<td align='center'><input type='button' class='minxi' id='" + ds.Tables[0].Rows[i]["minxiid"] + "' name='delete' value='删除' /></td>");
                        str.Append("</tr>");
                    }
                    //str.Append("<tr bgcolor='#41581B'>");
                    //str.Append("<td colspan='3'><a href='#' id='allcheck'><strong>全选/</strong></a><a href='#' id='fancheck'><strong>反选/</strong></a><a href='#' id='delecheck'><strong>全不选</strong></a></td>");
                    //str.Append("<td colspan='3' align='right'><a href='#' id='delete'>删除</a></td>");
                    //str.Append("</tr>");
                    return Json(str.ToString(), JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("对不起，您还没有购买商品", JsonRequestBehavior.AllowGet);
                }
            }
        }
        //修改取货状态
        public ActionResult UpminxiVail(int minxiid)
        {
            JsonModel jm = new JsonModel();
            int n = bll.Upminxitail(minxiid);
            if(n>0)
            {
                jm.status = 1;
                jm.msg = "修改成功！";
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有添加订单成功！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        //删除订单明细
        public ActionResult DeleteminxiVail(int minxiid)
        {
            JsonModel jm = new JsonModel();
            DataSet ds1 = bll.Getorderid(minxiid);
            int n = bll.deleteminxitail(minxiid);
            if (n > 0)
            {
                DataSet ds = bll.Getminxiid(Convert.ToInt32(ds1.Tables[0].Rows[0]["orderid"].ToString()));
                if (ds.Tables[0].Rows.Count>0)
                {
                    jm.status = 1;
                    jm.msg = "删除订单成功！";
                }
                else
                {
                    int orderid = Convert.ToInt32(ds1.Tables[0].Rows[0]["orderid"]);
                    int m = bll.deletetail(orderid);
                    if(m>0)
                    {
                        jm.status = 1;
                        jm.msg = "删除成功！";
                    }
                    else
                    {
                        jm.status = 0;
                        jm.msg = "删除订单总表失败！";
                    }
                }
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有删除订单成功！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 结算
        public ActionResult checkout(int orderid)
        {
            
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.UserbankCard = UserbankCard;
            ViewBag.orderid = orderid;
            DataSet ds1 = bll.GetOrderprice(orderid);
            ViewBag.zj = Convert.ToDecimal(ds1.Tables[0].Rows[0][0].ToString());
            return View();
        }
        //修改订单表中付款状态
        public ActionResult UpdateOrderVail(int orderid,int dizhi)
        {
            JsonModel jm = new JsonModel();
            int n = bll.UpdateOrdetail(orderid, dizhi);
            if(n>0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有付款成功，请重新付款";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetdizhiVail(int uid)
        {
            JsonModel jm = new JsonModel();
            StringBuilder str = new StringBuilder();
            if (uid == 0)
            {
                return Json("登陆已失效，请重新登陆。", JsonRequestBehavior.AllowGet);
            }
            else
            {
                str.Append("<tr bgcolor='#395015'>");
                str.Append("<th width='10%' align='left'></th>");
                str.Append("<th width='13%' align='center'>姓名</th>");
                str.Append("<th width='20%' align='center'>电话</th>");
                str.Append("<th width='35%' align='center'>地址</th>");
                str.Append("<th width='22%' align='center'></th>");
                str.Append("</tr>");
                DataSet ds = new DataSet();
                ds = bll.Getdizhiid(uid);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        int j = i + 1;
                        str.Append("<tr bgcolor='#41581B'>");
                        str.Append("<td><input id='" + ds.Tables[0].Rows[i]["adressid"] + "' type='radio' name='check'/></td>");
                        str.Append("<td align='center'>" + ds.Tables[0].Rows[i]["newname"] + "</td>");
                        str.Append("<td align='center'>" + ds.Tables[0].Rows[i]["phone"] + "</td>");
                        str.Append("<td>" + ds.Tables[0].Rows[i]["adress"] + "</td>");
                        str.Append("<td align='center'><input type='button' name='delete1' id='del" + ds.Tables[0].Rows[i]["adressid"] + "' value='删除' /></td>");
                        str.Append("</tr>");
                    }
                    //str.Append("<tr bgcolor='#41581B'>");
                    //str.Append("<td colspan='5' align='center'><a href='/FlowerShop/AddAdress?orederid= "+ orderid + "'>增加地址</a></td>");
                    
                    //str.Append("</tr>");


                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
        }
        //删除地址
        public ActionResult dateadressVail(int adressid)
        {
            JsonModel jm = new JsonModel();
            int n = bll.dateadress(adressid);
            if (n > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有删除成功，请重新删除";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 添加新事物
        public ActionResult contact()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult AddnewGoods(string Imgurl,string input_field,string messagetext)
        {
            JsonModel jm = new JsonModel();
            Ngoods n = new Ngoods();
            n.Nimg = Imgurl;
            n.Nname = input_field;
            n.NJS = messagetext;

            int m = bll.AddnewGoods(n);
            if(m>0)
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

        public ActionResult SavePicture(string picString)
        {
            JsonModel jm = new JsonModel();
            var tmpArr = picString.Split(',');
            byte[] bytes = Convert.FromBase64String(tmpArr[1]);

            MemoryStream ms = new MemoryStream(bytes);
            ms.Write(bytes, 0, bytes.Length);
            var img = Image.FromStream(ms, true);
            var path = System.AppDomain.CurrentDomain.BaseDirectory;
            var imagesPath = System.IO.Path.Combine(path, @"Content\NewGoods\" + "\\");
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

        #region 论坛
        public ActionResult faqs()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();

        }
        //加载论坛内容
        public ActionResult addluntan()
        {
            JsonModel jm = new JsonModel();
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetForum();
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    DataSet ds1 = new DataSet();
                    str.Append("<div class='luntan'><div class='pl_img'>");
                    str.Append("<img src='/Content/FlowerShop/images/" + ds.Tables[0].Rows[i]["ImgUrl"] + "' />&nbsp;&nbsp;<h4 style='float:left;'>" + ds.Tables[0].Rows[i]["Uname"] + ":</h4></div>");
                    str.Append("<div class='cleaner'></div>");
                    str.Append("<p class='fbxd'>&nbsp;&nbsp;&nbsp;" + ds.Tables[0].Rows[i]["messageText"] + "&nbsp;&nbsp;&nbsp;<input name='plbuttom' type='button' id='" + ds.Tables[0].Rows[i]["FId"] + "' value='评论' /></p>");

                    ds1 = bll.GetPLForum(Convert.ToInt32(ds.Tables[0].Rows[i]["FId"].ToString()));
                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        for (int m = 0; m < ds1.Tables[0].Rows.Count; m++)
                        {
                            int j = m + 1;
                            str.Append("<div class='pinglun'>");
                            str.Append("<div class='pl_left'><img src='/Content/FlowerShop/images/" + ds1.Tables[0].Rows[m]["ImgUrl"] + "' /></div>");
                            str.Append("<div class='pl_right'>");
                            str.Append("<p class='p_a'><span>" + j + "楼</span> 评论时间:" + ds1.Tables[0].Rows[m]["Pltime"] + "</p>");
                            str.Append("<p>" + ds1.Tables[0].Rows[m]["plnr"] + "</p>");
                            str.Append("</div></div>");
                        }
                    }
                    str.Append("</div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("还没有人发表论坛！", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult addplnr(int fid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.fid = fid;
            return View();
        }
        public ActionResult AddplFroum(int fid, string text)
        {
            JsonModel jm = new JsonModel();
            PLb p = new PLb();
            p.FId = fid;
            p.UId = CurrentUserID;
            p.plnr = text;
            p.Pltime = DateTime.Now;
            int n = bll.InFroumpl(p);
            if (n > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有评论成功，请重新评论";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region 商品详情页
        public ActionResult productdetail(int gid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.gids = gid;
            return View();
        }
        public ActionResult GoodsoneVail(int gid)
        {
            DataSet ds = new DataSet();
            StringBuilder steHtml = new StringBuilder();
            steHtml.Append("<h2>Product Detail</h2>");
            steHtml.Append("<div class='content_half left'>");
            ds = bll.Getonegoods(gid);
            if (ds.Tables[0].Rows.Count > 0)
            {
                steHtml.Append("<a rel= 'lightbox' href='/Content/FlowerShop/product/" + ds.Tables[0].Rows[0]["bigImgUrl"] + "'><img src='/Content/FlowerShop/product/" + ds.Tables[0].Rows[0]["Gpicture"] + "' alt='yellow flowers' /></a>");
                steHtml.Append("</div>");
                steHtml.Append("<div class='content_half left'>");
                steHtml.Append("<table>");
                steHtml.Append("<tr>");
                steHtml.Append("<td width='130'>价格:</td>");
                steHtml.Append("<td width='84'>￥<label id='Gprice'>" + ds.Tables[0].Rows[0]["Gprice"] + "</label></td>");
                steHtml.Append("</tr>");
                steHtml.Append("<tr>");
                steHtml.Append("<td>货存量:</td>");
                steHtml.Append("<td>" + ds.Tables[0].Rows[0]["Gnumber"] + "</td>");
                steHtml.Append("</tr>");
                steHtml.Append("<tr><td>数量</td><td><input type='text' id='numshop' value='1' size='6' maxlength='2' /></td></tr>");
                steHtml.Append("</table>");
                steHtml.Append("<div class='cleaner h20'></div>");
                steHtml.Append("<input type='button' value='确定' class='button' id='addshoppingCart'/>");
                steHtml.Append("</div>");
                steHtml.Append("<div class='cleaner h40'></div>");
                steHtml.Append("<h4>Product Description</h4>");
                steHtml.Append("<p>" + ds.Tables[0].Rows[0]["Gintroduce"] + "</p>");
                steHtml.Append("<div class='cleaner h40'></div>");
                steHtml.Append("<div>");
                steHtml.Append("<table style='width: 100%; border: 1px solid #547323'>");
                steHtml.Append("<tr>");
                steHtml.Append("<td align='center' bgcolor='#41581b' colspan='3' style='height: 30px'>");
                steHtml.Append("评论信息");
                steHtml.Append("</td>");
                steHtml.Append("</tr>");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    steHtml.Append("<tr>");
                    steHtml.Append(" <td align='left' colspan='3' style='height: 24px;padding-left:20px;'>");
                    steHtml.Append(" 评论人：" + ds.Tables[0].Rows[i]["Uname"]);
                    steHtml.Append("&nbsp; &nbsp; &nbsp;时间：" + ds.Tables[0].Rows[i]["pltime"]);
                    steHtml.Append("</td>");
                    steHtml.Append("</tr>");
                    steHtml.Append("<tr>");
                    steHtml.Append("<td align='left' colspan='3' style='padding-left:20px;font-size:16px;'>");
                    steHtml.Append(" 内容：" + ds.Tables[0].Rows[i]["neirong"]);
                    steHtml.Append("</td>");
                    steHtml.Append("</tr>");
                }
                //steHtml.Append("<tr>");
                //steHtml.Append("<td align='center' colspan='3' style='height: 24px'>");
                //steHtml.Append("共【" + Paging.TotalPages(ds.Tables[0].Rows.Count) + "】页 &nbsp; &nbsp; &nbsp;");
                //steHtml.Append("当前第【1】页&nbsp;");
                //steHtml.Append("<a href='#' id='firstpaper'>首页</a>");
                //steHtml.Append(" &nbsp; &nbsp; &nbsp;<a href='#'>上一页</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;");
                //steHtml.Append("<a href='#'>下一页</a>");
                //steHtml.Append(" &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;");
                //steHtml.Append("<a href='#'>尾页</a>");
                //steHtml.Append("</td>");
                //steHtml.Append("</tr>");
                steHtml.Append("</table>");
                steHtml.Append("</div>");
            }
            else
            {
                DataSet ds1 = bll.Getgoods(gid);
                if (ds1.Tables[0].Rows.Count > 0)
                {
                    steHtml.Append("<a rel= 'lightbox' href='/Content/FlowerShop/product/"+ds1.Tables[0].Rows[0]["bigImgUrl"] + "'><img src='/Content/FlowerShop/product/" + ds1.Tables[0].Rows[0]["Gpicture"] + "' alt='yellow flowers' /></a>");
                    steHtml.Append("</div>");
                    steHtml.Append("<div class='content_half left'>");
                    steHtml.Append("<table>");
                    steHtml.Append("<tr>");
                    steHtml.Append("<td width='130'>价格:</td>");
                    steHtml.Append("<td width='84'>￥<label id='Gprice'>" + ds1.Tables[0].Rows[0]["Gprice"] + "</label></td>");
                    steHtml.Append("</tr>");
                    steHtml.Append("<tr>");
                    steHtml.Append("<td>货存量:</td>");
                    steHtml.Append("<td>" + ds1.Tables[0].Rows[0]["Gnumber"] + "</td>");
                    steHtml.Append("</tr>");
                    steHtml.Append("<tr><td>数量</td><td><input type='text' id='numshop' value='1' size='6' maxlength='2' /></td></tr>");
                    steHtml.Append("</table>");
                    steHtml.Append("<div class='cleaner h20'></div>");
                    steHtml.Append("<input type='button' value='确定' class='button' id='addshoppingCart'/>");
                    steHtml.Append("</div>");
                    steHtml.Append("<div class='cleaner h40'></div>");
                    steHtml.Append("<h4>Product Description</h4>");
                    steHtml.Append("<p>" + ds1.Tables[0].Rows[0]["Gintroduce"] + "</p>");
                    steHtml.Append("<div class='cleaner h40'></div>");
                    steHtml.Append("<div>");
                    steHtml.Append("<table style='width: 100%; border: 1px solid #547323'>");
                    steHtml.Append("<tr>");
                    steHtml.Append("<td align='center' bgcolor='#41581b' colspan='3' style='height:30px'>");
                    steHtml.Append("评论信息");
                    steHtml.Append("</td>");
                    steHtml.Append("</tr>");
                    steHtml.Append("<tr>");
                    steHtml.Append(" <td align='center' colspan='3' style='height:80px;font-size:20px;'>");
                    steHtml.Append("暂无评论内容！");
                    steHtml.Append("</td>");
                    steHtml.Append("</tr>");
                    //steHtml.Append("<tr>");
                    //steHtml.Append("<td align='center' colspan='3' style='height: 24px'>");
                    //steHtml.Append("共【1】页 &nbsp; &nbsp; &nbsp;");
                    //steHtml.Append("当前第【1】页&nbsp;");
                    //steHtml.Append("<a href='#'>首页</a>");
                    //steHtml.Append(" &nbsp; &nbsp; &nbsp;<a href='#'>上一页</a> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;");
                    //steHtml.Append("<a href='#'>下一页</a>");
                    //steHtml.Append(" &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;");
                    //steHtml.Append("<a href='#'>尾页</a>");
                    //steHtml.Append("</td>");
                    //steHtml.Append("</tr>");
                    steHtml.Append("</table>");
                    steHtml.Append("</div>");
                }
                else
                {
                    steHtml.Append("对不起，暂无商品信息！");
                    steHtml.Append("</div>");
                }
            }
            return Json(steHtml.ToString(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddshoppingCart(int gid,int num,int uid,decimal Gprice)
        {
            JsonModel jm = new JsonModel();
            decimal total;
            if(uid==0)
            {
                jm.status = 0;
                jm.msg = "登陆已失效，请重新登陆。";
            }
            else
            {
                DataSet ds = new DataSet();
                ds = bll.GetShop1(gid,uid);
                if(ds.Tables[0].Rows.Count>0)
                {
                    OrDetailId orDetail = new OrDetailId();
                    orDetail.num = Convert.ToInt32(ds.Tables[0].Rows[0]["num"])+num;
                    orDetail.total = orDetail.num * Gprice;
                    orDetail.GId = gid;
                    int n = bll.UpOrdetail(orDetail);
                    if (n > 0)
                    {
                        jm.status = 1;
                    }
                    else
                    {
                        jm.status = 0;
                        jm.msg = "没有加入购物车成功，请重新加入";
                    }
                }
                else
                {
                    total = num * Gprice;
                    OrDetailId orDetailId = new OrDetailId();
                    orDetailId.GId = gid;
                    orDetailId.num = num;
                    orDetailId.UserId = uid;
                    orDetailId.price = Gprice;
                    orDetailId.createTime = DateTime.Now;
                    orDetailId.total = total;
                    int n = bll.InsetGw(orDetailId);
                    if (n > 0)
                    {
                        jm.status = 1;
                    }
                    else
                    {
                        jm.status = 0;
                        jm.msg = "没有加入购物车成功，请重新加入";
                    }
                }
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 发布论坛
        public ActionResult sendForum()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult AddFroum(string text)
        {
            ViewBag.UId = CurrentUserID;
            JsonModel jm = new JsonModel();
            Forum p = new Forum();
            p.UId = CurrentUserID;
            p.messageText = text;
            p.fbtime = DateTime.Now;
            int n = bll.InFroum(p);
            if (n > 0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "没有发表日志成功，请重新发表！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 查看论坛
        public ActionResult showForum()
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            return View();
        }
        public ActionResult addownluntan()
        {
            JsonModel jm = new JsonModel();
            StringBuilder str = new StringBuilder();
            DataSet ds = new DataSet();
            ds = bll.GetForum(CurrentUserID);
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    DataSet ds1 = new DataSet();
                    str.Append("<div class='luntan'><div class='pl_img'>");
                    str.Append("<img src='/Content/FlowerShop/images/" + ds.Tables[0].Rows[i]["ImgUrl"] + "' />&nbsp;&nbsp;<h4 style='float:left;'>" + ds.Tables[0].Rows[i]["Uname"] + ":</h4></div>");
                    str.Append("<div class='cleaner'></div>");
                    str.Append("<p class='fbxd'>&nbsp;&nbsp;&nbsp;" + ds.Tables[0].Rows[i]["messageText"] + "&nbsp;&nbsp;&nbsp;<input name='plbuttom' type='button' id='" + ds.Tables[0].Rows[i]["FId"] + "' value='删除' /></p>");

                    ds1 = bll.GetPLForum(Convert.ToInt32(ds.Tables[0].Rows[i]["FId"].ToString()));
                    if (ds1.Tables[0].Rows.Count > 0)
                    {
                        for (int m = 0; m < ds1.Tables[0].Rows.Count; m++)
                        {
                            int j = m + 1;
                            str.Append("<div class='pinglun'>");
                            str.Append("<div class='pl_left'><img src='/Content/FlowerShop/images/" + ds1.Tables[0].Rows[m]["ImgUrl"] + "' /></div>");
                            str.Append("<div class='pl_right'>");
                            str.Append("<p class='p_a'><span>" + j + "楼</span> 评论时间:" + ds1.Tables[0].Rows[m]["Pltime"] + "</p>");
                            str.Append("<p>" + ds1.Tables[0].Rows[m]["plnr"] + "</p>");
                            str.Append("</div></div>");
                        }
                    }
                    str.Append("</div>");
                }
                return Json(str.ToString(), JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("还没有人发表论坛！", JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult deleteForum(int fid)
        {
            JsonModel jm = new JsonModel();
            int n = bll.deleteForum(fid);
            if(n>0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "删除失败！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        
        #endregion

        #region 评论商品
        //评论商品
        public ActionResult plgoods(int gid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.gid = gid;
            return View();
        }
        public ActionResult AddplGoods(int gid,int uid,int pl,string text)
        {
            JsonModel jm = new JsonModel();
            Splb pl1 = new Splb();
            pl1.uid = uid;
            pl1.gid = gid;
            pl1.neirong = text;
            pl1.state = pl;
            pl1.pltime = DateTime.Now;
            int n = bll.Insppl(pl1);
            if(n>0)
            {
                jm.status = 1;
            }
            else
            {
                jm.status = 0;
                jm.msg = "评论失败！";
            }
            return Json(jm, JsonRequestBehavior.AllowGet);
        }
        #endregion

        #region 增加地址
        public ActionResult AddAdress(int orederid)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;
            ViewBag.orederid = orederid;
            return View();
        }
        public ActionResult adressSave(string name,string phone,string str)
        {
            ViewBag.Imgurl = Imgurl;
            ViewBag.uname = CurrentUserName;
            ViewBag.UId = CurrentUserID;

            JsonModel json = new JsonModel();
            dizhi adress2 = new dizhi();
            
           if(bll.Getadress(CurrentUserID,str,phone))
            {
                json.status = 2;
                return Json(json);
            }
            else
            {
                adress2.newname = name;
                adress2.adress = str;
                adress2.phone = phone;
                adress2.uid = CurrentUserID;
                json.status = bll.Addadress(adress2);
            }
            return Json(json, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}