// ================ BEGIN GLOBAL VARIABLES =======================================
    
    var windowHeight = $(window).height(),
        navBarOriginalPosition = 200,
        navBarHeight = $('nav li').height(),
        initialWorkContentWidth = ($(window).width()) * 0.75,
        endWorkContentWidth = ($(window).width()) * 0.8,
        bottomVimeoHeight = (endWorkContentWidth * 0.95) * 0.56212, // 281/500
        initialTopVimeoHeight = initialWorkContentWidth * 0.56212, // 281/500
        endTopVimeoHeight = endWorkContentWidth * 0.56212; // 281/500
   
// ================ END GLOBAL VARIABLES =======================================
   
   
   
   
   
// ================ BEGIN NAMED FUNCTIONS =======================================
    
	// FULLSCREEN BACKGROUND VIDEO
	    // BigVideo plugin that plays fullscreen background video
	    // rotate through three different videos
	    // IF THIS CAUSES ISSUES REINSTATE THE CSS THAT COMES WITH THE PLUGIN
    $(function() {
        
        var BV = new $.BigVideo();
        var vids = ['vids/welchs_shoot.m4v', 'vids/welchs_shoot2.m4v'];
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
    function loadClientWork(work_id) {
	    
	    var shutterflyVideo = '//player.vimeo.com/video/66828414',
	        news_article_oneVideo = '//player.vimeo.com/video/62375672',
	        klondikeVideo = '//player.vimeo.com/video/62375672',
	        viaVideo = '//player.vimeo.com/video/66907062',
	        perdueVideo = '//player.vimeo.com/video/65842529';
	        
	       	
        $.ajax({
            type: 'GET',
            url: work_id + '.php',
            success: function(content) {
            
                $('#' + work_id).next().html(content);
                
                
                
                setTimeout(function() {
                
		            if (work_id != 'via') {
				        $('#' + work_id + ' .client_information').hide();
	                    $('#' + work_id + ' .vimeo').show().find('iframe').attr('src', eval((work_id.toString()) + 'Video'));
		            }    
		            
		            if (work_id === 'via') {
			            $('.close_button.via').show();
		            }
                    
                    $('#' + work_id).next().slideDown('slow');
                
                }, 1000);
                
                globalEffects();
                workSectionEffects();
                
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
                top = $(target).offset().top - navBarHeight;
                
                
        $('a.active').removeClass('active').addClass('inactive');
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

    }
    
    // WORK SECTION EFFECTS
    	// call each time the work section is loaded
    function workSectionEffects () {
	    
        // Hide all work content
        $('li.work_content').hide();
	    
        // Click work preview
        // remove closed class and add open class
        // scroll that specific work section to top of page
        $('li.work-preview.closed').click(function() {
            var work_id = $(this).attr('id'),
                top = $(this).offset().top - navBarHeight;
                
            if ($('li.work-preview').hasClass('open')) {
                var work_id_open = $('li.work-preview.open').attr('id');
                // THIS SEEMS TO BE CAUSING SOME REAL ISSUES
/*                 unloadClientWork(work_id_open); */
            }
            loadClientWork(work_id);
            $(this).removeClass('closed').addClass('open');
            $('#' + work_id + ' .vimeo').css({
                height: endTopVimeoHeight
            });
            scrollUp(top);
            return false;
        });
        
        // Click close button to collapse the work preview section
        $('.close_button').click(function() {
            var work_id = $(this).closest('li').attr('id');
            
            unloadClientWork(work_id);
            
            $(window).scrollTo(windowHeight - 190, 500, {
                'axis': 'y',
                easing: 'easeInCubic'
            });
            
            //hide the close button for the via section
            $('.close_button.via').hide();
            
            return false;
        });
        	    
    }
    
    
    
    
// ================ END NAMED FUNCTIONS =======================================





// ================ BEGIN CALLING NAMED FUNCTIONS ON PAGE LOAD =======================================

    globalEffects();
    workSectionEffects();

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
                
		        if (sectionId === "our_work") {
					workSectionEffects();
		        }

            }
        });
                
        return false;
    });
    
    
    
    

	// EFFECTS CALLED ON SCROLL
	    // If user scrolls to top of browser window
	    // fix nav to top of window
	    // add padding to top of content to smooth out the transition
    $(window).scroll(function() {
        
        if ($(window).scrollTop() >= (windowHeight - navBarOriginalPosition - 2)) {
            
            $('nav').removeClass('not-fixed').addClass('fixed');
            $('img.logo').addClass('logo-top');
            $('.secondary_nav_wrapper').addClass('fixed');
            
            $('.center-column').css({
                'padding-top': navBarHeight
            });
            
        }
        
        if ($(window).scrollTop() <= (windowHeight - navBarOriginalPosition - 2)) {
            
            $('nav').removeClass('fixed').addClass('not-fixed');
            $('img.logo').removeClass('logo-top');
            $('.secondary_nav_wrapper').removeClass('fixed');
            
            $('.center-column').css({
                'padding-top': 0
            });
            
        }
    });


	$('nav').css({height: navBarHeight});

// ================ END EVENTS =======================================
