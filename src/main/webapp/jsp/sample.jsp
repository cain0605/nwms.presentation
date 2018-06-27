<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type="text/javascript" src="/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="/common/common.js"></script>

<link rel="stylesheet" type="text/css" href="/dhtmlx/dhtmlx_web.css"/>
<link rel="stylesheet" type="text/css" href="/common/common.css"/>
<title>입고관리</title>

<script>
	$(document).ready(function() {
		
		/* 객체선언*/
		var obj_stat = dhtmlXComboFromSelect("stat");
		obj_stat.readonly(true);
		
		var obj_date = new dhtmlXCalendarObject("date");
		obj_date.setDateFormat("%Y-%m-%d");
		obj_date.hideTime();

		/* 레이아웃선언*/
		var layout = new dhtmlXLayoutObject({
			parent : document.body,
			pattern : "3E",
			skin : "dhx_web",
			cells : [{id: "a", header: false, height: 66, fix_size: [true, true]},
				  	 {id: "b", header: false, height: 300, fix_size: [true, false]},
				  	 {id: "c", header: false, fix_size: [true, false]}]
		});

		layout.cells("a").attachObject("title");

		/* 툴바선언*/
		var toolbar = new dhtmlXToolbarObject({
			parent:"toolbar",
			icons_path: "/common/imgs/",
			skin:"dhx_web"
		});
		
		toolbar.setAlign("right");
		toolbar.addButton("btn_search", 1, "조회", "search.png", "search.png");
		toolbar.addButton("btn_write", 2, "입력", "update.gif", "update.gif");
		toolbar.attachEvent("onClick", toolbarOnClick);

		/* 그리그선언*/
		var grid_first = layout.cells("b").attachGrid();
		grid_first.dhtmlXGridHtmlInit("grid_first");	
		grid_first.setGridLocale("ko");
		grid_first.setEmptyMessage();

		var tabbar = layout.cells("c").attachTabbar({
		    align: "left",
		    mode: "top",
		    tabs: [{id: "t1", text: "제품목록", active: true},
				   {id: "t2", text: "재고목록"}]
		});

		var grid_second = tabbar.tabs("t1").attachGrid();
		grid_second.dhtmlXGridHtmlInit("grid_second");	
		grid_second.setGridLocale("ko");
		grid_second.setEmptyMessage();

		var grid_third = tabbar.tabs("t2").attachGrid();
		grid_third.dhtmlXGridHtmlInit("grid_third");	
		grid_third.setGridLocale("ko");
		grid_third.setEmptyMessage();

		/************************************************************************************************************
		 * 사용자함수정의
		 ************************************************************************************************************/
		function toolbarOnClick(id){

		}
    });
	</script>
</head>
<body>
	<div id="title" style="width:100%;height:100%;">
		<div class="search_title">
			<div class="search_title_area"><label>입고관리</label></div>
			<div id="toolbar" style="padding-bottom:1px;float:right;"></div> 
		</div>	
		
		<!-- 조회폼정의 -->
		<form name="search" id="search" method="post" >
			<div class="contents">	
				<div class="row">
					<div class="column">
						<div class="title"><div class="label label_required">입고일</div></div>
						<div class="content"><input type="text" class="input" id="date" name="date"></div>
					</div>
					<div class="column">
						<div class="title"><div class="label">입고상태</div></div>
						<div class="content">
							<select name="stat" id="stat" class="dhtmlxComboClass">
								<option value="" selected>[선택]</option>
								<c:forEach var="map" items="${combo_stat}">
									<option value="${map.cd}">${map.cdnm}</option>
								</c:forEach>
							</select>
						</div>
					</div>
					<div class="column">
						<div class="title"><div class="label">입고번호</div></div>
						<div class="content"><input type="text" class="input" id="rcptno" name="rcptno"></div>
					</div>
				</div>
			</div>
		</form>
	</div>	

	<!-- 그리드정의 -->
	<table id="grid_first" rowcnt="1" columnSizeType="%"  skin="dhx_web"  imgpath="/dhtmlx/imgs/">	      
		<tr>
	        <td type="ro" width="*"   align="center" sort="str" validate="" hidden="true"  columnId="dc"	 	subrow="">물류창고</td>	
	        <td type="ro" width="10"  align="center" sort="str" validate="" hidden="false" columnId="rcptde"	subrow="">입고일자</td>	
	        <td type="ro" width="20"  align="center" sort="str" validate="" hidden="false" columnId="rcptno"	subrow="">입고번호</td>	
	        <td type="ro" width="10"  align="center" sort="str" validate="" hidden="false" columnId="spcust"	subrow="">공급처</td>	
	        <td type="ro" width="20"  align="center" sort="str" validate="" hidden="false" columnId="spcustnm"	subrow="">공급처</td>
	        <td type="ro" width="20"  align="center" sort="str" validate="" hidden="false" columnId="dutynm"	subrow="">입고구분</td>
	        <td type="ro" width="20"  align="center" sort="str" validate="" hidden="false" columnId="stat"	    subrow="">상태</td>	
		</tr>
	</table>
	
	<table id="grid_second" rowcnt="1" columnSizeType="%"  skin="dhx_web"  imgpath="/dhtmlx/imgs/">	      
		<tr>
	        <td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="dc"	  subrow="">물류창고</td>	
	    	<td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="rcptno"  subrow="">입고번호</td>	
	    	<td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="rcptsn"  subrow="">입고순번</td>	
	        <td type="ro"  width="10" align="center" sort="str" validate="" hidden="false" columnId="sku"	  subrow="">제품</td>	
	        <td type="ro"  width="30" align="left"   sort="str" validate="" hidden="false" columnId="skunm"	  subrow="">제품명</td>	
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="adjsqty" subrow="">조정량</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="inspqty" subrow="">검수량</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="inspqty" subrow="">입고량</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="untpc"	  subrow="">단가</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="amt"	  subrow="">금액</td>
	        <td type="ro"  width="10" align="center" sort="str" validate="" hidden="false" columnId="stat"	  subrow="">상태</td>
		</tr>
	</table>
	
	<table id="grid_third" rowcnt="1" columnSizeType="%"  skin="dhx_web"  imgpath="/dhtmlx/imgs/">	      
		<tr>
	        <td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="dc"	  subrow="">물류창고</td>	
	    	<td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="rcptno"  subrow="">입고번호</td>	
	    	<td type="ro"  width="*"  align="center" sort="str" validate="" hidden="true"  columnId="rcptsn"  subrow="">입고순번</td>	
	        <td type="ro"  width="30" align="center" sort="str" validate="" hidden="false" columnId="pltid"   subrow="">팔레트번호</td>	
	        <td type="ro"  width="40" align="center" sort="str" validate="" hidden="false" columnId="caseid"  subrow="">박스번호</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="inspqty" subrow="">검수량</td>
	        <td type="ron" width="10" align="right"  sort="str" validate="" hidden="false" columnId="rcptqty" subrow="">입고량</td>
	        <td type="ro"  width="10" align="center" sort="str" validate="" hidden="false" columnId="stat"	  subrow="">상태</td>
		</tr>
	</table>
</body>
</html>