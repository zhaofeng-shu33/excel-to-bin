const convert = require('./utility').convert;
test('test_convert', ()=>{
    convert('testdata/book.xlsx', 1, 1, 2).then(
        function(rv){
            expect(rv).toBe(true);
        });
});
