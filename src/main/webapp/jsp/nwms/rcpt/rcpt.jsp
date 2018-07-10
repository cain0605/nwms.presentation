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

  <input type="hidden" name="biz" id="biz" value="HDCR"/>

  <!-- Content Wrapper. Contains page content ================================================================ -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        위치관리<small>Area, Zone, Loc</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 메인</a></li>
        <li><a href="#">기준관리</a></li>
        <li class="active">위치관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">입고전표</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_area" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>창고</th>
                  <th>지역</th>
                  <th>지역명</th>
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
              <h3 class="box-title">입고품목</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_loc" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>창고</th>
                  <th>위치</th>
                  <th>위치명</th>
                  <th>구역</th>
                </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">입고박스</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_zone" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>창고</th>
                  <th>구역</th>
                  <th>구역명</th>
                  <th>지역</th>
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

	//지역 Row Click
	$(document).on("click", '#tbl_area> tbody> tr', function (){
		var url = '/stnd/zone/area/' + $(this).find('#area').html() + 
				  '/dc/' + $(this).find('#dc').html() + 
				  '/biz/' + $('#biz').val();
		
		gfn_action_ajaxsubmit('selectZone', 'get', url, null, fn_callback);
	});

	//구역 Row Click
	$(document).on("click", '#tbl_zone> tbody> tr', function (){
		var url = '/stnd/loc/zone/' + $(this).find('#zone').html() + 
				  '/dc/' + $(this).find('#dc').html() + 
				  '/biz/' + $('#biz').val();
		
		gfn_action_ajaxsubmit('selectLoc', 'get', url, null, fn_callback);
	});
	
    var fn_callback = function (svc_id, json){
   		switch (svc_id) {
   			//지역조회
	   		case 'selectArea':
				$('#tbl_area> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td id=\'dc\'>' + data.pk.dc + '</td>' +
				   			  '<td id=\'area\'>' + data.pk.area + '</td>' +
				   			  '<td id=\'areanm\'>' + data.areanm + '</td></tr>';

	       			$('#tbl_area').append(row);
            	});
	   			
	        break;
	        
   			//구역조회
	   		case 'selectZone':
				$('#tbl_zone> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td id=\'dc\'>' + data.dc + '</td>' +
				   			  '<td id=\'zone\'>' + data.zone + '</td>' +
				   			  '<td>' + data.zonenm + '</td>' +
				   			  '<td>' + data.area + '</td></tr>';

	       			$('#tbl_zone').append(row);
            	});

	        break;
	        
   			//지역조회
	   		case 'selectLoc':
				$('#tbl_loc> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.dc + '</td>' +
		   			  		  '<td>' + data.loc + '</td>' +
		   			  		  '<td>' + data.locnm + '</td>' +
				   			  '<td>' + data.zone + '</td></tr>';

	       			$('#tbl_loc').append(row);
            	});

	        break;
		}
   	}

	gfn_action_ajaxsubmit('selectArea', 'get', '/stnd/area', null, fn_callback);
});
</script>
</body>
</html>