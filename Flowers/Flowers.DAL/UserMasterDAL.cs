using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Flowers.Model;

namespace Flowers.DAL
{
    public class UserMasterDAL
    {
        public UserMasterDAL() { }

        public Users GetModel(int UId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select * from Users  where UId="+UId);
            return DbHelperSQL.GetModel(strSql.ToString());
        }
        public DataSet GetList()
        {
            string str = "select * from Role";
            return DbHelperSQL.Query(str);
        }
        public DataSet GetList1()
        {
            string str = "select * from Shop";
            return DbHelperSQL.Query(str);
        }
        public int Update(Users model)
        {
            string strSql = "update Users set Uname='"+model.Uname+"',roleId="+model.roleId+",Email='"+model.Email+"' where UId="+model.UId;
            return DbHelperSQL.ExecuteSql(strSql.ToString());
        }
    }
}
