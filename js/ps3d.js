//"use strict";

b4w.register("ps3d_main", function(exports, require) {

var m_tex    = require("textures");
var m_anim   = require("animation");
var m_app    = require("app");
var m_data   = require("data");
var m_main   = require("main");
var m_scenes = require("scenes");
var m_camera = require("camera");
var m_preloader = require("preloader");
var m_version = require("version");
//var m_camera_anim = require("camera_anim");
//var m_material = require("material");
//var m_transform = require("transform");
var m_sfx    = require("sfx");
var _previous_selected_obj = null;
var DEBUG = (m_version.type() === "DEBUG");
var VIDEO_DELAY_TIME = 900/30;
var PRELOADING = true;
var state = 0;
var HIDE_MENU_DELAY          = 2000;
var ANIM_ELEM_DELAY          = 20;
var LOGO_SHOW_DELAY          = 300;
var LOGO_HIDE_DELAY          = 300;
var LOGO_CIRCLE_HIDE_DELAY   = 300;
var CAPTION_SHOW_DELAY       = 300;
var CAPTION_HIDE_DELAY       = 300;
var MENU_BUTTON_SHOW_DELAY   = 300;
var PRELOADER_HIDE_DELAY     = 300;

exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container", 
        callback: init_cb,
		gl_debug: true,
        physics_enabled: false,
        alpha: true,
		console_verbose: DEBUG
    });

}

function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }
	//canvas_elem.addEventListener("mousedown", main_canvas_click, false);
    m_app.enable_controls(canvas_elem);
	//m_preloader.create_simple_preloader(canvas_elem);
    
     m_preloader.create_rotation_preloader({
        //img_width: 165,
        //preloader_width: 460,
        //preloader_bar_id: "preloader_bar",
        //fill_band_id: "fill_band",
        preloader_caption_id: "preloader_caption",
        preloader_container_id: "preloader_container",
        background_container_id: "background_image_container",
        canvas_container_id: "main_canvas_container"
    });
	var can = canvas_elem.offsetParent;
		can.addEventListener("mousedown", main_canvas_click, false);
    //var preloader_frame = document.getElementById("preloader_frame");

    //preloader_frame.style.visibility = "visible"; 
window.onresize = on_resize;
    on_resize();
    load();    //canvas_elem.addEventListener("mousedown", main_canvas_click, false);
}

function load() {
        var p_cb = PRELOADING ? preloader_callback : null;
    m_data.load("ps3d.json",
                load_cb, p_cb, !true);
				
				
}

function load_cb(data_id) {
    m_app.enable_camera_controls();
	load_data();
}

//function preloader_callback(percentage) {
//    m_preloader.update_preloader(percentage);
//}

function on_resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    m_main.resize(w, h);
};

