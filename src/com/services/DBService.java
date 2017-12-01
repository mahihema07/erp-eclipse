package com.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

import com.models.Users;

import jodd.db.DbManager;
import jodd.db.ThreadDbSessionProvider;
import jodd.db.connection.ConnectionProvider;
import jodd.db.oom.DbOomManager;
import jodd.db.oom.config.AutomagicDbOomConfigurator;
import jodd.db.pool.CoreConnectionPool;

@PropertySource("classpath:application.properties")
@Service("dbService")
public class DBService {

	@Autowired
	public Environment env;

	private Connection connection = null;
	
	public Connection getConnection() throws Exception{
		
		if(connection==null || connection.isClosed()) {
			String mode = env.getProperty("mode");
			String driverClass = env.getProperty(mode + ".dbDriver");
			String url = env.getProperty(mode + ".url");
			String username = env.getProperty(mode + ".username");
			String password = env.getProperty(mode + ".password");
			
			Class.forName(driverClass);
			connection = DriverManager.getConnection(url, username, password);
		}
				
		return connection;
	}

	public void closeConnection() {
		try {
			if(connection!=null && !connection.isClosed()) {
				connection.close();	
				connection=null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public DriverManagerDataSource getDataSource() {
		String mode = env.getProperty("mode");
		String driverClass = env.getProperty(mode + ".dbDriver");
		String url = env.getProperty(mode + ".url");
		String username = env.getProperty(mode + ".username");
		String password = env.getProperty(mode + ".password");
		
		DriverManagerDataSource ds = new DriverManagerDataSource();
	    ds.setDriverClassName(driverClass);
	    ds.setUrl(url);
	    ds.setUsername(username);
	    ds.setPassword(password	);
	    
	    return ds;
	}
	
	
	
	
}
