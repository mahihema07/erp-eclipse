package com.interfaces;

import java.sql.Timestamp;

public interface IEntity {
	
	public void setCompanyId(int companyId) ;
	
	public void setUserRoleId(int userRoleId);
	
	public void setBranchId(int branchId);
	
	public void setCreatedBy(int createdBy);
	
	public void setUpdatedBy(int updatedBy);
	
	public void setIsActive(int isactive);
	
	public void setUserId(int userId);
	
	public void setCreatedTime(Timestamp createdTime);
	
	public void setUpdatedTime(Timestamp updatedTime);
	
	public int getId();

}