function main_canvas_click(e) {
    if (e.preventDefault)
        e.preventDefault();

    var x = e.clientX;
    var y = e.clientY;

    var obj = m_scenes.pick_object(x, y);
	
	//var camobj = m_scenes.get_active_camera();
	var Rotation = m_scenes.get_object_by_name('Rotation');
	//m_material.set_emit_factor(TotalWork, "krav", .2);
	
	
    if (obj) {
        if (_previous_selected_obj) {
            m_anim.stop(_previous_selected_obj);
            m_anim.set_frame(_previous_selected_obj, 0);
        }
        _previous_selected_obj = obj;
		
		if(obj.name=="leftarrow"){
		    if (state == 0){  //at welcome
				m_anim.apply(Rotation, "WToWork");
				state = 1;
				}
			else if (state == 1){ //at work
				m_anim.apply(Rotation, "WorkToAnim");
				state = 2;
				}
			else if (state == 2){ //at animation
				m_anim.apply(Rotation, "AnimToMe");
				state = 3;
			}
			else if (state == 3){ //at me
				m_anim.apply(Rotation, "MeToW");
				state = 0;
			}						
			m_anim.play(Rotation);	
		}
		else if(obj.name=="rightarrow"){
		    if (state == 0){  //at welcome
				m_anim.apply(Rotation, "WToMe");
				state = 3;
				}
			else if (state == 3){ //at me
				m_anim.apply(Rotation, "MeToAnim");
				state = 2;
				}
			else if (state == 2){ //at animation
				m_anim.apply(Rotation, "AnimToWork");
				state = 1;
			}
			else if (state == 1){ //at work
				m_anim.apply(Rotation, "WorkToW");
				state = 0;
			}						
			m_anim.play(Rotation);	
		}
		else if(state != -1) {//at work
			if (obj.name=="venezia"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://www.veneziamarble.com/', '_blank') }, 2000)
			}
			else if (obj.name=="awip"){
				setTimeout(function() { window.open('http://www.awippersonaltraining.com/', '_blank') }, 20)
			}
			else if (obj.name=="phillys"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://phillys.herokuapp.com/', '_blank') }, 20)
			}
			else if (obj.name=="paoletti plane"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://plaw.herokuapp.com/', '_blank') }, 20)
			}
			else if (obj.name=="venezia.001"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://phillys.herokuapp.com/', '_blank') }, 20)
			}
			else if (obj.name=="path"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://plaw.herokuapp.com/', '_blank') }, 20)
			}
			else if (obj.name=="krav plane"){
				m_anim.apply_def(obj);
				m_anim.play(obj);
				setTimeout(function() { window.open('http://ctkrav.herokuapp.com/', '_blank') }, 20)
			}
		}
			

    }
}

function load_data() {
    var vid = "my_video5";
	var vid2 = "my_image";
	//var vid3 = "my_video11";
	var ctx_video = m_tex.get_canvas_texture_context(vid);
	var ctx_video2 = m_tex.get_canvas_texture_context(vid2);
	//var ctx_video3 = m_tex.get_canvas_texture_context(vid3);


     if (ctx_video) {

        var format = m_sfx.detect_video_container("");
        
        if (format) {
            var video_file = document.createElement('video');  
            video_file.autoplay = true;
            video_file.loop = true;
            video_file.addEventListener("loadeddata", function() {
                draw_video_iter(video_file, ctx_video, vid);
            }, false);

            if (format == "m4v")
                video_file.src="slider.mp4";
            else
                video_file.src="slider.mp4";
        } else
            console.log("Can not load the video.");
    }  

    if (ctx_video2) {

        var format2 = m_sfx.detect_video_container("");
        
        if (format2) {
            var video_file2 = document.createElement('video');  
            video_file2.autoplay = true;
            video_file2.loop = true;
            video_file2.addEventListener("loadeddata", function(e) {
                draw_video_iter(video_file2, ctx_video2, vid2);
            }, false);

            if (format2 == "m4v")
                video_file2.src="Arial.mp4";
            else
                video_file2.src="Arial.mp4";
        } else
            console.log("Can not load the video.");
    }
	
/* 	if (ctx_video3) {

        var format3 = m_sfx.detect_video_container("");
        
        if (format3) {
            var video_file3 = document.createElement('video');  
            video_file3.autoplay = true;
            video_file3.loop = true;
            video_file3.addEventListener("loadeddata", function(e) {
                draw_video_iter(video_file3, ctx_video3, vid3);
            }, false);

            if (format3 == "m4v")
                video_file3.src="cube.mp4";
            else
                video_file3.src="cube.mp4";
				
        } else
            console.log("Can not load the video.");
    } */

}

function draw_video_iter(video, context, vidname) {
    var canvas = context.canvas;
    var scale = canvas.width / video.videoWidth;
    var scale_height = Math.round( scale * video.videoHeight );
    var shift_position = Math.round((canvas.height - scale_height) / 2);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 
            0, shift_position, canvas.width, scale_height);
    m_tex.update_canvas_texture_context(vidname);
    setTimeout(function() { draw_video_iter(video, context, vidname) }, VIDEO_DELAY_TIME);
}


