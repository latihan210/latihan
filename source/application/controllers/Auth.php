<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model', 'user');
		$this->load->library('form_validation');
	}

	public function index()
	{
		redirect(base_url('login'));
	}

	public function login()
	{
		if ($this->session->userdata('user_id')) {
			redirect(base_url('backend'));
		}

		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		$this->form_validation->set_rules('password', 'Password', 'required');

		if ($this->form_validation->run() == FALSE) {
			$data['title'] = TITLE . 'Login';
			$data['main_content'] = 'login';
			$this->load->view('partials/template', $data);
		} else {
			$this->validate();
		}
	}

	public function logout()
	{
		$this->session->sess_destroy();
		redirect(base_url('login'));
	}

	public function validate()
	{
		$email = $this->input->post('email');
		$password = $this->input->post('password');

		$user = $this->user->getByEmail($email);

		if (!$user) {
			$this->session->set_flashdata('error', 'Email tidak terdaftar');
			redirect(base_url('login'));
			return;
		}

		if (!password_verify($password, $user->password)) {
			$this->session->set_flashdata('error', 'Password salah');
			redirect(base_url('login'));
			return;
		}

		if ($user->is_active != 1) {
			$this->session->set_flashdata('error', 'Akun tidak aktif');
			redirect(base_url('login'));
			return;
		}

		$session = [
			'user_id' => $user->id,
			'user_name' => $user->name,
			'member_name' => isset($user->name) ? $user->name : '',
			'logged_in' => true
		];

		$this->session->set_userdata($session);
		redirect(base_url('dashboard'));
	}

	public function register()
	{
		$this->form_validation->set_rules('name', 'Name', 'required');
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email|is_unique[users.email]');
		$this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');

		if ($this->form_validation->run() == FALSE) {
			$data['title'] = TITLE . 'Register';
			$data['main_content'] = 'register';
			$this->load->view('partials/template', $data);
		} else {
			$data = [
				'name' => htmlspecialchars($this->input->post('name', true)),
				'email' => htmlspecialchars($this->input->post('email', true)),
				'password' => password_hash($this->input->post('password'), PASSWORD_DEFAULT),
				'is_active' => 1
			];

			$this->user->insert($data);
			$this->session->set_flashdata('success', 'Registrasi berhasil, silakan login.');
			redirect(base_url('login'));
		}
	}

	public function forgetpassword()
	{
		// Implementasi sederhana, bisa dikembangkan sesuai kebutuhan
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		if ($this->form_validation->run() == FALSE) {
			$data['title'] = TITLE . 'Forget Password';
			$data['main_content'] = 'forgetpassword';
			$this->load->view('partials/template', $data);
		} else {
			// Proses reset password, misal kirim email
			$this->session->set_flashdata('success', 'Instruksi reset password telah dikirim ke email Anda.');
			redirect(base_url('login'));
		}
	}
}
