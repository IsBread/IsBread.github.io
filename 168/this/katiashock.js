/*
    Animation code Copyright (c) 2012 Chris Cogdon
    Permission to use for any purpose granted as long as the copyright holder is cited.
*/

jQuery(".disablewithjavascript").css ( {visibility:"hidden"} );

var step_sprites = [
	{ id:"step45", parentid:"roombox", afterid:"endroom", file:"story1183i.gif", left:286, top:265, _class:"step" },
	{ id:"step46", parentid:"roombox", afterid:"step45", file:"story1183j.gif", left:258, top:330, _class:"step" },
	{ id:"step47", parentid:"roombox", afterid:"step46", file:"story1183k.gif", left:222, top:415, _class:"step" },
	{ id:"step48", parentid:"roombox", afterid:"step47", file:"story1183l.gif", left:170, top:531, _class:"step" }
]

var bigking_sprites = [
	{ id:"king24", parentid:"bigking", file:"story1182j.gif", left:82, top:70, _class:"kingbit" }, //0
	{ id:"king23", parentid:"bigking", file:"story1182i.gif", left:618, top:157, _class:"kingbit" }, //1
	{ id:"king22", parentid:"bigking", file:"story1182h.gif", left:300, top:16, _class:"kingbit" }, //2
	{ id:"king30", parentid:"bigking", file:"story1182p.gif", left:-457, top:698, _class:"kingbit" }, //3
	{ id:"king29", parentid:"bigking", file:"story1182o.gif", left:-447, top:298, _class:"kingbit" }, //4
	{ id:"king28", parentid:"bigking", file:"story1182n.gif", left:230, top:114, _class:"kingbit" }, //5
	{ id:"king27", parentid:"bigking", file:"story1182m.gif", left:180, top:-52, _class:"kingbit" }, //6
	{ id:"king26", parentid:"bigking", file:"story1182l.gif", left:358, top:-36, _class:"kingbit" }, //7
	{ id:"king25", parentid:"bigking", file:"story1182k.gif", left:588, top:391, _class:"kingbit" }, //8
	{ id:"king21", parentid:"bigking", file:"story1182g.gif", left:81, top:784, _class:"kingbit" }, //9
	{ id:"king20", parentid:"bigking", file:"story1182f.gif", left:583, top:693, _class:"kingbit" }, //10
	{ id:"king19", parentid:"bigking", file:"story1182e.gif", left:136, top:803, _class:"kingbit" }, //11
	{ id:"king18", parentid:"bigking", file:"story1182d.gif", left:298, top:1098, _class:"kingbit" }, //12
	{ id:"king17", parentid:"bigking", file:"story1182c.gif", left:161, top:405, _class:"kingbit" }, //13
	{ id:"king16", parentid:"bigking", file:"story1182b.gif", left:281, top:877, _class:"kingbit" }, //14
	{ id:"king15", parentid:"bigking", file:"story1182a.gif", left:289, top:807, _class:"kingbit" } //15
];

var kingflame_sprite =
	{ id:"kingflame", parentid:"bigking", afterid:"king16", file:"story1179.gif", left:467, top:838, width:116, height:194, animx:116, animy:0, _class:"kingbit" };
	
var kinghead_sprite =
	{ id:"kinghead", parentid:"kingtop", file:"story1177.gif", left:286, top:315, width:56, height:97, animx:56, animy:0, _class:"kingbit" };
	
var kingbody_sprite =
	{ id:"kingbody", parentid:"kingbottom", file:"story1178.gif", left:230, top:326, width:432, height:360, animx:0, animy:360, _class:"kingbit" };

var midking_sprites = [
	{ id:"king6", parentid:"kingbottom", file:"story1180f.gif", left:155, top:142, _class:"kingbit" },
	{ id:"king7", parentid:"kingbottom", file:"story1180g.gif", left:310, top:138, _class:"kingbit" },
	{ id:"king1", parentid:"kingbottom", file:"story1180a.gif", left:230, top:347, _class:"kingbit" },
	{ id:"king2", parentid:"kingbottom", file:"story1180b.gif", left:201, top:512, _class:"kingbit" },
	{ id:"king3", parentid:"kingbottom", file:"story1180c.gif", left:302, top:325, _class:"kingbit" },
	{ id:"king4", parentid:"kingbottom", file:"story1180d.gif", left:14, top:317, _class:"kingbit" },
	{ id:"king5", parentid:"kingbottom", file:"story1180e.gif", left:255, top:396, _class:"kingbit" },
	{ id:"king13", parentid:"kingbottom", file:"story1181f.gif", left:138, top:194, _class:"kingbit" },
	{ id:"king14", parentid:"kingbottom", file:"story1181g.gif", left:358, top:205, _class:"kingbit" },
	{ id:"king8", parentid:"kingbottom", file:"story1181a.gif", left:227, top:356, _class:"kingbit" },
	{ id:"king9", parentid:"kingbottom", file:"story1181b.gif", left:149, top:546, _class:"kingbit" },
	{ id:"king10", parentid:"kingbottom", file:"story1181c.gif", left:310, top:308, _class:"kingbit" },
	{ id:"king11", parentid:"kingbottom", file:"story1181d.gif", left:0, top:297, _class:"kingbit" },
	{ id:"king12", parentid:"kingbottom", file:"story1181e.gif", left:236, top:386, _class:"kingbit" }
];

