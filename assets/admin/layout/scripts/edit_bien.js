/* ON Load*/
	jQuery(document).ready(function(){
		Metronic.init(); // init metronic core components
		Layout.init(); // init current layout
		QuickSidebar.init(); // init quick sidebar
		Demo.init(); // init demo features
		ComponentsIonSliders.init();
		ComponentsFormTools2.init();
		handleTable();
		load_bien();

		$('#nav_gerer').addClass('active');
		$('#nav_add').removeClass('active');
		$('#nav_map').removeClass('active');

	});

	var handleTable = function () {

		function restoreRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);

			for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
				oTable.fnUpdate(aData[i], nRow, i, false);
			}

			oTable.fnDraw();
		}

		function editRow(oTable, nRow) {
			var aData = oTable.fnGetData(nRow);
			var jqTds = $('>td', nRow);
			jqTds[0].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[0] + '">';
			jqTds[1].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[1] + '">';
			jqTds[2].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[2] + '">';
			jqTds[3].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[3] + '">';
			jqTds[4].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[4] + '">';
			jqTds[5].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[5] + '">';
			jqTds[6].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[6] + '">';
			jqTds[7].innerHTML = '<input type="text" class="form-control input-small" value="' + aData[7] + '">';
			jqTds[8].innerHTML = '<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Enregistrer</a>';
			jqTds[9].innerHTML = '<a class="cancel btn grey-cascade" href="" style="text-decoration: none;padding:4px 4px;">Annuler</a>';
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
			oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
			oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
			oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
			console.log(jqInputs[0].value);
			console.log(jqInputs[1].value);
			console.log(jqInputs[2].value);
			console.log(jqInputs[4].value);
			console.log(jqInputs[5].value);
			console.log(jqInputs[6].value);
			console.log(jqInputs[7].value);

			$.post("/ci/pages/save_bien",{
				'id_bien':jqInputs[0].value,
				'titre':jqInputs[1].value,
				'adresse':jqInputs[2].value,
				'consistance':jqInputs[3].value,
				'surface_totale':jqInputs[4].value,
				'surface_construite':jqInputs[5].value,
				'valeur_venale':jqInputs[6].value,
				'nbre_etage':jqInputs[7].value
			},"json"),
			// 			.done(function( data ){
			// 	// $('#UpdateModal').hide();
			// 	// load_nature();
			// })
			// .fail(function( data ){
			// 	alert('Error');
			// });

			
			oTable.fnUpdate('<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Modifier</a>', nRow, 8, false);
			oTable.fnUpdate('<a class="delete btn btn-danger" href="" style="text-decoration: none;padding:4px 4px;">Supprimer</a>', nRow, 9, false);
			oTable.fnDraw();
		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
			oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
			oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
			oTable.fnUpdate(jqInputs[7].value, nRow, 7, false);
			oTable.fnUpdate('<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Modifier</a>', nRow, 7, false);
			oTable.fnDraw();
		}

		var table = $('#sample_1');


		$.extend(true, $.fn.DataTable.TableTools.classes, {
			"container": "btn-group tabletools-dropdown-on-portlet",
			"buttons": {
				"normal": "btn btn-sm default",
				"disabled": "btn btn-sm default disabled"
			},
			"collection": {
				"container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"
			}
		});


		var oTable = table.dataTable({

			// Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
			// setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
			// So when dropdowns used the scrollable div should be removed. 
			//"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

			"lengthMenu": [
				[5, 15, 20, -1],
				[5, 15, 20, "All"] // change per page values here
			],

			// Or you can use remote translation file
			// "language": {
			//   url: '//cdn.datatables.net/plug-ins/1.10.11/i18n/French.json'
			// },

			// set the initial value
			"pageLength": 10,

			"language": {
				"lengthMenu": " _MENU_ Enregistrements",
				"sProcessing":     "Traitement en cours...",
				"sSearch":         "Rechercher&nbsp;:",
				"sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
				"sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
				"sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
				"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
				"sInfoPostFix":    "",
				"sLoadingRecords": "Chargement en cours...",
				"sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
				"sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
				"oPaginate": {
					"sFirst":      "Premier",
					"sPrevious":   "Pr&eacute;c&eacute;dent",
					"sNext":       "Suivant",
					"sLast":       "Dernier"
				},
				"oAria": {
					"sSortAscending":  ": activer pour trier la colonne par ordre croissant",
					"sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
				}
			},
			"columnDefs": [{ // set default column settings
				'orderable': true,
				'targets': [0]
			}, {
				"searchable": true,
				"targets": [0]
			}],
			"order": [
				[0, "asc"]
			],
			 // set first column as a default sort by asc
			"lengthMenu": [
				[5, 10, 15, 20, -1],
				[5, 10, 15, 20, "All"] // change per page values here
			],
			// set the initial value
			"pageLength": 10,

			"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

			// Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
			// setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
			// So when dropdowns used the scrollable div should be removed. 
			//"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

			"tableTools": {
				"sSwfPath": "../assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
				"aButtons": [{
					"sExtends": "pdf",
					"sButtonText": "PDF"
				}, {
					"sExtends": "csv",
					"sButtonText": "CSV"
				},{
					"sExtends": "print",
					"sButtonText": "Print",
					"sInfo": 'Please press "CTR+P" to print or "ESC" to quit',
					"sMessage": "Generated by DataTables"
				}
				]
			}

		});

		var tableWrapper = $("#sample_1_wrapper");

		tableWrapper.find(".dataTables_length select").select2({
			showSearchInput: true //hide search box with special css class
		}); // initialize select2 dropdown

		var nEditing = null;
		var nNew = false;

		table.on('click', '.delete', function (e) {
			e.preventDefault();
			var nRow = $(this).parents('tr')[0];
			bootbox.confirm({
				title:'Confirmation',
				message:" Voulez vous vraiment supprimer cette éléments",
				buttons: {
					'cancel': {
						label: 'Annuler',
						className: 'btn-default pull-left'
					},
					'confirm': {
						label: 'Supprimer',
						className: 'btn-danger pull-right'
					}
				},
				callback:function(result){
					if(result){
						oTable.fnDeleteRow(nRow);
									$.post("/ci/pages/delete_bien",{'id_bien':nRow.id},"json")
					}else{
						return;
					}
				}
		});
});
		table.on('click', '.cancel', function (e) {
			e.preventDefault();
			if (nNew) {
				oTable.fnDeleteRow(nEditing);
				nEditing = null;
				nNew = false;
			} else {
				restoreRow(oTable, nEditing);
				nEditing = null;
			}
		});

		table.on('click', '.edit', function (e) {
			e.preventDefault();

			/* Get the row as a parent of the link that was clicked on */
			var nRow = $(this).parents('tr')[0];

			if (nEditing !== null && nEditing != nRow) {
				/* Currently editing - but not this row - restore the old before continuing to edit mode */
				restoreRow(oTable, nEditing);
				editRow(oTable, nRow);
				nEditing = nRow;
			} else if (nEditing == nRow && this.innerHTML == "Enregistrer") {
				/* Editing this row and want to save it */
				saveRow(oTable, nEditing);
				nEditing = null;
				// console.log(row_id);
				
				bootbox.alert(" La modification est bien effectuée");

			} else {
				/* No edit in progress - let's start one */
				editRow(oTable, nRow);
				nEditing = nRow;
			}
		});
	}
	// Load Data
		function load_bien(){
			$.post(window.location.origin+"/ci/pages/load_bien","json")
			.done(function( data ){
				FillDatatables(data);
			});
		}

	// Fill Data to Datatables
		function FillDatatables(data){
			data=jQuery.parseJSON(data);
			table = $('#sample_1').dataTable();
			table.fnClearTable();
			for (var i in data) {
				var rowIndex = table.fnAddData([
					data[i]['id_bien'],
					data[i]['titre'],
					data[i]['adresse'],
					data[i]['consistance'],
					data[i]['surface_totale'],
					data[i]['surface_construite'],
					data[i]['valeur_venale'],
					data[i]['nbre_etage'],
					'<a class="edit btn btn-success" href="javascript:;" style="text-decoration: none;padding:4px 4px;">Modifier </a>',
					'<a class="delete btn btn-danger" href="javascript:;" style="text-decoration: none;padding:4px 4px;">Supprimer </a>',
				]);
				// Add Row ID 
				var row = table.fnGetNodes(rowIndex);
				$(row).attr( 'id', data[i]['id_bien']);
			}
		}


