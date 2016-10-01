/* ON Load*/
	jQuery(document).ready(function(){
		// Init
		Metronic.init();
		Layout.init();
		QuickSidebar.init();
		Demo.init();
		ComponentsFormTools2.init();

		$('#nav_gerer').removeClass('active');
		$('#nav_add').removeClass('active');
		$('#nav_map').addClass('active');

		// Surface
			$("#range_2").ionRangeSlider({
				postfix: " m²",
				type: 'double',
				min:70,
				max:400,
				from:158,
				step:1,
				onChange: function (data) {
					filtre_surface(data.fromNumber,data.toNumber);
				},
				to:225
			});

		// PRIX
			$("#range_1").ionRangeSlider({
				min: 10,
				max: 3000,
				from: 250,
				to: 700,
				type: 'double',
				step: 1,
				postfix: "KDH",
				prettify: false,
				hasGrid: false,
				onChange: function (data) {
					filtre_prix(data.fromNumber,data.toNumber);
				},
			});

		// Draggable Modal
			$("#draggable").draggable({
				handle: ".modal-header"
			});

		// Draggable Modal
			$("#add_coordinate_modal").draggable({
				handle: ".modal-header"
			});
		// Draggable Modal
			$("#estimation_modal").draggable({
				handle: ".modal-header"
			});

		/*** Layer Tree **/
		initializeTree();

		get_bookmarks();
		// Select box Init
			$("#scale_select").selectbox();
			$("#Base_map").selectbox();
			$("#bookmarks").selectbox();
		
		// Bookmark propreties 
			$('#bookmarks_container .sbHolder').attr('style','width:180px');

		// Opacity Control Init
			$('input.opacity').slider();

		// Handle opacity slider control
			$('input.opacity').on('slide', function(ev) {
				var layername = $(this).closest('li').data('layerid');
				var layer = findBy(map.getLayerGroup(), 'name', layername);
				layer.setOpacity(ev.value);
			});

		// Handle visibility control
			$('#layertree i').on('click', function() {
				var layername = $(this).closest('li').data('layerid');
				var layer = findBy(map.getLayerGroup(), 'name', layername);
				layer.setVisible(!layer.getVisible());
				if (layer.getVisible()) {
					$(this).removeClass('fa fa-eye-slash ').addClass('fa fa-eye');
				} else {
					$(this).removeClass('fa fa-eye').addClass('fa fa-eye-slash ');
				}
			});

			//Dropdown plugin data
			var ddData = [
				{
					text: "Carto DB",
					value: "CD",
					description: "Carto DB",
					imageSrc: "http://127.0.0.1/ci/assets/global/img/Basemap/bingmap.png"
				},
				{
					text: "Bing Maps",
					value: "BM",
					description: "Image Aérienne",
					imageSrc: "http://127.0.0.1/ci/assets/global/img/Basemap/binsatellite.png"
				},
				{
					text: "MapQuest",
					value: "MQ",
					description: "Fond de carte",
					imageSrc: "http://127.0.0.1/ci/assets/global/img/Basemap/mapquest.png"
				},
				{
					text: "OSM",
					value: "OSM",
					description: "Open Street Map",
					imageSrc: "http://127.0.0.1/ci/assets/global/img/Basemap/bingmap.png"
				},
				{
					text: "WorldStreetMap",
					value: "WSM",
					description: "Fond de carte",
					imageSrc: "http://127.0.0.1/ci/assets/global/img/Basemap/bingmap.png"
				}
			];

			// BaseMap
			$('#demoBasic').ddslick({
				data: ddData,
				selectText: "Base Map",
				showSelectedHTML: false,
				onSelected: function(selectedData){
					// var str = $(this).val();

					switch(selectedData.selectedData.value) {
						case 'MQ':
							hide_all();
							layerMQ.setVisible(true);
							break;
						case 'CD':
							hide_all();
							carto.setVisible(true);
							break;
						case 'OSM':
							hide_all();
							layerOSM.setVisible(true);
							layerOSM.setZIndex(0);
							break;
						// case 'CG':
						// 	hide_all();
						// 	tiled.setVisible(true);
						// 	break;
						case 'WSM':
							hide_all();
							WorldStreetMap.setVisible(true);
							break;
						case 'BM':
							hide_all();
							BingMaps_Sat.setVisible(true);
							break;
						default:
							console.log('de');
					} 
				}
			});

			// Hide all layers
			function hide_all() {
				layerOSM.setVisible(false);
				//tiled.setVisible(false);
				WorldStreetMap.setVisible(false);
				carto.setVisible(false);
				BingMaps_Sat.setVisible(false);
				layerMQ.setVisible(false)
			}

			var ddBasic = [
				{ text: "Mètres(m)", value: 1, },
				{ text: "Kilomètres(Km)", value: 2, },
				{ text: "LinkedIn", value: 3, },
				{ text: "Foursquare", value: 4, }
			];

			// Demo 1---------------------
			$('#noimage').ddslick({
				data: ddBasic,
				width: 130,
				height: 55,
				selectText: "Mètres(m)"
			});

			$('.select2-container .select2-choice').css('background-image','none');
});


// Map Layers 
	// CartoDb Layer
		var carto = new ol.layer.Tile({
			source: new ol.source.XYZ({
				url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
				crossOrigin: 'anonymous'
			}),
			name: 'Carto DB'
		});

	// OSM Layer
		var layerOSM = new ol.layer.Tile({
			source: new ol.source.OSM(),
			name: 'OpenStreetMap',
			visible:false
		});

	// OSM MapQuest Layer
		var layerMQ = new ol.layer.Tile({
			source: new ol.source.MapQuest({
				layer: 'osm',
				key:encodeURI("BCifxbETUHhKYeWAkMUrk0dq8UGdX1Vp"),
				crossOrigin: 'anonymous'
			}),
			name: 'MapQuest',
			visible:false
		});

	// Biens
		// var WFS_Src = new ol.source.Vector({features:new ol.Feature()});
		// 	var WFS_layer = new ol.layer.Vector({
		// 	source: WFS_Src,
		// 	name: 'Couche des biens'
		// });
		sourceVector = new ol.source.Vector({
			loader: function(extent, resolution, projection) {
				$.ajax('http://127.0.0.1/cgi-bin/proxy.py?' + encodeURIComponent("http://127.0.0.1:8080/geoserver/cite/ows?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=Bien_view&VERSION=1.1.0&outputFormat=text/javascript"),{
					type: 'GET',
					dataType: 'jsonp',
					jsonpCallback:'callback:loadFeatures',
					jsonp:'format_options'
					});
				}
		});
	// Classification
		var Appartement_Style,Villa_Style,Terrain_Style,Maison_Style;
		window.loadFeatures = function(response) {
			geoJSON = new ol.format.GeoJSON();
			sourceVector.addFeatures(geoJSON.readFeatures(response));
			Appartement_Style = new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(223,186,73, 0.7)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(0, 0, 255, 0.2)',
							width: 1
						})
					});
			Villa_Style = new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(69,182,175, 0.7)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(0, 0, 255, 0.2)',
							width: 1
						})
					});
			Terrain_Style = new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(243,86,93, 0.7)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(0, 0, 255, 0.2)',
							width: 1
						})
					});
			Maison_Style = new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(66,139,202, 0.7)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(0, 0, 255, 0.2)',
							width: 1
						})
					});
			var array_feature = sourceVector.getFeatures();
			for (var i = 0; i < array_feature.length; i++) {
				if(array_feature[i].getProperties()['consistance'].trim()=='Appartement') array_feature[i].setStyle(Appartement_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Villa') array_feature[i].setStyle(Villa_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Terrain') array_feature[i].setStyle(Terrain_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Maison') array_feature[i].setStyle(Maison_Style);
			}
		};

		layerVector = new ol.layer.Vector({
			name : 'Calque des biens',
			source: sourceVector,
			style: new ol.style.Style({
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 255, 1.0)',
					width: 2
					})
				})	
		});

		var OBS_LAYERS=[
			"world_countries",
			"RAS_GOES",
			"RAS_GOES_I4",
			"RAS_RIDGE_NEXRAD",
			"OBS_MET_TEMP",
			"OBS_MET_DP",
			"OBS_MET_WIND",
			"OBS_MET_PRES",
			"OBS_MET_VIS",
			"OBS_MAR_SSTF",
			"OBS_MAR_SWHFT",
			"OBS_MET_ID"];
		var WorldStreetMap = new ol.layer.Tile({
			source: new ol.source.TileArcGISRest({ url: "http://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer"}),
			name : "x",
			visible:false
		});
		var NGO = new ol.layer.Tile({
			source: new ol.source.TileArcGISRest({ url: "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer"}),
			name : "NGO"
		});

		var apiKey = encodeURI("DdOjWbfD2GEzdNWngQjM~67pKlfB2cPBF5DNikvKlKw~AiS60agCEer7HxHsSnhr0arMzzvJb4DKACz2VH5AFf1j1vxCMEsHzzPBQ09Wxr-R");
		var BingMaps_Sat = new ol.layer.Tile({
			source: new ol.source.BingMaps({ key: apiKey, imagerySet: 'AerialWithLabels'}),
			name : "BingMaps",
			visible:false
		});

	// Create vector layers
		var limitsLayer = new ol.layer.Vector({
			name:'Calque Graphique',
			title:'Calque Graphique',
		});
		limitsLayer.setSource(new ol.source.Vector({features:new ol.Feature()}));
	
	// Layer
		var estimation_layer = new ol.layer.Vector({
			name:"Op",
			title:'Calque Graphique',
			visible:true
		});
		var estimation_feature = new ol.Feature();
		estimation_layer.setSource(new ol.source.Vector({features:estimation_feature}));

// Map Projection
	var projection = new ol.proj.Projection({
		code: 'EPSG:26191',
		units: 'm'
	});

// Map View
	var view = new ol.View({
		center: [726037.848713, 510454.801936],
		projection: projection,
		// extent: [688404.702841, 529454.147824, 765031.112178, 480290.163940],
		zoom: 12
	});

// OverView View
	var overviewmap_view = new ol.View({
		center: [726037.848713, 510454.801936],
		projection: projection,
		// extent: extent,
		zoom: 12
	});

	var zoom_array = [];
	var zoom_pos = 0;
	// var zoom_lenght = zoom_array.length();
	// Custom - Scale Control
		var scale_control = new ol.control.Control({element: document.getElementById('scale_control')});
			var scale_control = function(opt_options) {
			var options = opt_options || {};
			var element = document.getElementById('scale_control');
			var this_ = this;
			view.on('change:resolution', function(event) {
				var resolution = event.target.get('resolution');
				var units = map.getView().getProjection().getUnits();
				var dpi = 25.4 / 0.28;
				var mpu = ol.proj.METERS_PER_UNIT[units];
				var scale = resolution * mpu * 39.37 * dpi;
				$('#scale_control_val').html(Math.round(scale));
				event.preventDefault();
			});

			ol.control.Control.call(this, {
				element: element,
				target: options.target
			});
		};
		ol.inherits(scale_control, ol.control.Control);


//Instantiate with some options and add the Control
	var geocoder = new Geocoder('nominatim', {
		provider: 'photon',
		lang: 'en',
		placeholder: 'Recherche ...',
		limit: 5,
		keepOpen: true
	});