var katia_sprite =
	{ id:"katia", parentid:"animbox", file:"story1175.gif", left:610, top:566, width:137, height:219, animx:137, animy:0 };
var brazier_sprite =
	{ id:"brazier", parentid:"roombox", file:"story1173.gif", left:730, top:536, width:129, height:219, animx:129, animy:0 };
var lantern_sprite = 
	{ id:"lantern", parentid:"roombox", left:580, top:734 };
	
var kingtop_sprite = 
	{ id:"kingtop", parentid:"midking", left:0, top:0 };
var kingbottom_sprite = 
	{ id:"kingbottom", parentid:"midking", left:0, top:0 };
var midking_sprite =
	{ id:"midking", parentid:"animbox", left:0, top:90 };
var bigking_sprite =
	{ id:"bigking", parentid:"animbox", left:-826, top:-62 };
	
var animbox_sprite = { id:"animbox", left:-15, top:0 };

var loaded_sprites = [].concat ( step_sprites, bigking_sprites, midking_sprites, [kingbody_sprite,kingflame_sprite,kinghead_sprite,katia_sprite,brazier_sprite,lantern_sprite,kingtop_sprite,kingbottom_sprite,bigking_sprite,midking_sprite,animbox_sprite] );

var midking_2_sprites = midking_sprites.slice(0,7);

var midking_3_sprites = [];
jQuery.each ( [0,1,7,8,9,10,11,12,13], function ( index, value ) { midking_3_sprites.push ( midking_sprites[value] ); } );


function load_sprites () {
	jQuery.each(loaded_sprites, function ( index ) {
		this.div = document.getElementById(this.id);
		if ( this.div == undefined ) {
			var parent=jQuery(document.getElementById(this.parentid));
			var _class = (this._class!=undefined)?this._class:"";
			var html='<div id="' + this.id + '" class="sprite '+_class+'"><img id="' + this.id + '-p" src="../../../this/' + this.file + '" />'; //i fixed this by adding ../../.. in src="/this/' lmao
			if ( this.afterid != undefined ) {
				jQuery(document.getElementById(this.afterid)).after ( html );
			} else {
				parent.append ( html );
			}
			this.div = document.getElementById(this.id);
			jQuery(this.div).css ( {left:this.left, top:this.top, overflow:(this.animx!=undefined)?"hidden":"visible"} );
		}
		this.img = document.getElementById(this.id+"-p");
		if ( this.width == undefined ) {
			if ( this.img != undefined ) {
				jQuery(this.img).load ( {parent:this.div,sprite:this}, function ( event ) {
					event.data.sprite.width = this.width;
					event.data.sprite.height = this.height;
					jQuery(event.data.parent).css ( {width:this.width, height:this.height} );
				});
				if ( this.img.complete ) {
					jQuery(this.img).trigger("load");
				}
			}
		} else {
			jQuery(this.div).css ( {width:this.width, height:this.height} );
		}
	});
}

function set_frame ( sprite, frame ) {
	jQuery(sprite.img).css ( { left:sprite.animx*-frame, top:sprite.animy*-frame } );
}

function linear ( progress ) {
	return progress;
}

function ease_in ( progress ) {
	return Math.pow ( progress, 2 );
}

function ease_out ( progress ) {
	return - Math.pow ( progress-1, 2 ) + 1
}

