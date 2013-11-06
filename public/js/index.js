$(function() {
	$.ajax('cache/colors.json', {
		dataType: 'text',
		success: processColors
	});

	function hueSort(a, b) {
		if(a.cloth.hue > b.cloth.hue) return 1;
		if(a.cloth.hue < b.cloth.hue) return -1;
		if(a.cloth.brightness > b.cloth.brightness) return 1;
		if(a.cloth.brightness < b.cloth.brightness) return -1;
		if(a.cloth.lightness > b.cloth.lightness) return 1;
		if(a.cloth.lightness < b.cloth.lightness) return -1;
		return 0;
	}

	function processColors(data) {
		var json = JSON.parse(data);
		console.log(json.colors);
		var colors = $.map(json.colors, function(v,i) {return v;});
		//var colors = $.makeArray(json.colors);
		console.log(colors);
		colors = colors.sort(hueSort);
		console.log(colors);
		for(var i in colors) {
			var color = colors[i];
			addColorSwatch(color);
		}
	}

	function addColorSwatch(color) {
		var template = getTemplate('colorswatch');
		setColor($('.cloth', template), color.cloth.rgb);
		setColor($('.leather', template), color.leather.rgb);
		setColor($('.metal', template), color.metal.rgb);
		$('.label', template).text(color.name);
		template.data('color', color);
		$('#wrapper').append(template);
	}

	function setColor(element, rgb) {
		var color = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
		element.css({'background-color':color});
	}

	function getTemplate(tag) {
		var template = $('.template.'+tag).clone().removeClass('template');
		return template;
	}
});
