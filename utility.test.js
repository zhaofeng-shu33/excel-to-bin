const convert = require('./utility').convert;
const fs = require('fs');
test('test_convert', ()=>{
    convert('testdata/book.xlsx', 1, 1, 2).then(
        function(rv){
            expect(rv).toBe(true);
            let converted_data = fs.readFileSync('testdata/book-1-1-2.bin');
            expect(JSON.stringify(Buffer.from([1,3]))).toBe(JSON.stringify(converted_data));
        });
});
test('test_convert_with_merged_cell', ()=>{
    convert('testdata/book.xlsx', 1, 2, 3).then(
        function(rv){
            expect(rv).toBe(true);
            let converted_data = fs.readFileSync('testdata/book-1-2-3.bin');
            expect(JSON.stringify(Buffer.from([2,133,255]))).toBe(JSON.stringify(converted_data));
        });
});
