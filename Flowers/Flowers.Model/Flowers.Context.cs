﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class FlowersEntities : DbContext
    {
        public FlowersEntities()
            : base("name=FlowersEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<FLb> FLb { get; set; }
        public DbSet<Forum> Forum { get; set; }
        public DbSet<Goods> Goods { get; set; }
        public DbSet<MenuPage> MenuPage { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrDetailId> OrDetailId { get; set; }
        public DbSet<PLb> PLb { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<S_City> S_City { get; set; }
        public DbSet<S_District> S_District { get; set; }
        public DbSet<S_Province> S_Province { get; set; }
        public DbSet<Shop> Shop { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Ngoods> Ngoods { get; set; }
        public DbSet<VAdress> VAdress { get; set; }
        public DbSet<VEmpRoLe> VEmpRoLe { get; set; }
        public DbSet<VOrdel> VOrdel { get; set; }
        public DbSet<dizhi> dizhi { get; set; }
        public DbSet<Orderminxi> Orderminxi { get; set; }
        public DbSet<Splb> Splb { get; set; }
        public DbSet<VshopCar> VshopCar { get; set; }
        public DbSet<Vsplb> Vsplb { get; set; }
        public DbSet<VOderminxi> VOderminxi { get; set; }
        public DbSet<VURser> VURser { get; set; }
        public DbSet<VForum> VForum { get; set; }
        public DbSet<VPLForum> VPLForum { get; set; }
        public DbSet<VUShop> VUShop { get; set; }
        public DbSet<VOrderSminxi> VOrderSminxi { get; set; }
    }
}