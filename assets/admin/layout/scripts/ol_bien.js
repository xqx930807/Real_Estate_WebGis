/* ON Load*/
	jQuery(document).ready(function(){
		Metronic.init(); // init metronic core components
		Layout.init(); // init current layout
		QuickSidebar.init(); // init quick sidebar
		Demo.init(); // init demo features

		$('#nav_gerer').removeClass('active');
		$('#nav_add').addClass('active');
		$('#nav_map').removeClass('active');
	});




// Map Layers 
	// Global Vriables
		var intId=3;
	
	// OSM Layer
	var layerOSM = new ol.layer.Tile({
		source: new ol.source.OSM(),
		name: 'OpenStreetMap'
	});

	// Les Titres
	var wms = new ol.layer.Tile({
		title: 'Titre',
		name:'Titre',
		source: new ol.source.TileWMS({
			url: 'http://localhost:8080/geoserver/UIT/wms',
			params: {
				'LAYERS': 'UIT:titres',
				'TRANSPARENT': 'true'
			}
		})
	});

	// Create vector layers
		var limitsLayer = new ol.layer.Vector({
			name:'Calque Graphique',
			title:'Calque Graphique',
		});
		limitsLayer.setSource(new ol.source.Vector({features:new ol.Feature()}));

// Map Projection
	var projection = new ol.proj.Projection({
		code: 'EPSG:26191',
		units: 'm'
	});

// Map View
	var view = new ol.View({
		center: [726037.848713, 510454.801936],
		projection: projection,
		zoom: 12
	});



// Map Controls
	var control = [
		new ol.control.FullScreen(),
		new ol.control.Zoom()
	];

// Map Instance
	var map = new ol.Map({
		target: 'map',
		layers: [layerOSM,limitsLayer],
		renderer: 'canvas', // Force the renderer to be used
		controls: control,
		view: view
	});

/*** Upload Image preview **/
	$("#image_upload").on('change',function(){
		readURL(this);
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			
			reader.onload = function (e) {
				$('#preview').attr('src', e.target.result);
			}
			
			reader.readAsDataURL(input.files[0]);
		}
	}

/*** Add Coordinate Field **/
	$('#creer_champ').click(function() {
			intId = $("#ok .form-group").length + 1;
			var fieldWrapper = $("<div class='form-group' id='field" + intId + "'/>");
			var flabel = "<label class='col-md-3 control-label'>Coordonnée (X,Y)</label>";
			var fieldWrapper2 = $('<div class="col-md-12">');
			fName ='<input value="725205.67" id="coord_x" type="text" class="form-control input-inline input-medium" placeholder="52646,256" name="position">';
			fName +='<input value="510081.18" id="coord_y" type="text" class="form-control input-inline input-medium" placeholder="52646,256" name="position">';
			var removeButton = $('<button type="button" class="btn red" ><i class="fa fa-times"></i></button>');
			removeButton.click(function() {
				$(this).closest('.form-group').remove();
				intId--;
			});
			fieldWrapper2.append(flabel);
			fieldWrapper2.append(fName);
			fieldWrapper2.append(removeButton);
			fieldWrapper.append(fieldWrapper2);
			$("#ok").append(fieldWrapper);
	});

/*** Add Coordinate Field **/
	function getCoord() {
		var array =[]
		var coord = [];
		for (var i = 1; i <= intId; i++) {
			coord = [$('#field'+i+' #coord_x').val() , $('#field'+i+' #coord_y').val()];
			array[i-1]=coord;
		}
		return array;
	}

	function make_geo() {
		var array =getCoord();
		var x="POLYGON((";
		for (var i = 0; i < array.length; i++) {
			x += array[i][0]+" "+array[i][1];
			if(i<array.length -1 ) x += ",";
			else x+=","+array[0][0]+" "+array[0][1]
		}
		x +="))";
		return x;
	}