// Map Controls - DEFAULT
	var control = [
		new ol.control.OverviewMap({
			layers: [
				new ol.layer.Tile({
					source: new ol.source.OSM({'url': 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'})
				})
			],
			view:overviewmap_view,
			collapsed: false
		}),
		new scale_control(),
		geocoder,
		new ol.control.ScaleLine(),
		new ol.control.FullScreen(),
		new ol.control.Zoom(),
		new ol.control.ZoomSlider(),
		new ol.control.ZoomToExtent(),
		new ol.control.MousePosition({
			undefinedHTML: 'N/A',
			projection: 'EPSG:26191',
			coordinateFormat: function(coordinate) {
				return ol.coordinate.format(coordinate, '<span class="coord">X:</span>{x} <br><span class="coord"> Y: </span> {y}', 10);
			}
		}),
	];

// Map Overlay
	var overlay = new ol.Overlay({
		element: document.getElementById('popup'),
		positioning: 'bottom-center'
	});


// Map Overlay 2
	var overlay2 = new ol.Overlay({
		element: document.getElementById('popup_coordinate'),
		positioning: 'bottom-center'
	});

// Map Instance
	var map = new ol.Map({
		target: 'map',
		layers: [carto,BingMaps_Sat,layerOSM,WorldStreetMap,layerMQ,layerVector,limitsLayer,estimation_layer],
		renderer: 'canvas', // Force the renderer to be used
		controls: control,
		overlays: [overlay],
		interactions: ol.interaction.defaults({dragPan: false}).extend([
			new ol.interaction.DragRotateAndZoom()
		]),
		view: view,
		loadTilesWhileAnimating: true,
		loadTilesWhileInteracting: true
	});

// Name the root layer group
	map.getLayerGroup().set('name', 'Root');

// Map OverView Drag - Set Extent
	var setNewExtent = function (overviewDiv) {
		var offset = overviewDiv.helper.position();
		var divSize = [overviewDiv.helper.width(), overviewDiv.helper.height()];
		var mapSize = map.getSize();
		var c = map.getView().getResolution();
		var xMove = offset.left * (Math.abs(mapSize[0] / divSize[0]));
		var yMove = offset.top * (Math.abs(mapSize[1] / divSize[1]));
		var bottomLeft = [0 + xMove, mapSize[1] + yMove];
		var topRight = [mapSize[0] + xMove, 0 + yMove];
		var left = map.getCoordinateFromPixel(bottomLeft);
		var top = map.getCoordinateFromPixel(topRight);
		var extent = [left[0], left[1], top[0], top[1]];
		map.getView().fit(extent, map.getSize());
		map.getView().setResolution(c);
	};

// Map OverView Drag **/
	// $.getScript("http://code.jquery.com/ui/1.11.3/jquery-ui.min.js", function(data, textStatus, jqxhr) {
	// 	if (jqxhr.status===200) {

	// 	}
	// });


		$(".ol-overviewmap-box").draggable({drag: function (event, ui) {}});
		$(".ol-overviewmap-box").on("dragstop", function (event, ui) {
			setNewExtent(ui);
			/* After drag the box left and top are off */
			$(".ol-overviewmap-box").css("left", "auto");
			$(".ol-overviewmap-box").css("top", "auto");
		});


/* The Menu Button Event */
	// Pan Click Event
		$('#pan,#pan2,#pan3,#pan4').toggle(function () {
			$('#map').css({cursor: "pointer"});
			$(this).addClass( "clicked" );
			map.addInteraction(dragpan_interaction);
		},
		function (){
			$('#map').css({cursor: "auto"});
			$( this ).removeClass("clicked" );
			map.removeInteraction(dragpan_interaction);
		});

		var plot_coordinate = 0;
	// plot Coordinate Click Event
		$('#plot_coordinate').toggle(function () {
			$(this).addClass( "clicked" );
			plot_coordinate = 1;
			// map.addInteraction(dragpan_interaction);
		},
		function (){
			$( this ).removeClass("clicked" );
			plot_coordinate = 0;
			// map.removeInteraction(dragpan_interaction);
		});

	// Zoom IN Click Event
		$("#zoom_in,#zoom_in1,#zoom_in2,#zoom_in3,#zoom_in4").click(function() {
			map.getView().setZoom(map.getView().getZoom() + 1);
			$('#prev_extent').css('opacity','1');
			var extent = map.getView().calculateExtent(map.getSize());
			zoom_array.push(extent);
			zoom_pos++;
		});

	// Zoom OUT Click Event
		$("#zoom_out,#zoom_out1,#zoom_out2,#zoom_out3,#zoom_out4").click(function() {
			map.getView().setZoom(map.getView().getZoom() - 1);
			$('#next_extent').css('opacity','1');
			var extent = map.getView().calculateExtent(map.getSize());
			zoom_array.push(extent);
			zoom_pos--;
		});

	// Full Extent Click Event
		$("#full_extent").click(function() {
			var extent = map.getView().calculateExtent(map.getSize());
			map.getView().fit(extent, map.getSize());
		});

	// Prev Extent Click Event
		$("#prev_extent").click(function() {
			var zoom_lenght = zoom_array.length;
			if(zoom_lenght >= zoom_pos){
				var ext = zoom_array[zoom_pos-1];
				map.getView().fit(ext, map.getSize());
				zoom_pos--;
			}
		});

	// NEXT Extent Click Event
		$("#next_extent").click(function() {
			var zoom_lenght = zoom_array.length;
			if(zoom_lenght >= zoom_pos){
				var ext = zoom_array[zoom_pos+1];
				map.getView().fit(ext, map.getSize());
				zoom_pos++;
			}
		});

	// PRINT Event
		$("#print").click(function() {
			canvas = document.getElementsByTagName('canvas')[0], ctx = canvas.getContext("2d");
			var win=window.open();
			win.document.write("<br><img src='"+canvas.toDataURL()+"'/>");
			win.print();
			win.location.reload();
		});

	// PRINT Event
		$("#search_type").click(function() {
			$('#recherche_tab').addClass('active');
		$('.tab-pane').each(function(i,t){
			$('#names_tab li').removeClass('active'); 
			$(this).addClass('active');
		});
		});


		$("#apprt_check").change(function(event) {
			if(!this.checked) { 

				empty = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(66,139,202, 0)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0)',
								width: 1
							})
						});


				var array_feature = sourceVector.getFeatures(); // kanjib ga3 les features li f source w 
				// kandirhom f tableau

				// kanparcoru tableau li fih ga3 les categories bien sur
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Appartement') 
						// ida kanat smitha appartement hadik la clomun "consistance "
						array_feature[i].setStyle(empty); // donc 3tiha style null
				}

			}else{
				Appartement_Style = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(223,186,73, 0.7)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0.2)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Appartement') array_feature[i].setStyle(Appartement_Style);
				}
			}
		});

		$("#villa_check").change(function(event) {
			if(!this.checked) {
				empty = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(66,139,202, 0)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Villa') array_feature[i].setStyle(empty);
				}
			}else{
				Villa_Style = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(69,182,175, 0.7)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0.2)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Villa') array_feature[i].setStyle(Villa_Style);
				}
			}
		});

		$("#terrain_check").change(function(event) {
			if(!this.checked) {
				empty = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(66,139,202, 0)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Terrain') array_feature[i].setStyle(empty);
				}
			}else{
				Terrain_Style = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(243,86,93, 0.7)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0.2)',
								width: 1
							})
				});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Terrain') array_feature[i].setStyle(Terrain_Style);
				}
			}
		});

		$("#maison_check").change(function(event) {
			if(!this.checked) {
				empty = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(66,139,202, 0)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Maison') array_feature[i].setStyle(empty);
				}
			}else{
				Maison_Style = new ol.style.Style({
							fill: new ol.style.Fill({
								color: 'rgba(66,139,202, 0.7)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 255, 0.2)',
								width: 1
							})
						});
				var array_feature = sourceVector.getFeatures();
				for (var i = 0; i < array_feature.length; i++) {
					if(array_feature[i].getProperties()['consistance'].trim()=='Maison') array_feature[i].setStyle(Maison_Style);
				}
			}
		});

// Filtre par Surface
	function filtre_surface(from,to) {
		var array_feature = sourceVector.getFeatures();
		empty = new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(66,139,202, 0)'
					}),
					stroke: new ol.style.Stroke({
						color: 'rgba(0, 0, 255, 0)',
						width: 1
					})
				});
		for (var i = 0; i < array_feature.length; i++) {
			var surface= array_feature[i].getProperties()['surface_totale'];
			if( surface > from && surface <to){
				if(array_feature[i].getProperties()['consistance'].trim()=='Appartement') array_feature[i].setStyle(Appartement_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Villa') array_feature[i].setStyle(Villa_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Terrain') array_feature[i].setStyle(Terrain_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Maison') array_feature[i].setStyle(Maison_Style);
			}else{
				array_feature[i].setStyle(empty);
			}
		}
	}

// Filtre par Prix
	function filtre_prix(from,to) {
		var array_feature = sourceVector.getFeatures();
		empty = new ol.style.Style({
					fill: new ol.style.Fill({
						color: 'rgba(66,139,202, 0)'
					}),
					stroke: new ol.style.Stroke({
						color: 'rgba(0, 0, 255, 0)',
						width: 1
					})
				});
		for (var i = 0; i < array_feature.length; i++) {
			var valeur= array_feature[i].getProperties()['valeur_venale'];
			console.log(from+':'+to+':'+valeur);
			if( valeur > from && valeur <to){
				if(array_feature[i].getProperties()['consistance'].trim()=='Appartement') array_feature[i].setStyle(Appartement_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Villa') array_feature[i].setStyle(Villa_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Terrain') array_feature[i].setStyle(Terrain_Style);
				if(array_feature[i].getProperties()['consistance'].trim()=='Maison') array_feature[i].setStyle(Maison_Style);
			}else{
				array_feature[i].setStyle(empty);
			}
		}
	}


		// Transform Scale to Resolution
			function scale2Resolution(scale=2000) {
					var units = map.getView().getProjection().getUnits();
					var dpi = 25.4 / 0.28;
					var mpu = ol.proj.METERS_PER_UNIT[units];
					var resolution = scale/(mpu * 39.37 * dpi)
					console.log(resolution);
					view.setResolution(resolution);
			}



	/* Add a click handler to hide the popup.
	 * @return {boolean} Don't follow the href.
	 */
		var closer = document.getElementById('popup-closer');
		closer.onclick = function() {
			overlay.setPosition(undefined);
			closer.blur();
			return false;
		};

/* Layer Tree */
	/**
	* Build a tree layer from the map layers with visible and opacity 
	* options.
	* 
	* @param {type} layer
	* @returns {String}
	*/
	function buildLayerTree(layer) {
		if(typeof  layer.get('name') != 'undefined'){
			var elem;
		var name = layer.get('name') ? layer.get('name') : "Group";
			var div = "<li class='layertree' data-layerid='" + name + "'>" +
				"<i class='fa fa-eye ' style='font-size:16px;cursor:pointer'></i><span class='layername'>" + layer.get('name') + "</span>" +
				"" +
				"<input style='width:80px;' class='opacity' type='text' value='' data-slider-min='0' data-slider-max='1' data-slider-step='0.1' data-slider-tooltip='hide'>";
		}
		if (layer.getLayers) {
			var sublayersElem = ''; 
			var layers = layer.getLayers().getArray(),
					len = layers.length;
			for (var i = len - 1; i >= 0; i--) {
				if(layers[i].get('visible') && layers[i].get('name') != 'Op' && typeof layers[i].get('name') != 'undefined' )
					sublayersElem += buildLayerTree(layers[i]);
			}
			//elem = div + " <ul>" + sublayersElem + "</ul></li>";
			elem = sublayersElem + "</li>";
		}else {
			elem = div + " </li>";
		}
		return elem;
	}

	/**
	 * Initialize the tree from the map layers
	 * @returns {undefined}
	 */
	function initializeTree() {
		var elem = buildLayerTree(map.getLayerGroup());
		$('#layertree').empty().append(elem);
		// $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
		$('.tree li.parent_li > span').on('click', function(e) {
			var children = $(this).parent('li.parent_li').find(' > ul > li');
			if (children.is(":visible")) {
				children.hide('fast');
				$(this).attr('title', 'Expand this branch').find(' > i').addClass('fa fa-plus-eye-slash ').removeClass('fa fa-minus-eye-slash ');
			} else {
				children.show('fast');
				$(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa fa-minus-eye-slash ').removeClass('fa fa-plus-eye-slash ');
			}
			e.stopPropagation();
		});
	}

	/**
	 * Finds recursively the layer with the specified key and value.
	 * @param {ol.layer.Base} layer
	 * @param {String} key
	 * @param {any} value
	 * @returns {ol.layer.Base}
	 */
	function findBy(layer, key, value) {
		if (layer.get(key) === value) {
			return layer;
		}
		// Find recursively if it is a group
		if (layer.getLayers) {
			var layers = layer.getLayers().getArray(),
					len = layers.length, result;
			for (var i = 0; i < len; i++) {
				result = findBy(layers[i], key, value);
				if (result) {
					return result;
				}
			}
		}
		return null;
	}

/* Tab dynamic title of side bar */
	$('a[href="#calques_tab"], a[href="#recherche_tab"], a[href="#Resultat_tab"]').click(function(event) {
		$('#sidebar_titre').empty();
		$('#sidebar_titre').html($(this).html());
		$('#sidebar_titre').find("i.ifont").attr('style','margin-right:8px;color:white');
	});

// Initialize the interactions
	var dragpan_interaction = new ol.interaction.DragPan();

	var selectInteraction = new ol.interaction.Select({
		condition: ol.events.condition.never
	});

	var dragBoxInteraction = new ol.interaction.DragBox({
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: [250, 25, 25, 1]
			})
		})
	});

	dragBoxInteraction.on('boxend', function(event) {
		// var selectedFeatures = selectInteraction.getFeatures();
		// selectedFeatures.clear();
		var extent = dragBoxInteraction.getGeometry().getExtent();
		map.getView().fit(extent, map.getSize());
		// wms.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
		// 	selectedFeatures.push(feature);
		// });
	});

