package com.configurations;

import java.io.InputStream;
import java.util.Properties;

public class ApplicationProperties {
	
	public Properties prop=null;
	
	public ApplicationProperties() {
		try {
			InputStream is=null;
			this.prop=new Properties();
			is=this.getClass().getResourceAsStream("/application.properties");
			prop.load(is);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public String getPropertyValue(String key) {
		return this.prop.getProperty(key);
	}

}
