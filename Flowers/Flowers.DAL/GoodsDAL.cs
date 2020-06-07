using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Flowers.Model;
using System.Data;
using System.Data.SqlClient;

namespace Flowers.DAL
{
    public class GoodsDAL
    {
        public GoodsDAL()
        { }
        #region 查询商品
        public DataSet Getgoods()
        {
            string strSql = "select * from Goods where MenuID not in(1,2)";
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet Getgoods1(int menuId)
        {
            string strSql = "select * from Goods where MenuID="+ menuId;
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet Getshopgoods(int sid)
        {
            string strSql = "select * from Goods where SId=" + sid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet Getshopgoods1(int sid,string name)
        {
            string strSql = "select * from Goods where SId="+sid+" and CHARINDEX('"+name+"',Gname)>0";
            return DbHelperSQL.GetDataSet(strSql);
        }

        //查询论坛
        public DataSet GetForum()
        {
            string strSql = "select * from VForum";
            return DbHelperSQL.GetDataSet(strSql);
        }
        //查询个人论坛
        public DataSet GetForum(int uid)
        {
            string strSql = "select * from VForum where UId="+uid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        //查询论坛的评论
        public DataSet GetPLForum(int fid)
        {
            string strSql = "select* from VPLForum where FId="+fid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet GetGoodsList()
        {
            string strSql = "select p.GId,p.Gname,p.Gprice,p.Gnumber,p.GpNum from Goods p where SId=1";
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet Getgoods(int gid)
        {
            string strSql = "select * from Goods where GId="+gid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        public DataSet Getonegoods(int gid)
        {
            string strSql = "select * from Vsplb where GId=" + gid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        //查询推荐商品
        public DataSet GetLuck()
        {
            string sql = "select * from Goods where MenuID=1";
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet Getslider()
        {
            string sql = "select * from Goods where MenuID=2";
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询关键字
        public DataSet Getguanj(string name)
        {
            string sql = "select * from Goods where CHARINDEX('"+name+"',Gname)>0";
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询分类菜单
        public DataSet GetMenu()
        {
            string sql = "select * from MenuPage where MenuID not in(1,2) ";
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet GetMenushop()
        {
            string sql = "select* from VUShop ";
            return DbHelperSQL.GetDataSet(sql);
        }
        
        public DataSet GetShop()
        {
            string sql = "select * from Shop";
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet GetShop1(string name)
        {
            string sql = "select * from Shop where CHARINDEX('"+name+"',Sname)>0";
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet GetShopCar(Users users)
        {
            string sql = "select * from VshopCar where UId="+users.UId;
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet GetShop1(int gid,int uid)
        {
            string sql = "select * from OrDetailId where GId="+gid+" and UserId=" + uid;
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询订单编号
        public DataSet GetOrderid()
        {
            string sql = "select top 1 p.orderId from[Order] p order by p.createTime desc";
            return DbHelperSQL.GetDataSet(sql);
        }
        public DataSet GetsOrdermin()
        {
            string sql = "select * from VOrderSminxi where SId=1";
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询订单价格
        public DataSet GetOrderprice(int n)
        {
            string sql = "select Oprice from [Order] where orderId="+n;
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询地址编号
        public DataSet Getdizhiid(int uid)
        {
            string sql = "select * from dizhi where uid=" + uid;
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询订单明细表
        public DataSet Getorderminxi(int uid)
        {
            string sql = "select * from VOderminxi where UId="+uid+" and state=1";
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询订单明细表
        public DataSet Getminxiid(int orderid)
        {
            string sql = "select * from Orderminxi where orderid="+orderid;
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询订单明细表
        public DataSet Getorderid(int minxiid)
        {
            string sql = "select * from Orderminxi where orderid=(select orderid from Orderminxi where minxiid="+ minxiid + ")";
            return DbHelperSQL.GetDataSet(sql);
        }
        //查询地址
        public bool Getadress(int uid,string adress,string phone)
        {
            string sql = "select * from dizhi where uid="+uid+" and adress='"+adress+"' and phone='"+phone+"'";
            DataSet ds= DbHelperSQL.GetDataSet(sql);
            if(ds.Tables[0].Rows.Count>0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
      
        #endregion
        //插入一条购物车数据
        public int InsertOD(OrDetailId orDetailId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into OrDetailId(GId,price,num,total,UserId,createTime) ");
            strSql.Append("values(" + orDetailId.GId + "," +orDetailId.price+ "," +orDetailId.num + "," + orDetailId.total+ "," +orDetailId.UserId + ",'" +orDetailId.createTime+ "')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条商品评论内容
        public int Insppl(Splb pl)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Splb(uid,gid,neirong,state,pltime) ");
            strSql.Append("values("+pl.uid+","+pl.gid+",'"+pl.neirong+"',"+pl.state+",'"+pl.pltime+"')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条论坛内容
        public int InFroum(Forum forum)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Forum(UId,messageText,fbtime) ");
            strSql.Append("values("+forum.UId+",'"+forum.messageText+"','"+forum.fbtime+"')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条论坛评论内容
        public int InFroumpl(PLb p)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into PLb(FId,UId,plnr,Pltime) ");
            strSql.Append("values("+p.FId+","+p.UId+",'"+p.plnr+"','"+p.Pltime+"')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条订单数据
        public int AddOrdervail(Order order1)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into [Order](UId,Onum,Oprice,state,dizhi,createTime) ");
            strSql.Append("values("+order1.UId+","+order1.Onum+","+order1.Oprice+","+order1.state+",1,'"+order1.createTime+"')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条地址
        public int Addadress(dizhi adree)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into dizhi(uid,adress,phone,newname) values("+adree.uid+",'"+adree.adress+"','"+adree.phone+"','"+adree.newname+"')");
            
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        
       
        //插入一条订单明细数据
        public int AddOrderminvail(Orderminxi order1)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert Orderminxi(sid,snum,sprice,orderid,isget) ");
            strSql.Append("values("+order1.sid+","+order1.snum+","+order1.sprice+","+order1.orderid+",1)");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条新事物数据
        public int AddnewGoods(Ngoods n)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Ngoods(Nimg,NJS,Nname) ");
            strSql.Append("values('"+n.Nimg+"','"+n.NJS+"','"+n.Nname+"')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //插入一条商品
        public int AddGoods(Goods n)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Goods(Gpicture,Gname,Gprice,Gintroduce,Gnumber,GpNum,SId,MenuID) ");
            strSql.Append("values('"+n.Gpicture+"','"+n.Gname+"',"+n.Gprice+",'"+n.Gintroduce+"',"+n.Gnumber+",0,1,5)");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }

        //修改一条订单明细数据
        public int Upminxitail(int minxiid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Orderminxi set isget=2 where minxiid=" + minxiid);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //修改一条购物车数据
        public int UpOrdetail(OrDetailId orDetail)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update OrDetailId set num="+orDetail.num+",total="+orDetail.total+" where GId="+orDetail.GId);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        public DataSet SeleOrdetail(string str)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from OrDetailId where orDetailId in("+str+")");
            return DbHelperSQL.GetDataSet(strSql.ToString());
        }
        //删除一条购物车数据
        public int deleteOrdetail(OrDetailId orDetail)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete OrDetailId where GId="+orDetail.GId+" and UserId="+orDetail.UserId);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //删除一条订单明细
        public int deleteminxitail(int minxiid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Orderminxi where minxiid=" + minxiid);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //删除一条订单
        public int deletetail(int minxiid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete [Order] where orderId=" + minxiid);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //删除一条论坛日志
        public int deleteForum(int fid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete Forum where FId=" + fid);
            if(DbHelperSQL.ExecuteSql(strSql.ToString())>0)
            {
                if (GetPLForum(fid).Tables[0].Rows.Count > 0)
                {
                    string sql = "delete PLb where FId =" + fid;
                    int n = DbHelperSQL.ExecuteSql(sql.ToString());
                    if (n > 0)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    return 1;
                }
            }
            else
            {
                return 0;
            }
        }
        
        //删除一条地址
        public int dateadress(int adressid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete dizhi where adressid=" + adressid);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        
        //删除一条购物车数据
        public int deleteOrdetail(int orDetailId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete OrDetailId where orDetailId=" + orDetailId);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //修改一条订单数据的付款状态
        public int UpdateOrdetail(int orderid,int dizhi)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update [Order] set state=1,dizhi="+dizhi+" where orderId=" + orderid);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //修改一条商品表库存量
        public int Updategoodsnum(int n,int m,int g)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update Goods set Gnumber="+n+",GpNum="+m+" where GId="+g);
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }


    }
}
