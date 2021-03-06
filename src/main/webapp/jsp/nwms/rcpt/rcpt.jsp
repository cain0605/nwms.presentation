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
        입고관리<small>RcptHd, RcptDt, RcptAsgn</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 메인</a></li>
        <li><a href="#">입고정보</a></li>
        <li class="active">입고관리</li>
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
              
              <div class="box-tools">
                <div class="input-group input-group-sm" style="width: 150px;">
                  <input type="text" name="table_search" class="form-control pull-right" placeholder="Search">

                  <div class="input-group-btn">
                    <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_rcpthd" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>입고번호</th>
                  <th>예정일</th>
                  <th>매입처</th>
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
              <table id="tbl_rcptdt" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>품목</th>
                  <th>품목명</th>
                  <th>수량</th>
                  <th>중량</th>
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
              <table id="tbl_rcptasgn" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>LOT</th>
                  <th>팔레트</th>
                  <th>수량</th>
                  <th>중량</th>
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
	
	//입고전표 Row Click
	$(document).on("click", '#tbl_rcpthd> tbody> tr', function (){
		var url = '/rcpt/rcptdt/rcptno/' + $(this).find('#rcptno').html() + 
				  '/dc/' + $(this).find('#dc').val() + 
				  '/biz/' + $(this).find('#biz').val();
		
		gfn_action_ajaxsubmit('selectRcptDt', 'get', url, null, fn_callback);
	});

	//입고품목 Row Click
	$(document).on("click", '#tbl_rcptdt> tbody> tr', function (){
		var url = '/rcpt/rcptasgn/rcptno/' + $(this).find('#rcptno').val() + 
		  		  '/rcptsn/' + $(this).find('#rcptsn').val() + 
		  		  '/dc/' + $(this).find('#dc').val() + 
		  		  '/biz/' + $(this).find('#biz').val();
		
		gfn_action_ajaxsubmit('selectRcptAsgn', 'get', url, null, fn_callback);
	});
	
    var fn_callback = function (svc_id, json){
   		switch (svc_id) {
   			//입고전표조회
	   		case 'selectRcptHd':
				$('#tbl_rcpthd> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><input type=\'hidden\' name=\'biz\' id=\'biz\' value=\''+ data.biz +'\'/>' +
	   						  '<input type=\'hidden\' name=\'dc\' id=\'dc\' value=\''+ data.dc +'\'/>' +
	   						  '<td id=\'rcptno\'>' + data.rcptno + '</td>' +
				   			  '<td id=\'plande\'>' + data.plande + '</td>' +
				   			  '<td id=\'custnm\'>' + data.sdcust.custnm + '</td></tr>';

	       			$('#tbl_rcpthd').append(row);
            	});
	   			
	   		    $('#tbl_rcpthd').DataTable({
	   		        'paging'      : true,
	   		        'lengthChange': false,
	   		        'searching'   : false,
	   		        'ordering'    : true,
	   		        'info'        : true,
	   		        'autoWidth'   : false
	   			});
	   			
	        break;
	        
   			//입고품목조회
	   		case 'selectRcptDt':
				$('#tbl_rcptdt> tbody').empty();
				
	   			json.forEach(function (data, index) {

	   				var row = '<tr><input type=\'hidden\' name=\'biz\' id=\'biz\' value=\''+ data.biz +'\'/>' +
						  	  '<input type=\'hidden\' name=\'dc\' id=\'dc\' value=\''+ data.dc +'\'/>' +
						  	  '<input type=\'hidden\' name=\'rcptno\' id=\'rcptno\' value=\''+ data.rcptno +'\'/>' +
						  	  '<input type=\'hidden\' name=\'rcptsn\' id=\'rcptsn\' value=\''+ data.rcptsn +'\'/>' +
   						  	  '<td id=\'dc\'>' + data.sku + '</td>' +
				   			  '<td id=\'zone\'>' + data.sdsku.skunm + '</td>' +
				   			  '<td>' + data.rcptqty + '</td>' +
				   			  '<td>' + data.wt + '</td></tr>';

	       			$('#tbl_rcptdt').append(row);
            	});

	        break;
	        
   			//입고박스조회
	   		case 'selectRcptAsgn':
				$('#tbl_rcptasgn> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.lot + '</td>' +
		   			  		  '<td>' + data.pltid + '</td>' +
		   			  		  '<td>' + data.rcptqty + '</td>' +
				   			  '<td>' + data.wt + '</td></tr>';

	       			$('#tbl_rcptasgn').append(row);
            	});

	        break;
		}
   	}

	gfn_action_ajaxsubmit('selectRcptHd', 'get', '/rcpt/rcpthd', null, fn_callback);
});
</script>
</body>
</html>