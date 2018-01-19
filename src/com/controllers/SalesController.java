package com.controllers;

import java.util.ArrayList;
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
import com.constants.TableNames;
import com.custommodels.ResponseBean;
import com.custommodels.SalesHdrList;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interfaces.ISpringController;
import com.models.AccountsDtl;
import com.models.AccountsHdr;
import com.models.SalesDtl;
import com.models.SalesHdr;
import com.models.StockMainDtl;
import com.models.StockMainHdr;
import com.models.Users;
import com.services.AccountService;
import com.services.AppConnectionProvider;
import com.services.DBService;
import com.services.EntityService;
import com.services.StockService;

import jodd.db.DbSession;
import jodd.db.DbTransactionMode;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;

@RestController
public class SalesController implements ISpringController {

	@Autowired
	DBService dbService;

	@Autowired
	EntityService entityService;

	@Autowired
	StockService stockService;

	@Autowired
	AccountService accountService;

	@Override
	@RequestMapping(value = "loadSalesbypage", method = RequestMethod.POST)
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

				queryString.append("select $C{p.*},$C{s.customerName} as customerName from $T{SalesHdr p} ");
				queryString.append("left join $T{Customers s}  ");
				queryString.append("on $p.customerid=$s.id ");

				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $p.documentno='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				int count = query.list(SalesHdr.class).size();

				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<SalesHdrList> listData = query.withHints("p", "p.customerName").list(SalesHdrList.class,
						String.class);

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "loadSalesById", method = RequestMethod.POST)
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

				queryString.append("select $C{t.*} from $T{SalesHdr t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				SalesHdr data = query.find(SalesHdr.class);

				queryString.delete(0, queryString.length());

				queryString.append("select $C{t.*} from $T{SalesDtl t} where 1=1");
				queryString.append(" and $t.saleshdrid='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				List<SalesDtl> detailData = query.list(SalesDtl.class);

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
	@RequestMapping(value = "saveOrUpdateSales", method = RequestMethod.POST)
	public ResponseBean saveOrUpdate(HttpSession sess, @RequestBody String body) throws Exception {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));

			JSONObject job = new JSONObject(body);
			int hdrId = 0;
			Users u = (Users) sess.getAttribute(AppConstants.SESSION_VARIABLES.USER.name());

			if (u == null) {
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.ERROR.name(), false);
			} else {

				ObjectMapper mapper = new ObjectMapper().configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
						false);

				SalesHdr hdr = mapper.readValue(job.get("headerData").toString(), new TypeReference<SalesHdr>() {
				});

				JSONArray arr = job.getJSONArray("gridData");

				entityService.setDefaults(hdr, u);

				if (hdr.getId() != 0) {

					query = new DbOomQuery(session, DbSqlBuilder
							.sql("delete $t from $T{SalesDtl t} where $t.saleshdrid='" + hdr.getId() + "'"));
					query.executeUpdate();

					query = new DbOomQuery(session, DbEntitySql.update(hdr));
					query.setGeneratedColumns("id");

					query.executeUpdate();
					hdrId = hdr.getId();

					List<StockMainDtl> stockDetails = new ArrayList<StockMainDtl>();
					List<AccountsDtl> accountDetails = new ArrayList<AccountsDtl>();
					for (int i = 0; i < arr.length(); i++) {
						SalesDtl dtl = mapper.readValue(arr.get(i).toString(), new TypeReference<SalesDtl>() {
						});

						entityService.setDefaults(dtl, u);
						dtl.setSalesentryhdrid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();

						StockMainDtl stockDtl = new StockMainDtl();
						stockDtl.setProductdtlid(dtl.getProductdtlid());
						stockDtl.setProducthdrid(dtl.getProducthdrid());
						stockDtl.setQuantity(dtl.getQuantity() * -1);
						stockDtl.setRate(dtl.getRate());
						entityService.setDefaults(stockDtl, u);
						stockDetails.add(stockDtl);
						
						AccountsDtl accountDtl = new AccountsDtl();
						accountDtl.setAmount(dtl.getTotalprice());
						accountDtl.setAccountsHdrId(hdrId);
						accountDtl.setAccountedDate(hdr.getAccounteddate());
						entityService.setDefaults(accountDtl, u);
						accountDetails.add(accountDtl);
					}

					StockMainHdr stockHdr = stockService.getStockHdr(TableNames.Sales.getTableName(), hdrId, session);
					stockHdr.setTablename(TableNames.Sales.getTableName());
					stockHdr.setParenttablekey(hdrId);
					stockHdr.setDate(hdr.getSalesdate());
					stockHdr.setDocumentno(hdr.getDocumentno());
					entityService.setDefaults(stockHdr, u);
					stockService.updateStock(stockHdr, stockDetails, session);

					AccountsHdr accountHdr = accountService.getAccounts(TableNames.Sales.getTableName(), hdrId,
							session);
					accountHdr.setTablename(TableNames.Sales.getTableName());
					accountHdr.setParenttablekey(hdrId);
					accountHdr.setAccounteddate(hdr.getAccounteddate());
					accountService.updateAccount(accountHdr,accountDetails, session);

				} else {

					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(SalesHdr.class, hdr));
					query.setGeneratedColumns("id");
					query.executeUpdate();
					hdrId = (int) query.getGeneratedKey();

					List<StockMainDtl> stockDetails = new ArrayList<StockMainDtl>();
					List<AccountsDtl> accountDetails = new ArrayList<AccountsDtl>();

					for (int i = 0; i < arr.length(); i++) {
						SalesDtl dtl = mapper.readValue(arr.get(i).toString(), new TypeReference<SalesDtl>() {
						});
						entityService.setDefaults(dtl, u);
						dtl.setSalesentryhdrid(hdrId);

						query = new DbOomQuery(session, DbEntitySql.insert(dtl));
						query.executeUpdate();

						StockMainDtl stockDtl = new StockMainDtl();
						stockDtl.setProductdtlid(dtl.getProductdtlid());
						stockDtl.setProducthdrid(dtl.getProducthdrid());
						stockDtl.setQuantity(dtl.getQuantity() * -1);
						stockDtl.setRate(dtl.getRate());
						entityService.setDefaults(stockDtl, u);
						stockDetails.add(stockDtl);

						AccountsDtl accountDtl = new AccountsDtl();
						accountDtl.setAmount(dtl.getTotalprice());
						accountDtl.setAccountsHdrId(hdrId);
						accountDtl.setAccountedDate(hdr.getAccounteddate());
						entityService.setDefaults(accountDtl, u);
						accountDetails.add(accountDtl);

					}

					StockMainHdr stockHdr = new StockMainHdr();
					stockHdr.setTablename(TableNames.Sales.getTableName());
					stockHdr.setParenttablekey(hdrId);
					stockHdr.setDate(hdr.getSalesdate());
					stockHdr.setDocumentno(hdr.getDocumentno());
					entityService.setDefaults(stockHdr, u);
					stockService.insertStock(stockHdr, stockDetails, session);

					AccountsHdr accountHdr = new AccountsHdr();
					accountHdr.setTablename(TableNames.Sales.getTableName());
					accountHdr.setParenttablekey(hdrId);
					accountHdr.setAccounteddate(hdr.getAccounteddate());
					// accountHdr.setVoucherno("1");
					entityService.setDefaults(accountHdr, u);
					accountService.insertAccount(accountHdr,accountDetails, session);

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
	@RequestMapping(value = "deleteSales", method = RequestMethod.POST)
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
				queryString.append("delete $t from $T{SalesDtl t} where $t.saleshdrid=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				queryString = new StringBuilder();
				queryString.append("delete $t from $T{SalesHdr t} where $t.id=" + id);
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				query.executeUpdate();

				stockService.deleteStock(TableNames.Sales.getTableName(), id, session);
				accountService.deleteAccount(TableNames.Sales.getTableName(), id, session);
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