// Add or remove interactions
	$('#interact').on('click', function(event) {
		// var checked = !$('#select').hasClass('active');
		// if(checked) {
			map.addInteraction(selectInteraction);
			map.addInteraction(dragBoxInteraction);
		// } else {
		// 	map.removeInteraction(selectInteraction);
		// 	map.removeInteraction(dragBoxInteraction);
		// }
		// map.removeInteraction(interaction);
		// interaction = new ol.interaction.Modify({
		// features: new ol.Collection(limitsLayer.getSource().getFeatures())
		// });
		// map.addInteraction(interaction);
	});


var selectInteraction2,dragBoxInteraction2;
$('#select_rect').toggle(function () {
	$( this ).addClass("clicked" );
	selectInteraction2 = new ol.interaction.Select({
		condition: ol.events.condition.never
	});

	dragBoxInteraction2 = new ol.interaction.DragBox({
		style: new ol.style.Style({
			stroke: new ol.style.Stroke({
				color: [250, 25, 25, 1]
			})
		})
	});

	map.addInteraction(selectInteraction2);
	map.addInteraction(dragBoxInteraction2);
	dragBoxInteraction2.on('boxend', function(event) {
		// var selectedFeatures = selectInteraction.getFeatures();
		// selectedFeatures.clear();
		var selectedFeature=[];
		var extent = dragBoxInteraction2.getGeometry().getExtent();
		layerVector.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			selectedFeature.push(feature);
			//feature.setStyle(Appartement_Style);
		});
			load_content(selectedFeature);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(dragBoxInteraction2);
	map.removeInteraction(selectInteraction2);
});


var popup_test = 1;

var selectInteraction3,dragBoxInteraction3;
$('#select_point').toggle(function () {
	popup_test=0;
	$( this ).addClass("clicked" );
	$('#selection_res').show();
	$('#no_result').hide();
	$('#estimation_section').hide();
	pointx = new ol.style.Style({
		image: new ol.style.RegularShape({
			radius1: 13,
			radius2: 3,
			points: 4,
			angle: Math.PI/4,
			fill: new ol.style.Fill({
				color: '#FF5555',
			}),
			stroke: new ol.style.Stroke({
				color: 'rgba(255,255,255, 0.5)',
				width: 1
			})
		})
	});
	selectInteraction3 = new ol.interaction.Draw({
		type: 'Point',
		source: limitsLayer.getSource(),
		style:pointx
	});
	limitsLayer.setStyle(pointx);
	map.addInteraction(selectInteraction3);
	selectInteraction3.on('drawstart', function(event) {
		limitsLayer.getSource().clear();
	});
	selectInteraction3.on('drawend', function(event) {
		var selectedFeature=[];
		var extent = event.feature.getGeometry().getExtent();
		layerVector.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			selectedFeature.push(feature);
			//feature.setStyle(Appartement_Style);
		});
		load_content(selectedFeature);
		
	});
},
function (){
	popup_test=1;
	$( this ).removeClass("clicked" );
	// map.removeInteraction(dragBoxInteraction3);
	map.removeInteraction(selectInteraction3);
	limitsLayer.getSource().clear();
});



var selectInteraction4,dragBoxInteraction4;
$('#select_polygon').toggle(function () {
	$( this ).addClass("clicked" );
	selectInteraction4 = new ol.interaction.Draw({
		type: 'Polygon',
		source: limitsLayer.getSource()
	});
	map.addInteraction(selectInteraction4);
	selectInteraction4.on('drawstart', function(event) {
		limitsLayer.getSource().clear();
	});
	selectInteraction4.on('drawend', function(event) {
		var selectedFeature=[];
		var extent = event.feature.getGeometry().getExtent();
		layerVector.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			selectedFeature.push(feature);
			//feature.setStyle(Appartement_Style);
		});
			load_content(selectedFeature);
	});
},
function (){
	$( this ).removeClass("clicked" );
	// map.removeInteraction(dragBoxInteraction3);
	map.removeInteraction(selectInteraction4);
	limitsLayer.getSource().clear();
});

var selectInteraction5,dragBoxInteraction5;
$('#select_line').toggle(function () {
	$( this ).addClass("clicked" );
	selectInteraction5 = new ol.interaction.Draw({
		type: 'LineString',
		source: limitsLayer.getSource()
	});
	map.addInteraction(selectInteraction5);
	selectInteraction5.on('drawstart', function(event) {
		limitsLayer.getSource().clear();
	});
	selectInteraction5.on('drawend', function(event) {
		var selectedFeature=[];
		var extent = event.feature.getGeometry().getExtent();
		layerVector.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			selectedFeature.push(feature);
			//feature.setStyle(Appartement_Style);
		});
			load_content(selectedFeature);
	});
},
function (){
	$( this ).removeClass("clicked" );
	// map.removeInteraction(dragBoxInteraction3);
	map.removeInteraction(selectInteraction5);
	limitsLayer.getSource().clear();
});




function load_content(arry) {
	$('a[href="#Resultat_tab"]').tab('show');
	$('a[href="#recherche_tab"]').parent().hide();
	$('a[href="#Resultat_tab"]').parent().show();
	var res="";
	for (var i = 0; i < arry.length; i++) {
		res+='<div class="result">';
			res +='<h4> #'+(i+1)+' </h4>';
				res +='<table width="80%" style="border-collapse:separate; border-spacing:5px;">';
					res +='<tr>';
						res +='<td>Nature:</td>';
						res +='<td><span id="res_nature" style="margin-top:5px">'+arry[i].getProperties().consistance+'  </span></td>';
					res +='</tr>';
					res +='<tr>';
						res +='<td>Surface :</td>';
						res +='<td><span id="res_surface" style="margin-top:5px"> '+arry[i].getProperties().surface_totale+' m²</span></td>';
					res +='</tr>';
					res +='<tr>';
						res +='<td>Valeur Unitaire: </td>';
						res +='<td><span id="res_vu" style="margin-top:5px"> '+((arry[i].getProperties().valeur_venale*1000) / arry[i].getProperties().surface_totale).toFixed(4) +' DH/m²</span></td>';
					res +='</tr>';
					res +='<tr>';
						res +='<td>Valeur Vénale: </td>';
						res +='<td><span id="res_vv" style="margin-top:5px"> '+arry[i].getProperties().valeur_venale+' KDH</span></td>';
					res +='</tr>';
				res +='</table>';
		res +='</div>';
	}
	$('#selection_res').html(res);
	$('#selection_res').show();
	$('#no_result').show();
	$('#estimation_section').hide();
}

var interaction ;
//Dessin
	//Point


$('#draw_point').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
		type: 'Point',
		source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Pointstyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	// Remove previous interaction
	map.removeInteraction(interaction);
});




	//Rectangle
		var rectangle = new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255, 255, 255, 0.2)'
			}),
			stroke: new ol.style.Stroke({
				color: '#ffcc33',
				width: 2
			}),
			image: new ol.style.Circle({
				radius: 7,
				fill: new ol.style.Fill({
				color: '#ffcc33'
				})
			})
			});


$('#draw_rectangle').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
	type: 'Circle',
	maxPoints :2,
	geometryFunction:function(coordinates, geometry) {
			if (!geometry) {
				geometry = new ol.geom.Polygon(null);
			}
			var start = coordinates[0];
			var end = coordinates[1];
			geometry.setCoordinates([
				[start, [start[0], end[1]], end, [end[0], start[1]], start]
			]);
			return geometry;
			},
	source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Polystyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(interaction);
});



$('#draw_polygon').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
	type: 'Polygon',
	source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Polystyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(interaction);
});


$('#draw_polygon_freehand').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
	type: 'Polygon',
	freehandCondition: ol.events.condition.always,
	condition: ol.events.condition.never,
	source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Polystyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(interaction);
});


$('#draw_line').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
		type: 'LineString',
		source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Linestyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(interaction);
});

$('#draw_circle').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	interaction = new ol.interaction.Draw({
		type: 'Circle',
		source: limitsLayer.getSource()
	});
	map.addInteraction(interaction);
	interaction.on('drawstart', function(evt) {
		evt.feature.setStyle(Cerclestyle);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(interaction);
});

	//// Clear All
		$('#Clear').click(function(e) {
			limitsLayer.getSource().clear();
			$('#sucess_clear').modal('show');
		});
	////EdIT
		$('#edit').click(function(e) {
			// Remove previous interaction
			map.removeInteraction(interaction);
			interaction = new ol.interaction.Modify({
				features: new ol.Collection(limitsLayer.getSource().getFeatures())
			});
			map.addInteraction(interaction);
		});
	////Delete
$('#delete').toggle(function () {
	$( this ).addClass("clicked" );
	map.removeInteraction(interaction);
	del_interaction = new ol.interaction.Select();
	map.addInteraction(del_interaction);
	del_interaction.on('select', function(e) {
		limitsLayer.getSource().removeFeature(e.selected[0]);
	});
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(del_interaction);
});



function json2array(json){
	var result = [];
	var keys = Object.keys(json);
	console.log(keys);
	keys.forEach(function(key){
		result.push(json[key]);
	});
	return result;
}



function saveData() {
var allFeatures = limitsLayer.getSource().getFeatures(),
	format = new ol.format.GeoJSON(),
	data;
try {
	data = format.writeFeatures(allFeatures);
} catch (e) {
	return;
}
// if (dataTypeSelect.value === 'GeoJSON') {
// // format is JSON
	// console.log(JSON.stringify(data, null, 4));
	console.log(JSON.stringify(data, null, 4));
	// var blob = new Blob([JSON.stringify(data, null, 4)], {type: "application/json"});
	// saveAs(blob, "s.geojson");
	// console.log(data);
	// var serializer = new XMLSerializer();
	// console.log(serializer.serializeToString(data));
// } else {
// // format is XML (GPX or KML)
// var serializer = new XMLSerializer();
// document.getElementById('data').value = serializer.serializeToString(data);
// }
}




	$("#add_bookmark").click(function(e) {
		$('#add_bookmarks_modal').modal('show');
	});



	$("input[id='plot-coordinate']").click(function(e) {
		$('#portlet-config').modal('show');
	});

var Linestyle,Polystyle,Pointstyle,Cerclestyle;
$('.demo,.demo2').minicolors({
	change: function(value, opacity) {
		Linestyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: convertHex($('.demo2').val(),0.5)
					}),
					stroke: new ol.style.Stroke({
						color: convertHex($('.demo').val(),0.7),
						width: 1
					})
				});
		Polystyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: convertHex($('.demo2').val(),0.5)
					}),
					stroke: new ol.style.Stroke({
						color: convertHex($('.demo').val(),0.7),
						width: 1
					})
				});
		Pointstyle = new ol.style.Style({
					image: new ol.style.Circle({
						radius: 5,
						fill: new ol.style.Fill({
							color: convertHex($('.demo2').val(),0.5),
						}),
						stroke: new ol.style.Stroke({
							color: convertHex($('.demo').val(),0.7),
							width: 1
						})
					})
				});
		Cerclestyle = new ol.style.Style({
					fill: new ol.style.Fill({
						color: convertHex($('.demo2').val(),0.5)
					}),
					stroke: new ol.style.Stroke({
						color: convertHex($('.demo').val(),0.7),
						width: 1
					})
				});
	}
});

// Mini colors click outside the control
	$(document).click(function(event) {
		//check up the tree of the click target to check whether user has clicked outside of menu
		if ($(event.target).parents('.minicolors').length==0 ) { //&& $(this).find('.minicolors-panel').css('display') != 'none'
			$('.demo').minicolors('hide');
			$('.demo2').minicolors('hide');
		}
	})

// Scale chooser
	$('#scale_select').on('change',function(event) {
		scale2Resolution($(this).val());
		event.preventDefault();
		/* Act on the event */
	});

/* Save Bookmarks */
	$("#save_bookmarks").click(function(e) {
		nom_bookmarks = $('#bookmarks-name').val();
		extent_bookmarks = view.calculateExtent(map.getSize());
		$.post(window.location.origin+"/ci/pages/add_bookmarks",{
				'nom_bookmarks':nom_bookmarks,
				'extent_bookmarks':extent_bookmarks.toString()

			},"json")
			.done(function( data ){
				$('#add_bookmarks_modal').modal('hide');

				get_bookmarks();
			})
			.fail(function( data ){
				alert('Add Error');
			});
	});


/* Export Image */
	var exportMap = function () {
		canvas = document.getElementsByTagName('canvas')[0], ctx = canvas.getContext("2d");
		canvas.toBlob(function (blob) {
			saveAs(blob, 'map.png');
		})
	}



function convertHex(hex,opacity){
	hex = hex.replace('#','');
	r = parseInt(hex.substring(0,2), 16);
	g = parseInt(hex.substring(2,4), 16);
	b = parseInt(hex.substring(4,6), 16);

	result = 'rgba('+r+','+g+','+b+','+opacity+')';
	return result;
}

