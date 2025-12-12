<?php
defined('BASEPATH') or exit('No direct script access allowed');

// Try to load SMTP creds from environment; if not set, try to parse conf/env/.env file
function _load_env_file_if_needed()
{
    if (getenv('SMTP_EMAIL') !== false) return;
    $env_path = realpath(APPPATH . '../../conf/env/.env');
    if (! $env_path || ! file_exists($env_path)) return;
    $lines = file($env_path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) continue;
        if (strpos($line, '=') === false) continue;
        list($k, $v) = explode('=', $line, 2);
        $k = trim($k);
        $v = trim($v);
        // strip optional quotes
        $v = trim($v, "\"'");
        putenv("$k=$v");
        $_ENV[$k] = $v;
    }
}

_load_env_file_if_needed();

$smtp_user = getenv('SMTP_EMAIL') ?: '';
$smtp_pass = getenv('SMTP_PASS') ?: '';

$config = array();
$config['protocol'] = 'smtp';
$config['smtp_host'] = 'smtp.gmail.com';
$config['smtp_user'] = $smtp_user;
$config['smtp_pass'] = $smtp_pass;
$config['smtp_port'] = 587;
$config['smtp_crypto'] = 'tls';
$config['mailtype'] = 'html';
$config['charset'] = 'utf-8';
$config['newline'] = "\r\n";
$config['crlf'] = "\r\n";
$config['wordwrap'] = TRUE;
$config['smtp_timeout'] = 30;

// $config is used by CodeIgniter Email library
