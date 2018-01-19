package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("suppliers")
public class Suppliers extends Entity{
	
	@DbColumn("supplier_name")
	private String supplierName;
	
	@DbColumn("supplier_coa_id")
	private int suppliercoaid;
	
	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public int getSuppliercoaid() {
		return suppliercoaid;
	}

	public void setSuppliercoaid(int suppliercoaid) {
		this.suppliercoaid = suppliercoaid;
	}

}
