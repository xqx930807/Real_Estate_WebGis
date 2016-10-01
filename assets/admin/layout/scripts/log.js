/* ON Load*/
	jQuery(document).ready(function(){
		Metronic.init(); // init metronic core components
		Layout.init(); // init current layout
		QuickSidebar.init(); // init quick sidebar
		Demo.init(); // init demo features

		load_logs();
});





	// Load Data
		function load_logs(){
			$.post(window.location.origin+"/ci/pages/load_logs","json")
			.done(function( data ){
				FillDatatables(data);
			});
		}

	// Fill Data to Datatables
		function FillDatatables(data){
			data=jQuery.parseJSON(data);
			table = $('#log_table').dataTable();
			table.fnClearTable();
			for (var i in data) {
				var rowIndex = table.fnAddData([
					data[i]['id_log'],
					data[i]['type_log'],
					data[i]['text_log'],
					data[i]['date_time']
				]);
				// Add Row ID 
				var row = table.fnGetNodes(rowIndex);
				$(row).attr( 'id', data[i]['id_log']);
			}
		}