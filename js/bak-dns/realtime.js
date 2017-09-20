$(document).ready(function() {
    
    var jsonURL = 'http://1231co2webservice.ddns.net/api/v01/get/data';
    var jsonURLNode = 'http://1231co2webservice.ddns.net/api/v01/get/node';

    var counter = 0;
    var itemsNode;
    var itemsData;

    $.getJSON(jsonURLNode, function( data ) {
        itemsNode = data.node;
    }).done(function() {
        $.each(itemsNode, function(i, items) {
            $('#select-node-id').append('<option style=\"color:red;\" value=\"'+items.id+'\">Node ID :'+items.id+'</option>');
        });
    }).done(function() {
        $('#select-node-id').change(function() {
            $('.monitoring').show();
            setInterval(function() {
                $.getJSON(jsonURL, function( data ) {
                    itemsData = data.data;  
                }).done(function() {
                    for (var i = itemsData.length - 1; i >= 0; i--) {
                        if (itemsData[i].source === parseInt($('#select-node-id').val())) {
                            $('.co2').html(itemsData[i].co2 + '<span class=\"span\"> ppm</span>');
                            $('.humi').html(itemsData[i].hum + '<span class=\"span\""> Hg</span>');
                            $('.suhu').html(itemsData[i].temp + '<span class=\"span\""> C<sup>0</sup></span>');
                            getData(itemsData[i]);
                            break;
                        }
                    }
                });
            }, 1000);
        });

    });
        // var layoutColors = baConfig.colors;
    // var id = $element[0].getAttribute('id');
    var chartData = [];
    var chart;
    var firstDate = new Date();
    firstDate.setMinutes(firstDate.getDate() - 1000);    
    var i = 0;

    var counter = 0;

    // setInterval(function() {
    //     $.getJSON(jsonURL, function( data ) {
    //         getData(data.data[counter]);
    //     });
    //     counter++;
    // }, 1000);
    
    function getData(item) {
          var visits = item.co2;
          var hits = item.hum;
          var views = item.temp;
          var newDate = new Date(firstDate);
          newDate.setMinutes(newDate.getMinutes() + i);
          i++;

          var obj = {
            date : newDate,
            visits: visits,
            hits: hits,
            views: views
          }

          chartData.push(obj);
          // console.log(JSON.stringify(obj))
            var chart = AmCharts.makeChart("monitoring_co2", {
                "type": "serial",
                "theme": "light",
                "legend": {
                    "useGraphSettings": true
                },
                "dataProvider": chartData,
                "synchronizeGrid":true,
                "valueAxes": [{
                    "id":"v1",
                    "axisColor": "#FF6600",
                    "axisThickness": 2,
                    "axisAlpha": 1,
                    "position": "left"
                }],
                "graphs": [{
                    "valueAxis": "v1",
                    "lineColor": "#FF6600",
                    "bullet": "round",
                    "bulletBorderThickness": 1,
                    "hideBulletsCount": 30,
                    "title": "C02",
                    "valueField": "visits",
                    "fillAlphas": 0
                }],
                "chartScrollbar": {},
                "chartCursor": {
                    "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
                    "cursorPosition": "mouse"
                },
                "categoryField": "date",
                "categoryAxis": {
                    "minPeriod": "mm",
                    "parseDates": true,
                    "axisColor": "#DADADA",
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true,
                    "dateFormat": "YYYY-MM-DD HH:NN:SS",
                    "position": "bottom-right"
                 }
            });
            var chart = AmCharts.makeChart("monitoring_temperature", {
                "type": "serial",
                "theme": "light",
                "legend": {
                    "useGraphSettings": true
                },
                "dataProvider": chartData,
                "synchronizeGrid":true,
                "valueAxes": [{
                    "id":"v1",
                    "axisColor": "#FF6600",
                    "axisThickness": 2,
                    "axisAlpha": 1,
                    "position": "left"
                }],
                "graphs": [{
                    "valueAxis": "v1",
                    "lineColor": "#FF6600",
                    "bullet": "round",
                    "bulletBorderThickness": 1,
                    "hideBulletsCount": 30,
                    "title": "Temperature",
                    "valueField": "views",
                    "fillAlphas": 0
                }],
                "chartScrollbar": {},
                "chartCursor": {
                    "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
                    "cursorPosition": "mouse"
                },
                "categoryField": "date",
                "categoryAxis": {
                    "minPeriod": "mm",
                    "parseDates": true,
                    "axisColor": "#DADADA",
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true,
                    "dateFormat": "YYYY-MM-DD HH:NN:SS",
                    "position": "bottom-right"
                 }
            });
            var chart = AmCharts.makeChart("monitoring_humidity", {
                "type": "serial",
                "theme": "light",
                "legend": {
                    "useGraphSettings": true
                },
                "dataProvider": chartData,
                "synchronizeGrid":true,
                "valueAxes": [{
                    "id":"v1",
                    "axisColor": "#FF6600",
                    "axisThickness": 2,
                    "axisAlpha": 1,
                    "position": "left"
                }],
                "graphs": [{
                    "valueAxis": "v1",
                    "lineColor": "#FF6600",
                    "bullet": "round",
                    "bulletBorderThickness": 1,
                    "hideBulletsCount": 30,
                    "title": "Humidity",
                    "valueField": "hits",
                    "fillAlphas": 0
                }],
                "chartScrollbar": {},
                "chartCursor": {
                    "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
                    "cursorPosition": "mouse"
                },
                "categoryField": "date",
                "categoryAxis": {
                    "minPeriod": "mm",
                    "parseDates": true,
                    "axisColor": "#DADADA",
                    "minorGridEnabled": true
                },
                "export": {
                    "enabled": true,
                    "dateFormat": "YYYY-MM-DD HH:NN:SS",
                    "position": "bottom-right"
                 }
            });

     chart.addListener("dataUpdated", zoomChart);
     zoomChart(chart);
    }
    

    function zoomChart(chart){
        chart.zoomToIndexes(chart.dataProvider.length - 20, chart.dataProvider.length - 1);
    }

});
