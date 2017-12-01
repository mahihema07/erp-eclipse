package com.models;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.interfaces.IEntity;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbId;

public abstract class Entity implements IEntity{
	
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

	@DbColumn("user_id")
	public int userId;

	
/*	

	@Override
	public int hashCode() {
		if (id == null) {
			return System.identityHashCode(this);
		}
		return 31 * id.hashCode();
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o instanceof Entity == false) {
			return false;
		}
		Entity entity = (Entity) o;
		if (id == null && entity.id == null) {
			return this == o;
		}
		if ((id == null) || (entity.id == null)) {
			return false;
		}
		return id.equals(entity.id);
	}*/

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

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "Entity{" + this.getClass().getSimpleName() + ':' + id + '}';
	}



}
