package com.custommodels;

import com.models.PurchaseHdr;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("purchase_entry_hdr")
public class PurchaseHdrListModel extends PurchaseHdr {
	
	@DbColumn("supplier_name")
	private String supplierName;
	
	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

}
