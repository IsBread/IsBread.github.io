/*
    Animation code Copyright (c) 2012 Chris Cogdon
    Licensed under CC BY-SA 3.0
    See http://creativecommons.org/licenses/by-sa/3.0/ for full license.
*/

jQuery(".disablewithjavascript").hide();

var animbox = jQuery("#animbox");

var tweaks = {
	animbox_width: 1190,
	animbox_height: 960,
	flame_period: 100,
	fast_flame_period: 60, //70,
	stabby_movement_period: 35,
	stabby_raise_period: 200,
	king_anger_period: 40,
	stabby_frame_period: 5000,
	words_light_fade_in_duration: 200,
	words_fade_out_duration: 500,
	light_fade_out_duration: 300,
	scribble_fade_out_duration: 1200,
	fade_to_white_duration: 17500,
	katiawake_frame_period: 80,
	katiablink_frame_period: 80, //50,
	shake_period: 80, //100,
	shake_intensity: 8,
	top_visibility_trigger: 100,
	first_scroll_destination: 760,
	second_scroll_destination: 860,
	third_scroll_destination: 960,
	final_scroll_window_fraction: 0.2,
	nudge_scroll: 5,
	nudge_period: 10,
	scroll_movement_duration: 500,
	minimum_jumpscroll: 50,
	extra_tallbox_height: 100,
}


var smoke_tweaks = {
	smoke_elements: animbox.find("div.smoke"),
	smoke_target: animbox.find("#smoketarget"),
	start_left: 250,
	start_right: 1000,
	start_top: 740,
	start_bottom: 740,
	cycle_min: 1400,
	cycle_max: 1600,
	ampl_per_tick: 1/40,
	rise: 1/12,
	opacities: [
		{ tick: 0, opacity: 0, per_tick: 0.0004 },
		{ tick: 500, opacity: 0.2, per_tick: -0.00004 }
	],
	tick_limit: 6500,
	min_period: 0,
	max_period: 1000
}


