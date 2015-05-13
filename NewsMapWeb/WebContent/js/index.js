var heatmapPostive = [];
var heatmapNegative = [];
var articleIndex = 0;
var latlng = [];
var map = [];
var new_heatmapPostive = [];
var new_heatmapNegative = [];

$(document).ready(initialize);
/*
$(function() {
    $( "#sidebar" ).draggable();
  });
*/

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

// TODO: review setting a default date or date range here
function initialize()
{
	$("#bothSentiment").addClass("active");
	$("#allNews").addClass("active");
	$("#pac-input").val("");
	setDateRangeInformation();
	displayMap();
	displayArticles(selectedNewsCategory,selectedSentiment,selectedDateRange, -1,"");	
}

//News Category Click Event
var selectedNewsCategory = "allNews";
var selectedNewsArticleCount = 0;
$(".sidebar-select li").click(function(){
	$(".sidebar-select li").removeClass('active');	
	$(this).addClass('active');
	selectedNewsCategory = $(this).attr('id'); 
	selectedNewsArticleCount = $("#"+selectedNewsCategory+"Count").text();
	displayArticles(selectedNewsCategory, selectedSentiment,selectedDateRange,selectedNewsArticleCount, searchTerm);
});

//Article Sentiment Event
var selectedSentiment = "both";
$(".sidebar-select-sentiment li").click(function(){
	$(".sidebar-select-sentiment li").removeClass('active');	
	$(this).addClass('active');
	selectedSentiment = $(this).attr('id'); 
	displayArticles(selectedNewsCategory, selectedSentiment,selectedDateRange,selectedNewsArticleCount, searchTerm);
});

// Select Date Range Event
var todaysDate = new Date();
var selectedDateRange = new Date(todaysDate.setHours(0, 0, 0, 0));
$(".sidebar-select-date li").click(function(){
	$(".sidebar-select-date li").removeClass('active');	
	$(this).addClass('active');
	selectedDateRange = $(this).attr('id');
	var date = new Date();
	var dates = new Date().getWeek();
	switch (selectedDateRange) {
    case "todayRange":
    	var dateString = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
    	selectedDateRange = dateString;
        break;
    case "weekRange":	
    	selectedDateRange = dates[0].toLocaleDateString() + ' to '+ dates[1].toLocaleDateString();
        break;
    case "monthRange":    	   
    	selectedDateRange = (date.getMonth() + 1) + '/' +  date.getFullYear();
        break;
    case "yearRange":    	    
    	selectedDateRange = date.getFullYear();
        break;  
	}
		
	displayArticles(selectedNewsCategory, selectedSentiment,selectedDateRange, selectedNewsArticleCount, searchTerm);
});

// Search Box Event
var searchTerm = "";
$("#pac-input").keypress(function(e) {
    if(e.which == 13) {
    	searchTerm =  $("#pac-input").val();
        displayArticles(selectedNewsCategory, selectedSentiment,selectedDateRange, selectedNewsArticleCount, searchTerm);
    }
});

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

// Functionality for the popup box
$("#next-article").click(function(e) {
    e.preventDefault();
    articleIndex += 1;
    getArticle();
});
$("#prev-article").click(function(e) {
    e.preventDefault();
    articleIndex -= 1;
    getArticle();
});
$("#article-close").click(function() {
    articleIndex = 0;
    closeWindow($("#article-window"));
    closeinfobar();
});

// About Box for Group Info
$("#about-close").click(function() {
    closeWindow($("#about-window"));
});
$("#about").click(function() {
    displayAboutWindow();
});

function displayAboutWindow() {
    closeWindow($("#article-window"));
    openWindow($("#about-window"));
}

function openWindow(e) {
    if (e.hasClass("is-closed")) {
        e.slideDown({
            duration: 100,
            queue: false
        });
        e.animate({
            opacity: "1.0"
        }, {
            duration: 250,
            queue: false
        });
        e.addClass("is-open");
    }                
}

function closeWindow(e) {	 
    if (e.hasClass("is-open")) {
        e.slideUp({
            duration: 100,
            queue: false
        });
        e.animate({
            opacity: "0.0"
        }, {
            duration: 100,
            queue: false
        });
        e.addClass("is-closed");
    }     
}

