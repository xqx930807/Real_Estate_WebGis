
		<!-- FOOTER -->
		<div class="page-footer">
			<div class="page-footer-inner">
				 2016 &copy; by Ahmed EL ATARI.
			</div>
			<div class="scroll-to-top">
				<i class="icon-arrow-up"></i>
			</div>
		</div>


	<!--  CORE PLUGINS -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>

	<!--  JQuery UI -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>

	<!--  Boostrap -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
		<!-- <script src="<?php echo base_url(); ?>assets/global/plugins/bootstrap/js/bootstrap-extend.min.js" type="text/javascript"></script> -->
	<!-- bootstrap Select   -->
		<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>


			<!-- Select 2   -->
		<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/select2/select2.min.js"></script>

		<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/jquery-multi-select/js/jquery.multi-select.js"></script>
	<!--  bootstrap-hover-dropdown -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>

	<!--  jquery slimscroll -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>

	<!-- OpenLayer 3.015 -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/Openlayer/ol-debug.js" type="text/javascript"></script>

	<!-- Proj4JS -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/proj4js/proj4.js" type="text/javascript"></script>

	<!-- Projection Definition : 26191 -->
		<script src="http://epsg.io/26191.js" type="text/javascript"></script>

	<!-- jquery.selectbox -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/Jquery selectbox/js/jquery.selectbox-0.2.js" type="text/javascript"></script>



		<script src="<?php echo base_url(); ?>assets/global/plugins/FileSaver.js/FileSaver.js" type="text/javascript"></script>

	<!-- Ion Slider -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/ion.rangeslider/js/ion-rangeSlider/ion.rangeSlider.min.js"></script>
		<script src="<?php echo base_url(); ?>assets/admin/pages/scripts/components-ion-sliders.js"></script>

	<!-- DAATABLE -->
<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/datatables/extensions/TableTools/js/dataTables.tableTools.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/datatables/extensions/ColReorder/js/dataTables.colReorder.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/datatables/extensions/Scroller/js/dataTables.scroller.min.js"></script>
<script type="text/javascript" src="<?php echo base_url() ?>assets/global//plugins/bootbox/bootbox.min.js"></script>



<script type="text/javascript" src="<?php echo base_url() ?>assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js"></script>


	<!-- jquery. Mini Colors -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/bootstrap-select/bootstrap-select.min.js" type="text/javascript"></script>
	<!-- jquery. Mini Colors -->
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-minicolors/jquery.minicolors.min.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/pages/scripts/components-form-tools2.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/bootstrap-slider/bootstrap-slider.js"></script>



		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/ol3-geocoder/build/ol3-geocoder-debug.js"></script>



	<!--  App Scripts -->
		<script src="<?php echo base_url(); ?>assets/global/scripts/metronic.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
		<script src="<?php echo base_url() ?>assets/admin/pages/scripts/table-advanced.js"></script>

	<?php if($page === 'add_bien'){ ?>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/ol_bien.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/ajaxfileupload.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-validation/js/jquery.validate.min.js"></script>
		<script src="<?php echo base_url(); ?>assets/global/plugins/jquery-validation/js/additional-methods.min.js"></script>
	<?php } ?>
	<?php if($page === 'edit_bien'){ ?>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/edit_bien.js" type="text/javascript"></script>
	<?php } ?>
	<?php if($page === 'user'){ ?>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/edit_user.js" type="text/javascript"></script>
	<?php } ?>

	<?php if($page === 'log'){ ?>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/log.js" type="text/javascript"></script>
	<?php } ?>

	<?php if($page === 'map') { ?>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/app.js" type="text/javascript"></script>
		<script src="<?php echo base_url(); ?>assets/admin/layout/scripts/ol_App.js" type="text/javascript"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/ddslick/ddslick.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/ol3-popup/src/ol3-popup.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/shapefile-js/dist/shp.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/turf/turf.min.js"></script>



		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/html2pdf/jspdf.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/html2pdf/png_support/png.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/html2pdf/png_support/zlib.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/html2pdf/plugins/png_support.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/global/plugins/html2pdf/plugins/addimage.js"></script>

	<?php }?>


	</body>

</html>
