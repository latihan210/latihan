<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Admin_Controller extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->helper('auth');
        if (! is_admin()) {
            // redirect non-admins
            $this->session->set_flashdata('error', 'Anda tidak memiliki akses.');
            redirect(base_url('dashboard'));
            exit;
        }
    }
}
