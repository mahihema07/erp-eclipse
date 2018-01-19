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
import com.models.Currency;
import com.models.PurchaseDtl;
import com.models.PurchaseHdr;
import com.models.SalesDtl;
import com.models.SalesHdr;
import com.models.StockDtl;
import com.models.StockHdr;
import com.models.StockMainDtl;
import com.models.StockMainHdr;
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
public class StockController implements ISpringController{
	


	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Override
	public ResponseBean loadByPage(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseBean loadAllActive(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "loadStockMainById", method = RequestMethod.POST)
	public ResponseBean loadById(HttpSession sess, @RequestBody String body) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();
			String id = body;
			

			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.id} from $T{StockMainHdr t} where 1=1");

				queryString.append(" and $t.parenttablekey='" + id + "'");
				
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				
				StockMainHdr data = query.find(StockMainHdr.class);
	
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
	@RequestMapping(value = "saveOrUpdateStockMain", method = RequestMethod.POST)
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
				
				StockMainHdr hdr = mapper.readValue(job.get("headerData").toString(),
						new TypeReference<StockMainHdr>() {
						});
				
				
				
				JSONArray arr = job.getJSONArray("gridData");
				String tablename=job.getString("tablename");
				int hdrid=job.getInt("hdrid");
				
				entityService.setDefaults(hdr, u);
				
				if (hdr.getId() != 0) {
					
					query = new DbOomQuery(session,
							DbSqlBuilder.sql(
									"delete $t from $T{StockMainDtl t} where $t.stockhdrid='" + hdr.getId() + "'"));
					query.executeUpdate();
					hdr.setTablename(tablename);
					hdr.setParenttablekey(hdrid);
					query = new DbOomQuery(session, DbEntitySql.update(hdr));
					query.setGeneratedColumns("id");
					
					query.executeUpdate();
					int hdrId = hdr.getId();

					for (int i = 0; i < arr.length(); i++) {
						StockMainDtl dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<StockMainDtl>() {
								});
						
						entityService.setDefaults(dtl, u);
						dtl.setStockhdrid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();
					}
				} else {
				
					hdr.setTablename(tablename);
					hdr.setParenttablekey(hdrid);
					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(StockMainHdr.class, hdr));
					query.setGeneratedColumns("id");
					query.executeUpdate();
					int stockhdrId = (int) query.getGeneratedKey();

					for (int i = 0; i < arr.length(); i++) {
						StockMainDtl dtl = mapper.readValue(arr.get(i).toString(),
								new TypeReference<StockMainDtl>() {
								});

						entityService.setDefaults(dtl, u);
						dtl.setStockhdrid(stockhdrId);
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
	public ResponseBean deleteById(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

}