function set_sprite_sizes ( source ) {
	source.find("div.sprite").each ( function () {
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

function step_frames ( jq, frame_list, frame_period ) {
	var event;
	var iter = 0;
	jq = jQuery(jq).show();
	function anim() {
		set_frame ( jq, frame_list[iter] );
		iter++;
		if ( iter < frame_list.length ) {
			event = setTimeout ( anim, (typeof(frame_period)=="function")?frame_period():frame_period );
		}
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

function create_trigger_on_visibility ( elem, top ) {
	elem = jQuery(elem);
	var arrowback = jQuery("#arrowback");
	var arrowforth = jQuery("#arrowforth");
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
		} else if ( offset.top+top >= scroll_top+window_height ) {
			if ( !arrow_shown ) {
				arrowforth.show().css({opacity:0.75});
				arrow_shown = true;
			}
		} else if ( arrow_shown ) {
			arrowback.hide ();
			arrowforth.hide ();
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


function animate_scrolltop ( element, destination, easing, duration ) {
	element = jQuery(element)
	var initial_position = element.scrollTop ();
	var change = destination - initial_position;
	var start_anim = Date.now ();
	function anim () {
		var ticks = Date.now() - start_anim;
		if ( ticks >= duration ) {
			element.scrollTop(destination);
		} else {
			var new_value = jQuery.easing[easing] ( null, ticks, initial_position, change, duration );
			element.scrollTop ( new_value );
			setTimeout ( anim, 1 );
		}
	}
	anim ();
}

function smooth_scroll_to_position ( elem, top ) {
	var offset = elem.offset ();
	var window_height = jQuery(window).height ();
	var elem_height = elem.height ();
	var scroll_top = jQuery(window).scrollTop ();
	if ( offset.top+top < scroll_top ) {
		animate_scrolltop ( window, offset.top+top, 'easeOutElastic', tweaks.scroll_movement_duration );
	} else if ( offset.top+top >= scroll_top+window_height ) {
		animate_scrolltop ( window, offset.top+top-window_height, 'easeOutElastic', tweaks.scroll_movement_duration );
	} else {
		animate_scrolltop ( window, scroll_top+tweaks.minimum_jumpscroll, 'easeOutElastic', tweaks.scroll_movement_duration );
	}
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

// These "custom" functions are designed to detect if browser uses IE's "alpha" instead of opacity, and will
// ask jQuery to fade the enclosed IMG rather than the DIV.

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


function livingonaprayer () {
	var event;
	function make_whoa () {
		var source_whoa = things.whoas[Math.floor(Math.random()*things.whoas.length)];
		var whoa1 = jQuery(source_whoa).clone().find("img").css({top:0}).end().css({left:Math.floor(Math.random()*1190),top:Math.floor(Math.random()*960)}).appendTo(animbox).show();
		var state=0;
		function anim () {
			state++;
			if ( state == 1 ) {
				setTimeout ( anim, 5000 );
			} else if ( state == 2 ) {
				whoa1.find("img").css({top:-59});
				custom_fade_out ( whoa1, 2000 );
				setTimeout ( anim, 3000 );
			} else if ( state == 3 ) {
				whoa1.remove ();
			}
		}
		anim ();
	}
	function make_whoa_not_war () {
		make_whoa ();
		event = setTimeout ( make_whoa_not_war, 100 );
	}
	function whoa_nelly () {
		clearTimeout ( event );
	}
	make_whoa_not_war ();
	return whoa_nelly;
}

var things = {
	katia: jQuery("#katia"),
	king: jQuery("#king"),
	stabby: jQuery("#stabby"),
	fire7: jQuery("#fire7"),
	fire8: jQuery("#fire8"),
	text7: jQuery("#text7"),
	text8: jQuery("#text8"),
	text9: jQuery("#text9"),
	text10: jQuery("#text10"),
	text11: jQuery("#text11"),
	shakebox: jQuery("#shakebox"),
	whoas: animbox.find("#text1,#text2,#text3"),
	whitemask: jQuery("#whitemask"),
	normalishbox: jQuery("#normalishbox"),
	katiawake: jQuery("#katiawake"),
	all_smokes: animbox.find("div.smoke"),
	smoke_target: animbox.find("#smoketarget"),
	alternate_navigation: jQuery("#alternatenavigation")
}
var stoppers = {}

seq1 = [

	{ delay: 1000, func: function () {
		things.king.animate ( {top:136}, 4000, 'linear' );
	}},
	{ delay: 2000, func: function () {
		stoppers.katia ();
		set_frame ( things.katia, 4 );
	}},
	{ delay: 100, func: function () {
		stoppers.katia = loop_frames ( things.katia, [5, 6, 7, 8, 5, 7, 8, 5, 8, 7, 6, 8], 100 );
	}},
	{ delay: 2000, func: noop }, 
	{ delay: create_trigger_on_visibility ( animbox, tweaks.top_visibility_trigger ), func: function () {
		stoppers.katia ();
		things.katia.hide ();
		things.fire7.show();
		things.fire8.show();
		stoppers.katia_flames = random_frames ( jQuery("#fire7,#fire8"), [0,1,2], tweaks.fast_flame_period );
		things.stabby.show ().animate ( {left:583,top:654}, tweaks.stabby_movement_period );
		things.king.animate ( {left:389,top:251}, 35 ).insertAfter(things.fire7);
		stoppers.king = loop_frames ( things.king, [1,2], tweaks.king_anger_period );
		step_frames ( things.stabby, [0,1,2,3,4,5], tweaks.stabby_frame_period );
		stoppers.flames ();
		stoppers.flames = i_just_want_to_set_the_world ( tweaks.fast_flame_period );
		stoppers.shake = shake_that_bootay ();
		animate_scrolltop ( window, jQuery(window).scrollTop()+tweaks.minimum_jumpscroll, 'easeOutElastic', tweaks.scroll_movement_duration );
		}},
	{ delay: 1000, func: function () {
		custom_fade_in ( "#lightball1,#text1", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 500, func: function () {
		custom_fade_in ( "#text2", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 800, func: function () {
		custom_fade_in ( "#text3", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 1000, func: function () {
		custom_fade_in ( "#text4", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 1250, func: function () {
		custom_fade_in ( "#text5", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 3000, func: function () {
		set_frame("#text1,#text2,#text3,#text4,#text5",1);
		custom_fade_out ( "#text1,#text2,#text3,#text4,#text5", tweaks.words_fade_out_duration );
		custom_fade_out ( "#lightball1", tweaks.light_fade_out_duration );
		things.whitemask.fadeIn ( tweaks.fade_to_white_duration, 'easeInQuad' );
	}},
	{ delay: 1000 - tweaks.stabby_raise_period - 10, func: function () {
		things.stabby.animate ( {left:578,top:614}, tweaks.stabby_raise_period );
	}},
	{ delay: tweaks.stabby_raise_period + 10, func: function () {
		things.stabby.animate ( {left:583,top:654}, tweaks.stabby_movement_period );
		smooth_scroll_to_position ( animbox, tweaks.second_scroll_destination );
	}},
	{ delay: 500, func: function () {
		custom_fade_in ( "#lightball2,#text6", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 4000, func: function () {
		custom_fade_in ( things.text7, tweaks.words_light_fade_in_duration );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 1 );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 2 );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 3 );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 4 );
		set_frame ( "#text6", 1 );
		custom_fade_out ( "#text6", tweaks.words_fade_out_duration );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 5 );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 6 );
	}},
	{ delay: 100, func: function () {
		set_frame ( things.text7, 7 );
	}},
	{ delay: 200, func: function () {
		set_frame ( things.text7, 8 );
		custom_fade_out ( "#lightball2", tweaks.light_fade_out_duration );
		custom_fade_out ( things.text7, tweaks.scribble_fade_out_duration );
	}},
	{ delay: 2500 - tweaks.stabby_raise_period - 10, func: function () {
		things.stabby.animate ( {left:578,top:614}, tweaks.stabby_raise_period );
	}},
	{ delay: tweaks.stabby_raise_period + 10, func: function () {
		things.stabby.animate ( {left:583,top:654}, tweaks.stabby_movement_period );
		smooth_scroll_to_position ( animbox, tweaks.third_scroll_destination );
	}},
	{ delay: 500, func: function () {
		custom_fade_in ( "#text11,#lightball2", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 800, func: function () {
		set_frame ( things.text11, 1 );
		custom_fade_out ( things.text11, tweaks.words_fade_out_duration );
	}},
	{ delay: 700, func: function () {
		custom_fade_in ( "#text8,#lightball2", tweaks.words_light_fade_in_duration );
	}},
	{ delay: 2000, func: function () {
		custom_fade_in ( things.text9, tweaks.words_light_fade_in_duration );
	}},
	{ delay: 2000, func: function () {
		set_frame ( "#text8,#text9", 1 );
		custom_fade_out ( "#lightball3", tweaks.light_fade_out_duration );
		custom_fade_out ( "#text8,#text9", tweaks.words_fade_out_duration );
	}},
	{ delay: 1500 - tweaks.stabby_raise_period - 10, func: function () {
		things.stabby.animate ( {left:578,top:614}, tweaks.stabby_raise_period );
	}},
	{ delay: tweaks.stabby_raise_period + 10 , func: function () {
		things.stabby.animate ( {left:583,top:654}, tweaks.stabby_movement_period );
		var window_height = jQuery(window).height ();
		smooth_scroll_to_position ( animbox, tweaks.animbox_height+jQuery(window).height()*tweaks.final_scroll_window_fraction )
	}},
	{ delay: 500, func: function () {
		custom_fade_in ( things.text10, tweaks.words_light_fade_in_duration );
	}},
	{ delay: 5000, func: function () {
		animbox.hide ();
		things.alternate_navigation.hide ();
		things.normalishbox.show ();
		restore_category ();
		restore_background ();
		stoppers.flames ();
		stoppers.king ();
		stoppers.katia_flames ();
		stoppers.shake ();
		stoppers.smoke ();
		jQuery (window).unbind ( 'resize', reposition_animbox );
		step_frames ( things.katiawake, [0,1,2,3,4,5], tweaks.katiawake_frame_period );
	}},
	{ delay: 2500, func: function () {
		step_frames ( things.katiawake, [6,5,6,5], tweaks.katiablink_frame_period );
	}}
	
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

function shake_that_bootay () {
	var event;
	var orig_pos = things.shakebox.position ();
	function shake () {
		things.shakebox.css ( {left:orig_pos.left+Math.floor((Math.random()-0.5)*tweaks.shake_intensity), top:orig_pos.top+Math.floor((Math.random()-0.5)*tweaks.shake_intensity)} );
		event = setTimeout ( shake, tweaks.shake_period );
	}
	function stop () {
		clearTimeout ( event );
	}
	shake ();
	return stop;
}

function i_just_want_to_set_the_world ( period ) {
	// On fire!
	var stoppers = [];
	animbox.find("div.fire").each ( function ( index ) {
		var stopper = random_frames ( jQuery(this), [0,1,2], period );
		stoppers.push ( stopper );
	});
	function stop () {
		jQuery.each(stoppers, function ( index, stopper ) {
			stopper ();
		});
	}
	return stop;
}

function have_a_smoke () {

	var xstart = Math.floor(Math.random()*(smoke_tweaks.start_right-smoke_tweaks.start_left)) + smoke_tweaks.start_left;
	var ystart = Math.floor(Math.random()*(smoke_tweaks.start_bottom-smoke_tweaks.start_top)) + smoke_tweaks.start_top;
	var cycle = Math.random()*(smoke_tweaks.cycle_max-smoke_tweaks.cycle_min)+smoke_tweaks.cycle_min;
	
	var source_smoke = smoke_tweaks.smoke_elements[Math.floor(Math.random()*smoke_tweaks.smoke_elements.length)];
	var smoke = jQuery(source_smoke).clone().css({opacity:0}).insertBefore(smoke_tweaks.smoke_target).show();
	var anim_start = Date.now();
	
	var opacity_iter = 0;
	
	function anim () {
		var ticks = Date.now () - anim_start;
		if ( ticks >= smoke_tweaks.tick_limit ) {
			smoke.remove ();
		} else {

			while ( opacity_iter < smoke_tweaks.opacities.length - 1  && ticks >= smoke_tweaks.opacities[opacity_iter+1].tick ) {
				opacity_iter++;
			}
			opacity_values = smoke_tweaks.opacities[opacity_iter];
			
			var left = xstart + Math.floor ( Math.sin ( Math.PI * ticks / cycle ) * ticks * smoke_tweaks.ampl_per_tick );
			var top = ystart - Math.floor ( ticks * smoke_tweaks.rise );
			var opacity = opacity_values.opacity + ( ticks - opacity_values.tick ) * opacity_values.per_tick;

			smoke.css ( {
				left:left,
				top:top,
				opacity:opacity.toFixed(2)
			} );
			setTimeout ( anim, smoke_tweaks.animation_period );
		}
	}
	anim ();
}

function start_smoke () {
	// The imperial mage warns you that smoking is hazard to your health, and to those Kaji'it around you.
	var event;
	function smoke () {
		have_a_smoke ();
		event = setTimeout ( smoke, Math.random()*(smoke_tweaks.max_period-smoke_tweaks.min_period) + smoke_tweaks.min_period );
	}
	function smoke_break () {
		clearTimeout ( event );
	}
	smoke ();
	return smoke_break;
}


function reposition_animbox () {
	var tallbox = jQuery("#tallbox");
	var tallbox_offset = tallbox.offset ();
	var tallbox_position = tallbox.position ();
	var window_width = jQuery(window).width ();
	var left = -tallbox_offset.left - Math.floor(( tweaks.animbox_width - window_width )/2);
	animbox.css ( {left:left, top:-tallbox_offset.top, width:window_width-left-tallbox_offset.left-1 }); // The -1 is horrible Chrome hax.
	tallbox.css ( {height:tweaks.animbox_height-tallbox_offset.top+tweaks.extra_tallbox_height,"min-height":tweaks.animbox_height-tallbox_offset.top+tweaks.extra_tallbox_height} );
}
jQuery (window).bind ( 'resize', reposition_animbox ).trigger('resize');


function blackify_background () {
	jQuery("body,#wrapper,article.post").css ( "backgroundColor", "black" );
}

function restore_background () {
	jQuery("body,#wrapper,article.post").css ( "backgroundColor", "" );
}

function restore_category () {
	jQuery("div.category-dream").removeClass ( "category-dream" );
}

jQuery ( function () {
	blackify_background ();
	set_sprite_sizes ( animbox );
	set_sprite_sizes ( things.normalishbox );
	jQuery("#alternatenavigation").insertAfter ( "div.entry-container" );
	stoppers.flames = i_just_want_to_set_the_world ( tweaks.flame_period );
	stoppers.smoke = start_smoke ();
	stoppers.katia = loop_frames ( things.katia, [0, 1, 2, 3, 0, 2, 3, 0, 3, 2, 1, 3], 100 );
	/* livingonaprayer (); */
	run_sequence ( seq1, {} );
})

