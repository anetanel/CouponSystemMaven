package com.netanel.coupons.income;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class TestIncome {
	public static void main(String[] args) {
		
		Income income = new Income();
		income.setName("testincome1");
		income.setAmount(199.95);
		income.setDate(LocalDate.now());
		
		
		EntityManagerFactory emf = Persistence.createEntityManagerFactory("PersistenceUnit");
		EntityManager em = emf.createEntityManager();
		
		em.getTransaction().begin();
		em.persist(income);
		em.getTransaction().commit();
		em.close();
		
	}
}
