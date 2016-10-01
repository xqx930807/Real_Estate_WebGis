
			<div class="page-content-wrapper">
				<div class="page-content">
					<h3 class="page-title">
					Ajouter un bien 
					<small> Acte de propriété</small>
					</h3>
					<div class="row">
						<div class="col-md-6">
							<div class="portlet box blue-chambray ">
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-table"></i> Données Attributaires
									</div>
									<div class="tools">
										<a href="" class="collapse">
										</a>
										<a href="" class="remove">
										</a>
									</div>
								</div>
								<div class="portlet-body form">
									<form class="form-horizontal" role="form" method="post" action="add" id="form1">
										<div class="form-body">
											<div class="form-group">
												<label class="col-md-3 control-label">Nature Juridique</label>
												<div class="radio-list">
													<label class="col-md-3 control-label">
													<input type="radio" name="optionsRadios" id="non_im" value="option1" checked> Non immatriculé </label>
													<label class="col-md-2 control-label">
													<input type="radio" name="optionsRadios" id="req" value="option2"> Réquisition </label>
													<label class="col-md-2 control-label">
													<input type="radio" name="optionsRadios" id="titre_radio" value="option3"> Titre foncier </label>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label" id="titre_label"> Titre foncier</label>
												<div class="col-md-6">
													<input type="text" class="form-control" placeholder="Ex : T/1806" id="titre" disabled="">
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">Adresse</label>
												<div class="col-md-6">
													<textarea class="form-control" rows="3" id="adresse" placeholder="Ex :  حي الكندي، الناظور 62010" ></textarea>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">Consistance</label>
												<div class="col-md-9">
														<select class="form-control select2me input-large" id="consistance" tabindex="1">
															<option value="1">Terrain</option>
															<option value="2">Maison</option>
															<option value="3">Villa</option>
															<option value="4">Appartement</option>
														</select>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label" id="etage_titre">Nombre d'étage</label>
												<div class="col-md-9">
														<select class="form-control select2me input-large" id="nbre_etage" tabindex="1" disabled="true">
															<option value="">RDC</option>
															<option value="4">R+1</option>
															<option value="10">R+2</option>
															<option value="10">R+3</option>
															<option value="10">R+4</option>
															<option value="10">R+5</option>
															<option value="10">R+6</option>
															<option value="10">R+7</option>
															<option value="10">R+8</option>
															<option value="10">R+9</option>
															<option value="10">R+10</option>
															<option value="10">R+11</option>
															<option value="10">R+12</option>
															<option value="10">R+13</option>
															<option value="10">R+14</option>
														</select>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">Surface Totale</label>
												<div class="col-md-9">
													<input type="text" class="form-control input-inline input-large" placeholder=" Ex : 200 m²" id="surface_totale">
													<span class="help-inline">m². </span>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">Surface Construite</label>
												<div class="col-md-9">
													<input type="text" class="form-control input-inline input-large" placeholder="Ex : 150 m²" id="surface_construite">
													<span class="help-inline">m². </span>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">Valeur Vénale</label>
												<div class="col-md-9">
													<input type="text" class="form-control input-inline input-large" placeholder="Ex : 450000 dh" id="valeur_venale">
													<span class="help-inline">DH. </span>
												</div>
											</div>
											<div class="form-group">
												<div class="col-md-8 col-md-offset-2">
												<div class="thumbnail">
												<img id="preview" data-src="holder.js/100%x200" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNjQiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMzY0IiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjE4MiIgeT0iMTAwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjIzcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+MzY0eDIwMDwvdGV4dD48L3N2Zz4=" alt="100%x200" style="width: 60%; height: 200px; display: block;">
												</div>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3  control-label">Image du Bien</label>
												<div class="col-md-9">
													<input type="file" id="image_upload" name="image_upload">
												</div>
											</div>
<!-- 											<div class="form-group">
												<label for="exampleInputFile" class="col-md-3 control-label">Acte de propriété</label>
												<div class="col-md-9">
													<input type="file" id="file_upload" name="file_upload">
												</div>
											</div> -->

										</div>
										<div class="form-actions">
											<div class="row">
												<div class="col-md-offset-3 col-md-9">
													<button type="button" class="btn green" id="send_data">Envoyer</button>
													<button type="button" class="btn default">Annuler</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-md-6">
							<div class="portlet box blue-chambray ">
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-map-marker"></i> Situation du Bien
									</div>
									<div class="tools">
										<a href="" class="collapse">
										</a>
										<a href="" class="remove">
										</a>
									</div>
								</div>
								<div class="portlet-body form">
									<form class="form-horizontal" role="form" method="post" action="add">
										<div class="form-body" id="ok">
											<div class="form-group" id="field1">
												<label class="col-md-3 control-label">Coordonnée (X,Y)</label>
												<div class="col-md-9">
													<input value="" id="coord_x" type="text" class="form-control input-inline input-medium" placeholder="Ex : 251.65" name="position">
													<input value="" id="coord_y" type="text" class="form-control input-inline input-medium" placeholder="Ex : 251.65" name="position">
												</div>
											</div>
											<div class="form-group" id="field2">
												<label class="col-md-3 control-label">Coordonnée (X,Y)</label>
												<div class="col-md-9">
													<input value=""id="coord_x" type="text" class="form-control input-inline input-medium" placeholder="Ex : 251.65" name="position">
													<input value="" id="coord_y" type="text" class="form-control input-inline input-medium" placeholder="Ex : 251.65" name="position">
												</div>
											</div>
											<div class="form-group" id="field3">
												<label class="col-md-3 control-label">Coordonnée (X,Y)</label>
												<div class="col-md-9">
													<input value=""id="coord_x" type="text" class="form-control input-inline input-medium" placeholder="Ex: 2621.23" name="position">
													<input value="" id="coord_y" type="text" class="form-control input-inline input-medium" placeholder="Ex: 2621.23" name="position">
												</div>
											</div>

										</div>
										<div class="form-actions">
											<div class="row">
												<div class="col-md-offset-3 col-md-9">
													<button type="button" class="btn green" id="dessiner"><i class="icon-map"></i>  Ajouter</button>
													<button type="button" class="btn blue-chambray" id="creer_champ"><i class="fa fa-plus"></i> Ajouter un Vertex</button>
													<button type="button" class="btn blue-chambray" id="clear"><i class="fa fa-eraser"></i> Vider</button>
													<button type="button" class="btn blue-chambray" id="draw_polygon"><i class="fa fa-pencil"></i> Dessiner</button>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
							<div class="portlet box blue-chambray ">
								<div class="portlet-title">
									<div class="caption">
										<i class="fa fa-pencil"></i> Position du Bien sur la carte
									</div>
									<div class="tools">
										<a href="" class="collapse">
										</a>
										<a href="" class="remove">
										</a>
									</div>
								</div>
								<div class="portlet-body form">
									<form class="form-horizontal" role="form">
										<div class="form-body">
										<div id="map"></div>
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

