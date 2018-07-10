package nwms.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RcptController {

	/**
	 * 입고관리
	 * 
	 * @data : RC_RCPTHD, RC_RCPTDT, RC_RCPTASGN
	 */
	@RequestMapping("/rcpt/rcpt")
    public ModelAndView rcpt(ModelAndView mav){
		
		mav.setViewName("nwms/rcpt/rcpt");
		
		return mav; 
    }
}