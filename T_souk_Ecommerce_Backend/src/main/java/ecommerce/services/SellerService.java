package ecommerce.services;


import ecommerce.entities.Seller;

public interface SellerService {
	void registerSeller(Seller seller);
	Seller findById(int id);
	Seller validate(String userid,String pwd);
	
}
