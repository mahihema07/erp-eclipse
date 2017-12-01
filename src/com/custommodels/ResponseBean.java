package com.custommodels;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseBean {

	private String _RESPONSE_STATUS;

	private boolean _IS_AUTHENTICATED;

	private int _RESPONSE_DATA_COUNT;

	private Object _RESPONSE_DATA;

	private String _RESPONSE_ERROR_CODE;

	private String _RESPONSE_ERROR_MESSAGE;

	private String _RESPONSE_MESSAGE;

	public ResponseBean(String status, boolean isAuth, int dataCount, Object data, String errorCode, String errorMsg,
			String message) {
		super();
		this._RESPONSE_STATUS = status;
		this._IS_AUTHENTICATED = isAuth;
		this._RESPONSE_DATA_COUNT = dataCount;
		this._RESPONSE_DATA = data;
		this._RESPONSE_ERROR_CODE = errorCode;
		this._RESPONSE_ERROR_MESSAGE = errorMsg;
		this._RESPONSE_MESSAGE = message;
	}

	public ResponseBean(String status, boolean isAuth, int dataCount, Object data) {
		super();
		this._RESPONSE_STATUS = status;
		this._IS_AUTHENTICATED = isAuth;
		this._RESPONSE_DATA_COUNT = dataCount;
		this._RESPONSE_DATA = data;
	}

	public ResponseBean(String status, boolean isAuth, Object data) {
		super();
		this._RESPONSE_STATUS = status;
		this._IS_AUTHENTICATED = isAuth;
		this._RESPONSE_DATA = data;
	}

	public ResponseBean(String status, boolean isAuth, String message) {
		super();
		this._RESPONSE_STATUS = status;
		this._IS_AUTHENTICATED = isAuth;
		this._RESPONSE_MESSAGE = message;
	}

	public ResponseBean(String status, boolean isAuth) {
		super();
		this._RESPONSE_STATUS = status;
		this._IS_AUTHENTICATED = isAuth;
	}

	public ResponseBean() {
		super();
	}

	public String getRESPONSE_STATUS() {
		return _RESPONSE_STATUS;
	}

	@JsonProperty("RESPONSE_STATUS")
	public void setRESPONSE_STATUS(String rESPONSE_STATUS) {
		_RESPONSE_STATUS = rESPONSE_STATUS;
	}

	public boolean isIS_AUTHENTICATED() {
		return _IS_AUTHENTICATED;
	}

	@JsonProperty("IS_AUTHENTICATED")
	public void setIS_AUTHENTICATED(boolean iS_AUTHENTICATED) {
		_IS_AUTHENTICATED = iS_AUTHENTICATED;
	}

	public int getRESPONSE_DATA_COUNT() {
		return _RESPONSE_DATA_COUNT;
	}

	@JsonProperty("RESPONSE_DATA_COUNT")
	public void setRESPONSE_DATA_COUNT(int rESPONSE_DATA_COUNT) {
		_RESPONSE_DATA_COUNT = rESPONSE_DATA_COUNT;
	}

	public Object getRESPONSE_DATA() {
		return _RESPONSE_DATA;
	}

	@JsonProperty("RESPONSE_DATA")
	public void setRESPONSE_DATA(Object rESPONSE_DATA) {
		_RESPONSE_DATA = rESPONSE_DATA;
	}

	public String getRESPONSE_ERROR_CODE() {
		return _RESPONSE_ERROR_CODE;
	}

	@JsonProperty("RESPONSE_ERROR_CODE")
	public void setRESPONSE_ERROR_CODE(String rESPONSE_ERROR_CODE) {
		_RESPONSE_ERROR_CODE = rESPONSE_ERROR_CODE;
	}

	public String getRESPONSE_MESSAGE() {
		return _RESPONSE_ERROR_MESSAGE;
	}

	@JsonProperty("RESPONSE_ERROR_MESSAGE")
	public void setRESPONSE_MESSAGE(String rESPONSE_MESSAGE) {
		_RESPONSE_ERROR_MESSAGE = rESPONSE_MESSAGE;
	}

	public String get_RESPONSE_MESSAGE() {
		return _RESPONSE_MESSAGE;
	}

	@JsonProperty("RESPONSE_MESSAGE")
	public void set_RESPONSE_MESSAGE(String _RESPONSE_MESSAGE) {
		this._RESPONSE_MESSAGE = _RESPONSE_MESSAGE;
	}

}
