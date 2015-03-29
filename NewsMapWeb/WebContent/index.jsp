<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NewsMap</title>
<link rel="stylesheet" href="css/index.css" />
</head>
<body>
	<header> NewsMap </header>
	<div id="container">
		<div id="map-canvas"></div>
	</div>
	<div id="sidebar">
		<div class="section">
			<div class="toggle-triangle carat up-carat"></div>
			<div class="title">Global News Heatmap</div>
		</div>
		<div style="display: block;" class="content">
			<div style="padding-top: 0; height: auto" class="section"
				id="sidebarContent">
				<div>
					Search <input>
				</div>
				<ul>
					<li>All</li>
					<li>World</li>
				</ul>
			</div>
		</div>
	</div>
	<section>
		<div class="articlesHeader">World News | Last 30 Days</div>
		<article>
			<h1>
				<a href="" title=""> SAMPLE Fighting and air strikes across
					Yemen</a>
			</h1>
			<div class="articleSummary">
				<div class="sourceInformation">World News | Reuters | Sun Mar
					29, 2015</div>
				<p>generated summary</p>
				<p>
					Individuals: <a href="">Yemeni fighters</a> , President Abd-Rabbu
					Mansour Hadi, ...
				</p>
				<p>Organizations: ... ... ...</p>
				<p>Related Articles: ... ... ...</p>
			</div>
			<div class="articleSentiment">
				<div>Sentiment: Negative</div>
				<div>
					Location: <a href="">Aden</a>
				</div>
				<div>
					Author: <a href="">John Smith</a>
				</div>
			</div>

		</article>

	</section>
	<script type="text/javascript"
		src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
	<script src="js/external/heatmap.min.js"></script>
	<script src="js/external/gmaps-heatmap.js"></script>
	<script src="js/external/jquery-2.1.3.min.js"></script>
	<script src="js/index.js"></script>
</body>
</html>