
package com.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.custommodels.ResponseBean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interfaces.ISpringController;
import com.models.ChartOfAccountsGroup;
import com.models.ProductCategory;
import com.models.Users;
import com.services.AppConnectionProvider;
import com.services.DBService;
import com.services.EntityService;

import jodd.db.DbSession;
import jodd.db.DbTransactionMode;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomManager;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;
import jodd.json.JsonSerializer;

@RestController
public class ChartOfAccountsGroupController implements ISpringController {
	
	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Override
	@RequestMapping(value = "loadAccountGroupbypage", method = RequestMethod.POST)
	public ResponseBean loadByPage(HttpSession sess,@RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject(body);
		
			int pageNumber = job.getInt("pageNumber");
			int rowsOnPage = job.getInt("rowsOnPage");
			String searchFilter = job.getString("searchFilter");

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{ChartOfAccountsGroup t} where 1=1");
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.groupName='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				
				

				int count = query.list(ChartOfAccountsGroup.class).size();
				
				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<ChartOfAccountsGroup> listData = query.list(ChartOfAccountsGroup.class);

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true, count,
						listData);
				
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

	


	@Override
	@RequestMapping(value = "loadAccountGroupById", method = RequestMethod.POST)
	public ResponseBean loadById(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();
			JsonSerializer jsonSerializer = new JsonSerializer();

			String id = body;
			

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{ChartOfAccountsGroup t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				ChartOfAccountsGroup data = query.find(ChartOfAccountsGroup.class);

				queryString.delete(0, queryString.length());

				
				Map<String, Object> dt = new HashMap<String, Object>();
				dt.put("headerData", data);
				

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true, dt);
			}

		} catch (Exception e) {
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), true, e.getMessage());
			e.printStackTrace();
		} finally {
			session.closeSession();
		}

		return responseBean;
	}


	@Override
	@RequestMapping(value = "saveOrUpdateAccountGroup", method = RequestMethod.POST)
	public ResponseBean saveOrUpdate(HttpSession sess, @RequestBody String body) throws Exception {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));

			JSONObject job = new JSONObject(body);

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				

				ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
						false);
				ChartOfAccountsGroup ch = mapper.readValue(job.get("headerData").toString(),
						new TypeReference<ChartOfAccountsGroup>() {
						});

				entityService.setDefaults(ch, u);

				if (ch.getId() > 0) {
					query = new DbOomQuery(session, DbEntitySql.update(ch));
				} else {
					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(ChartOfAccountsGroup.class, ch));
				}
				
				query.executeUpdate();

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						"Operation Successfull");
			}

			session.commitTransaction();
		} catch (Exception e) {
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), true,
					e.getMessage());
			e.printStackTrace();
		} finally {
			session.closeSession();
		}
		return responseBean;

	}


	@Override
	@RequestMapping(value = "deleteAccountGroup", method = RequestMethod.POST)
	public ResponseBean deleteById(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));
			
			StringBuilder queryString = null;

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{ChartOfAccountsGroup t} where $t.id=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						"Operation Successfull");
			}
			session.commitTransaction();

		} catch (Exception e) {
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), true, e.getMessage());
			session.rollbackTransaction();
			e.printStackTrace();
		} finally {
			session.closeSession();
		}
		return responseBean;
	}




	@Override
	public ResponseBean loadAllActive(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

}
