package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("product_specification_hdr")
public class ProductSpecificationHdr extends Entity {

	/*@DbId
	private int id;
	
	@DbColumn
	private int isactive;

	@DbColumn
	private int createdby;

	@DbColumn
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	private Timestamp createdtime;

	@DbColumn
	private int updatedby;

	@DbColumn
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss.SSS")
	private Timestamp updatedtime;

	@DbColumn
	private int userId;*/

	@DbColumn("specification_name")
	private String specificationName;

	/*@DbColumn("company_id")
	private int companyId;

	@DbColumn("branch_id")
	private int branchId;

	@DbColumn("userrole_id")
	private int userRoleId;*/

	/*public int getIsactive() {
		return isactive;
	}

	public int getCreatedby() {
		return createdby;
	}

	public Timestamp getCreatedtime() {
		return createdtime;
	}

	public void setCreatedtime(Timestamp createdtime) {
		this.createdtime = createdtime;
	}

	public int getUpdatedby() {
		return updatedby;
	}

	public Timestamp getUpdatedtime() {
		return updatedtime;
	}

	public void setUpdatedtime(Timestamp updatedtime) {
		this.updatedtime = updatedtime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}*/

	public String getSpecificationName() {
		return specificationName;
	}

	public void setSpecificationName(String specificationName) {
		this.specificationName = specificationName;
	}

	/*@Override
	public void setCompanyId(int companyId) {
		this.companyId = companyId;

	}

	@Override
	public void setUserRoleId(int userRoleId) {
		this.userRoleId = userRoleId;

	}

	@Override
	public void setBranchId(int branchId) {
		this.branchId = branchId;

	}

	public int getCompanyId() {
		return companyId;
	}

	public int getBranchId() {
		return branchId;
	}

	public int getUserRoleId() {
		return userRoleId;
	}*/

	/*@Override
	public void setCreatedBy(int createdBy) {
		this.createdby = createdBy;
	}

	@Override
	public void setUpdatedBy(int updatedBy) {
		this.updatedby = updatedBy;
	}

	@Override
	public void setIsActive(int isactive) {
		this.isactive = isactive;
	}

	@Override
	public int getId() {
		return this.id;
	}*/

}
