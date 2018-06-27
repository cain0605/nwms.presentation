package nwms.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class MainController {

	@RequestMapping("/")
    public ModelAndView index(ModelAndView mav){
		
		mav.setViewName("index");
		
		return mav; 
    }
}