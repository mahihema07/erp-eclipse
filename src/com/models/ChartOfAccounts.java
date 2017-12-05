
package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("chartofaccounts")
public class ChartOfAccounts extends Entity{
	
	@DbColumn("chart_of_account_name")
	private String coaName;
	
	@DbColumn("chartofaccount_groupid")
	private int coaGroupId;
	
	@DbColumn("chart_of_account_code")
	private String coaCode;
	
	private String groupName;
	
	public String getCoaName() {
		return coaName;
	}

	public void setCoaName(String coaName) {
		this.coaName = coaName;
	}
	
	public int getCoaGroupId() {
		return coaGroupId;
	}

	public void setCoaGroupId(int coaGroupId) {
		this.coaGroupId = coaGroupId;
	}
	
	public String getCoaCode() {
		return coaCode;
	}

	public void setCoaCode(String coaCode) {
		this.coaCode = coaCode;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
}