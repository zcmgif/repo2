using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Flowers.DAL;
using Flowers.Model;

namespace Flowers.BLL
{
    public class GoodsBLL
    {
        private readonly GoodsDAL dal = new GoodsDAL();
        public GoodsBLL()
        { }
        public DataSet Getgoods()
        {
            return dal.Getgoods();
        }
        public DataSet GetMenushop()
        {
            return dal.GetMenushop();
        }
        public DataSet Getgoods(int gid)
        {
            return dal.Getgoods(gid);
        }
        public DataSet Getgoods1(int menuId)
        {
            return dal.Getgoods1(menuId);
        }
        public DataSet Getguanj(string name)
        {
            return dal.Getguanj(name);
        }
        public DataSet Getshopgoods1(int sid, string name)
        {
            return dal.Getshopgoods1(sid,name);
        }
        public DataSet GetsOrdermin()
        {
            return dal.GetsOrdermin();
        }
        public int AddGoods(Goods n)
        {
            return dal.AddGoods(n);
        }
        public DataSet GetShop1(string name)
        {
            return dal.GetShop1(name);
        }
        public DataSet Getonegoods(int gid)
        {
            return dal.Getonegoods(gid);
        }
        public DataSet GetLuck()
        {
            return dal.GetLuck();
        }
        public DataSet GetMenu()
        {
            return dal.GetMenu();
        }
        public DataSet Getslider()
        {
            return dal.Getslider();
        }
        public DataSet GetShop()
        {
            return dal.GetShop();
        }
        public int InsetGw(OrDetailId orDetailId)
        {
            return dal.InsertOD(orDetailId);

        }
        public DataSet GetShopCar(Users users)
        {
            return dal.GetShopCar(users);
        }
        public DataSet GetShop1(int gid,int uid)
        {
            return dal.GetShop1(gid,uid);
        }
        public int AddnewGoods(Ngoods n)
        {
            return dal.AddnewGoods(n);
        }
        public int UpOrdetail(OrDetailId orDetail)
        {
            return dal.UpOrdetail(orDetail);
        }
        public int deleteOrdetail(OrDetailId orDetail)
        {
            return dal.deleteOrdetail(orDetail);
        }
        public int AddOrdervail(Order order1)
        {
            return dal.AddOrdervail(order1);
        }
        public DataSet GetOrderid()
        {
            return dal.GetOrderid();
        }
        public DataSet SeleOrdetail(string str)
        {
            return dal.SeleOrdetail(str);
        }
        public int AddOrderminvail(Orderminxi order1)
        {
            return dal.AddOrderminvail(order1);
        }
        public int deleteOrdetail(int orDetailId)
        {
            return dal.deleteOrdetail(orDetailId);
        }
        public int UpdateOrdetail(int orderid, int dizhi)
        {
            return dal.UpdateOrdetail(orderid,dizhi);
        }
        public DataSet Getdizhiid(int uid)
        {
            return dal.Getdizhiid(uid);
        }
        public int Updategoodsnum(int n, int m, int g)
        {
            return dal.Updategoodsnum(n,m,g);
        }
        public DataSet Getorderminxi(int uid)
        {
            return dal.Getorderminxi(uid);
        }
        public int Upminxitail(int minxiid)
        {
            return dal.Upminxitail(minxiid);
        }
        public int deleteminxitail(int minxiid)
        {
            return dal.deleteminxitail(minxiid);
        }
        public DataSet GetGoodsList()
        {
            return dal.GetGoodsList();
        }
        public DataSet GetOrderprice(int n)
        {
            return dal.GetOrderprice(n);
        }
        public bool Getadress(int uid, string adress, string phone)
        {
            return dal.Getadress(uid,adress,phone);
        }
        public int Addadress(dizhi adree)
        {
            return dal.Addadress(adree);
        }
        public DataSet Getorderid(int minxiid)
        {
            return dal.Getorderid(minxiid);
        }
        public int deletetail(int minxiid)
        {
            return dal.deletetail(minxiid);
        }
        public DataSet Getminxiid(int orderid)
        {
            return dal.Getminxiid(orderid);
        }
        public int Insppl(Splb pl)
        {
            return dal.Insppl(pl);
        }
        public int dateadress(int adressid)
        {
            return dal.dateadress(adressid);
        }
        public DataSet GetForum()
        {
            return dal.GetForum();
        }
        public DataSet GetPLForum(int fid)
        {
            return dal.GetPLForum(fid);
        }
        public int InFroumpl(PLb p)
        {
            return dal.InFroumpl(p);
        }
        public DataSet Getshopgoods(int sid)
        {
            return dal.Getshopgoods(sid);
        }
        public int InFroum(Forum forum)
        {
            return dal.InFroum(forum);
        }
        public DataSet GetForum(int uid)
        {
            return dal.GetForum(uid);
        }
        public int deleteForum(int fid)
        {
            return dal.deleteForum(fid);
        }
    }
}
