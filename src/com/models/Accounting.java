package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("accounting_defaults")
public class Accounting extends Entity {
	
	@DbColumn("account_recievables_groupid")
	private int accountrecievablesgroupid;
	
	@DbColumn("account_payables_groupid")	
	private int accountpayablesgroupid;
	
	@DbColumn("sales_coaid")
	private int salescoaid;
	
	@DbColumn("purchase_coaid")	
	private int purchasecoaid;
	
	@DbColumn("cogs_groupid")	
	private int cogsgroupid;
	
	@DbColumn("cogs_coaid")	
	private int cogscoaid;
	
	@DbColumn("cash_groupid")	
	private int cashgroupid;
	
	@DbColumn("bank_groupid")
	private int bankgroupid;

	@DbColumn("cash_coaid")
	private int cashcoaid;
	
	@DbColumn("bank_coaid")	
	private int bankcoaid;
	
	@DbColumn("asset_groupid")
	private int assetgroupid;	
	
	@DbColumn("liability_groupid")
	private int liabilitygroupid;	
	
	@DbColumn("income_groupid")	
	private int incomegroupid;		
	
	@DbColumn("expense_groupid")	
	private int expensegroupid;	
	
	@DbColumn("inventory_groupid")
	private int inventorygroupid;	
	
	@DbColumn("equity_groupid")	
	private int equitygroupid;
	
	
	
	
	public int getAccountrecievablesgroupid() {
		return accountrecievablesgroupid;
	}

	public void setAccountrecievablesgroupid(int accountrecievablesgroupid) {
		this.accountrecievablesgroupid = accountrecievablesgroupid;
	}

	public int getAccountpayablesgroupid() {
		return accountpayablesgroupid;
	}

	public void setAccountpayablesgroupid(int accountpayablesgroupid) {
		this.accountpayablesgroupid = accountpayablesgroupid;
	}

	public int getSalescoaid() {
		return salescoaid;
	}

	public void setSalescoaid(int salescoaid) {
		this.salescoaid = salescoaid;
	}

	public int getPurchasecoaid() {
		return purchasecoaid;
	}

	public void setPurchasecoaid(int purchasecoaid) {
		this.purchasecoaid = purchasecoaid;
	}

	public int getCogsgroupid() {
		return cogsgroupid;
	}

	public void setCogsgroupid(int cogsgroupid) {
		this.cogsgroupid = cogsgroupid;
	}

	public int getCogscoaid() {
		return cogscoaid;
	}

	public void setCogscoaid(int cogscoaid) {
		this.cogscoaid = cogscoaid;
	}

	public int getCashgroupid() {
		return cashgroupid;
	}

	public void setCashgroupid(int cashgroupid) {
		this.cashgroupid = cashgroupid;
	}

	public int getBankgroupid() {
		return bankgroupid;
	}

	public void setBankgroupid(int bankgroupid) {
		this.bankgroupid = bankgroupid;
	}

	public int getCashcoaid() {
		return cashcoaid;
	}

	public void setCashcoaid(int cashcoaid) {
		this.cashcoaid = cashcoaid;
	}

	public int getBankcoaid() {
		return bankcoaid;
	}

	public void setBankcoaid(int bankcoaid) {
		this.bankcoaid = bankcoaid;
	}

	public int getAssetgroupid() {
		return assetgroupid;
	}

	public void setAssetgroupid(int assetgroupid) {
		this.assetgroupid = assetgroupid;
	}

	public int getLiabilitygroupid() {
		return liabilitygroupid;
	}

	public void setLiabilitygroupid(int liabilitygroupid) {
		this.liabilitygroupid = liabilitygroupid;
	}

	public int getIncomegroupid() {
		return incomegroupid;
	}

	public void setIncomegroupid(int incomegroupid) {
		this.incomegroupid = incomegroupid;
	}

	public int getExpensegroupid() {
		return expensegroupid;
	}

	public void setExpensegroupid(int expensegroupid) {
		this.expensegroupid = expensegroupid;
	}

	public int getInventorygroupid() {
		return inventorygroupid;
	}

	public void setInventorygroupid(int inventorygroupid) {
		this.inventorygroupid = inventorygroupid;
	}

	public int getEquitygroupid() {
		return equitygroupid;
	}

	public void setEquitygroupid(int equitygroupid) {
		this.equitygroupid = equitygroupid;
	}	
	
	

}
