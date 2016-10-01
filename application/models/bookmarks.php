<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Bien : Model
*  Authors : { Ahmed El Atari
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Bookmarks extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct() 
	{ 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get bookmarks by bookmarks_ID
	function id_bookmarks($id) {
		$this->db->select('id_bookmarks');
		$query = $this->db->get_where('bookmarks', array('id_bookmarks' => $id));
		$data = $query->result();
		return $data[0];
	}

	// Get "nom_bookmarks" by bookmarks_ID
	function nom_bookmarks($id) {
		$this->db->select('nom_bookmarks');
		$query = $this->db->get_where('bookmarks', array('id_bookmarks' => $id));
		$data = $query->result();
		return $data[0]->nom_bookmarks;
	}

	// Get "Region" by bookmarks_ID
	function extent_bookmarks($id) {
		$this->db->select('extent_bookmarks');
		$query = $this->db->get_where('bookmarks', array('id_bookmarks' => $id));
		$data = $query->result();
		return $data[0]->extent_bookmarks;
	}
	
	// Get All by bookmarks ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('bookmarks');
		$query = $this->db->get(); 
		return $query->result_array();
	}

//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('bookmarks', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}



}
?>