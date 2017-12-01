/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.controllers;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.List;

import javax.servlet.http.HttpSession;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.models.Users;
import com.services.DBService;

import jodd.db.DbQuery;
import jodd.db.oom.DbOomManager;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbSqlBuilder;
import jodd.db.oom.sqlgen.ParsedSql;

/**
 *
 * @author Binief_T_A
 */
@RestController
public class AuthenticationController {

	@Autowired
	DBService dbService;


	@RequestMapping(value = "loginGuard", method = RequestMethod.POST)
	public String loginGuard(HttpSession sess) throws Exception {

		JSONObject job = new JSONObject();

		Users u=(Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.toString());
		
		if(u!=null) {
			job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name());
		}else {
			job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
		}

		return job.toString();
	}
	
	
	@RequestMapping(value = "login", method = RequestMethod.POST)
	public String login(HttpSession sess,@RequestBody String body) {
		JSONObject job = new JSONObject(body);
		String ret=null;
		DbOomQuery  query =null;
		try {
			Connection conn=dbService.getConnection();
			String username = null,password = null;
			username=job.getString("username");
			password=job.getString("password");
			
			//DbOomManager.getInstance().registerEntity(Users.class);

			query=new DbOomQuery (conn,DbSqlBuilder.sql( "select $C{u.*} from $T{Users u}"
					+ " where $u.username='"+username+"' and $u.password='"+password+"'"));
			List<Users> users = query.list(Users.class);
			
			Users u=null;
			if(users.size()>0) {
				u=users.get(0);
			}
			
			job=new JSONObject();
			if(u!=null) {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name());
				sess.setAttribute(AppConstants.SESSION_VARIABLES.USER.name(), u);
			}else {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_MESSAGE.name(), "Invalid Username/ Password");
			}
			
		    ret=job.toString();
		}catch(Exception e) {
			e.printStackTrace();
			job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
			job.put(AppConstants.HTTP_RESPONSES.RESPONSE_MESSAGE.name(),e.getMessage());
		}
		finally {
			query.close();
			dbService.closeConnection();
			return ret;
		}
	}

}
