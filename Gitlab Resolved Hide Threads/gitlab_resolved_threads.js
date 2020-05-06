// ==UserScript==
// @name         Gitlab Hide Resolved Threads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  No longer scrolling into infinite
// @author       Mujtaba Aldbes
// @include      https://gitlab.adaptivemicrosar.vi.vector.int/amsr/adaptive-microsar/-/merge_requests/*
// @require      https://code.jquery.com/jquery-3.5.0.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

const State = Object.freeze({
	HIDE: 'HIDE_RESOLVED',
	SHOW: 'SHOW_RESOLVED',
});

const textMap = Object.freeze({
	[State.HIDE]: 'Show unresolved threads',
	[State.SHOW]: 'Show all threads',
});

let current_state = State.HIDE;

function toggle_resolved_threads(){
    console.log($('.timeline-entry.note.note-discussion'));
}


function show_gitlab_button() {
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="show_unresolved_discussions_btn" type="button" class="btn btn-default ml-sm-2">' +textMap[current_state]+ '</button>';
    zNode.setAttribute ('id', 'myContainer');
    zNode.setAttribute ('class', 'd-inline-block align-bottom full-width-mobile');
    $('.ml-auto.mt-auto.mb-auto').append(zNode);

    $("#show_unresolved_discussions_btn").bind( "click", function() {
        switch (current_state) {
			case State.HIDE:
                current_state = State.SHOW;
                $('.timeline-entry.note.system-note.note-wrapper').hide();
                toggle_resolved_threads()
				break;
			case State.SHOW:
				current_state = State.HIDE;
                $('.timeline-entry.note.system-note.note-wrapper').show();
				break;
		}
        $('#show_unresolved_discussions_btn').html(textMap[current_state]);
    });
};





// $(function(){
//   $(".dropdown-content ul").append('<li id="show_unresolved_discussions_btn"><button type="button">Show unresolved threads</button></li>');
// });


// Code Start
show_gitlab_button();


