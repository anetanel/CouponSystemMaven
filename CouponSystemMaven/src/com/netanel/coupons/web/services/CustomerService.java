package com.netanel.coupons.web.services;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.netanel.coupons.exception.CouponException;
import com.netanel.coupons.exception.DAOException;
import com.netanel.coupons.facades.CustomerFacade;
import com.netanel.coupons.jbeans.Coupon;
import com.netanel.coupons.jbeans.CouponType;

@Path("customer")
public class CustomerService {
	@Context
	private HttpServletRequest request;
	
	private static final String FACADE = "FACADE"; 
	
	public CustomerService() {
		
	}
	
	@POST
	@Path("buyCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public void BuyCoupon(Coupon coupon) throws DAOException, CouponException {
		getFacade().buyCoupon(coupon);
	}
	
	@POST
	@Path("buyCouponById")
	public void BuyCoupon(@QueryParam("couponId") long couponId) throws DAOException, CouponException {
		getFacade().buyCoupon(couponId);
	}
	
	@POST
	@Path("buyCouponByTitle")
	public void BuyCoupon(@QueryParam("couponTitle") String couponTitle) throws DAOException, CouponException {
		getFacade().buyCoupon(couponTitle);
	}
	
	@GET
	@Path("getAllCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getAllCoupons() throws DAOException {
		return getFacade().getAllCoupons();
	}
	
	@GET
	@Path("getMyCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getMyCoupons() throws DAOException {
		return getFacade().getMyCoupons();
	}
	
	@GET
	@Path("GetCouponById")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon getCoupon(long couponId) throws DAOException {
		return getFacade().getCoupon(couponId);
	}
	
	@GET
	@Path("getMyCouponsByType")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getMyCoupons(@QueryParam("couponType") CouponType couponType) throws DAOException {
		return getFacade().getMyCouponsByType(couponType);
	}
	
	@GET
	@Path("getMyCouponsByPrice")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getMyCoupons(@QueryParam("couponPrice") double couponPrice) throws DAOException {
		return getFacade().getMyCouponsByPrice(couponPrice);
	}
	
	@GET
	@Path("getCustomerId")
	@Produces(MediaType.APPLICATION_JSON)
	public long getCustomerId() throws DAOException {
		return getFacade().getCustId();
	}
	
	@GET
	@Path("getCustomerName")
	@Produces(MediaType.APPLICATION_JSON)
	public String getCustomerName() throws DAOException {
		return getFacade().getCustName();
	}
	
	
	@GET
	@Path("whoami")
	@Produces(MediaType.APPLICATION_JSON)
	public String whoAmI() throws DAOException {
		CustomerFacade facade = getFacade();
		return facade.toString();
	}

	private CustomerFacade getFacade() throws DAOException {
		if (request.getSession().getAttribute(FACADE) instanceof CustomerFacade) {
			return (CustomerFacade) request.getSession().getAttribute(FACADE);
		} else {
			throw new DAOException("Could not find an Admin login session");
		}
	}
	
}