function animate_scale ( sprite, delay, from_scale, to_scale, duration, ease_fn, complete ) {
	var anim_start = Date.now();
	if ( ease_fn == undefined ) {
		ease_fn = linear;
	}
	function anim () {
		var progress = Math.min ( (Date.now()-anim_start)/duration, 1 );
		var ease = ease_fn ( progress );
		var scale = from_scale * ( 1 - ease ) + to_scale * ease;
		jQuery(sprite.div).css ( {
			"transform":"scale(" + scale.toFixed(4) + ")", 
			"-webkit-transform":"scale(" + scale.toFixed(4) + ")", 
			"-moz-transform":"scale(" + scale.toFixed(4) + ")", 
			"-ms-transform":"scale(" + scale.toFixed(4) + ")", 
			"-o-transform":"scale(" + scale.toFixed(4) + ")" 
		} );
		if ( progress < 1 ) {
			setTimeout ( anim, 20 );
		} else {
			if ( complete != undefined ) {
				complete ();
			}
		}
	}
	if ( delay > 0 ) {
		jQuery(sprite.div).css ( {
			"transform":"scale(" + from_scale.toFixed(4) + ")", 
			"-webkit-transform":"scale(" + from_scale.toFixed(4) + ")", 
			"-moz-transform":"scale(" + from_scale.toFixed(4) + ")", 
			"-ms-transform":"scale(" + from_scale.toFixed(4) + ")", 
			"-o-transform":"scale(" + from_scale.toFixed(4) + ")" 
		} );
		setTimeout ( anim, delay );
	} else {
		anim ();
	}
}

function animate_position ( sprite, delay, from_left, from_top, to_left, to_top, duration, ease_fn, complete ) {
	var anim_start = Date.now();
	if ( ease_fn == undefined ) {
		ease_fn = linear;
	}
	function anim () {
		var progress = Math.min ( (Date.now()-anim_start)/duration, 1 );
		var ease = ease_fn ( progress );
		var left = from_left * ( 1 - ease ) + to_left * ease;
		var top = from_top * ( 1 - ease ) + to_top * ease;
		jQuery(sprite.div).css ( {left:left,top:top} );
		if ( progress < 1 ) {
			setTimeout ( anim, 20 );
		} else {
			if ( complete != undefined ) {
				complete ();
			}
		}
	}
	if ( delay > 0 ) {
		jQuery(sprite.div).css ( {left:from_left,top:from_top} );
		setTimeout ( anim, delay );
	} else {
		anim ();
	}
}

function loop_frames ( sprite, delay, duration, frame_list, frame_duration, final_frame, complete ) {
	var anim_start = Date.now();
	var frame_index = 0;
	function anim () {
		if ( Date.now()-anim_start >= duration ) {
			set_frame ( sprite, final_frame );
			if ( complete != undefined ) {
				complete ();
			}
		} else {
			set_frame ( sprite, frame_list[frame_index] )
			frame_index++;
			if ( frame_index >= frame_list.length ) {
				frame_index = 0;
			}
			setTimeout ( anim, frame_duration );
		}
	}
	setTimeout ( anim, delay );
}


var animate_brazier_control = false;  
function animate_brazier() {
	if ( animate_brazier_control ) { return; }
	animate_brazier_control = true;
	var last_frame = -1;
	function anim () {
		if ( !animate_brazier_control ) { return; }
		var new_frame = Math.floor(Math.random()*2);
		if ( new_frame >= last_frame ) {
			new_frame ++;
		}
		set_frame ( brazier_sprite, new_frame );
		last_frame = new_frame;
		setTimeout ( anim, 80 + Math.floor(Math.random()*40) );
	}
	anim ();
}
function stop_animate_brazier () {
	animate_brazier_control = false;
}

function flicker_elem_opacity ( elem, min, max, period ) {
	elem=jQuery(elem);
	elem.css ( {visibility:"visible"});
	function anim () {
		var opacity = min + Math.random()*(max-min);
		elem.css ( {opacity:opacity.toFixed(2) } );
		setTimeout ( anim, period );
	}
	anim ();
}

var stwiggle_ampl = 10;
var scatter_steps = false;
var stwiggle_period = 10000;
function start_stwiggles () {
	var anim_start = new Date();
	var stwiggle_length = 9;
	var stwiggle_anim_period = 40;
	function anim () {
		var phase = ( new Date()-anim_start ) / stwiggle_period;
		if ( scatter_steps ) {
			stwiggle_ampl += 100;
		}
		jQuery.each ( step_sprites, function ( index, sprite ) {
			var ampl = -( (3-index)*10 + stwiggle_ampl ); // negative to get the bottom step leading
			var left = sprite.left + Math.floor ( Math.cos ( Math.PI * ( phase + ( index / stwiggle_length ))) * ampl );
			jQuery ( sprite.div ).css ( {left:left} );
		});
		if ( stwiggle_ampl < 1500 || Math.abs(Math.cos( Math.PI * phase )) < 0.9 ) {
			setTimeout ( anim, 20 );
		}
	}
	anim ();
}

