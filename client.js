var ELECTRON = true;
var convert, Excel;
try{
	convert = require('./utility').convert;
	Excel = require('exceljs');
}
catch(err){
	ELECTRON = false;
}
var dragged_file_object;
let wb = new Excel.Workbook();
function dropHandler(ev) {
	console.log('File(s) dropped');
	
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
	file = ev.dataTransfer.items[0].getAsFile();
	dragged_file_object = file;
	var file_notice;
	if(file.path){
		file_notice = file.path;		
		if(file_notice.search('xlsx') < 0){
			alert("not excel file");
			return;
		}		
	}
	else{
		file_notice = file.name;
	}
	ev.target.innerHTML = file_notice;
	if(ELECTRON){ // pop up sheet name
		wb.xlsx.readFile(file_notice).then(
			reset_sheet_selection
		);				
	}
}
function reset_sheet_selection(){
	var sheet_select = document.getElementById('sheet');
	sheet_select.innerHTML = '<option value="0">--Sheet--</option>'
	wb.eachSheet(function(worksheet,sheetId){
		var node = document.createElement("option");
		node.innerHTML = worksheet.name;
		node.setAttribute('value', sheetId);
		sheet_select.appendChild(node);
	})
}
function dragOverHandler(ev){
	ev.preventDefault();
}
function submit(){
	if(ELECTRON == false){
		return;
	}
	if(dragged_file_object == undefined){
		alert("no excel file chosen");
		return;
	}
	var sheet = document.getElementById("sheet");
	var sheet_num = parseInt(sheet.selectedOptions[0].value);
	if(isNaN(sheet_num)){
		sheet_num = 1;
	}
	var column = document.getElementById("column");
	var column_num = parseInt(column.value);
	if(isNaN(column_num)){
		column_num = 6;
	}
	var len = document.getElementById("len");
	var len_num = parseInt(len.selectedOptions[0].value);
	if(len_num == 0){
		alert("no length specified");
		return;
	}
	if(ELECTRON){
		var rv = convert_sheet(wb, file_full_path, sheet_num, column_num, len_num);
		if(rv){
			alert("convert successfully");
		}
	}
}
