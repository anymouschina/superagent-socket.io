var superagent=require('superagent')
var socket=require('socket.io')
var cheerio=require('cheerio')
var http=require('http').Server()
var io=socket(http)
var cnode="http://cnodejs.org"
var topics=[]
superagent.get(cnode,function(err,res){
    if(err)throw err
     Aurl=res.text.match(/<a\s.*>/gi)
     Aurl.forEach(element => {
         if(element.indexOf('topic_title')>0)topics.push(element)
     });
    io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log(msg)
        socket.emit('message',JSON.stringify(topics))
    })
})
})
 
 

http.listen(3000,function(){
    console.log("3000")
})