/*
    Animation code Copyright (c) 2012 Chris Cogdon
    Licensed under CC BY-SA 3.0
    See http://creativecommons.org/licenses/by-sa/3.0/ for full license.
*/

jQuery(".disablewithjavascript").css ( {visibility:"hidden"} );

var animbox = jQuery("#animbox");

function set_sprite_sizes () {
	animbox.find("div.sprite").each ( function () {
		var thisjq = jQuery(this);
		this.subimage = thisjq.find("img");
		if ( thisjq.hasClass('multiframe') ) {
			var framewidth = Math.floor(this.getAttribute('framewidth'));
			var frameheight = Math.floor(this.getAttribute('frameheight'));
			var subimage_width = this.subimage.width();
			var subimage_height = this.subimage.height();
			thisjq.css ( {width:framewidth,height:frameheight,opacity:1} );
			if ( framewidth != subimage_width ) {
				this.anim_frame_left = framewidth;
				this.anim_frame_top = 0;
				this.num_frames = Math.floor ( subimage_width / framewidth );
			} else {
				this.anim_frame_left = 0;
				this.anim_frame_top = frameheight;
				this.num_frames = Math.floor ( subimage_height / frameheight );
			}
		} else {
			thisjq.css ( {width:this.subimage.width(),height:this.subimage.height(),opacity:1} );
		}
	});
}

function set_frame ( jq, frame ) {
	jQuery ( jq ).each ( function() {
		this.subimage.css ( { left:-this.anim_frame_left*frame, top:-this.anim_frame_top*frame } );
	});
}

function loop_frames ( jq, frame_list, frame_period ) {
	var event;
	var iter = 0;
	jq = jQuery(jq).show();
	function anim() {
		set_frame ( jq, frame_list[iter%frame_list.length] );
		event = setTimeout ( anim, (typeof(frame_period)=="function")?frame_period():frame_period );
		iter++;
	}
	function stop() {
		clearTimeout(event);
	}
	event = setTimeout(anim,0);
	return stop;
}

function random_frames ( jq, frame_list, frame_period ) {
	var event;
	var last_frame = null;
	function anim() {
		var frame = Math.floor(Math.random()*(frame_list.length-1));
		if ( frame >= last_frame ) {
			frame++;
		}
		set_frame ( jq, frame_list[frame] );
		last_frame = frame;
		event = setTimeout ( anim, (typeof(frame_period)=="function")?frame_period():frame_period );
	}
	function stop() {
		clearTimeout(event);
	}
	event = setTimeout(anim,0);
	return stop;
}


function vibrate ( elem, intensity_x, intensity_y, period ) {
	elem = jQuery(elem);
	var event;
	var iter=0;
	var position = elem.position();
	function anim () {
		elem.css ( {left:position.left+((iter%2)*2-1)*intensity_x, top:position.top+((iter%2)*2-1)*intensity_y } );
		iter++;
	}
	function stop () {
		clearInterval ( event );
		elem.css ( {left:position.left,top:position.top} );
	}
	event = setInterval ( anim, period );
	return stop;	
}

function run_action_for ( action, duration, callback ) {
    // to create a simple delay before an action, set action to "null", and the callback be the action to be executed
	var stopper = null;
	if ( action ) { stopper = action (); }
	var event = null;
	function expired ( cancel_callback ) {
		event = null;
		if ( stopper ) { stopper (); } // stopper could be undefined if action does not have a stop event.
		if ( callback && cancel_callback != true ) {
			callback ();
		}
	}
	function stop ( cancel_callback ) {
		if ( event ) {
			clearTimeout( event );
			expired ( cancel_callback );
		}
	}
	event = setTimeout ( expired, duration );
	return stop;
}

function flicker_period () {
	return Math.floor ( Math.random() * 100 + 50 );
}

