
package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("chartofaccounts_group")
public class ChartOfAccountsGroup extends Entity{
	
	
	@DbColumn("group_name")
	private String groupName;
	
	@DbColumn("group_type_id")
	private int grouptypeid;
	
	@DbColumn("predef_code")
	private String predefcode;
	
	@DbColumn("parent_groupid")
	private int parentgroupid;

	
	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	
	public int getGrouptypeid() {
		return grouptypeid;
	}

	public void setGrouptypeId(int grouptypeid) {
		this.grouptypeid = grouptypeid;
	}

	
	public String getPredefcode() {
		return predefcode;
	}

	public void setPredefcode(String predefcode) {
		this.predefcode = predefcode;
	}

	public int getParentgroupid() {
		return parentgroupid;
	}

	public void setParentgroupid(int parentgroupid) {
		this.parentgroupid = parentgroupid;
	}
	
	
	
}