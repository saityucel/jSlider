	function bzl_slide(options)
	{   
		if (options.fade)
		{
			$('#slide div.slide-div').css('position','absolute');
			$('#slide').find('img').fadeOut(options.fade_speed);
			$('#slide').find('img:eq('+options.element_index+')').fadeIn(options.fade_speed);
			$('#slide').find('.slide-panel').hide();
      $('#slide').find('.slide-panel:eq('+options.element_index+')').show();
    }else{
			kayma = options.element_index*options.slide_w;
			$('#slide').animate({left: -kayma}, options.slide_speed);
		}
	}

	function resize(options)
	{
		options.slide_w = $('#slide_window').parent().width();
		$('#slide').width(options.slide_w*options.div_count);
		$('#slide').find('img').width(options.slide_w);
		var image_height = $('#slide').find('img').height();
		$('#slide div.slide-div').width(options.slide_w);
		$('#slide_window').height(image_height);
		$('.bzl-panel-right').css('left',options.slide_w-$('.bzl-panel-right').width());
	}

	function bzl_auto_slide(options)
	{	
		options.element_index = options.element_index + 1;
		if(options.element_index > (options.div_count-1))
		{
			options.element_index = 0;
		}

		if (options.resize)
		{
			resize(options);
		}

		bzl_slide(options);
	}

	function bzl_next_slide(options)
	{
		options.element_index = options.element_index + 1;
		if(options.element_index > (options.div_count-1))
		{
			options.element_index = 0;
		}

    if(options.fade){
			$('#slide div.slide-div').css('position','absolute');
			$('#slide').find('img').fadeOut(options.fade_speed);
			$('#slide').find('img:eq('+options.element_index+')').fadeIn(options.fade_speed);
			$('#slide').find('.slide-panel').fadeOut(options.fade_speed);
			$('#slide').find('.slide-panel:eq('+options.element_index+')').fadeIn(options.fade_speed);
    }else{
      options.slide_location = $('#slide').position().left;
      nexted = -options.slide_w+options.slide_location;
      slide_width = options.slide_w*options.div_count-options.slide_w;
      if((nexted*-1) <= slide_width)
      {
        if($('#slide').is(':animated')) return;
        $('#slide').animate({left: nexted}, options.slide_speed);
      }else{
        $('#slide').animate({left: 0}, options.slide_speed);
      }
    }
	}

	function bzl_prev_slide(options)
	{

		options.element_index = options.element_index - 1;
		if(options.element_index < 0)
		{
			options.element_index = (options.div_count - 1);
		}

    if(options.fade){

			$('#slide div.slide-div').css('position','absolute');
			$('#slide').find('img').fadeOut(options.fade_speed);
			$('#slide').find('img:eq('+options.element_index+')').fadeIn(options.fade_speed);
    }else{
      options.slide_location = $('#slide').position().left;
      preved = options.slide_w+options.slide_location;
      if (preved <= 0)
      {
        if($('#slide').is(':animated')) return;
        $('#slide').animate({left: preved}, options.slide_speed);
      }
    }
	}

	function trigger(options)
	{	
		options.trig;	
	}

	function bzl_slider(options)
	{		

			if (options.fade)
			{
				$('#slide div.slide-div').css('position','absolute');
				$('#slide').find('img').hide();
				$('#slide').find('img:eq(0)').show();
			};	

			var image_height = $('#slide').find('img').height();
			$('#slide_window').height(image_height);
			options.slide_w = $('#slide_window').width();
			options.div_count = $('#slide div.slide-div').length;
			$('#slide').width(options.slide_w*options.div_count);
			$('#slide div.slide-div').width(options.slide_w);
			$('.bzl-panel-right').css('left',options.slide_w-$('.bzl-panel-right').width());

			$(window).resize(function(){
				options.resize = true;
				resize(options);
				if (!options.fade)
				{
					$('#slide').css('left',-options.element_index*options.slide_w);
				}

			});

			$('.bzl-slider-next').click(function(){
				bzl_next_slide(options);
			});

			$('.bzl-slider-prev').click(function(){
				bzl_prev_slide(options);
			});

			$('.bzl_slide_button').click(function(){
				options.click = true;
				var index = $(this).index();
				options.element_index = index;
				options.slide_w  = $('#slide_window').parent().width();
				bzl_slide(options);
			});

			options.element_index = 0;
			trigger(options);

		}

	$(window).load(function()
	{

		opt = {
          fade : false,
          fade_speed: 1000,
          auto : false,
          slide_duration: 1000,
          slide_speed: 800,
          stop_navigate : true
			  };

    $('.slide-panel').each(function(i, e){
      var thisPosition = $(e).parent('.slide-div').position();
      $(this).css('top', thisPosition.top);
      $(this).css('left', thisPosition.left);
    });

    $('.bzl-slider-next, .bzl-slider-next').click(function(){
      $('.slide-panel').each(function(i, e){
        var thisPosition = $(e).parent('.slide-div').position();
        $(this).css('top', thisPosition.top);
        $(this).css('left', thisPosition.left);
      });

      if(opt.stop_navigate){
        opt.auto = false;
        $('#bzl-play-stop').find('img').attr('src','images/play.png');
        clearInterval(opt.trig);
      }
    });

    $('.bzl-slider-prev, .bzl_slide_button').click(function(){
      $('.slide-panel').each(function(i, e){
        var thisPosition = $(e).parent('.slide-div').position();
        $(this).css('top', thisPosition.top);
        $(this).css('left', thisPosition.left);
      });

      if(opt.stop_navigate){
        opt.auto = false;
        $('#bzl-play-stop').find('img').attr('src','images/play.png');
        clearInterval(opt.trig);
      }
    });


		if (opt.auto)
		{
			opt.trig = setInterval(function(){bzl_auto_slide(opt);}, opt.slide_duration);
			$('#bzl-play-stop').find('img').attr('src','images/stop.png');
		}else
		{
			$('#bzl-play-stop').find('img').attr('src','images/play.png');
		}
			
		$('#bzl-play-stop').click(function(){
			if (opt.auto)
			{	
				opt.auto = false;
				$('#bzl-play-stop').find('img').attr('src','images/play.png');
				clearInterval(opt.trig);
			}
			else
			{
				opt.auto = true;
				opt.trig = setInterval(function(){bzl_auto_slide(opt);}, opt.slide_duration);
				$('#bzl-play-stop').find('img').attr('src','images/stop.png');
			}
		});

		bzl_slider(opt);
	});
