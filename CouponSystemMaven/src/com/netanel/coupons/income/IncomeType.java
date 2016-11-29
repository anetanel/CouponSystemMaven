package com.netanel.coupons.income;

public enum IncomeType {
	CUSTOMER_PURCHASE("Customer purchase"),
	COMPANY_NEW_COUPON("Company created new Coupon"),
	COMPANY_UPDATE_COUPON("Company updatred Coupon");
	
	private String description;
	
	private IncomeType(String description) {
		this.description = description;
	}
	
	public String getDescription() {
		return description;
	}
}
