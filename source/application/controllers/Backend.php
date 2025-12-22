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
        // load auth helper to get role info for menu separation
        $this->load->helper('auth');
    }

    public function dashboard()
    {
        $data['title'] = TITLE . 'Dashboard';

        // Use a single dashboard view. Menu and content are adjusted by view/helpers using session role info.
        $data['main_content'] = 'dashboard';
        // Provide member object expected by templates (keep templates unchanged)
        $member_name = $this->session->userdata('member_name') ?: $this->session->userdata('user_name');
        $member_username = $this->session->userdata('user_name') ?: strtolower($member_name);
        $data['member'] = (object) [
            'name' => $member_name,
            'username' => $member_username,
            'type' => defined('MEMBER') ? MEMBER : 'member',
            'as_stockist' => $this->session->userdata('as_stockist') ?: 0
        ];
        $data['is_admin'] = (function_exists('is_admin') && is_admin());

        $this->load->view('partials/template', $data);
    }
}
