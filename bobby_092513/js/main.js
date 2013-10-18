// ================ BEGIN GLOBAL VARIABLES =======================================
    
    var windowHeight = $(window).height(),
        navBarOriginalPosition = 200,
        navBarHeight = $('nav li').height(),
        initialWorkContentWidth = ($(window).width()) * 0.65,
        endWorkContentWidth = ($(window).width()) * 0.7,
        bottomVimeoHeight = (endWorkContentWidth * 0.95) * 0.56212, // 281/500
        initialTopVimeoHeight = initialWorkContentWidth * 0.56212, // 281/500
        endTopVimeoHeight = endWorkContentWidth * 0.56212; // 281/500
   
// ================ END GLOBAL VARIABLES =======================================
   
   
   
   
   
// ================ BEGIN NAMED FUNCTIONS =======================================
    
		// JQUERY.ADDRESS
	    // Event handlers
	    	// THIS ONLY SEEMS TO WORK WITH JQUERY 1.4.1
	    $.address.init(function(event) {
	        
	        // this is what loads initially
	        console.log("init: " + $('[rel=address:' + event.value + ']').attr('href'));
	    	console.log ("this is the event value .init: " + event.value)
	        
	    }).change(function(event) {
	    	
	    	// this is what happens when a link is clicked and the url changes
	    	// match the rel=address with the href attr
	    	$("#work_preview").load( $('[rel=address:' + event.value + ']').attr('href') );
	    	
	    	console.log("somethign has changed");
	    	console.log ("this is the event value .change: " + event.value)
	    	
	    })
	
	
	
	
	
	
	
	
	// FULLSCREEN BACKGROUND VIDEO
	    // BigVideo plugin that plays fullscreen background video
	    // rotate through three different videos
	    // IF THIS CAUSES ISSUES REINSTATE THE CSS THAT COMES WITH THE PLUGIN
    $(function() {
        
        var BV = new $.BigVideo();
        var vids = ['vids/bobby.m4v', 'vids/bobby.m4v'];
        vids.sort(function() {
            return 0.5 - Math.random();
        }); // random order on load
        
        BV.init();
        
        if (Modernizr.touch) {
            BV.show('img/bg2.gif');
        } else {
            BV.show(vids, {
                ambient: true
            });
        }
        
    });
    
    
    // OPEN AND LOAD CLIENT WORK
	    // Function that loads client work into client preview section
	    // and then expands to display the content
    function loadClientWork(work_id, work_class) {
	    
	    var shutterflyVideo = '//player.vimeo.com/video/66828414',
	        news_article_oneVideo = '//player.vimeo.com/video/62375672',
	        klondikeVideo = '//player.vimeo.com/video/62375672',
	        viaVideo = '//player.vimeo.com/video/66907062',
	        perdueVideo = '//player.vimeo.com/video/65842529';
	        
	       	
        $.ajax({
            type: 'GET',
            url: work_id + '.php',
            success: function(content) {
            
				// load next li with ajaxed content            
                $('#' + work_id).next().html(content);
                
                setTimeout(function() {
                	
                	// Hide main image
                	// Show video
                	// Show close button	            
		            if ( work_class === 'video_expand' ) {
				        $('#' + work_id + ' .client_information').hide();
	                    $('#' + work_id + ' .vimeo').show().find('iframe').attr('src', eval((work_id.toString()) + 'Video'));
		            }
		            
		            if ( work_class === 'no_video_expand' ) {
			            $('.close_button').show();
		            }
		            
		            // Expand next li down to reveal new ajaxed content
		            if ( work_class === 'no_video_expand' || work_class === 'video_expand' ) {
                    	$('#' + work_id).next().slideDown('slow');
	                    $('#' + work_id + ' .work.close_button').show();
		            }
		                                
                
                }, 1000);
                
                globalEffects();
                
                $('.video_player').css({
                    height: bottomVimeoHeight
                });
                
            }
        });
    }
	
	
	
	// CLOSE AND UNLOAD CLIENT WORK
    function unloadClientWork(work_id, work_id_open) {
        
        $('.work_content').slideUp('fast');
        $('.vimeo').hide().find('iframe').attr('src', '');
        $('.client_information').show();
        $('li.work-preview.open').removeClass('open').addClass('closed');
        $('.white_background').stop().animate({
            opacity: 0,
            height: 0
        }, 100);
        
        $.ajax({
            type: 'GET',
            url: '',
            success: function() {
                $('#' + work_id).next().html('');
				$('.close_button').hide();

            }
        });

    }
   
   
   
    // SCROLL UP
    	// Can be called when link is clicked
    	// to scroll to to of page or section
    function scrollUp(top) {
        
        $(window).scrollTo(top, 500, {
            'axis': 'y',
            easing: 'easeInCubic'
        });
        
    }
    
    
    // GOOGLE MAPS 
