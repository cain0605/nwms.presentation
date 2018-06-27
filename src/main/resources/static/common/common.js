/**
 * common.js
 * JavaScript.
 *
 * @author 김광호
 * @version 1.0
 */


/*********************************************************
 * array prototype function
 * 파일명		:	common.js
 * 설 명			:	array prototype 관련 함수
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
//Array.prototype.remove = function(idx) {
//    return (idx<0 || idx>this.length) ? this : this.slice(0, idx).concat(this.slice(idx+1, this.length));
//};
Array.prototype.clear = function() {
    this.splice(0, this.length);
};

/*********************************************************
 * cookie function
 * 파일명		:	common.js
 * 설 명			:	cookie 관련 함수
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
// 쿠키 생성
function setCookie(cName, cValue, cDay){

	var expire = new Date();

	expire.setDate(expire.getDate() + cDay);
	cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
	if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
	document.cookie = cookies;

}

// 쿠키 가져오기
function getCookie(cName) {

	cName = cName + '=';
	var cookieData = document.cookie;
	var start = cookieData.indexOf(cName);
	var cValue = '';

	if(start != -1){
		start += cName.length;
		var end = cookieData.indexOf(';', start);
		if(end == -1)end = cookieData.length;
		cValue = cookieData.substring(start, end);
	}
	return unescape(cValue);
}

/*********************************************************
 * dhtmlxLayout prototype 작성
 * 파일명		:	common.js
 * 설 명			:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고			:

 *********************************************************/

dhtmlXLayoutObject.prototype.setAutoResize=function(min_width,min_height){
	// Auto resize Layout
	var dhtmlxObject = this;

	var t=0;
	if (window.attachEvent)
        window.attachEvent("onresize", function(){
            window.clearTimeout(t);
            t = window.setTimeout(function(){
            	if(window.innerWidth > min_width && window.innerHeight > min_height){
            		dhtmlxObject.setSizes(true);
            	}
            },200);
        });
    else
        window.addEventListener("resize",function(){
            window.clearTimeout(t);
            t = window.setTimeout(function(){
            	if(window.innerWidth > min_width && window.innerHeight > min_height){
            		dhtmlxObject.setSizes(true);
            	}
            },200);
        },false);
};

dhtmlXLayoutCell.prototype.setNoBorder=function(top,right,bottom,left){

	if(top != undefined || top != null){
		this.cell.childNodes[0].style.borderTopWidth=top+"px";
		this.cell.childNodes[1].style.borderTopWidth=top+"px";
	}else{
		this.cell.childNodes[0].style.borderTopWidth="0px";
		this.cell.childNodes[1].style.borderTopWidth="0px";
	}

	if(right != undefined || right != null){
		this.cell.childNodes[0].style.borderRightWidth=right+"px";
		this.cell.childNodes[1].style.borderRightWidth=right+"px";
	}else{
		this.cell.childNodes[0].style.borderRightWidth="0px";
		this.cell.childNodes[1].style.borderRightWidth="0px";
	}

	if(bottom != undefined || bottom != null ){
		this.cell.childNodes[0].style.borderBottomWidth=bottom+"px";
		this.cell.childNodes[1].style.borderBottomWidth=bottom+"px";
	}else{
		this.cell.childNodes[0].style.borderBottomWidth="0px";
		this.cell.childNodes[1].style.borderBottomWidth="0px";
	}

	if(left != undefined || left != null){
		this.cell.childNodes[0].style.borderLeftWidth=left+"px";
		this.cell.childNodes[1].style.borderLeftWidth=left+"px";
	}else{
		this.cell.childNodes[0].style.borderLeftWidth="0px";
		this.cell.childNodes[1].style.borderLeftWidth="0px";
	}

};

/*********************************************************
 * 로그인 페이지 이동 
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		: 인증되지 않은 사용자 (statusCode = 401)일 경우 
 * 				로그인페이지로이동한다.
 *				
// *********************************************************/
function moveLoginPage(obj,error){          
	if (error.ErrorCode != undefined && (error.ErrorCode == "UNAUTHORIZED" || error.ErrorCode == "401")) {  
		if(obj.frameElement != null){
			moveLoginPage(obj.parent,error);
	     }else{
	        obj.location.href = error.ErrorLoginUrl;
	     }
	}
}
/*********************************************************
 * grid custom js prototype 작성
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:
*				data[0] urlpath
*				data[1] http status
*				data[2] error message.. ex ORA-00904: "DUTY_CD_DC": 부적합한 식별자
*				responseObject.ErrorMessage
*				responseObject.ErrorActionUrl
// *********************************************************/
dhtmlXGridObject.prototype._process_custom_js=function(data, mode){
	mode = "js";
	this._parsing=true;
	try {
		var data = data.responseText || data;

		var error = $.parseJSON(data);
		if(error.ErrorStatus != undefined && error.ErrorStatus == true){
			dhtmlx.alert({ 	title:"확인",
							type:"alert-error",
							text: error.ErrorMessage,
							callback:function(){
								moveLoginPage(this,error);
							}
						});
			return;
		} else if(error.error != undefined && error.error != null){
			dhtmlx.alert({ 	title:"확인",
							type:"alert-error",
							text: error.error,
							callback:function(){
								moveLoginPage(this,error);
							}				
						});

			return ;
		}
		
		if (typeof data == "string"){
			eval("dhtmlx.temp="+data+";");
			data = dhtmlx.temp;
		}
	} catch(e){
			dhx4.callEvent("onLoadXMLError", ["Incorrect JSON",
				(data.xmlDoc||data),
				this
			]);
			data = {rows:[]};
	}

	if (this._refresh_mode) return this._refreshFromJSON(data);

	if (data.head)
		this._parseHeadJson(data);

	var cr = parseInt(data.pos||0);
	var total = parseInt(data.total_count||0);

	var reset = false;
	if (total){
		if (!this.rowsBuffer[total-1]){
			if (this.rowsBuffer.length)
				reset=true;
		this.rowsBuffer[total-1]=null;
		}
		if (total<this.rowsBuffer.length){
			this.rowsBuffer.splice(total, this.rowsBuffer.length - total);
			reset = true;
		}
	}

	for (var key in data){
		if (key!="rows")
			this.setUserData("",key, data[key]);
	}

	if (mode == "js" && data.collections){
		for (var colkey in data.collections){
			var index = this.getColIndexById(colkey);
			var colrecs = data.collections[colkey];
			if (index !== window.undefined){
				if (this.cellType[index] == "clist"){
					colplaindata=[];
					for (var j=0; j<colrecs.length; j++)
						colplaindata.push(colrecs[j].label);
					this.registerCList(index, colplaindata);
				} else {
					var combo = this.getCombo(index);
					for (var j = 0; j < colrecs.length; j++)
						combo.put(colrecs[j].value, colrecs[j].label);
				}
			}
		}
	}

	if (this.isTreeGrid())
		return this._process_tree_json(data, null, null, mode);

	if (mode == "js"){
		if (data.data)
			data = data.data;
		for (var i = 0; i < data.length; i++){
			if (this.rowsBuffer[i+cr])
				continue;

			var row = data[i];
			var id  = row.id||(i+1);
			this.rowsBuffer[i+cr]={
				idd: id,
				data: row,
				_parser: this._process_js_row,
				_locator: this._get_js_data
			};

			this.rowsAr[id]=data[i];
		}
	} else {
		for (var i = 0; i < data.rows.length; i++){
			if (this.rowsBuffer[i+cr])
				continue;
			var id = data.rows[i].id;
			this.rowsBuffer[i+cr]={
				idd: id,
				data: data.rows[i],
				_parser: this._process_json_row,
				_locator: this._get_json_data
			};

			this.rowsAr[id]=data.rows[i];
		}
	}

	this.callEvent("onDataReady", []);
	if (reset && this._srnd){
		var h = this.objBox.scrollTop;
		this._reset_view();
		this.objBox.scrollTop = h;
	} else {
		this.render_dataset();
	}

	this._parsing=false;
};

