package com.services;

import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

import org.openxmlformats.schemas.wordprocessingml.x2006.main.impl.HdrDocumentImpl;
import org.springframework.stereotype.Service;

import com.constants.AppConstants;
import com.custommodels.ResponseBean;
import com.custommodels.SalesHdrList;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.models.StockMainDtl;
import com.models.StockMainHdr;
import com.models.Users;

import jodd.db.DbSession;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;

@Service("stockService")
public class StockService {

	public StockMainHdr getStockHdr(String parentTableName, int parentKey, DbSession session) {
		try {
			StringBuilder queryString = new StringBuilder();

			queryString.append("select $C{p.*} from $T{StockMainHdr p} ");
			queryString.append("where $p.tablename='" + parentTableName + "' ");
			queryString.append("and $p.parenttablekey=" + parentKey);
			DbOomQuery query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

			List<StockMainHdr> listData = query.list(StockMainHdr.class);
			if (listData.size() > 0) {
				return listData.get(0);
			} else {
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public ResponseBean updateStock(StockMainHdr stockModel, List<StockMainDtl> stockDetails, DbSession session) {
		DbOomQuery query = null;
		ResponseBean responseBean = null;
		try {
			query = new DbOomQuery(session, DbEntitySql.update(stockModel));
			query.executeUpdate();

			int hdrId = stockModel.getId();
			StringBuilder queryString = new StringBuilder();
			queryString.append("delete $t from $T{StockMainDtl t} where $t.stockhdrid=" + hdrId);
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
			query.executeUpdate();

			for (StockMainDtl dtl : stockDetails) {
				dtl.setStockhdrid(hdrId);
				query = new DbOomQuery(session, DbEntitySql.insert(dtl));
				query.executeUpdate();
			}

			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
					"Operation Successfull");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseBean;
	}

	public ResponseBean deleteStock(String tableName, String primaryKey, DbSession session) {
		DbOomQuery query = null;
		ResponseBean responseBean = null;
		try {
			StringBuilder queryString = null;

			queryString = new StringBuilder();
			queryString.append("delete $t from $T{StockMainDtl t} where $t.stockhdrid=" + primaryKey);
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
			query.executeUpdate();

			queryString = new StringBuilder();
			queryString.append("delete $t from $T{StockMainHdr t} where $t.tablename='" + tableName
					+ "' and $t.parenttablekey='" + primaryKey + "'");
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
			query.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseBean;
	}

	public ResponseBean insertStock(StockMainHdr stockHdr, List<StockMainDtl> stockDetails, DbSession session) {
		DbOomQuery query = null;
		ResponseBean responseBean = null;
		try {
			query = new DbOomQuery(session, DbEntitySql.insert(stockHdr));
			query.setGeneratedColumns("id");
			query.executeUpdate();

			int hdrId = (int) query.getGeneratedKey();

			for (StockMainDtl dtl : stockDetails) {
				dtl.setStockhdrid(hdrId);
				query = new DbOomQuery(session, DbEntitySql.insert(dtl));
				query.executeUpdate();
			}
			responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
					"Operation Successfull");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseBean;
	}
}
