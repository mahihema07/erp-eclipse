package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("customer_address")
public class CustomersAddress extends Entity{
	
	@DbColumn("customer_id")
	private int customerid;
	
	@DbColumn("line1")
	private String linea;
	
	@DbColumn("line2")
	private String lineb;

	@DbColumn("city")
	private String city;
	
	@DbColumn("state")
	private String state;
	
	@DbColumn("country")
	private String country;
	
	@DbColumn("zip")
	private String zip;
	
	@DbColumn("primary_phone")
	private String primephone;
	
	@DbColumn("secondary_phone")
	private String secondphone;
	
	@DbColumn("primary_email")
	private String primemail;
	
	@DbColumn("secondary_email")
	private String secondemail;
	
	@DbColumn("website")
	private String website;

	public String getLineA() {
		return linea;
	}

	public void setLineA(String linea) {
		this.linea = linea;
	}

	public String getLineb() {
		return lineb;
	}

	public void setLineb(String lineb) {
		this.lineb = lineb;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getZip() {
		return zip;
	}

	public void setZip(String zip) {
		this.zip = zip;
	}

	public String getPrimephone() {
		return primephone;
	}

	public void setPrimephone(String primephone) {
		this.primephone = primephone;
	}

	public String getSecondphone() {
		return secondphone;
	}

	public void setSecondphone(String secondphone) {
		this.secondphone = secondphone;
	}

	public String getPrimemail() {
		return primemail;
	}

	public void setPrimemail(String primemail) {
		this.primemail = primemail;
	}

	public String getSecondenail() {
		return secondemail;
	}

	public void setSecondenail(String secondemail) {
		this.secondemail = secondemail;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public int getCustomerid() {
		return customerid;
	}

	public void setCustomerid(int customerid) {
		this.customerid = customerid;
	}
	
	

}
