<div class="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
  <div class="row w-100 justify-content-center">
    <div class="col-12 col-sm-8 col-md-6 col-lg-4">
      <div class="lockscreen-wrapper">
        <div class="lockscreen-item">
          <div class="lockscreen-image">
            <img src="<?= ASSET_PATH; ?>/img/AdminLTELogo.png" alt="User Image" />
          </div>

          <form class="lockscreen-credentials" action="<?= base_url('forgetpassword'); ?>" method="post">

            <div class="alert alert-danger error-validate" role="alert" style="line-height: 20px; text-align: center; display: none;">
              <i class="mdi mdi-information-outline"></i>
              <span style="font-size:12px;"> There are some errors, please check the form below !</span>
            </div>

            <div class="alert alert-success success-validate" role="alert" style="line-height: 20px; text-align: center; display: none;">
              <i class="mdi mdi-information-outline"></i>
              <span style="font-size:12px;"> </span>
            </div>

            <div class="input-group">
              <input type="email" class="form-control shadow-none <?= form_error('email') ? 'is-invalid' : '' ?>" name="email" placeholder="Email" title="<?= strip_tags(form_error('email')) ?>" value="<?= set_value('email') ?>" />
              <div class="input-group-text border-0 bg-transparent px-1">
                <button type="submit" class="btn shadow-none">
                  <i class="bi bi-box-arrow-right text-body-secondary"></i>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="help-block text-center">Enter your email to retrieve your session</div>
        <div class="text-center">
          <a href="<?= base_url('login'); ?>" class="text-decoration-none">Or sign in as a different user</a>
        </div>
        <div class="lockscreen-footer text-center">
          Copyright © <?= date('Y'); ?> &nbsp;
          <br />
          All rights reserved
        </div>
      </div>
    </div>
  </div>
</div>