// Get Article Information
// TODO: change for how we do articles
function displayArticles(category, sentiment, dateRange, articleCount, searchTerm){
	var articles = [];
	if(articleCount > 0 || articleCount === -1){
		//alert(category+" - "+sentiment+" - "+ dateRange+" - "+articleCount+" - "+searchTerm);			
		//displayRetrievedArticles();
		$.ajax({
			  url: "articlesLocation.jsp",
			  method: "POST",
			  data: 
			  {
				  category : category,
				  sentiment : sentiment,
				  dateRange : dateRange,
				  searchTerm : searchTerm
			  },
			  dataType: "json"
			}).done(function( data ) {
				displayRetrievedArticles(data);
			}).fail(function( jqXHR, textStatus, errorThrown ){
				alert(jqXHR + " - " + textStatus);
			}); 
	}		
}

function displayRetrievedArticles(articles){ 
// TODO: get articles from the DB / flip values
  /*  var articles = 
    	[  {
		     "pk":634280,
	         "location":["Dublin", 53.3330600, -6.2488900],
		     "averageSentiment":2	      
	   },
	   {
		     "pk":634280,
	         "location":["Rome", 41.8919300 , 12.5113300],
		     "averageSentiment":3.15 // positive		      
	   },		   
	   {
		   "pk":634281,
		   "location":["Paris",48.8534100,2.3488000],
		   "averageSentiment":4 //very positive	
	   },
	   {
	     "pk":634280,
        "location":["Moscow", 55.7522200, 37.6155600],
	     "averageSentiment": 0 //very negative	       
	   },
	   {
		     "pk":634280,
	         "location":["London", 51.5085300, -0.1257400],
		     "averageSentiment": 1 // negative		      
	   },
	   {
		     "pk":634280,
	         "location":["Dublin", 53.3330600, -6.2488900],
		     "averageSentiment": 2 // netrual	      
	   }]; */
    
    if (articles.length === 0) {
        window.alert("Sorry, we don't have any data for this date.");
        return;
    }
    
    var negPoints = [];
    var posPoints = [];
    for (var i in articles) {
    	var article = articles[i];
    	var weight = 5;
    	latlng = articles[i].location.slice(1, 3);    	
    	// Postive (Neutral is added to both)
    	if(article.averageSentiment > 2){
    		if(article.averageSentiment <= 3){
    			weight =  article.averageSentiment;
    		}else{
    			weight =  article.averageSentiment;
    		}
    		posPoints.push({
                location: new google.maps.LatLng(latlng[0], latlng[1]),
                weight: weight
            });	
    	}
    	
    	// Negative
    	if(article.averageSentiment < 2){
    		if(article.averageSentiment >= 1){
    			weight =  (4 - article.averageSentiment);
    		}else{
    			weight =  (4 - article.averageSentiment);
    		}
    			
    		negPoints.push({
                location: new google.maps.LatLng(latlng[0], latlng[1]),
                weight: weight
            });
    	}
    		
    	if(article.averageSentiment == 2){
    		posPoints.push({
                location: new google.maps.LatLng(latlng[0], latlng[1]),
                weight: weight
            });
    		negPoints.push({
                location: new google.maps.LatLng(latlng[0], latlng[1]),
                weight: weight
            });
    	}        
    }          
    
    //var overlay = new NumberMarker(posPoints[0].location, map, 'whatever text or numbers you want here');

    timelapse(new google.maps.MVCArray(posPoints),new google.maps.MVCArray(negPoints));
}

/*  ********* */

function NumberMarker(latlng,  map, value) {
    this.latlng_ = latlng;
        this.value = value;
        /*Do this or nothing will happen:*/
        this.setMap(map);
    }
NumberMarker.prototype = new google.maps.OverlayView();
NumberMarker.prototype.draw = function() {
    var me = this;
    var div = this.div_;
    if (!div) {
        // Create a overlay text DIV
        div = this.div_ = document.createElement('DIV');
        // Create the DIV representing our NumberMarker
        div.style.border = "none";
        div.style.position = "absolute";
        div.style.paddingLeft = "0px";
        div.style.cursor = 'pointer';

        var span = document.createElement("span");
        span.className = "markerOverlay";
        span.appendChild(document.createTextNode(this.value));
        div.appendChild(span);
        google.maps.event.addDomListener(div, "click", function(event) {
        google.maps.event.trigger(me, "click");
    });

    // Then add the overlay to the DOM
    var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }

    // Position the overlay 
    var point = this.getProjection().fromLatLngToDivPixel(this.latlng_);
    if (point) {
      div.style.left = point.x + 'px';
      div.style.top = point.y + 'px';
    }
};
NumberMarker.prototype.remove = function() {
    // Check if the overlay was on the map and needs to be removed.
    if (this.div_) {    
        this.div_.parentNode.removeChild(this.div_);
        this.div_ = null;
    }
};

