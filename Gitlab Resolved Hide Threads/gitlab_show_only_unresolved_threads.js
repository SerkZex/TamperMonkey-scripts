// ==UserScript==
// @name         Gitlab Show Only UnResolved Threads
// @version      0.1.0
// @description  This script hide commits and resolved threads, no longer scrolling into infinite when review.
// @author       Mujtaba Aldebes
// @license      MIT
// @namespace    https://github.com/SerkZex/
// @icon         https://about.gitlab.com/ico/favicon-192x192.png
// @include      /^https?:\/\/[^/]*gitlab.[^/]+\//
// @require      https://code.jquery.com/jquery-3.5.0.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

const State = Object.freeze({
    HIDE: 'HIDE_RESOLVED',
    SHOW: 'SHOW_RESOLVED',
});

const ButtonText = Object.freeze({
    [State.HIDE]: 'Show all threads',
    [State.SHOW]: 'Show only unresolved threads',
});

let current_state = State.SHOW;

// This function add a button to the gitlab interface and bind it to an action.
function show_gitlab_button() {
    var zNode = document.createElement ('div');
    zNode.innerHTML = '<button id="show_unresolved_discussions_btn" type="button" class="btn btn-default ml-sm-2">' +ButtonText[current_state]+ '</button>';
    zNode.setAttribute ('id', 'myContainer');
    zNode.setAttribute ('class', 'd-inline-block align-bottom full-width-mobile');
    $('.ml-auto.mt-auto.mb-auto').append(zNode);

    $("#show_unresolved_discussions_btn").bind( "click", function() {
        switch (current_state) {
            case State.SHOW:
                current_state = State.HIDE;
                $('.timeline-entry.note.system-note.note-wrapper').hide();
                $('.timeline-entry.note.note-discussion:contains(Resolved)').hide();
                break;
            case State.HIDE:
                current_state = State.SHOW;
                $('.timeline-entry.note.system-note.note-wrapper').show();
                $('.timeline-entry.note.note-discussion').show();
                break;
        }
        $('#show_unresolved_discussions_btn').html(ButtonText[current_state]);
    });
};


// Code Start
show_gitlab_button();

