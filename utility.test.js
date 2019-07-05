const convert = require('./utility').convert;
const fs = require('fs');
test('test_convert', ()=>{
    convert('testdata/book.xlsx', 1, 1, 2).then(
        function(rv){
            expect(rv).toBe(true);
            let converted_data = fs.readFileSync('testdata/book.bin');
            expect(JSON.stringify(converted_data)).toBe(JSON.stringify(Buffer.from([1,3])));
        });
});

