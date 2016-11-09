package com.netanel.coupons.web.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.netanel.coupons.facades.ClientType;
import com.netanel.coupons.jbeans.CouponType;

@Path("general")
public class GeneralService {
	@Context
	private HttpServletRequest request;

	public GeneralService() {
		
	}
	
	@GET
	@Path("clienttype")
	@Produces(MediaType.TEXT_PLAIN)
	public String getClientType() {
		ClientType clientType = (ClientType) request.getSession(false).getAttribute("CLIENT_TYPE");
		return clientType.toString().toLowerCase();
		//return "{\"clientType\": \""+ clientType.toString() + "\"}";
	}

	@GET
	@Path("getCouponTypes")
	@Produces(MediaType.APPLICATION_JSON)
	public Set<String> getCouponTypes() {
		Set<String> s = new HashSet<>();
		for (CouponType c : CouponType.values()) {
			s.add(c.name());
		}
		return s;
	}
}
