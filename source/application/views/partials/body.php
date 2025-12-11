<main class="" data-name="<?= $this->security->get_csrf_token_name(); ?>" data-code="<?= $this->security->get_csrf_hash(); ?>">
    <div class="">
        <?php
        $CI = &get_instance();
        $current_controller = strtolower($CI->router->fetch_class());

        // Halaman Auth
        if ($current_controller === 'auth') {
            $this->load->view(VIEW_AUTH . $main_content);
        }

        // Halaman Backend
        if ($current_controller === 'backend') :
        ?>
            <div class="app-wrapper">

                <?php $this->load->view(VIEW_PARTIALS . 'topnavbar.php'); ?>
                <?php $this->load->view(VIEW_PARTIALS . 'sidenavbar.php'); ?>

                <main class="app-main">
                    <div class="app-content-header">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-6">
                                    <h3 class="mb-0">
                                        <?php
                                        // Tentukan salam otomatis
                                        date_default_timezone_set('Asia/Jakarta');

                                        $hour = (int) date('H');

                                        if ($hour >= 3 && $hour < 10) {
                                            $hi = 'Selamat Pagi';
                                        } elseif ($hour >= 10 && $hour < 15) {
                                            $hi = 'Selamat Siang';
                                        } elseif ($hour >= 15 && $hour < 18) {
                                            $hi = 'Selamat Sore';
                                        } else {
                                            $hi = 'Selamat Malam';
                                        }

                                        // Format welcome text with member name (fallback to email or 'Pengguna')
                                        $memberName = $this->session->userdata('member_name') ?: $this->session->userdata('user_name') ?: 'Pengguna';
                                        $welcome_text = $hi . ', ' . $memberName;

                                        echo $welcome_text;
                                        ?>

                                    </h3>
                                </div>
                                <!-- <div class="col-sm-6">
                                    <ol class="breadcrumb float-sm-end">
                                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page"><?= ($main_content == 'dashboard' ? 'Dashboard' : '') ?></li>
                                    </ol>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    <div class="app-content">

                        <?php $this->load->view(VIEW_BACKEND . $main_content); ?>

                    </div>
                </main>

                <footer class="app-footer text-center">
                    <strong>
                        &copy; <?= date('Y'); ?>&nbsp;
                        <a href="#" class="text-decoration-none"><?= COMPANY_NAME; ?></a>.
                    </strong>
                </footer>

            </div>
        <?php endif; ?>
    </div>
</main>