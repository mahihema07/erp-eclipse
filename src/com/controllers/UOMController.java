package com.controllers;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constants.AppConstants;
import com.constants.AppConstantsOld;
import com.custommodels.ResponseBean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.interfaces.ISpringController;
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
public class UOMController implements ISpringController {

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
	public ResponseBean loadById(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseBean saveOrUpdate(HttpSession sess, String body) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseBean deleteById(HttpSession sess, String body) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@RequestMapping(value = "loadalluoms", method = RequestMethod.POST)
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
				queryString.append("select $C{t.*} from $T{Uom t} where $t.isActive=1");
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString())).autoClose();
				List<Uom> specificationComponents = query.list(Uom.class);
				responseBean = new ResponseBean(AppConstants.RESPONSE_STATUS_VALUES.SUCCESS.name(), true,
						specificationComponents);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return responseBean;
		}
	}

	@RequestMapping(value = "selectUomData", method = RequestMethod.POST)
	public String selectUomData(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstantsOld.SESSION_VARIABLE_USER);

			if (u == null) {
				job.put("status", "error");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, false);
			} else {
				DbOomManager.getInstance().registerEntity(Uom.class);

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{Uom t} ");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				List uom = query.list(Uom.class);

				job.put("status", "success");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, true);
				job.put("data", new JsonSerializer().serialize(uom));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return ret;
		}

	}

	@RequestMapping(value = "loadspecificationuombypage", method = RequestMethod.POST)
	public String loadspecificationuombypage(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject(body);

			int pageNumber = job.getInt("pageNumber");
			int rowsOnPage = job.getInt("rowsOnPage");
			String searchFilter = job.getString("searchFilter");

			Users u = (Users) sess.getAttribute(AppConstantsOld.SESSION_VARIABLE_USER);

			if (u == null) {
				job.put("status", "error");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, false);
			} else {
				DbOomManager.getInstance().registerEntity(Uom.class);

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{Uom t} where 1=1");
				if (searchFilter != null && searchFilter.length() > 0) {
					queryString.append(" and $t.uomName='" + searchFilter + "'");
				}

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				int count = query.list(Uom.class).size();

				if (rowsOnPage > 0) {
					queryString.append(" LIMIT " + rowsOnPage);
				}
				if (pageNumber > 0) {
					queryString.append(" OFFSET " + (pageNumber - 1) * rowsOnPage);
				}
				query.close();
				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));
				List<Uom> specificationuom = query.list(Uom.class);

				job.put("status", "success");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, true);
				job.put("count", count);
				job.put("data", new JsonSerializer().serialize(specificationuom));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return ret;
		}

	}

	@RequestMapping(value = "loadSpecificationUomCrudPageById", method = RequestMethod.POST)
	public String loadSpecificationUomCrudPageById(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		try {
			JSONObject job = new JSONObject();

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstantsOld.SESSION_VARIABLE_USER);

			if (u == null) {
				job.put("status", "error");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, false);
			} else {

				StringBuilder queryString = new StringBuilder();

				queryString.append("select $C{t.*} from $T{Uom t} where 1=1");

				queryString.append(" and $t.id='" + id + "'");

				query = new DbOomQuery(session, DbSqlBuilder.sql(queryString.toString()));

				Uom specificationuom = query.find(Uom.class);

				job.put("status", "success");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, true);
				job.put("data", new JsonSerializer().serialize(specificationuom));
			}

			ret = job.toString();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			session.closeSession();
			return ret;
		}

	}

	@RequestMapping(value = "saveUomDataById", method = RequestMethod.POST)
	public String saveUomDataById(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		JSONObject job = new JSONObject();
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));
			
			String data = body;

			Users u = (Users) sess.getAttribute(AppConstantsOld.SESSION_VARIABLE_USER);

			if (u == null) {
				job.put("status", "error");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, false);
			} else {
				DbOomManager.getInstance().registerEntity(Uom.class);

				ObjectMapper mapper = new ObjectMapper();
				Uom uom = mapper.readValue(body, new TypeReference<Uom>() {
				});

				entityService.setDefaults(uom, u);

				if (uom.getId() > 0) {
					query = new DbOomQuery(session, DbEntitySql.update(uom));
				} else {
					query = new DbOomQuery(session, DbSqlBuilder.sql().insert(Uom.class, uom));
				}
				
				query.executeUpdate();

				job.put("status", "success");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, true);
				job.put("data", new JsonSerializer().serialize(uom));
			}

			ret = job.toString();
		} catch (Exception e) {
			session.rollbackTransaction();
			e.printStackTrace();
		} finally {
			session.commitTransaction();
			session.closeSession();
		}
		ret = job.toString();
		return ret;
	}

	@RequestMapping(value = "deleteUomDataById", method = RequestMethod.POST)
	public String deleteUomDataById(HttpSession sess, @RequestBody String body) {
		String ret = "";
		DbOomQuery query = null;
		ConnectionProvider cp = new AppConnectionProvider();
		DbSession session = new DbSession(cp);
		JSONObject job = new JSONObject();
		try {
			session.beginTransaction(new DbTransactionMode().setReadOnly(false));

			String id = body;

			Users u = (Users) sess.getAttribute(AppConstantsOld.SESSION_VARIABLE_USER);

			if (u == null) {
				job.put("status", "error");
				job.put(AppConstantsOld.RESPONSE_VARIABLE_ISAUTHENTICATED, false);
			} else {

				String sid = body;

				query = new DbOomQuery(session, DbSqlBuilder.sql("delete from  $T{Uom}" + "  where id='" + sid + "'"));

				query.executeUpdate();

				job.put("status", "success");

			}

		} catch (Exception e) {
			session.rollbackTransaction();
			job.put("status", e.getMessage());
			e.printStackTrace();
		} finally {
			if(session.isTransactionActive())
			session.commitTransaction();
			session.closeSession();
		}
		ret = job.toString();
		return ret;
	}

}