function create_trigger_on_visibility ( elem, top ) {
	elem = jQuery(elem);
	var arrowback = jQuery("#arrowback");
	var arrow_shown = false;
	function onscroll ( event ) {
		var offset = elem.offset ();
		var window_height = jQuery(window).height ();
		var elem_height = elem.height ();
		var scroll_top = jQuery(window).scrollTop ();
		if ( offset.top+top < scroll_top ) {
			if ( !arrow_shown ) {
				arrowback.show().css({opacity:0.75});
				arrow_shown = true;
			}
		} else if ( arrow_shown ) {
			arrowback.hide ();
			arrow_shown = false;
		}
		if ( (offset.top+top >= scroll_top) && (offset.top+top < scroll_top+window_height) ) {
			jQuery(window).unbind ( event );
			event.data.complete ();
		}
	}
	function start ( index, data, complete ) {
		jQuery(window).bind ( 'scroll', { complete:complete }, onscroll ).trigger ( 'scroll' );
	}
	return start;	
}


function create_trigger_on_scroll ( deviation, elem, top ) {
	if ( elem ) {
		elem = jQuery(elem);
	}
	function onscroll ( event ) {
		var offset, window_height, elem_height;
		var trigger = false;
		var trigger_delay = 0;
		if ( elem ) {
			offset = elem.offset ();
			window_height = jQuery(window).height ();
			elem_height = elem.height ();
		}
		var scroll_top = jQuery(window).scrollTop ();
		if ( elem && (offset.top+top >= scroll_top) && (offset.top+top < scroll_top+window_height) ) {
			trigger = true;
			trigger_delay = 1500;
		} else if ( deviation < 0 ) {
			if ( scroll_top <= event.data.initial_scrolltop + deviation ) {
				trigger = true;
			}
		} else {
			if ( scroll_top >= event.data.initial_scrolltop + deviation ) {
				trigger = true;
			}
		}
		if ( trigger ) {
			jQuery(window).unbind ( event );
			setTimeout ( event.data.complete, trigger_delay );
		}
	}
	function start ( index, data, complete ) {
		var initial_scrolltop = jQuery(window).scrollTop ();
		jQuery(window).bind ( 'scroll', { complete:complete, initial_scrolltop:initial_scrolltop }, onscroll ).trigger ( 'scroll' );
	}
	return start;	
}

function create_run_once_trigger () {
	var been_ran = false;
	var complete_fn = null;
	function run () {
			if ( !been_ran ) {
				been_ran = true;
				complete_fn ();
			}
	}
	function start ( index, data, complete ) {
		complete_fn = complete;
	}
	return { run_fn:run, start_fn:start }
}

function noop () {}

function custom_fade_in ( elements, duration ) {
	if ( jQuery.support.opacity ) {
		jQuery(elements).fadeIn(duration);
	} else {
		jQuery(elememts).find("img").fadeIn(duration).end().show();
	}
}

function custom_fade_out ( elements, duration ) {
	function fadeoutdone () {
		jQuery(this).parent().hide();
	}
	if ( jQuery.support.opacity ) {
		jQuery(elements).fadeOut(duration);
	} else {
		jQuery(elements).find("img").fadeOut(duration,fadeoutdone);
	}
}

function custom_set_opacity ( elements, opacity ) {
	if ( opacity <= 0 ) {
		jQuery(elements).hide ();
	} else {
		if ( jQuery.support.opacity ) {
			jQuery(elements).css ( {opacity:opacity} ).show();
		} else {
			// Assuming that jQuery is nice enough to turn opacity into filter:alpha(opacity=100) for IE8 for us.
			// We just need to make sure we're setting opacity on the image, rather than the parent div.
			jQuery(elements).find("img").css ( {opacity:opacity} ).show().end().show();
		}
	}
}

