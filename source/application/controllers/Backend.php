<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Backend extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();

        if (!$this->session->userdata('logged_in')) {
            redirect('login');
        }
    }

    public function dashboard()
    {
        $data['title'] = TITLE . 'Dashboard';
        $data['main_content'] = 'dashboard';
        $this->load->view('partials/template', $data);
    }
}