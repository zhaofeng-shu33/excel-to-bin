const fs = require('fs');
const path = require('path');
const Excel = require('exceljs');
const deasync = require('deasync');
// return True if convert successfully, otherwise return False
function convert(file_full_path, num_of_sheet, column_num, array_len){
    //todo: check file extension
    let wb = new Excel.Workbook();
    wb.xlsx.readFile(file_full_path).then(
        function(){

        })
    let data = fs.readFileSync(file_full_path);
    // parse write file name
    let file_name = path.basename(file_full_path);
    let write_file_name = file_name.split('.')[0] + '.bin';
    let write_file_full_path = path.join(path.dirname(file_full_path), write_file_name);
    return convert_inner(data, write_file_full_path, num_of_sheet, column_num, array_len);     
} 

function convert_inner(data, file_full_path, num_of_sheet, column_num, array_len){
    //todo: get converted_data
    let converted_data = data;
    
    fs.writeFileSync(file_full_path, converted_data);
}
module.exports.convert = convert;