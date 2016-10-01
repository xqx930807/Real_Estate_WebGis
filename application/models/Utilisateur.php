<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Utilisateur : Model
*  Authors : { Ahmed El Atari }
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Utilisateur extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct() { 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get utilisateur by utilisateur_ID
	function id_utilisateur($id) {
		$this->db->select('id_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->id_utilisateur;
	}

	// Get "Nom utilisateur" by utilisateur_ID
	function nom_utilisateur($id) {
		$this->db->select('nom_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		if($query->num_rows() != 0) return $data[0]->nom_utilisateur;
	}

	// Get "email_utilisateur" by utilisateur_ID
	function email_utilisateur($id) {
		$this->db->select('email_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->email_utilisateur;
	}

	// Get "Ville" by utilisateur_ID
	function prenom_utilisateur($id) {
		$this->db->select('prenom_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->prenom_utilisateur;
	}
	// Get "Ville" by utilisateur_ID
	function pass_utilisateur($id) {
		$this->db->select('pass_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->pass_utilisateur;
	}
	// Get "Ville" by utilisateur_ID
	function image_utilisateur($id) {
		$this->db->select('image_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->image_utilisateur;
	}
	
	// Get "Ville" by utilisateur_ID
	function etat_utilisateur($id) {
		$this->db->select('etat_utilisateur');
		$query = $this->db->get_where('utilisateur', array('id_utilisateur' => $id));
		$data = $query->result();
		return $data[0]->etat_utilisateur;
	}

	// GET All `utilisateur` Info By ID
	function id($login, $pw) {
		$this->db->select('id_utilisateur');
		$this->db->where('login_utilisateur', $login);
		$this->db->where('pass_utilisateur', $pw);
		$query = $this->db->get('utilisateur');
		$data = $query->result();
		$row = $query->row();
		return $row->id_utilisateur;
	}


	// Get All by utilisateur ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('utilisateur');
		$query = $this->db->get(); 
		return $query->result_array();
	}

	// Check `utilisateur ` Login & Pass
	public function check_authentificate($login, $password) {
		$this->db->where('login_utilisateur', $login);
		$this->db->where('pass_utilisateur', $password);
		$query = $this->db->get('utilisateur'); 
		if ($query->num_rows() === 0) return true;
		return false;
	}


//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('utilisateur', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}

	function update($id,$data) {
		$this->db->update('utilisateur', $data, array('id_utilisateur' => $id));
	}

	// Delete `utilisateur `
	function delete($id) {
		$this->db->delete('utilisateur',array('id_utilisateur' => $id));
	}


}
?>