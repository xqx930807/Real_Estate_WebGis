<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Bien : Model
*  Authors : { Ahmed El Atari
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Bien extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct(){ 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get bien 
	function id_bien($id) {
		$this->db->select('id_bien');
		$query = $this->db->get_where('bien', array('id_bien' => $id));
		$data = $query->result();
		return $data[0];
	}


	// Get bien 
	function last() {
		$query = $this->db->query("SELECT id_bien FROM bien ORDER BY id_bien DESC LIMIT 1");
		$data = $query->result();
		return $data[0]->id_bien;
	}



	// Get "Nom bien" 
	function adresse_bien($id) {
		$this->db->select('adresse_bien');
		$query = $this->db->get_where('bien', array('adresse_bien' => $id));
		$data = $query->result();
		return $data[0]->adresse_bien;
	}

	// Get "Consitance" 
	function consistance_bien($id) {
		$this->db->select('consistance_bien');
		$query = $this->db->get_where('bien', array('id_bien' => $id));
		$data = $query->result();
		return $data[0]->consistance_bien;
	}

	// Get "Surface" 
	function surface_totale($id) {
		$this->db->select('surface_totale');
		$query = $this->db->get_where('bien', array('id_bien' => $id));
		$data = $query->result();
		return $data[0]->surface_totale;
	}

	// Get "Position" 
	function pos_bien($id) {
		$this->db->select('pos_bien');
		$query = $this->db->get_where('bien', array('pos_bien' => $id));
		$data = $query->result();
		return $data[0]->pos_bien;
	}

	// Get "Valeur Unitaire" 
	function valeur_unitaire($id) {
		$this->db->select('valeur_unitaire');
		$query = $this->db->get_where('bien', array('valeur_unitaire' => $id));
		$data = $query->result();
		return $data[0]->valeur_unitaire;
	}

	// Get "Surface Construite" 
	function surface_construite($id) {
		$this->db->select('surface_construite');
		$query = $this->db->get_where('bien', array('surface_construite' => $id));
		$data = $query->result();
		return $data[0]->surface_construite;
	}

	// Get "Act de vente " 
	function fichier_act($id) {
		$this->db->select('fichier_act');
		$query = $this->db->get_where('bien', array('fichier_act' => $id));
		$data = $query->result();
		return $data[0]->fichier_act;
	}

	// Get "Nombre de Etage" 
	function nbre_etage($id) {
		$this->db->select('nbre_etage');
		$query = $this->db->get_where('bien', array('nbre_etage' => $id));
		$data = $query->result();
		return $data[0]->nbre_etage;
	}


	// Get "Valeur Vénale " 
	function valeur_venale($id) {
		$this->db->select('valeur_venale');
		$query = $this->db->get_where('bien', array('valeur_venale' => $id));
		$data = $query->result();
		return $data[0]->valeur_venale;
	}

	// Get "Image du Bien " 
	function image_bien($id) {
		$this->db->select('image_bien');
		$query = $this->db->get_where('bien', array('image_bien' => $id));
		$data = $query->result();
		return $data[0]->image_bien;
	}

	// Get All by bien ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('bien');
		$query = $this->db->get(); 
		return $query->result_array();
	}

//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('bien', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}

	function update($id,$data) {
		$this->db->update('bien', $data, array('id_bien' => $id));
	}

	// Delete `bien `
	function delete($id) {
		$this->db->delete('bien',array('id_bien' => $id));
	}


}
?>