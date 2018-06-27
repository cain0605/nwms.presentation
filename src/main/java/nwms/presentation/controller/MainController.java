package nwms.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

	@RequestMapping("/")
    public ModelAndView warehousing(ModelAndView mav){
		
		mav.setViewName("main");
		
		return mav; 
    }
	
	@RequestMapping("/rcpt/rcpt.view")
    public ModelAndView rcptView(ModelAndView mav){
		
		mav.setViewName("rcptView");
		
		return mav; 
    }
}