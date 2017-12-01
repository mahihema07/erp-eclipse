package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("system_constant_keys")
public class SystemConstantKeys {
	
	@DbColumn("constant_key")
	private String constant_key;
	
	@DbColumn("id")
	private int id;
	

	public String getConstantKey() {
		return constant_key;
	}

	public void setConstantKey(String constant_key) {
		this.constant_key = constant_key;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

}
