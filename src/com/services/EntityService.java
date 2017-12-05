package com.services;

import java.sql.Timestamp;

import org.springframework.stereotype.Service;

import com.interfaces.IEntity;
import com.models.Users;

@Service("entityService")
public class EntityService {
	
	public void setDefaults(IEntity e,Users u) {
		int branchId=u.getBranchId();
		int companyId=u.getCompanyId();
		int userRoleId=u.getUserRoleId();
		int userId=u.getId();
		Timestamp currentTime=new Timestamp(System.currentTimeMillis());
		
		e.setBranchId(branchId);
		e.setCompanyId(companyId);
		e.setUserRoleId(userRoleId);
		e.setUserId(userId);
		e.setIsActive(1);
		
		if(e.getId()!=0) {
			e.setUpdatedBy(userId);
			e.setUpdatedTime(currentTime);
		}else {
			e.setCreatedBy(userId);
			e.setCreatedTime(currentTime);
		}
	}

}
