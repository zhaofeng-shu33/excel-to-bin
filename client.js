function submit(){
	var file = document.getElementById("file");
	var first_file = file.files[0];
	if(first_file == undefined){
		alert("no excel file chosen");
		return;
	}
    var file_full_path = file.files[0].path;
	var sheet = document.getElementById("sheet");
	var sheet_num = parseInt(sheet.value);
	var column = document.getElementById("column");
	var column_num = parseInt(column.value);
	var len = document.getElementById("len");
	var len_num = parseInt(len.selectedOptions[0].value);
	if(len_num == 0){
		alert("no length specified");
		return;
	}
    // process communication
	const { ipcRenderer } = require('electron');
	var return_value = ipcRenderer.sendSync('convert', 
		file_full_path, sheet_num, column_num, len_num); 
	console.log(return_value);
}