function boingball_head () {
	var kinghead_jq = jQuery("#kinghead");
	var kingheadp_jq = jQuery("#kingheadp");
	var frame = 0;
	var anim_ref = new Date();
	kinghead_jq.css ( {visibility:"visible"} );
	function anim () {
		var ticks = new Date - anim_ref;
		kingheadp_jq.css ( {left:-56*frame} )
		kinghead_jq.css ( {top:Math.floor ( 500 + 200 * Math.pow( (ticks%1000)/500 - 1, 2 ) ), left: Math.floor ( Math.abs((ticks%9600)/4800-1) * 809 )   } );
		frame = (frame+1) % 12;
		setTimeout ( anim, 40 );
	}
	anim ();
}


var flicker_shadow_control = false;
function flicker_shadow ( type ) {
	if ( flicker_shadow_control == true ) {
		return;
	}
	flicker_shadow_control = true;
	var kingshadowx_jq = jQuery("#kingshadowx");
	var iter = 0;
	function anim () {
		if ( !flicker_shadow_control ) { return; }
		var scale = 1;
		var vskew = 0;
		if ( type == "flicker" ) {
			scale = (Math.random()*2-1) * 0.025 + 1;
			vskew = (Math.random()*2-1) * 0.15;
		} else {
			vskew = (iter%2) * 0.5;
		}
		kingshadowx_jq.css ( { 
			"transform": "scale("+scale.toFixed(4)+") skewy(" + vskew.toFixed(2) + "deg)",
			"-webkit-transform": "scale("+scale.toFixed(4)+") skew(0deg," + vskew.toFixed(2) + "deg)",
			"-moz-transform": "scale("+scale.toFixed(4)+") skewy(" + vskew.toFixed(2) + "deg)",
			"-ms-transform": "scale("+scale.toFixed(4)+") skew(0deg," + vskew.toFixed(2) + "deg)", 
			"-o-transform": "scale("+scale.toFixed(4)+") skew(0deg," + vskew.toFixed(2) + "deg)" 
		} );
		iter++;
		setTimeout ( anim, (type=="flicker")?100:10 );
	}
	anim ();
}
function stop_flicker_shadow () {
	flicker_shadow_control = false;
	jQuery("#kingshadow").css ( {visibility:"hidden"} );
}


var kingflame_control = false;
function animate_kingflame () {
	if ( kingflame_control == true ) {
		return;
	}
	kingflame_control = true;
	var frame = -1;
	function anim () {
		if ( !kingflame_control ) { return; }
		if ( frame == -1 ) {
			jQuery(kingflame_sprite.div).css ( {visibility:"visible"} );
		}
		frame++;
		if ( frame > 8 ) {
			frame = 4;
		}
		set_frame ( kingflame_sprite, frame );
		setTimeout ( anim, (frame<4)?50:100 );
	}
	anim (); 
}
function stop_animate_kingflame () {
	kingflame_control = false;
}

function animate_kingbody_and_head () {
	var body_frame = 0;
	var head_frame = -1;
	jQuery(kingbody_sprite.div).css ( {visibility:"visible"} );
	animate_position ( kingbody_sprite, 0, 230, 326, 210, 326, 1500, ease_out );
	function anim_body () {
		body_frame++;
		set_frame ( kingbody_sprite, body_frame );
		if ( body_frame < 6 ) {
			setTimeout ( anim_body, 100 );
		} else {
			setTimeout ( anim_head, 100 );
			animate_position ( kinghead_sprite, 0, 286, 295, 286, 315, 1000, linear );
		}
	}
	function anim_head () {
		if ( head_frame == -1 ) {
			jQuery(kinghead_sprite.div).css ( {visibility:"visible"} );
		}
		head_frame++;
		set_frame ( kinghead_sprite, head_frame%12 );
		if ( head_frame == 60 ) {
			animate_kingflame ();
		}
		if ( head_frame < 71 ) {
			setTimeout ( anim_head, Math.floor ( 30 - head_frame/3 ) );
		} else {
			head_frame = 11;
			setTimeout ( anim_head_final, 20 );
		}
	}
	function anim_head_final () {
		head_frame++;
		set_frame ( kinghead_sprite, head_frame );
		if ( head_frame < 14 ) {
			setTimeout ( anim_head_final, 200 );
		} else { 
/* 			setTimeout ( animate_kingflame, 400 ); */
			run_sequence ( seq2 );
		}
	}
	anim_body ();
}


function show_midking_1 () {
	jQuery(kingflame_sprite.div).appendTo ( jQuery("#kingbottom") ).css ( {left:240,top:222} );
	jQuery(kinghead_sprite.div).appendTo ( jQuery("#kingbottom") ).css ( {left:286,top:315} );
	animate_kingbody_and_head ();
}


