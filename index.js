//Just pushed to github on Wed Jun 15 09:47:19 SGT 2016

"use strict";

var unit = 19;
var snakeLen = 7;

var Segment = function(type, x, y) {
    this.x = x;
    this.y = y;
    this.seg = $("<div>");
    this.seg.addClass(type);
    this.seg.css({ left: x + "px", top: y + "px"});
};
Segment.prototype.move = function(newX, newY) {
	this.x += newX;
    this.y += newY;
    this.seg.css({ left: this.x + "px", top: this.y + "px"});
};
Segment.prototype.toggleHead = function() {
    this.seg.addClass("head");
    this.seg.removeClass("body");
};
Segment.prototype.toggleBody = function() {
    this.seg.addClass("body");
    this.seg.removeClass("head");
};

var Snake = function(len) {
    var segments = [];
    segments.push(new Segment("head", 50, 150));

    for (var i = 1; i < len + 1; i++)
        segments.push(new Segment("body", 50 + (i * unit), 150));

    this.display = function($playfield) {
        for (var i = 0; i < segments.length; i++)
            $playfield.append(segments[i].seg);
    };

    var rotateSegments = function() {
        segments[0].toggleBody();
        var newHead = segments.pop();
        newHead.x = segments[0].x;
        newHead.y = segments[0].y;
        newHead.toggleHead();
        segments.unshift(newHead);
        return (segments[0]);
    };

    this.left = function() {
        rotateSegments().move(-unit, 0);
    };
    this.right = function() {
        rotateSegments().move(unit, 0);
    };
    this.up = function() {
        rotateSegments().move(0, -unit);
    };
    this.down = function() {
        rotateSegments().move(0, unit);
    };

};

$(function() {
    var mysnake = new Snake(snakeLen);
    mysnake.display($("#playfield"));
    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: //left
                mysnake.left();
                break;
            case 38: //up
                mysnake.up();
                break;
            case 39: //right
                mysnake.right();
                break;
            case 40: //down
                mysnake.down();
                break;
            default:
        }
    });
});
