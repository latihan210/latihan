<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model', 'user');
		$this->load->library('form_validation');
		$this->load->helper('auth');
	}

	public function index()
	{
		redirect(base_url('login'));
	}

	public function login()
	{
		if ($this->session->userdata('user_id')) {
			redirect(base_url('dashboard'));
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
		$is_ajax = $this->input->is_ajax_request();
		$token = $this->security->get_csrf_hash();

		$send_json = function ($success, $msg, $extra = []) use ($token) {
			$response = array_merge([
				'success' => $success,
				'msg' => $msg,
				'token' => $token
			], $extra);
			$this->output->set_content_type('application/json')->set_output(json_encode($response));
			return;
		};

		// Use DB-backed login attempts (login_attempts table)
		$ip = $this->input->ip_address();
		// load user agent library for logging
		$this->load->library('user_agent');
		$ua = $this->agent->agent_string();
		$attemptRow = $this->user->getLoginAttempt($ip, $email);
		$attempts = $attemptRow ? (int) $attemptRow->attempts : 0;
		$locked_until = $attemptRow ? (int) $attemptRow->locked_until : null;
		if ($locked_until && time() < $locked_until) {
			$remaining = $locked_until - time();
			$msg = 'Terlalu banyak percobaan login. Coba lagi setelah ' . ceil($remaining / 60) . ' menit.';
			if ($is_ajax) return $send_json(false, $msg);
			$this->session->set_flashdata('error', $msg);
			redirect(base_url('login'));
			return;
		}

		$user = $this->user->getByEmail($email);

		if (!$user) {
			// Increment failed attempts (DB) - logged to DB only to avoid noisy file logs
			$locked = null;
			$attempts_new = $attempts + 1;
			if ($attempts_new >= 5) {
				$locked = time() + 300; // 5 minutes
			}
			$this->user->upsertLoginAttempt($ip, $email, 1, $locked);
			$this->user->insertAuthLog(null, $email, 'login_failed', $ip, $ua, json_encode(['reason' => 'email_not_found']));
			$msg = 'Email tidak terdaftar';
			if ($is_ajax) return $send_json(false, $msg);
			$this->session->set_flashdata('error', $msg);
			redirect(base_url('login'));
			return;
		}

		if (!password_verify($password, $user->password)) {
			// Incorrect password: increment failed attempts and log (DB) - avoid writing warning to file logs
			$locked = null;
			$attempts_new = $attempts + 1;
			if ($attempts_new >= 5) {
				$locked = time() + 300; // 5 minutes
			}
			$this->user->upsertLoginAttempt($ip, $email, 1, $locked);
			$this->user->insertAuthLog($user->id, $email, 'login_failed', $ip, $ua, json_encode(['reason' => 'wrong_password']));
			$msg = 'Password salah';
			if ($is_ajax) return $send_json(false, $msg);
			$this->session->set_flashdata('error', $msg);
			redirect(base_url('login'));
			return;
		}

		if ($user->is_active != 1) {
			$msg = 'Akun tidak aktif';
			if ($is_ajax) return $send_json(false, $msg);
			$this->session->set_flashdata('error', $msg);
			redirect(base_url('login'));
			return;
		}

		$session = [
			'user_id' => $user->id,
			'user_name' => $user->name,
			'member_name' => isset($user->name) ? $user->name : '',
			'image' => isset($user->image) ? $user->image : 'default.jpg',
			'created_at' => isset($user->created_at) ? $user->created_at : '',
			'logged_in' => true
		];

		// Attach role object to session (used by auth_helper and templates)
		$role = null;
		if (isset($user->role_id) && $user->role_id) {
			$role = $this->user->getRoleById($user->role_id);
			if ($role) {
				$session['role'] = $role;
				// also store a simple role name for faster checks in views/helpers
				if (isset($role->name)) {
					$session['role_name'] = $role->name;
				}
			}
		}

		// Regenerate session id on successful login to prevent session fixation.
		if (method_exists($this->session, 'sess_regenerate')) {
			$this->session->sess_regenerate(TRUE);
		} else {
			session_regenerate_id(true);
		}

		// Clear persistent failed attempts for this IP/email
		$this->user->resetLoginAttempt($ip, $email);
		$this->user->insertAuthLog($user->id, $email, 'login_success', $ip, $ua, json_encode(['user_id' => $user->id]));

		$this->session->set_userdata($session);
		// successful login
		if ($is_ajax) return $send_json(true, 'Login berhasil', ['url' => base_url('dashboard')]);
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
			$name = htmlspecialchars($this->input->post('name', true));
			$email = htmlspecialchars($this->input->post('email', true));
			$password = password_hash($this->input->post('password'), PASSWORD_DEFAULT);

			// determine role_id for default 'user'
			$role = $this->user->getRoleByName('user');
			$role_id = $role ? $role->id : null;

			$data = [
				'name'		=> $name,
				'email' 	=> $email,
				'password'  => $password,
				'is_active' => 1,
				'image' 	=> 'default.jpg',
				'role_id'   => $role_id
			];

			$this->user->insert($data);
			$this->session->set_flashdata('success', 'Registrasi berhasil, silakan login.');
			redirect(base_url('login'));
		}
	}

	public function forgetpassword()
	{
		// Token-based password reset
		// NOTE: Database must have `reset_token` (VARCHAR) and `reset_expires` (INT) columns on `users` table.
		$this->form_validation->set_rules('email', 'Email', 'required|valid_email');
		if ($this->form_validation->run() == FALSE) {
			$data['title'] = TITLE . 'Forget Password';
			$data['main_content'] = 'forgetpassword';
			$this->load->view('partials/template', $data);
			return;
		}

		$email = $this->input->post('email');
		$user = $this->user->getByEmail($email);
		if (!$user) {
			$this->session->set_flashdata('error', 'Email tidak terdaftar');
			redirect(base_url('forgetpassword'));
			return;
		}

		// generate secure token and expiry (1 hour)
		$token = bin2hex(random_bytes(32));
		$expires = time() + 3600; // 1 hour from now

		// save token to user record
		$this->user->setResetTokenByEmail($email, $token, $expires);

		// Send reset link via CI Email
		$reset_link = base_url('reset/' . $token);
		$this->load->library('email');
		$this->email->from('no-reply@example.com', TITLE);
		$this->email->to($email);
		$this->email->subject('Reset Password');
		$body = $this->load->view('emails/reset_link', ['reset_link' => $reset_link, 'name' => $user->name], TRUE);
		$this->email->message($body);
		if (@$this->email->send()) {
			$this->session->set_flashdata('success', 'Instruksi reset password telah dikirim ke email Anda.');
		} else {
			// fallback: flash link for dev awareness
			log_message('error', 'Failed to send reset email to ' . $email);
			$this->session->set_flashdata('success', 'Link reset (DEV): ' . $reset_link);
		}
		redirect(base_url('login'));
	}

	/**
	 * Reset password form and submit using token.
	 * URL: /reset/{token}
	 */
	public function reset($token = '')
	{
		if (!$token) {
			show_404();
			return;
		}

		$user = $this->user->getByResetToken($token);
		if (!$user) {
			$this->session->set_flashdata('error', 'Token tidak valid atau sudah kadaluarsa.');
			redirect(base_url('forgetpassword'));
			return;
		}

		// check expiry
		if (empty($user->reset_expires) || time() > (int) $user->reset_expires) {
			$this->session->set_flashdata('error', 'Token reset telah kadaluarsa.');
			redirect(base_url('forgetpassword'));
			return;
		}

		// handle form submit
		$this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
		if ($this->form_validation->run() == FALSE) {
			$data['title'] = TITLE . 'Reset Password';
			$data['token'] = $token;
			$data['main_content'] = 'resetpassword';
			$this->load->view('partials/template', $data);
			return;
		}

		$new_password = $this->input->post('password');
		$hash = password_hash($new_password, PASSWORD_DEFAULT);
		$this->user->updatePasswordById($user->id, $hash);
		$this->session->set_flashdata('success', 'Password berhasil diubah. Silakan login.');
		redirect(base_url('login'));
	}
}
