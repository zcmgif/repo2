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
    public class UserBLL
    {
        private readonly UserDAL dal = new UserDAL();
        public UserBLL()
        { }
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public DataSet GetUserNameList(Users users)
        {

            return dal.GetUserNameList(users);
        }
        /// <summary>
        /// 添加用户
        /// </summary>
        public int AddUser(Users users)
        {
            return dal.AddUser(users);
        }
        //省、市、镇
        public DataSet Getprovince()
        {
            return dal.GetProvince();
        }
        public DataSet Getcity(int provinceId)
        {
            return dal.GetCity(provinceId);
        }
        public DataSet Getdistry(int cityId)
        {
            return dal.GetDistry(cityId);
        }
        public DataSet GetUserList()
        {
            return dal.GetUserList();
        }
        public DataSet GetUseroldPw(int uid)
        {
            return dal.GetUseroldPw(uid);
        }
        public int UpUserPw(Users users)
        {
            return dal.UpUserPw(users);
        }
        public int UpUser(Users users)
        {
            return dal.UpUser(users);
        }
    }
}
