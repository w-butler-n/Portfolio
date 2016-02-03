"use strict";

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var radius = 10;
var dragging = false;
var coorX;
var coorY;
var destX;
var destY;
var draw = false;
var active_line = false;
var active_rect = false;
var active_oval = false;
var pen;
var sAngle;
var eAngle;
// var a;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius*2;

$(document).ready(function()
{
	$('#canvas').mousedown(function (e)
	{
		draw = true;
		coorX = e.pageX;
		coorY = e.pageY;
	});

	function line()
	{
		if(active_line === true)
		{
			context.beginPath();
			context.moveTo(coorX, coorY);
			context.lineTo(destX, destY);
			context.stroke();
		}
	}

	function rect()
	{
		if(active_rect === true)
		{
			context.beginPath();
			context.strokeRect(coorX, coorY, destX - coorX, destY - coorY);
		}
	}

	function oval()
	{
		if(active_oval === true)
		{
			context.beginPath();
			context.arc(coorX, coorY, Math.sqrt(((destX - coorX) * (destX - coorX)) + ((destY - coorY) * (destY - coorY))), 0, 2 * Math.PI);
			context.stroke();
		}
	}

	$('#canvas').mousemove(function (e)
	{
		if (draw == true && pen == true) 
		{
			//context.stroke();
			context.lineCap = "round";
			context.beginPath();
			//context.arc(e.clientX, e.clientY, radius, 0, Math.PI*2);
			//context.beginPath();
			context.moveTo(coorX, coorY);
			context.lineTo(e.pageX, e.pageY);
			coorX = e.pageX;
			coorY = e.pageY;
			context.stroke();
			context.closePath();
		}
	});

	$('#canvas').mouseup(function (e)
	{
		draw = false;
		destX = e.pageX;
		destY = e.pageY;
		line();
		rect();
		oval();
	});
});

function setChoice(choice)
{
	var active = document.getElementsByClassName('active_tool')[0];
	if (active) 
	{
		active.className = 'tool';
	}
	var to_active = choice;
	to_active.className += ' active_tool';

	if(to_active.getAttribute('id') == "pencil")
	{
		reset();
		pen = true;
	}

	if(to_active.getAttribute('id') == "line")
	{
		reset();
		active_line = true;
	}

	if(to_active.getAttribute('id') == "rectangle")
	{
		reset();
		active_rect = true;
	}

	if(to_active.getAttribute('id') == "oval")
	{
		reset();
		active_oval = true;
	}
}

function reset()
{
	pen = false;
	active_line = false;
	active_rect = false;
	active_oval = false;
}

function setTool(e)
{
	var tool = e.target;
	var choice = tool.getAttribute("data-choice");
	setChoice(choice);
	tool.className += ' active';
}