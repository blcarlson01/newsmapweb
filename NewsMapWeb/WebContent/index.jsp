<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NewsMap</title>
<link rel="icon" type="image/png" href="images/favicon.ico">
<link href="http://fonts.googleapis.com/css?family=Raleway:100,500"
	rel="stylesheet" type="text/css">
<link rel="stylesheet" href="css/index.css" />
<link rel="stylesheet" href="css/ext/jquery.share.css" />
<link rel="stylesheet" href="css/ext/jBox.css" />
</head>
<body>
	<header>
		<div class="nav-constrained">
			<div class="title">
				<a href="/NewsMapWeb"><span id="thick">NewsMap</span><img
					class="logo" src="images/newsmaplogo2.png"></a>
			</div>
			<ul class="nav nav-right">
				<li id="listView">List View</li>
				<li id="about">About</li>
			</ul>
		</div>
	</header>
	<div id="sidebar">
		<div class="section">
			<div class="toggle-triangle carat up-carat"></div>
			<div class="title">News Heatmap</div>
		</div>
		<div style="display: block;" class="content">
			<div style="padding-top: 0; height: auto" class="section"
				id="sidebarContent">
				<input id="pac-input" class="select-search" type="text"
					placeholder="Search News Articles"> News Categories
				<ul class="sidebar-select">
					<li id="allNews">All (<span id="allNewsCount">1000</span>)</li>
					<li id="worldNews">World News (<span id="worldNewsCount">734</span>)</li>
					<li id="usNews">US News (<span id="usNewsCount">266</span>)</li>
					<li id="usPolitics">US Politics (<span id="usPoliticsCount">154</span>)</li>
					<li id="environment">Environment (<span id="environmentCount">32</span>)</li>
					<li id="businessNews">Business News (<span id="businessNewsCount">96</span>)</li>
					<li id="globalMarketsNews">Global Markets News (<span id="globalMarketsNewsCount">43</span>)</li>
					<li id="usMarkets">US Markets (<span id="usMarketsCount">124</span>)</li>
				</ul>
				<div id="categoryDiv">Article Sentiment</div>				
				<ul class="sidebar-select-sentiment">
					<li id="bothSentiment">Both</li>
					<li id="postiveSentiment">Positive</li>
					<li id="negativeSentiment">Negative</li>
				</ul>
				<div id="displayGradient"></div>
				<div id="dateRangeDiv">Date Range: <span id="currentDateRange"></span> </div>
				<ul class="sidebar-select-date">
					<li id="todayRange">Today</li>
					<li id="weekRange">Week</li>
					<li id="monthRange">Month</li>
					<li id="yearRange">Year</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="map-container">
		<div id="map-canvas"></div>
	</div>
	<div id="infobar">
		<h2>
			NEWS NEAR <span class="country"></span>
		</h2>
	</div>
	<div class="popup-window theme-background is-closed"
		id="article-window">
		<img class="button" id="article-close" src="images/close.png"> <span
			class="article-details-small" id="article-category"></span> <span
			id="share-bar"></span>
		<div>
			<a id="article-title"></a>
		</div>
		<span class="article-details-small" id="article-author"></span> <span
			class="article-sentiment"><a id="article-sentiment" href="#"
			data-toggle="tooltip" data-placement="top"></a></span>
		<div id="article">
			<img id="article-image" />
			<p id="article-summary"></p>
		</div>
		<div class="article-keywords">
			Keywords: <span id="article-keywords"></span>
		</div>
		<a id="cluster-link">All related articles</a>
		<div class="nav-right">
			<img src="images/back.png" class="button" id="prev-article"> <img
				src="images/next.png" class="button" id="next-article">
		</div>
	</div>

	<div class="popup-window theme-background is-closed" id="about-window">
		<img class="button" id="about-close" src="images/close.png">
		<h4>NewsMap Version 1.0</h4>
		<p>Click on a hotspot to view news in that area.</p>
		<h4>Group Members</h4>
		<p>Brandon Carlson (blcrlsn2)</p>		
		<p>Thomas Hennessey (thennes2)</p>		
		<p>Kim Phan (kimphan2)</p>
	</div>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
	<script type="text/javascript"
		src="https://maps.googleapis.com/maps/api/js?libraries=visualization"></script>
	<script src="js/external/jquery-2.1.3.min.js"></script>
	<script src="js/external/jquery.share.js"></script>
	<script src="js/external/jBox.min.js"></script>
	<script src="js/external/jquery-ui.min.js"></script>
	<script src="js/index.js"></script>
</body>
</html>