function wfs_connect() {
	var parser = new ol.format.WFS();
	var format2 = new ol.format.GeoJSON();

	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			// var x=parser.readFeatures(request.responseText, {
			// 	dataProjection: 'EPSG:26191',
			// 	featureProjection: map.getView().getProjection().getCode()
			// });
			WFS_Src.addFeatures(format2.readFeatures( request.responseText, {
				featureProjection: 'EPSG:26191'
			} ));
			console.log(format2.readFeatures( request.responseText, {
				featureProjection: 'EPSG:26191'
			} ));
			// console.log(parser.readFeatures(request.responseText));
		}
	};
	request.open('GET', 'http://127.0.0.1/cgi-bin/proxy.py?' + encodeURIComponent("http://127.0.0.1:8080/geoserver/cite/ows?SERVICE=WFS&REQUEST=GetFeature&TYPENAME=Bien_view&VERSION=1.1.0&outputFormat=application%2Fjson"));
	request.send();
}

var array_feature;
function select_feature() {
	Style2 = new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(0, 0, 255, 0)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 255, 0)',
					width: 1
				})
			});
	array_feature = sourceVector.getFeatures();
	for (var i = 0; i < array_feature.length; i++) {
		if(array_feature[i].getProperties()['valeur_venale']>300){
			array_feature[i].setStyle(Style2);
		};
	}

}

$('#clear_all').click(function(event) {
	all_overlays = map.getOverlays().getArray();
	for (var i = 0; i < all_overlays.length; i++) {
		// map.removeOverlay(all_overlays[0])
		all_overlays[i].setPosition(undefined);
	}
});



map.on("click", function(e) {
	if(plot_coordinate==1){
	// Create a new popup instance each time the map is clicked, set the
	// ol.Overlay `insertFirst` option to false so that each new popup is
	// appended to the DOM and hence appears above any existing popups
		var popup = new ol.Overlay.Popup({insertFirst: false});
		map.addOverlay(popup);
		var prettyCoord = e.coordinate;
		popup.show(e.coordinate, '<strong>X: </strong>' + parseInt(prettyCoord[0]).toFixed(4) + '<br> <strong>Y: </strong> '+parseInt(prettyCoord[1]).toFixed(4));
	}
	if(popup_test == 1){
	map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
		if (feature && typeof feature.getProperties()['titre'] != 'undefined') {
			var geometry = feature.getGeometry();
			var coord = e.coordinate;
			var properties= feature.getProperties();
			var element = document.getElementById('popup-content');
			content = '<table style="width:100%">';
			content += '<tr><td rowspan="6" style="width:40%"><img style="width: 90%; height: 90%;" src="'+'http://127.0.0.1/ci/assets/global/img/house/'+properties['image_path'].trim()+'.jpg"></td>';
			content +='<td>Titre : </strong>' + properties['titre'].trim()+'<br></td></tr>';
			content += '<tr><td><strong>Adresse : </strong>' + properties['adresse'].trim()+'<br></td></tr>';
			content += '<tr><td><strong>Consistance : </strong>' + properties['consistance'].trim()+'<br></td></tr>';
			content += '<tr><td><strong>Valeur Vénale </strong>: ' + properties['valeur_venale']+'KDH<br></td></tr>';
			content += '<tr><td><strong>Surface : </strong>' + properties['surface_totale']+' m²<br></td></tr>';
			content += '<tr><td><strong>Nombre Étage : </strong>' + properties['nbre_etage'].trim()+'<br></td></tr>';
			element.innerHTML = content;
			overlay.setPosition(coord);
			map.addOverlay(overlay);
		} else {
			// $(element).popover('destroy');
		}
	});
}


});



// X: 724830.0000
// Y: 509644.0000
$('#add_coordinate').click(function(event) {
	$('#add_coordinate_modal').modal('show');
});

$('#add_coord').click(function(event) {
	var x= $('#x_coord').val();
	var y= $('#y_coord').val();
	var coord = [x,y];
	var popup = new ol.Overlay.Popup({insertFirst: false});
	map.addOverlay(popup);
	var prettyCoord = coord;
	popup.show(coord, '<strong>X: </strong>' + parseInt(prettyCoord[0]).toFixed(4) + '<br> <strong>Y: </strong> '+parseInt(prettyCoord[1]).toFixed(4));
});

function get_bookmarks() {
		$.ajax({
			method: "POST",
			url: "get_bookmarks",
			dataType : 'json'
		})
		.done(function( data ) {
			$("#bookmarks_change").html("<option><option>")
			for (var i = 0; i < data.length; i++) {
				$("#bookmarks_change").append("<option value='"+data[i].extent_bookmarks+"'>"+data[i].nom_bookmarks+"</option>");
			}
		});
}


$('#bookmarks_change').on("change", function (e) { 
	var extent = $(this).val().split(",");
	for (var i = 0; i < extent.length; i++) {
		extent[i]=parseFloat( extent[i] )
	}
	map.getView().fit(extent, map.getSize());

 });




// $("#bookmarks_change").select2({
// ajax: {
// url: "https://api.github.com/search/repositories",
// dataType: 'json',
// delay: 250,
// data: function (params) {
// return {
// q: params.term, // search term
// page: params.page
// };
// },
// processResults: function (data, params) {
// // parse the results into the format expected by Select2
// // since we are using custom formatting functions we do not need to
// // alter the remote JSON data, except to indicate that infinite
// // scrolling can be used
// params.page = params.page || 1;

// return {
// results: data.items,
// pagination: {
// more: (params.page * 30) < data.total_count
// }
// };
// },
// cache: true
// },
// escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
// minimumInputLength: 1,
// templateResult: formatRepo, // omitted for brevity, see the source of this page
// templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
// });

	var wgs84Sphere = new ol.Sphere(6378137);
	var draw;
	var source_mesure = new ol.source.Vector();
	var vector_mesure = new ol.layer.Vector({
	source: source_mesure,
	style: new ol.style.Style({
		fill: new ol.style.Fill({
				color: 'rgba(25,126,192, 0.2)'
		}),
		stroke: new ol.style.Stroke({
			color: '#03194A',
			width: 2
		}),
		image: new ol.style.Circle({
				radius: 7,
		fill: new ol.style.Fill({
			color: '#053143'
		})
		})
	})
	});
	var sketch;
	var measureTooltipElement;
	var measureTooltip;
	var pointerMoveHandler = function(evt) {
	if (evt.dragging) {
		return;
	}};
	map.addLayer(vector_mesure);



$('#mesure_area').toggle(function () {
	map.removeInteraction(draw);
	$( '#mesure_distance' ).removeClass("clicked" );
	source_mesure.clear();
	$( ".tooltip" ).remove();


	map.on('pointermove', pointerMoveHandler);
	var typeSelect = 'Polygon';
	addInteraction(typeSelect);
	$(this).addClass( "clicked" );
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(draw);
	source_mesure.clear();
	$( ".tooltip" ).remove();
});



$('#mesure_distance').toggle(function () {

	map.removeInteraction(draw);
	$( '#mesure_area' ).removeClass("clicked" );
	source_mesure.clear();
	$( ".tooltip" ).remove();

	map.on('pointermove', pointerMoveHandler);
	var typeSelect = 'LineString';
	addInteraction(typeSelect);
	$(this).addClass( "clicked" );
},
function (){
	$( this ).removeClass("clicked" );
	map.removeInteraction(draw);
	source_mesure.clear();
	$( ".tooltip" ).remove();
});






function addInteraction(typeSelect) {
	var type = typeSelect;
	// 
	if (type !== 'None') {
		draw = new ol.interaction.Draw({
			source: source_mesure,
			type: /** @type {ol.geom.GeometryType} */ (type),
			style: new ol.style.Style({
				fill: new ol.style.Fill({
					color: 'rgba(255, 255, 255, 0.2)'
				}),
				stroke: new ol.style.Stroke({
					color: 'rgba(0, 0, 0, 0.5)',
					lineDash: [10, 10],
					width: 2
				}),
				image: new ol.style.Circle({
					radius: 5,
					stroke: new ol.style.Stroke({
						color: 'rgba(0, 0, 0, 0.7)'
					}),
					fill: new ol.style.Fill({
						color: 'rgba(255, 255, 255, 0.2)'
					})
				})
			})
		});
		map.addInteraction(draw);
		var listener;
		
		draw.on('drawstart',
			function(evt) {
				source_mesure.clear();
				if (measureTooltipElement) {
					//measureTooltipElement.parentNode.removeChild(measureTooltipElement);
					//measureTooltipElement.remove();
					$( ".tooltip" ).remove();
				}
				createMeasureTooltip();
				// set sketch
				sketch = evt.feature;
				/** @type {ol.Coordinate|undefined} */
				var tooltipCoord = evt.coordinate;
					listener = sketch.getGeometry().on('change', function(evt) {
						var geom = evt.target;
						var output;
						if (geom instanceof ol.geom.Polygon) {

							output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
							tooltipCoord = geom.getInteriorPoint().getCoordinates();
						} else if (geom instanceof ol.geom.LineString) {
							output = formatLength( /** @type {ol.geom.LineString} */ (geom));$('#mesure_value_last').val(output);
							tooltipCoord = geom.getLastCoordinate();
							console.log('line');
						}
						measureTooltipElement.innerHTML = output;
						
						
						measureTooltip.setPosition(tooltipCoord);
				});
			}, this);

		draw.on('drawend',
			function(evt) {
				measureTooltipElement.className = 'tooltip tooltip-static';
				measureTooltip.setOffset([0, -7]);
				$('#mesure_value_totale').val($('.tooltip').html().replace('km<sup>2</sup>','').replace('m<sup>2</sup>','')); 
				console.log()
				// unset sketch
				sketch = null;
				// unset tooltip so that a new one can be created
				// measureTooltipElement = null;
				createMeasureTooltip();
				ol.Observable.unByKey(listener);
			}, this);
	}

	if(measureTooltipElement){
		//measureTooltipElement.parentNode.removeChild(measureTooltipElement);
		$( ".tooltip" ).remove();
	}
	createMeasureTooltip();
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
	//measureTooltipElement.remove();
	measureTooltipElement = document.createElement('div');
	measureTooltipElement.className = 'tooltip tooltip-measure';
	measureTooltip = new ol.Overlay({
	element: measureTooltipElement,
	offset: [0, -15],
	positioning: 'bottom-center'
	});
	map.addOverlay(measureTooltip);
}



/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
var formatLength = function(line) {
	var length;
	var coordinates = line.getCoordinates();
	length = 0;
	var sourceProj = map.getView().getProjection();
	for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
		var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
		var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
		length += wgs84Sphere.haversineDistance(c1, c2);
	}
	
	// var last = ol.proj.transform(coordinates[coordinates.length - 1], sourceProj, 'EPSG:4326');
	// var before_last = ol.proj.transform(coordinates[coordinates.length - 2], sourceProj, 'EPSG:4326');
	// var distance = wgs84Sphere.haversineDistance(last, before_last);
	// var rounded_distance = (Math.round(distance / 1000000 * 100) / 100);
	
	var output;
	if (length > 1000) {
		output = (Math.round(length / 1000 * 100) / 100) +' ' + 'km';
	} else {
		output = (Math.round(length * 100) / 100) +' ' + 'm';
	}
	return output;
};


/**
 * format length output
 * @param {ol.geom.Polygon} polygon
 * @return {string}
 */
var formatArea = function(polygon) {
	var area;
	var sourceProj = map.getView().getProjection();
	var geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(sourceProj, 'EPSG:4326'));
	var coordinates = geom.getLinearRing(0).getCoordinates();
	area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
	var output;
	if (area > 10000) {
		output = (Math.round(area / 1000000 * 100) / 100) +' ' + 'km²';
	} else {
		output = (Math.round(area * 100) / 100) +' ' + 'm²';
	}
	return output;
};




var geometry;
var bufferedFeature = new ol.Feature();
var est_interaction;

$('#estimation').toggle(function () {
	popup_test = 0;
	$( this ).addClass("clicked" );
	//Style
	var style = new ol.style.Style({
		image: new ol.style.Icon({
		  anchor: [0.5, 0.5],
		  size: [52, 52],
		  offset: [104, 0],
		  opacity: 1,
		  scale: 0.25,
		  src: window.location.origin+'/ci/assets/global/img/dots.png'
		})
	});
	est_interaction = new ol.interaction.Draw({
		type: 'Point',
		source: estimation_layer.getSource()
	});

	map.addInteraction(est_interaction);
	est_interaction.on('drawstart', function(evt) {
		// Vider le calque
		estimation_layer.getSource().clear();
		evt.feature.setStyle(style);
	});

	var Cerclestyle = new ol.style.Style({
				fill: new ol.style.Fill({
					color: convertHex($('.demo2').val(),0.5)
				}),
				stroke: new ol.style.Stroke({
					color: convertHex($('.demo').val(),0.7),
					width: 1
				})
			});
	var rayon = 
	est_interaction.on('drawend', function(evt) {
		$('#estimation_modal').modal('show');
			geometry = new ol.geom.Circle(
			evt.feature.getGeometry().getCoordinates(),250
		);
	});
},
function (){
	popup_test = 1;
	$( this ).removeClass("clicked" );
	estimation_layer.getSource().clear();
	map.removeInteraction(est_interaction);
});




