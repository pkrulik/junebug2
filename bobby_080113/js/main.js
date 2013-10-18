// START NAMED FUNCTIONS

var test = 100;

function loadWork() {
    $.ajax({
        type: 'GET',
        url: 'work.php',
        success: function(content) {
            $('.container').html(content);
            workEffects();
        }
    });
}

function clickLink() {
    $('a.closed').click(function() {
        var target = $(this).attr('href'),
            section = $(this).attr('id');
        $.ajax({
            type: 'GET',
            url: section + '.php',
            success: function(content) {
                $('.container').fadeOut().html(content).fadeIn('slow');
                if (section === 'work') {
                    workEffects();
                }
            }
        });
/*
            setTimeout (function () {
	            if ($(this).attr('href') === '#top_wrapper') {
	                var top = $(target).offset().top - 1;
	            } else if ($(this).hasClass('secondary_nav_wrapper') ) {
	                var top = $(target).offset().top - 90;
	            } else {
	                var top = $(target).offset().top - 60;
	            }
            }, 1000);
            
            
            $('body').scrollTo(top, 500, {
                'axis': 'y',
                easing: 'easeInCubic'
            });
*/
        return false;
    });
}

function loadClientWork(work_id) {
    $.ajax({
        type: 'GET',
        url: work_id + '.php',
        success: function(content) {
            $('#' + work_id + '.work_content').html(content);
            clickLink();
            setTimeout(function() {
                $('#' + work_id + '.client_information').hide();
                $('#' + work_id + ' #youtube').show();
                $('#' + work_id + '.work_content').slideDown('slow');
            }, 1000);
        }
    });
}
// STUFF THAT HAPPENS WHEN YOU CLICK THINGS IN THE WORK SECTION

function workEffects() {
    //START WORK SECTION
    $('li.work_content').hide();
    // CLICK WORK PREVIEW
    // LOAD WORK CONTENT
    // SLIDE CONTAINER DOWN
    $('li.work_preview.closed').click(function() {
        var work_id = $(this).attr('id');
        loadClientWork(work_id);
        $(this).removeClass('closed').addClass('open');
		var secondaryNavTop = $('.secondary_nav_wrapper').offset().top + $('.secondary_nav_wrapper').outerHeight(true);
        return false;
    });
    // CLOSE THE WORK SECTION
    $('.close_button').click(function() {
        var work_id = $(this).attr('id');
        $('#' + work_id + '.work_content').slideUp();
        $('#' + work_id + ' ' + '#youtube').hide();
        $('.client_information' + '#' + work_id).show();
        return false;
    });
    // SCROLL WORK PREVIEW TO TOP OF PAGE
    $('li.work_preview').click(function() {
        var target = $(this),
            top = target.offset().top - 60;
        $(window).scrollTo(top, 500, {
            'axis': 'y',
            easing: 'easeInCubic'
        });
    });
    
    //FIX SECONDARY NAV TO TOP
    //NEEDS TO BE SPECIFIC TO EACH SECTION
    $(window).scroll(function() {
	    if ($(window).scrollTop() > secondaryNavTop) {
	        $('.secondary_nav_wrapper').addClass('fixed');
	    }
	    if ($(window).scrollTop() < secondaryNavTop) {
	        $('.secondary_nav_wrapper').removeClass('fixed');
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
}
//END NAMED FUNCTIONS    
//CALL NAMED FUNCTIONS ON LOAD
slideShow();
loadWork();
clickLink();
scrollyStuff();
//END NAMED FUNCTIONS ON LOAD
//START SCROLLY STUFF

function scrollyStuff() {
    $(window).scroll(function() {
        var sectionContentTop = $('.section_content').offset().top,
            sectionContentBottom = $('.section_content').offset().top + $('.section_content').outerHeight(true) - 100,
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
        if ($(window).scrollTop() > sectionContentTop - 100) {
            $('.home_bg_img').stop().animate({
                opacity: 0
            }, 500, 'easeInOutSine');
        }
    });
    //END SCROLLY STUFF
}