NumberMarker.prototype.getPosition = function() {
    return this.latlng_;
};

/* ****** */

// Uses Google Maps
function displayMap()
{
	var mapOptions = {
		center: new google.maps.LatLng(30, 0),
	    zoom: 3,	   
	};
	
	// standard map
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        
    google.maps.event.addListener(map, "click", function(e) {
        latlng = e.latLng;
        $("#infobar-list").empty();
        articleIndex = 0;
        getArticle();
    });      
    
    setStyle(map);
}

// Map Style
// TODO: change color based on sentiment
function setStyle(e) {
 var t = [
{
 "featureType": "water",
 "stylers": [
   { "hue": "#00b2ff" },
   { "gamma": 0.78 },
   { "saturation": -84 },
   { "lightness": -75 }
 ]
},{
 "featureType": "landscape.natural",
 "stylers": [
   { "lightness": 20 },
   { "saturation": -77 },
   { "gamma": 0.18 }
 ]
},
{
 "featureType": "administrative",
 "elementType": "geometry.fill",
 "stylers": [
   { "visibility": "off" }
 ]
},{
 "featureType": "water",
 "elementType": "labels",
 "stylers": [
   { "visibility": "off" }
 ]
}
];
 e.setOptions({
     styles: t
 });
 heatmapPostive = new google.maps.visualization.HeatmapLayer();
 heatmapPostive.setMap(e);
 heatmapPostive.set("opacity", 0.80);
 heatmapPostive.set("radius", 20);
 
 heatmapNegative = new google.maps.visualization.HeatmapLayer();
 heatmapNegative.setMap(e);
 heatmapNegative.set("opacity", 0.80);
 heatmapNegative.set("radius", 20);

 //Blue - positive
 var gradient1 = [
 'rgba(0, 255, 255, 0)',
 'rgba(0, 255, 255, 1)',
 'rgba(0, 225, 255, 1)',
 'rgba(0, 200, 255, 1)',
 'rgba(0, 175, 255, 1)',
 'rgba(0, 160, 255, 1)',
 'rgba(0, 145, 223, 1)',
 'rgba(0, 125, 191, 1)',
 'rgba(0, 110, 255, 1)',
 'rgba(0, 100, 255, 1)',
 'rgba(0, 75, 255, 1)',
 'rgba(0, 50, 255, 1)',
 'rgba(0, 25, 255, 1)',
 'rgba(0, 0, 255, 1)'
];
//Red - negative
var gradient2 = [
 'rgba(255, 255, 0, 0)',
 'rgba(255, 255, 0, 1)',
 'rgba(255, 225, 0, 1)',
 'rgba(255, 200, 0, 1)',
 'rgba(255, 175, 0, 1)',
 'rgba(255, 160, 0, 1)',
 'rgba(255, 145, 0, 1)',
 'rgba(255, 125, 0, 1)',
 'rgba(255, 110, 0, 1)',
 'rgba(255, 100, 0, 1)',
 'rgba(255, 75, 0, 1)',
 'rgba(255, 50, 0, 1)',
 'rgba(255, 25, 0, 1)',
 'rgba(255, 0, 0, 1)'
]; 
 
 heatmapPostive.set("gradient", gradient1);
 new_heatmapPostive = new google.maps.visualization.HeatmapLayer();
 new_heatmapPostive.setMap(e);
 new_heatmapPostive.set("opacity", 0.80);
 new_heatmapPostive.set("radius", 20);
 new_heatmapPostive.set("gradient", gradient1);
  
 heatmapNegative.set("gradient", gradient2);
 new_heatmapNegative = new google.maps.visualization.HeatmapLayer();
 new_heatmapNegative.setMap(e);
 new_heatmapNegative.set("opacity", 0.80);
 new_heatmapNegative.set("radius", 20);
 new_heatmapNegative.set("gradient", gradient2);
}

