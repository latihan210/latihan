<div class="login-box">
  <div class="login-logo">
    <?= COMPANY_NAME; ?>
  </div>
  <div class="card">
    <div class="card-body login-card-body">
      <p class="login-box-msg">Sign into your account</p>

      <form action="<?= base_url('login'); ?>" method="post">

        <div class="alert alert-danger error-validate" role="alert" style="line-height: 20px; text-align: center; display: none;">
          <i class="mdi mdi-information-outline"></i>
          <span style="font-size:12px;"> There are some errors, please check the form below !</span>
        </div>

        <div class="alert alert-success success-validate" role="alert" style="line-height: 20px; text-align: center; display: none;">
          <i class="mdi mdi-information-outline"></i>
          <span style="font-size:12px;"> </span>
        </div>

        <div class="input-group mb-3">
          <input type="email" class="form-control <?= form_error('email') ? 'is-invalid' : '' ?>" name="email" placeholder="Email" title="<?= strip_tags(form_error('email')) ?>" value="<?= set_value('email') ?>">
          <div class="input-group-text">
            <span class="bi bi-envelope"></span>
          </div>
        </div>

        <div class="input-group mb-3">
          <input type="password" class="form-control <?= form_error('password') ? 'is-invalid' : '' ?>" name="password" placeholder="Password" title="<?= strip_tags(form_error('password')) ?>">
          <div class="input-group-text">
            <span class="bi bi-lock-fill"></span>
          </div>
        </div>

        <div class="row">
          <div class="col-8">
            <!-- <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault"> Remember Me </label>
              </div> -->
          </div>
          <div class="col-4">
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
          </div>
        </div>

      </form>

      <p class="mb-1">
        <a href="<?= base_url('forgetpassword'); ?>">I forgot my password</a>
      </p>
      <p class="mb-0">
        <a href="<?= base_url('register'); ?>" class="text-center"> Register a new membership </a>
      </p>

    </div>
  </div>
</div>