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
        출고관리<small>OderHd, OderDt, OderAsgn</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 메인</a></li>
        <li><a href="#">출고정보</a></li>
        <li class="active">출고관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-md-6">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">출고전표</h3>
              
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
              <table id="tbl_oderhd" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>출고번호</th>
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
              <h3 class="box-title">출고품목</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_oderdt" class="table table-bordered table-striped">
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
              <h3 class="box-title">출고박스</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="tbl_oderasgn" class="table table-bordered table-striped">
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
	
	//출고전표 Row Click
	$(document).on("click", '#tbl_oderhd> tbody> tr', function (){
		var url = '/oder/oderdt/oderno/' + $(this).find('#oderno').html() + 
				  '/dc/' + $(this).find('#dc').val() + 
				  '/biz/' + $(this).find('#biz').val();
		
		gfn_action_ajaxsubmit('selectOderDt', 'get', url, null, fn_callback);
	});

	//출고품목 Row Click
	$(document).on("click", '#tbl_oderdt> tbody> tr', function (){
		var url = '/oder/oderasgn/oderno/' + $(this).find('#oderno').val() + 
		  		  '/odersn/' + $(this).find('#odersn').val() + 
		  		  '/dc/' + $(this).find('#dc').val() + 
		  		  '/biz/' + $(this).find('#biz').val();
		
		gfn_action_ajaxsubmit('selectOderAsgn', 'get', url, null, fn_callback);
	});
	
    var fn_callback = function (svc_id, json){
   		switch (svc_id) {
   			//출고전표조회
	   		case 'selectOderHd':
				$('#tbl_oderhd> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><input type=\'hidden\' name=\'biz\' id=\'biz\' value=\''+ data.biz +'\'/>' +
	   						  '<input type=\'hidden\' name=\'dc\' id=\'dc\' value=\''+ data.dc +'\'/>' +
	   						  '<td id=\'oderno\'>' + data.oderno + '</td>' +
				   			  '<td id=\'plande\'>' + data.plande + '</td>' +
				   			  '<td id=\'custnm\'>' + data.sdcust.custnm + '</td></tr>';

	       			$('#tbl_oderhd').append(row);
            	});
	   			
	   		    $('#tbl_oderhd').DataTable({
	   		        'paging'      : true,
	   		        'lengthChange': false,
	   		        'searching'   : false,
	   		        'ordering'    : true,
	   		        'info'        : true,
	   		        'autoWidth'   : false
	   			});
	   			
	        break;
	        
   			//출고품목조회
	   		case 'selectOderDt':
				$('#tbl_oderdt> tbody').empty();
				
	   			json.forEach(function (data, index) {

	   				var row = '<tr><input type=\'hidden\' name=\'biz\' id=\'biz\' value=\''+ data.biz +'\'/>' +
						  	  '<input type=\'hidden\' name=\'dc\' id=\'dc\' value=\''+ data.dc +'\'/>' +
						  	  '<input type=\'hidden\' name=\'oderno\' id=\'oderno\' value=\''+ data.oderno +'\'/>' +
						  	  '<input type=\'hidden\' name=\'odersn\' id=\'odersn\' value=\''+ data.odersn +'\'/>' +
   						  	  '<td id=\'dc\'>' + data.sku + '</td>' +
				   			  '<td id=\'zone\'>' + data.sdsku.skunm + '</td>' +
				   			  '<td>' + data.oderqty + '</td>' +
				   			  '<td>' + data.wt + '</td></tr>';

	       			$('#tbl_oderdt').append(row);
            	});

	        break;
	        
   			//출고박스조회
	   		case 'selectOderAsgn':
				$('#tbl_oderasgn> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.tolot + '</td>' +
		   			  		  '<td>' + data.topltid + '</td>' +
		   			  		  '<td>' + data.oderqty + '</td>' +
				   			  '<td>' + data.wt + '</td></tr>';

	       			$('#tbl_oderasgn').append(row);
            	});

	        break;
		}
   	}

	gfn_action_ajaxsubmit('selectOderHd', 'get', '/oder/oderhd', null, fn_callback);
});
</script>
</body>
</html>