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
    public class UserDAL
    {
        public UserDAL()
        { }
        /// <summary>
        /// 查询用户
        /// </summary>
        public DataSet GetUserNameList(Users users)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  top 1 * from Users ");
            strSql.Append(" where Uname=@Uname and Pwd=@Pwd");
            SqlParameter[] parameters = {
                    new SqlParameter("@Uname",SqlDbType.NVarChar),
                    new SqlParameter("@Pwd",SqlDbType.NVarChar)
            };
            parameters[0].Value = users.Uname;
            parameters[1].Value = users.Pwd;
            return DbHelperSQL.Query(strSql.ToString(), parameters);
        }
        public DataSet GetUserList()
        {
            string strSql = "select p.Uname,p.Sex,p.roleName,p.truename,p.UId from VURSer p";
            return DbHelperSQL.GetDataSet(strSql);
        }
        //查询用户密码
        public DataSet GetUseroldPw(int uid)
        {
            string strSql = "select u.Pwd from Users u where UId="+uid;
            return DbHelperSQL.GetDataSet(strSql);
        }
        /// <summary>
        /// 添加用户
        /// </summary>
        public int AddUser(Users users)
        {
            SqlParameter[] parameters = {
                new SqlParameter("@Uname",users.Uname),
                new SqlParameter("@Pwd",users.Pwd),
                new SqlParameter("@roleId",users.roleId)
            };
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into Users(Uname,Pwd,roleId,createTime) ");
            strSql.Append("values('" + users.Uname + "','" + users.Pwd + "'," + users.roleId + ",'" + DateTime.Now + "')");
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //修改密码
        public int UpUserPw(Users users)
        {
            string strSql = "update Users set Pwd='"+users.Pwd+"' where UId="+users.UId;
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
        //完善信息
        public int UpUser(Users users)
        {
            string strSql = "update Users set Sex='"+users.Sex+"',Birthday='"+users.Birthday+"',ImgUrl='"+users.ImgUrl+"',bankCard='"+users.bankCard+"',Email='"+users.Email+"' where UId=" + users.UId;
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }

        //查询省、市、镇
        public DataSet GetProvince()
        {
            string strSql = "select * from S_Province";
            return DbHelperSQL.GetDataSet(strSql.ToString());
        }
        public DataSet GetCity(int provinceId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from S_City ");
            strSql.Append("where ProvinceID=@ProvinceID");
            SqlParameter[] parameters = {
                    new SqlParameter("@ProvinceID",SqlDbType.BigInt)
            };
            parameters[0].Value = provinceId;
            return DbHelperSQL.Query(strSql.ToString(), parameters);
        }
        public DataSet GetDistry(int cityId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from S_District ");
            strSql.Append("where CityID=@CityID");
            SqlParameter[] parameters = {
                    new SqlParameter("@CityID",SqlDbType.BigInt)
            };
            parameters[0].Value = cityId;
            return DbHelperSQL.Query(strSql.ToString(), parameters);
        }
    }
}
