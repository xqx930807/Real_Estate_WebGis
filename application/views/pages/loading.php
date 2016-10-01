<!DOCTYPE html>
<html>
<head>
	<title></title>		
	<!--  Bootstrap -->
		<link href="<?php echo base_url(); ?>assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
		<style type="text/css">
	 #main-loading {
			  width: 100%;
			  height: 100%;
			  text-align: center;
			  overflow: hidden;              
		  }
		  #main-loading{
			background-color:#364150;
			position:absolute;
		}
		#main-loading #app-loading{
			position: absolute;
			background-repeat: no-repeat;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		#main-loading #loading-gif{
			position: absolute;
			background-image: url('http://gis.burkenc.org/css/images/predefined_loading_1.gif');
			background-repeat: no-repeat;
			width:58px;
			height:58px;
			top: 100%;
			left: 50%;
			transform: translate(-50%, -50%);
		}


			  #main-loading #ie-note {
				  position: absolute;
				  top: 0;
				  bottom: 0;
				  left: 0;
				  right: 0;
				  margin: auto;
			  }

			  #main-loading #ie-note {
				  width: 586px;
				  height: 253px;
				  background-image: url('images/notes.png');
				  padding: 0 30px 40px 30px;
				  font-size: 14px;
				  color: #596679;
			  }
</style>
</head>
<body>
<div class="page-content-wrapper">
	<div class="page-content">
		<div id="main-loading" >
			<div id="app-loading" >
				<img id="cocacola" src="<?php echo base_url(); ?>assets/admin/pages/img/uit.png" alt="Coca Cola Logo" class="img-responsive logo" style="margin: 0 auto;" />
				<!-- <div id="demo-progress-1" style="margin-bottom:10px;font-size:16px;opacity:0;font-weight:bold;">0 %</div> -->
				<!-- <div id="loading-gif" style="margin-top:30px;"></div> -->
			</div>
		</div>
	</div>
</div>
<script src="<?php echo base_url(); ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/admin/pages/scripts/loadgo.js" type="text/javascript"></script>

<script type="text/javascript">
var cocacolaInterval;
function mainDemo () {
	$('#demo-msg-1').animate({
		'opacity': '0'
	});
	$('#demo-progress-1').animate({
		'opacity': '1'
	});
	var p = 0;
	$('#cocacola').loadgo('resetprogress');
	$('#demo-progress-1').html('0%');
	window.setTimeout(function () {
		cocacolaInterval = window.setInterval(function (){
			if ($('#cocacola').loadgo('getprogress') == 100) {
				window.clearInterval(cocacolaInterval);
				$('#demo-msg-1').animate({
					'opacity': '1'
				});
				$('#demo-progress-1').animate({
					'opacity': '0'
				});
				$("#cocacola").hide('slow', function() {
					window.location ="http://127.0.0.1/ci/pages/map";
				});
			}
			else {
				var prog = p*10;
				$('#cocacola').loadgo('setprogress', prog);
				p++;
			}
		}, 500);
	}, 300);
};
$(window).load(function () {
	$("#cocacola").load(function() {
		$('#cocacola').loadgo();
	}).each(function() {
		if(this.complete) $(this).load();
	});
	mainDemo();
});
</script>

</body>
</html>

