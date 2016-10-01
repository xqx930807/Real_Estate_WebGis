
			<div class="page-content-wrapper">
				<div class="page-content">
					<h3 class="page-title">
					Carte Vénale <small>Prix, Surface et consistance</small>
					</h3>
					<div class="row">
						<div class="col-md-12">
							<div class="portlet box blue-chambray" style="margin-bottom: 0px;">
								<div class="portlet-title">
									<div class="tools">
										<a href="javascript:;" class="collapse">
										</a>
									</div>
										<ul class="nav nav-tabs">
											<li class="active">
												<a href="#tab_1" data-toggle="tab">
												Explorer & Localiser </a>
											</li>
											<li>
												<a href="#tab_2" data-toggle="tab">
												Calque & Donnée </a>
											</li>
											<li>
												<a href="#tab_3" data-toggle="tab">
												Créer & Partager </a>
											</li>
																				<li>
												<a href="#tab_4" data-toggle="tab">
												Sélectionner & Analyser </a>
											</li>
										</ul>
								</div>
								<div class="portlet-body" style="padding: 0px !IMPORTANT;">
										<div class="tab-content" style="min-height: 110px;">
											<!-- Explore & Locate Tab -->
											<div class="tab-pane  active" id="tab_1" >
													<!-- Navigate Section -->
													<div class="group-btn" style="width: 27%;" >
														<span class="menu-btn" style="width:16%;" id="pan">
															<span class="icons-btn"><i class="ifont pan" ></i></span>
															<span class="name-btn">Pan</span>
														</span>
														<span class="menu-btn" style="width:16%;" id="zoom_in">
															<span  class="icons-btn">
																<i class="ifont zoom-in "></i>
															</span>
															<span class="name-btn">
															Zoomer</span>
														</span>
														<span class="menu-btn" style="width:16%;" id="zoom_out">
															<span  class="icons-btn">
																<i class="ifont zoom-out" ></i>
															</span>
															<span class="name-btn">Dé-Zoomer</span>
														</span>
														<span  class="menu-btn" style="width:16%;" id="full_extent">
															<span  class="icons-btn">
																<i class="ifont full-extent" ></i>
															</span>
															<span class="name-btn">L'étendue Globale</span>
														</span>
														<span  class="menu-btn" style="width:16%;opacity:0.4" id="prev_extent">
															<span  class="icons-btn">
																<i class="ifont previous-extent" ></i>
															</span>
															<span class="name-btn">L'étendue Précédente </span>
														</span>
														<span class="menu-btn" style="width:16%;opacity:0.4" id="next_extent">
															<span  class="icons-btn">
																<i class="ifont next-extent" ></i>
															</span>
															<span class="name-btn">L'étendue Suivante</span>
														</span>
														<div class="group-name">Navigation</div>
													</div>
													
													<!-- Select Section -->
													<div class="group-btn" style="width: 15%;">
<!-- 														<span class="menu-btn" style="width:18%;" >
															<span  class="icons-btn">
																<i class="ifont Identify-point" ></i>
															</span>
															<span class="name-btn">Identifier Point</span>
														</span> -->
														<span class="menu-btn" style="width:33%;" id="recherche_type">
															<span  class="icons-btn">
																<i class="ifont search-by-adress" ></i>
															</span>
															<span class="name-btn">Recherche par Type </span>
														</span>
														<span class="menu-btn" style="width:33%;" id="recherche_surface">
															<span  class="icons-btn">
																<i class="ifont search-by-pid" ></i>
															</span>
															<span class="name-btn">Recherche par Surface</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="recherche_prix">
															<span  class="icons-btn">
																<i class="ifont search-by-business" ></i>
															</span>
															<span class="name-btn"> Recherche par Prix</span>
														</span>
														<div class="group-name">Sélection</div>
													</div>
													
													<!-- Information & Actions -->
													<div class="group-btn" style="width: 15%;">
														<span style="width:100%;height: 38%;display: inline-block;vertical-align: middle;padding-top:10px " >
															<span> Échelle : </span>
															<select name="scale" id="scale_select" tabindex="1">
																<option value="500">500</option>
																<option value="1000">1000</option>
																<option value="2000">2000</option>
																<option value="4000">4000</option>
																<option value="8000">8000</option>
																<option value="16000">16000</option>
																<option value="32000">32000</option>
																<option value="64000">64000</option>
															</select>
														</span>
														<span id="bookmarks_container" style="width:100%;height: 40%;display: inline-block;vertical-align: middle;padding-top:10px" >
															<span ><input type="submit" style="margin-top:5px;background-color:white;height:27px;border:1px solid #CCCCCC;color:#646464" value="+" id="add_bookmark"/></span>
															<select name="" class="select2me" tabindex="1"  id="bookmarks_change" style="width:180px !important;" placeholder = "Signets"><option value="">Signets</option>
