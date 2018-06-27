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
<title>입고관리시스템</title>
<script>
	$(document).ready(function() {
	
		var sidebar = new dhtmlXSideBar({
			parent : document.body,
			icons_path: "/common/imgs/icon/",
			width: 160,
			header: true,
			autohide: true,
			items: [
				{id: "rcpt", text: "입고관리", icon: "document.gif", selected: true},
				{id: "oder", text: "출고관리", icon: "document.gif"},
				{id: "stok", text: "재고관리", icon: "document.gif"}
			]
		});
		
		sidebar.cells("rcpt").attachURL("/rcpt/rcpt.view");
	});
</script>
</head>
<body>
</body>
</html>