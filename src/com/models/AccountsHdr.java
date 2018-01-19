package com.models;

import java.sql.Timestamp;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("accounts_hdr")
public class AccountsHdr extends Entity {

	@DbColumn("tablename")
	private String tablename;
	
	@DbColumn("parenttablekey")
	private int parenttablekey;
	
	@DbColumn("voucher_no")
	private String voucherno;

	@DbColumn("accounted_date")
	private Timestamp accountedDate;
	
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

	public String getVoucherno() {
		return voucherno;
	}

	public void setVoucherno(String voucherno) {
		this.voucherno = voucherno;
	}

	public Timestamp getAccounteddate() {
		return accountedDate;
	}

	public void setAccounteddate(Timestamp accountedDate) {
		this.accountedDate = accountedDate;
	}
	
}
