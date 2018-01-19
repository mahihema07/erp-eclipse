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
import com.models.Customers;
import com.models.CustomersAddress;
import com.models.ProductCategory;
import com.models.ProductSpecificationDtl;
import com.models.ProductsDtl;
import com.models.ProductsHdr;
import com.models.Suppliers;
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
public class CustomersController implements ISpringController {
	
	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Override
	@RequestMapping(value = "loadCustomersbypage", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{Customers t} where 1=1");
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.customerName='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				
				

				int count = query.list(Customers.class).size();
				
				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<Customers> listData = query.list(Customers.class);

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
	@RequestMapping(value = "loadCustomersById", method = RequestMethod.POST)
	public ResponseBean loadById(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			

			String id = body;
			

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				StringBuilder queryString = new StringBuilder();
				

				queryString.append("select $C{t.*} from $T{Customers t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				Customers data = query.find(Customers.class);
				

				queryString.delete(0, queryString.length());
				
				queryString.append("select $C{t.*} from $T{CustomersAddress t} where 1=1");
				queryString.append(" and $t.customerid='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				List<CustomersAddress> detailData = query.list(CustomersAddress.class);
				

				Map<String, Object> dt = new HashMap<String, Object>();
				
				dt.put("headerData", data);
				
				dt.put("detailData", detailData);

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
	@RequestMapping(value = "loadAllCustomers", method = RequestMethod.POST)
	public ResponseBean loadAllActive(HttpSession sess, String body) {
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
				queryString.append("select $C{t.*} from $T{Customers t} where $t.isActive=1");
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				List<Customers> cus = query.list(Customers.class);
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						cus);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return responseBean;
		}
	}




	@Override
	@RequestMapping(value = "saveOrUpdateCustomers", method = RequestMethod.POST)
	public ResponseBean saveOrUpdate(HttpSession sess, @RequestBody  String body) throws Exception {
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

				Customers hdr = mapper.readValue(job.get("headerData").toString(),
						new TypeReference<Customers>() {
						});
				JSONArray arr = job.getJSONArray("gridData");

				entityService.setDefaults(hdr, u);

				if (hdr.getId() != 0) {

					query = new DbOomQuery(session,
							DbSqlBuilder.sql(
									"delete $t from $T{CustomersAddress t} where $t.customerid='"
											+ hdr.getId() + "'"));
					query.executeUpdate();

					query = new DbOomQuery(session, DbEntitySql.update(hdr));
					query.setGeneratedColumns("id");
					
					query.executeUpdate();
					int hdrId = hdr.getId();

					for (int i = 0; i < arr.length(); i++) {
						CustomersAddress dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<CustomersAddress>() {
								});

						entityService.setDefaults(dtl, u);
						dtl.setCustomerid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();
					}
				} else {
					
					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(Customers.class, hdr));
					query.setGeneratedColumns("id");
					query.executeUpdate();
					int hdrId = (int) query.getGeneratedKey();

					for (int i = 0; i < arr.length(); i++) {
						CustomersAddress dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<CustomersAddress>() {
								});
						entityService.setDefaults(dtl, u);
						dtl.setCustomerid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();
					}
				}

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
	@RequestMapping(value = "deleteCustomers", method = RequestMethod.POST)
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
				
				queryString.append("delete $t from $T{CustomersAddress t} where $t.customerid=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{Customers t} where $t.id=" + id);
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
