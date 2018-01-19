package com.custommodels;

import com.models.ChartOfAccounts;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("chartofaccounts")
public class ChartOfAccountsListModel  extends ChartOfAccounts{
	
	@DbColumn("group_name")
	private String groupName;

	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	


}
