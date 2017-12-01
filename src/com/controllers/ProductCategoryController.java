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
import com.models.ProductCategory;
import com.models.ProductSpecificationDtl;
import com.models.ProductSpecificationHdr;
import com.models.ProductsDtl;
import com.models.ProductsHdr;
import com.models.Uom;
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
public class ProductCategoryController implements ISpringController {
	
	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Override
	@RequestMapping(value = "loadcategorybypage", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{ProductCategory t} where 1=1");
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.categoryName='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				
				

				int count = query.list(ProductCategory.class).size();
				
				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<ProductCategory> listData = query.list(ProductCategory.class);

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
	@RequestMapping(value = "loadAllCategory", method = RequestMethod.POST)
	public ResponseBean loadAllActive(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();
			StringBuilder queryString = null;

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {
				queryString = new StringBuilder();
				queryString.append("select $C{t.*} from $T{ProductCategory t} where $t.isActive=1");
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				List<ProductCategory> pdcat = query.list(ProductCategory.class);
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						pdcat);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return responseBean;
		}
	}


	@Override
	@RequestMapping(value = "loadCategoryById", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{ProductCategory t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				ProductCategory data = query.find(ProductCategory.class);

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
	@RequestMapping(value = "saveOrUpdateCategory", method = RequestMethod.POST)
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
				ProductCategory cat = mapper.readValue(job.get("headerData").toString(),
						new TypeReference<ProductCategory>() {
						});

				entityService.setDefaults(cat, u);

				if (cat.getId() > 0) {
					query = new DbOomQuery(session, DbEntitySql.update(cat));
				} else {
					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(ProductCategory.class, cat));
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
	@RequestMapping(value = "deletecategory", method = RequestMethod.POST)
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
				queryString.append("delete $t from $T{ProductCategory t} where $t.id=" + id);
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

}
