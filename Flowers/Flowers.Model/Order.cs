//------------------------------------------------------------------------------
// <auto-generated>
//    此代码是根据模板生成的。
//
//    手动更改此文件可能会导致应用程序中发生异常行为。
//    如果重新生成代码，则将覆盖对此文件的手动更改。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Flowers.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Order
    {
        public int orderId { get; set; }
        public Nullable<int> GId { get; set; }
        public Nullable<int> UId { get; set; }
        public Nullable<double> Onum { get; set; }
        public Nullable<double> Oprice { get; set; }
        public Nullable<System.DateTime> createTime { get; set; }
        public Nullable<int> state { get; set; }
        public Nullable<int> dizhi { get; set; }
    }
}