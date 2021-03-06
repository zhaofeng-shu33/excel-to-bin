/**
 * 将 build/docs.json 上传到 oss
 */
const oss = require('ali-oss');
const path = require('path');
const fs = require('fs');
const bucket = 'programmierung';
const accessKeyId = process.env.AccessKeyId;
const accessKeySecret = process.env.AccessKeySecret;

const ossClient = oss({
    bucket,
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    accessKeyId,
    accessKeySecret,
    timeout: '600s'
});
var fromPath = '';
fs.readdirSync('dist').map((name)=>{
    if(name.search('.zip')>0){
        fromPath = name;
    }
})
fromPath = path.join('dist', fromPath);
const toPath = 'excel-to-bin/excel-to-bin-' + process.platform + '.zip';

console.log('start upload oss', fromPath, toPath);

ossClient.put(toPath, fromPath).then((result) => {
    console.log('upload success', result);
});