/*** Add Geometry  **/
	var geometry = new ol.geom.Polygon();
	var polyFeature = new ol.Feature({geometry:geometry});
	var source = new ol.source.Vector();
	var vectorLayer = new ol.layer.Vector({
			source: source,
			map:map
		});
	
	$('#dessiner').click(function(event) {
		geometry.setCoordinates([getCoord()]);
		try {
			source.addFeature(polyFeature);
			view.fit(polyFeature.getGeometry(),map.getSize());
		}
		catch(err) {
			console.log('Failed');
		}
	});


	var nature = "Non immatricule";
	$('#non_im,#req,#titre_radio').change(function(event) {
		if($("#non_im").is(":checked")){
			$('#titre').prop('disabled', true);
			nature = "Non immatricule";
		}
		if($("#req").is(":checked")){
			$('#titre').prop('disabled', false);
			$('#titre_label').html("Numéro de Réquisition");
			nature = "Requisition";
		}
		if($("#titre_radio").is(":checked")){
			$('#titre').prop('disabled', false);
			$('#titre_label').html("Titre foncier");
			nature = "Titre foncier";
		}
	});



	// $('#CHECKBOX_ID').change(function(event) {
	// 	if($("#CHECKBOX_ID").is(":checked")){
	// 		// Traitement 
			
	// 	}
	// });



	$('#consistance').change(function(event) {
		//Terrain
		if(this.value == 1)
			$('#nbre_etage').prop("disabled", true);

		// Maison ou Villa
		if(this.value == 2 || this.value == 3)
			$('#nbre_etage').prop("disabled", false);

		// Appartement
		if(this.value == 4){
			$('#etage_titre').html("Situation");
			$('#nbre_etage').prop("disabled", false);
		}
	});





// function resetForm() {
//     // clearing inputs
//     var inputs = $('#form1').getElementsByTagName('input');
//     for (var i = 0; i<inputs.length; i++) {
//         switch (inputs[i].type) {
//             case 'hidden':
//             case 'text':
//                 inputs[i].value = '';
//                 break;
//             case 'radio':
//             case 'checkbox':
//                 inputs[i].checked = false;   
//         }
//     }
    
//     // clearing selects
//     var selects = form.getElementsByTagName('select');
//     for (var i = 0; i<selects.length; i++)
//         selects[i].selectedIndex = 0;
    
//     // clearing textarea
//     var text= form.getElementsByTagName('textarea');
//     for (var i = 0; i<text.length; i++)
//         text[i].innerHTML= '';
    
//     return false;
// }


	$('#send_data').click(function(e) {
		e.preventDefault();
		// GET DATA
		var titre = $('#titre').val();
		var adresse = $('#adresse').val();
		var consistance = $('#consistance').select2("data").text;;
		var nbre_etage = $('#nbre_etage').val();
		var surface_totale = $('#surface_totale').val();
		var surface_construite = $('#surface_construite').val();
		var valeur_venale = $('#valeur_venale').val();

		// Upload Files
		$.ajaxFileUpload({
			url             :window.location.origin + '/ci/pages/upload_file', 
			secureuri       :false,
			fileElementId   :'image_upload',
			data:{
				'titre':titre,
				'adresse':adresse,
				'consistance':consistance,
				'nbre_etage':nbre_etage,
				'surface_totale':surface_totale,
				'surface_construite':surface_construite,
				'valeur_venale':valeur_venale,
				'nature':nature,
				'geometrie':make_geo()
			},
			dataType: 'JSON',
			success : function (data)
			{
				// $('#sucesss').modal('show');
			   var obj = jQuery.parseJSON(data);
				if(obj['status'] == 'success')
				{
					// $('#files').html(obj['msg']);
					// console.log('ok');
					
				 }
				else
				 {
					console.log('ops');
				  }
			}
		});


		bootbox.alert({
				title:'Information',
				message:" Les données sont bien enregistées",
				callback:function(result){
					$(document).find('form')[0].reset();
					$(document).find('form')[1].reset();
				}
        });
		return false;
	});




var array ;
$('#draw_polygon').click(function(e) {
	console.log('end');
	interaction = new ol.interaction.Draw({
	type: 'Polygon',
	source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawend', function(evt) {
		// evt.feature.setStyle(Polystyle);
		array = evt.feature.getGeometry().getCoordinates();
		var x="POLYGON((";
		for (var i = 0; i < array[0].length; i++) {
			x += array[0][i][0]+" "+array[0][i][1];
			if(i<array[0].length -1 ) x += ",";
			else x+=","+array[0][0][0]+" "+array[0][0][1]
		}
		x +="))";
		console.log(x);
		
	});
	e.stopPropagation();
});

$('#clear').click(function(event) {
	limitsLayer.getSource().clear();
});



