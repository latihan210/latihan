<?php
defined('BASEPATH') or exit('No direct script access allowed');

class User_model extends CI_Model
{
    public function getByEmail($email)
    {
        return $this->db->get_where('users', ['email' => $email])->row();
    }

    public function insert($data)
    {
        return $this->db->insert('users', $data);
    }
}