package com.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import jodd.db.DbSession;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbSqlBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.custommodels.ResponseBean;
import com.models.SystemConstantValues;
import com.models.Users;
import com.services.AppConnectionProvider;
import com.services.DBService;

@RestController
public class SystemConstantsController {
    
    @Autowired
	DBService dbService;
	
	@RequestMapping(value = "loadSystemConstant", method = RequestMethod.POST)
	public ResponseBean loadByPage(HttpSession sess,@RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
		
			String code = body;
			
			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{value.*} from $T{SystemConstantValues value} ");
				queryString.append("left join $T{SystemConstantKeys ke} ");
				queryString.append("on $value.systemconstantkeyid=$ke.id ");
				queryString.append("where $ke.constant_key='"+code+"'");
				

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				
				
				List<SystemConstantValues> listData = query.list(SystemConstantValues.class);

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true, listData);
				
			}

		} catch (Exception e) {
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), true,
					e.getMessage());
			e.printStackTrace();
		} finally {
			session.closeSession();
		}
		
		return responseBean;
	}
}
