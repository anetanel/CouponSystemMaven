package com.netanel.coupons.tests;


import java.util.HashSet;
import java.util.Set;

import com.netanel.coupons.jbeans.CouponType;

public class Test {
	public static void main(String[] args) { 
		Set<String> l = new HashSet<>(); 
		for (CouponType c : CouponType.values()) {
			l.add(c.name());
		}
		
		System.out.println(l);
	}
	
}
