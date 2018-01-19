package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("customers")
public class Customers extends Entity{
	
	@DbColumn("customer_name")
	private String customerName;
	
	@DbColumn("customer_coa_id")
	private int customercoaid;

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public int getCustomercoaid() {
		return customercoaid;
	}

	public void setCustomercoaid(int customercoaid) {
		this.customercoaid = customercoaid;
	}
	
	

}
