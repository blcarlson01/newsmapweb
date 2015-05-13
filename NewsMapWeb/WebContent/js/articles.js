/**
 * List View
 */

$(document).ready(initialize);

function initialize()
{
	$("#bothSentiment").addClass("active");
	$("#allNews").addClass("active");
	$("#pac-input").val("");
	setDateRangeInformation();
	//displayArticles(selectedNewsCategory,selectedSentiment,selectedDateRange, -1,"");	
}

function displayArticles() {
/*	$.ajax({
		  url: "articleList.jsp",
		  method: "POST",
		  data: 
		  {
			  //artileId: might need 
			  latLng : latlng,
			  radius : 3 //TODO: user defined radus plus a default
		  },
		  dataType: "json"
		}).done(function( data ) {
			getRetrievedArticles(data);
		}).fail(function( jqXHR, textStatus, errorThrown ){
			alert(jqXHR + " - " + textStatus);
		});
}

function getRetrievedArticles(articles){*/
	// only 1 article is retrieved from the collection per call
	// taking into consideration the user may not look are more than one
	// then move to another location
	// Longitude: -74.008680
	// Latitude: 40.711676
	// Radius: 1 mile
	var articles = 
		[{
			"pk":634280,
			"date": "2015-04-25T06:09:45.315Z",
			"provider": "Reuters",
			"cluster_url": "http://google.com/HERE", 
			"summary" : "MOSCOW (Reuters) - Russian authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya",
			"title": "Two charged with Nemtsov killing include Chechen officer: report", 
			"location": ["Moscow", 55.7522200, 37.6155600], 
			"article_url": "http://feeds.reuters.com/~r/Reuters/worldNews/~3/zXpgDIDSlYA/story01.htm",
			"importance": 3445,
			"image_url": "http://s2.reutersmedia.net/resources/r/?m=02&d=20150308&t=2&i=1030534711&w=580&fh=&fw=&ll=&pl=&r=LYNXMPEB27083",
			"author": "John Smith",
			"category": "WorldNews",
			"sentiment" :{
				"average" : 1.1234,
				"longestSentence" : 1,
				"summary" : 1
			},
			"keywords" : [ "worda", "wordb", "wordc"]
		},
		{
			"pk":634281,
			"date": "2015-04-25T06:09:45.315Z",
			"provider": "Reuters",
			"cluster_url": "http://google.com/HERE", 
			"summary" : "PARIS (Reuters) - Paris authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya",
			"title": "Two charged with Nemtsov killing include Chechen officer: report", 
			"location": ["Paris",48.8534100,2.3488000], 
			"article_url": "http://feeds.reuters.com/~r/Reuters/worldNews/~3/zXpgDIDSlYA/story01.htm",
			"importance": 3445,
			"image_url": "http://s2.reutersmedia.net/resources/r/?m=02&d=20150308&t=2&i=1030534711&w=580&fh=&fw=&ll=&pl=&r=LYNXMPEB27083",
			"author": "John Smith",
			"category": "WorldNews",
			"sentiment" :{
				"average" : 4,
				"longestSentence" : 4,
				"summary" : 4
			},
			"keywords" : [ "worda", "wordb", "wordc"]
		}
		
		];
	
		closeWindow($("#about-window"));
      if (articles.length === 0) {
          closeWindow($("#article-window"));
          closeinfobar();
          return;
      }               
       
      var article = articles[0];
      var articleDate = new Date(article.date);
      var articleFormatDate =(articleDate.getMonth() + 1) + '/' + articleDate.getDate() + '/' +  articleDate.getFullYear();
      if (articleIndex === 0) {
          $(".country").text(article.location[0].toUpperCase() + " " + articleFormatDate);
      }
      
      viewinfobar();        
      if (articleIndex == 0){
         	$("#prev-article").hide();
      }      	           
      else{
         	$("#prev-article").show();
      }	
      
      if(articles.length <= 1){
      	$("#prev-article").hide();
      	$("#next-article").hide();
      }      
      
      var sentimentText = [ "Very Negative","Negative","Neutral", "Positive", "Very Positive"];
      
      $("#article-category").text(article.category + " | " + articleFormatDate);
      $("#article-author").text(article.provider + " | "+ article.author);
      $("#article-sentiment").text("Sentiment: " + sentimentText[Math.round(article.sentiment.average)]);
      $("#article-image").attr("src", article.image_url);
      $("#article-summary").text(article.summary);
      $("#article-title").text(article.title);
      $("#article-title").attr("href", article.article_url);
      $("#article-keywords").text(article.keywords);
      $("#cluster-link").attr("href", article.cluster_url);
      $('#share-bar').empty();
      $('#share-bar').share({
          networks: ['facebook','googleplus','twitter','email'],
          theme: 'square'
      });
}

$("#listView").click(function(){
	window.location.href = "index.jsp";
});

Date.prototype.getWeek = function(start)
{
    //Calcing the starting point
    start = start || 0;
    var today = new Date(this.setHours(0, 0, 0, 0));
    var day = today.getDay() - start;
    var date = today.getDate() - day;

    // Grabbing Start/End Dates
    var StartDate = new Date(today.setDate(date));
    var EndDate = new Date(today.setDate(date + 6));
    return [StartDate, EndDate];
}

function setDateRangeInformation(){
	var date = new Date();
	var dates = new Date().getWeek();
	
	// Current Date	
	$("#todayRange").addClass("active");
	var dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
	$("#todayRange").attr("title", dateString);	
	$("#currentDateRange").append(" "+dateString);
	
	// Current Week		
	$("#weekRange").attr("title", dates[0].toLocaleDateString() + ' to '+ dates[1].toLocaleDateString());
	
	// Current Month
	$("#monthRange").attr("title", (date.getMonth() + 1) + '/' +  date.getFullYear());
	
	// Current Year
	$("#yearRange").attr("title", date.getFullYear());
}