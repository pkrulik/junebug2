// START NAMED FUNCTIONS
    function clickLinkToScroll() {
        $('a').click(function() {
            var target = $(this).attr('href');
            if ($(this).attr('href') === '#top_wrapper') {
                var top = $(target).offset().top - 1;
            } else if ($(this).hasClass('secondary_nav') ) {
                var top = $(target).offset().top - 90;
            } else {
                var top = $(target).offset().top - 60;
            }
            $('body').scrollTo(top, 500, {
                'axis': 'y',
                easing: 'easeInCubic'
            });
            return false;
        });
    }
    
    function clickListToScroll() {
        $('li').click(function () {
	        var target = $(this),
	            top = target.offset().top - 60;
	        $(window).scrollTo(top, 500, {
	            'axis': 'y',
	            easing: 'easeInCubic'
	        });
        });
    }
        
    function loadWorkSection(work_id) {
        $.ajax({
            type: 'GET',
            url: work_id + '.php',
            success: function(content) {            	
                $('#' + work_id + '.work_content').html(content);
                clickLinkToScroll();
                setTimeout(function() {
                    $('#' + work_id + '.client_information').hide();
                    $('#' + work_id + ' #youtube').show();
	                $('#' + work_id + '.work_content').slideDown('slow');
                }, 1000);
            }
        });
    }
    
    function unloadWorkSection(work_id) {
        $.ajax({
            type: 'GET',
            url: '',
            success: function(content) {            	
                $('#' + work_id + '.work_content').html(content);
			}
        });
    }
    
   function slideShow() {
        //Settings
        var slider = $('#home_bg_img_slider');
        var slide = 'li';
        var transition_time = 5000;
        var time_between_slides = 200;

        function slides() {
            return slider.find(slide);
        }
        slides().first().addClass('visible');
        slides().first().fadeIn(1000);
        setInterval(

        function() {
            var findActiveIndex = slider.find(slide + '.visible').index();
            slides().eq(findActiveIndex).removeClass('visible');
            slides().eq(findActiveIndex).fadeOut(transition_time, 'easeInOutExpo');
            if (slides().length === findActiveIndex + 1) {
                findActiveIndex = -1;
            }
            slides().eq(findActiveIndex + 1).fadeIn(transition_time, 'easeInOutExpo');
            slides().eq(findActiveIndex + 1).addClass('visible');
        }, time_between_slides + transition_time);
    };
    
//END NAMED FUNCTIONS    
    
    
//CALL NAMED FUNCTIONS ON LOAD
	slideShow();
	clickLinkToScroll();
	clickListToScroll();
	
//END NAMED FUNCTIONS ON LOAD
    
    
//START SCROLLY STUFF
    $(window).scroll(function() {
        var workTop = $('#work_preview').offset().top,
            workPreviewBottom = $('.work_preview').offset().top + $('.work_preview').outerHeight(true) - 100,
            navTop = 90,
            topScroll = $(window).scrollTop(); 

        // if we haven't scrolled to the nav
        // keep the bg images at 100% opacity
        if ($(window).scrollTop() < navTop) {
            $('nav').removeClass('nav_fixed');
            $('.red_bar').removeClass('red_bar_visible');
            $('#work_bar').stop().animate({
                opacity: 1
            });
            $('#navigation li a').removeClass('nav_link_color_white').addClass('nav_link_color_black');
            $('.home_bg_img').stop().animate({
                opacity: 1
            }, 500, 'easeInOutSine');
        }
        // if we've scrolled to the nav
        // fade the images to 25% opacity
        // display newly styled navigation bar
        if ($(window).scrollTop() > 90 - 10) {
            $('nav').addClass('nav_fixed');
            $('#work_bar').stop().animate({
                opacity: 0
            });
            $('.red_bar').addClass('red_bar_visible');
            $('#navigation li a').removeClass('nav_link_color_black').addClass('nav_link_color_white');
        }
        if ($(window).scrollTop() > workTop - 100) {
            $('.home_bg_img').stop().animate({
                opacity: 0
            }, 500, 'easeInOutSine');
        }
        
        //FIX SECONDARY NAV TO TOP
        //NEEDS TO BE SPECIFIC TO EACH SECTION
        if ($(window).scrollTop() >= workPreviewBottom) {
            $('#secondary_nav').addClass('fixed');
            
        }
        if ($(window).scrollTop() < workPreviewBottom) {
            $('#secondary_nav').removeClass('fixed');
        }

    });
    
//END SCROLLY STUFF

//START WORK SECTION
	$('li.work_content').hide();

	// CLICK WORK PREVIEW
	// LOAD WORK CONTENT
	// SLIDE CONTAINER DOWN
    $('li.work_preview.closed').click(function() {
        var work_id = $(this).attr('id');
		clickListToScroll();
        loadWorkSection(work_id);
        $(this).removeClass('closed').addClass('open');
        return false;
    });
    
    // CLOSE THE WORK SECTION
    $('.close_button').click(function(){
	    var work_id = $(this).attr('id'); 
	    $('#' + work_id + '.work_content').slideUp();
	    $('#' + work_id + ' ' + '#youtube').hide();
        $('.client_information' + '#' + work_id).show();
        unloadWorkSection(work_id);
        return false;
    });
    
//END WORK SECTION   

if ( $('li').hasClass('open') ) {	
}

$('#about').click(function(){
	$('#about_section').removeClass('right_off_screen').addClass('center_on_screen');
	$('#work_container').addClass('right_off_screen');
});