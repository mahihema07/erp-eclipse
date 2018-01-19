package com.services;

import java.util.List;

import org.hibernate.id.IdentityGenerator.GetGeneratedKeysDelegate;
import org.springframework.stereotype.Service;

import com.constants.AppConstants;
import com.custommodels.ResponseBean;
import com.models.AccountsDtl;
import com.models.AccountsHdr;
import com.models.StockMainDtl;

import jodd.db.DbSession;
import jodd.db.oom.DbOomQuery;
import jodd.db.oom.sqlgen.DbEntitySql;
import jodd.db.oom.sqlgen.DbSqlBuilder;

@Service("accountService")
public class AccountService {

	public void getChartsOfAccount() {
		
	}
	
	public AccountsHdr getAccounts(String tableName, int parentKey, DbSession session) {

		try {
			StringBuilder queryString = new StringBuilder();
			queryString.append("select $C{p.*} from $T{AccountsHdr p} ");
			queryString.append("where $p.tablename='" + tableName + "' ");
			queryString.append("and $p.parenttablekey=" + parentKey);
			DbOomQuery query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
			List<AccountsHdr> listData = query.list(AccountsHdr.class);

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

	public ResponseBean insertAccount(AccountsHdr accountHdr,List<AccountsDtl> accountDetails,  DbSession session) {
		DbOomQuery query = null;
		ResponseBean responseBean = null;
		String voucherno = "vch";
		int coa_id=1;
		try {
			// String newvoucherno = "vch" +
			// (Integer.parseInt(voucherno.substring(1,voucherno.length()))+1);
			// System.out.print("newvoucherno"+newvoucherno);
			accountHdr.setVoucherno(voucherno);
			query = new DbOomQuery(session, DbEntitySql.insert(accountHdr));
			query.setGeneratedColumns("id");
			query.executeUpdate();
			int hdrId = (int) query.getGeneratedKey();
			
			for (AccountsDtl dtl : accountDetails) {
				dtl.setAccountsHdrId(hdrId);
				dtl.setVoucherNo(voucherno);
				dtl.setCoaId(coa_id);
				query = new DbOomQuery(session, DbEntitySql.insert(dtl));
				query.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return responseBean;

	}

	public ResponseBean updateAccount(AccountsHdr accountHdr,List<AccountsDtl> accountDetails, DbSession session) {
		ResponseBean responseBean = null;
		DbOomQuery query = null;
		String voucherno = "vch";
		try {
			query = new DbOomQuery(session, DbEntitySql.update(accountHdr));
			query.executeUpdate();
			int hdrId = accountHdr.getId();
			StringBuilder queryString = new StringBuilder();
			queryString.append("delete $t from $T{AccountsDtl t} where $t.accountsHdrId=" + hdrId);
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
			query.executeUpdate();
			
			for (AccountsDtl dtl : accountDetails) {
				dtl.setVoucherNo(voucherno);
				dtl.setAccountsHdrId(hdrId);
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

	public ResponseBean deleteAccount(String tablename, String primarykey, DbSession session) {

		DbOomQuery query = null;
		try {
			StringBuilder queryString = null;

			
			  queryString = new StringBuilder();
			  queryString.append("delete $t from $T{AccountsDtl t} where $t.accountsHdrId="
			  + primarykey); 
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
			  query.executeUpdate();
			  
			queryString = new StringBuilder();
			queryString.append("delete $t from $T{AccountsHdr t} where $t.tablename='" + tablename
					+ "' and $t.parenttablekey='" + primarykey + "'");
			query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
			query.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}
}
