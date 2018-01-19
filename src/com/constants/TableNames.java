package com.constants;

public enum TableNames {
	Sales("sales_entry_hdr"),Purchase("purchase_entry_hdr");
	
	String tableName;

	private TableNames(String tableName) {
		this.tableName = tableName;
	}

	public String getTableName() {
		return tableName;
	}
	

}
