using Flowers.Common.Post;
using Flowers.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Flowers.BLL;
using System.Data;
using Flowers.Web.Models;
using Flowers.Common;

namespace Flowers.Web.Controllers
{
    public class AdminController : BaseController
    {
        UserMasterBLL ubll = new UserMasterBLL();
        UserBLL bll = new UserBLL();
        GoodsBLL gb = new GoodsBLL();
        // GET: Admin
        public ActionResult Index()
        {
            ViewBag.uname = CurrentUserName;
            
            return View();
        }
        #region 用户管理
        public ActionResult UserList()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }
        public ActionResult GetRoleList(int? page)
        {


            page = page == null ? 1 : page;
            //string sql = "select m.*,d.ItemText StatusName from tb_Role m  left join tb_Doption d on d.MoptionID=2 and d.ItemValue=m.Status where 1=1 ";

            string KeyWord = DNTRequest.GetString("KeyWord");
            string Status = DNTRequest.GetString("Status");
            int rows = DNTRequest.GetInt("rows", 10);
            //if (KeyWord != "")
            //{
            //    sql += " and (m.RoleName like '%" + KeyWord + "%') ";
            //}
            //if (Status != "")
            //{
            //    sql += " and (m.Status =" + Status + ")";
            //}
            int count = 0;
            DataSet ds = ubll.GetList();
            //DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, page.Value, rows, "RoleID desc"), out count);
            List<Role> list = TBToList<Role>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<Role>>();
            grid.total = count;
            grid.rows = list;

            //JavaScriptSerializer js = new JavaScriptSerializer();
            return Json(grid, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetUserList()
        {
            Users users = new Users();
            string strWhere = " 1=1 ";

            string KeyWord = DNTRequest.GetString("KeyWord");
            string RoleID = DNTRequest.GetString("RoleID");
            int rows = DNTRequest.GetInt("rows", 10);

            if (KeyWord != "")
            {
                strWhere += " and (Uname like '%" + KeyWord + "%') or ( UId in (select UId from .[dbo].Users where truename  like '%" + KeyWord + "%')) ";
            }
            if (RoleID != "")
            {
                strWhere += " and UId in (select UId from .[dbo].Users where roleId=" + RoleID.ToString() + ")";
            }
            int count = 0;
            //string sql = @"select p.Uname,p.Sex,p.roleId,p.truename,p.UId from Users p order by UId desc";
            //string sql = @"select * ,(select top 1 truename from [dbo].Users where UId=m.UId) as truename, (select roleName from Role where roleId in(select top 1  roleId from Users where UId=m.UId)) as roelName  from .[dbo].Users m  where  " + strWhere;
            DataSet ds=bll.GetUserList();
           // DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, 7, rows, "UId desc"), out count);
            List<VURser> list = TBToList<VURser>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<VURser>>();
            grid.total = count;
            grid.rows = list;
            return Json(grid, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetListtb_Store(int? page)
        {
            string KeyWord = DNTRequest.GetString("KeyWord");

            int rows = DNTRequest.GetInt("rows", 10);
            string strWhere = " 1=1 ";
            if (KeyWord != "")
            {
                strWhere += " and (Name like '%" + KeyWord + "%'  or code like '%" + KeyWord + "%') ";
            }
            int count = 0;
            DataSet ds = gb.GetMenushop();

            //string sql = @"select   *  from [" + DBName + @"].[dbo].[tb_Store]  where  " + strWhere;
            //DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, page.Value, rows, "id desc"), out count);
            List<VUShop> list = TBToList<VUShop>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<VUShop>>();
            grid.total = count;
            grid.rows = list;
            return Json(grid, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetProductTypeList(int id = 0, string KeyWord = "")
        {
            int count = 0;
            string sql = "SELECT [id] ,[code] ,[name],[ParentId],[AddTime] FROM [" + DBName + "].[dbo].[tb_ProductType] ";
            string strWhere = " Where 1=1";
            if (KeyWord != "")
            {
                strWhere += " and ( id in ( select id from  [" + DBName + "].[dbo].[tb_ProductType] where code like '%" + KeyWord + "%' or name like '%" + KeyWord + "%' ) ";
                strWhere += "  or id in ( select ParentId from  [" + DBName + "].[dbo].[tb_ProductType] where code like '%" + KeyWord + "%' or name like '%" + KeyWord + "%' ) ) ";
            }
            //sql = sql + strWhere;
            //DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, 1, 10000, "id desc"), out count);

            //List<MenuPage> list = TBToList<MenuPage>.ConvertToList(ds.Tables[0]).ToList();
            ////List<tb_ProductType> list = ef.tb_ProductType.Where(p => p.MenuID > 0).ToList();
            //List<MenuPage> listJson = new List<MenuPage>();
            //foreach (tb_ProductType model in list.Where(p => p.ParentId == 0).OrderBy(p => p.id))
            //{
            //    MakeMenuJson(list, model, id);
            //    listJson.Add(model);
            //}


            //return Json(listJson, JsonRequestBehavior.AllowGet);

            GoodsBLL bn = new GoodsBLL();
            //string sql = @"select p.Uname,p.Sex,p.roleId,p.truename,p.UId from Users p order by UId desc";
            //string sql = @"select * ,(select top 1 truename from [dbo].Users where UId=m.UId) as truename, (select roleName from Role where roleId in(select top 1  roleId from Users where UId=m.UId)) as roelName  from .[dbo].Users m  where  " + strWhere;
            DataSet ds = bn.GetMenu();
            // DataSet ds = DataPageHelper.GetDataPage(DataPageHelper.GetPageSql(sql, 7, rows, "UId desc"), out count);
            List<MenuPage> list = TBToList<MenuPage>.ConvertToList(ds.Tables[0]).ToList();
            var grid = new EasyuiDataGrid<List<MenuPage>>();
            grid.total = count;
            grid.rows = list;
            return Json(grid, JsonRequestBehavior.AllowGet);
        }

        public class EasyuiDataGrid<t>
        {
            public int total { get; set; }
            public t rows { get; set; }
        }
        #endregion

        #region 用户编辑
        public ActionResult UserlistEdit()
        {
            string id = DNTRequest.GetString("id");
            List<SelectListItem> items1 = new List<SelectListItem>();
            List<SelectListItem> items = new List<SelectListItem>();
            Users model = new Users();
            UserMasterBLL bll = new UserMasterBLL();
            model = bll.GetModel(Convert.ToInt32(id));
            DataSet ds = bll.GetList();
            DataRow[] arr_row = ds.Tables[0].Select();
            for (int i = 0; i < arr_row.Length; i++)
            {
                SelectListItem item = new SelectListItem();
                item.Value = arr_row[i]["roleId"].ToString();
                item.Text = arr_row[i]["roleName"].ToString();
                items.Add(item);
            }
            ViewData["itemsrole"] = items;
            return View(model);
        }
        public ActionResult UserlistSave()
        {
            JsonModel json = new JsonModel();
            Users model = new Users();
            string UserName = DNTRequest.GetString("Uname");
            string Password = DNTRequest.GetString("Pwd");
            string Password1 = DNTRequest.GetString("Password1");
            string EMail = DNTRequest.GetString("EMail");
            string RoleID = DNTRequest.GetString("roleId");
         
            string ZhiCheng = DNTRequest.GetString("ZhiCheng");
            model.Uname = UserName.Trim();
            model.roleId = Convert.ToInt32(RoleID.Trim());
            model.Email = EMail.Trim();
           
            UserMasterBLL bll = new UserMasterBLL();
            string id = DNTRequest.GetString("id");

            if (!string.IsNullOrWhiteSpace(id))
            {
                model.UId = Convert.ToInt32(id);
                if (string.IsNullOrWhiteSpace(Password.Trim()))
                {
                    model.Pwd = bll.GetModel(model.UId).Pwd;
                    
                    int n= bll.Update(model);
                    if(n>0)
                    {
                        json.status = 1;
                        return Json(json);
                    }
                }
                else
                {
                    json.status = -12;
                    return Json(json);

                }
            }
            return View();
        }
        public ActionResult GetUserRoleList()
        {
            FlowersEntities ef = new FlowersEntities();
            List<Role> list = new List<Role>();
            UserMasterBLL ubb = new UserMasterBLL();
            DataSet ds = ubb.GetList();
            Role role = new Role();
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                role.roleId = Convert.ToInt32(ds.Tables[0].Rows[i]["roleId"].ToString());
                role.roleName = ds.Tables[0].Rows[i]["roleName"].ToString();
                list.Add(role);
            }
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SaveUserRole()
        {
            FlowersEntities ef = new FlowersEntities();
            string sids = Request["RoleID"] + "";
            JsonModel jm = new JsonModel(); jm.status = 1;
            int UserID = DNTRequest.GetInt("UId", 0);

            if (sids != "")
            {

                foreach (string s in sids.Split(','))
                {
                    Users model = new Users();

                    model.UId = DNTRequest.GetInt("UId", 0);
                    model.roleId = Convert.ToInt32(s);
                    
                }
                ef.SaveChanges();
            }
            return Json(jm, JsonRequestBehavior.AllowGet);

        }
        #endregion
        public ActionResult RoleList()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }
        public ActionResult StoreList()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }
        public ActionResult ProductTypeList()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }
        public ActionResult UserImprovement()
        {
            ViewBag.uname = CurrentUserName;

            return View();
        }

    }
}