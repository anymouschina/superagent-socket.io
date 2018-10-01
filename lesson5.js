var eventproxy=require('eventproxy')
var superagent=require('superagent')
var cheerio=require('cheerio')
var url=require('url')
var async=require('async')
var cnode="https://cnodejs.org"
 var concurrencyCount=0
    var fetchUrl=function(url,callback){
    var delay = parseInt((Math.random() * 10000000) % 2000, 10)
     concurrencyCount++
     console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒')
     setTimeout(function(){
         concurrencyCount--
         callback(null,url)
     },delay)
  }
 superagent.get(cnode)
  .end(function(err,res){
      if(err)throw err
      var topics=[]
      var $=cheerio.load(res.text)
      $('#topic_list .topic_title').each(function(index,element){
        var $element=$(element)
        topics.push(url.resolve(cnode,$element.attr('href')))
        })
        console.log(topics);
        var i=0
       async.mapLimit(topics,5,function(url,callback){
           fetchUrl(url,callback)
           console.log(i)
           i++
       },function(err,result){
       console.log('final:')
       console.log(result)
       })
      })
 