function bad_flouro_in ( elements, completion ) {
	var step=0;
	var kaz_incessant_tweak_value = 0.5;
	var steps = [
		[ 0, function(){ custom_set_opacity(elements,1.0); } ],
		[ 100, function(){ custom_set_opacity(elements,0.5); custom_fade_out(elements,100) } ],
		[ 100, function(){ custom_set_opacity(elements,1.0); } ],
		[ 50, function(){ custom_set_opacity(elements,0.5); custom_fade_out(elements,100) } ],
		[ 100, function(){ custom_set_opacity(elements,1.0); } ],
		[ 50, function(){ custom_set_opacity(elements,0.5); } ],
		[ 50, function(){ custom_set_opacity(elements,1.0); } ],
		[ 50, function(){ custom_set_opacity(elements,0.5); custom_fade_out(elements,100) } ],
		[ 250, function(){ custom_set_opacity(elements,1.0); } ],
		[ 150, function(){ custom_set_opacity(elements,0.5); } ],
		[ 300, function(){ custom_set_opacity(elements,1.0); } ],
		];
	function anim () {
		steps[step][1]();
		step++;
		if ( step < steps.length ) {
			setTimeout ( anim, steps[step][0] * kaz_incessant_tweak_value );
		} else {
			if ( completion != undefined ) { completion () };
		}
	}
	setTimeout ( anim, steps[0][0] );	
}

function flicker_opacity ( elements, min_opacity, max_opacity, period ) {
	function anim () {
		var opacity = Math.random()*(max_opacity-min_opacity)+min_opacity;
		custom_set_opacity ( elements, opacity );
		setTimeout ( anim, (typeof(period)=="function")?period():period );
	}
	anim ();
	jQuery(elements).show();
}

function blinky_the_kat ( delay ) {
	var katiablink = jQuery("#katiablink");
	function blinkonce () {
		var iter=0;
		function anim2 () {
			if ( iter%2 == 0 ) {
				katiablink.show ();
			} else {
				katiablink.hide ();
			}
			iter++;
			if ( iter < 4 ) {
				setTimeout ( anim2, 80 );
			}
		}
		anim2 ();
	}
	function anim () {
		blinkonce ();
		setTimeout ( anim, delay );
	}
	if ( delay == undefined ) {
		blinkonce ();
	} else {
		anim ();
	}
}


seq1 = [

	{ delay: 1000, func: noop },

	{ delay:create_trigger_on_visibility ( animbox, 190 ), func: noop },

	{ delay:create_trigger_on_scroll ( 10, "#animbox", 1400 ), func: function () {
		set_frame("#text1",1);
		custom_fade_out ( "#lightbeam", 300 );
		custom_fade_out ( "#text1", 500 );
		blinky_the_kat ();
	}},
	
	{ delay:600, func: function () {
		custom_fade_in ( "#lightbeam,#text2", 200 );
	}},

	{ delay:create_trigger_on_visibility ( animbox, 290 ), func: noop },
	
	{ delay:2000, func: function () {
		set_frame("#text2",1);
		custom_fade_out ( "#lightbeam", 300 );
		custom_fade_out ( "#text2", 500 );
	}},

	{ delay:600, func: function () {
		custom_fade_in ( "#lightbeam,#text3", 200 );
	}},
	
	{ delay:1000, func: noop },

	{ delay:create_trigger_on_visibility ( animbox, 390 ), func: function () {
		custom_fade_in ( "#text4", 200 );
	}},
	
	{ delay:2000, func: noop },

	{ delay:create_trigger_on_visibility ( animbox, 390 ), func: function () {
		bad_flouro_in ( "#fonz");
		blinky_the_kat ( 6000 );
	}},

	];


function run_sequence ( seq, data ) {
	var index = 0;
	function schedule () {
		var delay = seq[index].delay;
		if ( typeof(delay) == "function") {
			delay( index, data, run );
		} else {
			setTimeout ( run, delay );
		}
	}
	function run () {
		seq[index].func ( index, data );
		index ++;
		if ( index < seq.length ) {
			schedule ();
		}
	}
	schedule ();
}

function i_just_want_to_set_the_world () {
	// On fire!
	animbox.find("div.fire").each ( function ( index ) {
/* 		random_frames ( jQuery(this), [0,1,2], flicker_period ); */
		random_frames ( jQuery(this), [0,1,2], 100 );
	});
}