function show_midking_2 () {
	jQuery("#kingbody").css ( {visibility:"hidden"} );
	jQuery.each ( midking_2_sprites, function () {
		jQuery(this.div).css ( {visibility:"visible" });
	});
	vibrate_sprite ( animbox_sprite, 200, 2, 80 );
	animate_scale ( midking_sprites[0], 0, 0.8, 1.0, 100, ease_in );
	animate_scale ( midking_sprites[1], 0, 0.8, 1.0, 100, ease_in );
	animate_scale ( midking_sprites[4], 0, 0.8, 1.0, 200, ease_out );
	animate_scale ( midking_sprites[5], 0, 0.8, 1.0, 200, ease_out );
	animate_scale ( midking_sprites[2], 0, 0.8, 1.0, 300, ease_out );
	animate_scale ( midking_sprites[3], 0, 0.8, 1.0, 300, ease_out );
	animate_scale ( midking_sprites[6], 0, 0.8, 1.0, 300, ease_out );
	animate_position ( midking_sprite, 0, 0, 90, 50, 90, 300, ease_out );
	
	jQuery(kingflame_sprite.div).appendTo ( jQuery("#midking") ).css ( {left:243,top:214} );
	jQuery(kinghead_sprite.div).appendTo ( jQuery("#midking") ).css ( {left:292,top:307} );
}

function show_midking_3 () {
	jQuery.each( midking_2_sprites, function () {
		jQuery(this.div).css ( {visibility:"hidden"} );
	} );
	jQuery.each ( midking_3_sprites, function () {
		jQuery(this.div).css ( {visibility:"visible" });
	})
	vibrate_sprite ( animbox_sprite, 200, 2, 80 );
	animate_scale ( midking_sprites[7], 0, 0.8, 1.0, 100, ease_in );
	animate_scale ( midking_sprites[8], 0, 0.8, 1.0, 100, ease_in );
	animate_scale ( midking_sprites[11], 0, 0.8, 1.0, 200, ease_out );
	animate_scale ( midking_sprites[12], 0, 0.8, 1.0, 200, ease_out );
	animate_scale ( midking_sprites[9], 0, 0.8, 1.0, 300, ease_out );
	animate_scale ( midking_sprites[10], 0, 0.8, 1.0, 300, ease_out );
	animate_scale ( midking_sprites[13], 0, 0.8, 1.0, 300, ease_out );
	animate_position ( midking_sprite, 0, 50, 90, 100, 90, 300, ease_out );
	
	jQuery("#king6").css ( {left:185,top:83} );
	jQuery("#king7").css ( {left:328,top:81} );
	jQuery(kingflame_sprite.div).appendTo ( jQuery("#midking") ).css ( {left:254,top:210} );
	jQuery(kinghead_sprite.div).appendTo ( jQuery("#midking") ).css ( {left:303,top:308} );
}

function show_bigking () {
	jQuery.each ( [kinghead_sprite].concat( midking_3_sprites ), function () {
		jQuery ( this.div ).css ( {visibility:"hidden"} );
	} );
	jQuery(kingflame_sprite.div).insertAfter ( "#king16" ).css ( {left:467, top:838,} );
	jQuery.each ( bigking_sprites, function () {
		jQuery(this.div).css ( {visibility:"visible" });
	});
	vibrate_sprite ( animbox_sprite, 500, 2, 80 );
	animate_scale ( bigking_sprites[15], 0, 0.5, 1.0, 100, ease_out );
	animate_scale ( bigking_sprites[10], 0, 0.5, 1.0, 100, ease_out );
	animate_scale ( bigking_sprites[11], 0, 0.5, 1.0, 100, ease_out );
	animate_scale ( bigking_sprites[9], 0, 0.5, 1.0, 200, ease_out );
	animate_scale ( bigking_sprites[12], 0, 0.5, 1.0, 200, ease_out );
	animate_scale ( bigking_sprites[14], 0, 0.5, 1.0, 200, ease_out );
	animate_scale ( bigking_sprites[2], 0, 0.5, 1.0, 300, ease_in );
	animate_scale ( bigking_sprites[13], 0, 0.5, 1.0, 300, ease_out );
	animate_scale ( bigking_sprites[0], 0, 0.5, 1.0, 400, ease_in );
	animate_scale ( bigking_sprites[1], 0, 0.5, 1.0, 400, ease_in );
	
/*
	animate_scale ( bigking_sprites[8], 0, 0.5, 1.0, 1100, ease_out );
	animate_scale ( bigking_sprites[7], 0, 0.5, 1.0, 1000, ease_out );
	animate_scale ( bigking_sprites[6], 0, 0.5, 1.0, 900, ease_out );
	animate_scale ( bigking_sprites[5], 0, 0.5, 1.0, 800, ease_out );
	animate_scale ( bigking_sprites[4], 0, 0.5, 1.0, 700, ease_out );
	animate_scale ( bigking_sprites[3], 0, 0.5, 1.0, 600, ease_out );
*/

	animate_scale ( bigking_sprites[8], 0, 0.5, 1.0, 3600, ease_out );
	animate_scale ( bigking_sprites[7], 0, 0.5, 1.0, 3400, ease_out );
	animate_scale ( bigking_sprites[6], 0, 0.5, 1.0, 3200, ease_out );
	animate_scale ( bigking_sprites[5], 0, 0.5, 1.0, 3000, ease_out );
	animate_scale ( bigking_sprites[4], 0, 0.5, 1.0, 2800, ease_out );
	animate_scale ( bigking_sprites[3], 0, 0.5, 1.0, 2600, ease_out );
	
	function twitch () {
		var spriteindex = Math.floor ( Math.random() * bigking_sprites.length );
		var sprite = bigking_sprites[spriteindex];
		vibrate_sprite ( sprite, 500, 2, 80 );
		setTimeout ( twitch, Math.random()*1000 );
	}
	twitch ();
}


