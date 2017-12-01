package com.controllers;

import java.sql.Connection;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.custommodels.ResponseBean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.models.SpecificationComponents;
import com.models.Users;
import com.services.AppConnectionProvider;
import com.services.DBService;

import jodd.db.DbSession;
import jodd.db.DbTransactionMode;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;
import jodd.json.JsonSerializer;

@RestController
public class SpecificationComponentController {

	@Autowired
	DBService dbService;

	@RequestMapping(value = "loadspecificationcomponentsbypage", method = RequestMethod.POST)
	public String loadSpecificationComponentsByPage(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		try {
			Connection conn = dbService.getConnection();
			JSONObject job = new JSONObject(body);

			int pageNumber = job.getInt("pageNumber");
			int rowsOnPage = job.getInt("rowsOnPage");
			String searchFilter = job.getString("searchFilter");

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);
			} else {
				//DbOomManager.getInstance().registerEntity(SpecificationComponents.class);

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{SpecificationComponents t} where 1=1");
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.componentName='" + searchFilter + "'");
				}

				query = new DbOomQuery(conn, DbSqlBuilder.sql(queryString.toString()));

				int count = query.list(SpecificationComponents.class).size();

				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(conn, DbSqlBuilder.sql(queryString.toString()));
				List<SpecificationComponents> specificationComponents = query.list(SpecificationComponents.class);

				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_DATA_COUNT.name(), count);
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_DATA.name(), new JsonSerializer().serialize(specificationComponents));
				
				new ResponseBean();
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			query.close();
			dbService.closeConnection();
			return ret;
		}

	}
	
	@RequestMapping(value = "loadallspecificationcomponents", method = RequestMethod.POST)
	public String loadSpecificationComponents(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		try {
			Connection conn = dbService.getConnection();
			JSONObject job = new JSONObject();

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);
			} else {
				//DbOomManager.getInstance().registerEntity(SpecificationComponents.class);

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{SpecificationComponents t} where 1=1");

				query = new DbOomQuery(conn, DbSqlBuilder.sql(queryString.toString()));

				List<SpecificationComponents> specificationComponents = query.list(SpecificationComponents.class);

				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_DATA.name(), new JsonSerializer().serialize(specificationComponents));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			query.close();
			dbService.closeConnection();
			return ret;
		}
	}

	@RequestMapping(value = "loadSpecificationComponentById", method = RequestMethod.POST)
	public String loadSpecificationComponentById(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		try {
			Connection conn = dbService.getConnection();
			JSONObject job = new JSONObject();

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);
			} else {
				//DbOomManager.getInstance().registerEntity(SpecificationComponents.class);

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{SpecificationComponents t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(conn, DbSqlBuilder.sql(queryString.toString()));

				SpecificationComponents specificationComponents = query.find(SpecificationComponents.class);

				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_DATA.name(), new JsonSerializer().serialize(specificationComponents));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			query.close();
			dbService.closeConnection();
			return ret;
		}

	}

	@RequestMapping(value = "saveOrUpdateSpecificationComponent", method = RequestMethod.POST)
	public String saveOrUpdateSpecificationComponent(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		try {
			Connection conn = dbService.getConnection();
			JSONObject job = new JSONObject();

			String data = body;

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);
			} else {
				//DbOomManager.getInstance().registerEntity(SpecificationComponents.class);

				ObjectMapper mapper = new ObjectMapper();
				SpecificationComponents cmp = mapper.readValue(body, new TypeReference<SpecificationComponents>() {
				});
				cmp.setUserId(u.getId());

				if (cmp.getId() > 0) {
					cmp.setUpdatedby(u.getId());
					cmp.setIsactive(1);

					query = new DbOomQuery(conn, DbEntitySql.update(cmp));
				} else {
					cmp.setCreatedby(u.getId());
					cmp.setIsactive(1);

					query = new DbOomQuery(conn, DbSqlBuilder.sql().insert(SpecificationComponents.class, cmp));
				}

				query.executeUpdate();

				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), true);
				job.put(AppConstants.HTTP_RESPONSES.RESPONSE_MESSAGE.name(), "Operation Successfull");
				// job.put("data", new JsonSerializer().serialize(specificationComponents));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			query.close();
			dbService.closeConnection();
			return ret;
		}

	}
	
	
	@RequestMapping(value = "deleteSpecificationComponent", method = RequestMethod.POST)
	public ResponseBean deleteById(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean=null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();
			StringBuilder queryString = null;
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean=new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(),false);
			} else {

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{SpecificationComponents t} where $t.id=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				
				responseBean=new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(),true,"Operation Successfull");
			}

		} catch (Exception e) {
			session.rollbackTransaction();
			e.printStackTrace();
		} finally {
			session.commitTransaction();
			session.closeSession();
			return responseBean;
		}
	}

}