/*
    function loadGoogleMaps() {
        var myCenter = new google.maps.LatLng(43.653978, -70.264331);

        function initialize() {
            var mapProp = {
                center: myCenter,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

            var marker = new google.maps.Marker({
                position: myCenter,
            });

            marker.setMap(map);

            var infowindow = new google.maps.InfoWindow({
                content: "The VIA Agency"
            });

            infowindow.open(map, marker);
        }

        google.maps.event.addDomListener(window, 'load', initialize);

        $('#googleMap').css({
            width: 500
        });

    }
*/
    
	
	// GLOBAL EFFECTS
		// Call this function each time a page is loaded
    function globalEffects() {
       
        // Set the height of divs with the class of .vimeo
        // that are not hidden on load
        $('.vimeo.show').css({
            height: initialTopVimeoHeight
        });
       
        
        // Click work navigation and scroll to section
        $('.secondary_nav_wrapper a').click(function() {
            var target = $(this).attr('href'),
                top = $(target).offset().top - navBarHeight - 40;
                
                
	        $('.secondary_nav_wrapper a.active').removeClass('active').addClass('inactive');
	        if ($('a').hasClass('inactive')) {
	            $(this).removeClass('inactive').addClass('active');
	        }
/*
	        if ($('li').hasClass('inactive')) {
	            $('li').removeClass('inactive').addClass('active');
	        }
*/
            
            scrollUp(top);
            return false;
        });
        
        // Hide all work content
        $('li.work_content').hide();
	    
        // Click work preview
        // remove closed class and add open class
        // scroll that specific work section to top of page
        $('li.work-preview.closed').click(function() {
            var work_id = $(this).attr('id'),
                top = $(this).offset().top - navBarHeight;
              
            //used to expand section and keep main image  
            if ( $(this).hasClass('no_video_expand') ) {
	            var work_class = 'no_video_expand';
            }    
            
            //Used to expand the section and change main image to video
            if ( $(this).hasClass('video_expand') ) {
	            var work_class = 'video_expand';
            }    
                
            if ($('li.work-preview').hasClass('open')) {
                var work_id_open = $('li.work-preview.open').attr('id');
                // THIS SEEMS TO BE CAUSING SOME REAL ISSUES
/*                 unloadClientWork(work_id_open); */
            }
            
            loadClientWork(work_id, work_class);
            
            $(this).removeClass('closed').addClass('open');
            
            $('#' + work_id + ' .vimeo').css({
                height: endTopVimeoHeight
            });
            
            scrollUp(top);
            return false;
        });
        
        
        
        // Click close button to collapse the work preview section
        $('.close_button').click(function() {
            var work_id = $(this).closest('li').attr('id'),
            	top = windowHeight - 190;
                        
            unloadClientWork(work_id);
			scrollUp(top);
                        
            return false;
        });

    }    
    
    
    
// ================ END NAMED FUNCTIONS =======================================





// ================ BEGIN CALLING NAMED FUNCTIONS ON PAGE LOAD =======================================

    globalEffects();

// ================ END CALLING NAMED FUNCTIONS ON PAGE LOAD =======================================




// ================ BEGIN EVENTS =======================================

	// INITIAL CHANGE BAED ON WINDOW HEIGHT
	    // Position the nav bar and content 200px above the bottom 
	    // of the window    
    $('.center-column').css({
        'margin-top': windowHeight - navBarOriginalPosition
    });
    
    
    

	// LOAD NEW SITE SECTIONS
		// Work, Culture, News and Contact
/*
    $('nav ul li a').click(function() {
        
        var top = $('#work_preview').offset().top - navBarHeight,
        	sectionId = $(this).attr('id');
		
		// Alter navigation colors based on active state
        $('a.active').removeClass('active').addClass('inactive');
        if ($('a').hasClass('inactive')) {
            $(this).removeClass('inactive').addClass('active');
        }

        scrollUp(top);

        $.ajax({
            type: 'GET',
            url: sectionId + '.php',
            success: function(content) {
                
                $('#work_preview').css({
                    'margin-top': 2000,
                    opacity: 0.25
                }, 1000).html(content).animate({
                    'margin-top': 0,
                    opacity: 1
                }, "easeOutCubic");
                
                globalEffects();
                
            }
        });
                
        return false;
    });
*/
    
    // NEW STUFF HERE 
    
    function loadURL (url) {
        $.ajax({
            type: 'GET',
            url: url,
            success: function(content) {
                
                $('#work_preview').css({
                    'margin-top': 2000,
                    opacity: 0.25
                }, 1000).html(content).animate({
                    'margin-top': 0,
                    opacity: 1
                }, "easeOutCubic");
                
                globalEffects();
                
            }
        });
    }
    
    $('nav ul li a').click(function() {
        var top = $('#work_preview').offset().top - navBarHeight,
        	sectionId = $(this).attr('id'),
			url = $(this).attr('href');
			
		// Alter navigation colors based on active state
        $('a.active').removeClass('active').addClass('inactive');
        if ($('a').hasClass('inactive')) {
            $(this).removeClass('inactive').addClass('active');
        }

        scrollUp(top);
		loadURL(url);
                
        return false;
    });
    
    
    // END NEW STUFF HERE
    
    

	// EFFECTS CALLED ON SCROLL
	    // If user scrolls to top of browser window
	    // fix nav to top of window
	    // add padding to top of content to smooth out the transition
    $(window).scroll(function() {
        
        if ($(window).scrollTop() >= (windowHeight - navBarOriginalPosition - 2)) {
            
            $('nav').removeClass('not-fixed').addClass('fixed');
            $('.work.close_button').removeClass('not_fixed').addClass('fixed');
            $('img.logo').addClass('logo-top');
            $('.secondary_nav_wrapper').addClass('fixed');
            
            $('.center-column').css({
                'padding-top': navBarHeight
            });
            
        }
        
        if ($(window).scrollTop() <= (windowHeight - navBarOriginalPosition - 2)) {
            
            $('nav').removeClass('fixed').addClass('not-fixed');
            $('.work.close_button').removeClass('fixed').addClass('not_fixed');
            $('img.logo').removeClass('logo-top');
            $('.secondary_nav_wrapper').removeClass('fixed');
            
            $('.center-column').css({
                'padding-top': 0
            });
            
        }
    });


	$('nav').css({height: navBarHeight});

// ================ END EVENTS =======================================
