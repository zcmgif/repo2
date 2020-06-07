using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Flowers.Web.Models
{
    public class Paging
    {
        public Paging() { }
        /// <summary>
        /// 当前页
        /// </summary>
        public int CurrentPage
        {
            get;
            set;
        }
        /// <summary>
        /// 页大小
        /// </summary>
        public int PageSize
        {
            get;
            set;
        }
        /// <summary>
        /// 记录总数大小
        /// </summary>
        public int RowCount
        {
            get;
            set;
        }
        /// <summary>
        /// 是否有上一页
        /// </summary>
        public bool HasPreviousPage
        {
            get
            {
                return (CurrentPage - 1) > 0;
            }
        }
        /// <summary>
        /// 是否有下一页
        /// </summary>
        //public bool HasNextPage
        //{
        //    get
        //    {
        //        return (TotalPages - CurrentPage) > 0;
        //    }
        //}
        /// <summary>
        /// 上一页
        /// </summary>
        public int PreviousPage
        {
            get
            {
                return (CurrentPage <= 1) ? 1 : CurrentPage - 1;
            }
        }
        /// <summary>
        /// 下一页
        /// </summary>
        public  int NextPage
        {
            get
            {
                return CurrentPage + 1;
            }
        }
        /// <summary>
        /// 总页数
        /// </summary>
        public static int TotalPages(int page)
        {
            int n;
            int pagesize = 10;
            if(pagesize == 0)
            {
                return n = 1;
            }
            else
            {
                n = page % pagesize;
                if(n==0)
                {
                    return page / pagesize;
                }
                else
                {
                    return (page / pagesize) + 1;
                }
            }
        }
        //public int TotalPages
        //{
        //    get
        //    {
        //        if (PageSize == 0)
        //            throw new ArgumentOutOfRangeException("page");
        //        int remainder = RowCount % PageSize;
        //        if (remainder == 0)
        //            return RowCount / PageSize;
        //        else
        //            return (RowCount / PageSize) + 1;
        //    }

        //}
        public class ViewDataBase
        {
            /// <summary>
            /// 传值参数
            /// </summary>
            public string UrlParameter
            {
                get;
                set;
            }
            /// <summary>
            /// 传值参数
            /// </summary>
            public string PageName
            {
                get;
                set;
            }
           
        }
    }
}