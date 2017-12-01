package com.models;

import jodd.db.oom.meta.DbColumn;
import jodd.db.oom.meta.DbTable;

@DbTable("product_specification_dtl")
public class ProductSpecificationDtl extends Entity{
	
	@DbColumn("user_id")
	private int userId;
	
	@DbColumn("product_specification_hdr_id")
	private int productSpecificationHdrId;
	
	@DbColumn("specification_component_id")
	private int specificationComponentId;
	
	@DbColumn("specification_value")
	private double specificationValue;
	
	@DbColumn("uom_id")
	private Integer uomId;

	/*public int getIsActive() {
		return isActive;
	}

	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Timestamp getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Timestamp createdTime) {
		this.createdTime = createdTime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Timestamp getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(Timestamp updatedTime) {
		this.updatedTime = updatedTime;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}
*/
	public int getProductSpecificationHdrId() {
		return productSpecificationHdrId;
	}

	public void setProductSpecificationHdrId(int productSpecificationHdrId) {
		this.productSpecificationHdrId = productSpecificationHdrId;
	}

	public int getSpecificationComponentId() {
		return specificationComponentId;
	}

	public void setSpecificationComponentId(int specificationComponentId) {
		this.specificationComponentId = specificationComponentId;
	}

	public double getSpecificationValue() {
		return specificationValue;
	}

	public void setSpecificationValue(double specificationValue) {
		this.specificationValue = specificationValue;
	}

	public Integer getUomId() {
		return uomId;
	}

	public void setUomId(Integer uomId) {
		this.uomId = uomId;
	}

}
