package ecommerce.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerce.daos.AddressDao;
import ecommerce.entities.Address;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired AddressDao dao;
	
	@Override
	public Address saveAddress(Address address) {
		
		return dao.save(address);
	}

	@Override
	public Address findAddress(int id) {
		
		return dao.getById(id);
	}

}
