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
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;

import com.custommodels.ResponseBean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interfaces.ISpringController;
import com.models.PurchaseDtl;
import com.models.PurchaseHdr;
import com.models.StockDtl;
import com.models.StockHdr;
import com.models.Users;
import com.services.AppConnectionProvider;
import com.services.DBService;
import com.services.EntityService;

import jodd.db.DbSession;
import jodd.db.DbTransactionMode;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;

@RestController
public class StockAdjustController implements ISpringController {

	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Override
	@RequestMapping(value = "loadStockbypage", method = RequestMethod.POST)
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

				
			
				queryString.append("select $C{t.*} from $T{StockHdr t} where 1=1");
				
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.documentno='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				int count = query.list(StockHdr.class).size();
				
				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<StockHdr> listData = query.list(StockHdr.class);

				
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
	public ResponseBean loadAllActive(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "loadStockById", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{StockHdr t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				StockHdr data = query.find(StockHdr.class);

				queryString.delete(0, queryString.length());

				queryString.append("select $C{t.*} from $T{StockDtl t} where 1=1");
				queryString.append(" and $t.stockhdrid='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				List<StockDtl> detailData = query.list(StockDtl.class);

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
	@RequestMapping(value = "saveOrUpdateStock", method = RequestMethod.POST)
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

				StockHdr hdr = mapper.readValue(job.get("headerData").toString(),
						new TypeReference<StockHdr>() {
						});
				JSONArray arr = job.getJSONArray("gridData");

				entityService.setDefaults(hdr, u);

				if (hdr.getId() != 0) {

					query = new DbOomQuery(session,
							DbSqlBuilder.sql(
									"delete $t from $T{StockDtl t} where $t.stockhdrid='"
											+ hdr.getId() + "'"));
					query.executeUpdate();

					query = new DbOomQuery(session, DbEntitySql.update(hdr));
					query.setGeneratedColumns("id");
					
					query.executeUpdate();
					int hdrId = hdr.getId();

					for (int i = 0; i < arr.length(); i++) {
						StockDtl dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<StockDtl>() {
								});

						entityService.setDefaults(dtl, u);
						dtl.setStockhdrid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();
					}
				} else {

					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(StockHdr.class, hdr));
					query.setGeneratedColumns("id");
					query.executeUpdate();
					int hdrId = (int) query.getGeneratedKey();

					for (int i = 0; i < arr.length(); i++) {
						StockDtl dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<StockDtl>() {
								});
						entityService.setDefaults(dtl, u);
						dtl.setStockhdrid(hdrId);

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
	@RequestMapping(value = "deleteStock", method = RequestMethod.POST)
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
				queryString.append(
						"delete $t from $T{StockDtl t} where $t.stockhdrid=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{StockHdr t} where $t.id=" + id);
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
