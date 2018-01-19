package com.custommodels;

import com.models.SalesHdr;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("sales_entry_hdr")
public class SalesHdrList extends SalesHdr {

	@DbColumn("customer_name")
	private String customerName;

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
}
