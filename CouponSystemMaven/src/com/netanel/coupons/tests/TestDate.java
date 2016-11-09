package com.netanel.coupons.tests;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TestDate {

	public static void main(String[] args) {
		LocalDate l = LocalDate.parse("2016-10-30", DateTimeFormatter.ISO_DATE);
		System.out.println(l);
		
		String s = DateTimeFormatter.ISO_DATE.format(l);
		System.out.println(s);
		
		

	}

}