/*********************************************************
 * Grid header extention function
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXGridObject.prototype.getColIdByValue = function (rowId,columnId)
{
    var index = this.getColIndexById(columnId);
    return this.cells(rowId,index);
};

dhtmlXGridObject.prototype.getHeaderInfo = function(){
	var header = [];
	var width = [];
	var style = [];
	var result = [];
	var type = [];

	if(this.hdr.rows[0] != null && this.hdr.rows[0] != "undefined"){
		length = this.hdr.rows[0].cells.length;
		for (var a = 0; a < this.hdr.rows[0].cells.length; a++){
			header[a] = this.getHeaderCol(a);
			width[a] = this.getColWidth(a);
			style[a] = this.hdr.rows[1].cells[0].style.cssText;
			type[a] = this.getColType(a);
		}
	}
	result[0] = header;
	result[1] = width;
	result[2] = style;
	result[3] = lethis.ngth;
	result[4] = type;

	return result;
};


dhtmlXGridObject.prototype.addHeader = function(){

	var header = this.getHeaderInfo()[0];
	var widths = this.getHeaderInfo()[1];
	var style = this.getHeaderInfo()[2];
	var headerLength = this.getHeaderInfo()[3];

	header[headerLength] = "";
	widths[headerLength] = "100";
	style[headerLength] = "height:15px;text-align:center;";

	this.setHeader(header.join(),null,style);
	this.setInitWidths(widths.join());
	this.init();
};

dhtmlXGridObject.prototype.setHeaderEx = function(header,widths,checkFlag){


	var headerStyle = "height:15px;text-align:center;";
	var arrHeaderStyle = [];
	var _arrHeaderStyle = [];
	var _widths = [];
	var _header = [];

	if(checkFlag == true){
		_arrHeaderStyle[0] = headerStyle;
		_widths[0] = "40";
		_header[0] = "#master_checkbox";
	}

	for(var i=0; i < header.length; i++){
		arrHeaderStyle[i]=headerStyle;
		if(widths[i]==""){
			widths[i] ="100";
		}
	}
	if(checkFlag == true){
		header = _header.concat(header);
		widths = _widths.concat(widths);
		arrHeaderStyle = _arrHeaderStyle.concat(arrHeaderStyle);
	}

	if(header.length > 0){
		this.setHeader(header.join(),null,arrHeaderStyle);
		this.setInitWidths(widths.join());
		this.init();
	}else if(header.length == 0){
		if(this.hdr.rows.length > 0){
			var count = this.hdr.rows.length;
			for(var i = 0 ; i < count; i++){
				this.hdr.deleteRow(0);
			}
		}
	}
};

dhtmlXGridObject.prototype.setHeaderAlign = function(header,align){

	var column = header.split(",");
	var headerStyle = "text-align:"+align+";";
	arrHeaderStyle = new Array();

	for(var i = 0 ; i < column.length; i++){
		arrHeaderStyle[i] = headerStyle;
	}

	if(header.length > 0){
		this.setHeader(header,null,arrHeaderStyle);
	}
};

dhtmlXGridObject.prototype.getColumnList = function(id){
	var columnList = new Array();
	for(var i=0; i < this.getRowsNum(); i++){
		columnList[i] = this.getColIdByValue(this.getRowId(i),id).getValue();
	}
	return columnList;
};

dhtmlXGridObject.prototype.getRowObject = function(id){
	var obj = {};
	for(var i = 0; i < this.getColumnsNum(); i++) {
		obj[this.getColumnId(i)] = this.cells(id, i).getValue();
	}
	return obj;
};

dhtmlXGridObject.prototype.getRowArray = function(id){
	var obj = [];
	var index = 0;
	for(var i = 0; i < this.getColumnsNum(); i++) {
		if(this.getColType(i) != "ch"){
			obj[index++] = this.cells(id, i).getValue();
		}
	}
	return obj;
};

dhtmlXGridObject.prototype.getSelectedRowsByState = function(cellId,value){
	var obj = [];
	var index = 0;
	for(var i = 0; i < this.getRowsNum(); i++) {
		if(this.getColIdByValue(this.getRowId(i), cellId).getValue() == value){
			obj[index++] = this.getRowId(i);
		}
	}
	return obj;
};


dhtmlXCombo.prototype.addOptionEx = function(code,name,flag){
	this.clearAll();
	for(var i=0; i < code.length;i++){
		if(flag[i] == '1'){
			this.addOption(code[i], name[i]);
		}
	}
};

/*********************************************************
 * Common get seq function
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
function catchAjaxError(data){

	var val = data.xmlDoc.responseText || data;

	var error = $.parseJSON(val);
	if(error.ErrorStatus != undefined && error.ErrorStatus == true){
		dhtmlx.alert({ 	title:"확인",
						type:"alert-error",
						text: error.ErrorMessage,
						callback:function(){
							moveLoginPage(this,error);
						}				
					});
		progress_off();
		return false;
	}else if(error.error != undefined && error.error != null){
		dhtmlx.alert({ 	title:"확인",
			type:"alert-error",
			text: error.error,
			callback:function(){
				moveLoginPage(this,error);
			}				
		});
		progress_off();
		return false;
	}
		
	return true;
}
function getSeqKey(uri){
	loader = dhx4.ajax.postSync(uri);

	if(!catchAjaxError(loader)){return;}

	var obj = $.parseJSON(loader.xmlDoc.responseText);
	return obj.uniqueKey;
}

function getUniqueTabId(){
	var c = 1;
  	var d = new Date();
  	m = d.getMilliseconds() + "";
  	u = ++d + m + (++c === 10000 ? (c = 1) : c);

  	return u;
}

function ajaxSync(actionURL,param){

	var loader;
	var seachParams;

	loader = dhx4.ajax.postSync(actionURL,param);

	if(!catchAjaxError(loader)){return;}

	var obj = $.parseJSON(loader.xmlDoc.responseText);

	return obj;
}


function ajaxAsync(actionURL,param,callback,svid,progress){

	if(progress != false)
		progress_on();
	
	dhx4.ajax.post(actionURL,param,function(r){
		if(!catchAjaxError(r)){return;}
		callback(r,svid);
		progress_off();
	});
}

dhtmlXGridObject.prototype.LoadGridData = function(uri,paging_flag,param,callback,progress){

	var searchURL = uri;

	if(paging_flag=="true"){
		if(searchURL == uri){
			searchURL += "?paging_flag="+paging_flag;
		}else{
			searchURL += "&paging_flag="+paging_flag;
		}
	} 
	
	if(this.pagingOn){
		if(searchURL == uri){
			searchURL += "?grid_size="+this.rowsBufferOutSize;
		}else{
			searchURL += "&grid_size="+this.rowsBufferOutSize;
		}
	} 
	if(param!=null){
		if(searchURL == uri){
			searchURL += "?"+param;
		}else{
			searchURL += "&"+param;
		}
	} 	
	
	if(progress == null || progress == true) { 
		progress_on();
	}
	
	return this.load(searchURL,callback,"custom_js");
};

function progress_on(){
	var t1 = document.createElement("DIV");
	t1.className = "dhxlayout_progress";
	document.body.appendChild(t1);

	var t2 = document.createElement("DIV");
	t2.className = "dhxlayout_progress_img";
	document.body.appendChild(t2);

	t1=t2=null;
}

function progress_off(){
	var p = {dhxlayout_progress: true, dhxlayout_progress_img: true};

	for (var q=0; q<document.body.childNodes.length; q++) {
		if (typeof(document.body.childNodes[q].className) != "undefined" && p[document.body.childNodes[q].className] == true) {
			p[document.body.childNodes[q].className] = document.body.childNodes[q];
		}
	}

	for (var a in p) {
		if (p[a] != true) document.body.removeChild(p[a]);
		p[a] = null;
	}

	p = null;

}

dhtmlXGridObject.prototype.setEmptyMessage = function(text){

	var that = this;

 	this.attachEvent("onBeforePageChanged", function(currentpage,pageNum){
		var check;

		check = this.rowsBuffer.length > 0 ? false : true;

 		if(check){
			progress_on();
			setMessage(text);
		}

		return true;
	});


	function setMessage(msg){
		var nodatagrid = document.createElement("DIV");
		nodatagrid.className="nodatagrid_title";
		that.objBox.appendChild(nodatagrid);
		if(msg!=null){
			that.objBox.getElementsByClassName("nodatagrid_title")[0].innerHTML = msg;
		}else{
			that.objBox.getElementsByClassName("nodatagrid_title")[0].innerHTML = that.i18n.paging.notfound;
		}
	}

	function removeMessage(){
		if(that.objBox.getElementsByClassName("nodatagrid_title")[0]!=null){
			that.objBox.removeChild(that.objBox.getElementsByClassName("nodatagrid_title")[0]);
		}
	}

	function grid_onEmptyData(){
		if(this.getRowsNum() <= 0){
			setMessage();
		}
		else{
			removeMessage();
		}
		progress_off();
	}

	setMessage(text);
   	this.attachEvent("onXLE",grid_onEmptyData);
	this.attachEvent("onClearAll",grid_onEmptyData);
	this.attachEvent("onGridReconstructed",grid_onEmptyData);
};

/*********************************************************
 * grid vaildation error handling
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXGridObject.prototype.setValidErrorMessage = function(){
	
	this.attachEvent("onValidationError", function(id,index,value,rule){
		
		lable = this.getColLabel(index,this.hdr.rows.length-2);
		
		var message = convertValidMessage(rule,lable);
		if(message != ""){
			/*
			dhtmlx.alert({ 	title:"확인",
				type:"alert-error",
				text: message		
			});
			*/
			
			dhtmlx.message.position="bottom";
			dhtmlx.message({
				type: "validCss",
				text: message,
				expire: 2000
			})
		}
		
	    return true;
	});
};

