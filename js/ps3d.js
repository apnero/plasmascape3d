"use strict";

b4w.register("ps3d_main", function(exports, require) {

var m_tex    = require("textures");
var m_anim   = require("animation");
var m_app    = require("app");
var m_data   = require("data");
var m_main   = require("main");
var m_scenes = require("scenes");
var m_camera = require("camera");
//var m_camera_anim = require("camera_anim");
//var m_material = require("material");
var m_transform = require("transform");
var m_sfx    = require("sfx");
var _previous_selected_obj = null;


var GIF_FRAMES_NUMBER = 24;
var GIF_DELAY_TIME = 100;
var VIDEO_DELAY_TIME = 1000/30;



exports.init = function() {
    m_app.init({
        canvas_container_id: "canvas3d", 
        callback: init_cb,
        physics_enabled: false,
        alpha: true
    });

}

function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_app.enable_controls(canvas_elem);
    canvas_elem.addEventListener("mousedown", main_canvas_click, false);

    window.onresize = on_resize;
    on_resize();
    load();
}

function load() {
    m_data.load("ps3d.json", load_cb);
}

function load_cb(data_id) {
    m_app.enable_camera_controls();
	load_data();
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
	//var TotalWork = m_scenes.get_object_by_name("TotalWork");
	//m_material.set_emit_factor(TotalWork, "krav", .2);
	//m_material.set_emit_factor(TotalWork, "venezia", .2);
	//m_material.set_emit_factor(TotalWork, "path", .2);
	//m_material.set_emit_factor(TotalWork, "paoletti", .2);
	//m_material.set_emit_factor(TotalWork, "phillys", .2);
	//m_material.set_emit_factor(TotalWork, "awip", .5);
	
    if (obj) {
        if (_previous_selected_obj) {
            m_anim.stop(_previous_selected_obj);
            m_anim.set_frame(_previous_selected_obj, 0);
        }
        _previous_selected_obj = obj;
		
		if(obj.name=="venezia"){
		    m_anim.apply_def(obj);
			m_anim.play(obj);
			setTimeout(function() { window.open('http://www.veneziamarble.com/', '_blank') }, 2000)
		}
		else if (obj.name=="awip"){
		   // m_anim.apply_def(obj);
			//m_anim.apply(obj, "Plasmascape.001Action");
		//	m_anim.play(obj);
			//var TotalWork = m_scenes.get_object_by_name("Rotation");
			//m_anim.apply_def(TotalWork);
			//m_anim.play(TotalWork);
			//m_transform.set_scale(obj, 100);
			//m_transform.set_translation(obj,10,20,30);
			//m_transform.set_translation_rel(obj,10,20,30,TotalWork);
		//	m_transform.move_local(obj,10,20,30);
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
		};
			
			m_anim.apply_def(obj);
			m_anim.play(obj);

    }
}

function load_data() {
    var ctx_video = m_tex.get_canvas_texture_context("my_video5");


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





});

	

b4w.require("ps3d_main").init();

