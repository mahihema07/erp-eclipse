package com.models;

import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("sales_entry_hdr")
public class SalesHdr extends Entity {
	
	@DbColumn("sales_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Timestamp salesdate;

	@DbColumn("accounted_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Timestamp accounteddate;
	
	@DbColumn("document_no")
	private String documentno;
	
	@DbColumn("customer_id")
	private int customerid;
	
	private String customerName;
	
	public Timestamp getSalesdate() {
		return salesdate;
	}

	public void setSalesdate(Timestamp salesdate) {
		this.salesdate = salesdate;
	}

	public Timestamp getAccounteddate() {
		return accounteddate;
	}

	public void setAccounteddate(Timestamp accounteddate) {
		this.accounteddate = accounteddate;
	}

	public String getDocumentno() {
		return documentno;
	}

	public void setDocumentno(String documentno) {
		this.documentno = documentno;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

}