<!-- 																
																<option value="4">DRIOUCH</option>
																<option value="10">MIDAR</option>
																<option value="10">TAZAGHINE</option> -->
															</select>

														</span>
														<div class="group-name">Informations et actions</div>
													</div>
													
													<!-- Coordinate tools -->
													<div class="group-btn" style="width: 12%;">
														<span class="menu-btn" style="width:33%;" id="add_coordinate">
															<span  class="icons-btn">
																<i class="ifont new grey" ></i>
															</span>
															<span class="name-btn">Nouveau</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="plot_coordinate">
															<span  class="icons-btn">
																<i class="ifont plot grey" ></i>
															</span>
															<span class="name-btn">Dessiner</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="clear_all">
															<span  class="icons-btn">
																<i class="ifont clear grey" ></i>
															</span>
															<span class="name-btn">Effacer</span>
														</span>
														<div class="group-name">Outils de coordonnées</div>
													</div>


													<!-- Reporting tools -->
													<div class="group-btn" style="width: 15%;">
														<span class="menu-btn" style="width:33%;" >
															<a  class="icons-btn" id="export-png"  download="map.png" style="text-decoration: none;" onclick="exportMap();">
																<i class="ifont export-image" ></i>
																<span class="name-btn">Exporter Image</span>
															</a>
														</span>
														<span class="menu-btn" style="width:33%;" id="print">
															<span  class="icons-btn">
																<i class="ifont print" ></i>
															</span>
															<span class="name-btn">Imprimer</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="report">
															<span  class="icons-btn">
																<i class="ifont report" ></i>
															</span>
															<span class="name-btn">Exporter PDF</span>
														</span>
														<div class="group-name">Outils d'impression</div>
													</div>
											</div>
											<!-- Layer & Data -->
											<div class="tab-pane" id="tab_2" >
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 13%;" >
													<span class="menu-btn" style="width:33%;" id="pan2">
														<span class="icons-btn"><i class="ifont pan" ></i></span>
														<span class="name-btn">Pan</span>
													</span>
													<span class="menu-btn" style="width:33%;" id="zoom_in2">
														<span  class="icons-btn">
															<i class="ifont zoom-in"></i>
														</span>
														<span class="name-btn">
														Zoomer</span>
													</span>
													<span class="menu-btn" style="width:33%;" id="zoom_out2">
														<span  class="icons-btn">
															<i class="ifont zoom-out" ></i>
														</span>
														<span class="name-btn">Dé-Zoomer</span>
													</span>
													<div class="group-name">Navigation</div>
												</div>
												<!-- Navigate Section -->
<!-- 												<div class="group-btn" style="width: 7%;" >
													<span class="menu-btn" style="width:100%;" id="pan">
														<span class="icons-btn"><i class="ifont identify" ></i></span>
														<span class="name-btn">Identifier</span>
													</span>
													<div class="group-name">Identification</div>
												</div> -->

												<!-- Navigate Section -->
												<div class="group-btn" style="width: 5%;" id="calque_tab_btn">
													<span class="menu-btn" style="width:100%;">
														<span class="icons-btn"><i class="ifont layers" ></i></span>
														<span class="name-btn">Calques</span>
													</span>
													<div class="group-name">Calques</div>
												</div>
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 5%;" >
													<span class="menu-btn" style="width:100%;" id="result_tab_btn">
														<span class="icons-btn"><i class="ifont query-result" ></i></span>
														<span class="name-btn">Résultats</span>
													</span>
													<div class="group-name">Résultats</div>
												</div>
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 15%;" >
													<table class="menu-table-sans-hover" style="text-align:left">
														<tr ><td><label class="name-btn" ><input type="checkbox" id="popup_check" checked="true"> Étiquette sur Carte </label></td></tr>
														<tr><td><div id="demoBasic"> Base Map</div></td></tr>
													</table>
													<div class="group-name">Base Map</div>
												</div>



												<!-- Navigate Section -->
												<div class="group-btn" style="width: 5%;" >
													<span class="menu-btn" style="width:100%;" id="add_shape">
														<span class="icons-btn"><i class="ifont add-shapefile" ></i></span>
														<span class="name-btn">Ajouter Shapefile</span>
													</span>
