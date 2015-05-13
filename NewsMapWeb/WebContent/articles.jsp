<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NewsMap</title>
<link rel="icon" type="image/png" href="images/favicon.ico">
<link rel="stylesheet" href="css/articles.css" />
<link rel="stylesheet" href="css/listLayout.css" />
</head>
<body>
	<header>
		<div class="nav-constrained">
			<div class="title">
				<a href="/NewsMapWeb"><span id="thick">NewsMap</span><img
					class="logo" src="images/newsmaplogo2.png"></a>
			</div>
			<ul class="nav nav-right">
				<li id="listView">Map</li>
				<li id="about">About</li>
			</ul>
		</div>
	</header>
	<section id="pain-main">
		<section id="main-container">
			<div class="main-content layout-abc">
				<section id="favfeed" class="col-a chk-height"
					data-behavior="fav_feed favorites_mgmt">
					<div id="favfeed_content">
						<h2 class="feed-title favorites">Filters</h2>
						<div style="display: block;" class="favfeed_item">
							<div style="padding-top: 0; height: auto" class="section"
								id="sidebarContent">News Categories
								<ul class="sidebar-select">
									<li id="allNews">All (<span id="allNewsCount">5</span>)
									</li>
									<li id="worldNews">World News (<span id="worldNewsCount">5</span>)
									</li>
									<li id="usNews">US News (<span id="usNewsCount">0</span>)
									</li>
									<li id="usPolitics">US Politics (<span
										id="usPoliticsCount">0</span>)
									</li>
									<li id="environment">Environment (<span
										id="environmentCount">0</span>)
									</li>
									<li id="businessNews">Business News (<span
										id="businessNewsCount">0</span>)
									</li>
									<li id="globalMarketsNews">Global Markets News (<span
										id="globalMarketsNewsCount">0</span>)
									</li>
									<li id="usMarkets">US Markets (<span id="usMarketsCount">0</span>)
									</li>
								</ul>
								<div id="categoryDiv">Article Sentiment</div>
								<ul class="sidebar-select-sentiment">
									<li id="bothSentiment">Both</li>
									<li id="postiveSentiment">Positive</li>
									<li id="negativeSentiment">Negative</li>
								</ul>
								<div id="displayGradient"></div>
								<div id="dateRangeDiv">
									Date Range: <span id="currentDateRange"></span>
								</div>
								<ul class="sidebar-select-date">
									<li id="todayRange">Today</li>
									<li id="weekRange">Week</li>
									<li id="monthRange">Month</li>
									<li id="yearRange">Year</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
				<section id="news-feed" class="col-b">
					<div id="news-feed-content">
						<div class="container-wrapper">
							<div class="container">
								<article data-id="instantawesome-cardalejones-150501"
									data-behavior=" " class="news-feed-item ">
									<div class=""
										id="article">			
										<span class="article-details-small" id="article-category">WorldNews | 3/8/2015</span>
										<span id="share-bar"></span>
										<div>
											<a id="article-title">Two charged with Nemtsov killing include Chechen officer: report</a>
										</div>
										<span class="article-details-small" id="article-author">Reuters | By Katya Golubkova and Jason Bush</span>
										<span class="article-sentiment"><a
											id="article-sentiment" href="#" data-toggle="tooltip"
											data-placement="top">Sentiment: Negative</a></span>
										<div id="article">
											<img id="article-image" src="data:image/jpeg;base64,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"/>
											<p id="article-summary">Russian authorities said on Sunday they were holding five men over the killing of Kremlin critic Boris Nemtsov, one of whom served in a police unit in the Russian region of Chechnya, according to a law enforcement official.</p>
										</div>
										<div class="article-keywords">
											Keywords: <span id="article-keywords">Russia, Albert Barakhayev, Anna Fadeyeva, Anna Politkovskaya, Anzor Gubashev, Boris Nemtsov, Natalia Mushnikova, Ramzan Kadyrov, Shagid, Tatyana Makeyeva, Vladimir Markin, Vladimir Putin, Zaur Dadayev</span>
										</div>
										<a id="cluster-link">All related articles</a>										
									</div>
								</article>
								<article data-id="instantawesome-cardalejones-150501"
									data-behavior=" " class="news-feed-item ">
									<div class=""
										id="article">			
										<span class="article-details-small" id="article-category">WorldNews | 3/8/2015</span>
										<span id="share-bar"></span>
										<div>
											<a id="article-title">Police arrest 22 people in India after mob lynches rape suspect</a>
										</div>
										<span class="article-details-small" id="article-author">Reuters | By Rupam Jain Nair</span>
										<span class="article-sentiment"><a
											id="article-sentiment" href="#" data-toggle="tooltip"
											data-placement="top">Sentiment: Negative</a></span>
										<div id="article">
											<img id="article-image" src="http://www.touristplacesinindia.com/guwahati/images/guwahati-city-map.gif"/>
											<p id="article-summary">Indian police arrested 22 people on Sunday over last week's storming of a high security prison in the northeast of the country and subsequent lynching of a rape suspect, an act of mob violence that sparked protests in a region divided on religious and ethnic lines.</p>
										</div>
										<div class="article-keywords">
											Keywords: <span id="article-keywords">Bangladesh, India, L.L. Doungel, Syed Farid Khan</span>
										</div>
										<a id="cluster-link">All related articles</a>										
									</div>
								</article>
								<article data-id="instantawesome-cardalejones-150501"
									data-behavior=" " class="news-feed-item ">
									<div class=""
										id="article">			
										<span class="article-details-small" id="article-category">WorldNews | 3/8/2015</span>
										<span id="share-bar"></span>
										<div>
											<a id="article-title">Iraqi troops, militia make advances near Tikrit</a>
										</div>
										<span class="article-details-small" id="article-author">Reuters | By Ahmed Rasheed</span>
										<span class="article-sentiment"><a
											id="article-sentiment" href="#" data-toggle="tooltip"
											data-placement="top">Sentiment: Negative</a></span>
										<div id="article">
											<img id="article-image" src="http://s4.reutersmedia.net/resources/r/?m=02&d=20150308&t=2&i=1030538419&w=1200&fh=&fw=&ll=&pl=&r=LYNXMPEB2708V"/>
											<p id="article-summary">Iraqi security forces and Shi’ite militia fighting the Islamic State took control of the center of a town on the southern outskirts of Saddam Hussein's home city Tikrit on Sunday, security officials said.</p>
										</div>
										<div class="article-keywords">
											Keywords: <span id="article-keywords">Iraq, Islamic Republic of Iran, United States, Ahmed al-Yasiri</span>
										</div>
										<a id="cluster-link">All related articles</a>										
									</div>
								</article>
							</div>
						</div>
				</section>
				<section id="now-feed" class="col-c" data-now-offset="25"
					data-behavior="index_now_feed" data-count="26">Hello
					Worlds</section>
			</div>
		</section>
	</section>
	<script src="js/external/jquery-2.1.3.min.js"></script>
	<script src="js/articles.js"></script>
</body>
</html>