function preloader_callback(percentage, load_time) {
    preloader_caption.innerHTML = percentage + "%";

    if (percentage < 33) {
        circle_container.style.display = "block";
        first_stage.style.width = percentage * 4.7 + "px";
        circle_container.style.webkitTransform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
        circle_container.style.transform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
    } else if (percentage < 66) {
        first_stage.style.width = 142 + "px";
        second_stage.style.backgroundColor = "#000";
        second_stage.style.marginTop = "135px";

        if (135 - (percentage - 33) * 4.5 > 0)
            second_stage.style.marginTop = 135 - (percentage - 33) * 3.5 + "px";

        circle_container.style.webkitTransform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
        circle_container.style.transform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
    } else if (percentage != 100) {
        second_stage.style.marginTop = "0px";
        third_stage.style.backgroundColor = "#000";
        third_stage.style.height = "0px";

        if (percentage > 75)
            third_stage.style.height = (percentage * 0.1) + "px";

        circle_container.style.webkitTransform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
        circle_container.style.transform = 'rotate('+ (percentage * 3.6 - 503) + 'deg)';
    }

    if (percentage == 100) {
        var first_elem = document.getElementById("first_stage");

        if (!first_elem)
            return;

        //if (!m_sfx.check_active_speakers())
           // sound_on_button.parentElement.removeChild(sound_on_button);

        first_stage.parentElement.removeChild(first_stage)
        second_stage.parentElement.removeChild(second_stage)
        third_stage.parentElement.removeChild(third_stage)
        circle_container.parentElement.removeChild(circle_container)
        load_container.style.backgroundColor = "#000";

        anim_elem(preloader_caption, "opacity", CAPTION_HIDE_DELAY, 0, 1, "", "", function() {
            anim_elem(load_container, "opacity", LOGO_CIRCLE_HIDE_DELAY, 0, 1, "", "", function() {
                anim_elem(logo_container, "opacity", LOGO_HIDE_DELAY, 0, 1, "", "", function() {
                    anim_elem(preloader_container, "opacity", PRELOADER_HIDE_DELAY, 0, 1, "", "", function() {
                        preloader_container.parentElement.removeChild(preloader_container);
                    });
                });
                //opened_button.style.display = "block";
               // anim_elem(opened_button, "transform", MENU_BUTTON_SHOW_DELAY, 1, 0, "scale(", ")");
            });
        });
    }
}
function anim_elem(elem, prop, time, max_val, min_val, prefix, suffix, cb) {
    elem = elem || null;
    prop = prop || null;
    time = time || 1000;
    max_val = isFinite(max_val)? max_val : 1;
    min_val = isFinite(min_val)? min_val : 0;
    prefix = prefix || "";
    suffix = suffix || "";
    cb = cb || null;

    if (!elem || !prop)
        return;

    if (elem instanceof Array)
        var test_elem = elem[0]
    else
        var test_elem = elem;

    if (test_elem.style[prop] != undefined) {

    } else if (test_elem.style["webkit" + prop.charAt(0).toUpperCase() + prop.slice(1)] != undefined) {
        prop = "webkit" + prop.charAt(0).toUpperCase() + prop.slice(1);
    } else if (test_elem.style["ms" + prop.charAt(0).toUpperCase() + prop.slice(1)] != undefined) {
        prop = "ms" + prop.charAt(0).toUpperCase() + prop.slice(1);
    }

    var requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) { return window.setTimeout(callback, 1000/60) };

    var start = new Date().getTime();

    var delta = max_val - min_val

    var frame = function() {
        var elapsed_total = new Date().getTime() - start;

        if (elapsed_total >= time) {
            if (elem instanceof Array)
                for (var i = 0; i < elem.length; i++)
                    elem[i].style[prop] = prefix + max_val + suffix;
            else
                elem.style[prop] = prefix + max_val + suffix;

            if (cb)
                cb();

            return;
        }

        var value = min_val + elapsed_total / time * delta;

        if (elem instanceof Array)
            for (var i = 0; i < elem.length; i++)
                elem[i].style[prop] = prefix + value + suffix;
        else
            elem.style[prop] = prefix + value + suffix;

        requestAnimFrame(frame);
    }

    requestAnimFrame(frame);
}



});

	

b4w.require("ps3d_main").init();

