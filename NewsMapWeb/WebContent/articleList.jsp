<%@page import="com.google.gson.JsonPrimitive"%>
<%@page import="com.google.gson.JsonObject"%>
<%@page import="com.google.gson.JsonArray"%>
<%@page import="com.google.gson.Gson"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
/*
[
   {
      "articleId":"000000",
      "date":"2015-04-25T06:09:45.315Z",
      "provider":"Reuters",
      "cluster_url":"",
      "summary":"MOSCOW (Reuters) - Russian authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya",
      "title":"Two charged with Nemtsov killing include Chechen officer: report",
      "location":{
         "name":"Dublin",
         "lat":53.33306,
         "long":-6.24889
      },
      "url":"http://feeds.reuters.com/~r/Reuters/worldNews/~3/zXpgDIDSlYA/story01.htm",
      "imageUrl":"http://s2.reutersmedia.net/resources/r/?m\u003d02\u0026d\u003d20150308\u0026t\u003d2\u0026i\u003d1030534711\u0026w\u003d580\u0026fh\u003d\u0026fw\u003d\u0026ll\u003d\u0026pl\u003d\u0026r\u003dLYNXMPEB27083",
      "category":"WorldNews",
      "sentiment":{
         "average":1.1234,
         "longestSentence":1,
         "summary":1
      },
      "keywords":[ "worda", "wordb","wordc" ]
   }
]
*/

Gson gson = new Gson();
JsonArray articles = new JsonArray();

//TODO: this is similar to the articlesLocation you would loop through the articles in the database and add each article to the JsonArray
JsonObject article = new JsonObject();
article.addProperty("articleId", "000000");
article.addProperty("date", "2015-04-25T06:09:45.315Z");
article.addProperty("provider", "Reuters");
article.addProperty("cluster_url", "");  // this can stay blank for now
article.addProperty("summary", "MOSCOW (Reuters) - Russian authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya");
article.addProperty("title", "Two charged with Nemtsov killing include Chechen officer: report");

JsonObject locationInfo = new JsonObject();
locationInfo.addProperty("name", "Dublin");
locationInfo.addProperty("lat", 53.3330600);
locationInfo.addProperty("long", -6.2488900);	
article.add("location", locationInfo);

article.addProperty("url", "http://feeds.reuters.com/~r/Reuters/worldNews/~3/zXpgDIDSlYA/story01.htm");
article.addProperty("imageUrl", "http://s2.reutersmedia.net/resources/r/?m=02&d=20150308&t=2&i=1030534711&w=580&fh=&fw=&ll=&pl=&r=LYNXMPEB27083");
article.addProperty("category", "WorldNews");

JsonArray authors = new JsonArray();
JsonObject author = new JsonObject();
author.addProperty("firstName", "John");
author.addProperty("lastName", "Smith");

authors.add(author);

JsonObject sentiment = new JsonObject();
sentiment.addProperty("average", 1.1234);
sentiment.addProperty("longestSentence", 1);
sentiment.addProperty("summary", 1);
article.add("sentiment", sentiment);

JsonArray keywords = new JsonArray();
JsonPrimitive element1 = new JsonPrimitive("worda");
keywords.add(element1);
JsonPrimitive element2 = new JsonPrimitive("wordb");
keywords.add(element2);
JsonPrimitive element3 = new JsonPrimitive("wordc");
keywords.add(element3);
article.add("keywords", keywords);

articles.add(article);

out.println(gson.toJson(articles));
%>