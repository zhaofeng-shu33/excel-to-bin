const fs = require('fs');
const path = require('path');
const Buffer=require('buffer').Buffer;

const Excel = require('exceljs');
function convert_sheet(wb, file_full_path, num_of_sheet, column_num, array_len){            
    let sheet = wb.getWorksheet(num_of_sheet);            
    let col = sheet.getColumn(column_num);
    let encounter_merged = false;
    let ls = []
    col.eachCell(function(cell, rowNumber){
        if(cell.isMerged && encounter_merged){
            return;
        }
        else if(cell.isMerged){
            encounter_merged = true;
        }
        else{
            encounter_merged = false;
        }
        ls.push(cell.value);
    })
    ls = ls.slice(1, 1+array_len);
    let data = Buffer.from(ls);
    // parse write file name
    let file_name = path.basename(file_full_path);
    let write_file_name = file_name.split('.')[0] + '-' + String(num_of_sheet) + 
        '-' + String(column_num) + '-' + String(array_len) + '.bin';
    let write_file_full_path = path.join(path.dirname(file_full_path), write_file_name);
    fs.writeFileSync(write_file_full_path, data);
    return true;
}
// return True if convert successfully, otherwise return False
function convert(file_full_path, num_of_sheet, column_num, array_len){
    //todo: check file extension
    let wb = new Excel.Workbook();
    return wb.xlsx.readFile(file_full_path).then(
        () => convert_sheet(wb, file_full_path, num_of_sheet, column_num, array_len)
    );
} 

module.exports.convert = convert;