$('#calc_estime').click(function(event) {
	geometry.setRadius(parseInt($('#rayon').val()));
	bufferedFeature.setGeometry(geometry);
	estimation_layer.getSource().addFeature(bufferedFeature);
		var selectedFeatures = [];
		var extent = geometry.getExtent();
		layerVector.getSource().forEachFeatureIntersectingExtent(extent, function(feature) {
			selectedFeatures.push(feature);
		});
	var somme = 0;
	var j=0;
	for (var i = 0; i < selectedFeatures.length; i++) {
		if(selectedFeatures[i].getProperties().consistance == $('#consitance_x :selected').text()){
			somme += (selectedFeatures[i].getProperties().valeur_venale * 1000)/selectedFeatures[i].getProperties().surface_totale;
			j++;
		}
	}
	console.log(j);
	var unite = (somme/selectedFeatures.length);
	var surface = parseInt($('#surface').val());
	var ve = (somme/selectedFeatures.length)*surface;
	$('#res_nature').html($('#consitance_x :selected').text());
	$('#res_surface').html(surface.toFixed(3)+' m²');
	$('#res_vu').html(unite.toFixed(3)+' DH/m²');
	$('#res_vv').html(ve.toFixed(3)+' DH');

	$('#selection_res').hide();
	$('#no_result').hide();
	$('#estimation_section').show();
	$('#estimation_modal').modal('hide');
	$('a[href="#Resultat_tab"]').tab('show');
	$('a[href="#recherche_tab"]').parent().hide();
	$('a[href="#Resultat_tab"]').parent().show();
});

// function bufferit(radius){
// 	var poitnExtent = estimation_layer.getSource().getFeatures()[0].getGeometry().getExtent();
// 	var bufferedExtent = new ol.extent.buffer(poitnExtent,radius);
// 	var bufferPolygon = new ol.geom.Circle({
// 		center:,
// 		radius:100,
// 		layout:'Circle'
// 	});
// 	var bufferedFeature = new ol.Feature(bufferPolygon);
// 	estimation_layer.getSource().addFeature(bufferedFeature);
// }


$('#recherche_type').click(function(event) {
	$('a[href="#recherche_tab"]').tab('show');
	$('#prix_section').hide();
	$('#surface_section').hide();
	$('#type_section').show();
});

$('#recherche_surface').click(function(event) {
	$('a[href="#recherche_tab"]').tab('show');
	$('#prix_section').hide();
	$('#surface_section').show();
	$('#type_section').hide();
});

$('#recherche_prix').click(function(event) {
	$('a[href="#recherche_tab"]').tab('show');
	$('#prix_section').show();
	$('#surface_section').hide();
	$('#type_section').hide();
});

$('#calque_tab_btn').click(function(event) {
	$('a[href="#calques_tab"]').tab('show');
});


$('#add_shape').click(function(event) {
	$('#add_layer_modal').modal('show');
});

$('#submit_shape').click(function(event) {
	var file = document.getElementById('shape_file').files[0];
	var currentProj = map.getView().getProjection();
	var fr = new FileReader();
	var sourceFormat = new ol.format.GeoJSON();
	var source = new ol.source.Vector();
	fr.onload = function (evt) {
		var vectorData = evt.target.result;
		console.log(currentProj.getCode())
		// var dataProjection = form.projection.value || sourceFormat.readProjection(vectorData) || currentProj;
		shp(vectorData).then(function (geojson) {
			source.addFeatures(sourceFormat.readFeatures(geojson, {
				// dataProjection: currentProj,
				featureProjection: currentProj
			}));
		});
	};
	fr.readAsArrayBuffer(file);
	var layer = new ol.layer.Vector({
		source: source,
		name: 'Nouveau Calque',
		strategy: ol.loadingstrategy.bbox
	});
	// this.addBufferIcon(layer);
	map.addLayer(layer);
	initializeTree();
		// Opacity Control Init
			$('input.opacity').slider();

		// Handle opacity slider control
			$('input.opacity').on('slide', function(ev) {
				var layername = $(this).closest('li').data('layerid');
				var layer = findBy(map.getLayerGroup(), 'name', layername);
				layer.setOpacity(ev.value);
			});


		// Handle visibility control
			$('#layertree i').on('click', function() {
				var layername = $(this).closest('li').data('layerid');
				var layer = findBy(map.getLayerGroup(), 'name', layername);
				layer.setVisible(!layer.getVisible());
				if (layer.getVisible()) {
					$(this).removeClass('fa fa-eye-slash ').addClass('fa fa-eye');
				} else {
					$(this).removeClass('fa fa-eye').addClass('fa fa-eye-slash ');
				}
			});

});

$('#report').click(function(event) {
	$('a[href="#Resultat_tab"]').tab('show');
	$('a[href="#recherche_tab"]').parent().hide();
	$('a[href="#Resultat_tab"]').parent().show();
	printPDF();
});

$('#result_tab_btn').click(function(event) {
	$('a[href="#Resultat_tab"]').tab('show');
	$('a[href="#recherche_tab"]').parent().hide();
	$('a[href="#Resultat_tab"]').parent().show();

	$('#sidebar_titre').empty();
	$('#sidebar_titre').html('<span id="sidebar_titre"><i class="ifont query-result" style="margin-right:8px;color:white"></i><strong>Résultat</strong></span>');
	$('#sidebar_titre').find("i.ifont").attr('style','margin-right:8px;color:white');

});


$('#popup_check').click(function(event) {
	if (this.checked) {
		popup_test = 1;
	}else{
		popup_test = 0;
	}
});


