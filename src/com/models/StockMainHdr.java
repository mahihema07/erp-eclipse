package com.models;

import java.sql.Date;
import java.sql.Timestamp;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("stock_hdr")
public class StockMainHdr extends Entity {

	@DbColumn("tablename")
	private String tablename;
	
	@DbColumn("parenttablekey")
	private int parenttablekey;
	
	@DbColumn("date")
	private Timestamp date;
	
	@DbColumn("document_no")
	private String documentno;

	public String getTablename() {
		return tablename;
	}

	public void setTablename(String tablename) {
		this.tablename = tablename;
	}

	public int getParenttablekey() {
		return parenttablekey;
	}

	public void setParenttablekey(int parenttablekey) {
		this.parenttablekey = parenttablekey;
	}

	public Timestamp getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String getDocumentno() {
		return documentno;
	}

	public void setDocumentno(String documentno) {
		this.documentno = documentno;
	}

}
