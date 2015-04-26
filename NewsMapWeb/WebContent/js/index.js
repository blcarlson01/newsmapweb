var heatmap = [];
var articleIndex = 0;
var latLng = [];
var map = [];
var new_heatmap = [];

$(document).ready(initialize);

// TODO: review setting a default date or date range here
function initialize()
{
	displayMap();
	displayArticles();
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
function displayArticles(){
	// TODO: get articles from the DB
	var articles = 
		[{
		     "pk":634280,
	         "location":["Moscow", 55.7522200, 37.6155600],
		     "importance":3445		      
		   },
		   {
			   "pk":634281,
			   "location":["Paris",48.8534100,2.3488000],
			   "importance":1000	
		   }];
    
    if (articles.length === 0) {
        window.alert("Sorry, we don't have any data for this date.");
        return;
    }
    
    var points = [];
    for (var i in articles) {
        latlng = articles[i].location.slice(1, 3);
        points.push({
            location: new google.maps.LatLng(latlng[0], latlng[1]),
            weight: Math.pow(articles[i].importance, 0.4 )
        });
    }

    timelapse(new google.maps.MVCArray(points));    
}

//Uses Google Maps
function displayMap()
{
	var mapOptions = {
		center: new google.maps.LatLng(30, 0),
	    zoom: 3,
	    minZoom: 3,
	    maxZoom: 4,
	    // disableDefaultUI: true
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

//Map Style
//TODO: change color based on sentiment
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
 heatmap = new google.maps.visualization.HeatmapLayer();
 heatmap.setMap(e);
 heatmap.set("opacity", 0.80);
 heatmap.set("radius", 40);
 var grad = ["rgba(72, 190, 226, 0)",
             "rgba(72, 190, 226, 1)", 
             "rgb(100, 203, 230)",
             "rgb(138, 217, 233)", 
             "rgb(169, 227, 236)",
             "rgb(202, 232, 237)",
             "rgb(212, 231, 234)",
             "rgba(255, 255, 255, 1)"];
 heatmap.set("gradient", grad);
 new_heatmap = new google.maps.visualization.HeatmapLayer();
 new_heatmap.setMap(e);
 new_heatmap.set("opacity", 0.80);
 new_heatmap.set("radius", 40);
 new_heatmap.set("gradient", grad);
}


function getArticle() {
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
		}];
		
		closeWindow($("#about-window"));
        if (articles.length === 0) {
            closeWindow($("#article-window"));
            closeinfobar();
            return;
        }               
         
        var article = articles[0];
        if (articleIndex === 0) {
            $(".country").text(article.location[0].toUpperCase() + " " + article.date.replace(/-/g, "/").toUpperCase());
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
        
        $("#article-category").text(article.category + " | " + article.date);
        $("#article-author").text(article.provider + " | "+ article.author);
        $("#article-sentiment").text("Sentiment: " + sentimentText[Math.round(article.sentiment.average)]);
        $("#article-image").attr("src", article.image_url);
        $("#article-summary").text(article.summary);
        $("#article-title").text(article.title);
        $("#article-title").attr("href", article.article_url);
        $("#article-keywords").text(article.keywords);
        $("#cluster-link").attr("href", article.cluster_url);
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

// TODO: review usefulness Interest time lapse
function timelapse(e) {
    new_heatmap.set("opacity", 0);
    new_heatmap.setData(e);
    heatmap.set("opacity", 0.8);
    var t = 0;
    var n = 0.8;
    var r = setInterval(function() {
        t += 0.01;
        n -= 0.01;
        new_heatmap.set("opacity", t);
        heatmap.set("opacity", n);
        if (t >= 0.8) {
            heatmap.setData(e);
            setTimeout(function() {
                heatmap.set("opacity", 0.8);
                new_heatmap.set("opacity", 0);
                new_heatmap.setData([]);
                clearInterval(r);
            }, 50);
        }
    }, 10);
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
