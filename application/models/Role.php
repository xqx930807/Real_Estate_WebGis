<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Role : Model
*  Authors : { Ahmed El Atari
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Role extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct() 
	{ 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get role by role_ID
	function id_role($id) {
		$this->db->select('id_role');
		$query = $this->db->get_where('role', array('id_role' => $id));
		$data = $query->result();
		return $data[0];
	}

	// Get "Nom role" by role_ID
	function nom_role($id) {
		$this->db->select('nom_role');
		$query = $this->db->get_where('role', array('id_role' => $id));
		$data = $query->result();
		return $data[0]->nom_role;
	}

	// Get All by role ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('role');
		$query = $this->db->get(); 
		return $query->result_array();
	}

//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('role', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}

	function update($id,$data) {
		$this->db->update('role', $data, array('id_role' => $id));
	}

	// Delete `role `
	function delete($id) {
		$this->db->delete('role',array('id_role' => $id));
	}


}
?>