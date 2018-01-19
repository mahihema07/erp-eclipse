package com.custommodels;


import com.models.CurrencyConversion;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("currency_convertion_rates")
public class CurrencyConversionListModel  extends CurrencyConversion{
	
	@DbColumn("currency_name")
	private String currencyName;

	public String getCurrencyName() {
		return currencyName;
	}

	public void setCurrencyName(String currencyName) {
		this.currencyName = currencyName;
	}

}
