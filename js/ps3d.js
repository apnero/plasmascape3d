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
//var m_version = require("version");
//var m_camera_anim = require("camera_anim");
//var m_material = require("material");
//var m_transform = require("transform");
var m_sfx    = require("sfx");
var _previous_selected_obj = null;
//var DEBUG = (m_version.type() === "DEBUG");
var VIDEO_DELAY_TIME = 900/30;
var PRELOADING = true;
var state = 0;


exports.init = function() {
    m_app.init({
        canvas_container_id: "main_canvas_container", 
        callback: init_cb,
		//gl_debug: true,
        physics_enabled: false,
        alpha: true,
		//console_verbose: DEBUG
    });

}

function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }
	
    m_app.enable_controls(canvas_elem);
	//m_preloader.create_simple_preloader(canvas_elem);
    canvas_elem.addEventListener("mousedown", main_canvas_click, false);
     m_preloader.create_advanced_preloader({
        img_width: 165,
        preloader_width: 460,
        preloader_bar_id: "preloader_bar",
        fill_band_id: "fill_band",
        preloader_caption_id: "preloader_caption",
        preloader_container_id: "preloader_container",
        background_container_id: "background_image_container",
        canvas_container_id: "main_canvas_container"
    });

    var preloader_frame = document.getElementById("preloader_frame");

    preloader_frame.style.visibility = "visible"; 
window.onresize = on_resize;
    on_resize();
    load();    
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

function preloader_callback(percentage) {
    m_preloader.update_preloader(percentage);
}

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
    var ctx_video = m_tex.get_canvas_texture_context("my_video5");
	var ctx_image = m_tex.get_canvas_texture_context("my_image");


     if (ctx_video) {

        var format = m_sfx.detect_video_container("");
        
        if (format) {
            var video_file = document.createElement('video');  
            video_file.autoplay = true;
            video_file.loop = true;
            video_file.addEventListener("loadeddata", function() {
                draw_video_iter(video_file, ctx_video);
            }, false);

            if (format == "m4v")
                video_file.src="slider.mp4";
            else
                video_file.src="slider.mp4";
        } else
            console.log("Can not load the video.");
    }  

    if (ctx_image) {

        var format2 = m_sfx.detect_video_container("");
        
        if (format2) {
            var video_file2 = document.createElement('video');  
            video_file2.autoplay = true;
            video_file2.loop = true;
			//video_file2.addEventListener("ended", function(e) {
			//	this.currentTime = 0; 
           //     this.play();
            //}, false);
            video_file2.addEventListener("loadeddata", function(e) {
                draw_video_iter2(video_file2, ctx_image);
            }, false);

            if (format2 == "m4v")
                video_file2.src="arial.mp4";
            else
                video_file2.src="arial.mp4";
        } else
            console.log("Can not load the video.");
    }

}

function draw_video_iter(video, context) {
    var canvas = context.canvas;
    var scale = canvas.width / video.videoWidth;
    var scale_height = Math.round( scale * video.videoHeight );
    var shift_position = Math.round((canvas.height - scale_height) / 2);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 
            0, shift_position, canvas.width, scale_height);
    m_tex.update_canvas_texture_context("my_video5");
    setTimeout(function() { draw_video_iter(video, context) }, VIDEO_DELAY_TIME);
}

function draw_video_iter2(video, context) {
	var canvas = context.canvas;
    var scale = canvas.width / video.videoWidth;
    var scale_height = Math.round( scale * video.videoHeight );
    var shift_position = Math.round((canvas.height - scale_height) / 2);
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 
            0, shift_position, canvas.width, scale_height);
    m_tex.update_canvas_texture_context("my_image");
    setTimeout(function() { draw_video_iter2(video, context) }, VIDEO_DELAY_TIME);
}




});

	

b4w.require("ps3d_main").init();

