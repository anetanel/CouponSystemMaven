package com.netanel.coupons.web.services;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.netanel.coupons.exception.CouponException;
import com.netanel.coupons.exception.DAOException;
import com.netanel.coupons.facades.CompanyFacade;
import com.netanel.coupons.jbeans.Company;
import com.netanel.coupons.jbeans.Coupon;
import com.netanel.coupons.jbeans.CouponType;

@Path("company")
public class CompanyService {
	//
	// Attributes
	//
	@Context
	private HttpServletRequest request;
	
	private static final String FACADE = "FACADE"; 
	
	//
	// Constructors
	//
	public CompanyService() {
	}
	
	//
	// Functions
	//
	@POST
	@Path("createCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public void createCoupon(Map<String, String> couponMap) throws DAOException {
		Coupon coupon = new Coupon(couponMap.get("title"),
				LocalDate.parse(couponMap.get("startDate").subSequence(0, 10)),
				LocalDate.parse(couponMap.get("endDate").subSequence(0, 10)),
						Integer.parseInt(couponMap.get("amount")),
						CouponType.valueOf(couponMap.get("type")),
						couponMap.get("message"),
						Double.parseDouble(couponMap.get("price")),
						couponMap.get("image"));
		System.out.println(coupon);
		getFacade().createCoupon(coupon);
	}
	
	@DELETE
	@Path("deleteCoupon")
	public void deleteCoupon(@QueryParam("couponId") long couponId) throws DAOException, IOException, CouponException {
		getFacade().deleteCoupon(getCoupon(couponId));
	}
	
	@GET
	@Path("getCouponById")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon getCoupon(@QueryParam("couponId") long couponId) throws DAOException, CouponException {
		return getFacade().getCoupon(couponId);
	}
	
	@GET
	@Path("getCouponByTitle")
	@Produces(MediaType.APPLICATION_JSON)
	public Coupon getCoupon(@QueryParam("couponTitle") String couponTitle) throws DAOException, CouponException {
		return getFacade().getCoupon(couponTitle);
	}
	
	@GET
	@Path("getAllCoupons")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getAllCoupons() throws DAOException {
		return getFacade().getAllCoupons();
	}
	
	@POST
	@Path("updateCoupon")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateCoupon(Map<String, String> couponMap) throws DAOException {
		Coupon coupon = new Coupon(Long.parseLong(couponMap.get("id")),
									couponMap.get("title"),
									LocalDate.parse(couponMap.get("startDate").subSequence(0, 10)),
									LocalDate.parse(couponMap.get("endDate").subSequence(0, 10)),
									Integer.parseInt(couponMap.get("amount")),
									CouponType.valueOf(couponMap.get("type")),
									couponMap.get("message"),
									Double.parseDouble(couponMap.get("price")),
									couponMap.get("image"));
		System.out.println(coupon);
		getFacade().updateCoupon(coupon);
	}
	
	@GET
	@Path("getCompany")
	@Produces(MediaType.APPLICATION_JSON)
	public Company getCompany() throws DAOException {
		return getFacade().getCompany();
	}
	
	@GET
	@Path("getCouponsByType")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getCouponsByType(@QueryParam("couponType") CouponType couponType) throws DAOException {
		return getFacade().getCouponsByType(couponType);
	}
	
	@GET
	@Path("getCouponsByPrice")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getCouponsByPrice(@QueryParam("couponPrice") double couponPrice) throws DAOException {
		return getFacade().getCouponsByPrice(couponPrice);
	}
	
	@GET
	@Path("getCouponsByDate")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<Coupon> getCouponsByDate(@QueryParam("couponDate") String date) throws DAOException {
		LocalDate l = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
		return getFacade().getCouponsByDate(l);
	}
	
	@GET
	@Path("getCompanyName")
	@Produces(MediaType.TEXT_PLAIN)
	public String getCompanyName() throws DAOException {
		return getFacade().getCompName();
	}
	
	@GET
	@Path("getCompanyId")
	@Produces(MediaType.APPLICATION_JSON)
	public long getCompanyId() throws DAOException {
		return getFacade().getCompId();
	}
	
	@GET
	@Path("whoami")
	@Produces(MediaType.TEXT_PLAIN)
	public String whoAmI() throws DAOException {
		return getFacade().toString();
	}

	private CompanyFacade getFacade() throws DAOException {
		if (request.getSession().getAttribute(FACADE) instanceof CompanyFacade) {
			return (CompanyFacade) request.getSession().getAttribute(FACADE);
		} else {
			throw new DAOException("Could not find a Company login session");
		}
	}

	
}
