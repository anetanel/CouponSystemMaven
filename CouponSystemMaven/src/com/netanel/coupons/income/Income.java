package com.netanel.coupons.income;

import java.io.Serializable;
import java.lang.Double;
import java.lang.Long;
import java.lang.String;
import java.time.LocalDate;
import javax.persistence.*;

/**
 * Entity implementation class for Entity: Income
 *
 */
@Entity
@Table(name="INCOME")
public class Income implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="ID")
	private Long id;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="DATE")
	private LocalDate date;
	
	@Column(name="AMOUNT")
	private Double amount;
	
	private static final long serialVersionUID = 1L;

	public Income() {
		super();
	}   
	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}   
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}   
	public LocalDate getDate() {
		return this.date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}   
	public Double getAmount() {
		return this.amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}
   
}
