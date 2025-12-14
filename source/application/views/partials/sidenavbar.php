<?php
include APPPATH . 'views/backend/menu.php';
$sidebar        = isset($sidebar) ? $sidebar : false;
$menu_cms       = isset($menu_cms) ? $menu_cms : false;
$side_name      = isset($member->name) ? $member->name : '';
$side_user      = isset($member->username) ? strtolower($member->username) : '';
// helper: current url and active detection
$CI = &get_instance();
$current_full = current_url();
$current_path = trim(parse_url($current_full, PHP_URL_PATH), '/');

function nav_is_active($link, $current_path, $current_full)
{
    if (!$link) return false;
    // normalize link
    $link_full = $link;
    // if link is relative (no http) convert to site_url
    if (strpos($link, 'http') !== 0 && strpos($link, base_url()) !== 0) {
        $link_full = rtrim(base_url($link), '/');
    }
    $link_path = trim(parse_url($link_full, PHP_URL_PATH), '/');
    // exact path match or full url match
    if ($link_full === rtrim($current_full, '/')) return true;
    if ($link_path === $current_path) return true;
    // also consider last segment match
    $lp = explode('/', $link_path);
    $cp = explode('/', $current_path);
    if (end($lp) && end($lp) === end($cp)) return true;
    return false;
}
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
                            // check if any child is active
                            $parent_active = false;
                            foreach ($sub_nav as $sub_check) {
                                if (nav_is_active($sub_check['link'], $current_path, $current_full)) {
                                    $parent_active = true;
                                    break;
                                }
                            }
                            $li_class = 'nav-item' . ($parent_active ? ' menu-open' : '');
                            $a_class = 'nav-link' . ($parent_active ? ' active' : '');
                            echo '<li class="' . $li_class . '">';
                            echo '<a href="#" class="' . $a_class . '">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '<i class="nav-arrow bi bi-chevron-right"></i></p>';
                            echo '</a>';
                            echo '<ul class="nav nav-treeview"' . ($parent_active ? ' style="display:block;"' : '') . '>';
                            foreach ($sub_nav as $sub) {
                                if (!$sub || !is_array($sub)) continue;
                                $is_active = nav_is_active($sub['link'], $current_path, $current_full) ? ' active' : '';
                                echo '<li class="nav-item">';
                                echo '<a href="' . $sub['link'] . '" class="nav-link' . $is_active . '">';
                                echo '<i class="nav-icon ' . $sub['icon'] . '"></i>';
                                echo '<p>' . $sub['title'] . '</p>';
                                echo '</a>';
                                echo '</li>';
                            }
                            echo '</ul>';
                            echo '</li>';
                        } else {
                            echo '<li class="nav-item">';
                            $is_active = nav_is_active($nav['link'], $current_path, $current_full) ? ' active' : '';
                            echo '<a href="' . $nav['link'] . '" class="nav-link' . $is_active . '">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '</p>';
                            echo '</a>';
                            echo '</li>';
                        }
                    }
                }
                // Render menu dinamis dari $menu_cms
                if ($menu_cms && is_array($menu_cms)) {
                    echo '<hr class="my-3" style="border-color: rgba(235,235,235,.85);">';
                    echo '<li class="nav-header">CMS</li>';
                    foreach ($menu_cms as $nav) {
                        if (!$nav || !is_array($nav)) continue;
                        $sub_nav = isset($nav['sub']) ? $nav['sub'] : false;
                        if ($sub_nav && is_array($sub_nav)) {
                            $parent_active = false;
                            foreach ($sub_nav as $sub_check) {
                                if (nav_is_active($sub_check['link'], $current_path, $current_full)) {
                                    $parent_active = true;
                                    break;
                                }
                            }
                            $li_class = 'nav-item' . ($parent_active ? ' menu-open' : '');
                            $a_class = 'nav-link' . ($parent_active ? ' active' : '');
                            echo '<li class="' . $li_class . '">';
                            echo '<a href="#" class="' . $a_class . '">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '<i class="nav-arrow bi bi-chevron-right"></i></p>';
                            echo '</a>';
                            echo '<ul class="nav nav-treeview"' . ($parent_active ? ' style="display:block;"' : '') . '>';
                            foreach ($sub_nav as $sub) {
                                if (!$sub || !is_array($sub)) continue;
                                $is_active = nav_is_active($sub['link'], $current_path, $current_full) ? ' active' : '';
                                echo '<li class="nav-item">';
                                echo '<a href="' . $sub['link'] . '" class="nav-link' . $is_active . '">';
                                echo '<i class="nav-icon ' . $sub['icon'] . '"></i>';
                                echo '<p>' . $sub['title'] . '</p>';
                                echo '</a>';
                                echo '</li>';
                            }
                            echo '</ul>';
                            echo '</li>';
                        } else {
                            echo '<li class="nav-item">';
                            $is_active = nav_is_active($nav['link'], $current_path, $current_full) ? ' active' : '';
                            echo '<a href="' . $nav['link'] . '" class="nav-link' . $is_active . '">';
                            echo '<i class="nav-icon ' . $nav['icon'] . '"></i>';
                            echo '<p>' . $nav['title'] . '</p>';
                            echo '</a>';
                            echo '</li>';
                        }
                    }
                }
                ?>
                <hr class="my-3" style="border-color: rgba(235,235,235,.85);">
                <li class="nav-item">
                    <a class="nav-link" href="<?= base_url('logout') ?>">
                        <i class="bi bi-box-arrow-left"></i>
                        <p>Logout</p>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</aside>