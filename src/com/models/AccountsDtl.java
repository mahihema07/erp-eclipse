package com.models;

import java.sql.Timestamp;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("accounts_dtl")
public class AccountsDtl extends Entity {
	
	@DbColumn("accounted_date")
	private Timestamp accountedDate;
	
	@DbColumn("voucher_no")
	private String voucherNo;
	
	@DbColumn("accounts_hdr_id")
	private int accountsHdrId;
	
	@DbColumn("coa_id")
	private int coaId;
	
	@DbColumn("amount")
	private double amount;

	public Timestamp getAccountedDate() {
		return accountedDate;
	}

	public void setAccountedDate(Timestamp accountedDate) {
		this.accountedDate = accountedDate;
	}

	public String getVoucherNo() {
		return voucherNo;
	}

	public void setVoucherNo(String voucherNo) {
		this.voucherNo = voucherNo;
	}

	public int getAccountsHdrId() {
		return accountsHdrId;
	}

	public void setAccountsHdrId(int accountsHdrId) {
		this.accountsHdrId = accountsHdrId;
	}

	public int getCoaId() {
		return coaId;
	}

	public void setCoaId(int coaId) {
		this.coaId = coaId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	

}