<!-- 													<span class="menu-btn" style="width:50%;" id="zoom_in">
														<span  class="icons-btn">
															<i class="ifont add-csv"></i>
														</span>
														<span class="name-btn">Afficher CSV file</span>
													</span> -->
													<div class="group-name">Ajouter des données</div>
												</div>
											</div>
											<!-- Create & share -->
											<div class="tab-pane" id="tab_3">
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 13%;" >
													<span class="menu-btn" style="width:33%;" id="pan3">
														<span class="icons-btn"><i class="ifont pan" ></i></span>
														<span class="name-btn">Pan</span>
													</span>
													<span class="menu-btn" style="width:33%;" id="zoom_in3">
														<span  class="icons-btn">
															<i class="ifont zoom-in"></i>
														</span>
														<span class="name-btn">
														Zoomer</span>
													</span>
													<span class="menu-btn" style="width:33%;" id="zoom_out3">
														<span  class="icons-btn">
															<i class="ifont zoom-out" ></i>
														</span>
														<span class="name-btn">Dé-Zoomer</span>
													</span>
													<div class="group-name">Navigation</div>
												</div>
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 18%;" >
													<table class="menu-table">
														<tr>
															<td id="draw_line"><i class="ifont polyline" ></i> Line </td>
															<td id="draw_polygon_freehand"><i class="ifont Freehand" ></i> FreeHand </td>
															<td id="draw_polygon"><i class="ifont polygon" ></i> Polygone </td>
														</tr>
														<tr>
															<td id="draw_circle"><i class="ifont cercle" ></i> Cercle </td>
															<td id="draw_rectangle" ><i class="ifont rectangle" ></i> Rectangle </td>
															<td id="draw_point"><i class="ifont point" ></i> Point </td>
														</tr>

													</table>
													<div class="group-name">Dessin & Digitalisation</div>
												</div>
												<div class="group-btn" style="width: 17%;">
													<table class="menu-table-sans-hover">
													<tr>
													 <td><label class="name-btn">Bordure</label></td>
													 <td><input type="text" id="hidden-input" class="form-control demo" data-position="bottom left" value="#0088cc"></td>
													</tr>
													<tr>
													 <td><label class="name-btn">Remplissage</label></td>
													 <td><input type="text" id="position-bottom-left" class="form-control demo2" data-position="bottom left" value="#0088cc"></td>
													 </tr>
													 </table>
													<div class="group-name">Style</div>
												</div>
												<!-- Navigate Section -->
												<div class="group-btn" style="width: 13%;" >
													<table class="menu-table">
														<tr>
															<td id="delete"><i class="ifont erase" ></i> Supprimer </td>
															<td id="edit"><i class="ifont edit_shape" ></i> Modifier </td>
														</tr>
														<tr>
															<td id="Clear"><i class="ifont clear_all" ></i> Supprimer tous </td>
														</tr>
													</table>
													<div class="group-name">Dessin & Digitalisation</div>
												</div>
												<div class="group-btn" style="width: 8%;" >
													<span class="menu-btn" style="width:50%;" id="export_shape">
														<span class="icons-btn"><i class="ifont export_shape" ></i></span>
														<span class="name-btn"><a style="text-decoration:none" href="data:application/zip;charset=utf-8,504b 0304 0a00 0000 0000 a084 d348 66a5
