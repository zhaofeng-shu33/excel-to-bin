const { ipcRenderer } = require('electron');

function submit(){
	var file = document.getElementById("file");
	var first_file = file.files[0];
	if(first_file == undefined){
		alert("no excel file chosen");
		return;
	}
	var file_full_path = file.files[0].path;
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
    // process communication
	// package the messages in json
	var content = {file_full_path, sheet_num, column_num, len_num};
	ipcRenderer.send('convert', content);
}
ipcRenderer.on('convert', (event, resolve_val) => {
	if(resolve_val){
		alert("convert successfully");
	}
})
