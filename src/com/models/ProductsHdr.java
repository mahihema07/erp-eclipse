package com.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.jacksonextentions.NumericBooleanDeserializer;
import com.jacksonextentions.NumericBooleanSerializer;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("products_hdr")
public class ProductsHdr extends Entity{
	
	@DbColumn("productname")
	private String productName;
	
	@DbColumn("product_category_id")
	private int categoryId;
	
	@DbColumn("uom_id")
	private int uomId;
	
	//@JsonSerialize(using=NumericBooleanSerializer.class)
	//@JsonDeserialize(using=NumericBooleanDeserializer.class)
	@DbColumn("is_stockable")
	private boolean isStockable;
	
	
	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public int getProductCategoryId() {
		return categoryId;
	}

	public void setProductCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	
	public int getUomId() {
		return uomId;
	}

	public void setUomId(int uomId) {
		this.uomId = uomId;
	}

	public boolean getStockable() {
		return isStockable;
	}

	public void setStockable(boolean isStockable) {
		this.isStockable = isStockable;
	}


}
