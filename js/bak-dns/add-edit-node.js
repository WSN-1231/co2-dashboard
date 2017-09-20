$(document).ready(function() {
    
    var jsonURL = 'http://1231co2webservice.ddns.net/api/v01/get/data';
    var jsonURLNode = 'http://1231co2webservice.ddns.net/api/v01/get/node';

    var counter = 0;
    var itemsNode;
    var itemsData;
    var nodeLength;
    var sliceData;
    var dataAttributes;
    var newArray;
    var detail;

    $.getJSON(jsonURLNode, function( data ) {
        itemsNode = data.node;
        MakeNodePanel(itemsNode);
    }).done(function() {
        setInterval(function() {
            $.getJSON(jsonURL, function( data ) {
                var i;
                var j=0;
                var hit;
                itemsData = data.data;
                sliceData = itemsData.slice(itemsData.length-itemsNode.length*3,itemsData.length);
                newArray = GetUnique(sliceData);
                detail = GetDetail(sliceData,newArray);
                for(i=0; i<itemsNode.length;i++)
                {
                    j = detail.length-1;
                    while(j>=0)
                    {
                        if(itemsNode[i].id==detail[j].source)
                        {
                            hit = 1;
                            $('#val_co2'+itemsNode[i].id).text(detail[j].co2);
                            $('#val_temp'+itemsNode[i].id).text(detail[j].temp);
                            $('#val_hum'+itemsNode[i].id).text(detail[j].hum);
                            $('#val_light'+itemsNode[i].id).text(detail[j].light);
                        }
                        j--;
                    }
                    
                    if(hit==1)
                    {
                        var element = document.getElementById('node'+itemsNode[i].id);
                        element.classList.add("panel-primary");
                        
                    }
                    else
                    {
                        var element = document.getElementById('node'+itemsNode[i].id);
                        element.classList.add("panel-info");
                    }
                    hit = 0;
                }
            });
        }, 3000);
    });

    function MakeNodePanel(node)
    {   
        var row = 1;
        $('#page-wrapper').append('<div class="row" id="'+row+'"></div>');
        for(var i=0;i<node.length;i++)
        {
            //Level 1 (Coloumn)
            jQuery('<div/>', {
                id: 'row'+row+'node'+i,
                class: 'col-lg-4'
            }).appendTo('#'+row+''); 

            //Level 2 (Panel)
            jQuery('<div/>', {
                id: 'node'+node[i].id,
                class: 'panel'
            }).appendTo('#row'+row+'node'+i); 

            //Level 3 (Panel Heading)
            jQuery('<div/>', {
                id: 'node'+node[i].id,
                class: 'panel-heading',
                text: 'Node ID : '+node[i].id
            }).appendTo('#node'+node[i].id);

            //Level 4 (Panel Body)
            jQuery('<div/>', {
                id:'pbody'+node[i].id,
                class: 'panel-body'
            }).appendTo('#node'+node[i].id);

            //Level 5 (Panel Footer)
            jQuery('<div/>', {
                id:'pfooter'+node[i].id,
                class: 'panel-footer'
            }).appendTo('#node'+node[i].id);

            //Body Row CO2
            jQuery('<div/>', {
                id:'co2'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //CO2 col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'CO2'
            }).appendTo('#co2'+node[i].id);
            //CO2 col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#co2'+node[i].id);
            //CO2 col 3
            jQuery('<div/>', {
                id:'val_co2'+node[i].id,
                class: 'col-lg-5',
                text:'-'
            }).appendTo('#co2'+node[i].id);


            //Body Row Temperature
            jQuery('<div/>', {
                id:'temperature'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //Temperature col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Temperature'
            }).appendTo('#temperature'+node[i].id);
            //Temperature col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#temperature'+node[i].id);
            //Temperature col 3
            jQuery('<div/>', {
                id:'val_temp'+node[i].id,
                class: 'col-lg-5',
                text:'-'
            }).appendTo('#temperature'+node[i].id);


            //Body Row Humidity
            jQuery('<div/>', {
                id:'humidity'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //CO2 col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Humidity'
            }).appendTo('#humidity'+node[i].id);
            //CO2 col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#humidity'+node[i].id);
            //CO2 col 3
            jQuery('<div/>', {
                id:'val_hum'+node[i].id,
                class: 'col-lg-5',
                text:'-'
            }).appendTo('#humidity'+node[i].id);

            //Body Row Light Intensity
            jQuery('<div/>', {
                id:'lintensity'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //Light Intensity col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Light Intensity'
            }).appendTo('#lintensity'+node[i].id);
            //Light Intensity col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#lintensity'+node[i].id);
            //Light Intensity col 3
            jQuery('<div/>', {
                id:'val_light'+node[i].id,
                class: 'col-lg-5',
                text:'-'
            }).appendTo('#lintensity'+node[i].id);


            //Row 1
            jQuery('<div/>', {
                id: 'rf1'+node[i].id,
                class: 'row'
            }).appendTo('#pfooter'+node[i].id);

            //col 1
            jQuery('<div/>', {
                id: 'cf1'+node[i].id,
                class: 'col-lg-4'
            }).appendTo('#rf1'+node[i].id);
            //col 2
            jQuery('<div/>', {
                id: 'cf2'+node[i].id,
                class: 'col-lg-3'
            }).appendTo('#rf1'+node[i].id);
            //col 3
            jQuery('<div/>', {
                id: 'cf3'+node[i].id,
                class: 'col-lg-5'
            }).appendTo('#rf1'+node[i].id);
            
            //Row 2
            jQuery('<div/>', {
                id: 'rf2'+node[i].id,
                class: 'row'
            }).appendTo('#cf3'+node[i].id);

            //col 11
            jQuery('<div/>', {
                id: 'crf1'+node[i].id,
                class: 'col-lg-3'
            }).appendTo('#rf2'+node[i].id);
            //col 22
            jQuery('<div/>', {
                id: 'crf2'+node[i].id,
                class: 'col-lg-3'
            }).appendTo('#rf2'+node[i].id);
            //col 33
            jQuery('<div/>', {
                id: 'crf3'+node[i].id,
                class: 'col-lg-3'
            }).appendTo('#rf2'+node[i].id);

            //Start here for button
            jQuery('<button/>', {
                id: 'crfc1'+node[i].id,
                type: 'button',
                class: 'btn btn-primary btn-circle',
                data-toggle:'modal',
                data-target:'#editModal'
            }).appendTo('#crf1'+node[i].id);

            jQuery('<button/>', {
                id: 'crfc2'+node[i].id,
                type: 'button',
                class: 'btn btn-primary btn-circle',
                data-toggle:'modal',
                data-target:'#editModal'
            }).appendTo('#crf2'+node[i].id);

            jQuery('<button/>', {
                id: 'crfc3'+node[i].id,
                type: 'button',
                class: 'btn btn-primary btn-circle',
                data-toggle:'modal',
                data-target:'#editModal'
            }).appendTo('#crf3'+node[i].id);
            

            if(((i+1)%3)==0)
            {
                row++;
                $('#page-wrapper').append('<div class="row" id="'+row+'"></div>');
            }
        }
    }
    
    function GetUnique(inputArray)
    {
        var outputArray = [];

        for (var i = 0; i < inputArray.length; i++)
        {
            if ((jQuery.inArray(inputArray[i].source, outputArray)) == -1)
            {
                outputArray.push(inputArray[i].source);
            }
        }

        return outputArray;
    };
    
    function GetDetail(inputData,inputNode)
    {
        var outputArray = [];
        var i;
        var id_length;
        for(i=0;i<inputNode.length;i++)
        {   
            id_length = inputData.length-1;
            while(id_length>0)
            {
                if(inputData[id_length].source == inputNode[i])
                {
                    outputArray.push(inputData[id_length]);
                    id_length = 0;
                }
                id_length--;
            }
        }
        return outputArray;
    };
});
