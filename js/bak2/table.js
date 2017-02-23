$(document).ready(function(){
	var jsonURL = 'http://54.202.17.79/api/v01/get/data';
    var jsonURLNode = 'http://54.202.17.79/api/v01/get/node';
    var counter = 0;
    var counterNode = 0;

    setInterval(function() {
        $.getJSON(jsonURLNode, function( data ) {
            createTableNode(data.node[counterNode]);
            counterNode++;
        });
        $.getJSON(jsonURL, function( data ) {
            createTable(data.data[counter]);
            counter++;
        });
    }, 1000);
			              // <td class="col-xs-2">12</td><td class="col-xs-8">Lastly Jane</td><td class="col-xs-2">6</td>

	function createTable(elem) {
		$("#table-data" ).append("<tr>\
		              <td class=\"col-md-2\" style=\"text-align: left;\">"+elem.id+"</td>\
		              <td class=\"col-md-2\" style=\"text-align: left;\">"+elem.source+"</td>\
		              <td class=\"col-md-3\" style=\"text-align: left;\">"+elem.co2+"</td>\
		              <td class=\"col-md-3\" style=\"text-align: left;\">"+elem.temp+"</td>\
		              <td class=\"col-md-2\" style=\"text-align: left;\">"+elem.hum+"</td>\
		            </tr>");
	}

	function createTableNode(elem) {
		var idx = counterNode+1;
		var t = new Date(elem.last_time*1000);
		if(isNaN(t)){
			var date_show = "has never been active";
		}else{
			var date_show = t;
		}
		$("#table-node" ).append("<tr>\
		              <td class=\"col-xs-1\" style=\"text-align: left;\">"+idx+"</td>\
		              <td class=\"col-xs-1\" style=\"text-align: center;\">"+elem.id+"</td>\
		              <td class=\"col-xs-2\" style=\"text-align: center;\">"+elem.desc+"</td>\
		              <td class=\"col-xs-2\" style=\"text-align: center;\">"+date_show+"</td>\
		              <td class=\"col-xs-1\" style=\"text-align: center;\">"+elem.pos+"</td>\
		              <td class=\"col-xs-1\" style=\"text-align: center;\">"+elem.last_temp+"</td>\
		              <td class=\"col-xs-2\" style=\"text-align: center;\">"+elem.last_data_id+"</td>\
		              <td class=\"col-xs-2\" style=\"text-align: left;\">A</td>\
		            </tr>");
	}
});
