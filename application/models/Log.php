<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
*  Bien : Model
*  Authors : { Ahmed El Atari
*  Contact Us : Elatari.Ahmed@gmail.com
*/

class Log extends CI_Model {

//----------------------- Constructor--------------------------//
	function __construct() 
	{ 
		parent::__construct(); 
	}

//------------------------ Getter'Z ------------------------//
	// Get log by log_ID
	function id_log($id) {
		$this->db->select('id_log');
		$query = $this->db->get_where('log', array('id_log' => $id));
		$data = $query->result();
		return $data[0];
	}

	// Get "type_log" by log_ID
	function type_log($id) {
		$this->db->select('type_log');
		$query = $this->db->get_where('log', array('id_log' => $id));
		$data = $query->result();
		return $data[0]->type_log;
	}

	// Get "Region" by log_ID
	function text_log($id) {
		$this->db->select('text_log');
		$query = $this->db->get_where('log', array('id_log' => $id));
		$data = $query->result();
		return $data[0]->text_log;
	}

	// Get "Ville" by log_ID
	function date_time($id) {
		$this->db->select('date_time');
		$query = $this->db->get_where('log', array('id_log' => $id));
		$data = $query->result();
		return $data[0]->date_time;
	}
	
	// Get All by log ID
	function getAll() {
		$this->db->select('*',false);
		$this->db->from('log');
		$query = $this->db->get(); 
		return $query->result_array();
	}

//------------------------------------- Create , Delete & Update -------------------//
	function insert($data) {
		$this->db->insert('log', $data); 
		$insert_id = $this->db->insert_id(); 
		return  $insert_id;
	}

	function update($id,$data) {
		$this->db->update('log', $data, array('id_log' => $id));
	}

	// Delete `log `
	function delete($id) {
		$this->db->delete('log',array('id_log' => $id));
	}


}
?>