var seq1 = [
	{ delay:2000, func: function () { flicker_shadow_control=false; } },
	{ delay:1000, func: function () { flicker_shadow ( "vibrate" ); } },
	{ delay:500, func: function () { jQuery("#kingshadowp").css ( {top:-156} ); } },
	{ delay:200, func: function () { flicker_shadow_control=false; } },
	{ delay:2000, func: function () { flicker_shadow ( "vibrate" ); } },
	{ delay:500, func: function () { flicker_shadow_control=false; jQuery("#kingshadowp").css ( {top:-312} ); } },
	{ delay:100, func: function () { set_frame ( katia_sprite, 1 ); jQuery("#kingshadowp").css ( {top:-468} );} },
	{ delay:1000, func: function () { set_frame ( katia_sprite, 2 ); move_sprite ( katia_sprite, 20, -7 ); stop_flicker_shadow(); show_midking_1(); } },
	{ delay:100, func: function () { set_frame ( katia_sprite, 3 ); } },
]

var seq2 = [
	{ delay: 3000, func: function () { jQuery("#contrib2").slideDown(); } },
	{ delay: 5000, func: function () { loop_frames ( katia_sprite, 0, 4800, [4,5], 150, 4 ); } },
	{ delay: 1800, func: function () { jQuery("#contrib2").fadeOut(3000); } },
	{ delay: 3000, func: function () { vibrate_sprite ( kingbottom_sprite, 200, 2, 80 ); } },
	{ delay: 200, func: function () { set_frame ( katia_sprite, 6 ); move_sprite ( katia_sprite, 20, -7 ); vibrate_sprite(katia_sprite,200,1,80); show_midking_2(); stwiggle_ampl=20; } },
	{ delay: 3000, func: function () { jQuery("#contrib3").slideDown(); } },
	{ delay: 5000, func: function () { loop_frames ( katia_sprite, 0, 4800, [7,8], 100, 8 ); } },
	{ delay: 1800, func: function () { jQuery("#contrib3").fadeOut(3000); } },
	{ delay: 3000, func: function () { vibrate_sprite ( kingbottom_sprite, 200, 2, 80); } },
	{ delay: 200, func: function () { 
				set_frame ( katia_sprite, 9 ); // This might not happen if the loop_frames is still running. same with the previous one, too.
				move_sprite ( katia_sprite, 20, -7 ); 
				vibrate_sprite(katia_sprite,400,1,80); 
				move_sprite ( brazier_sprite, 10, 0 ); 
				vibrate_sprite(brazier_sprite,300,2,150); 
				show_midking_3(); 
				stwiggle_ampl=30;
				activate_nextlink (); 
			} },
	{ delay: 400, func: function () { vibrate_sprite(katia_sprite,3000,1,80); jQuery("#contrib3").fadeOut(2000); } }, // We need to be able to cancel this in case the next button is pushed
]


