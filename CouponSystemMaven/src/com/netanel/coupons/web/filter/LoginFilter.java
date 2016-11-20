package com.netanel.coupons.web.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebFilter(urlPatterns = { "/LoginFilter" }, servletNames = { "Jersey REST Service" })
public class LoginFilter implements Filter {

    public LoginFilter() {
    }

	public void destroy() {
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		//TODO: remove system outs

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		//String url = req.getContextPath() + "/index.html";
		HttpSession session = req.getSession(false);
		
		
		if (session == null) {
			filterOutput(res, "No Session Found! <br> Redirecting to Login Page.");
			return;
		} else if (session.getAttribute("FACADE") == null){
			filterOutput(res, "No Facade in Session! <br> Redirecting to Login Page.");
			return;
		} else {
			
			System.out.println(session.getAttribute("FACADE").getClass().getSimpleName() + " found in session!");
		}
		
		// pass the request along the filter chain
		chain.doFilter(request, response);
	}

	private void filterOutput(HttpServletResponse res, String str) throws IOException {
		res.setContentType("application/json");
		PrintWriter out = res.getWriter();
		
		System.out.println(str);
		
		res.setStatus(500);
		out.print("{\"filter\": \""+ str +"\", \"redirect\": true}");
	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