ce2a ac03 0000 ac03 0000 1200 0000 7465
7374 5f73 6861 7065 6669 6c65 2e73 6870
0000 270a 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 01d6 e803 0000
0100 0000 2603 ca04 cd57 1241 bc3a 1f19
eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 01eb62 12
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
01
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241eb62 1241 2a49 bc72 f93b 1541 a303 313e
9a55 1541 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0001 0000 000a 0100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 124100 0000
7598 b9a9 8da1 1241 6237 4dc6 08f1 1241
0000 0002 0000 000a 0100 0000 8db7 8e78
01f6 1341 142b a12f 642a 1341 0000 0003
0000 000a 0100 0000 d86d fb2c b086 1241
1938 becd 40a6 1441 0000 0004 0000 000a
0100 0000 c8fb a628 c42b 1541 98c4 0129
eb67 1241 0000 0005 0000 000a 0100 0000
96a4 6d02 df5a 1441 1ba0 0f95 354a 1541
0000 0006 0000 000a 0100 0000 cd9c ddfe
16a3 1341 f7f4 7d8c bc0f 1341 0000 0007
0000 000a 0100 0000 5d7a c21b bca1 1241
ac71 cf62 90ae 1241 0000 0008 0000 000a
0100 0000 be15 0aa1 5fd5 1241 4555 9b90
6343 1541 0000 0009 0000 000a 0100 0000
654f 3bb9 e08a 1341 e7ef 03b4 ee83 1241
0000 000a 0000 000a 0100 0000 39c3 2426
3d4d 1441 70b3 d7d1 678e 1441 0000 000b
0000 000a 0100 0000 5f4c ee1c 6074 1441
1c8c 626f 1804 1441 0000 000c 0000 000a
0100 0000 5d33 a999 bde8 1341 2024 a73b
5ac4 1341 0000 000d 0000 000a 0100 0000
e3af 0daa 3268 1341 f7d9 4e26 ee4e 1441
0000 000e 0000 000a 0100 0000 689f 4556
6246 1341 bc3a 1f19 eb62 1241 0000 000f
0000 000a 0100 0000 2927 9da9 50c9 1241
0a03 d375 dcfb 1241 0000 0010 0000 000a
0100 0000 6130 1d5a 8861 1441 50e5 4ae7
c4c4 1241 0000 0011 0000 000a 0100 0000
8ef0 21f1 04cb 1241 dff0 6764 b0ca 1441
0000 0012 0000 000a 0100 0000 07e4 f2b0
fc8b 1341 1eba b6ce 798c 1241 0000 0013
0000 000a 0100 0000 aa59 f013 742c 1441
e406 a5fc 8779 1241 0000 0014 0000 000a
0100 0000 964a 2ae3 67db 1341 a303 313e
9a55 1541 0000 0015 0000 000a 0100 0000
8f8e 51bd c896 1341 3ffb 9638 0c7f 1341
0000 0016 0000 000a 0100 0000 d6a2 49b2
3c8d 1441 850a 8626 4a0b 1341 0000 0017
0000 000a 0100 0000 fabd 4531 0be0 1241
c2b3 8a0b b684 1241 0000 0018 0000 000a
0100 0000 2603 ca04 cd57 1241 0610 c8e8
0fdb 1341 0000 0019 0000 000a 0100 0000
2a9f 937f 8765 1241 6af8 4c1b be36 1341
0000 001a 0000 000a 0100 0000 0f9f adbf
28ca 1241 1af3 62ca 8e95 1241 0000 001b
0000 000a 0100 0000 2a49 bc72 f93b 1541
c01e 6be4 6b2d 1341 0000 001c 0000 000a
0100 0000 2a63 4a9d d4e4 1441 fc5b dcd3
7a6e 1241 0000 001d 0000 000a 0100 0000
d851 5bdf 7598 1241 fec4 672b b6e9 1341
0000 001e 0000 000a 0100 0000 dde7 6ffa
8bdf 1441 42cd 601c 18d5 1341 504b 0304
0a00 0000 0000 a084 d348 c908 b2da 5401
0000 5401 0000 1200 0000 7465 7374 5f73
6861 7065 6669 6c65 2e73 6878 0000 270a
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 00aa e803 0000 0100 0000
2603 ca04 cd57 1241 bc3a 1f19 eb62 1241
2a49 bc72 f93b 1541 a303 313e 9a55 1541
0000 0000 0000 0000 0000 0000 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
0000 0032 0000 000a 0000 0040 0000 000a
0000 004e 0000 000a 0000 005c 0000 000a
0000 006a 0000 000a 0000 0078 0000 000a
0000 0086 0000 000a 0000 0094 0000 000a
0000 00a2 0000 000a 0000 00b0 0000 000a
0000 00be 0000 000a 0000 00cc 0000 000a
0000 00da 0000 000a 0000 00e8 0000 000a
0000 00f6 0000 000a 0000 0104 0000 000a
0000 0112 0000 000a 0000 0120 0000 000a
0000 012e 0000 000a 0000 013c 0000 000a
0000 014a 0000 000a 0000 0158 0000 000a
0000 0166 0000 000a 0000 0174 0000 000a
0000 0182 0000 000a 0000 0190 0000 000a
0000 019e 0000 000a 0000 01ac 0000 000a
0000 01ba 0000 000a 0000 01c8 0000 000a
504b 0304 0a00 0000 0000 a084 d348 abee
c46e 9c00 0000 9c00 0000 1200 0000 7465
7374 5f73 6861 7065 6669 6c65 2e64 6266
0374 0513 1e00 0000 4100 0300 0000 0000
0000 0000 0000 0000 0000 0000 0000 0000
4944 0000 0000 0000 0000 004e 0000 0000
0200 0000 0000 0000 0000 0000 0000 0000
0d20 2030 2020 3120 2032 2020 3320 2034
2020 3520 2036 2020 3720 2038 2020 3920
3130 2031 3120 3132 2031 3320 3134 2031
3520 3136 2031 3720 3138 2031 3920 3230
2032 3120 3232 2032 3320 3234 2032 3520
3236 2032 3720 3238 2032 391a 504b 0102
1400 0a00 0000 0000 a084 d348 66a5 ce2a
ac03 0000 ac03 0000 1200 0000 0000 0000
0000 0000 0000 0000 0000 7465 7374 5f73
6861 7065 6669 6c65 2e73 6870 504b 0102
1400 0a00 0000 0000 a084 d348 c908 b2da
5401 0000 5401 0000 1200 0000 0000 0000
0000 0000 0000 dc03 0000 7465 7374 5f73
6861 7065 6669 6c65 2e73 6878 504b 0102
1400 0a00 0000 0000 a084 d348 abee c46e
9c00 0000 9c00 0000 1200 0000 0000 0000
0000 0000 0000 6005 0000 7465 7374 5f73
6861 7065 6669 6c65 2e64 6266 504b 0506
0000 0000 0300 0300 c000 0000 2c06 0000
0000 " download="Shapefile.zip">Exporter Shapefile</a></span>
													</span>
													<span class="menu-btn" style="width:50%;" id="Autre_format" >
														<span class="icons-btn"><i class="ifont Autre_format" ></i></span>
														<span class="name-btn">Export GeoJson</span>
													</span>
													<div class="group-name">Exportation</div>
												</div>
											</div>
											<!-- Select & Analyze -->
											<div class="tab-pane" id="tab_4">
													<div class="group-btn" style="width: 13%;" >
														<span class="menu-btn" style="width:33%;" id="pan4">
															<span class="icons-btn"><i class="ifont pan" ></i></span>
															<span class="name-btn">Pan</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="zoom_in4">
															<span  class="icons-btn">
																<i class="ifont zoom-out"></i>
															</span>
															<span class="name-btn">
															Zoomer</span>
														</span>
														<span class="menu-btn" style="width:33%;" id="zoom_out4">
															<span  class="icons-btn">
																<i class="ifont zoom-in" ></i>
															</span>
															<span class="name-btn">Dé-Zoomer</span>
														</span>
														<div class="group-name">Navigation</div>
													</div>
													
													<!-- Select Section -->
													<div class="group-btn" style="width: 15%;">
														<span class="menu-btn" style="width:25%;" id="select_point" >
															<span  class="icons-btn">
																<i class="ifont Identify-point" ></i>
															</span>
															<span class="name-btn">Point</span>
														</span>
														<span class="menu-btn" style="width:25%;" id="select_line">
															<span  class="icons-btn">
																<i class="ifont polyline_identify" ></i>
															</span>
															<span class="name-btn">Ligne</span>
														</span>
														<span class="menu-btn" style="width:25%;"  id="select_polygon">
															<span  class="icons-btn">
																<i class="ifont polygon_identify " ></i>
															</span>
															<span class="name-btn">Polygone</span>
														</span>
														<span class="menu-btn" style="width:25%;" id="select_rect">
															<span  class="icons-btn">
																<i class="ifont rectangle_identify" ></i>
															</span>
															<span class="name-btn"> Rectangle</span>
														</span>
														<div class="group-name">Outils de Sélection</div>
													</div>
													
													<!-- Coordinate tools -->
													<div class="group-btn" style="width: 12%;">
