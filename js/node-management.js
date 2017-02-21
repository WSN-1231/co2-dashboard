$(document).ready(function() {
    
    var jsonURL = 'http://54.218.36.55/api/v01/get/data';
    var jsonURLNode = 'http://54.218.36.55/api/v01/get/node';

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
            var i;
            var j;
            //edit event hndler for edit modal form
            for(i=0;i<itemsNode.length;i++){
                $('#foo51'+itemsNode[i].id).click(clickEditHandler(itemsNode,i));
                $('#foo52'+itemsNode[i].id).click(clickDeleteHandler(itemsNode,i));
            }

            
    });

    function clickEditHandler(node,i){
        return function(event) { 
            $('#a_nd_id').val(node[i].id);
            $('#a_nd_desc').val(node[i].desc);
            $('#a_nd_pos').val(node[i].pos);
            $('#a_nd_last_dataid').val(node[i].last_dataid);
            $('#a_nd_last_time').val(node[i].last_time);
            $('#current_node_id').val(node[i].id);
        };
    }

    function clickDeleteHandler(node,i){
        return function(event) { 
            $('#selected_node_id').val(node[i].id);
            $('#selected_node_desc').val(node[i].desc);
            $('#selected_node_pos').val(node[i].pos);
        };
    }

    function MakeNodePanel(node)
    {   
        var row = 1;

        $('#page-wrapper').append('<div class="row" id="'+row+'"></div>');
        for(var i=0;i<node.length;i++)
        {
            var t = new Date(node[i].last_time*1000);
            if(isNaN(t)){
                var date_show = "has never been active";
            }else{
                var date_show = t;
            }
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

            //Level 3 (Panel Body)
            jQuery('<div/>', {
                id:'pbody'+node[i].id,
                class: 'panel-body'
            }).appendTo('#node'+node[i].id);

            //Level 3 (Panel Footer)
            jQuery('<div/>', {
                id:'pfooter'+node[i].id,
                class: 'panel-footer'
            }).appendTo('#node'+node[i].id);

            //Body Row last data id
            jQuery('<div/>', {
                id:'last_did'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //CO2 col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Last data ID'
            }).appendTo('#last_did'+node[i].id);
            //CO2 col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#last_did'+node[i].id);
            //CO2 col 3
            jQuery('<div/>', {
                id:'val_co2'+node[i].id,
                class: 'col-lg-5',
                text:node[i].last_dataid
            }).appendTo('#last_did'+node[i].id);


            //Body Row Last time
            jQuery('<div/>', {
                id:'last_time'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //Temperature col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Last time'
            }).appendTo('#last_time'+node[i].id);
            //Temperature col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#last_time'+node[i].id);
            //Temperature col 3
            jQuery('<div/>', {
                id:'val_temp'+node[i].id,
                class: 'col-lg-5',
                text:date_show
            }).appendTo('#last_time'+node[i].id);


            //Body Row Description
            jQuery('<div/>', {
                id:'description'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //CO2 col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Description'
            }).appendTo('#description'+node[i].id);
            //CO2 col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#description'+node[i].id);
            //CO2 col 3
            jQuery('<div/>', {
                id:'val_hum'+node[i].id,
                class: 'col-lg-5',
                text:node[i].desc
            }).appendTo('#description'+node[i].id);

            //Body Row Position
            jQuery('<div/>', {
                id:'position'+node[i].id,
                class: 'row'
            }).appendTo('#pbody'+node[i].id);
            //Light Intensity col 1
            jQuery('<div/>', {
                class: 'col-lg-5',
                text:'Position'
            }).appendTo('#position'+node[i].id);
            //Light Intensity col 2
            jQuery('<div/>', {
                class: 'col-lg-1',
                text:':'
            }).appendTo('#position'+node[i].id);
            //Light Intensity col 3
            jQuery('<div/>', {
                id:'val_light'+node[i].id,
                class: 'col-lg-5',
                text: node[i].pos
            }).appendTo('#position'+node[i].id);

            //Footer
            jQuery('<div/>', {
                id:'foo1'+node[i].id,
                class: 'row'
            }).appendTo('#pfooter'+node[i].id);

            jQuery('<div/>', {
                id:'foo21'+node[i].id,
                class: 'col-lg-4'
            }).appendTo('#foo1'+node[i].id);
            jQuery('<div/>', {
                id:'foo22'+node[i].id,
                class: 'col-lg-3'
            }).appendTo('#foo1'+node[i].id);
            jQuery('<div/>', {
                id:'foo23'+node[i].id,
                class: 'col-lg-5'
            }).appendTo('#foo1'+node[i].id);

            jQuery('<div/>', {
                id:'foo31'+node[i].id,
                class: 'row'
            }).appendTo('#foo23'+node[i].id);

            //Query('<div/>', {
            //   id:'foo41'+node[i].id,
            //    class: 'col-lg-3'
            //}).appendTo('#foo31'+node[i].id);
            //jQuery('<div/>', {
            //    id:'foo42'+node[i].id,
            //    class: 'col-lg-3'
            //}).appendTo('#foo31'+node[i].id);
            //jQuery('<div/>', {
            //    id:'foo43'+node[i].id,
            //    class: 'col-lg-6'
            //}).appendTo('#foo31'+node[i].id);

            jQuery('<button/>', {
                id:'foo51'+node[i].id,
                type:'button',
                class: 'btn btn-primary btn-circle'
            }).appendTo('#foo31'+node[i].id);

            jQuery('<button/>', {
                id:'foo52'+node[i].id,
                type:'button',
                class: 'btn btn-danger btn-circle'
            }).appendTo('#foo31'+node[i].id);

            $('#foo51'+node[i].id).attr('data-toggle','modal');
            $('#foo51'+node[i].id).attr('data-target','#editModal');

            $('#foo52'+node[i].id).attr('data-toggle','modal');
            $('#foo52'+node[i].id).attr('data-target','#deleteModal');
            
            jQuery('<i/>', {
                id:'foo61'+node[i].id,
                class: 'fa fa-edit'
            }).appendTo('#foo51'+node[i].id);         
            
            jQuery('<i/>', {
                id:'foo62'+node[i].id,
                class: 'fa fa-times'
            }).appendTo('#foo52'+node[i].id); 

            $('#node'+node[i].id).addClass('panel-info');      

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