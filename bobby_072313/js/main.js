    // HEADER IMAGE FADE IN AND OUT
    var slideShow = function() {
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
	                var findActiveIndex = slider.find(slide + ".visible").index();
	                slides().eq(findActiveIndex).removeClass('visible');
	                slides().eq(findActiveIndex).fadeOut(transition_time, "easeInOutExpo");
	                if (slides().length === findActiveIndex + 1) {findActiveIndex = -1;}
	                slides().eq(findActiveIndex + 1).fadeIn(transition_time, "easeInOutExpo");
	                slides().eq(findActiveIndex + 1).addClass('visible');
	            }, time_between_slides + transition_time
	        );
        };
    slideShow();
    // SCROLLY STUFF
    $(window).scroll(function() {
        //var navTop = $('nav').offset().top;
        var workTop = $('#work_preview').offset().top;
        var navTop = 90;
        // if we haven't scrolled to the nav
        // keep the bg images at 100% opacity
        if ($(window).scrollTop() < navTop) {
            $('nav').removeClass('nav_fixed');
            $('.red_bar').removeClass('red_bar_visible');
            $('#work_bar').stop().animate({opacity:1});
            $('#navigation li a').removeClass('nav_link_color_white').addClass('nav_link_color_black');
            $('.home_bg_img').stop().animate({
                opacity: 1
            }, 500, "easeInOutSine");
        }
        // if we've scrolled to the nav
        // fade the images to 25% opacity
        // display newly styled navigation bar
        if ($(window).scrollTop() > 90 - 10) {
            $('nav').addClass('nav_fixed');
            $('#work_bar').stop().animate({opacity:0});
            $('.red_bar').addClass('red_bar_visible');
            $('#navigation li a').removeClass('nav_link_color_black').addClass('nav_link_color_white');
        }
        if ($(window).scrollTop() > workTop - 100) {
            $('.home_bg_img').stop().animate({
                opacity: 0
            }, 500, "easeInOutSine");
        }
    });
    // CLICK LINK AND SCROLL TO
    $('nav a').click(function() {
        var target = $(this).attr('href');
        if ($(this).attr('href') === "#container") {
            var top = $(target).offset().top - 1;
            $('body').scrollTo(top, 500, {
                'axis': 'y',
                easing: 'easeOutCubic'
            });
            $('.work_content').slideUp(500);
            $('.work_preview').removeClass('open').addClass('closed');
        } else {
            var top = $(target).offset().top - 60;
            $('body').scrollTo(top, 500, {
                'axis': 'y',
                easing: 'easeInCubic'
            });
        }
        return false;
    });
    //CLICK ON WORK AND ACTIVATE ACCORDION 
    $('.work_content').hide();
    $('li.work_preview').click(function() {
        var target = $(this);
        var top = target.offset().top - 60;
        var work_id = target.attr('id');
        var content_height = target.next().height();
        
        if (target.hasClass('open')) {
            target.next().slideToggle(500);
            target.removeClass('open').addClass('closed');
        } else {
            $(window).scrollTo(top, 500, {
                'axis': 'y',
                easing: 'easeInCubic'
            });

			target.next().load(work_id + '.php');
			$('#container').css({"margin-bottom":content_height});
            setTimeout(function() {
                target.next().slideToggle(500);
                target.removeClass('closed').addClass('open');
            }, 1000);
			}
        if ($('.work_preview').hasClass('open')) {
            $('.work_content').slideUp(500);
            $('.work_preview').removeClass('open').addClass('closed');
        }
        return false;
    });
        
