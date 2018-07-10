package nwms.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class OderController {

	/**
	 * 출고관리
	 * 
	 * @data : OD_ODERHD, OD_ODERDT, OD_ODERASGN
	 */
	@RequestMapping("/oder/oder")
    public ModelAndView rcpt(ModelAndView mav){
		
		mav.setViewName("nwms/oder/oder");
		
		return mav; 
    }
}