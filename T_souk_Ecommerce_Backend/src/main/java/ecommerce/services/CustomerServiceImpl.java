package ecommerce.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerce.daos.CustomerDao;
import ecommerce.entities.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	@Autowired private CustomerDao dao;

	@Override
	public void registerCustomer(Customer cust) {
		dao.save(cust);
	}

	@Override
	public Customer findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Customer validate(String userid, String pwd) {
		Customer cc=dao.findByUserid(userid);
		if(cc!=null && cc.getPwd().equals(pwd)) {
			return cc;
		}
		return null;
	}
	
	@Override
	public boolean verifyUserId(String userid) {
		// TODO Auto-generated method stub
		return dao.findByUserid(userid)!=null;
	}

	@Override
	public void updateProfile(Customer cust) {
		// TODO Auto-generated method stub
		if(cust.getPwd().equals("") || cust.getPwd()==null) {
			cust.setPwd(findById(cust.getId()).getPwd());
		}
		dao.save(cust);	
	}
	
}
