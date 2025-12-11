<?php
$sidebar = array(
   array(
      'title' => 'menu',
      'nav'   => 'menu',
      'link'  => base_url('menu'),
      'icon'  => 'bi bi-house',
      'roles' => array(),
      'sub'   => false,
   ),
   array(
      'title' => 'Master Data',
      'nav'   => 'master',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-folder-fill',
      'roles' => array(),
      'sub'   => array(
         array(
            'title' => 'Produk',
            'nav'   => 'produk',
            'link'  => base_url('master/produk'),
            'icon'  => 'bi bi-box-seam',
            'roles' => array(),
            'sub'   => false,
         ),
         array(
            'title' => 'Kategori',
            'nav'   => 'kategori',
            'link'  => base_url('master/kategori'),
            'icon'  => 'bi bi-tags',
            'roles' => array(),
            'sub'   => false,
         ),
      ),
   ),
   array(
      'title' => 'Laporan',
      'nav'   => 'laporan',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-file-earmark-text',
      'roles' => array(),
      'sub'   => array(
         array(
            'title' => 'Penjualan',
            'nav'   => 'penjualan',
            'link'  => base_url('laporan/penjualan'),
            'icon'  => 'bi bi-cart-check',
            'roles' => array(),
            'sub'   => false,
         ),
         array(
            'title' => 'Stok',
            'nav'   => 'stok',
            'link'  => base_url('laporan/stok'),
            'icon'  => 'bi bi-boxes',
            'roles' => array(),
            'sub'   => false,
         ),
      ),
   ),
);

$menu_cms = array(
   array(
      'title' => 'CMS Example',
      'nav'   => 'cms',
      'link'  => 'javascript:;',
      'icon'  => 'bi bi-window',
      'roles' => array(),
      'sub'   => array(
         array(
            'title' => 'Halaman',
            'nav'   => 'halaman',
            'link'  => base_url('cms/halaman'),
            'icon'  => 'bi bi-file-earmark',
            'roles' => array(),
            'sub'   => false,
         ),
         array(
            'title' => 'Artikel',
            'nav'   => 'artikel',
            'link'  => base_url('cms/artikel'),
            'icon'  => 'bi bi-journal-text',
            'roles' => array(),
            'sub'   => false,
         ),
      ),
   ),
);

$active_page = ($this->uri->segment(1, 0) ? $this->uri->segment(1, 0) : '');
$active_sub = ($this->uri->segment(2, 0) ? $this->uri->segment(2, 0) : '');
