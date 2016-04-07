var svgns = "http://www.w3.org/2000/svg";
var xlink = "http://www.w3.org/1999/xlink";
var svgDoc;

document.addEventListener('DOMContentLoaded', function() {
	document.embeds.svgembed.addEventListener('load', function(e){
		svgDoc = e.target.getSVGDocument();
		var content = svgDoc.getElementById('content');
		[].forEach.call(document.querySelectorAll('tbody tr'), function(row, i) {
			var col = svgDoc.createElementNS(svgns,'use');
			col.setAttributeNS(xlink, 'xlink:href', '#r1');
			var x = 240 - 25*i;
			var height =  parseInt(row.children[3].innerHTML) / 1300000 * 200;
			col.setAttribute('x', x);
			col.setAttribute('transform', 'scale(1,' + height + ')');
			content.appendChild(col);
		});
	}, false);
}, false);