package com.models;

import java.sql.Date;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("currency_convertion_rates")
public class CurrencyConversion extends Entity{
	
	@DbColumn("from_currency_id")
	private int fromcurrencyid;
	
	@DbColumn("to_currency_id")
	private int tocurrencyid;
	
	@DbColumn("effective_from_date")
	private Date effectivefromdate;
	
	@DbColumn("multiply_rate")
	private Double multiplyrate;
	
	@DbColumn("divide_rate")
	private Double dividerate;
	
	private String currencyName;

	public String getCurrency() {
		return currencyName;
	}

	public void setCurrency(String currencyName) {
		this.currencyName = currencyName;
	}

	public int getFromcurrencyid() {
		return fromcurrencyid;
	}

	public void setFromcurrencyid(int fromcurrencyid) {
		this.fromcurrencyid = fromcurrencyid;
	}

	public int getTocurrencyid() {
		return tocurrencyid;
	}

	public void setTocurrencyid(int tocurrencyid) {
		this.tocurrencyid = tocurrencyid;
	}

	public Date getEffectivefromdate() {
		return effectivefromdate;
	}

	public void setEffectivefromdate(Date effectivefromdate) {
		this.effectivefromdate = effectivefromdate;
	}

	public Double getMultiplyrate() {
		return multiplyrate;
	}

	public void setMultiplyrate(Double multiplyrate) {
		this.multiplyrate = multiplyrate;
	}

	public Double getDividerate() {
		return dividerate;
	}

	public void setDividerate(Double dividerate) {
		this.dividerate = dividerate;
	}

}
