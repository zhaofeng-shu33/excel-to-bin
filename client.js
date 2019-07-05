var ELECTRON = true;
try{
	convert = require('./utility').convert;
}
catch(err){
	ELECTRON = false;
}
var dragged_file_object;
function dropHandler(ev) {
	console.log('File(s) dropped');
	
	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
	file = ev.dataTransfer.items[0].getAsFile();
	dragged_file_object = file;
	var file_notice;
	if(file.path){
		file_notice = file.path;		
	}
	else{
		file_notice = file.name;
	}
	ev.target.innerHTML = file_notice;
	if(ELECTRON){
		
	}
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
	var file_full_path = dragged_file_object.path;
	if(file_full_path.search('xlsx') < 0){
		alert("not excel file");
	}
	var sheet = document.getElementById("sheet");
	var sheet_num = parseInt(sheet.value);
	if(isNaN(sheet_num)){
		sheet_num = 1;
	}
	var column = document.getElementById("column");
	var column_num = parseInt(column.value);
	if(isNaN(column_num)){
		column_num = 1;
	}
	var len = document.getElementById("len");
	var len_num = parseInt(len.selectedOptions[0].value);
	if(len_num == 0){
		alert("no length specified");
		return;
	}
	if(ELECTRON){
		convert(file_full_path, sheet_num, column_num, len_num).then(
			function(resolve_val){
				alert("convert successfully");
			});		
	}
}
