package com.models;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbId;
import jodd.db.oom.meta.DbTable;

@DbTable("users")
public class Users {

	@DbId
	@DbColumn("id")
	public int id;
	
	@DbColumn("isactive")
	public int isActive;
	
	@DbColumn("createdby")
	public int createdBy;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	@DbColumn("createdtime")
	public Timestamp createdTime;
	
	@DbColumn("updatedby")
	public int updatedBy;
	
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	@DbColumn("updatedtime")
	public Timestamp updatedTime;
	
	@DbColumn("branch_id")
	public int branchId;

	@DbColumn("company_id")
	public int companyId;

	@DbColumn("userrole_id")
	public int userRoleId;
	
	@DbColumn
	private String username;

	@DbColumn
	private String password;

	@DbColumn
	private Date account_expiy_date;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getIsActive() {
		return isActive;
	}

	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Timestamp getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Timestamp updatedTime) {
		this.updatedTime = updatedTime;
	}

	public int getBranchId() {
		return branchId;
	}

	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}

	public int getCompanyId() {
		return companyId;
	}

	public void setCompanyId(int companyId) {
		this.companyId = companyId;
	}

	public int getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(int userRoleId) {
		this.userRoleId = userRoleId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getAccount_expiy_date() {
		return account_expiy_date;
	}

	public void setAccount_expiy_date(Date account_expiy_date) {
		this.account_expiy_date = account_expiy_date;
	}
	
	
}