function convertValidMessage(rule){
	
	var message = "";
	switch(rule) {
		case "Empty" :
			message = lable + "은 입력 항목이 아닙니다.";
			break;
		case "NotEmpty" :
			message = lable + "은 필수 입력 항목입니다.";
			break;
		case "ValidAplhaNumeric" :
			message = lable + "은 영문 및 숫자를 입력하십시오.";
			break;
		case "ValidBoolean" :
			message = lable + "은 bool 값을 입력 하십시오.";
			break;
		case "ValidCurrency" :
			message = lable + "은 통화 형식이 맞지 않습니다.";
			break;
		case "ValidDate" :
			message = lable + "은 날짜를 입력하십시오.";
			break;
		case "ValidDatetime" :
			message = lable + "은 날짜와 시간을 입력하십시오.";
			break;
		case "ValidEmail" :
			message = lable + "은 이메일 형식이 아닙니다.";
			break;
		case "ValidInteger" :
			message = lable + "은 숫자 형식을 입력하십시오.";
			break;
		case "ValidIPv4" :
			message = lable + "은 IP 형식을 입력하십시오.";
			break;
		case "ValidNumeric" :
			message = lable + "은 숫자 형식을 입력하십시오.";
			break;
		case "ValidSIN" :
			break;
		case "ValidSSN" :	
			break;
		case "ValidTime" :		
			message = lable + "은 시간형식을 입력하십시오.";
			break;
		case "Min2" :
			message = lable + "은 최소 2자리 이상 입력하십시오";
			break;
		default :
			break;
	}
	
	return  message;
}

dhtmlxValidation.isMin2=function(data){ 
    return data.length>=2;
};

/*********************************************************
 *dataProcessor sendDataWithForm function
 * 파일명		:	common.js
 * 설 명		:	grid와 form data 같이 저장
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dataProcessor.prototype.sendDataWithForm = function(_formData,_formMode,_callback){
	
	if(this.updatedRows.length > 0){		
		
		var _transaction = true;
		
		this.defineAction("form_error",function(response){
				
			_transaction = false;
			
			window.parent.dhtmlx.alert({
				title: "Error",
		        type: "alert-error",
		        text:  response.getAttribute("message")});
			
			if(_callback != undefined && _callback != null)
				_callback(false);    
		});
			
		this.attachEvent("onAfterUpdateFinish", function() {
						
			if(this.getSyncState() && _transaction) {			
				window.parent.dhtmlx.alert({title:"확인",	type:"alert",text:"저장 되었습니다."});
				
				if(_callback != undefined && _callback != null)
					_callback(true);
			}
		});
		
		var _serverProcessor = this.serverProcessor+"&formData="+encodeURIComponent(_formData)+"&"+_formMode;
		this.serverProcessor = _serverProcessor;	
		this.sendData();
			
	}else{			
		
		var parser = new DOMParser();
		
		var result = dhx4.ajax.postSync(this.serverProcessor,"&formData="+encodeURIComponent(_formData)+"&"+_formMode);
		
		var xmlDoc = parser.parseFromString(result.xmlDoc.responseText,"text/xml");	
		var xml = xmlDoc.getElementsByTagName('data');		
		
		if(xml[0].childNodes.length > 0 && xml[0].getElementsByTagName('action')[0].getAttribute('type') == "form_error"){
			
			window.parent.dhtmlx.alert({
				title: "Error",
		        type: "alert-error",
		        text: xml[0].getElementsByTagName('action')[0].getAttribute('message')});
			
			if(_callback != undefined && _callback != null)
				_callback(false); 
			
			
		}else{			
			window.parent.dhtmlx.alert({title:"확인",	type:"alert",text:"저장 되었습니다."});
			
			if(_callback != undefined && _callback != null)
				_callback(true);
		}	
	}	
};

/*********************************************************
 *dataProcessor vaildate function
 * 파일명		:	common.js
 * 설 명		: 필수 입력 사항 및 유효성 검사
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dataProcessor.prototype.setValidErrorMessage = function(){
	
	this.attachEvent("onValidationError", function(id, details){
	    //custom code here
		var message = "데이터가 형식에 맞지 않습니다."
		dhtmlx.alert({ 	title:"확인",
			type:"alert-error",
			text: message		
		});
	});
};

function Empty(value, id, ind)  {
	return value == '';
}

function NotEmpty(value, id, ind)  {
	return (value instanceof Array?value.length>0:!value == ''); // array in case of multiselect
}

function ValidBoolean(value, id, ind)  {
	return !!value.toString().match(/^(0|1|true|false)$/);
}

function ValidEmail(value, id, ind)  {
	return !!value.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i);
}

function ValidInteger(value, id, ind)  {
	return !!value.toString().match(/(^-?\d+$)/);
}

function ValidNumeric(value, id, ind)  {
	return !!value.toString().match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/);
}

function ValidAplhaNumeric(value, id, ind)  {
	return !!value.toString().match(/^[_\-a-z0-9]+$/gi);
}

// 0000-00-00 00:00:00 to 9999:12:31 59:59:59 (no it is not a "valid DATE" function)
function ValidDatetime(value, id, ind)  {
	var dt = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
	return dt && !!(dt[1]<=9999 && dt[2]<=12 && dt[3]<=31 && dt[4]<=59 && dt[5]<=59 && dt[6]<=59) || false;
}

// 0000-00-00 to 9999-12-31
function ValidDate(value, id, ind)  {
	var d = value.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
	return d && !!(d[1]<=9999 && d[2]<=12 && d[3]<=31) || false;
}

// 00:00:00 to 59:59:59
function ValidTime(value, id, ind)  {
	var t = value.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
	return t && !!(t[1]<=24 && t[2]<=59 && t[3]<=59) || false;
}

// 0.0.0.0 to 255.255.255.255
function ValidIPv4(value, id, ind)  { 
	var ip = value.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
	return ip && !!(ip[1]<=255 && ip[2]<=255 && ip[3]<=255 && ip[4]<=255) || false;
}

function ValidCurrency(value, id, ind)  { // Q: Should I consider those signs valid too ? : ¢|€|₤|₦|¥
	return value.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false;
}

// Social Security Number (999-99-9999 or 999999999)
function ValidSSN(value, id, ind)  {
	return value.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false;
}

// Social Insurance Number (999999999)
function ValidSIN(value, id, ind)  {
	return value.toString().match(/^\d{9}$/) && true || false;
}

function Min2(value, id, ind){ 
    return value.length>=2;
};
//삭제 예정 함수 
function not_empty(value, id, ind) {
	return value != "";
}

/*********************************************************
 * grid function
 * 파일명		:	common.js
 * 설 명		: 
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXGridObject.prototype.getCheckedRows = function(col_ind){
	var d = new Array();
	this.forEachRowA(function(id){
			var cell = this.cells(id, col_ind);
			if (cell.changeState && cell.getValue() != 'N')
				d.push(id);
	},true);
	return d.join(",");
};

dataProcessor.prototype.setAutoMarkImage = function(contextPath,grid){
	var that = grid;
	var context = contextPath;
	var dataColumns=[];
	
	this.styles.invalid="color:orange; font-weight:bold;";

	function dataProcessor_onRowMark(id,state,mode,is_invalid){

		if(mode=="updated" && state==true){
			that.getColIdByValue(id,"STATUS!").setValue("<img src='"+context+"/images/icon/bt_u.png'/>");
		}else if(mode=="deleted"){
			that.getColIdByValue(id,"STATUS!").setValue("<img src='"+context+"/images/icon/bt_d.png'/>");
		}else if(mode=="inserted"){
			that.getColIdByValue(id,"STATUS!").setValue("<img src='"+context+"/images/icon/bt_i.png'/>");
		}
		return true;
	}

	function dataProcessor_onRowMark_Off(){		
		for(var i=0;i<that.getRowsNum();i++){
			if(that.getRowId(i) != null){
				that.getColIdByValue(that.getRowId(i),"STATUS!").setValue("");
			}
		}
	}

	for(var i=0;i<that.getColumnsNum();i++){

		if(that.getColumnId(i)=='CHK')
			dataColumns[i] =false;
		else
			dataColumns[i] =true;
	}

	this.setDataColumns(dataColumns);
	this.attachEvent("onAfterUpdateFinish",dataProcessor_onRowMark_Off);
	this.attachEvent("onRowMark",dataProcessor_onRowMark);
	
	this.defineAction("error",function(response){
		window.parent.dhtmlx.alert({
			title: "Error",
	        type: "alert-error",
	        text:  response.getAttribute("message")});
	    return true;
	});

	this.defineAction("invalid",function(response){
		window.parent.dhtmlx.alert({
			title: "확인",
	        text:  response.getAttribute("message")});
	    return true;
	});
	
	this.defineAction("updated",function(response){
	    return false;
	});
	this.defineAction("inserted",function(response){
	    return false;
	});
	this.defineAction("deleted",function(response){
	    return false;
	});
};

dataProcessor.prototype.setAutoGridMessage = function(){
	this.attachEvent("onAfterUpdateFinish", function() {
		if(this.getSyncState()) {
			var url = this.obj.xmlFileUrl;
			this.obj.clearAll();
			this.obj.load(url ,"custom_js");
			window.parent.dhtmlx.alert({
				title:"확인",
				type:"alert",
				text:"저장 되었습니다."});
		}
	});
};

/*********************************************************
 *  Calendar locale 설정
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXCalendarObject.prototype.langData["kr"] = {
	dateformat: '%d.%m.%Y',
	monthesFNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	monthesSNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
	daysFNames: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
	daysSNames: ["일","월","화","수","목","금","토"],
	weekstart: 7
};


/*********************************************************
 * popup function
 * 파일명		:	common_popup.js
 * 설 명		:	popup 관련 함수
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/

dhtmlXWindowsCell.prototype.setParam = function(param){
	this.param = param;
};

dhtmlXWindowsCell.prototype.getParam = function(){
	return this.param;
};

dhtmlXWindows.prototype.closeAll = function(winId){

    this.forEachWindow(function(obj){
    	obj.close();
    });
};


dhtmlXWindows.prototype.openPopupWindow = function(viewPort,id,title,url,width,height,param,bmodal,bclose,bminmax,bpark){

	if(viewPort != null){
		this.attachViewportTo(viewPort);
	}
	var window = this.createWindow(id, 0, 0, width,height);
	window.center();
	window.denyResize();

	if(title != null && title !=""){
		window.setText(title);
	}else{
		window.setText("TITLE");
	}

	if(bmodal == null || bmodal == true){
		window.setModal(true);
	}else{
		window.setModal(false);
	}

	if(bclose != null || bclose == false){
		window.button("close").disable();
		window.button("close").hide();
	}

	if(bpark == null|| bpark == false){
		window.button("park").disable();
		window.button("park").hide();
	}

	if(bminmax == null || bminmax == false){
		window.button("minmax").disable();
	    window.button("minmax").hide();
	}

	if(param !=null && param !=""){
		window.attachURL(url,false,param);
	}else{
		window.attachURL(url);
	}

	return window;
};


dhtmlXWindowsCell.prototype.getValue = function(callback){
	this.attachEvent("onClose", function(){
    	callback(this.getParam());
    	return true;
    });
};

/*********************************************************
 * popup function
 * 파일명		:	common_popup.js
 * 설 명		:	공통 팝업 관련 함수
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
//param 형식
//var param = {"NAME":"popuptest","NUMBER":"2313313"};
var winObj;
function openCommonPopup(context,viewPort,popup_id,param){

	winObj = new dhtmlXWindows();
	if(param != null && param != ''){
		param = {"popup_id":popup_id,"param":JSON.stringify(param)};
	}else {
		param = {"popup_id":popup_id};
	}

	var condition = "popup_id="+popup_id;
	var url = context + "/cmm/popup/cmmPopupInfo";
	var result = ajaxSync(url,condition);
	var data = result.data;

	if(data[0] != null){
		winObj.openPopupWindow(viewPort,popup_id,data[0].popup_nm + "(" + popup_id + ")",context+"/cmm/popup/cmmPopupView",data[0].width,data[0].height,param);
	}else{
		dhtmlx.message({
			title: "Error",
            type: "alert-error",
	        text: "팝업 정보를 찾을수 없습니다."});
		return;
	}
	return winObj;
}

/*********************************************************
 * grid init function
 * 파일명		:
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/

dhtmlXGridObject.prototype.dhtmlXGridHtmlInit = function(id){
	var obj = document.getElementById(id);

	/*header row 1*/
	var obj_row = obj.getElementsByTagName("tr")[0].getElementsByTagName("td");

	var rowCnt = obj.getAttribute('rowcnt');
	var columnSizeType = obj.getAttribute('columnSizeType');
	var row1 = new Array();
	var type = new Array();
	var width = new Array();
	var align = new Array();
	var halign = new Array();
	var sort = new Array();
	var columnId = new Array();
	var validate = new Array();
	var colcolor = new Array();

	for(var i = 0;i<obj_row.length;i++){

		columnId[i] = obj_row[i].getAttribute('columnId');/*ColumnId */
		type[i] = obj_row[i].getAttribute('type');/*type*/
		width[i] = obj_row[i].getAttribute('width');/*width*/
		align[i] = obj_row[i].getAttribute('align');/*align*/
		sort[i] = obj_row[i].getAttribute('sort'); /*sort*/
		validate[i] = obj_row[i].getAttribute('validate');/*validate*/
		halign[i] = "text-align:center;vertical-align: middle;";/*header align*/

		if(obj_row[i].getAttribute('essential')=="true"){
			row1[i] = '<b>'+obj_row[i].childNodes[0].nodeValue+'</b>'+'<span style="margin-left:5px;color:red;">*</span>';
		}else{
			row1[i] = obj_row[i].childNodes[0].nodeValue;
		}

		if(obj_row[i].getAttribute('type')=="ro")
			colcolor[i] = "#f7f7f7";
		else
			colcolor[i] = "";
	}

	this.setHeader(row1.join(),null,halign);

	if(rowCnt>1){
		for(var i=0;i<rowCnt-1;i++){
			var subrow = [];
			for(var j = 0;j<obj_row.length;j++){
				subrow[j] = obj_row[j].getAttribute('subrow').split('|')[i];
			}
			this.attachHeader(subrow,halign);
		}
	}

	this.setSkin(obj.getAttribute('skin'));
	this.setImagePath(obj.getAttribute('imgpath'));
	this.setColumnIds(columnId.join());
	if( columnSizeType == "px" ){
		this.setInitWidths(width.join());
	}else if ( columnSizeType == "%" ){
		this.setInitWidthsP(width.join());
	}
	this.setColAlign(align.join());
	this.setColTypes(type.join());
	this.setColSorting(sort.join());
	this.setColValidators(validate.join());
	this.enableMultiline((obj.getAttribute("enableMultiline")));
	this.enableEditEvents(true,false,true);
	//this.enableAccessKeyMap(true);

	
	this.init();

	for(var i = 0;i<obj_row.length;i++){
		if(obj_row[i].getAttribute('hidden')=="true"){
			this.setColumnHidden(i,true);
		}
	}
	
	$('#'+id).remove();
	
	
	return this;
};

