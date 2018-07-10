<%@ page contentType="text/html;charset=UTF-8" language="java" %>

  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
        </div>
        <div class="pull-left info">
          <p>Choi Jin Yong</p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
      <!-- search form -->
      <form action="#" method="get" class="sidebar-form">
        <div class="input-group">
          <input type="text" name="q" class="form-control" placeholder="Search...">
          <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
        </div>
      </form>
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
      
        <!-- WMS 기준정보메뉴 -->
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-files-o"></i> <span>기준정보</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/stnd/biz"><i class="fa fa-circle-o"></i> 사업관리</a></li>
            <li><a href="/stnd/cust"><i class="fa fa-circle-o"></i> 거래처관리</a></li>
            <li><a href="/stnd/sku"><i class="fa fa-circle-o"></i> 품목관리</a></li>
            <li><a href="/stnd/loc"><i class="fa fa-circle-o"></i> 위치관리</a></li>
            <li><a href="/stnd/cd"><i class="fa fa-circle-o"></i> 코드관리</a></li>
          </ul>
        </li>

        <!-- WMS 입고정보메뉴 -->
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-files-o"></i> <span>입고정보</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/rcpt/rcpt"><i class="fa fa-circle-o"></i> 입고관리</a></li>
          </ul>
        </li>

        <!-- WMS 출고정보메뉴 -->
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-files-o"></i> <span>출고정보</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/oder/oder"><i class="fa fa-circle-o"></i> 출고관리</a></li>
          </ul>
        </li>

        <!-- WMS 재고정보메뉴 -->
        <li class="active treeview">
          <a href="#">
            <i class="fa fa-files-o"></i> <span>재고정보</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="#"><i class="fa fa-circle-o"></i> 재고관리</a></li>
          </ul>
        </li>
      </ul>
    </section>
  </aside>