<!-- 														<span class="menu-btn" style="width:33%;opacity:0.4" id="interact">
															<span  class="icons-btn">
																<i class="ifont new grey" ></i>
															</span>
															<span class="name-btn">Profil d'élévation</span>
														</span> -->
														<span class="menu-btn" style="width:50%;" id="mesure_distance">
															<span  class="icons-btn">
																<i class="ifont distance grey" style="font-size:38px"></i>
															</span>
															<span class="name-btn">Distance</span>
														</span>
														<span class="menu-btn" style="width:50%;" id="mesure_area">
															<span  class="icons-btn">
																<i class="ifont area grey" style="font-size:38px;-webkit-text-stroke: 2px white;" ></i>
															</span>
															<span  class="name-btn">Surface</span>
														</span>
														<div class="group-name">Outils de Mesure</div>
													</div>

													<!-- Coordinate tools -->
													<div class="group-btn" style="width: 20%;">
													<table class="menu-table-3" style="text-align:left">
													<tr>
														<td colspan="3"><label class="name-btn-left">Information de mesure</label></td>
													</tr>
													<tr>
														<td style="width:25%"><label class="name-btn-left">Dernière</label></td>
														<td>
															<input id="mesure_value_totale" type="text" class="form-control" style="font-size:12px;height:25px;" value="0,00" size="2">
														</td>
														<!-- <td rowspan="3"> <div id="noimage"></div> </td> -->
													</tr>
													<tr>
														<td style="width:25%"><label class="name-btn-left">Totale</label></td>
														<td>
														<input id="mesure_value_last"  type="text" class="form-control" style="font-size:12px;height:25px;" value="0,00" size="2">
														</td>
														
													</tr>
													 </table>
														<div class="group-name">Information de mesure</div>
													</div>


													<!-- Reporting tools -->
													<div class="group-btn" style="width: 10%;">
