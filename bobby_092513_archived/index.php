<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>The VIA Agency</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/main.css">
        <script src="js/modernizr-2.6.2.min.js"></script>
        
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false" type="text/javascript"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCtxpX23AhV09y0fcZRWBjPO08mtyw_Q4o&sensor=false"></script>

	</head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
		<div id = "main_wrapper">
			
			
			<a href = "index.php"><img class = "logo" src="img/logo.png" alt="logo" width="50" height="50"></a>
			
			<div class = "center-column">
				
				<nav class = "not-fixed">
					<ul>
						<li><a id = "our_work" class = 'inactive' href = "#" ><span>See Our</span> Work</a></li>
						<li><a id = "culture" class = 'inactive' href = "#"><span>The VIAn</span> Culture</a></li>
						<li><a id = "news" class = 'inactive' href = "#"><span>In The</span> News</a></li>
						<li><a id = "contact" class = 'inactive' href = "#"><span>Make</span> Contact</a></li>
					</ul>
				</nav>
				
				<div class = "clear"></div>
				
	        	<ul id = "work_preview">        	
		        	
					<!-- OUR_WORK.PHP GOES HERE -->
					<?php include 'our_work.php'; ?>
		        	
	        	</ul>				
				

			
				<div class = "one-hundred-percent news">
					<h2><span>This is where a news</span> <span>headline will go</span></h2>
					<a href = "#">
						<p>
							<span>Sed ut perspiciatis unde omnis iste natus error sit voluptatem</span> 
							<span>accusantium doloremque laudantium, totam rem aperiam, eaque</span> 
							<span>ipsa quae ab illo inventore veritatis.</span>
						</p>
					</a>
				</div>
				
				<div class = "one-hundred-percent jobs">
					<h2>We're hiring</h2>
					<a href = "#"><p>Read More...</p></a>
				</div>
				
				<footer class = "one-hundred-percent">
					<div class = "eighty-percent footer">
						<div class = "left">
							<a href = "">info@theviaagency.com</a>
							<p>+1 [207] 221-3000</p>
						</div>
						<div class = "right">
							<img src="img/social_icons.png" alt="social_icons" width="266" height="55">
						</div>
						<div class = 'clear'></div>
					</div>
				</footer>
				
			</div> <!-- END CENTER COLUMN -->
		</div>  <!--END MAIN WRAPPER --> 
	    
	    <!-- BigVideo Dependencies -->
	  	<script src = "js/jquery-1.10.2.min.js"></script>
	    <script src="js/jquery-ui-1.8.22.custom.min.js"></script>
	    <script src="js/jquery.imagesloaded.min.js"></script>
	    <script src="http://vjs.zencdn.net/4.0/video.js"></script>
	    
	    <!-- BigVideo -->
	    <script src="js/bigvideo.js"></script>
		     
		<!-- PLUGINS -->
		<script src="js/jquery.easing.min.js"></script>
		<script src="js/jquery.scrollTo-1.4.3.1.min.js"></script>
		     
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
