package com.custommodels;

import com.models.ProductsDtl;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("products_dtl")
public class ProductDtlListModel extends ProductsDtl {
	
	@DbColumn("specification_name")
	private String specificationName;
	
	public String getSpecificationName() {
		return specificationName;
	}

	public void setSpecificationName(String specificationName) {
		this.specificationName = specificationName;
	}


}