<!-- 														<span class="menu-btn" style="width:33%;" >
															<a  class="icons-btn" id="filtre"  download="map.png" style="text-decoration: none;">
																<i class="ifont export-image" ></i>
																<span class="name-btn">Filtre</span>
															</a>
														</span> -->
														<span class="menu-btn" style="width:50%;" id="estimation">
															<span  class="icons-btn">
																<i class="ifont Query" ></i>
															</span>
															<span class="name-btn">Estimation</span>
														</span>
														<span class="menu-btn" style="width:50%;" id="rapport_btn">
															<span  class="icons-btn">
																<i class="ifont report" ></i>
															</span>
															<span class="name-btn">Rapport</span>	
														</span>
														<div class="group-name">Outils d'Estimation </div>
													</div>
											</div>
											<!-- Help -->
											<div class="tab-pane" id="tab_5">
											</div>
										</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row" id="grid-container">
						<div class="col-md-3" id="left-panel" style="padding-right: 0px">
							<div class="portlet box blue-chambray" style="background-color:white ">
								<div class="portlet-title" >
									<div class="caption" style="font-size: 14px;">
										<span id="sidebar_titre"><i class="ifont layers" style="color:#fff;font-size: 16px;margin-top: 2px"></i> Calques</span>
									</div>
									<div class="tools">
										<a  href="javascript:;" class="collapse">
										</a>
									</div>
								</div>
								<div class="portlet-body">
									<div class="tabbable-custom tabs-below nav-justified">
										<div class="tab-content" style="border: none;">
											<!-- Intro -->
											<div class="tab-pane active" id="intro_tab">
												<h4 class="text-center text-primary"><strong>UIT FONCIER</strong></h4>
												<h3 class="text-center">Bienvenue sur la Carte !</h3>
												 
												<p>Cliquez sur la carte pour commencer. Utilisez votre souris ou les outils de navigation prévus pour se déplacer sur la carte. Lorsque vous zoomez plus d'informations apparaîtra.</p>
												 
												<p>L'information est organisée dans des Couches.<p>
													
												<p>Rechercher des informations en utilisant la Recherche ... les boutons de recherche sur la barre d'outils ci-dessus. Pendant que vous recherchez et cliquez sur les informations, la carte affichera le résultat de ce que vous avez sélectionné.</p>
												 
												<p>Imprimer la carte au format PDF, exporter une image de carte, imprimer un rapport de colis ou de créer votre propre carte à partager. Cliquez sur les onglets de la barre d'outils ci-dessus pour explorer les outils disponibles.</p>  
												 
												<p>Il existe un certain nombre de façons d'interagir avec la carte. S'amuser! Vous pouvez retourner à l’état initiale à tout moment en cliquant sur le bouton d'actualisation de cette page. </p>
											</div>
											<!-- List Calque -->
											<div class="tab-pane" id="calques_tab">
												<div id="layertree" class="tree"></div>
											</div>
											<!-- Recherche -->
											<div class="tab-pane " id="recherche_tab">
												<div class="form-group" id="type_section">
													<label style="margin-bottom:15px;border-bottom:1px solid #eee;width:100%">Type de Bien recherché</label>
													<div class="checkbox-list">
														<label style="margin-bottom:10px"><input type="checkbox" checked="true" id="apprt_check"><span style="margin-left: 15px;"class="label label-warning">Appartement </span></label>
														<label style="margin-bottom:10px"><input type="checkbox" checked="true" id="villa_check"><span style="margin-left: 15px;"class="label label-success"> Villa </span></label>
														<label style="margin-bottom:10px"><input type="checkbox" checked="true" id="terrain_check"><span style="margin-left: 15px;"class="label label-danger">Terrain </span></label>
														<label style="margin-top:10px"><input type="checkbox" checked="true" id="maison_check"><span style="margin-left: 15px;"class="label label-primary">Maison </span></label>
													</div>
												</div>
												<div class="form-group" id="prix_section">
													<label class="control-label" style="margin-bottom:15px;border-bottom:1px solid #eee;width:100%">Prix</label>
													<input id="range_1" type="text" name="range_1" value=""/>
												</div>
												<div class="form-group" id="surface_section">
													<label class="control-label" style="margin-bottom:15px;border-bottom:1px solid #eee;width:100%">Surface Totale</label>
													<input id="range_2" type="text" name="range_2" value=""/>
												</div>
											</div>
											<!-- Résultat -->
											<div class="tab-pane" id="Resultat_tab" style="margin:0:padding:0">
												<div id="no_result">
													<h4 style="border-bottom:1px solid #E3E3E3;"> résultat (0) </h4>
													<h6>Aucun résultat </h6>
												</div>
												<div class="result" id="estimation_section" style="display:none">
													<h4> Le Résultat de l'estimation </h4>
														<table width="80%" style="border-collapse:separate; border-spacing:5px;">
															<tr>
																<td>Nature:</td>
																<td><span id="res_nature" style="margin-top:5px">  </span></td>
															</tr>
															<tr>
																<td>Surface :</td>
																<td><span id="res_surface" style="margin-top:5px">  </span></td>
															</tr>
															<tr>
																<td>Valeur Unitaire: </td>
																<td><span id="res_vu" style="margin-top:5px">  </span></td>
															</tr>
															<tr>
																<td>Valeur Vénale: </td>
																<td><span id="res_vv" style="margin-top:5px"> </span></td>
															</tr>
														</table>
												</div>
												<div id="selection_res" style="display:none">
													<div class="result">
														<h4> Le Résultat de la sélection </h4>
															<table width="80%" style="border-collapse:separate; border-spacing:5px;">
																<tr>
																	<td>Nature:</td>
																	<td><span id="res_nature" style="margin-top:5px">  </span></td>
																</tr>
																<tr>
																	<td>Surface :</td>
																	<td><span id="res_surface" style="margin-top:5px">  </span></td>
																</tr>
																<tr>
																	<td>Valeur Unitaire: </td>
																	<td><span id="res_vu" style="margin-top:5px">  </span></td>
																</tr>
																<tr>
																	<td>Valeur Vénale: </td>
																	<td><span id="res_vv" style="margin-top:5px"> </span></td>
																</tr>
															</table>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<ul class="nav nav-tabs nav-tabs-bottom nav-justified  ">
									<!-- Intro <Li> -->
									<li class="active">
										<a href="#intro_tab" data-toggle="tab">
										<!-- <i class="ifont layers" style="font-size: 16px;margin-right: 3px;"> --></i><strong>Introduction</strong></a>
									</li>
									<!-- List Calque <Li> -->
									<li>
										<a href="#calques_tab" data-toggle="tab">
										<i class="ifont layers" style="font-size: 16px;margin-right: 3px;"></i><strong>Calques</strong></a>
									</li>
									<!-- Recherche <Li> -->
									<li>
										<a href="#recherche_tab" data-toggle="tab">
										<i class="ifont query-result" style="font-size: 18px;margin-right: 3px;"></i><strong>Recherche</strong></a>
									</li>
									<!-- Résultat <Li> -->
									<li style="display:none">
										<a href="#Resultat_tab" data-toggle="tab">
										<i class="ifont query-result" style="font-size: 16px;margin-right: 3px;"></i><strong>Résultat</strong></a>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-md-9" style="padding-left: 0px">
							<div id="map" class="map"></div>
							<div id="scale_control" class="scale_control" style="">
								<span> Échelle :  1 / </span><span id="scale_control_val"></span>
							</div>

							<div id="popup" class="ol-popup">
								<a href="#" id="popup-closer" class="ol-popup-closer"></a>
								<div id="popup-content"></div>
							</div>