var nextlink;
var fakelink;
var standinline;
function mask_nextlink () {
	var nextline = jQuery("div.entry-container ~ b");
	if ( nextline.length == 0 ) {
		standinline = jQuery ( '<br><b><span style="color:#A9A9A9;font-family:Verdana,Geneva,sans-serif;font-size:32px;font-weight:bold">&gt <a href="#">&ndash;&gt;</a></span></b>');
		jQuery("div.entry-container").after ( standinline );
		nextline = standinline;
	}
	nextlink = nextline.find("a");
	var nextlink_text = nextlink.text()
	if ( ! nextlink_text ) {
		nextlink_text = "->";
	}
	fakelink = jQuery('<span style="color:blue;font-family:Verdana,Geneva,sans-serif;font-size:32px;font-weight:bold;text-decoration:underline;cursor:help"></span>').text(nextlink_text);
	nextline.append ( fakelink );
	nextlink.hide ();
}
function activate_nextlink () {
	fakelink
		.css ( { cursor:"pointer" } )
		.click ( function () {
			restore_nextlink ();
			run_sequence ( seq3 );
		});
}
function restore_nextlink () {
	fakelink.hide ();
	nextlink.show ();
	jQuery(standinline).hide ();
}

function vibrate_sprite ( sprite, duration, magnitude, period ) {
	var anim_start = Date.now();
	var iter=0
	function anim () {
		if ( duration!=undefined && Date.now()-anim_start >= duration ) {
			jQuery(sprite.div).css ( {left:sprite.left} );
			return;
		} else {
			jQuery(sprite.div).css ( {left:sprite.left+((iter%2)*magnitude*2)-magnitude} );
			iter++;
			setTimeout(anim,period/2);
		}
	}
	anim ();
}

function vibrate_sprite_vertical ( sprite, duration, magnitude, period ) {
	var anim_start = Date.now();
	var iter=0
	function anim () {
		if ( duration!=undefined && Date.now()-anim_start >= duration ) {
			jQuery(sprite.div).css ( {top:sprite.top} );
			return;
		} else {
			jQuery(sprite.div).css ( {top:sprite.top+((iter%2)*magnitude*2)-magnitude} );
			iter++;
			setTimeout(anim,period/2);
		}
	}
	anim ();
}


function move_sprite ( sprite, x, y ) {
	sprite.left += x;
	sprite.top += y;
	jQuery(sprite.div).css ( {left:sprite.left,top:sprite.top } );
}

var seq3 = [
	{ delay: 0, func: function () { jQuery("#contrib4").fadeIn(250); } },
	{ delay: 5000, func: function () { set_frame ( katia_sprite, 10 ); jQuery('.crappy-blue-link').show(); } },
	{ delay: 1000, func: function () { set_frame ( katia_sprite, 11 ); } },
	{ delay: 1000, func: function () { set_frame ( katia_sprite, 12 ); move_sprite ( brazier_sprite, 6, 0 ); } },
	{ delay: 100, func: function () { set_frame ( katia_sprite, 13 ); move_sprite ( brazier_sprite, 3, 0 ); } },
	{ delay: 1772 /* sqrt(pi) */, func: function () {
			jQuery("#contrib4").fadeOut('fast');
			set_frame ( katia_sprite, 9 ); 
			move_sprite ( katia_sprite, 20, -7 ); 
			vibrate_sprite(katia_sprite,30000,1,80);
			flicker_elem_opacity ( "#katia-g", 0.02, 0.1, 80 );
			vibrate_sprite_vertical ( bigking_sprites[14], 30000, 2, 100);
			vibrate_sprite_vertical ( bigking_sprites[12], 30000, -2, 100);
			stop_animate_brazier(); 
			move_sprite ( brazier_sprite, -13, 0 );
			set_frame ( brazier_sprite, 4 ); 
			show_bigking ();
			corrupt_spans ();
			wrassle_window ();
			flicker_bgcolor ( "article.post", ['red','#080b0c'], 250, 50 );
			scatter_steps=true; stwiggle_period=500;
			animate_position ( lantern_sprite, 0, 580, 734, 780, 934, 300, ease_out )
			} },
	{ delay: 200, func: function () { set_frame ( brazier_sprite, 5 ); } },
]

function corrupt_text ( t ) {
	// unicode values obtained from "zalgo" code by tchouky. ZALGO! HE COMES!
	var unicode_horizontal = [
		'\u0315', '\u031b', '\u0340', '\u0341', 
		'\u0358', '\u0321', '\u0322', '\u0327', 
		'\u0328', '\u0334', '\u0335', '\u0336', 
		'\u034f', '\u035c', '\u035d', '\u035e', 
		'\u035f', '\u0360', '\u0362', '\u0338', 
		'\u0337', '\u0361', '\u0489'	
	];
	var new_text = '';
	function randrange ( i ) {
		return Math.floor(Math.random()*i);
	}
	for ( var i=0; i<t.length; i++ ) {
		new_text += t.substr(i,1);
		var num_crap = randrange(3);
		for ( var j=0; j<num_crap; j++ ) {
			new_text += unicode_horizontal[randrange(unicode_horizontal.length)];
		}
	}
	return new_text;
}

