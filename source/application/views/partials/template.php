<!DOCTYPE html>
<html lang="en" class="no-js">

<?php
$CI = &get_instance();
$current_controller = strtolower($CI->router->fetch_class());
$current_method     = strtolower($CI->router->fetch_method());

$view_prefix = defined('VIEW_PARTIALS') ? VIEW_PARTIALS : 'partials/';

// Tentukan class body default
$body_class = 'layout-fixed sidebar-expand-lg sidebar-mini bg-body-tertiary app-loaded sidebar-open';

// Jika halaman AUTH → override class body
if ($current_controller === 'auth') {

    if ($current_method === 'index' || $current_method === 'login') {
        $body_class = 'login-page bg-body-secondary';
    }

    if ($current_method === 'register') {
        $body_class = 'register-page bg-body-secondary';
    }

    if ($current_method === 'forgetpassword') {
        $body_class = 'lockscreen bg-body-secondary';
    }
} elseif ($current_controller === 'backend') {
    // Jika halaman BACKEND → gunakan class body khusus backend
    $body_class = 'layout-fixed sidebar-expand-lg sidebar-mini bg-body-tertiary app-loaded sidebar-open';
}
?>

<?php $this->load->view($view_prefix . 'header'); ?>

<body class="<?= $body_class ?>">

    <?php $this->load->view($view_prefix . 'body'); ?>
    <?php $this->load->view($view_prefix . 'footer'); ?>

</body>

</html>