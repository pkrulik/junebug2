    
    
    // GLOBAL VARIABLES
    var windowHeight = $(window).height(),
        navBarHeight = 56,
        workContentWidth = ($(window).width()) * 0.8,
        bottomVimeoHeight = (workContentWidth * .95) * 0.562, // 281/500
        topVimeoHeight = workContentWidth * 0.562; // 281/500
   
   // STUFF THAT HAPPENS ON SITE LOAD
    // ON page load load in the work section
    $(window).load(function () {
        $.ajax ({
	       type: 'GET',
	       url: 'our_work.php',
	       success: function(content) {
		       $('#work_preview').html(content);
			   globalEffects();
	       } 
        });        
    });
    // Play fullscreen background video
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
    }); /* END BIG VIDEO */
    // Position the nav bar and content 200px above the bottom 
    // of the window    
    $('.center-column').css({
        'margin-top': windowHeight - 200
    });
   
    // Click primary nav
    // Scroll content to top
    // Dynamically load content	
    $('nav ul li a').click(function() {
        var top = $(this).offset().top,
        	sectionId = $(this).attr('id');
        $(window).scrollTo(top, 500, {
            'axis': 'y',
            easing: 'easeInCubic'
        });
        		     
        $.ajax ({
	       type: 'GET',
	       url: sectionId + '.php',
	       success: function(content) {
		       $('#work_preview').html(content);
			   globalEffects();
	       } 
        });       
		
		$('a.active').removeClass('active').addClass('inactive');
		
		if ($('a').hasClass('inactive') ) {
			$(this).removeClass('inactive').addClass('active');
		}
		
		
/* 		$(this).addClass ('active'); */
        return false;
    });
   
   
    // If user scrolls to top of browser window
    // fix nav to top of window
    // add padding to top of content to smooth out the transition
    $(window).scroll(function() {
        if ($(window).scrollTop() >= (windowHeight - 200)) {
            $('nav').removeClass('not-fixed').addClass('fixed');
            $('.secondary_nav_wrapper').addClass('fixed');
            $('.center-column').css({
                'padding-top': navBarHeight
            });
        }
        if ($(window).scrollTop() <= (windowHeight - 200)) {
            $('nav').removeClass('fixed').addClass('not-fixed');
            $('.secondary_nav_wrapper').removeClass('fixed');
            $('.center-column').css({
                'padding-top': 0
            });
        }
    });
    
    // START NAMED FUNCTIONS
    // Function that loads client work into client preview section
    // and then expands to display the content

    function loadClientWork(work_id) {
        $.ajax({
            type: 'GET',
            url: work_id + '.php',
            success: function(content) {
                var shutterflyVideo = '//player.vimeo.com/video/66828414',
                    klondikeVideo = '//player.vimeo.com/video/66907062',
                    viaVideo = '//player.vimeo.com/video/66907062',
                    perdueVideo = '//player.vimeo.com/video/66907062';
                $('#' + work_id).next().html(content);
                setTimeout(function() {
                    $('#' + work_id + ' .client_information').hide();
                    $('#' + work_id + ' .vimeo').show().find('iframe').attr('src', eval((work_id.toString()) + 'Video'));
                    $('#' + work_id).next().slideDown('slow');
                }, 1000);
                globalEffects();
                $('.video_player').css({
                    height: bottomVimeoHeight
                });
            }
        });
    }

    function unloadClientWork(work_id) {
        $.ajax({
            type: 'GET',
            url: '',
            success: function() {
                $('#' + work_id).next().html('');
            }
        });
    }
    // Function that handles all of the things that happen
    // when you open the work preview section

    function globalEffects() {
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
                closeWorkSection(work_id_open);
            }
            loadClientWork(work_id);
            $(this).removeClass('closed').addClass('open');
            $('#' + work_id + ' .vimeo').css({
                height: topVimeoHeight
            });
            setTimeout(function() {
                $('#' + work_id + ' .white_background').stop().animate({
                    height: topVimeoHeight,
                    opacity: 1
                }, 250);
            }, 1000);
            scrollUp(top);
            return false;
        });
        // Click close button to collapse the work preview section
        $('.close_button').click(function() {
            var work_id = $(this).closest('li').attr('id');
            closeWorkSection();
            unloadClientWork(work_id);
	        $(window).scrollTo(windowHeight - 200, 500, {
	            'axis': 'y',
	            easing: 'easeInCubic'
	        });
            return false;
        });
        // Click work navigation and scroll to section
        $('.secondary_nav_wrapper a').click(function() {
            var target = $(this).attr('href'),
                targetTop = $(target).offset().top - navBarHeight;
            setTimeout (function (){
	            
            });
            $(window).scrollTo(targetTop, 400, {
                'axis': 'y',
                easing: 'easeInCubic'
            });
            return false;
        });
    }
    // Function that scrolls to the top after an action

    function scrollUp(top) {
        $(window).scrollTo(top, 500, {
            'axis': 'y',
            easing: 'easeInCubic'
        });
    }
    // Function that collapses the work section

    function closeWorkSection() {
        $('.work_content').slideUp('fast');
        $('.vimeo').hide().find('iframe').attr('src', '');
        $('.client_information').show();
        $('li.work-preview.open').removeClass('open').addClass('closed');
        $('.white_background').stop().animate({
            opacity: 0,
            height:0
        }, 100);
        
/*
        $(window).scrollTo(windowHeight - 200, 500, {
            'axis': 'y',
            easing: 'easeInCubic'
        });
*/
    }
    //END NAMED FUNCTIONS    
    
    
   