var eventproxy=require('eventproxy')
var express=require('express')
var cheerio=require('cheerio')
var superagent=require('superagent')
var url=require('url')
var cnodeurl="https://cnodejs.org"  
 superagent.get(cnodeurl,function(err,res){
    if(err){
        throw err
    } 
    var topicUrls=[]
    var $=cheerio.load(res.text)
    $('#topic_list .topic_title').each(function(idx,element){
        var $element=$(element)
        var href=url.resolve(cnodeurl,$element.attr('href'))
        topicUrls.push(href)
    })
    console.log(topicUrls)
    var ep=new eventproxy()
    ep.after('topic_html',topicUrls.length,function(topics){
        var topics=topics.map(function(topic){
            var url=topic[0]
          var html=topic[1]
          var $=cheerio.load(html)
          return ({
             title:$('.topic_full_title').text().trim(),
             href:url,
             content:$('.reply_content').eq(0).text().trim()
          })
      })    
      console.log('success')
      console.log(topics) 
   
    })
    topicUrls.forEach(function(item,){
        superagent.get(item,function(err,res){
            console.log(item+'success')
            ep.emit('topic_html',[item,res.text])
        })
    })
 })