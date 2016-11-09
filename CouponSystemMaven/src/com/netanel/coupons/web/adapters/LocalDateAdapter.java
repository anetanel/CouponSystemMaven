package com.netanel.coupons.web.adapters;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import javax.xml.bind.annotation.adapters.XmlAdapter;

public class LocalDateAdapter extends XmlAdapter<String, LocalDate> {

    @Override
    public LocalDate unmarshal(String dateString) throws Exception {
    	//System.out.println("in unmarshall - " + dateString);
        return LocalDate.parse(dateString, DateTimeFormatter.ISO_DATE);
    }

    @Override
    public String marshal(LocalDate localDate) throws Exception {
    	//System.out.println("in marshall - " + localDate.toString());
        return DateTimeFormatter.ISO_DATE.format(localDate);
    }
}