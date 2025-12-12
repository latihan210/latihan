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

    /**
     * Set password reset token and expiry (store in users table).
     * NOTE: Requires adding columns to `users` table:
     *   - `reset_token` VARCHAR(128) NULL
     *   - `reset_expires` INT(11) NULL
     */
    public function setResetTokenByEmail($email, $token, $expires)
    {
        return $this->db->where('email', $email)->update('users', [
            'reset_token' => $token,
            'reset_expires' => $expires
        ]);
    }

    public function getByResetToken($token)
    {
        return $this->db->get_where('users', ['reset_token' => $token])->row();
    }

    public function updatePasswordById($userId, $passwordHash)
    {
        return $this->db->where('id', $userId)->update('users', [
            'password' => $passwordHash,
            'reset_token' => null,
            'reset_expires' => null
        ]);
    }

    // -- Login attempts (persistent rate-limit)
    public function getLoginAttempt($ip, $email = null)
    {
        $this->db->where('ip', $ip);
        if ($email) $this->db->where('email', $email);
        return $this->db->get('login_attempts')->row();
    }

    public function upsertLoginAttempt($ip, $email = null, $attempts = 1, $locked_until = null)
    {
        $now = time();
        $row = $this->getLoginAttempt($ip, $email);
        if ($row) {
            $data = [
                'attempts' => $row->attempts + $attempts,
                'last_attempt' => $now,
                'locked_until' => $locked_until
            ];
            return $this->db->where('id', $row->id)->update('login_attempts', $data);
        } else {
            $data = [
                'ip' => $ip,
                'email' => $email,
                'attempts' => $attempts,
                'last_attempt' => $now,
                'locked_until' => $locked_until
            ];
            return $this->db->insert('login_attempts', $data);
        }
    }

    public function resetLoginAttempt($ip, $email = null)
    {
        $this->db->where('ip', $ip);
        if ($email) $this->db->where('email', $email);
        return $this->db->delete('login_attempts');
    }

    // -- Auth logs
    public function insertAuthLog($user_id, $email, $event, $ip = null, $user_agent = null, $meta = null)
    {
        $data = [
            'user_id' => $user_id,
            'email' => $email,
            'event' => $event,
            'ip' => $ip,
            'user_agent' => $user_agent,
            'meta' => $meta ? (is_string($meta) ? $meta : json_encode($meta)) : null,
            'created_at' => time()
        ];
        return $this->db->insert('auth_logs', $data);
    }
}