/*********************************************************
 * Excel export function
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXGridObject.prototype.setExcelHeader = function(id){

	var obj = makeExcelHeader(id);

	this._data_cache["excelHeader"] = obj.mheader;
	this._data_cache["excelColumnId"] = obj.columnId;
	this._data_cache["excelWidth"] = obj.width;
	this._data_cache["excelAlign"] = obj.align;

};

dhtmlXGridObject.prototype.doPost_to_target = function(url, excelInfo, param){
	var method = "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", url);
    for(var key in excelInfo) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", excelInfo[key]);
        form.appendChild(hiddenField);
    }
    if(param != null){
		var searchCondition = param.split('&');

		for(var i = 0; i < searchCondition.length; i++){
			var search = searchCondition[i].split('=');
	        var hiddenField = document.createElement("input");
	        hiddenField.setAttribute("type", "hidden");
	        hiddenField.setAttribute("name", search[0]);
	        hiddenField.setAttribute("value", decodeURIComponent(search[1].replace("+","%20")));
	        form.appendChild(hiddenField);
		}
    }

    document.body.appendChild(form);
    form.submit();
};


dhtmlXGridObject.prototype.toExcel = function (url,filename, param) 
{	
	var header = this._data_cache["excelHeader"];
	var columnId = this._data_cache["excelColumnId"];
	var width = this._data_cache["excelWidth"];
	var align = this._data_cache["excelAlign"];

	this.doPost_to_target(url,{"mheader":header,"filename":filename,"columnId":columnId,"width":width,"align":align},param); 
};


function excelDownload(url, queryId, filename, excelInfo, param){
	excelInfo["qID"] = queryId;
	excelInfo["filename"] = filename;


    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    for(var key in excelInfo) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", excelInfo[key]);
        form.appendChild(hiddenField);
    }

    	var searchCondition = param.split('&');

		for(var i = 0; i < searchCondition.length; i++){
			var search = searchCondition[i].split('=');
	        var hiddenField = document.createElement("input");
	        hiddenField.setAttribute("type", "hidden");
	        hiddenField.setAttribute("name", search[0]);
	        hiddenField.setAttribute("value", decodeURIComponent(search[1]));
	        form.appendChild(hiddenField);
		}


    document.body.appendChild(form);
    form.submit();
};

function makeExcelHeader(id){
	var obj = document.getElementById(id);
	var obj_row = obj.getElementsByTagName("TR")[0].getElementsByTagName("TD");
	
	var rowCnt = obj.getAttribute('rowcnt');
	var columnId = new Array();
	var align = new Array();
	var width = new Array();
	var excelRow = new Array();
	var excelHeader = new Array();
	
	for(var i = 0;i<obj_row.length;i++){
		align[i] = obj_row[i].getAttribute('align');/*align */	
		width[i] = obj_row[i].getAttribute('width');/*width */
		columnId[i] = obj_row[i].getAttribute('columnId');/*ColumnId */
		excelRow[i] = obj_row[i].childNodes[0].nodeValue;
	}
	excelHeader[0] = excelRow;
	
	if(rowCnt>1){
		for(var i=0;i<rowCnt-1;i++){
			var subrow = new Array();
			for(var j = 0;j<obj_row.length;j++){   			
				subrow[j] = obj_row[j].getAttribute('subrow').split('|')[i];
			}			
			excelHeader[i+1] = subrow;
		}	
	}	
	
	var header = new Array();
	var c_index = 0;
	for(var row = 0; row < rowCnt ; row++){
		
		var header_rows = new Array();
		for (var i = 0; i < excelHeader[row].length; i++){
			
			var header_row = new Array();
			header_row[0] = 1;
			header_row[1] = 1;	
			if (excelHeader[row][i] == "#cspan"){
				
				header_rows[c_index][0] = header_rows[c_index][0]+1;
				header_row[0] = 0;
			    header_row[1] = 0;
				header_rows[i] = header_row;
				continue;
			}
			
			c_index = i;
			header_rows[i] = header_row;
			
			if ((excelHeader[row][i] == "#rspan")&&(rowCnt > 1)){
				var r_index= row||0;
				var r_cnt = 1;
				while(r_index){
					if(excelHeader[r_index][i] =="#rspan"){
						header_rows[i][0] = 0;
						header_rows[i][1] = 0;
						r_cnt++;
					}
					
					if(excelHeader[r_index-1][i] !="#rspan"){
						header[r_index-1][i][1] = r_cnt;
						r_cnt = 0;
					}
					
					r_index--;
				}

			}
		}
		header[row] = header_rows;
	}
	
    var headerStr="";
    for(var i = 0; i < header.length; i++ ){
    	for(var j = 0 ; j < header[i].length; j++){
    		
    		var h = header[i][j];
    		
            if(h[0]>1){
            	s = (h[0] && h[0] > 1 ? ' colspan=' + h[0] + '' : "");
            }else{
            	s = (h[1] && h[1] > 1 ? ' rowspan=' + h[1] + '' : "");
            }
            
            headerStr += "{";
            headerStr += s.replace(" ", "")+";" ;
            
            if(h[0] == 0 && h[1] == 0)
            	headerStr +=  "N/A" ;
              else
            	  headerStr +=  excelHeader[i][j] ;
              
            headerStr +="}";
    		
    	}
    	
    	if(i < header.length-1){
    		headerStr+="&";
    	}
    }
    var obj = {};
    obj.mheader = headerStr;
    obj.columnId = columnId.join();
    obj.width = width.join();
    obj.align = align.join();
    
	$('#'+id)[0].style.display="none";
	return obj;
	
}

