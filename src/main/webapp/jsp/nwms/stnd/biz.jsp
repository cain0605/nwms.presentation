<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html>
<%@ include file="../../include/header.jsp" %>
<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to get the
desired effect
|---------------------------------------------------------|
| SKINS         | skin-blue                               |
|               | skin-black                              |
|               | skin-purple                             |
|               | skin-yellow                             |
|               | skin-red                                |
|               | skin-green                              |
|---------------------------------------------------------|
|LAYOUT OPTIONS | fixed                                   |
|               | layout-boxed                            |
|               | layout-top-nav                          |
|               | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
  <%@ include file="../../include/plugin.jsp" %>
  <%@ include file="../../include/main-header.jsp" %>
  <%@ include file="../../include/main-sidebar.jsp" %>

  <!-- Content Wrapper. Contains page content ================================================================ -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        사업관리<small>Biz, BizDuty, Dc, Client</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 메인</a></li>
        <li><a href="#">기준관리</a></li>
        <li class="active">사업관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">사업자</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_biz" class="table table-bordered table-striped">
                <thead>
	                <tr>
	                  <th>사업자</th>
	                  <th>사업자명</th>
	                  <th>대표자</th>
	                  <th>사업자번호</th>
	                  <th>전화번호</th>
	                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">사업자업무</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_bizduty" class="table table-bordered table-striped">
                <thead>
	                <tr>
	                  <th>업무유형</th>
	                  <th>업무코드</th>
	                  <th>업무명</th>
	                  <th>업무설명</th>
	                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
		</div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">물류창고</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_dc" class="table table-bordered table-striped">
                <thead>
	                <tr>
	                  <th>창고</th>
	                  <th>창고명</th>
	                  <th>주소</th>
	                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">하주</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_client" class="table table-bordered table-striped">
                <thead>
	                <tr>
	                  <th>하주</th>
	                  <th>하주명</th>
	                  <th>대표자</th>
	                  <th>사업자번호</th>
	                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
		</div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  
  <%@ include file="../../include/main-footer.jsp" %>
</div><!-- ./wrapper -->

<!-- page script -->
<script>
$(document).ready(function () {

    var fn_callback = function (svc_id, json){
   		switch (svc_id) {
   			//사업자조회
	   		case 'selectBiz':
				$('#tbl_biz> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.biz + '</td>' +
				   			  '<td>' + data.biznm + '</td>' +
				   			  '<td>' + data.ceo + '</td>' +
				   			  '<td>' + data.bizno + '</td>' +
				   			  '<td>' + data.tel + '</td></tr>';

	       			$('#tbl_biz').append(row);
            	});

	   			gfn_action_ajaxsubmit('selectBizDuty', 'get', '/stnd/bizduty', null, fn_callback);
	   			gfn_action_ajaxsubmit('selectDc', 'get', '/stnd/dc', null, fn_callback);
	   			gfn_action_ajaxsubmit('selectClient', 'get', '/stnd/client', null, fn_callback);
	   			
	        break;
	        
   			//사업자업무조회
	   		case 'selectBizDuty':
				$('#tbl_bizduty> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.pk.dutyty + '</td>' +
				   			  '<td>' + data.pk.dutycd + '</td>' +
				   			  '<td>' + data.dutynm + '</td>' +
				   			  '<td>' + data.dutydesc + '</td></tr>';

	       			$('#tbl_bizduty').append(row);
            	});

	        break;
	        
   			//물류창고조회
	   		case 'selectDc':
				$('#tbl_dc> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.pk.dc + '</td>' +
				   			  '<td>' + data.dcnm + '</td>' +
				   			  '<td>' + data.addr + '</td></tr>';

	       			$('#tbl_dc').append(row);
            	});

	        break;
	        
   			//하주조회
	   		case 'selectClient':
				$('#tbl_client> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.pk.client + '</td>' +
				   			  '<td>' + data.clientnm + '</td>' +
				   			  '<td>' + data.ceo + '</td>' +
				   			  '<td>' + data.bizno + '</td></tr>';

	       			$('#tbl_client').append(row);
            	});

	        break;
		}
   	}

	gfn_action_ajaxsubmit('selectBiz', 'get', '/stnd/biz', null, fn_callback);
});
</script>
</body>
</html>