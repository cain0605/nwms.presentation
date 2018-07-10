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
        거래처관리<small>Cust</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 메인</a></li>
        <li><a href="#">기준관리</a></li>
        <li class="active">거래처관리</li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">
          <!-- Grid ================================================================ -->
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">거래처</h3>
              
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
              <table id="tbl_cust" class="table table-bordered table-striped">
                <thead>
                <tr>
                  <th>거래처</th>
                  <th>거래처구분</th>
                  <th>거래처명</th>
                  <th>주소</th>
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
   			//거래처조회
	   		case 'selectCust':
				$('#tbl_cust> tbody').empty();
				
	   			json.forEach(function (data, index) {
					
	   				var row = '<tr><td>' + data.cust + '</td>' +
				   			  '<td>' + data.custtp + '</td>' +
				   			  '<td>' + data.custnm + '</td>' +
				   			  '<td>' + data.addr + '</td>' +
				   			  '<td>' + data.tel + '</td></tr>';

	       			$('#tbl_cust').append(row);
            	});

	   		    $('#tbl_cust').DataTable({
	   		        'paging'      : true,
	   		        'lengthChange': false,
	   		        'searching'   : false,
	   		        'ordering'    : true,
	   		        'info'        : true,
	   		        'autoWidth'   : false
	   			});

	        break;
		}
   	}

	gfn_action_ajaxsubmit('selectCust', 'get', '/stnd/cust', null, fn_callback);
});
</script>
</body>
</html>