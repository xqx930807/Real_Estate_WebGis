<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pages extends CI_Controller {
	// Constructer
	function __construct(){
		parent::__construct();
		$this->output->set_header('Access-Control-Allow-Origin: *');
		// Load Models
		$this->load->model('Bien');
		$this->load->model('Log');
		$this->load->model('Parametre');
		$this->load->model('Role');
		$this->load->model('Utilisateur');
		$this->load->model('Bookmarks');
	}



	/**-------  Login  ---------**/
		public function index(){
			$this->load->view('pages/login');
		}

		public function cnx(){
			$login=$this->input->post('login');
			$pwd=$this->input->post('pass');
			// Data Validation
			if(!$this->Utilisateur->check_authentificate($login,$pwd)){
				$id_user = $this->Utilisateur->id($login,$pwd);
				// Load Data to the session
				$data['idSession']=$this->Utilisateur->id($login,$pwd);
				$data['nom_user']=$this->Utilisateur->nom_utilisateur($id_user);
				$data['prenom_user']=$this->Utilisateur->prenom_utilisateur($id_user);
				$this->session->set_userdata($data);
				// Redirection
				redirect('pages/loading');
			}
			else{
				$this->session->set_flashdata('loginmsg', 1);
				redirect('pages');
			}
		}

		public function deconnection(){
			$this->session->sess_destroy();
			redirect('pages');
		}

	/**-------  Loading  ---------**/
		public function loading(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}

			$this->load->view('pages/loading');
		}

	/**-------  Map  ---------**/
		public function map(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
			$data['page'] = 'map';
			$data['titre'] = 'Carte Vénale';
			$this->load->view('template/header',$data);
			$this->load->view('template/navbar');
			$this->load->view('template/sidebar');
			$this->load->view('pages/map');
			$this->load->view('template/footer',$data);
		}

	/**-------  Bien  ---------**/
		public function add_bien(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
			$data['page'] = 'add_bien';
			$data['titre'] = 'AJOUTER UN BIEN';
			$this->load->view('template/header',$data);
			$this->load->view('template/navbar');
			$this->load->view('template/sidebar');
			$this->load->view('pages/bien');
			$this->load->view('template/footer',$data);
		}

		public function edit_bien(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
			$data['page'] = 'edit_bien';
			$data['titre'] = 'Modifier/ Supprimer Un Bien';
			$this->load->view('template/header',$data);
			$this->load->view('template/navbar');
			$this->load->view('template/sidebar');
			$this->load->view('pages/edit_bien');
			$this->load->view('template/footer',$data);
		}

		public function load_bien(){
			$bien=$this->Bien->getAll();
			echo json_encode($bien);
		}
		public function save_bien(){
			$id_bien=$this->input->post('id_bien');
			$titre=$this->input->post('titre');
			$adresse=$this->input->post('adresse');
			$consistance=$this->input->post('consistance');
			$surface_totale=$this->input->post('surface_totale');
			$valeur_venale=$this->input->post('valeur_venale');
			$surface_construite=$this->input->post('surface_construite');
			$nbre_etage=$this->input->post('nbre_etage');
			$data = array(
				'titre' => $titre ,
				'adresse' => $adresse ,
				'consistance' => $consistance ,
				'surface_totale' => $surface_totale ,
				'valeur_venale' => $valeur_venale,
				'nbre_etage' => $nbre_etage,
				'surface_construite' => $surface_construite
			);
			// echo json_encode($data).$id_bien;
			$this->Bien->update($id_bien,$data);
		}

		public function delete_bien(){
			$id_bien=$this->input->post('id_bien');
			$this->Bien->delete($id_bien);
		}

		public function upload_file(){
			$status = "";
			$msg = "";
			$file_element_name = 'image_upload';
			$titre=$this->input->post('titre');
			$file=$this->input->post('file');
			$adresse=$this->input->post('adresse');
			$consistance=$this->input->post('consistance');
			$surface_totale=$this->input->post('surface_totale');
			$valeur_venale=$this->input->post('valeur_venale');
			$surface_construite=$this->input->post('surface_construite');
			$nbre_etage=$this->input->post('nbre_etage');
			$geometrie=$this->input->post('geometrie');
			$nature=$this->input->post('nature');


			if ($status != "error"){
				$config['upload_path'] = 'upload/';
				$config['allowed_types'] = 'gif|jpg|png|doc|txt';
				$config['max_size'] = 1024 * 8;
				$config['encrypt_name'] = FALSE;
				$config['file_name'] = $this->Bien->last() + 1;
				// echo $this->Bien->last();

				$this->load->library('upload', $config);
				$this->upload->initialize($config);
				if (!$this->upload->do_upload($file_element_name)){
					$status = 'error';
					$msg = $this->upload->display_errors('', '');
				}else{
					$data = $this->upload->data();
					$image_path = $data['full_path'];
					echo $image_path;
					$data = array(
						'titre' => $titre ,
						'adresse' => $adresse ,
						'consistance' => $consistance ,
						'surface_totale' => $surface_totale ,
						'valeur_venale' => $valeur_venale,
						'nbre_etage' => $nbre_etage,
						'geometrie' => $geometrie,
						'surface_construite' => $surface_construite,
						'image_path'=> $image_path,
						'nature'=> $nature
					);
					if(file_exists($image_path)){
						//Insert Data
						$insert_id=$this->Bien->insert($data);
						$status = "success";
						$msg = "File successfully uploaded";
					}else{
						$status = "error";
						$msg = "Something went wrong when saving the file, please try again.";
					}
				}
				@unlink($_FILES[$file_element_name]);
			}
			echo json_encode(array('status' => $status, 'msg' => $msg));
		}

	/**-------  User  ---------**/
		public function user(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
			$data['page'] = 'user';
			$data['titre'] = 'Modifier/ Supprimer Un Utilisateur';
			$this->load->view('template/header',$data);
			$this->load->view('template/navbar');
			$this->load->view('template/sidebar');
			$this->load->view('pages/user');
			$this->load->view('template/footer',$data);
		}
		public function load_user(){
			$user=$this->Utilisateur->getAll();
			echo json_encode($user);
		}
	
	/**-------  Config  ---------**/
		public function config(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
		}

	/**-------  Logs  ---------**/
		public function log(){
			if (!$this->session->userdata('idSession')){
				redirect('pages');
			}
			$data['titre'] = 'Historique';
			$data['page'] = 'log';
			$this->load->view('template/header',$data);
			$this->load->view('template/navbar');
			$this->load->view('template/sidebar');
			$this->load->view('pages/log');
			$this->load->view('template/footer',$data);
		}

		public function load_logs(){
			$logs=$this->Log->getAll();
			echo json_encode($logs);
		}

	/**-------  Bookmarks  ---------**/
		public function get_bookmarks(){
			$bookmarks=$this->Bookmarks->getAll();
			echo json_encode($bookmarks);
		}

		public function add_bookmarks(){
			$nom_bookmarks=$this->input->post('nom_bookmarks');
			$extent_bookmarks=$this->input->post('extent_bookmarks');

			// Build Data Array
			$data = array(
				'nom_bookmarks' => $nom_bookmarks ,
				'extent_bookmarks' => $extent_bookmarks
			);

			// //Insert Data
			$insert_id=$this->Bookmarks->insert($data);
		}





}

?>