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
	<header>
	NewsMap
	</header>
	<div id="container">
		
		<div id="map-canvas"></div>
	</div>
	<div id="sidebar">
  <div class="section">
    <div class="toggle-triangle carat up-carat"></div>
    <div class="title">Global Heatmap</div>
  </div>
  <div style="display: block;" class="content">
    <div style="padding-top: 0; height: auto" class="section" id="sidebarContent">
      <br>
  Heatmap Style
  <br>
  <div data-toggle="buttons" class="btn-group btn-group-sm">
    <label data-style="gray" class="map-style btn btn-default">
      <input type="radio" value="gray" name="map_style" id="style-gray">Gray
    </label>
    <label data-style="blue" class="map-style btn btn-default active">
      <input type="radio" value="blue" name="map_style" id="style-blue">Blue
    </label>
    <label data-style="yellow" class="map-style btn btn-default">
      <input type="radio" value="yellow" name="map_style" id="style-yellow">Yellow
    </label>
  </div>

  <br><br>
  <ul>
  	<li>All</li>
  	<li>World</li>  
  </ul>
      </div>
  </div>
</div>

		<!-- 	<section>
		<div class="map-wrapper">
			<div class="heatmap" id="map-canvas"></div>
		</div>
	</section>
	<section>
		<article>
			<h1>
				<a href="" title=""> news title </a>
			</h1>
			<img src="" alt="" />
			<p>news description</p>
		</article>
	</section> -->
		<script type="text/javascript"
			src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
		<script src="js/external/heatmap.min.js"></script>
		<script src="js/external/gmaps-heatmap.js"></script>
		<script src="js/index.js"></script>
</body>
</html>