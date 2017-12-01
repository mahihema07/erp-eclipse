package com.interceptors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.constants.AppConstants;
import com.models.Users;

public class RequestInterceptor extends HandlerInterceptorAdapter {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		Users u = (Users) request.getSession().getAttribute(AppConstants.SESSION_VARIABLES.USER.name());
		JSONObject job = new JSONObject();
		if (u == null) {
			job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(),
					AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
			job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);

			response.setContentType("application/json");
			response.getWriter().write(job.toString());

			return false;
		} else {
			return true;
		}

		// return true;
		/*
		 * System.out.println("inside inteceptor URL : " +
		 * request.getRequestURL().toString()); JSONObject job = new JSONObject();
		 * 
		 * Users u = (Users)
		 * request.getSession().getAttribute(AppConstants.SESSION_VARIABLES.USER.name())
		 * ;
		 * 
		 * if (u == null || 1==1) {
		 * job.put(AppConstants.HTTP_RESPONSES.RESPONSE_STATUS.name(),
		 * AppConstants.RESPONSE_STATUS_VALUES.ERROR.name());
		 * job.put(AppConstants.HTTP_RESPONSES.IS_AUTHENTICATED.name(), false);
		 * 
		 * PrintWriter out = response.getWriter(); out.println(job.toString());
		 * 
		 * return false; } else { return true; }
		 */
		/*
		 * if (request.getSession().getAttribute("userDetails") != null) return true;
		 * else { System.out.println("URL : " + request.getRequestURL().toString());
		 * System.out.println("Unauthorized User..!"); throw new
		 * AuthenticationException("Unautherized access!!"); }
		 */
	}
}
