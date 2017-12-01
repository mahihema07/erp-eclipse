package com.models;
import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("products_dtl")
public class ProductsDtl extends Entity {
	
	@DbColumn("product_hdr_id")
	private int productHdrId;
	
	@DbColumn("product_specification_hdr_id")
	private int productSpecificationHdrId;
	
	@DbColumn("user_id")
	private int userId;
	
	
	public int getProductHdrId() {
		return productHdrId;
	}

	public void setProductHdrId(int productHdrId) {
		this.productHdrId = productHdrId;
	}
	
	public int getProductSpecificationHdrId() {
		return productSpecificationHdrId;
	}

	public void setProductSpecificationHdrId(int productSpecificationHdrId) {
		this.productSpecificationHdrId = productSpecificationHdrId;
	}


}
