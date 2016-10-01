<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Bien : Model
*  Authors : { Ahmed El Atari
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Parametre extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct() 
	{ 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get parametre by parametre_ID
	function id_parametre($id) {
		$this->db->select('id_parametre');
		$query = $this->db->get_where('parametre', array('id_parametre' => $id));
		$data = $query->result();
		return $data[0];
	}

	// Get "Nom parametre" by parametre_ID
	function nom_parametre($id) {
		$this->db->select('nom_parametre');
		$query = $this->db->get_where('parametre', array('id_parametre' => $id));
		$data = $query->result();
		return $data[0]->nom_parametre;
	}

	// Get "Region" by parametre_ID
	function valeur_parametre($id) {
		$this->db->select('valeur_parametre');
		$query = $this->db->get_where('parametre', array('id_parametre' => $id));
		$data = $query->result();
		return $data[0]->valeur_parametre;
	}

	
	// Get All by parametre ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('parametre');
		$query = $this->db->get(); 
		return $query->result_array();
	}

//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('parametre', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}

	function update($id,$data) {
		$this->db->update('parametre', $data, array('id_parametre' => $id));
	}

	// Delete `parametre `
	function delete($id) {
		$this->db->delete('parametre',array('id_parametre' => $id));
	}


}
?>