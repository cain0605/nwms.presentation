package nwms.presentation.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class StndController {

	/**
	 * 사업관리
	 * 
	 * @data : SD_BIZ, SD_BIZDUTY, SD_DC, SD_CLIENT
	 */
	@RequestMapping("/stnd/biz")
    public ModelAndView biz(ModelAndView mav){
		
		mav.setViewName("nwms/stnd/biz");
		
		return mav; 
    }

	/**
	 * 거래처관리
	 * 
	 * @data : SD_CUST
	 */
	@RequestMapping("/stnd/cust")
    public ModelAndView cust(ModelAndView mav){
		
		mav.setViewName("nwms/stnd/cust");
		
		return mav; 
    }

	/**
	 * 품목관리
	 * 
	 * @data : SD_SKU
	 */
	@RequestMapping("/stnd/sku")
    public ModelAndView sku(ModelAndView mav){
		
		mav.setViewName("nwms/stnd/sku");
		
		return mav; 
    }

	/**
	 * 위치관리
	 * 
	 * @data : SD_AREA, SD_ZONE, SD_LOC
	 */
	@RequestMapping("/stnd/loc")
    public ModelAndView loc(ModelAndView mav){
		
		mav.setViewName("nwms/stnd/loc");
		
		return mav; 
    }
	
	/**
	 * 코드관리
	 * 
	 * @data : SD_CD
	 */
	@RequestMapping("/stnd/cd")
    public ModelAndView cd(ModelAndView mav){
		
		mav.setViewName("nwms/stnd/cd");
		
		return mav; 
    }
}