function printPDF() {
	var canvas = document.getElementsByTagName('canvas')[0], ctx = canvas.getContext("2d");
	var imgData = canvas.toDataURL("image/jpeg", 1.0);
	var printDoc = new jsPDF('landscape');
	printDoc.setFontSize(20);
	printDoc.setTextColor(150,150,150);
	printDoc.setFont("helvetica");
	printDoc.setFontType("bold");
	printDoc.text(100, 10, "Cartographie des biens");

	printDoc.setFontType("regular");
	printDoc.setFontSize(12);
	printDoc.text(120, 15, "Classement par type");

	printDoc.setFontType("regular");
	printDoc.setFontSize(10);
	printDoc.text(242, 200, "Source : UIT FONCIER WEB GIS");

	printDoc.setFontType("bold");
	printDoc.text(155, 175, 'Echelle :  1 /'+$('#scale_control_val').html());

	printDoc.setDrawColor(100,100,100);
	printDoc.rect(0, 40, 300,300); 
	printDoc.addImage(imgData,'JPEG', 0, 20, 300, 150);
	


	var logod = "data:image/jpg;base64,/9j/4AAQSkZJRgABAgEBLAEsAAD/7QAsUGhvdG9zaG9wIDMuMAA4QklNA+0AAAAAABABLAAAAAEAAQEsAAAAAQAB/+E//Gh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL2pwZWc8L2RjOmZvcm1hdD4KICAgICAgICAgPGRjOnRpdGxlPgogICAgICAgICAgICA8cmRmOkFsdD4KICAgICAgICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5sb2dvPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkFsdD4KICAgICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wR0ltZz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL2cvaW1nLyI+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDYtMTVUMjM6NDk6MzlaPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNi0wNi0xNVQyMzo0OTo0M1o8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNi0xNVQyMzo0OTozOVo8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIElsbHVzdHJhdG9yIENTNiAoV2luZG93cyk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpUaHVtYm5haWxzPgogICAgICAgICAgICA8cmRmOkFsdD4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDx4bXBHSW1nOndpZHRoPjI1NjwveG1wR0ltZzp3aWR0aD4KICAgICAgICAgICAgICAgICAgPHhtcEdJbWc6aGVpZ2h0PjE0NDwveG1wR0ltZzpoZWlnaHQ+CiAgICAgICAgICAgICAgICAgIDx4bXBHSW1nOmZvcm1hdD5KUEVHPC94bXBHSW1nOmZvcm1hdD4KICAgICAgICAgICAgICAgICAgPHhtcEdJbWc6aW1hZ2U+LzlqLzRBQVFTa1pKUmdBQkFnRUFTQUJJQUFELzdRQXNVR2h2ZEc5emFHOXdJRE11TUFBNFFrbE5BKzBBQUFBQUFCQUFTQUFBQUFFQSYjeEE7QVFCSUFBQUFBUUFCLys0QURrRmtiMkpsQUdUQUFBQUFBZi9iQUlRQUJnUUVCQVVFQmdVRkJna0dCUVlKQ3dnR0JnZ0xEQW9LQ3dvSyYjeEE7REJBTURBd01EQXdRREE0UEVBOE9EQk1URkJRVEV4d2JHeHNjSHg4Zkh4OGZIeDhmSHdFSEJ3Y05EQTBZRUJBWUdoVVJGUm9mSHg4ZiYjeEE7SHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmSHg4Zkh4OGZIeDhmLzhBQUVRZ0FrQUVBQXdFUiYjeEE7QUFJUkFRTVJBZi9FQWFJQUFBQUhBUUVCQVFFQUFBQUFBQUFBQUFRRkF3SUdBUUFIQ0FrS0N3RUFBZ0lEQVFFQkFRRUFBQUFBQUFBQSYjeEE7QVFBQ0F3UUZCZ2NJQ1FvTEVBQUNBUU1EQWdRQ0JnY0RCQUlHQW5NQkFnTVJCQUFGSVJJeFFWRUdFMkVpY1lFVU1wR2hCeFd4UWlQQiYjeEE7VXRIaE14Wmk4Q1J5Z3ZFbFF6UlRrcUt5WTNQQ05VUW5rNk96TmhkVVpIVEQwdUlJSm9NSkNoZ1poSlJGUnFTMFZ0TlZLQnJ5NC9QRSYjeEE7MU9UMFpYV0ZsYVcxeGRYbDlXWjJocGFtdHNiVzV2WTNSMWRuZDRlWHA3ZkgxK2YzT0VoWWFIaUltS2k0eU5qbytDazVTVmxwZVltWiYjeEE7cWJuSjJlbjVLanBLV21wNmlwcXF1c3JhNnZvUkFBSUNBUUlEQlFVRUJRWUVDQU1EYlFFQUFoRURCQ0VTTVVFRlVSTmhJZ1p4Z1pFeSYjeEE7b2JId0ZNSFI0U05DRlZKaWN2RXpKRFJEZ2hhU1V5V2lZN0xDQjNQU05lSkVneGRVa3dnSkNoZ1pKalpGR2lka2RGVTM4cU96d3lncCYjeEE7MCtQemhKU2t0TVRVNVBSbGRZV1ZwYlhGMWVYMVJsWm1kb2FXcHJiRzF1YjJSMWRuZDRlWHA3ZkgxK2YzT0VoWWFIaUltS2k0eU5qbyYjeEE7K0RsSldXbDVpWm1wdWNuWjZma3FPa3BhYW5xS21xcTZ5dHJxK3YvYUFBd0RBUUFDRVFNUkFEOEE5VTRxN0ZYWXE3RlhZcTdGWFlxNyYjeEE7RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYeWQvemxCcW1weGZtUEZieFhjMGNDV0VMSkVzamhGTE0vSWhRYUFtZ3JteDBzUnd1QiYjeEE7cXBFUzJQUmlIa0x5WDV1ODN2UGNwcVRhYm9WanZxV3QzY3pKYndEclNwWWNucCt5RDh5TXN5VGpIcHUxNDR6bDEyZXIrVHJQOG5yTCYjeEE7UmRjMW1tb2EvWWVYb2xOMXJWOUxKSEJQY3NhSkJhMjZzb1BNMEh4cnRWZDk2NWpUNHlRT1Z1VkF4QUpzbW1MZWRielVQTzNscnlqcSYjeEE7T2pXRnBvbDVjcnJrczhGaVBxOGJRNmVzTWg1RmQySVJXcFh2bGtBSUUzdnlhNWt6QXJibTg0dDlQODBUK1hXMStPOGsvUjZYc2VuTSYjeEE7VE80ZjE1WXpJdncveThWTytYa3hCcW1pSW1SZHNpc1B5NDg5WHZtRys4dkpyTnBEckZqTUxkck9mVVBTa2xjcHovY0kzeFNBRHJ4RyYjeEE7UU9XSUYxdDdtWXh6dXVMZjNzNi9JT3gxZlNQelhPbVhXc1crcHh5YVhOT1dzYndYbHVENnFxRlprSlVTTHhyVHFBUjQ1VHFDREN3SyYjeEE7M2JjQUluUk43UHAzTUZ6SFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWCYjeEE7eS84QW5oNVZ2dk5mNTY2Ym9GbDhNMTdaMjZ0SWR4SEdyU3RKSWY4QVZSU2N6OEUrSEdTNE9lSEZrQThsdXMvbXIrWEVEM1A1ZFhXaCYjeEE7TmNlUWJCbHQ3ZTl0SkN0MzlZaEpEM1d4VkpPVDFJNlY2bXRlT01jTXZxdjFKbG1nUFFSNldTK2NmeW1pdmZLR20rUlBKT3Mya2IyTSYjeEE7c21vMyttWDh3anZyaVNaQThUU0tpMUJTTnFib0IwOE1oRE5VdUtRYko0Ymp3eExINU5IdS9JdW0rUmROODJReVdzYXA1amcxQ1cycCYjeEE7Y21DQzlpaWhGeFNNdFZWOVVNZmJKRThmRVI1TUFPRGhCODJKYXJZMjJoK1NvUEtWbGQvcHZVN2pXb3RTdW5zcmU1RWNFVVViVzBhSCYjeEE7MVk0Mk1ra2pIWUx0eEk2NVlEeFM0anRzeE1lRWNJMzNUSk5iMDVmK2NpWXZNcnRJbWgzRitzMEY2OE1xSzZUV29NUlZXUU9lWWRTdSYjeEE7MjRJSXdWKzZycXQvdmI2ZnNWZitjWjdTNnR2elRZWEVMd2w5UHVXUVNLVjVLSlVXb3FCVWNsSStZd2FqKzdYQVAzaGZXZWE5em5ZcSYjeEE7N0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWGozbmUyYXg4NGVjUE02SGhjMiYjeEE7bWgyT21XVTlLdEhMcVZ3OEpsVHdhT2kvZm1UQTNFRHphWkQxRStTVjZWL3pqSHB1bTZqZVNtZEwrMGxtakZtSjlwSW9CZDIwcDZEaiYjeEE7Nml3eHpKeTI1Y3VneVV0VVNHRWRNQVdCL21KK1ZYNWxlWmZQV282eFo2Yk5NYi9WTHEyaVo2eCtuRGFGRXQ1bWQrS3JFOFJIQnE3OCYjeEE7VDdWdXhab3hqUjdtckxobEtWaEZmbkZva25sSHl4NUMwelZKTGlaL1F2UHJ3V1VTU0xKSXRrOXlpdTRaV1gxQS9FZEtVSFRCaFBFWiYjeEE7RWZqbW5MNlJFSDhjbm43ZWN0R29yUjJzOFVpcXRKS1dyT0pGTWo4K1hwS2FlcE1UVHNLQ3BvRGx2aGxoNDhXbDgzYUFKcS9WTGtSbyYjeEE7d2FJdDlWa0tpT014eGNRWVY0RmVYN0o2MElwUURId3l2alI3bm9IL0FEanpxa1dvZm11alFoeEZEcGwxR25xaEE1RFhQcmI4Rlh2TCYjeEE7M3JUcFdsTXExRWFoOFdlQ1FsUGJ1L1MrcU0xN211eFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eCYjeEE7VjJLdXhWMkt1eFYyS3BiZStYZEt2Ymg3aVpKRm1sVlVtYUdlYURtc1pKVG1JblFOeDVHbGNrSkVMUzMvQUE1cC93RHY2OS82VDczLyYjeEE7QUtyWThTS2QvaHpUL3dEZjE3LzBuM3YvQUZXeDRscEs5Yi9MTHlWcnBnT3RXTDZsOVc1L1YvclYxZFRjUFU0OCtQT1UwNWNCWDVaSyYjeEE7T1dRNUlsQUhtRXMvNVVYK1UzL1V1UWY4SE4vMVV3K1BQdlkrRER1ZC93QXFML0tiL3FYSVArRG0vd0NxbVBqejcxOEdIY21ubHo4cyYjeEE7L0l2bHJVRHFHaDZSRlpYcGpNUm5ScEdQQmlDUjhiTU4rSXdTeXlrS0pUSEhFY2d5ZksyYnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaSYjeEE7cnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpciYjeEE7c1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlycyYjeEE7VmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzViYjeEE7ZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZCYjeEE7aXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaSYjeEE7cnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmRpciYjeEE7c1ZkaXJzVmRpcnNWZGlyNDYxYjgwL3pER3EzZ2oxKzhqUVR5QkkwbFlLb0RtZ0E4Qm01aHBzWmlOblJaZFhrRWlBZXFoYi9tWCtaMSYjeEE7elBIYjIydTZoUFBLUXNVTWNqdTdNZWdWVnFTY2tkTmpIUmlOWG1Kb0Y2WDVlOG5mODVBNm1zY2w5NWhtMGVPVGRFdTdoak13NzBpaiYjeEE7REdvOEdJekZuUEFPUXR6Y2VQVUhuS21UZVVyWFc3TFZyRzdIbnVUek5DYjBhZGZXZ1UrakhJMFRTSDRqSS9JcndwMDc5amxPV3ErbiYjeEE7aGNqQ0pYdlBpZXQ1aU9VN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhZcWx2bWE4dSYjeEE7TEx5NXF0NWJQNmR6YldkeE5BOUFlTHh4TXltakFnMEk3NHErSDduV2RkMUc4bnZycThsZTZ1NUhubmNNVjVTU01XWThWNHFLazlBSyYjeEE7WnU0NFlWeURvSlo1MzlSK2F2WVczbURVTHBMU3hOM2QzY3RmVHQ0RExKSTNFRmp4UktrMEFKeE9PQTNJQ0JteUUwQ2IrTDB2UXZ5QiYjeEE7OCtYMDlySHF1c1E2T2JoWkpEYXZPODk0STRxQXVzS0VJdzVPbGYzdnc4dDk5c3haNThRNVJ2NE9aREJtUE9WZkhkNkIrU25rSFRkTCYjeEE7MWEvMXpUUE5oOHhXc2F5NlpLaTI4a01henEwVWhaWkdsa0VnQzBvVkJVMXFEdGxHb25zQnc4UFZ5Tk5EY25qNGh5ZlBpNlJxR3NlYSYjeEE7WDB2VDRqUGUzZDNKSERHTzVMbmNuc0FOeWV3emFSa0l3QlBjNmljRExJUU9aSmU4dytUZFE4aCtVSnBmSWxwYjY5NXJWakJxK3BxeSYjeEE7VFRXekJSeWpnZzlpZnNuZnV3YnRyemxHU1hyMmowZG9NSnhRL2RpNU1jbTFqWFBKL3dDWGR6cit0WEU4bm5memF6MjFySmNzM3IyMSYjeEE7bW16a0JoVlBHZ3BTcWZ5NWFJaWVUaEgwUmFUa2xqeGNVdnJsOWlJL0liL2pnUWYrQkZGLzFCU1pIVzgvODM5TFBzLzZQODc5RDZGeiYjeEE7WE95ZGlyc1ZkaXJzVmRpcnNWZGlyc1ZkaXJzVmZQOEErY2Y1MWVkUEszbmk0MFhSM2dqdElJWVgvZXhDUmkwaUJ5YW1sQnZtVml3aSYjeEE7UXN1QnFkVktFcURDUCtobFB6UC9BTi8ybi9TT3Y5Y3MvTFJjZjgvUHlUdnk1K2J2NTkrWlpPR2gyS1h3REJXbFMwVVJLVDBEeXNWaiYjeEE7WDZXeU1zVUJ6TFpEVTVwOGd6aU84LzV5SHRyYVc5MVM2MGEyaHRJMnVyaXphaHVIaGlCYVFSK2trcTFvS2JtbGNxckgwdHlRYzNYaCYjeEE7ZXZXVXp6V2NFejA1eVJvN1UyRldVRTByWEtIS1ZzVmRpcnNWZGlyc1ZkaXJzVlNmemwveWlHdWY5cys2L3dDVExZcStQZkszbGpVTiYjeEE7ZTFXMDBuVDBWcnU2UEdQbXdWUUZVc3pNVDJWVkpQZnd6Zm1Rakd6eWVXRnpud3g1bDdwY2VXTHZ5eDVUbHRmeTdpZzFIVll5OXRyZSYjeEE7dFJHTnRSaklwNnNjY2RLb0MwWUFRTVNPd0xmSG12RXhPVjVOaDBIUjJNNFN4NHo0RlNsL0VmNHZ4K1BOaU9xUGZlWHZ5K2E3dTVaNSYjeEE7L05IblNxM1YzY0ZtbWkwK0NpOFBVWm1mOThwWDJLR243SU9aRVlpZVRiNllmZTRzc3B4NFFaZlhrNys1bm4vT04wZnArU2I5ZisxbiYjeEE7S2Y4QXAzZ3pFMTMxajNPeDdNbGVNKy85VEFmSkVZOHJlV3ZOSG4zMHZVMVdTNGwwdlFFSzhpSlhZbVNVQ2hyUWIvSkdIZkw1bmpNWSYjeEE7ZEtzc01ZNEJQSjFzZ01OL0w2SHp4THJzT282SGR6MnJ6WHRyYlhsNnNnM2E5bGNLWkVldnFxVEU1TlZZYmI1azVqRGhvOXppYVlaRCYjeEE7SzQ5NHY0dlQvUHY1emVYQjVxMUxRTmI4czIrdGFYWVNtM2puY3FKbGRRQkxUa3IvQUxZSUhFcm1KaDBzdUVTRXFKYzNQcklpWmpLTiYjeEE7Z0o1NUZ1ZkpkMXArbVhYbFBUYm5TN0dmV29ubXQ3bXByS0xhWlMwUkx5MVQ0YWJIcURsV2NUQklrYk5mcERmcHpBaTRDaGIxM01OeSYjeEE7M1lxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3Rlh5Ri93QTVHZjhBazFOUS93Q01GdC95WlhNL1QvUzZmWGYzbndUcjhzdnlZV1R5N0o1MSYjeEE7OHphZmNYOWxIRjYrbTZCYkErdmRxT2p1S3FlRGRWVWJzTitsQTBjbWJmaERQVDZYMDhVaGZreUh5TDUvOHllWk5hdnRUdnovQUljOCYjeEE7aWVVb1RjemFUWktJVjVLRDZWdTdBSXoxNGtsTmxOS2NmaXlFNEFDdWNpM1lzMHBFayttRVdLK1NQTm1vZWEvekU4ejY1ZkUrcGM2TCYjeEE7cVBwUlYrR0tGWXdJNDE5bFg3enYzeXljZUdJSG0wNE1obmtKUGNYMUhwbi9BQnpiVC9qREgveEVaZ3UxUk9LdXhWMkt1eFYyS3V4ViYjeEE7MktwUDV5LzVSRFhQKzJmZGY4bVd4VjRaNUV0THJ5MytYbDk1anQxWTZ2cmhObHBiUmdNOFZ2Q0dlNW1xcmNsRkluM3A4SlJUMHpiVCYjeEE7cWVRUVAwamN2TXhrY09DV1FmWExZZTRjejloK1FRWGt6UmRhT3NhYmMyZjFpMWltdW9JVGR3SGkvQ1ozQlphL2FYakJMVTBLL0NRMiYjeEE7WmVvbERoSU8reC9IMmgwdWlHYVdXSmpZQmtCWTdqZi9BQk12TGJkbFBuYnp6cEUvbUhVN0RWZEF0dFdzTGQvcTBFamsyOTJwaEk1ZyYjeEE7WENjMkNHUlhJQXAxK2pNWEJwQ0lDUWtRVDh2azdQVjlxd09lVUp3RW9nMTNIYm52M1d6cjhwcE5EbDhzdlBvMmt5NlBhUzNFalBieSYjeEE7U1NUSzhnVkZhU09TUTFaZmg0OXQxT1lPckVoT3BHM2U5bXloTEZjSThJdjNzVDBXWFNMZVB5ZGF5M0Z2K2piSDlJejZ4REtSdExkeCYjeEE7djZZS1VQSTFtY0h3eVp1ajM3VTMwQVIzYnN0dDd6OHNyYU9HSzJtdDRJcmVYMTRZNHVhS3I4NVpCUUtCUUs5eklRQnNLNVVSa0xZTyYjeEE7QWNubStxL2xiK1gycVNDYTQ4MENPNGU3dTdxNWxTSmkwaVhMcTZSL0UxRjlNaHZpcFU4dllabFIxRXgvQzRrOUpDWE05VDlyTWRHdCYjeEE7L0srbFErWGRCMEc5K3R3MmwrcklXTlpPRGZXcER5SUNqNFducFdtWStReU55UDQ1T1RqakdJRVkvam05THpHYjNZcTdGWFlxN0ZYWSYjeEE7cTdGWFlxN0ZYWXE3Rlh6cjV4OG5RZWFmK2NpSnJTOG9OSnM3YUMrMVJtTkYrcndRb1NwTzJ6c1ZVK3hybVhDZkRqZGZseGNlYmZrQSYjeEE7d1R6SithM20vVnZ6QWwxcnkxYzNGcWxzR2cwcTF0bEpVV2NGWCtPR2pLd0twNmpoZ1I5QUdXeHhBUm91TlBVVGxPNHZXUE1QNW0rWCYjeEE7b1BJK2dXMzVnYVdieWJ6VmEvVzlUaTA4ZWlSR2pLYmVWMTlSR1BKZUorMzFVN2RCbEVjWjRqdzlITW5uaUlEakgxSlA1TzByOG5SSiYjeEE7ckdwZVROV3UyMUU2TmZySnBOMnJmREcwVzdCbWpYN08zN2JaS1puc0pEcXh3eHhXVEE5SHZtbWY4YzIwL3dDTU1mOEF4RVppT2VpYyYjeEE7VmRpcnNWZGlyc1ZkaXJzVlNmemwvd0FvaHJuL0FHejdyL2t5Mkt2SDlMOCsvbHQ2ZmtaWDFTMEZ0cEZsUGI2dmJOSEpRUGRXWVNTcSYjeEE7K253Y0dWU0hvVFV0WGNWT2JFUmxVNi9pcXR4MExvSlpjZDRyK21JSWtPR1hXUHUzWm5hZm1UK1MxcXNJdGRUdFlSYk8wa1BDT1ljUyYjeEE7M3E3RDRQc2o2eEp4WG92TFlES3BZc3N1ZjNqOWZrM3cxZWtoWER0WDlHWG41ZjBqdHlGN01JMU52eWJ1N2EwUStiaEhjd3BJTHE2TSYjeEE7TXp2TTdzR0RFRVVVS3hieEpydTIyWmtjMlVYc0s5NDJkVkxSNldmQ09PWEVMczhFdHlkKzczL1BtOUQvQUMyODArUXA0Rjh0ZVd0WSYjeEE7R295MlNUM0N4K25LakxDOXdXM0xxcW5pWmxYMzYwelg2aU15ZUtYNkhmNkdXTVI0SUVtcjZFZGZQM3ZuZlc3R3cvNVZwY1g0dDR2MCYjeEE7aC9peDdjM2ZCZlc5QTJNcitsNmxPWERtT1hHdEs3NW53a2ZFaU9uQzRlU0k4T1I2OGFaNmRvK2t2NWwvTFNGN0szYUxVTGFCcitNeCYjeEE7SVZuSnZaa0ptRktTVlVBZkZYYkFaR3A3OG1ZaEc4ZXczWGZsWFBhVCtmaDVkdXRMMDY3MDJhYStrWVhObGJ6U2owNEpIUlZra1JtViYjeEE7VmFNVVVHbU9ZSHcrS3pkRHFqQVI0cGhRcXowVXZ5bTFlYlZ2elUwZTdsdDdXMmZqdzlLeXQ0cldLZ0RHdnB3cWk4dmkzTks0Nm1IRCYjeEE7aUtOSms0c3ZJRGJvK3NjMUx1WFlxN0ZYWXE3RlhZcTdGWFlxN0ZYWXE3RlhrWG5DMmtndlB6RnZiTlJMcWw5YjZkcDF2Q3BBbE1UeCYjeEE7cUorQXFEOWlhcHA0WmZBOG5IbVBxSTVtZ25jSDVjZmxyWjNsOWVhZTl0YVhGNmhYa2trWkViTkRjVzdOR0NmaEJqdWlDcTBCNHJrZiYjeEE7RWt5R0dBTmhodjVrZmxNZk5XcXlTMk9xNmZiMmxqcGxwWTZLazl3QlI0WmF1SDRLOUU5Tm0zRy9LbmJMTWVYaERSbjAvR2Zoc3ErUyYjeEE7L3dBc3RPOGsrV1BNVTEzcTlwZjZqZVdEOGZSS2dSdWtOd2pSb3pIbXl1SlZQUWJqcHRqUEp4RWJKdzZjWXdkK2IyYlRQK09iYWY4QSYjeEE7R0dQL0FJaU14bk1ST0t1eFYyS3V4VjJLdXhWMktwUDV5LzVSRFhQKzJmZGY4bUd4VjhRU21KZkkraHpLcWlXVFV0V1I1QUJ5Wlk3ZiYjeEE7VFNvSjZrS1pHcDRWUGptd2lmVjhIVFpJK2o0bjlET0xlMnRsODEvbGhCSmJJRXZiZlRudVkyUUFTK3BxazYxY0VmRnlqQUcvVVU3WiYjeEE7RW5hU21BNDhmdys5QS9sSDVnMUQ5THBwSVMybXNwYmEvdXBFbnRMYWRqTkZwOHNrYmVyTkc4Z0FlRlR4NWNmYmM0NWg2YjZzdEtTSiYjeEE7OFBUZG0zL09PV3NhbnJINW0zMTdxVFFHZE5GbGhWYmUzZ3RsNEM3Z2JkTGRJa0pxM1dsZnVHUXp4QWp0M3QrbG1aVHM5ekc5STFuVCYjeEE7cktTODB5N3RKdFNoMUNlNG5sMDJlSlh0bW5pWmt0Sm8zRHd5S09aWlpHVnh0VWI5TXpKUUpBUEtnR2lHUUNSRkUyVHQwNXBqRkI1aCYjeEE7R3ZXMnVTV0V3MWJSdlZUVHJGUkJIWlFpeXVvWVlJVmpFbnFlbUpicmkveGxpeHJ5YjRpQlVhSXZZL05QcTRnYTNGME5xN2xtaFc5eCYjeEE7bzNuMU5hMGJUN3B4YmFsZndYY1Y2WVF3dHhDNWw0aFhRR1ZJa3VEOW9yVlZHL1FtVkhId2s5QitQdVlSaVJrNG9nL1VlZjQ5NnY4QSYjeEE7bGRwRnBZZm1CNVhsdG83bEV2RXVaQ2JyMHdTSXJtYUJlS29hclJZZ0dEYjgrVk5xWkhVeUp4bnlwbHBZQVpBUmU5L2UrcHMxVHQzWSYjeEE7cTdGWFlxN0ZYWXE3RlhZcTdGWFlxN0ZYenIrWTFqYjMvd0NaM25nWGZxT3VtK1Y3alViSkZsbGpWTHEzdDR6SEpTTms1VXIwT3g3aiYjeEE7TXFCcUE5N2daUmVRaitpOHhzWXZVL0xmVmRZa2ttYlVyZlU3UzFndVBXbUhHS1dLVjNYaUhDR3BRYmtaZWZxQWNXRytJeXMzYVplWiYjeEE7N25TdkxYbU8wai9SNTFDenVkSnNKMnRaN3U5UlJjWEVLU1NTaG9wa2VwTmZoNWNkK21SaURJZkZubGtJU0cxN2Q1Ukg1cXk2Vm8zbiYjeEE7ZTQ4dDZMcDUwOU5QdW9QOU5XN3ZacEpVa2hSeWpMUE5JZ0hLVHFCWGJCaUJNYks1NUNNK0VmZVgxcnBuL0hOdFArTU1mL0VSbUM3WiYjeEE7RTRxd0Q4enZ6T3VmSmx6WVF3MkNYZ3ZFa2NsNURIeDlNcU95dC9ObVhwdE1NZ085VTRHdDF2ZzF0ZHNJL3dDaGtkUi82c2NQL0k5diYjeEE7K2FNeWY1T0hlNFA4c24rYjl2N0hmOURJNmovMVk0ZitSN2Y4MFkveWNPOWY1WlA4MzdmMk8vNkdSMUgvQUtzY1AvSTl2K2FNZjVPSCYjeEE7ZXY4QUxKL20vYit4a1BrTDg2Ynp6UjVtdHRHbDB1TzFTZFpHTXl5czVIcG9YNkZSMTQ1VG4wWWhIaXR5ZEwyaWNzK0hocjR2VmN3WCYjeEE7YUpQNXkvNVJEWFArMmZkZjhtR3hWOFZlVi9PZHI1YnRZZ1lyWFU3U2FPUzVYU2RSczROUXRWdVN4aEJIS2IxSUN5SnlabDRzYUpWWCYjeEE7WGkyYkF3dDFVWmNQbXAzSG5EWFp0WnNOZW12WTVkUnN2UmJUVC9vaXhRZlU1bFNHSklJMldLQ05PUElLRUFPN1VJSmZFUkFGTVRaayYjeEE7SmR5QjAvWHJyUTcvQU9zV0YwRXVyWTNOckkxSUpFRUVrTFFzMFpFckpJelJ0SVBoK0g3UEZqeUZKU0Zpa1FIREt3OVMvd0NjVm5pUCYjeEE7NWszdm96TkxITG9seElPUVJXQUY5Q2kxVkpKZUpLcURScUhmdUtNMU9vUHArTGs2V05TK0QweGZ5UDhBTUZ0Tk4rai9BREVMYTJhWiYjeEE7NTRJakNybU11L1A0V1llTk1INW9WdkZ0L0xrWFVsYUw4bi9PVVNjRTh6eEJDM01xYlNJZ2tHSmhVRlNQdFc2SDZNZnpNZjV2MnA4QyYjeEE7WDg3N0FwUCtTL211VDBoTjVraWxXRlhSQTFySFhoSW9SbExCUXhIRUFkY2Z6SS9tL2FqOHZMK2Q5Z1RQeTkrVWVxV1htcXgxL1ZkWSYjeEE7VzlmVDQzanQ0NDRsaENoNVdtT3lpaEhLUnZ2OXNqUFVYSGhBcGxEQlV1SW0zcHVZemtPeFYyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdiYjeEE7bWI4MWRRdnROL09EVzcyMmV6YUU2ZkJhWDlsZlNHTkxtMnZJVmdrakhHakg3UUpLL1o2NzB6THhpNFU2L01TTXQ3Y21IYXZaYXZlMiYjeEE7TW5sclE5SmcwblI0N3FHN25LWGttcFNYOHp5dFkyN3hUaUNCVENHaytGVmpxVDhWU05zbEc3dVRESkVjSmpBZHkzejVwdXJhcGZXMSYjeEE7ODBjQ1MydWxSZ1drTXJ6eXZCcHNuMUo1Z1BTajJjUm1jZGhGOFZjbmpJSHphczhaU045dys1Vi9NSzAxYldQTldwZWJMbUdHeTV6YSYjeEE7WWJyVFJNMHMwRDNVQkNSUFdPS2pwOVZiMUZZRGlTQnYxeGdRQlh2WExFeW54ZTU5ZmFaL3h6YlQvakRIL3dBUkdhOTNDSnhWNFQveiYjeEE7a2oveDBkRC9BT01NL3dEeEpNMm5aM0l1aTdaNXgrUDZIaldiSjByc1ZkaXJQZnlQL3dESmo2Zi9BTVk3ai9reStZbXQvdXk3SHN2KyYjeEE7K0h1TDZlelNQVEliVTdDSFVkTnU5UG1MTERlUXlXOHJJUUdDeXFVWXFTQ0swTzIyS3ZCNHYrY1JkTnRMeVdmUy9OZC9aSzNOWStFUyYjeEE7aVJZbTI0TklqeDh2aDJPd3I0WmtmbUQzT1A4QWx4M2wwUDhBemlYRkM2dkQ1eXZvM1Foa1pJUXBVcXl1Q0NKZGlHalUvTUR3eC9NSCYjeEE7dVg4dU84cU1uL09IMm5Tb3FTZWE3cDFYN0ttMlFnYkJkcXllQ0FmUU1mekI3bC9MRHZMTS93QXIvd0FpWS9JWG1LVFdvOWVuMVI1TCYjeEE7U1N4TU54RUZDeFN5ck8zQmhJM0UrcW5McFRkdTVya0o1ZUlVemhpRVRiMVRLbTEyS3V4VjJLdXhWMkt1eFYyS3V4VjJLdXhWMkt1eCYjeEE7VjJLdXhWNDErWXY1VCthdGI4NTNtczZZdGhjMk43RmJyTGJYNjhnSkxkU29aUjhpZC9janBsK1BLQUtjWExnTXBXSytLQnRQeTQvTiYjeEE7dTJtaG1WZElkNEJFSVF4a0tqNnZPbHhHZVBMdEpIeTI3a25xVGg4U1BtdmhUOGtQTitWWDVwUzJ4dDJpMGlnZ1cxaWs1VCtva0tydyYjeEE7TWF2ejVjWFZuNUtkdmpiYjRqaDhXUG1nNFovMFZ1cWZsQitaR3JSdmIzZjZQaWh1cnlDOHZyaU41SHVKR2hlZHR5NTR0L3ZVMUJ0MCYjeEE7SHZpTXNRaWVDVXU3bTk0dElUQmF3d2sxTVNLaEk3OFFCbU01aXJpcnpuODEvd0F0Tlc4NVhXblRXRjFiMjYyYVNKSUorZFNYS2tVNCYjeEE7SzM4dVptbDFJeGcyT2JyOWRvem1xalZNRC82Rno4MWY5WEt4KytiL0FLcDVsZnloSHVMZ2Z5UFArY0hmOUM1K2F2OEFxNVdQM3pmOSYjeEE7VThmNVFqM0ZmNUhuL09EditoYy9OWC9WeXNmdm0vNnA0L3loSHVLL3lQUCtjR1NmbDUrVFd2ZVdmTlZyckYzZTJzMEVDeXEwY1JrNSYjeEE7bjFJMlFVNUlvNm54eW5VYXVNNFVBNU9rN09saW54RWd2WHMxN3RuWXE3RlhZcTdGWFlxLy85az08L3htcEdJbWc6aW1hZ2U+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpBbHQ+CiAgICAgICAgIDwveG1wOlRodW1ibmFpbHM+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjZGRENCMDQ0QzYzMUU2MTFBOTVGOEE5MjBDMjk3QzlFPC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD54bXAuZGlkOjZGRENCMDQ0QzYzMUU2MTFBOTVGOEE5MjBDMjk3QzlFPC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4Qzg8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOlJlbmRpdGlvbkNsYXNzPnByb29mOnBkZjwveG1wTU06UmVuZGl0aW9uQ2xhc3M+CiAgICAgICAgIDx4bXBNTTpEZXJpdmVkRnJvbSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgIDxzdFJlZjppbnN0YW5jZUlEPnV1aWQ6MjJmN2Y2NGItZjg4NS00YTEwLTg3M2QtM2EzYjc1M2IxNzk5PC9zdFJlZjppbnN0YW5jZUlEPgogICAgICAgICAgICA8c3RSZWY6ZG9jdW1lbnRJRD54bXAuZGlkOjc5NUE0MzBDNkFFRkU1MTE4QkQyRjc4NjFFMzE4QjVGPC9zdFJlZjpkb2N1bWVudElEPgogICAgICAgICAgICA8c3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPnV1aWQ6NUQyMDg5MjQ5M0JGREIxMTkxNEE4NTkwRDMxNTA4Qzg8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOnJlbmRpdGlvbkNsYXNzPnByb29mOnBkZjwvc3RSZWY6cmVuZGl0aW9uQ2xhc3M+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3OTVBNDMwQzZBRUZFNTExOEJEMkY3ODYxRTMxOEI1Rjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wMy0yMVQyMzo0OTo0Nlo8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIElsbHVzdHJhdG9yIENTNiAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjZGRENCMDQ0QzYzMUU2MTFBOTVGOEE5MjBDMjk3QzlFPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA2LTE1VDIzOjQ5OjM5Wjwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgSWxsdXN0cmF0b3IgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6aWxsdXN0cmF0b3I9Imh0dHA6Ly9ucy5hZG9iZS5jb20vaWxsdXN0cmF0b3IvMS4wLyI+CiAgICAgICAgIDxpbGx1c3RyYXRvcjpTdGFydHVwUHJvZmlsZT5QcmludDwvaWxsdXN0cmF0b3I6U3RhcnR1cFByb2ZpbGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgogICAgICAgICA8cGRmOlByb2R1Y2VyPkFkb2JlIFBERiBsaWJyYXJ5IDEwLjAxPC9wZGY6UHJvZHVjZXI+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQIBAQICAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCAMHBe0DAREAAhEBAxEB/8QBGgABAAEDBQEBAAAAAAAAAAAAAAoICQsDBAUGBwIBAQEAAQUBAQAAAAAAAAAAAAAABwECAwYIBQQQAAAFAwECAwoTEwcGBgsKDwACAwQFAQYHCBEJEhcKITHSExSUVZc5GvBBUXGBkVPT1BWVtdVW1ld3t3hhobHBIjKzNHS0dRY2drY3hzi40eEjNdcYWEJSVKeIGfGyMySYOpKiJSaWZ6jI2EmZYnKCpIVGxiho6ClZacJDR0h5iUpFxWaGJxEAAgEBBAMGEQgHBgQGAQMFAAECAxEEBQYhMRJBUZM2BxdhcYGRsdEiMlJystITU3OzNcFCM4MUNFR0oWKCkiMVFuGiwqPD00NjJETw42SElCWF8aRVdSZGRzf/2gAMAwEAAhEDEQA/AJ/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOlzmQLUgDnQeyiaztPbQzNiUzxwUxdu1NXpO1Fup/wC5UOSorYwdGXzjBFNsbw8sqTm/VLGZoG8LZsKRZxTm+OK7INDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkDjziuwUh1y26ENkHLMc02o5OUjtCVjttabVVWyThAvMptrWrVdVxXZXbzkq8zyhTZYPS4uZippDqmKftX6PM4Rm6pTmTrXbsKsnzFUT12c49C1FAcmAAAAAAAAAAAAA+FFE0kzqqnKmkkQyiihzUKRNMhamOc5jVpQpSlptrWvMpQAUv35lJ7LrLxdvLqsoglTJKPEuEk7ktnMMah+Yo2aG2fUlpwTnL9fzK8Cl6QPNIa35q4F6t4eOcPjl2dMMmWhUEtvO6e5VqRujSvhcM1NorqKHpDbCl0rEodw8hmla029KM4dLKlr4h+kszI/wDYnMKbSKm64j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSA4j7h7LQ3lvfQgbSB1+VxNeMYmZVNq2lUyU2m9K3BllaU2bfqW7hJs5Vr4WwhDV2+EFqB0dhIysA/o5YOHMc/bHqQ3B4SRymIbYdFwienBOThU2GTOWtK86tBXWUKq8f5Ab3cgZo7Km1nGqdDroErsReJU2FM7a0NWpi0oav1ada1qTbStK1pXmWNWFT0kUAAAAAAAAAAB4bma6FGTNtbTNSpFZJPqqRMWuw1GBVDERb0rz9jpdM1Tc6vBT2c2hqi6K3QeQ2JZy14S/U5jHRjGdCLybkmzhlTMatE26Na0qWjhzUtaFrXmFKUxubs2Vq3YUKwo2MYRDNFhGtUmbRAuxNFIuym3ZSlTnNXadRU+zaY5q1MavNrWosKlsfWJvk931oidSVvZXzhG3RkmMMsk6xFiFBLJGRGjxCuxaNnWkS7St2ypItNhqIT8lFKHIahi0NStKjZcJyjjuMpVLrRcbu/+JU7iHTVumS6MVI1vFs2YFg7dO9VlK8L5kO7n0nZoi+hJxI9mbuVxvzPHTDTfo/Zpx6ZjdRXTm7IKy7x2U2zg0dWDYcc3QjjJ7K1rUlyOuHwtmwnB2m3y5clcbFLEL29rdjTj/ik9P7iNFvnKjK1xw+6LZ8KpL/DFaP32W9bn5UhvOJ5zReKaabrJSocx+orYxROO21SmTSJRKp7yv8Au15wCGTqen9LwuEc22tS8Ghfep8muXIKyTvE3vua/wAMYnhVOUjMU3bFXeC6EH/ilI6v3zjvTvbZhbtOw/sgMnNxlnwa3CPtGLnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12x3zjvTvbZhbtOw/sgHNxlnwa3CPtDnFzL4VHg12zQc8pr3qK7ZwgleuHGSqyCqSbxthu3juWiiiZiEctyvHDtoZdA1eESiqSqdTUpwiGLtpWq5Ocsp2uFZr2jD5RMytWKdFP2aOo98j72r39rL7R2IfcgM3N7lb1E+EqecYecDNHr4cHDzTskXymPersGlG7vIeJptahznq/lMMWik7MU1dpUqkhU4hjwE+cXYjQ3i1qMUuTrLEnaqdWK3lUl8trMkeUPM0VY6lKT33Tj8liOR75x3p3tswt2nYf2QFvNxlnwa3CPtF3OLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnHene2zC3adh/ZAObjLPg1uEfaHOLmXwqPBrtjvnH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sPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQHG3fHZNv6msPOAsQOvyt8XZNJmRkJx4ogemw6CNU2SChdmzgqosk26apdnhGpWnkhYihoW9ak5c7miEUzOonQ1KLPFaVSZNqV55lnFaVLtpTm8EvCPXwi1FW7AVY2ZZUdZ7IySFeqZByUlX8gctCnVqWm2iKJeb0lqQ22tC7a1rXmmrWuzZY3aVO5igAAAAAAAAAAAAADh5W34ScLQstFsn+wtSEUXQJVdMtdu2iTgtCrpU21/yTUC0HS18RWQqbhEYu21Ob9QhIO6l5uz/SFFzczZ4vhitrBocTtl+YyPX5+gFdpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYHE7ZfmMj1+foA2mBxO2X5jI9fn6ANpgcTtl+YyPX5+gDaYOWY4yslgcqhIRJyoWtNhny7l4SuylPrm66xmpqbabeaTw/EFLWDvKKKLdIiKCSaCKdOCmkiQqSRC8/gkTJQpS02151KCgNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
	printDoc.addImage(logod,'JPEG', 243, 172, 50, 25);


	// var compass = "data:image/jpeg;base64,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T9D1fVwTpul3t6Adp+zW7yYPp8oNfb1p4e0TT4xHZaPp9sgJIWG2RAM9egrRChRhQAB2FAHyjoPwG8Zas6tewwaVBnlrmQM+PZVz+uK9I0/4W+APAUcFz4hnOrX5kSNEmTcjSOdqqIRkck8byR37V7PWPq3huz1aSF3LR7LmG5dU+7K0bhl3D1yo5HOBg5HFAGsiLGioihUUYCqMACnUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABXAaL8P20v4u654sJT7LeW6rAgxlZG2+YSPqmc/7Z9K7e+v7PTLR7u/uoLW3T70s8gRR9SeKytO8aeGNXuha6fr+nXNwekUdwpY/QZ5oA3aKiW6ge7ktVmQ3ESLJJGG+ZVYsFJHYEq2PoaloAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA8Kg16Hxr+0M2larIkmm6QZksbRx8jXEYwzEH7zZDkeyivadS0nT9Z097DUrKC6tHGGilQMvt9PrXgfxZ+HWv6V4sl8a+GFnkV5FnlFtzLbyjALADkqep64yc8VteBfj/Y36Q2HixFs7snaL2Nf3L84G4dUPqenU8dKAN34Y+Hbvwv458badc3E1zF/octrNM5ZmhbztoySTxyv1UmvUaggS1lkN9AIXeeNFM8eCZEBJUbh1A3MR/vH1qegAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCC3vIbma6iicM9rKIpRkfKxRXx/3y6n8a86+IHwa0Txek19YKmm6yRkTRr+7lPo6juf7w59c4xV7RL/U7P4keMUlsJpNEe4tyt1EA3lzi2h3KVB3EFShyAQMc9a6JfGXhh7g26eINMkuQSvkR3SNLkdRsB3ZGDxigDxD4J69rXhvx1ceA9XaRIm80R28gJ8qZAXO09lZQx9DwR15+i6878O+FpNR+Jmp+PLq2a1hlhW3sIZIikrrsVWlkU8qTggA4OOor0SgAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q==";
	// printDoc.addImage(compass,'PNG', 249, 20, 50, 25);
	




	printDoc.setDrawColor(100,100,100);
	printDoc.setFillColor(255,255,255);
	printDoc.rect(20, 150, 80,43,'FD'); 

	printDoc.setFontSize(10);
	printDoc.setFont("helvetica");
	printDoc.setFontType("regular");


	printDoc.text(42, 156.5, "Appartement");
	printDoc.setDrawColor(0);
	printDoc.setFillColor(223,186,73);
	printDoc.rect(28, 154, 10, 5, 'F'); 

	printDoc.text(42, 166.5, "Villa");
	printDoc.setDrawColor(0);
	printDoc.setFillColor(69,182,175);
	printDoc.rect(28, 164, 10, 5, 'F'); 


	printDoc.text(42, 176.5, "Terrain");
	printDoc.setDrawColor(0);
	printDoc.setFillColor(243,86,93);
	printDoc.rect(28, 174, 10, 5, 'F'); 

	printDoc.text(42, 186.5, "Maison");
	printDoc.setDrawColor(0);
	printDoc.setFillColor(66,139,202);
	printDoc.rect(28, 184, 10, 5, 'F'); 



	// printDoc.fromHTML($('#map').get(0), 10, 10, {'width': 180});
	// printDoc.autoPrint();
	printDoc.output("dataurlnewwindow"); // this opens a new popup,  after this the PDF opens the print window view but there are browser inconsistencies with how this is handled
}

$('#export_shape').click(function(event) {
	Var formatGeoJson = New ol.format.GeoJSON();
	Var result = formatGeoJson.writeFeatures(yourFeatureCollection);
});


$('#rapport_btn').click(function(event) {
	alert('Cette fonctionnalité est en cours de développement');
});