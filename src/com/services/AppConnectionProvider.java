package com.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.configurations.ApplicationProperties;

import jodd.db.connection.ConnectionProvider;

public class AppConnectionProvider implements ConnectionProvider {

	Connection connection = null;

	public AppConnectionProvider() {
		ApplicationProperties appProperties = new ApplicationProperties();
		try {
			String mode = appProperties.getPropertyValue("mode");
			String driverClass = appProperties.getPropertyValue(mode + ".dbDriver");
			String url = appProperties.getPropertyValue(mode + ".url");
			String username = appProperties.getPropertyValue(mode + ".username");
			String password = appProperties.getPropertyValue(mode + ".password");

			Class.forName(driverClass);
			connection = DriverManager.getConnection(url, username, password);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void close() {
		// TODO Auto-generated method stub

	}

	@Override
	public void closeConnection(Connection conn) {
		try {
			if (conn != null || !conn.isClosed()) {
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	@Override
	public Connection getConnection() {
		try {
			return connection;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void init() {
		// TODO Auto-generated method stub

	}

}
