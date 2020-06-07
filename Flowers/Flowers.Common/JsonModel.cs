using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flowers.Common
{
    public class JsonModel
    {
        private string _errorcode = "";
        private string _ListHtml = "";
        private string _ListPage = "";
        private string _PageNav = "";
        private string _Description = "";
        public int is_login { get; set; }
        public int status { get; set; }
        public string html { get; set; }
        public string AnnexName { get; set; }
        public string AnnexAddress { get; set; }

        public int count
        {
            get;
            set;
        }
        public string code
        {
            get;
            set;
        }
        public string msg
        {
            get;
            set;
        }
        public string errorcode
        {
            get
            {
                return this._errorcode;
            }
            set
            {
                this._errorcode = value;
            }
        }
        public string listhtml
        {
            get
            {
                return this._ListHtml;
            }
            set
            {
                this._ListHtml = value;
            }
        }
        public string listpage
        {
            get
            {
                return this._ListPage;
            }
            set
            {
                this._ListPage = value;
            }
        }
        public string pagenav
        {
            get
            {
                return this._PageNav;
            }
            set
            {
                this._PageNav = value;
            }
        }
        public string description
        {
            get
            {
                return this._Description;
            }
            set
            {
                this._Description = value;
            }
        }
        public string datetime { get; set; }

        public string FileId { get; set; }
    }
}
