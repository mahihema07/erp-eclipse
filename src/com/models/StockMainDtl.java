package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("stock_dtl")
public class StockMainDtl extends Entity{

	@DbColumn("stockhdrid")
	private int stockhdrid;
	
	@DbColumn("product_hdr_id")
	private int producthdrid;
	
	@DbColumn("product_dtl_id")
	private int productdtlid;
	
	@DbColumn("quantity")
	private int quantity;
	
	@DbColumn("rate")
	private double rate;

	public int getStockhdrid() {
		return stockhdrid;
	}

	public void setStockhdrid(int stockhdrid) {
		this.stockhdrid = stockhdrid;
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

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}
}
