var express=require('express')
var superagent=require('superagent')
var app=express()
var cnode='http://cnodejs.org'
superagent.get(cnode)
.end(function(err,res){
    if(err)throw err
    var str=res.text.match(/<img\ssrc="http.*/gi)
    str=str.map(function(url,index){
        return url+'/>'
    })
    app.get('/',function(req,res){
        res.setHeader('Access-Control-Allow-Origin','*')
        res.end(JSON.stringify(str))
    }).listen(8080)
})
