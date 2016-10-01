		<!--  HEADER -->
		<div class="page-header navbar navbar-fixed-top">
			<div class="page-header-inner">
				<!--  LOGO -->
				<div class="page-logo">
					<a href="index.html">
						<img src="<?php echo base_url(); ?>assets/admin/layout/img/logo.png" alt="logo" class="logo-default" style="margin:5px 0 0 0;"/>
					</a>
					<div class="menu-toggler sidebar-toggler hide">
					</div>
				</div>
				<!--  RESPONSIVE MENU TOGGLER -->
				<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
				</a>
				<!--  TOP NAVIGATION MENU -->
				<div class="top-menu">
					<ul class="nav navbar-nav pull-right">
						<!-- NOTIFICATION DROPDOWN -->
<!-- 						<li class="dropdown dropdown-extended dropdown-dark dropdown-notification" id="header_notification_bar">
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<i class="icon-bell"></i>
							<span class="badge badge-default">
							1 </span>
							</a>
							<ul class="dropdown-menu">
								<li class="external">
									<h3><span class="bold">12 pending</span> notifications</h3>
									<a href="extra_profile.html">view all</a>
								</li>
								<li>
									<ul class="dropdown-menu-list scroller" style="height: 250px;" data-handle-color="#637283">
										<li>
											<a href="javascript:;">
											<span class="time">just now</span>
											<span class="details">
											<span class="label label-sm label-icon label-success">
											<i class="fa fa-plus"></i>
											</span>
											New user registered. </span>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li> -->
						<!--  USER LOGIN DROPDOWN -->
						<li class="dropdown dropdown-user">
							<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
							<img alt="" class="img-circle" src="<?php echo base_url(); ?>assets/admin/layout/img/avatar3_small.jpg"/>
							<span class="username username-hide-on-mobile"><?php echo $this->session->userdata('nom_user') ;?><?php echo $this->session->userdata('prenom_user') ; ?></span>
							<i class="fa fa-angle-down"></i>
							</a>
							<ul class="dropdown-menu dropdown-menu-default">
								<li>
									<a href="extra_profile.html">
									<i class="icon-user"></i> Mon Profil</a>
								</li>
<!-- 								<li>
									<a href="extra_lock.html">
									<i class="icon-lock"></i> Verrouiller L’écran </a>
								</li> -->
								<li>
									<a href="deconnection">
									<i class="icon-key"></i> Se déconnecter </a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>