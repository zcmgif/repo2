using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Flowers.Model;
using Flowers.DAL;
using System.Data;

namespace Flowers.BLL
{
    public class UserMasterBLL
    {
        UserMasterDAL dal = new UserMasterDAL();
        public UserMasterBLL() { }
        public Users GetModel(int UId)
        {
            return dal.GetModel(UId);
        }
        public DataSet GetList()
        {
            return dal.GetList();
        }
        public int Update(Users model)
        {
            return dal.Update(model);
        }
    }
}
