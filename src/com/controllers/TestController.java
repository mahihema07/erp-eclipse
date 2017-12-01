package com.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@PropertySource("classpath:application.properties")
@RestController
public class TestController {
	
	@Autowired
	public Environment env;

	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {
		
		return env.getProperty("mode");
	}
}
