package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("system_constant_values")
public class SystemConstantValues {
	
	@DbColumn("code")
	private String code;
	
	@DbColumn("constant_value")
	private String constant_value;
	
	@DbColumn("systemconstant_key_id")
	private int systemconstantkeyid;
	
	@DbColumn("id")
	private int id;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
	
	public String getConstantValue() {
		return constant_value;
	}

	public void setConstantValue(String constant_value) {
		this.constant_value = constant_value;
	}
	
	public int getSystemConstantKeyId() {
		return systemconstantkeyid;
	}

	public void setSystemConstantKeyId(int systemconstantkeyid) {
		this.systemconstantkeyid = systemconstantkeyid;
	}
}
