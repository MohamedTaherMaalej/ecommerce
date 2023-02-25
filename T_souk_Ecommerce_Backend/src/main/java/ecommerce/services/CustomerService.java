package ecommerce.services;


import ecommerce.entities.Customer;

public interface CustomerService {
	void registerCustomer(Customer cust);
	Customer findById(int id);
	Customer validate(String userid,String pwd);
	boolean verifyUserId(String userid);
	void updateProfile(Customer cust);
}
