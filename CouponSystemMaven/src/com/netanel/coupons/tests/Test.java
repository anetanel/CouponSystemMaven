package com.netanel.coupons.tests;


import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.netanel.coupons.jbeans.CouponType;

public class Test {
	public static void main(String[] args) { 
		String str = "2016-11-07T22:00:00.000Z";
		System.out.println(LocalDate.parse(str.substring(0, 10)));
		
	}
	
}
