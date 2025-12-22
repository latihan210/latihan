<?php
$sidebar = array(
   array(
      'title' => 'menu',
      'nav'   => 'menu',
      'link'  => base_url('menu'),
      'icon'  => 'bi bi-house',
      // visible to all authenticated users
      'roles' => array('admin', 'user'),
      'sub'   => false,
   ),
   array(
      'title' => 'Data Member',
      'nav'   => 'member',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-person-fill',
      // admin manages members
      'roles' => array('admin'),
      'sub'   => array(
         array(
            'title' => 'Add New Member',
            'nav'   => 'new_member',
            'link'  => base_url('member/new_member'),
            'icon'  => 'bi bi-person-fill-add',
            'roles' => array('admin'),
            'sub'   => false,
         ),
         array(
            'title' => 'Member List',
            'nav'   => 'member_list',
            'link'  => base_url('member/member_list'),
            'icon'  => 'bi bi-person-lines-fill',
            'roles' => array('admin'),
            'sub'   => false,
         ),
      ),
   ),
   array(
      'title' => 'Laporan',
      'nav'   => 'laporan',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-file-earmark-text',
      // reports visible to admin and staff-level users
      'roles' => array('admin'),
      'sub'   => array(
         array(
            'title' => 'Penjualan',
            'nav'   => 'penjualan',
            'link'  => base_url('laporan/penjualan'),
            'icon'  => 'bi bi-cart-check',
            'roles' => array('admin'),
            'sub'   => false,
         ),
         array(
            'title' => 'Stok',
            'nav'   => 'stok',
            'link'  => base_url('laporan/stok'),
            'icon'  => 'bi bi-boxes',
            'roles' => array('admin'),
            'sub'   => false,
         ),
      ),
   ),
);

$menu_cms = array(
   array(
      'title' => 'Master Settings',
      'nav'   => 'settings',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-gear-fill',
      // CMS only for admin
      'roles' => array('admin'),
      'sub'   => array(
         array(
            'title' => 'Role Setting',
            'nav'   => 'role_setting',
            'link'  => base_url('role/role_setting'),
            'icon'  => 'bi bi-person-fill-lock',
            'roles' => array('admin'),
            'sub'   => false,
         ),
         array(
            'title' => 'Data Perusahaan',
            'nav'   => 'data_perusahaan',
            'link'  => base_url('role/data_perusahaan'),
            'icon'  => 'bi bi-house-gear-fill',
            'roles' => array('admin'),
            'sub'   => false,
         ),
      ),
   ),
);

$active_page = ($this->uri->segment(1, 0) ? $this->uri->segment(1, 0) : '');
$active_sub = ($this->uri->segment(2, 0) ? $this->uri->segment(2, 0) : '');
