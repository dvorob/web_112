function process_page () {
var demo = 'axios', book = 'xlsx';
function process_wb(wb) {
	console.log(wb);
	htmlout.innerHTML = XLSX.utils.sheet_to_html(wb.Sheets[wb.SheetNames[0]], {editable:true}).replace("<table", '<table id="table" border="1"');
}
var url = "sheetjs.xlsx";

axios(url, {responseType:'arraybuffer'}).then(function(res) {
		var data = new Uint8Array(res.data);
		var wb = XLSX.read(data, {type:"array"});
		process_wb(wb);
});
document.getElementById('to_parse').onclick = function() {
	var wb = XLSX.utils.table_to_book(document.getElementById('htmlout'));
	console.log(wb);
	var fd = new FormData();
	fd.append('file', demo + '.' + book);
	fd.append('data', XLSX.write(wb, {bookType:book, type:'base64'}));
	axios("/upload", {method: "POST", data: fd});
};

	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-36810333-1']);
	_gaq.push(['_trackPageview']);
	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
};
window.onload = process_page;