function corrupt_spans () {
	jQuery("span.corruptthis,#sidebar h3,#sidebar a,#sidebar b").text ( function (index,t) { return corrupt_text(t) } );
}


function run_sequence ( seq, data ) {
	var index = 0;
	function run () {
		seq[index].func ( data );
		index ++;
		if ( index < seq.length ) {
			setTimeout ( run, seq[index].delay );
		}
	}
	setTimeout ( run, seq[0].delay );
}

function omgwtfishappening () {
	var deg = 0;
	function anim () {
		jQuery("#animbox").css ( { 
			"transform":"rotate("+deg+"deg)",
			"-webkit-transform":"rotate("+deg+"deg)",
			"-ms-transform":"rotate("+deg+"deg)",
			"-moz-transform":"rotate("+deg+"deg)",
			"-o-transform":"rotate("+deg+"deg)"
			} );
		deg++;
		setTimeout ( anim, 20 );
	}
	anim ();
}

var post_elem = jQuery("article.post");
var previously_resized = false;
var animation_scale_factor = 1;
function handle_resize () {
	var post_width = post_elem.outerWidth();
	animation_scale_factor = ( post_width < 865 ) ? ( post_width / 865 ) : 1;
	if ( animation_scale_factor < 1 || previously_resized ) {
		var scale_str = "scale(" + animation_scale_factor.toFixed(4) + ")";
		jQuery(animbox_sprite.div).css ( {
			"transform":scale_str,
			"-webkit-transform":scale_str,
			"-moz-transform":scale_str,
			"-ms-transform":scale_str,
			"-o-transform":scale_str
		} );
		jQuery("div.contribution.scaleadjust").css ( {top:Math.floor(170+500*(1-animation_scale_factor)) } );
		previously_resized = true;
	}
}

function adjust_tallbox () {
	var tallbox = jQuery( "#tallbox" )
	var tallbox_offset = tallbox.offset ();
	var tallbox_height = tallbox.outerHeight ();
	var window_height = jQuery(window).height ();
	var tallbox_bottom_above_window_bottom = window_height - tallbox_offset.top - tallbox_height;
	if ( tallbox_bottom_above_window_bottom > 0 ) {
		tallbox.css ( { "min-height": tallbox_height + tallbox_bottom_above_window_bottom } );
	}
}

function activate_autostart () {
	var tallbox = jQuery( "#tallbox" )
	var tallbox_offset = tallbox.offset ();
	var tallbox_height = tallbox.outerHeight ();
	function test () {
		var window_height = jQuery(window).height ();
		var scrolltop = jQuery(window).scrollTop();
		if ( tallbox_offset.top + tallbox_height < window_height + scrolltop ) {
			jQuery(window).unbind('scroll');
			run_sequence ( seq1 );
		}
	}
	jQuery(window).bind('scroll',test);
}

function flicker_bgcolor ( element, colors, duration, period ) {
	var anim_start = Date.now();
	element = jQuery(element);
	var index=0;
	function anim () {
		if ( Date.now()-anim_start >= duration ) {
			element.css ( {backgroundColor:colors[colors.length-1]} );
		} else {
			element.css ( {backgroundColor:colors[index%colors.length]} );
			index++;
			setTimeout ( anim, period );		
		}
	}
	anim ();
}

function wrassle_window () {
	var tallbox = jQuery("#tallbox");
	var initial_scrolltop = jQuery(window).scrollTop();
	var final_scrolltop = tallbox.offset().top + tallbox.outerHeight() - jQuery(window).height() - 
			Math.floor(700 * animation_scale_factor);
	var iter=0;
	function moveit () {
		iter++;
		jQuery(window).scrollTop ( ( initial_scrolltop * ( 5 - iter ) + final_scrolltop * iter ) / 5 );
		if ( iter >=5 ) {
			iter = 0;
			setTimeout ( shakeit, 30 );
		} else {
			setTimeout ( moveit, 30 );
		}
	}
	function shakeit () {
		iter++;
		var scrolltop = jQuery(window).scrollTop();
		scrolltop += ((iter%2==1)?1:-1) * ((iter<12)?30:(iter<28)?15:7);
		jQuery(window).scrollTop ( scrolltop );
		if ( iter < 48 ) {
			setTimeout ( shakeit, 30 );
		}
	}
	moveit ();
}

adjust_tallbox ();
load_sprites ();
animate_brazier ();
start_stwiggles ();
flicker_shadow ( "flicker" );
/* omgwtfishappening(); */
jQuery (window).bind ( 'resize', handle_resize ).trigger('resize');
jQuery(mask_nextlink);
activate_autostart ();
