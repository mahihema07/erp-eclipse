package com.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import jodd.db.DbSession;
import jodd.db.DbTransactionMode;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.constants.TableNames;
import com.custommodels.ResponseBean;

import com.custommodels.PurchaseHdrListModel;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interfaces.ISpringController;
import com.models.PurchaseDtl;
import com.models.PurchaseHdr;
import com.models.StockMainDtl;
import com.models.StockMainHdr;
import com.models.Users;
import com.services.AppConnectionProvider;
import com.services.DBService;
import com.services.EntityService;
import com.services.StockService;

@RestController
public class PurchaseController implements ISpringController {

	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Autowired
	StockService stockService;

	@Override
	@RequestMapping(value = "loadPurchasebypage", method = RequestMethod.POST)
	public ResponseBean loadByPage(HttpSession sess, @RequestBody String body) {
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

				queryString.append("select $C{p.*},$C{s.supplierName} as supplierName from $T{PurchaseHdr p} ");
				queryString.append("left join $T{Suppliers s}  ");
				queryString.append("on $p.supplierid=$s.id ");

				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $p.documentno='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				int count = query.list(PurchaseHdr.class).size();

				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<PurchaseHdrListModel> listData = query.withHints("p", "p.supplierName")
						.list(PurchaseHdrListModel.class, String.class);

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true, count,
						listData);

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
	public ResponseBean loadAllActive(HttpSession sess, String body) {
		return null;
	}

	@Override
	@RequestMapping(value = "loadPurchaseById", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{PurchaseHdr t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				PurchaseHdr data = query.find(PurchaseHdr.class);

				queryString.delete(0, queryString.length());

				queryString.append("select $C{t.*} from $T{PurchaseDtl t} where 1=1");
				queryString.append(" and $t.purchasehdrid='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				List<PurchaseDtl> detailData = query.list(PurchaseDtl.class);

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
	@RequestMapping(value = "saveOrUpdatePurchase", method = RequestMethod.POST)
	public ResponseBean saveOrUpdate(HttpSession sess, @RequestBody String body) throws Exception {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));

			JSONObject job = new JSONObject(body);
			int hdrId;
			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
						false);

				PurchaseHdr hdr = mapper.readValue(job.get("headerData").toString(), new TypeReference<PurchaseHdr>() {
				});
				JSONArray arr = job.getJSONArray("gridData");

				entityService.setDefaults(hdr, u);

				if (hdr.getId() != 0) {

					query = new DbOomQuery(session, DbSqlBuilder
							.sql("delete $t from $T{PurchaseDtl t} where $t.purchasehdrid='" + hdr.getId() + "'"));
					query.executeUpdate();

					query = new DbOomQuery(session, DbEntitySql.update(hdr));
					query.setGeneratedColumns("id");

					query.executeUpdate();
					hdrId = hdr.getId();

					List<StockMainDtl> stockDetails = new ArrayList<StockMainDtl>();

					for (int i = 0; i < arr.length(); i++) {
						PurchaseDtl dtl = mapper.readValue(arr.get(i).toString(), new TypeReference<PurchaseDtl>() {
						});

						entityService.setDefaults(dtl, u);
						dtl.setPurchasehdrid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();

						StockMainDtl stockDtl = new StockMainDtl();
						stockDtl.setProducthdrid(dtl.getProducthdrid());
						stockDtl.setProductdtlid(dtl.getProductdtlid());
						stockDtl.setQuantity(dtl.getQuantity());
						stockDtl.setRate(dtl.getRate());
						entityService.setDefaults(stockDtl, u);
						stockDetails.add(stockDtl);

					}
					StockMainHdr stockHdr = stockService.getStockHdr(TableNames.Purchase.getTableName(), hdrId,
							session);

					stockHdr.setTablename(TableNames.Purchase.getTableName());
					stockHdr.setParenttablekey(hdrId);
					stockHdr.setDate(hdr.getPurchasedate());
					stockHdr.setDocumentno(hdr.getDocumentno());
					entityService.setDefaults(stockHdr, u);

					stockService.updateStock(stockHdr, stockDetails, session);
				} else {

					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(PurchaseHdr.class, hdr));
					query.setGeneratedColumns("id");
					query.executeUpdate();
					hdrId = (int) query.getGeneratedKey();

					List<StockMainDtl> stockDetails = new ArrayList<StockMainDtl>();

					for (int i = 0; i < arr.length(); i++) {
						PurchaseDtl dtl = mapper.readValue(arr.get(i).toString(), new TypeReference<PurchaseDtl>() {
						});
						entityService.setDefaults(dtl, u);
						dtl.setPurchasehdrid(hdrId);
						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();

						StockMainDtl stockDtl = new StockMainDtl();

						stockDtl.setProducthdrid(dtl.getProducthdrid());
						stockDtl.setProductdtlid(dtl.getProductdtlid());
						stockDtl.setQuantity(dtl.getQuantity());
						stockDtl.setRate(dtl.getRate());
						entityService.setDefaults(stockDtl, u);
						stockDetails.add(stockDtl);
					}

					StockMainHdr stockHdr = new StockMainHdr();
					stockHdr.setTablename(TableNames.Purchase.getTableName());
					stockHdr.setParenttablekey(hdrId);
					stockHdr.setDate(hdr.getPurchasedate());
					stockHdr.setDocumentno(hdr.getDocumentno());
					entityService.setDefaults(stockHdr, u);

					stockService.insertStock(stockHdr, stockDetails, session);
				}

				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						"Operation Successfull");
			}

			session.commitTransaction();
		} catch (Exception e) {
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), true, e.getMessage());
			e.printStackTrace();
		} finally {
			session.closeSession();
		}
		return responseBean;

	}

	@Override
	@RequestMapping(value = "deletePurchase", method = RequestMethod.POST)
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
				queryString.append("delete $t from $T{PurchaseDtl t} where $t.purchasehdrid=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{PurchaseHdr t} where $t.id=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();
				stockService.deleteStock(TableNames.Purchase.getTableName(), id, session);
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
