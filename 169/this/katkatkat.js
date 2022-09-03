jQuery(".disablewithjavascript").css({visibility:"hidden"});function set_sprite_sizes(){jQuery("div.sprite").each(function(){var thisjq=jQuery(this);this.subimage=thisjq.find("img");if(thisjq.hasClass('multiframe')){var framewidth=Math.floor(this.getAttribute('framewidth'));var frameheight=Math.floor(this.getAttribute('frameheight'));var subimage_width=this.subimage.width();var subimage_height=this.subimage.height();thisjq.css({width:framewidth,height:frameheight,opacity:1});if(framewidth!=subimage_width){this.anim_frame_left=framewidth;this.anim_frame_top=0;this.num_frames=Math.floor(subimage_width/framewidth);}else{this.anim_frame_left=0;this.anim_frame_top=frameheight;this.num_frames=Math.floor(subimage_height/frameheight);}}else{thisjq.css({width:this.subimage.width(),height:this.subimage.height(),opacity:1});}});}
function set_frame(jq,frame){jQuery(jq).each(function(){this.subimage.css({left:-this.anim_frame_left*frame,top:-this.anim_frame_top*frame});});}
function loop_frames(jq,frame_list,frame_period){var event;var iter=0;jq=jQuery(jq).show();if(typeof(frame_period)!="function"){frame_period=function(){return frame_period;}}
function anim(){set_frame(jq,frame_list[iter%frame_list.length]);event=setTimeout(anim,frame_period());iter++;}
function stop(){clearTimeout(event);}
event=setTimeout(anim,0);return stop;}
function random_frames(jq,frame_list,frame_period){var event;var last_frame=null;if(typeof(frame_period)!="function"){frame_period=function(){return frame_period;}}
function anim(){var frame=Math.floor(Math.random()*(frame_list.length-1));if(frame>=last_frame){frame++;}
set_frame(jq,frame_list[frame]);last_frame=frame;event=setTimeout(anim,frame_period());}
function stop(){clearTimeout(event);}
event=setTimeout(anim,0);return stop;}
function vibrate(elem,intensity_x,intensity_y,period){elem=jQuery(elem);var event;var iter=0;var position=elem.position();function anim(){elem.css({left:position.left+((iter%2)*2-1)*intensity_x,top:position.top+((iter%2)*2-1)*intensity_y});iter++;}
function stop(){clearInterval(event);elem.css({left:position.left,top:position.top});}
event=setInterval(anim,period);return stop;}
function run_action_for(action,duration,callback){var stopper=null;if(action){stopper=action();}
var event=null;function expired(cancel_callback){event=null;if(stopper){stopper();}
if(callback&&cancel_callback!=true){callback();}}
function stop(cancel_callback){if(event){clearTimeout(event);expired(cancel_callback);}}
event=setTimeout(expired,duration);return stop;}
function flicker_period(){return Math.floor(Math.random()*100+50);}
function create_trigger_on_visibility(elem,top){elem=jQuery(elem);var arrowback=jQuery("#arrowback");var arrow_shown=false;function onscroll(event){var offset=elem.offset();var window_height=jQuery(window).height();var elem_height=elem.height();var scroll_top=jQuery(window).scrollTop();if(offset.top+top<scroll_top){if(!arrow_shown){arrowback.show().css({opacity:0.75});arrow_shown=true;}}else if(arrow_shown){arrowback.hide();arrow_shown=false;}
if((offset.top+top>=scroll_top)&&(offset.top+top<scroll_top+window_height)){jQuery(window).unbind(event);event.data.complete();}}
function start(index,data,complete){jQuery(window).bind('scroll',{complete:complete},onscroll).trigger('scroll');}
return start;}
function create_trigger_on_scroll(deviation,elem,top){if(elem){elem=jQuery(elem);}
var arrowback=jQuery("#arrowback");var arrow_shown=false;function onscroll(event){var offset,window_height,elem_height;var trigger=false;var trigger_delay=0;if(elem){offset=elem.offset();window_height=jQuery(window).height();elem_height=elem.height();}
var scroll_top=jQuery(window).scrollTop();if(elem&&(offset.top+top>=scroll_top)&&(offset.top+top<scroll_top+window_height)){trigger=true;trigger_delay=1500;}else if(deviation<0){if(scroll_top<=event.data.initial_scrolltop+deviation){trigger=true;}}else{if(scroll_top>=event.data.initial_scrolltop+deviation){trigger=true;}}
if(deviation<0&&!trigger){if(!arrow_shown){arrowback.show().css({opacity:0.75});arrow_shown=true;}}else if(arrow_shown){arrowback.hide();arrow_shown=false;}
if(trigger){jQuery(window).unbind(event);setTimeout(event.data.complete,trigger_delay);}}
function start(index,data,complete){var initial_scrolltop=jQuery(window).scrollTop();jQuery(window).bind('scroll',{complete:complete,initial_scrolltop:initial_scrolltop},onscroll).trigger('scroll');}
return start;}
function create_run_once_trigger(){var been_ran=false;var complete_fn=null;function run(){if(!been_ran){been_ran=true;complete_fn();}}
function start(index,data,complete){complete_fn=complete;}
return{run_fn:run,start_fn:start}}
function noop(){}
seq1=[{delay:0,func:function(index,data){data.flickerstop=random_frames("#flames",[0,1,2],flicker_period);data.flickerstop1=random_frames("#flamespot1",[0,1,2],flicker_period);data.flickerstop2=random_frames("#flamespot2",[0,1,2],flicker_period);data.vibrate_katia_stop=vibrate("#katia",1,0,50);}},{delay:create_trigger_on_visibility("#animbox",1400),func:noop},{delay:1500,func:function(index,data){jQuery("#flamespot1").show();}},{delay:1500,func:function(index,data){jQuery("#flamespot2").show();}},{delay:1500,func:function(index,data){data.flickerstop();data.flickerstop=random_frames("#flames",[3,4,5],flicker_period);jQuery("#flamespot1,#flamespot2").hide();}},{delay:1500,func:function(index,data){jQuery("#flamespot1").css({left:1305,top:1309}).show();}},{delay:1500,func:function(index,data){jQuery("#flamespot2").css({left:989,top:1426}).show();}},{delay:1500,func:function(index,data){data.flickerstop();data.flickerstop=random_frames("#flames",[6,7,8],flicker_period);jQuery("#flamespot1,#flamespot2").hide();}},{delay:4000,func:function(index,data){if(jQuery.support.opacity){jQuery("#lightbeam").fadeIn(200);jQuery("#kattext").fadeIn(200);}else{jQuery("#lightbeam img").fadeIn(200);jQuery("#kattext img").fadeIn(200);jQuery("#lightbeam").show();jQuery("#kattext").show();}
data.vibrate_katia_stop();}},{delay:create_trigger_on_scroll(-10,"#animbox",191),func:function(index,data){set_frame("#king,#katia",1);}},{delay:2000,func:noop},{delay:create_trigger_on_visibility("#animbox",191),func:function(index,data){set_frame("#kattext",1);if(jQuery.support.opacity){jQuery("#lightbeam").fadeOut(300);jQuery("#kattext").fadeOut(2000);}else{jQuery("#lightbeam img").fadeOut(300);jQuery("#kattext img").fadeOut(2000);}
jQuery("#flamespot1").css({left:918,top:1421}).show();}},{delay:2100,func:function(index,data){if(jQuery.support.opacity){jQuery("#lightbeam").fadeIn(200);jQuery("#kaaaattext").fadeIn(200);}else{jQuery("#lightbeam img").fadeIn(200);jQuery("#kaaaattext img").fadeIn(200);jQuery("#kaaaattext").show();}
jQuery("#flamespot2").css({left:1348,top:1299}).show();}}];function run_sequence(seq,data){var index=0;function schedule(){var delay=seq[index].delay;if(typeof(delay)=="function"){delay(index,data,run);}else{setTimeout(run,delay);}}
function run(){seq[index].func(index,data);index++;if(index<seq.length){schedule();}}
schedule();}
function reposition_animbox(){var tallbox_offset=jQuery("#tallbox").offset();var tallbox_position=jQuery("#tallbox").position();var window_width=jQuery(window).width();var left=-tallbox_offset.left-Math.floor((1700-window_width)/2);jQuery("#animbox").css({left:left,top:-tallbox_offset.top,width:window_width-left-tallbox_offset.left-1});jQuery("#tallbox").css({height:1700-tallbox_offset.top,"min-height":1700-tallbox_offset.top});}
jQuery(window).bind('resize',reposition_animbox).trigger('resize');function doit(){jQuery("body,#wrapper,article.post").css({backgroundColor:"black"});set_sprite_sizes();jQuery("div.entry-container").after('<table style="float:right;background-color:#111;color:#333"><tr><td> \
							<a style="color:#333" href="http://www.prequeladventure.com/2011/03/prequel-begin/"><b>Начало истории здесь!</b></a><br/> \
							<a style="color:#333" href="http://www.prequeladventure.com/category/archive/">Архив</a><br/> \
							<a style="color:#333" href="index.html#comments">Комментарии</a> \
						</td></tr></table>');run_sequence(seq1,{});}
jQuery(doit);