function timelapse(postive, negative) {	
		new_heatmapPostive.set("opacity", 0);
	    new_heatmapPostive.setData(postive);
	    heatmapPostive.set("opacity", 0.8);
	    
	    new_heatmapNegative.set("opacity", 0);
	    new_heatmapNegative.setData(negative);
	    heatmapNegative.set("opacity", 0.8);
	    var t = 0;
	    var n = 0.8;
	    var r = setInterval(function() {
	        t += 0.01;
	        n -= 0.01;
	        new_heatmapPostive.set("opacity", t);
	        heatmapPostive.set("opacity", n);
	        
	        new_heatmapNegative.set("opacity", t);
	        heatmapNegative.set("opacity", n);
	        if (t >= 0.8) {
	            heatmapPostive.setData(postive);
	            
	            heatmapNegative.setData(negative);
	            setTimeout(function() {
	                heatmapPostive.set("opacity", 0.8);
	                new_heatmapPostive.set("opacity", 0);
	                new_heatmapPostive.setData([]);
	                
	                heatmapNegative.set("opacity", 0.8);
	                new_heatmapNegative.set("opacity", 0);
	                new_heatmapNegative.setData([]);
	                clearInterval(r);
	            }, 50);
	        }
	    }, 10);
}

function getArticle() {
	getRetrievedArticles();
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
		}); */
}

function getRetrievedArticles(){
	// only 1 article is retrieved from the collection per call
	// taking into consideration the user may not look are more than one
	// then move to another location
	// Longitude: -74.008680
	// Latitude: 40.711676
	// Radius: 1 mile
	var articles = 
		[{
			"pk":634280,
			"date": "2015-03-08T06:09:45.315Z",
			"provider": "Reuters",
			"cluster_url": "http://google.com/HERE", 
			"summary" : "Russian authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya, according to a law enforcement official.",
			"title": "Two charged with Nemtsov killing include Chechen officer: report", 
			"location": ["Moscow", 55.7522200, 37.6155600], 
			"article_url": "http://feeds.reuters.com/~r/Reuters/worldNews/~3/zXpgDIDSlYA/story01.htm",
			"importance": 3445,
			"image_url": "data:image/jpeg;base64,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",
			"author": "By Katya Golubkova and Jason Bush",
			"category": "WorldNews",
			"sentiment" :{
				"average" : 1.1234,
				"longestSentence" : 1,
				"summary" : 1
			},
			"keywords" : [ "Russia", "Albert Barakhayev", "Anna Fadeyeva", "Anna Politkovskaya", "Anzor Gubashev", "Boris Nemtsov", "Natalia Mushnikova", "Ramzan Kadyrov", "Shagid", "Tatyana Makeyeva", "Vladimir Markin", "Vladimir Putin", "Zaur Dadayev"]
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
        
        var jBoxOptions = {
        	    title: 'Article\'s Sentiment Scores',
        	    content: "Average Score: " + article.sentiment.average 
        	    	+ "<br/>Longest Sentence's Score: " + article.sentiment.longestSentence
        	};
        $("#article-sentiment").jBox('Tooltip',jBoxOptions);
        
        openWindow($("#article-window"));	  
}

function viewinfobar() {
    $("#infobar").slideDown({
        duration: 300,
        queue: false
    });
    $("#infobar").animate({
        opacity: "0.999"
    }, {
        duration: 25,
        queue: false
    });
}

// The info bar shows the "area" you clicked on
function closeinfobar() {
    $("#infobar").slideUp({
        duration: 100,
        queue: false
    });
    $("#infobar").animate({
        opacity: "0.0"
    }, {
        duration: 100,
        queue: false
    });
}

// Handles the show / minimize side bar
$(function(){
		$("#sidebar .title").parent().on("click",function(a){
			$("#sidebar .content").is(":hidden")?($("#sidebar .content").slideDown(100),
			$("#sidebar .toggle-triangle").removeClass("down-carat"),
			$("#sidebar .toggle-triangle").addClass("up-carat")):($("#sidebar .content").slideUp(100),
			$("#sidebar .toggle-triangle").removeClass("up-carat"),$("#sidebar .toggle-triangle").addClass("down-carat"))}
		)});

function toggleSidebar()
{
	$("#sidebar .title").parent().click()	
}700>$(window).width()&&$(function(){toggleSidebar()});

$("#listView").click(function(){
	window.location.href = "articles.jsp";
});
