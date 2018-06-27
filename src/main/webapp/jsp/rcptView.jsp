<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<script type="text/javascript" src="/jquery/jquery-1.9.1.js"></script>
<script type="text/javascript" src="/dhtmlx/dhtmlx.js"></script>
<script type="text/javascript" src="/common/common.js"></script>

<link rel="stylesheet" type="text/css" href="/dhtmlx/dhtmlx_material.css"/>
<link rel="stylesheet" type="text/css" href="/common/common.css"/>
<title>입고관리</title>
<script>
	function isMobile() {
	    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}

	var layout, toolbar;
	
	$(document).ready(function() {
		
		// Layout==================================================================
		if(isMobile()) {
			layout = new dhtmlXAccordion({
				parent : document.body,
				items: [
					{id: "a", text: "입고전표", open: true},
					{id: "b", text: "입고제품"},
					{id: "c", text: "입고재고"}]
			});

		} else {
			layout = new dhtmlXLayoutObject({
				parent : document.body,
				pattern: "3L",
				cells: [
					{id: "a", text: "입고전표", collapsed_text: "입고전표"},
					{id: "b", text: "입고제품", collapsed_text: "입고제품"},
					{id: "c", text: "입고재고", collapsed_text: "입고재고"}
				]
			});
		}

		// Toolbar==================================================================
		toolbar = layout.attachToolbar({
		    align: "right",
			icons_path: "/common/imgs/icon/"
		});

		toolbar.addButton("search",	1, "조회", "search.gif",	"search.gif");
		toolbar.addButton("write",	2, "신규", "new.gif",		"new.gif");
		toolbar.addButton("save",	3, "저장", "save.gif",		"save.gif");
		toolbar.addButton("delete",	4, "삭제", "delete.gif",	"delete.gif");
		toolbar.addButton("print",	5, "인쇄", "print.gif",		"print.gif");

		/* 그리드 */
		var grid_hd = layout.cells("a").attachGrid({
			image_path: "/dhtmlx/imgs/",
			xml: "/grid.xml"
		});
		
		var grid_dt = layout.cells("b").attachGrid({
			image_path: "/dhtmlx/imgs/",
			xml: "/grid.xml"
		});
		
		var grid_asgn = layout.cells("c").attachGrid({
			image_path: "/dhtmlx/imgs/",
			xml: "/grid.xml"
		});
    });
	</script>
</head>
<body>
</body>
</html>