package com.netanel.coupons.tests;

import java.time.LocalDate;
import java.util.HashSet;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import com.netanel.coupons.crypt.Password;
import com.netanel.coupons.jbeans.Company;
import com.netanel.coupons.jbeans.Coupon;
import com.netanel.coupons.jbeans.CouponType;
import com.netanel.coupons.jbeans.Customer;

public class TestJaxb {
	public static void main(String[] args) throws JAXBException {
		
		Company comp = new Company("test", new Password("1234".toCharArray()),"test@test.com", new HashSet<Coupon>() );
		Coupon coupon = new Coupon("5% Mainframe", LocalDate.now(), LocalDate.of(2017, 5, 15), 10,
				CouponType.ELECTRONICS, "5% discount off any new IBM Mainframe Purchase", 199.9, "");
		Coupon coupon2 = new Coupon("15% Mainframe", LocalDate.now(), LocalDate.of(2018, 5, 15), 10,
				CouponType.ELECTRONICS, "15% discount off any new IBM Mainframe Purchase", 199.9, "");
		comp.getCoupons().add(coupon);
		comp.getCoupons().add(coupon2);
		
		
		Customer customer = new Customer();
		
		JAXBContext context = JAXBContext.newInstance(Company.class);
        Marshaller m = context.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        
        m.marshal(comp, System.out);

	}

}