/*********************************************************
 * replaceAll function
 * 파일명		:	common.js
 * 설 명		:	replaceAll 관련 함수
 * 매개변수	:
 * 작성일		:  2014-03-30
 * 비고		:  sValue의 param1의 문자를 param2로 바꾼다.

 *********************************************************/

function replaceAll(sValue, param1, param2){
	return sValue.split(param1).join(param2);
}

function doStatusBarMessage(message){
	if(window.parent.statusBar!=null){
		window.parent.statusBar.setText(message);
	}
}

//"SAREA_CODE=서비스영역코드&SAREA_NAME=서비스영역명&OP_EMP_NO=담당자&MG_EMP_NO=관리자&TENANT_SN=테넌트&STATUS=사용여부";
function validatorCheck(param){

	var checkList = param.split("&");
	
	for(var i=0;i<checkList.length;i++){

		if($( "input[name="+checkList[i].split("=")[0]+"]").val()==""){
			dhtmlx.alert({title:"확인", type:"alert", text:checkList[i].split("=")[1]+"을 입력 하세요."});
			return false;
		}

	}

	return true;
}


/*********************************************************
 * serializeObject function
 * 파일명		:	common.js
 * 설 명		:	serializeObject 관련 함수
 * 매개변수	:
 * 작성일		:  2014-07-30
 * 비고		:  form data를 json 형태로 변환한다.

 *********************************************************/
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/*********************************************************
 * date check function
 * 파일명		:	common.js
 * 설 명			:	date check 관련 함수
 * 매개변수	:
 * 작성일		:  2013-12-03
 * 비고		:

 *********************************************************/


function dateCheck(d1,d2,m){
	if(($("#"+d1).val() != "" && $("#"+d1).val() != null) && ($("#"+d2).val() != "" && $("#"+d2).val() != null)){
		if($("#"+d1).val() > $("#"+d2).val()){
			$("#"+d2).val("");
			if(m != null && m != ""){
				window.parent.dhtmlx.alert({
					title:"확인",
					type:"alert",
					text:m});
			}else{
				window.parent.dhtmlx.alert({
					title:"확인",
					type:"alert",
					text:"From날짜보다 To날짜가 큽니다."});
			}

		}
	}/*else if($("#"+d1).val() != "" && $("#"+d1).val() != null){
		var todayDate = new Date();
		var today = todayDate.format('yyyy-MM-dd');
		if(today < $("#"+d1).val()){
			$("#"+d1).val("");
			window.parent.dhtmlx.alert({
				title:"확인",
				type:"alert",
				text:"미래날짜를 넣을 수 없습니다."
			});
		}
	}*/
}

/*********************************************************
 * date gap function
 * 파일명		:	common.js
 * 설 명			:	date gap 관련 함수
 * 매개변수	:
 * 작성일		:  2013-12-03
 * 비고		:

 *********************************************************/

function dateGap(s,d,m){
	var msecPerDay = 1000 * 60 * 60 * 24;

	var sourceDate = "";
	var destinationDate = "";

	//날짜값 세팅이 안되면 오늘날짜 넣기
	if($("#"+s).val() != null && $("#"+s).val() != ""){
		sourceDate = new Date($("#"+s).val());
		sourceDate.setHours(23);
		sourceDate.setMinutes(59);
		sourceDate.setSeconds(59);
	}else{
		sourceDate = new Date();
	}

	if($("#"+d).val() != null && $("#"+d).val() != ""){
		destinationDate = new Date($("#"+d).val());
		destinationDate.setHours(23);
		destinationDate.setMinutes(59);
		destinationDate.setSeconds(59);

	}else{
		destinationDate = new Date();
	}

	var sourceMsec = sourceDate.getTime();
	var destinationMsec = destinationDate.getTime();

	var interval = destinationMsec - sourceMsec;
	var days = Math.floor(interval / msecPerDay );

	return days;
}
/*********************************************************
 * back button disable function
 * 파일명		:	common.js
 * 설 명		:	back button disable
 * 매개변수	:
 * 작성일		:  2014-12-16
 * 비고		:

 *********************************************************/
$(document).ready(function(){
	window.history.forward(1);
});

$(document).keydown(function(e){
    if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
    	if(e.keyCode === 8){
        return false;
        }
    }
});

/*********************************************************
 * setSearchData function
 * 파일명		:	common.js
 * 설 명			:	cookie에 저장된 search data를 set
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
function setSearchData(cookieId){

	var count = 0;
	var data = getCookie(cookieId);
	if(data == null || data=="") return;

	var searchData = $.parseJSON(data);

	setValue(parseSearchData(searchData,"searchField"),"searchField");
	setValue(parseSearchData(searchData,"searchDatefield"),"searchDatefield");

	count += setValue(parseSearchData(searchData,"searchValue"),"searchValue");
	count += setValue(parseSearchData(searchData,"searchDateFrom"),"searchDateFrom");
	count += setValue(parseSearchData(searchData,"searchDateTo"),"searchDateTo");

	return count;
}

function setSearchAddData(cookieId){
	var count = 0;
	var data = getCookie(cookieId);
	if(data==null || data =="") return;

	var searchData = $.parseJSON(data);

	$.each(searchData, function(index,val){
		if(val.value !=null && val.value !=""){
			$("[name='"+val.name+"']").val(val.value);
			count++;
		}
	});

	return count;
}

function setValue(data,tagName){
	var count = 0;
	if(data !=null && data.length >0 ){
		$("[name='"+tagName+"']").each(function (index,val){
			if(data[index] !=null && data[index] !=""){
				$(this).val(data[index]);
				count++;
			}
		});
	}
	return count;
}

function parseSearchData(data,keyWord){

	var searchData = new Array();

	if(data!=null && data.length > 0 ){
		$.each(data, function(index,val){
			if(val.name == keyWord){
					searchData.push(val.value);
			}
		});
	}
	return searchData;
}
/*********************************************************
 * onerror function
 * 파일명		:	common.js
 * 설 명		:	onerror
 * 매개변수		:
 * 작성자		:
 * 작성일		:
 * 비고			:

 *********************************************************/
