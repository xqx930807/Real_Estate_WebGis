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
			jqTds[5].innerHTML = '<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Save</a>';
			jqTds[6].innerHTML = '<a class="cancel btn grey-cascade" href="" style="text-decoration: none;padding:4px 4px;">Cancel</a>';
		}

		function saveRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
			oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
			oTable.fnUpdate('<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Modifier</a>', nRow, 5, false);
			oTable.fnUpdate('<a class="delete btn btn-danger" href="" style="text-decoration: none;padding:4px 4px;">Supprimer</a>', nRow, 6, false);
			oTable.fnDraw();
		}

		function cancelEditRow(oTable, nRow) {
			var jqInputs = $('input', nRow);
			oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
			oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
			oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
			oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
			oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
			oTable.fnUpdate('<a class="edit btn btn-success" href="" style="text-decoration: none;padding:4px 4px;">Modifier</a>', nRow, 5, false);
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
					"sButtonText": "Excel"
				}, {
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

		$('#sample_editable_1_new').click(function (e) {
			e.preventDefault();

			if (nNew && nEditing) {
				if (confirm("Previose row not saved. Do you want to save it ?")) {
					saveRow(oTable, nEditing); // save
					$(nEditing).find("td:first").html("Untitled");
					nEditing = null;
					nNew = false;

				} else {
					oTable.fnDeleteRow(nEditing); // cancel
					nEditing = null;
					nNew = false;
					
					return;
				}
			}

			var aiNew = oTable.fnAddData(['', '', '', '', '', '']);
			var nRow = oTable.fnGetNodes(aiNew[0]);
			editRow(oTable, nRow);
			nEditing = nRow;
			nNew = true;
		});

		table.on('click', '.delete', function (e) {
			e.preventDefault();
			var nRow = $(this).parents('tr')[0];
			bootbox.confirm({
				title:'Confirmation',
				message:" Voulez vous vraiment supprimer cette éléments",
				buttons: {
					'cancel': {
						label: 'Cancel',
						className: 'btn-default pull-left'
					},
					'confirm': {
						label: 'Delete',
						className: 'btn-danger pull-right'
					}
				},
				callback:function(result){
					if(result){
						oTable.fnDeleteRow(nRow);
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
			} else if (nEditing == nRow && this.innerHTML == "Save") {
				/* Editing this row and want to save it */
				saveRow(oTable, nEditing);
				nEditing = null;
				bootbox.alert(" La modification est bien effectuée")
			} else {
				/* No edit in progress - let's start one */
				editRow(oTable, nRow);
				nEditing = nRow;
			}
		});
	}
	// Load Data
		function load_bien(){
			$.post(window.location.origin+"/ci/pages/load_user","json")
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
					data[i]['id_utilisateur'],
					data[i]['prenom_utilisateur'],
					data[i]['nom_utilisateur'],
					data[i]['login_utilisateur'],
					data[i]['email_utilisateur'],
					'<a class="edit btn btn-success" href="javascript:;" style="text-decoration: none;padding:4px 4px;">Modifier </a>',
					'<a class="delete btn btn-danger" href="javascript:;" style="text-decoration: none;padding:4px 4px;">Supprimer </a>',
				]);
				// Add Row ID 
				// var row = table.fnGetNodes(rowIndex);
				// $(row).attr( 'id', data[i]['id_log']);
			}
		}


