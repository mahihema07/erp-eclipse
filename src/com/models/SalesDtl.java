package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("sales_entry_dtl")
public class SalesDtl extends Entity {

	@DbColumn("sales_entry_hdr_id")
	private int saleshdrid;
	
	@DbColumn("product_hdr_id")
	private int producthdrid;
	
	@DbColumn("product_dtl_id")
	private int productdtlid;

	@DbColumn("quantity")
	private int quantity;
	
	@DbColumn("rate")
	private int rate;
	
	@DbColumn("total_price")
	private int totalprice;
	
	public int getSalesentryhdrid() {
		return saleshdrid;
	}

	public void setSalesentryhdrid(int saleshdrid) {
		this.saleshdrid = saleshdrid;
	}

	public int getProducthdrid() {
		return producthdrid;
	}

	public void setProducthdrid(int producthdrid) {
		this.producthdrid = producthdrid;
	}

	public int getProductdtlid() {
		return productdtlid;
	}

	public void setProductdtlid(int productdtlid) {
		this.productdtlid = productdtlid;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getRate() {
		return rate;
	}

	public void setRate(int rate) {
		this.rate = rate;
	}

	public int getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(int totalprice) {
		this.totalprice = totalprice;
	}
}
