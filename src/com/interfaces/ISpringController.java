package com.interfaces;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestBody;

import com.custommodels.ResponseBean;

public interface ISpringController {

	public ResponseBean loadByPage(HttpSession sess, @RequestBody String body);
	
	public ResponseBean loadAllActive(HttpSession sess, @RequestBody String body);

	public ResponseBean loadById(HttpSession sess, @RequestBody String body);

	public ResponseBean saveOrUpdate(HttpSession sess, @RequestBody String body) throws Exception;
	
	public ResponseBean deleteById(HttpSession sess, @RequestBody String body);
}