<!-- 							<div id="popup_coordinate" class="ol-popup">
								<a href="#" id="popup-coordinate-closer" class="ol-popup-closer"></a>
								<div id="popup-coordinate-content"></div>
							</div> -->
						
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="modal fade draggable-modal" id="draggable" tabindex="-1" role="basic" aria-hidden="true" style="top:50%;left:70%">
			<div class="modal-dialog" style="width:300px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Sélectionnez Une géométrie</h4>
					</div>
					<div class="modal-body">
						 <button type="button" class="btn blue">Point</button>
						 <button type="button" class="btn blue">Polygone</button>
						 <button type="button" class="btn blue">Ligne</button>
						 <button type="button" class="btn blue">Ligne</button>
						 <label>Background</label><input type="text" id="position-bottom-left" class="form-control demo" data-position="bottom left" value="#0088cc">
						 <label>Couleur de Border</label><input type="text" id="position-bottom-left" class="form-control demo" data-position="bottom left" value="#0088cc">
						 <label>Taille de Border</label><input type="text" id="position-bottom-left" class="form-control demo" data-position="bottom left" value="#0088cc">
					</div>
<!-- 					<div class="modal-footer">
						<button type="button" class="btn default" data-dismiss="modal">Close</button>
						<button type="button" class="btn blue">Save changes</button>
					</div> -->
				</div>
			</div>
		</div>

		<div class="modal fade" id="sucess_clear" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:500px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Information</h4>
					</div>
					<div class="modal-body">
							<span> Les données sont supprimé avec succès</span>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn blue"  data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>		
		
		<div class="modal fade" id="export_other" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:500px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Options d'enregistrement</h4>
					</div>
					<div class="modal-body">
						<div class="form-group" style="margin-bottom:35px;">
							<label class="col-md-4 control-label" style="margin-top:8px;"> Type de géométrie</label>
							<div class="col-md-8">
								<input type="text" class="form-control" placeholder="Ex : Polygon" name="">
							</div>
						</div>
						<div class="form-group" style="margin-bottom:35px;">
							<label class="col-md-4 control-label" style="margin-top:8px;"> Type de donnée</label>
							<div class="col-md-8">
								<input type="text" class="form-control" placeholder="Ex : MELILLA" name="">
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn blue" id="save_bookmark">Enregistrer</button>
						<button type="button" class="btn default" data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>		
		
		<div class="modal fade" id="add_bookmarks_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:500px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Nouveau Signet</h4>
					</div>
					<div class="modal-body">
						<div class="form-group" style="margin-bottom:35px;">
							<label class="col-md-4 control-label" style="margin-top:8px;"> Nom du signet</label>
							<div class="col-md-8">
								<input type="text" class="form-control" placeholder="Ex : MELILLA" name="" id="bookmarks-name">
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn blue" id="save_bookmarks">Enregistrer</button>
						<button type="button" class="btn default" data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>		

		<div class="modal fade" id="add_coordinate_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:600px">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Entrer les Coordonnées Manuellement</h4>
					</div>
					<div class="modal-body">
						<div class="row" style="margin-bottom:10px">
						<div class="form-group" >
							<label class="col-md-5 control-label" > Système de coordonnées</label>
							<div class="col-md-6">
								<select class="form-control select2me input-large" tabindex="1" id="" disabled>
									<option value="1">Défaut (EPSG:26191) </option>
									<option value="2">Mercator Web</option>
									<option value="3">Lat / Lon (DMS)</option>
									<option value="4">Lat / Lon (DD)</option>
								</select>
							</div>
						</div></div>
						<div class="row" style="margin-bottom:10px">
						<div class="form-group">
							<label class="col-md-5 control-label"">X :</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-large" placeholder="" name="" id="x_coord">
							</div>
						</div>
						</div>
						<div class="row" style="margin-bottom:10px">
						<div class="form-group">
							<label class="col-md-5 control-label"">Y :</label>
							<div class="col-md-6">
								<input type="text" class="form-control input-large" placeholder="" name="" id="y_coord">
							</div>
						</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn blue" id="add_coord">Ajouter</button>
						<button type="button" class="btn default" data-dismiss="modal">Terminer</button>
						<button type="button" class="btn default" data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>		
		<div class="modal fade" id="add_layer_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:500px">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Ajouter Shapefile</h4>
					</div>
					<div class="modal-body">
						<span style="margin-bottom:30px;display:block">Le fichier de forme va être projeter dans le système de de projection <br><strong> Merchich / Nord Maroc</strong></span>
						<div class="row" style="margin-bottom:25px">
						<div class="form-group">
							<label class="col-md-3 control-label" > Fichier</label>
							<div class="col-md-4">
								<input type="file" id="shape_file" name="image_upload">
							</div>
						</div></div>
