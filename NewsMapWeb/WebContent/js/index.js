var heatmapPostive = [];
var heatmapNegative = [];
var articleIndex = 0;
var latLng = [];
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
	
	if(articleCount > 0 || articleCount === -1){
		//alert(category+" - "+sentiment+" - "+ dateRange+" - "+articleCount+" - "+searchTerm);	
	}		
	
	// TODO: get articles from the DB / flip values
    var articles = 
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
	   }];
    
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
    			weight = 20 * article.averageSentiment;
    		}else{
    			weight = 50 * article.averageSentiment;
    		}
    		posPoints.push({
                location: new google.maps.LatLng(latlng[0], latlng[1]),
                weight: weight
            });	
    	}
    	
    	// Negative
    	if(article.averageSentiment < 2){
    		if(article.averageSentiment >= 1){
    			weight = 20 * (4 - article.averageSentiment);
    		}else{
    			weight = 50 * (4 - article.averageSentiment);
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
        latLng = e.latLng;
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
