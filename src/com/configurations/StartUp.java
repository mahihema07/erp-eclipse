package com.configurations;

import org.springframework.stereotype.Component;

import jodd.db.oom.DbOomManager;
import jodd.db.oom.config.AutomagicDbOomConfigurator;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

@Component
public class StartUp implements ApplicationListener<ContextRefreshedEvent> {

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		DbOomManager dbOomManager = DbOomManager.getInstance();
		AutomagicDbOomConfigurator dbcfg = new AutomagicDbOomConfigurator();
		dbcfg.setIncludedEntries("com.models.*");
		dbcfg.configure(dbOomManager);
	}

}
