package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("uom")
public class Uom extends Entity{
	
	@DbColumn("uomname")
	private String uomName;


	public String getUomName() {
		return uomName;
	}

	public void setUomName(String uomName) {
		this.uomName = uomName;
	}
	
	

}
