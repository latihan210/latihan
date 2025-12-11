<?php
include APPPATH . 'views/backend/menu.php';
$sidebar        = isset($sidebar) ? $sidebar : false;
$menu_cms       = isset($menu_cms) ? $menu_cms : false;
$side_name      = isset($member->name) ? $member->name : '';
$side_user      = isset($member->username) ? strtolower($member->username) : '';
?>
<aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
    <div class="sidebar-brand">
        <a href="<?= base_url('dashboard') ?>" class="brand-link text-white">
            <?= COMPANY_NAME; ?>
        </a>
    </div>
    <div class="sidebar-wrapper">
        <nav class="mt-2">
            <ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="navigation" aria-label="Main navigation" data-accordion="false" id="navigation">
                <li class="nav-item">
                    <a class="nav-link <?= ($main_content == 'dashboard' ? 'active' : '') ?>" href="<?= base_url('dashboard') ?>">
                        <i class="nav-icon bi bi-house-fill"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <hr class="my-3" style="border-color: rgba(235,235,235,.85);">
                <li class="nav-header">Member</li>
                <?php
                // Render menu dinamis dari $sidebar
                if ($sidebar && is_array($sidebar)) {
                    foreach ($sidebar as $nav) {
                        if (!$nav || !is_array($nav)) continue;
                        $sub_nav = isset($nav['sub']) ? $nav['sub'] : false;
                        if ($sub_nav && is_array($sub_nav)) {
                            echo '<li class="nav-item">';
                            echo '<a href="#" class="nav-link">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '<i class="nav-arrow bi bi-chevron-right"></i></p>';
                            echo '</a>';
                            echo '<ul class="nav nav-treeview">';
                            foreach ($sub_nav as $sub) {
                                if (!$sub || !is_array($sub)) continue;
                                echo '<li class="nav-item">';
                                echo '<a href="' . $sub['link'] . '" class="nav-link">';
                                echo '<i class="nav-icon bi bi-circle"></i>';
                                echo '<p>' . $sub['title'] . '</p>';
                                echo '</a>';
                                echo '</li>';
                            }
                            echo '</ul>';
                            echo '</li>';
                        } else {
                            echo '<li class="nav-item">';
                            echo '<a href="' . $nav['link'] . '" class="nav-link">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '</p>';
                            echo '</a>';
                            echo '</li>';
                        }
                    }
                }
                // Render menu dinamis dari $menu_cms
                if ($menu_cms && is_array($menu_cms)) {
                    echo '<li class="nav-header">CMS</li>';
                    foreach ($menu_cms as $nav) {
                        if (!$nav || !is_array($nav)) continue;
                        $sub_nav = isset($nav['sub']) ? $nav['sub'] : false;
                        if ($sub_nav && is_array($sub_nav)) {
                            echo '<li class="nav-item">';
                            echo '<a href="#" class="nav-link">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '<i class="nav-arrow bi bi-chevron-right"></i></p>';
                            echo '</a>';
                            echo '<ul class="nav nav-treeview">';
                            foreach ($sub_nav as $sub) {
                                if (!$sub || !is_array($sub)) continue;
                                echo '<li class="nav-item">';
                                echo '<a href="' . $sub['link'] . '" class="nav-link">';
                                echo '<i class="nav-icon bi bi-circle"></i>';
                                echo '<p>' . $sub['title'] . '</p>';
                                echo '</a>';
                                echo '</li>';
                            }
                            echo '</ul>';
                            echo '</li>';
                        } else {
                            echo '<li class="nav-item">';
                            echo '<a href="' . $nav['link'] . '" class="nav-link">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '</p>';
                            echo '</a>';
                            echo '</li>';
                        }
                    }
                }
                ?>
                <li class="nav-item">
                    <a class="nav-link" href="<?= base_url('logout') ?>">
                        <i class="bi bi-box-arrow-left text-white"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>