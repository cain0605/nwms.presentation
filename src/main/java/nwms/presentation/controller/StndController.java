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
	@RequestMapping("/stnd/biz.view")
    public ModelAndView bizView(ModelAndView mav){
		
		mav.setViewName("bizView");
		
		return mav; 
    }

	/**
	 * 거래처관리
	 * 
	 * @data : SD_CUST
	 */
	@RequestMapping("/stnd/cust.view")
    public ModelAndView custView(ModelAndView mav){
		
		mav.setViewName("custView");
		
		return mav; 
    }

	/**
	 * 품목관리
	 * 
	 * @data : SD_SKU
	 */
	@RequestMapping("/stnd/sku.view")
    public ModelAndView skuView(ModelAndView mav){
		
		mav.setViewName("skuView");
		
		return mav; 
    }

	/**
	 * 영역관리
	 * 
	 * @data : SD_AREA, SD_ZONE, SD_LOC
	 */
	@RequestMapping("/stnd/loc.view")
    public ModelAndView locView(ModelAndView mav){
		
		mav.setViewName("locView");
		
		return mav; 
    }
	
	/**
	 * 코드관리
	 * 
	 * @data : SD_CD
	 */
	@RequestMapping("/stnd/cd.view")
    public ModelAndView cdView(ModelAndView mav){
		
		mav.setViewName("cdView");
		
		return mav; 
    }
}