function animate_katia () {
	loop_frames ( jQuery("#katia"), [0, 1, 2, 3, 0, 2, 3, 0, 3, 2, 1, 3], 100 );
}

var all_smokes = animbox.find("div.smoke");
var smoke_target = animbox.find("#smoketarget");
function burst_into_flames_and_die () {
	// Scaling while doing everything else makes everything hurt. No scaling for you! One year!
	var xstart = Math.floor(Math.random()*993 + 442);
	var ystart = 1400;
	var cycle = Math.random()*200 + 1400;
	var ampl_per_tick = 1/40;
	var rise = 1/12;
/*
	var initial_scale = 0.75;
	var scale_per_tick = 0;
*/

	var initial_opacity = 0
	var opacity_per_tick = 0.0002;
	var opacity_change = 500;
	var opacity_at_change = 0.1
	var opacity_per_tick_after_change = -0.00002;

/*
    // OMG suffocating
	var initial_opacity = 0
	var opacity_per_tick = 0.002
	var opacity_change = 500;
	var opacity_at_change = 1
	var opacity_per_tick_after_change = -0.00016;
*/


	var tick_limit = 6500;
	var source_smoke = all_smokes[Math.floor(Math.random()*all_smokes.length)];
	var smoke = jQuery(source_smoke).clone().css({opacity:0}).insertBefore(smoke_target).show();
	var anim_start = Date.now();
	function anim () {
		var ticks = Date.now () - anim_start;
		if ( ticks >= tick_limit ) {
			smoke.remove ();
		} else {
			var left = xstart + Math.floor ( Math.sin ( Math.PI * ticks / cycle ) * ticks * ampl_per_tick );
			var top = ystart - Math.floor ( ticks * rise );
/*
			var scale = initial_scale + ticks * scale_per_tick;
			var scale_str = "scale("+scale.toFixed(4)+")";
*/
			var opacity = (ticks < opacity_change) ? (initial_opacity + ticks * opacity_per_tick ) : ( opacity_at_change + ( ticks - opacity_change ) * opacity_per_tick_after_change );
			smoke.css ( {
				left:left,
				top:top,
/*
				"transform":scale_str,
				"-webkit-transform":scale_str,
				"-moz-transform":scale_str,
				"-ms-transform":scale_str,
				"-o-transform":scale_str,
*/
				opacity:opacity.toFixed(2)
			} );
			setTimeout ( anim, 30 );
		}
	}
	anim ();
}



function mind_if_i_smoke () {
	// Smoke? I don't care if you
	burst_into_flames_and_die ();
	setTimeout ( mind_if_i_smoke, Math.random()*1000 );
}

function reposition_animbox () {
	var tallbox = jQuery("#tallbox");
	var tallbox_offset = tallbox.offset ();
	var tallbox_position = tallbox.position ();
	var window_width = jQuery(window).width ();
	var left = -tallbox_offset.left - Math.floor(( 1700 - window_width )/2);
	animbox.css ( {left:left, top:-tallbox_offset.top, width:window_width-left-tallbox_offset.left-1 }); // The -1 is horrible Chrome hax.
	tallbox.css ( {height:1700-tallbox_offset.top,"min-height":1700-tallbox_offset.top} );
}
jQuery (window).bind ( 'resize', reposition_animbox ).trigger('resize');

jQuery ( function () {
	jQuery("body,#wrapper,article.post").css ( {backgroundColor:"black"} );
	set_sprite_sizes ();
	jQuery (window).trigger('resize');
	jQuery("#alternatenavigation").insertAfter ( "div.entry-container" );
	i_just_want_to_set_the_world ();
	mind_if_i_smoke ();
	animate_katia ();
	flicker_opacity ( "div.flameflicker", 0.005, 0.02, 100 );
	run_sequence ( seq1, {} );
})

