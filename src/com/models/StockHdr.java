package com.models;

import java.sql.Date;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("stockadjustment_hdr")
public class StockHdr extends Entity{
	
	@DbColumn("adjustment_date")
	private Date adjustmentdate;
	
	@DbColumn("document_no")
	private String documentno;

	public Date getAdjustmentdate() {
		return adjustmentdate;
	}

	public void setAdjustmentdate(Date adjustmentdate) {
		this.adjustmentdate = adjustmentdate;
	}

	public String getDocumentno() {
		return documentno;
	}

	public void setDocumentno(String documentno) {
		this.documentno = documentno;
	}
	
}