<!-- 						<div class="row" style="margin-bottom:10px">
						<div class="form-group">
							<label class="col-md-3 control-label"">Nom :</label>
							<div class="col-md-4">
								<input type="text" class="form-control input-large" placeholder="" name="">
							</div>
						</div>
						</div> -->
<!-- 						<div class="row" style="margin-bottom:10px">
						<div class="form-group">
							<label class="col-md-3 control-label"">Projection :</label>
							<div class="col-md-4">
								<input type="text" class="form-control input-large" placeholder="" name="">
							</div>
						</div>
						</div> -->
					</div>
					<div class="modal-footer">
						<button type="button" class="btn default" data-dismiss="modal" id="submit_shape">Ajouter</button>
						<button type="button" class="btn default" data-dismiss="modal">Fermer</button>
					</div>
				</div>
			</div>
		</div>		
		<div class="modal fade" id="estimation_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="top:20%;left:20%">
			<div class="modal-dialog" style="width:600px">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
						<h4 class="modal-title">Entrer les informations du bien sélectionné</h4>
					</div>
					<div class="modal-body">
						<div class="row" style="margin-bottom:10px">
							<div class="form-group" style="margin-bottom:4px">
								<label class="col-md-5 control-label" > Consistance</label>
								<div class="col-md-6">
									<select class="form-control select2me input-large" id="consitance_x" tabindex="1">
										<option value="1">Terrain</option>
										<option value="2">Villa</option>
										<option value="3">Appartement</option>
										<option value="4">Maison</option>
									</select>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="form-group" style="margin-top:10px">
								<label class="col-md-5 control-label" > Nombre d'étages</label>
								<div class="col-md-6">
									<select class="form-control select2me input-large" id="nbre_etage" tabindex="1">
										<option value="1">RDC</option>
										<option value="2">R+1</option>
										<option value="3">R+2</option>
										<option value="4">R+3</option>
										<option value="5">R+4</option>
										<option value="6">R+5</option>
									</select>
								</div>
							</div>
						</div>
<!-- 						<div class="row">
							<div class="form-group" style="margin-top:10px">
								<label class="col-md-5 control-label" > Nombre de pièces</label>
								<div class="col-md-6">
									<select class="form-control select2me input-large" id="nbre_etage" tabindex="1">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
									</select>
								</div>
							</div>
						</div> -->
						<div class="row" style="margin-top:10px">
							<div class="form-group">
								<label class="col-md-5 control-label"">Rayon :</label>
								<div class="col-md-6">
									<input type="text" class="form-control input-large" placeholder="" name="" id="rayon" value="250">
								</div>
							</div>
						</div>
						<div class="row" style="margin-top:10px">
							<div class="form-group">
								<label class="col-md-5 control-label"">Surface :</label>
								<div class="col-md-6">
									<input type="text" class="form-control input-large" placeholder="" name="" id="surface" value="100">
								</div>
							</div>
						</div>
					<div class="modal-footer">
						<button type="button" class="btn blue" id="calc_estime">Calculer</button>
						<button type="button" class="btn default" data-dismiss="modal">Annuler</button>
					</div>
				</div>
			</div>
		</div>		