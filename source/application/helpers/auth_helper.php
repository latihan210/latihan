<?php if (! defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('user_role')) {
    function user_role()
    {
        $CI = &get_instance();
        $sess = $CI->session->userdata();
        return isset($sess['role']) ? $sess['role'] : null;
    }
}

if (!function_exists('is_admin')) {
    function is_admin()
    {
        $role = user_role();
        if (!$role) return false;
        if (is_object($role)) {
            return isset($role->name) && $role->name === 'admin';
        }
        if (is_array($role)) {
            return isset($role['name']) && $role['name'] === 'admin';
        }
        return $role === 'admin';
    }
}

if (!function_exists('has_role')) {
    function has_role($name)
    {
        $role = user_role();
        if (!$role) return false;
        if (is_object($role)) return isset($role->name) && $role->name === $name;
        if (is_array($role)) return isset($role['name']) && $role['name'] === $name;
        return $role === $name;
    }
}