//window.onerror = function(msg, url, line, col, error) {
//	   // Note that col & error are new to the HTML 5 spec and may not be
//	   // supported in every browser.  It worked for me in Chrome.
//	   var extra = !col ? '' : '\ncolumn: ' + col;
//	   extra += !error ? '' : '\nerror: ' + error;
//
//	   // You can view the information in an alert to see things working like this:
//	   alert("Error: " + msg + "\nurl: " + url + "\nline: " + line + extra);
//
//	   // TODO: Report this error via ajax so you can keep track
//	   //       of what pages have JS issues
//
//	   var suppressErrorAlert = true;
//	   // If you return true, then error alerts (like in older versions of
//	   // Internet Explorer) will be suppressed.
//	   return suppressErrorAlert;
//};

/*********************************************************
 *  Grid Paging Locale 설정
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수	:
 * 작성자		:
 * 작성일		:
 * 비고		:

 *********************************************************/
dhtmlXGridObject.prototype.setGridLocale = function (language) {
	switch(language) {
	case "ko" :
		this.i18n.paging={
			results:"결과",
			records:"현재 데이터 : ",
			to:" 부터 ",
			page:"페이지 ",
			perpage:"개 보기",
			first:"첫번째 페이지",
			previous:"이전페이지",
			found:"레코드 검색 완료",
			next:"다음페이지",
			last:"마지막 페이지",
			of:" of ",
			notfound:"데이터가 없습니다.",
			total: "총계",
			readNem : "건"	};
		break;
	case "en" :
		this.i18n.paging={
			results:"Results",
			records:"Records from ",
			to:" to ",
			page:"Page ",
			perpage:"rows per page",
			first:"To first Page",
			previous:"Previous Page",
			found:"Found records",
			next:"Next Page",
			last:"To last Page",
			of:" of ",
			notfound:"No Records Found" ,
			total: "total",
			readNem : ""	};
		break;
	}
};

/*********************************************************
 * Grid custom paging function
 * 파일명		:	common.js
 * 설 명		:	Grid custom paging
 * 매개변수		:
 * 작성자		:
 * 작성일		:
 * 비고			:

 *********************************************************/

dhtmlXGridObject.prototype._pgn_customToolbar = function(page, start, end){
	if (!this.aToolBar) this.aToolBar = this._pgn_createCustomToolBar();
	var totalPages=Math.ceil(this.rowsBuffer.length/this.rowsBufferOutSize);

	if (this._WTDef[0]){
		this.aToolBar.enableItem("right");
		this.aToolBar.enableItem("rightabs");
		this.aToolBar.enableItem("left");
		this.aToolBar.enableItem("leftabs");
		if(this.currentPage>=totalPages){
			this.aToolBar.disableItem("right");
			this.aToolBar.disableItem("rightabs");
		}
		if(this.currentPage==1){
			this.aToolBar.disableItem("left");
			this.aToolBar.disableItem("leftabs");
		}
	}
	if (this._WTDef[2]){
		var that = this;
		this.aToolBar.forEachListOption("pages", function(id){
			that.aToolBar.removeListOption("pages", id);
		});
		var w = {dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 14}[this.aToolBar.conf.skin];
		for (var i=0; i<totalPages; i++) {
			this.aToolBar.addListOption("pages", "pages_"+(i+1), NaN, "button", "<span style='padding: 0px "+w+"px 0px 0px;'>"+this.i18n.paging.page+(i+1)+"</span>", "paging_page.gif");
		}
		this.aToolBar.setItemText("pages", this.i18n.paging.page+page);
	}
	// pButton.setSelected(page.toString())


	if (this._WTDef[1]){
		if (!this.getRowsNum())
			this.aToolBar.setItemText('results',this.i18n.paging.notfound);
		else
			this.aToolBar.setItemText('results',"<div style='width:100%; text-align:center'>"+this.i18n.paging.records+(start+1)+this.i18n.paging.to+end+"</div>");
	}
	if (this._WTDef[3])
		this.aToolBar.setItemText("perpagenum", this.rowsBufferOutSize.toString()+" "+this.i18n.paging.perpage);

	this.aToolBar.setItemText("total","<span style='padding: 0px 0px 0px 30px;'>" + this.i18n.paging.total + "  "+ this.rowsBuffer.length  + "  "+ this.i18n.paging.readNem + "</span>" );


	this.callEvent("onPaging",[]);

};

dhtmlXGridObject.prototype._pgn_createCustomToolBar = function(){
	this.aToolBar = new dhtmlXToolbarObject({
		parent: this._pgn_parentObj,
		skin: (this._pgn_skin_tlb||this.skin_name),
		icons_path: this.imgURL
	});

	if (!this._WTDef) this.setPagingWTMode(true, true, true, true);
	var self = this;
	this.aToolBar.attachEvent("onClick", function(val){
		val = val.split("_");
		switch (val[0]){
			case "leftabs":
				self.changePage(1);
				break;
			case "left":
				self.changePage(self.currentPage-1);
				break;
			case "rightabs":
				self.changePage(99999);
				break;
			case "right":
				self.changePage(self.currentPage+1);
				break;
			case "perpagenum":
				if (val[1]===this.undefined) return;
				self.rowsBufferOutSize = parseInt(val[1]);
				self.changePage();
				self.aToolBar.setItemText("perpagenum", val[1]+" "+self.i18n.paging.perpage);
				break;
			case "pages":
				if (val[1]===this.undefined) return;
				self.changePage(val[1]);
				self.aToolBar.setItemText("pages", self.i18n.paging.page+val[1]);
				break;
		}

	});
	// add buttons
	if (this._WTDef[0]) {
		this.aToolBar.addButton("leftabs", NaN, null, "ar_left_abs.gif", "ar_left_abs_dis.gif");
		this.aToolBar.addButton("left", NaN, null, "ar_left.gif", "ar_left_dis.gif");
	}
	if (this._WTDef[1]) {
		this.aToolBar.addText("results", NaN, this.i18n.paging.results);
		this.aToolBar.setWidth("results", "150");
		this.aToolBar.disableItem("results");
	}
	if (this._WTDef[0]) {
		this.aToolBar.addButton("right", NaN, null, "ar_right.gif", "ar_right_dis.gif");
		this.aToolBar.addButton("rightabs", NaN, null, "ar_right_abs.gif", "ar_right_abs_dis.gif");
	}
	if (this._WTDef[2]) {
		if (this.aToolBar.conf.skin == "dhx_terrace") this.aToolBar.addSeparator();
		this.aToolBar.addButtonSelect("pages", NaN, "select page", [], "paging_pages.gif", null, false, true);
	}
	var arr;
	if (arr = this._WTDef[3]) {
		if (this.aToolBar.conf.skin == "dhx_terrace") this.aToolBar.addSeparator();
		this.aToolBar.addButtonSelect("perpagenum", NaN, "select size", [], "paging_rows.gif", null, false, true);
		if (typeof arr != "object") arr = [5,10,15,20,25,30];
		var w = {dhx_skyblue: 4, dhx_web: 0, dhx_terrace: 18}[this.aToolBar.conf.skin];
		for (var k=0; k<arr.length; k++) {
			this.aToolBar.addListOption("perpagenum", "perpagenum_"+arr[k], NaN, "button", "<span style='padding: 0px "+w+"px 0px 0px;'>"+arr[k]+" "+this.i18n.paging.perpage+"</span>", "paging_page.gif");
		}
	}

	this.aToolBar.addText("total", NaN, this.i18n.paging.total);
	//this.aToolBar.setWidth("total", "100");

	//var td = document.createElement("TD"); td.width = "5"; this.aToolBar.tr.appendChild(td);
	//var td = document.createElement("TD"); td.width = "100%"; this.aToolBar.tr.appendChild(td);

	return this.aToolBar;
};


/*********************************************************
 * Date Format function
 * 파일명		:	common.js
 * 설 명		:	Date Format 관련 함수
 * 매개변수		:
 * 작성일		:
 * 비고			:  date fromat 으로 변환한다.
				new Date().format("hh:mm:ss")
 *********************************************************/
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};


