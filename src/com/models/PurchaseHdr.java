package com.models;


import java.sql.Date;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("purchase_entry_hdr")
public class PurchaseHdr extends Entity {
	
	@DbColumn("purchase_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Timestamp purchasedate;
	
	@DbColumn("accounted_date")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date accounteddate;
	
	@DbColumn("document_no")
	private String documentno;
	
	@DbColumn("supplier_id")
	private int supplierid;
	
	private String supplierName;

	public Timestamp getPurchasedate() {
		return purchasedate;
	}

	public void setPurchasedate(Timestamp purchasedate) {
		this.purchasedate = purchasedate;
	}

	public Date getAccounteddate() {
		return accounteddate;
	}

	public void setAccounteddate(Date accounteddate) {
		this.accounteddate = accounteddate;
	}

	public String getDocumentno() {
		return documentno;
	}

	public void setDocumentno(String documentno) {
		this.documentno = documentno;
	}

	public int getSupplierid() {
		return supplierid;
	}

	public void setSupplierid(int supplierid) {
		this.supplierid = supplierid;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	
	

}