/*********************************************************
 * dhtmlx grid excell function
 * 파일명		:	common.js
 * 설 명		:	그리드 버튼 관련 함수
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/
//robtn 타입은 꼭 초기화
// button 셀은 addrow 할때 초기화 필수
//robtn, edbtn 검색 함수 id == columnId
function eXcell_robtn(cell){
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }

    this.edit = function(){
    };

    this.isDisabled = function(){ return true; };

    this.setValue=function(val){
    	var uid = this.grid.entBox.id;
    	var columnId = this.grid.getColumnId(this.cell._cellIndex);
    	this.setCValue("<div class='eXcell-block'><div class='eXcell-cell'>"+val+"</div></div><div class='eXcell-buttonblock'><input class='eXcell-buttoncell' type='button' onclick='fn_searchButton("+'"'+columnId+'"'+","+'"'+uid+'"'+");'></div>");
    };
    this.getValue=function(){
    	return this.cell.textContent;
    };
}
eXcell_robtn.prototype = new eXcell;

function eXcell_edbtn(cell){
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }

    this.edit=function(){
		this.cell.atag=(!this.grid.multiLine) ? "INPUT" : "TEXTAREA";
		this.val=this.getValue();
		this.obj=document.createElement(this.cell.atag);
		this.obj.setAttribute("autocomplete", "off");
		this.obj.style.height=(this.cell.offsetHeight-(_isIE ? 4 : 4))+"px";
		this.obj.className="dhx_combo_edit";
		this.obj.wrap="soft";
		this.obj.style.textAlign=this.cell.style.textAlign;
		this.obj.onclick=function(e){
			(e||event).cancelBubble=true;
		};
		this.obj.onmousedown=function(e){
			(e||event).cancelBubble=true;
		};
		this.obj.value= this.val;
		this.cell.innerHTML="";
		this.cell.appendChild(this.obj);

		this.obj.onselectstart=function(e){
			if (!e)
				e=event;
			e.cancelBubble=true;
			return true;
		};
		if (_isIE){
			this.obj.focus();
			this.obj.blur();
		}
		this.obj.focus();
	};
    this.isDisabled = function(){ return false; };

    this.setValue=function(val){
    	var columnId = this.grid.getColumnId(this.cell._cellIndex);
    	this.setCValue("<div class='eXcell-block'><div class='eXcell-cell'>"+val+"</div></div><div class='eXcell-buttonblock'><input class='eXcell-buttoncell' type='button' onclick='fn_searchButton("+'"'+columnId+'"'+");'></div>");
    };
    this.getValue=function(){
    	return this.cell.textContent;
    };
	this.detach=function(){
		this.setValue(this.obj.value);
		return this.val != this.getValue();
	};
}
eXcell_edbtn.prototype = new eXcell;

//listButton
function eXcell_listbtn(cell){
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }

    this.edit = function(){
    };

    this.isDisabled = function(){ return true; };

    this.setValue=function(val){
    	var columnId = this.grid.getColumnId(this.cell._cellIndex);
    	var index = this.grid.rowsCol.length + 1;
  
    	this.setCValue("<div class='eXcell-block'><div class='eXcell-cell'>"+val+"</div></div><div class='eXcell-buttonblock'><input class='eXcell-listButtoncell' type='button' onclick='fn_searchButton("+'"'+columnId+'"'+',"'+index+'"'+");'></div>");
    };
    this.getValue=function(){
    	return this.cell.textContent;
    };
}
eXcell_listbtn.prototype = new eXcell;

//listButton
function eXcell_zipbtn(cell){
    if (cell){
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }

    this.edit = function(){
    };

    this.isDisabled = function(){ return true; };

    this.setValue=function(val){
    	var columnId = this.grid.getColumnId(this.cell._cellIndex);
    	var index = this.grid.rowsCol.length + 1;
  
    	this.setCValue("<div class='eXcell-block'><div class='eXcell-cell'>"+val+"</div></div><div class='eXcell-buttonblock'><input class='eXcell-zipButtoncell' type='button' onclick='fn_searchButton("+'"'+columnId+'"'+',"'+index+'"'+");'></div>");
    };
    this.getValue=function(){
    	return this.cell.textContent;
    };
}
eXcell_zipbtn.prototype = new eXcell;

/*********************************************************
 * dhtmlx grid eXcell_ch
 * 파일명		:	common.js
 * 설 명		:	그리드 eXcell_ch 버튼 관련
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/
function eXcell_ch(cell){
	if (cell){
		this.cell=cell;
		this.grid=this.cell.parentNode.grid;
	}

	this.disabledF=function(fl){
		if ((fl == true)||(fl == 1))
			this.cell.innerHTML=this.cell.innerHTML.replace("item_chk0.", "item_chk0_dis.").replace("item_chk1.",
				"item_chk1_dis.");
		else
			this.cell.innerHTML=this.cell.innerHTML.replace("item_chk0_dis.", "item_chk0.").replace("item_chk1_dis.",
				"item_chk1.");
	}

	this.changeState=function(fromClick){
		//nb:
		if (fromClick===true && !this.grid.isActive) {
			if (window.globalActiveDHTMLGridObject != null && window.globalActiveDHTMLGridObject != this.grid && window.globalActiveDHTMLGridObject.isActive) window.globalActiveDHTMLGridObject.setActive(false);
			this.grid.setActive(true);
		}
		if ((!this.grid.isEditable)||(this.cell.parentNode._locked)||(this.isDisabled()))
			return;

		if (this.grid.callEvent("onEditCell", [
			0,
			this.cell.parentNode.idd,
			this.cell._cellIndex
		])){
			this.val=this.getValue()

			if (this.val == "Y")
				this.setValue("N")
			else
				this.setValue("Y")

			this.cell.wasChanged=true;
			//nb:
			this.grid.callEvent("onEditCell", [
				1,
				this.cell.parentNode.idd,
				this.cell._cellIndex
			]);

			this.grid.callEvent("onCheckbox", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != 'Y')
			]);

			this.grid.callEvent("onCheck", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != 'Y')
			]);
		} else { //preserve editing (not tested thoroughly for this editor)
			this.editor=null;
		}
	}
	this.getValue=function(){
		return this.cell.chstate ? this.cell.chstate.toString() : "N";
	}

	this.isCheckbox=function(){
		return true;
	}
	this.isChecked=function(){
		if (this.getValue() == "Y")
			return true;
		else
			return false;
	}

	this.setChecked=function(fl){
		this.setValue(fl.toString())
	}
	this.detach=function(){
		return this.val != this.getValue();
	}
	this.edit=null;
}
eXcell_ch.prototype=new eXcell;
eXcell_ch.prototype.setValue=function(val){
	this.cell.style.verticalAlign="middle"; //nb:to center checkbox in line
	//val can be int
	if (val){
		val=val.toString()._dhx_trim();

		if ((val == "false")||(val == "N"))
			val="";
	}

	if (val){
		val="Y";
		this.cell.chstate="Y";
	} else {
		val="N";
		this.cell.chstate="N"
	}
	var obj = this;
	this.cell.setAttribute("excell", "ch");
	this.setCValue("<img src='"+this.grid.imgURL+"item_chk"+val
		+".gif' onclick='new eXcell_ch(this.parentNode).changeState(true); (arguments[0]||event).cancelBubble=true; '>",
		this.cell.chstate);
}

/*********************************************************
 * dhtmlx grid eXcell_ra
 * 파일명		:	common.js
 * 설 명		:	그리드 eXcell_ra 버튼 관련
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/
function eXcell_ra(cell){
	this.base=eXcell_ch;
	this.base(cell)
	this.grid=cell.parentNode.grid;

	this.disabledF=function(fl){
		if ((fl == true)||(fl == 1))
			this.cell.innerHTML=this.cell.innerHTML.replace("radio_chk0.", "radio_chk0_dis.").replace("radio_chk1.",
				"radio_chk1_dis.");
		else
			this.cell.innerHTML=this.cell.innerHTML.replace("radio_chk0_dis.", "radio_chk0.").replace("radio_chk1_dis.",
				"radio_chk1.");
	}

	this.changeState=function(mode){
		if (mode===false && this.getValue()==1) return;

		if ((!this.grid.isEditable)||(this.cell.parentNode._locked)||(this.isDisabled()))
			return;

		if (this.grid.callEvent("onEditCell", [
			0,
			this.cell.parentNode.idd,
			this.cell._cellIndex
		]) != false){
			this.val=this.getValue()

			if (this.val == "Y")
				this.setValue("N")
			else
				this.setValue("Y")
			this.cell.wasChanged=true;
			//nb:
			this.grid.callEvent("onEditCell", [
				1,
				this.cell.parentNode.idd,
				this.cell._cellIndex
			]);

			this.grid.callEvent("onCheckbox", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != 'Y')
			]);

			this.grid.callEvent("onCheck", [
				this.cell.parentNode.idd,
				this.cell._cellIndex,
				(this.val != 'Y')
			]);
		} else { //preserve editing (not tested thoroughly for this editor)
			this.editor=null;
		}
	}
	this.edit=null;
}
eXcell_ra.prototype=new eXcell_ch;
eXcell_ra.prototype.setValue=function(val){
	this.cell.style.verticalAlign="middle"; //nb:to center checkbox in line

	if (val){
		val=val.toString()._dhx_trim();

		if ((val == "false")||(val == "N"))
			val="";
	}

	if (val){
		if (!this.grid._RaSeCol)
			this.grid._RaSeCol=[];

		if (this.grid._RaSeCol[this.cell._cellIndex]){
			var id = this.grid._RaSeCol[this.cell._cellIndex];
			if (this.grid.rowsAr[id]){
				var z = this.grid.cells(id, this.cell._cellIndex);
				z.setValue("N")
				if (this.grid.rowsAr[z.cell.parentNode.idd])
				this.grid.callEvent("onEditCell", [
					1,
					z.cell.parentNode.idd,
					z.cell._cellIndex
				]);
			}
		}

		this.grid._RaSeCol[this.cell._cellIndex]=this.cell.parentNode.idd;

		val="Y";
		this.cell.chstate="Y";
	} else {
		val="N";
		this.cell.chstate="N"
	}
	this.cell.setAttribute("excell", "ra");
	this.setCValue("<img src='"+this.grid.imgURL+"radio_chk"+val+".gif' onclick='new eXcell_ra(this.parentNode).changeState(false);'>",
		this.cell.chstate);
}

/*********************************************************
 * dhtmlx grid master_check function
 * 파일명		:	common.js
 * 설 명		:	그리드 master_checkbox check시 생기는 이벤트
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/

dhtmlXGridObject.prototype._in_header_master_checkbox=function(t,i,c){
	t.innerHTML=c[0]+"<input type='checkbox' />"+c[1];
	var self=this;
	t.getElementsByTagName("input")[0].onclick=function(e){
		self._build_m_order();
		var j=self._m_order?self._m_order[i]:i;
		var val=this.checked?1:0;
		self.forEachRow(function(id){
			var c=this.cells(id,j);
			if (c.isCheckbox()) {
				c.setValue(val);
				c.cell.wasChanged = true;
			}
			this.callEvent("onEditCell",[1,id,j,val]);
			this.callEvent("onCheckbox", [id, j, val]);
		});
		(e||event).cancelBubble=true;
	};
};


/*********************************************************
 * cut function
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/
	String.prototype.cut = function(len) {
    var str = this;
    var l = 0;

    for (var i=0; i<str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0,i) ;
    }
    return str;
};

/*********************************************************
 * bytes function
 * 파일명		:	common.js
 * 설 명		:
 * 매개변수		:
 * 작성일		:
 * 비고			:

 *********************************************************/
	String.prototype.bytes = function() {
    var msg = this;
    var cnt = 0;

    for( var i=0; i< msg.length; i++)
    	 cnt += (msg.charCodeAt(i) > 128 ) ?2 : 1;
    return cnt;
   };
   /*********************************************************
    * maxLenCheck function
    * 파일명		:	common.js
    * 설 명		:
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function maxLenCheck(divId, textAreaId, maxLen){

	var inputLength = $("#"+textAreaId).val().bytes();
	$("#"+divId).html("("+inputLength+"/"+maxLen+")byte");
    $("#"+textAreaId).keyup(function(){
	var length = $(this).val().bytes();
	$('#'+divId).html("("+length+"/"+maxLen+")byte");
	if(length>maxLen){
		dhtmlx.alert({title:"확인", type:"alert-error", text:"해당 내용은 "+maxLen+"byte를 넘을 수 없습니다."});
		$("#"+textAreaId).val($("#"+textAreaId).val().cut(maxLen));
	}
	return;
    });
}


   /*********************************************************
    * registerButton function
    * 파일명		:	common.js
    * 설 명		:	화면 버튼과 DB 버튼을 비교하여 최신값으로 맞춤
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function registerButton(context,data,group_cd,menu_id){

	   var length = data.length;
	   var btnArr = [];
	   var compare = ajaxSync(context+"/cmm/selectPreviousAuth","menu_id="+menu_id);

	   for(var i = 0; i < length; i++){
		   data[i].forEachItem(function(itemId){
			   var obj;
			   obj = {
						menu_id : menu_id,
						cont_id : data[i].cont.id, // div ID
						action_id : itemId, // item ID
						action_nm : data[i].getItemText(itemId),
						status : "Y",
						flag   : "I",
						group_cd : group_cd
					  };

				btnArr.push(obj);
		   });
	   }

		var lenCompare = compare.data.length;
		var lenBtn = btnArr.length;

		for ( var i = 0; i < lenCompare; i++) {
			for ( var j = 0; j < lenBtn; j++) {
				if(compare.data[i].action_id == btnArr[j].action_id && compare.data[i].cont_id == btnArr[j].cont_id && compare.data[i].menu_id == btnArr[j].menu_id){
					compare.data[i].status = "Y";
					compare.data[i].group_cd = group_cd;
					btnArr[j].flag = "U";
				}
			}
		}

		for ( var i = 0; i < lenBtn; i++) {
			if(btnArr[i].flag == "I"){
				compare.data.push(btnArr[i]);
			}
		}

		var param = "param="+JSON.stringify(compare.data);
		
		ajaxSync(context+"/cmm/registerButton",param);
   }



   /*********************************************************
    * showOrHide function
    * 파일명		:	common.js
    * 설 명		:	권한에 따른 버튼의 show / hide
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function authButton(context,data,group_cd,menu_id){
	    var length = data.length;
	    var param = "group_cd="+group_cd+"&menu_id="+menu_id;
		var actionList = ajaxSync(context+"/cmm/selectButtonAction", param);

		var actionListlength = actionList.data.length;

		for(var i = 0; i < length; i++){
			data[i].forEachItem(function(itemId){
				for(var j = 0; j < actionListlength; j++){
					if(actionList.data[j].cont_id == data[i].cont.id && actionList.data[j].action_id == itemId ){
						if(actionList.data[j].auth_status != null && actionList.data[j].auth_status == "Y"){
							data[i].showItem(itemId);
						}else{
							data[i].hideItem(itemId);
						}
					}
				}
			});
			var count = 0;
			data[i].forEachItem(function(itemId){
				count++;
				if(!data[i].isVisible(itemId)){
					count--;
				}
			});

			if(count == 0){
				data[i].cont.style.display = "none";
			}else{
				data[i].cont.style.display = "block";
			}
		}
   }

   /*********************************************************
    *
 	function
    * 파일명		:	common.js
    * 설 명		:	화면 버튼과 DB 버튼을 비교하여 최신값으로 맞추고, 권한에 따라서 툴바 버튼들을 show or hide 실행
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function buttonManager(context,group_cd,menu_id,data){
	   
	   if(group_cd == "ADMIN"){
		   registerButton(context,data,group_cd,menu_id);
	   }
	   authButton(context,data,group_cd,menu_id);
   }



   /*********************************************************
    * changePage function
    * 파일명		:	common.js
    * 설 명		:	페이지 호출시 PROGRAM_ID값 검색 후 param에 추가
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/

   function changePage(contextPath, tabId, url, param) {

	   var tabbar = window.parent.dhxMainTabbar;
	   var urlParam = "&uri=" + url;
	   var menu_id = "";
	   var realprogramId = "";

	   if(url == "/tmm/tmm0311") {
		   menu_id = "&menu_id=tmm0311";
		   //realprogramId = "tmm0311";
	   } else {
		   var obj =  ajaxSync(contextPath+"/cmm/programSelect",urlParam);
		   menu_id = "&menu_id=" + obj.menu_id;
		   //realprogramId = obj.menu_id;
	   }
	   var data = param+menu_id;

	   tabbar.tabs(tabId).attachURL(contextPath+url+"?"+data);
	   //programUseInfoSave(contextPath,realprogramId,url);
	   tabbar.tabs(tabId).setActive();
   }


   /*********************************************************
    * changePage function
    * 파일명		:	common.js
    * 설 명		:	페이지 호출시 PROGRAM_ID값 검색 후 param에 추가
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/

   function programUseInfoSave(contextPath,id, url) {
	  var params = "PROGRAM_UID="+id +
	  		"&MENU_URL="+url;

	 var obj =  ajaxSync(contextPath+"/cmm/programuseinfosave",params);

   }
   
   /*********************************************************
    * isNull function
    * 파일명		:	common.js
    * 설 명		:	javascript null값을 체크
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function isNull(obj){
	   return (typeof obj != "undefined" && obj != null && obj != "") ? false : true;
   }
   
   /*********************************************************
    * getPagingCnt function
    * 파일명		:	common.js
    * 설 명		:	javascript pagingCnt 설정값을 get
    * 매개변수		:
    * 작성일		:
    * 비고			:

    *********************************************************/
   function getPagingCnt(obj){
	   var temp = "";
	   if(obj.frameElement != null){
		   temp = getPagingCnt(obj.parent);
	   }else{
		   return obj.pagingCnt;
	   }
	   return temp;
   }





