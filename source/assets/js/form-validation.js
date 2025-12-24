// =========================================================================
// Global Function
// =========================================================================
$.fn.digits = function(){
    return this.each(function() {
        $(this).val( $(this).val().replace(/\D/g,".").replace(/\B(?=(\d{3})+(?!\d))/g, "") );
    });
};

// ============================================================
// Form Validation First Login
// ============================================================
var FV_FirstLogin = function () {   
    var handleValidationFirstLogin = function() {
        var _form       = $('#form-first-login');
        var wrapper     = $('.wrapper-first-login');

        if ( !_form.length ) {
            return;
        }

        _form.validate({
            errorElement: 'div',       // default input error message container
            errorClass: 'invalid-feedback',   // default input error message class
            focusInvalid: false,        // do not focus the last invalid input
            ignore: "",
            rules: {
                password_current: {
                    required: true,
                },
                password_new: {
                    minlength: 6,
                    required: true,
                    pwcheck: true,
                },
                password_confirm: {
                    required: true,
                    equalTo: '#password_new'
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit     
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                if ( $('.alert-notify').length ) {
                    $('.alert-notify').remove();
                }
                $('#modal-save-first-login').modal('show');
            }
        });
        
        $.validator.addMethod("pwcheck", function(value) {
            return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value); // consists of only these
        }, "Password must consist of letters and numbers" );
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationFirstLogin();
        },
    };
}();

// ============================================================
// Form Validation Ganerate and Order PIN
// ============================================================
var FV_Profile = function () {      
    var handleValidationPersonal = function() {
        var form_personal   = $('#personal');
        var wrapper         = $('.wrapper-profile-info');

        form_personal.validate({
            errorElement: 'div',       // default input error message container
            errorClass: 'invalid-feedback',   // default input error message class
            focusInvalid: false,        // do not focus the last invalid input
            ignore: "",
            rules: {
                member_username: {
                    minlength: 5,
                    required: true,
                    unamecheck: true,
                },
                member_name: {
                    minlength: 3,
                    required: true,
                    lettersonly: true,
                },
                member_email: {
                    required: true,
                    remote: {
                        url: $("#member_email").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            email: function() {
                                return $("#member_email").prop( 'readonly' ) ? '' : $("#member_email").val();
                            },
                            id: function() {
                                return $("#member_email").data( 'id' ) ? $("#member_email").data('id') : '';
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                },
                member_idcard: {
                    required: true,
                    remote: {
                        url: $("#member_idcard").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            idcard: function() {
                                return $("#member_idcard").prop( 'readonly' ) ? '' : $("#member_idcard").val();
                            },
                            id: function() {
                                return $("#member_idcard").data( 'id' ) ? $("#member_idcard").data('id') : '';
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                },
                // member_mobile: {
                //     minlength: 3,
                //     required: true,
                //     remote: {
                //         url: $("#member_mobile").data('url'),
                //         type: "post",
                //         data: {
                //             [App.dhaName()]: function() {
                //                 return App.dhaToken();
                //             },
                //             phone: function() {
                //                 return $("#member_mobile").prop( 'readonly' ) ? '' : $("#member_mobile").val();
                //             },
                //             id: function() {
                //                 return $("#member_mobile").data( 'id' ) ? $("#member_mobile").data('id') : '';
                //             }
                //         },
                //         dataFilter: function(response) {
                //             response = $.parseJSON(response);
                //             if ( response.token ) {
                //                 App.dhaToken(response.token);
                //             }
                //             return response.status;
                //         }
                //     }
                // },
                // member_phone: {
                //     required: true
                // },
                // member_birthplace: {
                //     required: true,
                // },
                // member_birthdate: {
                //     required: true,
                // },
                // member_gender: {
                //     required: true,
                // },
                // member_province: {
                //     required: true,
                // },
                // member_district: {
                //     required: true,
                // },
                // member_subdistrict: {
                //     required: true,
                // },
                // member_village: {
                //     required: true,
                // },
                // member_address: {
                //     required: true,
                // },
            },
            messages: {
                member_email: {
                    remote: "Email has been registered. Please use another Email",
                },
                member_mobile: {
                    remote: "Phone has been registered. Please use another Phone",
                },
                member_idcard: {
                    remote: "ID Card has been registered. Please use another ID Card",
                },
            },
            invalidHandler: function (event, validator) { //display error alert on form submit     
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var phone_el        = $('input[name="member_phone"]', $(form));
                var phone_number    = '';
                if ( phone_el.length ) {
                    phone_number    = phone_el.val();
                }
                // if ( !phone_number || phone_number == '' || phone_number == undefined ) {
                //     App.notify({
                //         icon: 'fa fa-exclamation-triangle', 
                //         message: 'Invalid phone number !', 
                //         type: 'warning',
                //     });
                //     return false;
                // }
                $('#save_profile').modal('show');
            }
        });
        
        $.validator.addMethod("unamecheck", function(value) {
            return /^[A-Za-z0-9]{4,16}$/i.test(value);   // consists of only these
        }, "Username tidak memenuhi kriteria" );
        
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
        }, "Silahkan inputkan Nama dengan huruf saja" );
    };

    var handleValidationStockistAddress = function(){
     var form_stockist_address   = $('#stockist_address_form');
        var wrapper         = $('.wrapper-stockist-address-info');

        form_stockist_address.validate({
            errorElement: 'div',       // default input error message container
            errorClass: 'invalid-feedback',   // default input error message class
            focusInvalid: false,        // do not focus the last invalid input
            ignore: "",
            rules: {
                // member_stockist_name: {
                //     required: true,
                // },
                // member_stockist_province: {
                //     required: true,
                // },
                // member_stockist_district: {
                //     required: true,
                // },
                // member_stockist_subdistrict: {
                //     required: true,
                // },
                // member_stockist_village: {
                //     required: true,
                // },
                // member_stockist_address: {
                //     required: true,
                // },
            },
            invalidHandler: function (event, validator) { //display error alert on form submit     
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url = $(form).attr('action');
                bootbox.confirm("Is the Stockist Address data correct  ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    }

    var handleValidationBankAccount = function() {
        var form_bank       = $('#form-bank-account');
        var wrapper         = $('.wrapper-bank-account');

        if ( !form_bank.length ) {
            return
        }

        form_bank.validate({
            errorElement: 'div',       // default input error message container
            errorClass: 'invalid-feedback',   // default input error message class
            focusInvalid: false,        // do not focus the last invalid input
            ignore: "",
            rules: {
                member_bill: {
                    required: true,
                    remote: {
                        url: $("#member_bill").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            bill: function() {
                                return $("#member_bill").prop( 'readonly' ) ? '' : $("#member_bill").val();
                            },
                            id: function() {
                                return $("#member_bill").data( 'id' ) ? $("#member_bill").data('id') : '';
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                },
                member_bank: {
                    required: true,
                },
                member_bill_name: {
                    required: true,
                },
            },
            messages: {
                member_bill: {
                    remote: "Bank Account Number has been registered. Please use another Bank Account Number"
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit     
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url = $(form).attr('action');
                bootbox.confirm("Is the Bank Account data correct  ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };

    var handleValidationInsuredData = function() {
        var form_insured    = $('#form-insured');
        var wrapper         = $('.wrapper-insured-data');

        if ( !form_insured.length ) {
            return
        }

        form_insured.validate({
            errorElement: 'div',       // default input error message container
            errorClass: 'invalid-feedback',   // default input error message class
            focusInvalid: false,        // do not focus the last invalid input
            ignore: "",
            rules: {
                insured_name: {
                    minlength: 3,
                    required: true,
                },
                insured_birthplace: {
                    required: true,
                },
                insured_birthdate: {
                    required: true,
                },
                insured_idcard: {
                    required: true,
                },
                insured_email: {
                    required: true,
                },
                insured_phone: {
                    required: true,
                },
                insured_job: {
                    required: true,
                },
            },
            invalidHandler: function (event, validator) { //display error alert on form submit     
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url = $(form).attr('action');
                bootbox.confirm("Is the insured data correct  ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    var handleValidationCPassword = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation
        var form_cpass  = $('#cpassword');
        form_cpass.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                cur_pass: {
                    required: true
                },
                new_pass: {
                    minlength: 6,
                    required: true,
                    pwcheck: true,
                },
                cnew_pass: {
                    minlength: 6,
                    required: true,
                    equalTo : "#new_pass"
                },
            },
            messages: {
                cur_pass: {
                    minlength: "Password at least 6 characters",
                },
                new_pass: {
                    minlength: "Password at least 6 characters",
                },
                cnew_pass: {
                    minlength: "Password at least 6 characters",
                    equalTo: "Confirm new password does not match the new password"
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: form_cpass, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                $('#save_cpassword').modal('show');
            }
        });
        
        $.validator.addMethod("pwcheck", function(value) {
            return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value); // consists of only these
        }, "Password must be a combination of letters and numbers" );
    };
    
    var handleValidationCPasswordTrx = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation
        var form_cpass  = $('#cpasswordtrx');
        form_cpass.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                cur_pass_trx: {
                    required: true
                },
                new_pass_trx: {
                    minlength: 6,
                    required: true,
                    pwcheck: true,
                },
                cnew_pass_trx: {
                    minlength: 6,
                    required: true,
                    equalTo : "#new_pass_trx"
                },
            },
            messages: {
                cur_pass_trx: {
                    minlength: "Password at least 6 characters",
                },
                new_pass_trx: {
                    minlength: "Password at least 6 characters",
                },
                cnew_pass_trx: {
                    minlength: "Password at least 6 characters",
                    equalTo: "Confirm new password does not match the new password"
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: form_cpass, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url         = $(form).attr('action');
                bootbox.confirm('Are you sure you want to change your password transaction ?', function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }

                                if( response.message == 'success'){
                                    var _type = 'success';
                                    var _icon = 'fa fa-check-circle';
                                    $(form)[0].reset();
                                }else{
                                    if( response.login == 'login' ){
                                        $(location).attr('href',response.data);
                                        return;
                                    }
                                    var _type = 'warning';
                                    var _icon = 'fa fa-exclamation-circle';
                                }
                                App.notify({
                                    icon: _icon, 
                                    message: response.data, 
                                    type: _type,
                                });
                                
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
        
        $.validator.addMethod("pwcheck", function(value) {
            return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value); // consists of only these
        }, "Password must be a combination of letters and numbers" );
    };

    // Handle Intl Tell Input
    var handleIntlTellInput = function() {
        var base_url        = window.location.origin + '/';
        var phonecode       = $(".phone").data('phonecode');
        var target          = $(".phone").data('target');
        var target2         = $(".phone").data('target');
        var input           = document.querySelector(".phone");
        var input2          = document.querySelector(".phone2");
        var errorMap        = ["Invalid number", "Invalid country code", "Too short", "Too long", "Invalid number"];
        var country         = ["id"];
        var selectCountry   = $('select[name=member_country]');

        errorMsg        = document.querySelector("#error-msg");
        errorMsg2       = document.querySelector("#error-msg2");

        if ( phonecode ) {
            if ( $.isArray(phonecode) ) {
                country = phonecode;
            }
        }

        if ( input ) {
            var iti = window.intlTelInput(input, {
                onlyCountries: country,
                nationalMode: true,
                utilsScript: base_url + "dhaassets/backend/plugins/intl-tel-input/build/js/utils.js" // just for formatting/placeholders etc
            });

            var reset = function() {
                input.classList.remove("error");
                errorMsg.innerHTML = "";
                errorMsg.classList.add("hide");
            };

            var validphone = function() {
                if (input.value.trim()) {
                    if (iti.isValidNumber()) {
                        if ( $("input"+target).length ) {
                            $("input"+target).val(iti.getNumber()).trigger('change');
                            // if ( $('.invalid-feedback', $('.phone-intl')).length ) {
                            //     $('.invalid-feedback', $('.phone-intl')).remove();
                            // }
                        }
                    } else {
                        input.classList.add("error");
                        var errorCode = iti.getValidationError();
                        errorMsg.innerHTML = errorMap[errorCode];
                        errorMsg.classList.remove("hide");
                        $("input"+target).val('').trigger('change');
                    }
                } else {
                    $("input"+target).val('').trigger('change');
                }
            };

            // Change Country
            if ( selectCountry.length ) {
                selectCountry.bind('change', function(){
                    let iso = $(this).val();
                    if ( iso ) {
                        iti.setCountry(iso);
                    }
                    if ( iso == 'id' ) {
                        $('.indonesia-regional').show();
                    } else {
                        $('.indonesia-regional').hide();
                        if ( $('select[name="member_province"]').length ) {
                            $('select[name="member_province"]').val('').trigger('change');
                        }
                    }
                });

                selectCountry.trigger('change');
            }

            input.addEventListener("countrychange", function() {
                if ( $('select#member_country').length && iti.defaultCountry ) {
                    $('select#member_country').val(iti.defaultCountry).trigger('change');
                    $(input).focus();
                }
            });

            // on blur: validate
            input.addEventListener('blur', function() {
                reset();
                validphone();
            });

            // on keyup / change flag: reset
            input.addEventListener('change', reset);
            input.addEventListener('keyup', reset);
        }

        if ( input2 ) {
            var iti2 = window.intlTelInput(input2, {
                onlyCountries: ["id"],
                nationalMode: true,
                utilsScript: base_url + "dhaassets/backend/plugins/intl-tel-input/build/js/utils.js" // just for formatting/placeholders etc
            });

            var reset2 = function() {
                input2.classList.remove("error");
                errorMsg.innerHTML = "";
                errorMsg.classList.add("hide");
            };

            // on blur: validate
            input2.addEventListener('blur', function() {
                reset2();
                if (input2.value.trim()) {
                    if (iti2.isValidNumber()) {
                        if ( $("input"+target2).length ) {
                            $("input"+target2).val(iti2.getNumber());
                        }
                    } else {
                        input2.classList.add("error");
                        var errorCode = iti.getValidationError();
                        errorMsg2.innerHTML = errorMap[errorCode];
                        errorMsg2.classList.remove("hide");
                        $("input"+target2).val('');
                    }
                }
            });

            // on keyup / change flag: reset
            input2.addEventListener('change', reset2);
            input2.addEventListener('keyup', reset2);

            if ( country ) {
                iti.setCountry(country);
            }
        }
    }; 
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationPersonal();
            handleValidationBankAccount();
            handleValidationInsuredData();
            handleValidationCPassword();
            handleValidationCPasswordTrx();
            handleIntlTellInput();
            handleValidationStockistAddress();
        },
    };
}();

// ============================================================
// Form Validation Purchase Order
// ============================================================
var FV_PurchaseOrder = function () {    
    var _form           = $('#form-purchase-order');
    var _wrapper        = $('.wrapper-form-purchase-order');
    var _trEmpty        = `<tr class="product-item-empty"><td colspan="6" class="text-center">No data available in table</td></tr>`;

    var subtotal_pin    = 0;
    var total_qty       = 0;
    var total_bv        = 0;
    var total_payment   = 0;
    var total_weight    = 0;
    var shipping_fee    = 0;
    var discount        = 0;
    var discount_code   = '';

    // ---------------------------------
    // Handle Validation
    // ---------------------------------
    var handleValidationPurchaseOrder = function() {
        if ( ! _form.length ) {
            return;
        }

        _form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                supplier: {
                    required: true
                },
                number_po: {
                    required: true
                },
                date_order: {
                    required: true
                },
                due_date: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'Ada beberapa error, silahkan cek formulir di bawah!', 
                    container: _wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
                App.scrollTo(_wrapper, -100);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                if ( total_qty == "" || total_qty == 0 || total_qty == undefined ) {
                    App.alert({
                        type: 'danger', 
                        icon: 'warning', 
                        message: 'Produk belum di plih. Silakan Pilih Produk terlebih dahulu !', 
                        container: _wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    App.scrollTo(_wrapper, -100);
                    return false;
                }

                bootbox.confirm("Apakah anda yakin akan simpan data pembelian produk ini ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        bootbox.alert(response.message, function(){ 
                                            if ( response.url ) {
                                                $(location).attr('href', response.url);
                                            } else {
                                                location.reload();
                                            }
                                        });
                                    }else{
                                        App.notify({
                                            type: 'danger',
                                            icon: 'fa fa-exclamation-circle', 
                                            message: response.message, 
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('Terjadi kesalahan sistem! Ulangi proses beberapa saat lagi.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };

    // ---------------------------------
    // Handle General
    // ---------------------------------
    var handleGeneralPurchaseOrder = function() {
        // Button Add Product Promo Data 
        // -----------------------------------------------
        $("body").delegate( "#select_product", "change", function( e ) {
            e.preventDefault();
            var product     = $('#select_product', _form).val();
            if ( product ) {
                addProductTable();
            } else {
                // bootbox.alert('Produk belum di pilih !');
                $('#select_product', _form).val('');
            }
            return false;
        });

        // Button Add Product Promo Data 
        // -----------------------------------------------
        $("body").delegate( ".btn-remove-pin-item", "click", function( e ) {
            e.preventDefault();
            var rowid    = $(this).data('id');
            removeProductTable(rowid);
            calculateTotalPayment();
            return false;
        });

        // Change Minus Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".btn-pin-minus-qty", "click", function( e ) {
            e.preventDefault();
            var step    = $(this).data('step');
            var count   = $(this).closest(".pin-quantity").find('.pin-item-qty').val();
            var countEl = $(this).closest(".pin-quantity").find('.pin-item-qty');

            if ( parseInt(count) >= 0 ) {
                count = parseInt(count) - parseInt(step);
                countEl.val(count).change();
            }
        });

        // Change Plus Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".btn-pin-plus-qty", "click", function( e ) {
            e.preventDefault();
            var step    = $(this).data('step');
            var count   = $(this).closest(".pin-quantity").find('.pin-item-qty').val();
            var countEl = $(this).closest(".pin-quantity").find('.pin-item-qty');

            count = parseInt(count) + parseInt(step);
            countEl.val(count).change();
        });

        // Change Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".pin-item-qty", "change", function( e ) {
            e.preventDefault();
            var rowid       = $(this).data('rowid');
            var qty         = $(this).val();
            if ( qty == '' ) {
                qty = 0;
            }

            if ( parseInt(qty) == 0 ) {
                removeProductTable(rowid);
            }
            
            calculateTotalPayment();
            return false;
        });

        // Change Price Product 
        // -----------------------------------------------
        $("body").delegate( ".pin-item-price", "blur", function( e ) {
            e.preventDefault();            
            calculateTotalPayment();
            return false;
        });
    };

    // ---------------------------------
    // Add Product PIN
    // ---------------------------------
    var addProductTable = function() {
        var _table          = $('#list_table_product_item');
        var _tbody          = $('tbody', _table);
        var _tr             = $('tr', _tbody);
        var _count_data     = _tr.length;
        var _empty_row      = _tbody.find('tr.product-item-empty');
        var id_product      = $('#select_product', _form).val();
        var t_product       = $('select[name="select_product"] option:selected').text();
        var n_product       = $('#select_product', _form).children("option:selected").data('name');
        var n_varian        = $('#select_product', _form).children("option:selected").data('varian');
        var img_product     = $('#select_product', _form).children("option:selected").data('image');
        var bv_product      = $('#select_product', _form).children("option:selected").data('bv');
        var price_product   = $('#select_product', _form).children("option:selected").data('price');
        var weight_product  = $('#select_product', _form).children("option:selected").data('weight');
        var stock_product   = $('#select_product', _form).children("option:selected").data('stock');
        stock_product       = stock_product ? stock_product : 0;

        if ( id_product == '' || id_product == 0 || id_product == undefined ) {
            return false;
        }

        if( $('[data-id="'+id_product+'"]', _tbody).length ) {
            bootbox.alert('Produk ini sudah ada ');
            return false;
        }

        if ( _empty_row.length ) {
            _empty_row.remove();
        }

        var qty_product = 1;
        var subtotal    = parseInt(qty_product) * parseInt(price_product);

        var t_varian    = '';
        if ( n_varian ) {
            t_varian    = `<div class="">Varian: <span class="ml-1 text-default font-weight-bolder">${ n_varian }</span></div>`;
        }

        var _append_row = `
            <tr class="pin_item" data-id="${id_product}" data-bv="${bv_product}" data-weight="${weight_product}">
                <td class="text-center">*</td>
                <td class="px-1">
                    <div class="media align-items-center" style="white-space: normal">
                        <a href="#" class="avatar bg-transparent mr-2">
                            <img alt="Image placeholder" src="${img_product}">
                        </a>
                        <div class="media-body">
                            <div class="font-weight-bold">${n_product}</div>
                            ${t_varian}
                        </div>
                    </div>
                </td>
                <td class="budget px-1">
                    <input class="form-control form-control-sm text-right numbercurrency pin-item-price pin-price-${id_product}"
                        type="text" data-rowid="${id_product}" name="products[${id_product}][price]" value="${price_product}" title="Price" />
                </td>
                <td class="text-center">
                    <div class="input-group input-group-sm pin-quantity">
                        <div class="input-group-prepend">
                            <button class="btn btn-sm btn-outline-dark btn-pin-minus-qty" type="button" data-step="1">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input class="form-control form-control-sm text-center numbermask pin-item-qty pin-qty-${id_product}" type="text" step="1" 
                            data-rowid="${id_product}"
                            data-stock="0"
                            name="products[${id_product}][qty]"
                            value="${qty_product}"
                            title="Qty" pattern="[0-9]*" inputmode="numeric" autocomplete="off"
                            style="background-color: transparent !important; border-color: #222; border-left: none; border-right: none;" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-dark btn-pin-plus-qty" type="button" data-step="1">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="budget text-right">
                    <span class="heading font-weight-bold pin-item-subtotal pin-subtotal-${id_product}">
                        ${ App.formatCurrency(subtotal) }
                    </span>
                </td>
                <td class="text-center px-1">
                    <button class="btn btn-sm btn-outline-warning btn-remove-pin-item" type="button" data-id="${id_product}" title="Hapus Produk">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            </tr>`;
        _tbody.append(_append_row);
        $('#select_product', _form).val('').trigger('change');
        calculateTotalPayment();
        InputMask.init();
        return false;
    };

    // ---------------------------------
    // Remove Product PIN
    // ---------------------------------
    var removeProductTable = function(rowid = '') {
        var _table      = $('#list_table_product_item');
        var _tbody      = $('tbody', _table);
        var _tr         = $('[data-id="'+rowid+'"]', _tbody);
        var _count_data = $('tr', _tbody).length;
        
        if ( rowid ) {
            if( _tr.length ) {
                _tr.remove();
                if ( _count_data == 1 ) {
                    _tbody.append(_trEmpty);
                }
            }
        }
        $('#select_product', _form).val('').trigger('change');
    };

    // ---------------------------------
    // Calculate Total Payment
    // ---------------------------------    
    var calculateTotalPayment = function() {
        var _total_qty          = 0;
        var _total_bv           = 0;
        var _total_price        = 0;
        var _total_weight       = 0;
        var _total_weight       = 0;
        var total_discount      = $('#discount').val();
        var el_pin_generate     = $('.pin_item');

        if ( el_pin_generate.length ) {
            el_pin_generate.each(function(index) {
                _idx            = $(this).data('id');
                bv              = $(this).data('bv');
                weight          = $(this).data('weight');
                qty             = $('.pin-qty-'+_idx).val();
                price           = $('.pin-price-'+_idx).val();
                price           = price.replace(/\./g, '');
                
                qty             = parseInt(qty) || 0;
                subtotal        = parseInt(qty) * parseInt(price);
                subtotal_bv     = parseInt(qty) * parseInt(bv);
                _total_qty      = parseInt(_total_qty) + parseInt(qty);
                _total_bv       = parseInt(_total_bv) + parseInt(subtotal_bv);
                _total_price    = parseInt(_total_price) + parseInt(subtotal);
                _total_weight   = parseInt(_total_weight) + ( parseInt(qty) * parseInt(weight) );

                if ( $('.pin-subtotal-'+_idx).length ) {
                    $('.pin-subtotal-'+_idx).text(App.formatCurrency(subtotal));
                }
            });
        }

        total_qty               = parseInt(_total_qty);
        total_bv                = parseInt(_total_bv);
        total_payment           = parseInt(_total_price);
        total_weight            = parseInt(_total_weight);

        if ( $('#discount').length ) {
            total_payment       = parseInt(_total_price) - parseInt(total_discount);
        }

        // $('.total-weight').text('( ' + App.formatCurrency(total_weight, '') + ' gr )');
        $('.product-total-paymnet').text(App.formatCurrency(total_payment));
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationPurchaseOrder();
            handleGeneralPurchaseOrder();
        },
    };
}();

// ============================================================
// Form Validation PIN Generate
// ============================================================
var FV_PINGenerate = function () {    
    var _form           = $('#form-pin-generate');
    var _wrapper        = $('.wrapper-form-pin-generate');
    var _trEmpty        = `<tr class="pin_item_empty"><td colspan="6" class="text-center">No data available in table</td></tr>`;

    var subtotal        = 0;
    var subtotal_pin    = 0;
    var total_qty       = 0;
    var total_bv        = 0;
    var total_payment   = 0;
    var total_weight    = 0;
    var total_discount  = 0;
    var shipping_fee    = 0;
    var discount        = 0;
    var discount_code   = '';

    // ---------------------------------
    // Handle Validation Generate PIN
    // ---------------------------------
    var handleValidationPINGenerate = function() {
        var form            = $('#form-pin-generate');
        var wrapper         = $('.wrapper-form-pin-generate');

        if ( ! form.length ) {
            return;
        }

        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                username: {
                    required: true
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'Ada beberapa error, silahkan cek formulir di bawah!', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
                App.scrollTo(wrapper, -100);
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');

                if ( total_qty == "" || total_qty == 0 || total_qty == undefined ) {
                    App.alert({
                        type: 'danger', 
                        icon: 'warning', 
                        message: 'Jumlah Produk belum di isi. Silakan isi Produk terlebih dahulu !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    App.scrollTo(wrapper, -100);
                    return false;
                }

                bootbox.confirm("Apakah anda yakin kirim Produk ke member ini ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        var _type   = 'success';
                                        var _icon   = 'fa fa-check-circle';
                                        var _table  = $('#list_table_product_pin_generate');
                                        var _tbody  = $('tbody', _table);

                                        $(form)[0].reset();
                                        $('#member_info').empty();
                                        $('.info_shipping_method').hide();
                                        _tbody.empty().append(_trEmpty);
                                        calculateTotalPayment();
                                    }else{
                                        var _type   = 'warning';
                                        var _icon   = 'fa fa-exclamation-circle';
                                    }
                                    App.notify({
                                        icon: _icon, 
                                        message: response.message, 
                                        type: _type,
                                    });
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                App.notify({
                                    icon: 'fa fa-exclamation-circle', 
                                    message: 'Terjadi kesalahan sistem! Ulangi proses beberapa saat lagi.', 
                                    type: 'warning',
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };

    // ---------------------------------
    // Handle General
    // ---------------------------------
    var handleGeneralPINGenerate = function() {
        // Button Add Product Promo Data 
        // -----------------------------------------------
        $("body").delegate( "#select_product", "change", function( e ) {
            e.preventDefault();
            $('#btn-add-pin-item').trigger('click');
        });

        // Button Add Product Promo Data 
        // -----------------------------------------------
        $("body").delegate( "#btn-add-pin-item", "click", function( e ) {
            e.preventDefault();
            var product     = $('#select_product', _form).val();
            if ( product ) {
                addProductPIN();
            } else {
                bootbox.alert('Produk belum di pilih !');
                $('#select_product', _form).val('');
            }
            return false;
        });

        // Button Add Product Promo Data 
        // -----------------------------------------------
        $("body").delegate( ".btn-remove-pin-item", "click", function( e ) {
            e.preventDefault();
            var rowid    = $(this).data('id');
            removeProductPIN(rowid);
            calculateTotalPayment();
            return false;
        });

        // Change Minus Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".btn-pin-minus-qty", "click", function( e ) {
            e.preventDefault();
            var step    = $(this).data('step');
            var count   = $(this).closest(".pin-quantity").find('.pin-item-qty').val();
            var countEl = $(this).closest(".pin-quantity").find('.pin-item-qty');

            if ( parseInt(count) >= 0 ) {
                count = parseInt(count) - parseInt(step);
                countEl.val(count).change();
            }
        });

        // Change Plus Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".btn-pin-plus-qty", "click", function( e ) {
            e.preventDefault();
            var step    = $(this).data('step');
            var count   = $(this).closest(".pin-quantity").find('.pin-item-qty').val();
            var countEl = $(this).closest(".pin-quantity").find('.pin-item-qty');

            count = parseInt(count) + parseInt(step);
            countEl.val(count).change();
        });

        // Change Qty Product 
        // -----------------------------------------------
        $("body").delegate( ".pin-item-qty", "change", function( e ) {
            e.preventDefault();
            var check_stock = $('#select_product', _form).data('stock');
            var rowid       = $(this).data('rowid');
            var stock       = $(this).data('stock');
            var qty         = $(this).val();
            if ( qty == '' ) {
                qty = 0;
            }

            if ( parseInt(qty) == 0 ) {
                removeProductPIN(rowid);
            }

            if ( check_stock ) {
                if ( qty > stock ) {
                    bootbox.alert(`Mohon gunakan qty produk ini tidak lebih dari <b>${stock}</b>`);
                    $(this).val(stock);
                }
            }
            
            calculateTotalPayment();
            return false;
        });

        // Change Price Product 
        // -----------------------------------------------
        $("body").delegate( ".pin-item-price", "blur", function( e ) {
            e.preventDefault();            
            calculateTotalPayment();
            return false;
        });

        // Change Shipping Method
        // -----------------------------------------------
        $("body").delegate( "#shipping_method", "change", function( e ) {
            e.preventDefault();
            var val = $(this).val();
            if ( val == 'ekspedisi' ) {
                $('.info_shipping_method').show();
            } else {
                $('.info_shipping_method').hide();
            }
            return false;
        });
    };

    // ---------------------------------
    // Add Product PIN
    // ---------------------------------
    var addProductPIN = function() {
        var _table          = $('#list_table_product_pin_generate');
        var _tbody          = $('tbody', _table);
        var _tr             = $('tr', _tbody);
        var _count_data     = _tr.length;
        var _empty_row      = _tbody.find('tr.pin_item_empty');
        var id_product      = $('#select_product', _form).val();
        var check_stock     = $('#select_product', _form).data('stock');
        var t_product       = $('select[name="select_product"] option:selected').text();
        var n_product       = $('#select_product', _form).children("option:selected").data('name');
        var n_varian        = $('#select_product', _form).children("option:selected").data('varian');
        var img_product     = $('#select_product', _form).children("option:selected").data('image');
        var bv_product      = $('#select_product', _form).children("option:selected").data('bv');
        var price_product   = $('#select_product', _form).children("option:selected").data('price');
        var weight_product  = $('#select_product', _form).children("option:selected").data('weight');
        var stock_product   = $('#select_product', _form).children("option:selected").data('stock');
        stock_product       = stock_product ? stock_product : 0;

        if ( id_product == '' || id_product == 0 || id_product == undefined ) {
            bootbox.alert('Produk belum di pilih !');
            $('#select_product', _form).val('');
            return false;
        }

        if ( check_stock ) {
            if ( stock_product == '' || stock_product == 0 || stock_product == undefined ) {
                bootbox.alert('Maaf, Stok Produk ini tidak tersedia');
                return false;
            }
        }

        if( $('[data-id="'+id_product+'"]', _tbody).length ) {
            bootbox.alert('Produk ini sudah ada ');
            return false;
        }

        if ( _empty_row.length ) {
            _empty_row.remove();
        }

        var t_varian    = '';
        if ( n_varian ) {
            t_varian    = `<div class="text-sm mb-0">Varian: <span class="font-weight-bolder text-default">${n_varian}</span></div>`;
        }

        var qty_product = 1;
        var subtotal    = parseInt(qty_product) * parseInt(price_product);

        var _append_row = `
            <tr class="pin_item" data-id="${id_product}" data-stock="${stock_product}" data-bv="${bv_product}" data-weight="${weight_product}">
                <td class="text-center">*</td>
                <td class="px-1">
                    <div class="media align-items-center" style="white-space: normal">
                        <a href="#" class="avatar mr-3">
                            <img alt="Image placeholder" src="${img_product}">
                        </a>
                        <div class="media-body">
                            <div class="mb-0">${n_product}</div>
                            ${t_varian}
                            <div class="small text-dark">Stok: <b>${ App.formatCurrency(stock_product) }</b></div>
                        </div>
                    </div>
                </td>
                <td class="budget px-1">
                    <input class="form-control form-control-sm text-right numbercurrency pin-item-price pin-price-${id_product}"
                        type="text" data-rowid="${id_product}" name="products[${id_product}][price]" value="${price_product}" title="Price" />
                </td>
                <td class="text-center">
                    <div class="input-group input-group-sm pin-quantity">
                        <div class="input-group-prepend">
                            <button class="btn btn-sm btn-outline-dark btn-pin-minus-qty" type="button" data-step="1">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input class="form-control form-control-sm text-center numbermask pin-item-qty pin-qty-${id_product}" type="text" step="1" 
                            data-rowid="${id_product}"
                            data-stock="${stock_product}"
                            name="products[${id_product}][qty]"
                            value="${qty_product}"
                            title="Qty" pattern="[0-9]*" inputmode="numeric" 
                            style="background-color: transparent !important; border-color: #172b4d; border-left: none;" />
                        <div class="input-group-append">
                            <button class="btn btn-sm btn-outline-dark btn-pin-plus-qty" type="button" data-step="1">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="budget text-right">
                    <span class="heading font-weight-bold pin-item-subtotal pin-subtotal-${id_product}">
                        ${ App.formatCurrency(subtotal) }
                    </span>
                </td>
                <td class="text-center px-1">
                    <button class="btn btn-sm btn-outline-warning btn-remove-pin-item" type="button" data-id="${id_product}" title="Hapus Produk">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            </tr>`;
        _tbody.append(_append_row);
        $('#select_product', _form).val('');
        calculateTotalPayment();
        InputMask.init();
        return false;
    };

    // ---------------------------------
    // Remove Product PIN
    // ---------------------------------
    var removeProductPIN = function(rowid = '') {
        var _table      = $('#list_table_product_pin_generate');
        var _tbody      = $('tbody', _table);
        var _tr         = $('[data-id="'+rowid+'"]', _tbody);
        var _count_data = $('tr', _tbody).length;
        
        if ( rowid ) {
            if( _tr.length ) {
                _tr.remove();
                if ( _count_data == 1 ) {
                    _tbody.append(_trEmpty);
                }
            }
        }
    };

    // ---------------------------------
    // Calculate Total Payment
    // ---------------------------------    
    var calculateTotalPayment = function() {
        var _total_qty          = 0;
        var _total_bv           = 0;
        var _total_price        = 0;
        var _total_weight       = 0;
        var _total_weight       = 0;

        total_discount          = 0;
        var el_pin_generate     = $('.pin_item');

        if ( el_pin_generate.length ) {
            el_pin_generate.each(function(index) {
                _idx            = $(this).data('id');
                bv              = $(this).data('bv');
                weight          = $(this).data('weight');
                qty             = $('.pin-qty-'+_idx).val();
                price           = $('.pin-price-'+_idx).val();
                price           = price.replace(/\./g, '');
                price           = parseInt(price) || 0;
                
                qty             = parseInt(qty) || 0;
                subtotal        = parseInt(qty) * parseInt(price);
                subtotal_bv     = parseInt(qty) * parseInt(bv);
                _total_qty      = parseInt(_total_qty) + parseInt(qty);
                _total_bv       = parseInt(_total_bv) + parseInt(subtotal_bv);
                _total_price    = parseInt(_total_price) + parseInt(subtotal);
                _total_weight   = parseInt(_total_weight) + ( parseInt(qty) * parseInt(weight) );

                if ( $('.pin-subtotal-'+_idx).length ) {
                    $('.pin-subtotal-'+_idx).text(App.formatCurrency(subtotal));
                }
            });
        }

        total_qty               = parseInt(_total_qty);
        total_bv                = parseInt(_total_bv);
        total_payment           = parseInt(_total_price);
        total_weight            = parseInt(_total_weight);
        subtotal                = total_payment;

        if ( $('#discount').length ) {
            total_payment       = parseInt(_total_price) - parseInt(total_discount);
        }

        if ( $('#percent_discount').length ) {
            discount            = $('#percent_discount').text();
            discount            = parseInt(discount) || 0;
            if ( discount > 0 ) {
                total_discount  = ( subtotal * discount ) / 100;
                total_payment   = parseInt(subtotal) - parseInt(total_discount);
            }
        }

        if ( $('input[name="total_bv"]').length ) {
            $('input[name="total_bv"]').val(App.formatCurrency(total_bv));
        }

        if ( $('input[name="total_discount"]').length ) {
            $('input[name="total_discount"]').val(App.formatCurrency(total_discount));
        }

        if ( $('input[name="total_payment"]').length ) {
            $('input[name="total_payment"]').val(App.formatCurrency(total_payment));
        }

        if ( $('.pin-total-payment').length ) {
            $('.pin-total-payment').text(App.formatCurrency(subtotal));
        }
        // $('.total-weight').text('( ' + App.formatCurrency(total_weight, '') + ' gr )');
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationPINGenerate();
            handleGeneralPINGenerate();
        },
        initTotalPayment: function () {
            calculateTotalPayment();
        }
    };
}();

// ============================================================
// Form Validation PIN Transfer
// ============================================================
var FV_PINTransfer = function () {    
    // ---------------------------------
    // Handle Validation 
    // ---------------------------------
    var handleValidationPINTransfer = function() {
        var form            = $('#form-pin-transfer');
        var wrapper         = $('.wrapper-form-pin-transfer');

        if ( ! form.length ) {
            return;
        }

        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                username: {
                    required: true
                },
                pin_qty: {
                    required: true
                },
                password_confirm: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').length > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').length > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').length > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').length > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'Ada beberapa error, silahkan cek formulir di bawah!', 
                    container: wrapper, 
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                bootbox.confirm("Apakah anda yakin akan Transfer Produk ke member ini ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        var _type = 'success';
                                        var _icon = 'fa fa-check-circle';
                                        $(form)[0].reset();
                                        $('#member_info').empty();
                                        setTimeout(function(){ location.reload(); }, 700);
                                    }else{
                                        var _type = 'warning';
                                        var _icon = 'fa fa-exclamation-circle';
                                    }
                                    App.notify({
                                        icon: _icon, 
                                        message: response.message, 
                                        type: _type,
                                    });
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                App.notify({
                                    icon: 'fa fa-exclamation-circle', 
                                    message: 'Terjadi kesalahan sistem! Ulangi proses beberapa saat lagi.', 
                                    type: 'warning',
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationPINTransfer();
        },
    };
}();

// ============================================================
// Form Validation eWallet Transfer
// ============================================================
var FV_eWalletTransfer = function () {  
    var form_transfer   = $('#form-ewallet-transfer');
    var wrapper         = $('.wrapper-form-ewallet-transfer');
    var saldo           = $(form_transfer).data('saldo');
    var minimal         = $(form_transfer).data('min');
    minimal             = parseInt(minimal) || 1;

    // ---------------------------------
    // Handle Validation eWallet Transfer 
    // ---------------------------------
    var handleValidationeWalletTransfer = function() {
        if ( ! form_transfer.length ) {
            return;
        }

        form_transfer.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                username: {
                    required: true
                },
                nominal: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'fa fa-exclamation-triangle', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                var total_payment   = $('input[name="nominal"]', form_transfer).val();
                total_payment       = total_payment.replace(/\./g,'');
                total_payment       = parseInt(total_payment) || 0;
                saldo               = parseInt(saldo) || 0;

                if ( $('.alert-notify').length ) {
                    $('.alert-notify').remove();
                }

                if ( total_payment > saldo ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Your Saldo Wallet is not sufficient for this Trnasfer ! !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_transfer).focus();
                    return false;
                }

                if ( minimal > total_payment ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Minimal Trnasfer '+ App.formatCurrency(minimal, 'Rp'), 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_transfer).focus();
                    return false;
                }

                if ( ! total_payment || total_payment == '' || total_payment == 0 || total_payment == undefined ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Transaction cannot be processed. Nominal is required !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_transfer).focus();
                    return false;
                }
                bootbox.confirm("Is the eWallet Transfer data correct  ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        if ( $('#modal-form-ewallet-transfer').length ) {
                                            $('#modal-form-ewallet-transfer').modal('hide');
                                        }
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationeWalletTransfer();
        },
    };
}();

// ============================================================
// Form Validation Withdraw
// ============================================================
var FV_Withdraw = function () {  
    var form_withdraw   = $('#form-withdraw');
    var wrapper         = $('.wrapper-form-withdraw');
    var saldo           = $(form_withdraw).data('saldo');
    var minimal         = $(form_withdraw).data('min');
    minimal             = parseInt(minimal) || 1;

    // ---------------------------------
    // Handle Validation Withdraw 
    // ---------------------------------
    var handleValidationWithdraw = function() {
        if ( ! form_withdraw.length ) {
            return;
        }

        form_withdraw.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                member_bank: {
                    required: true
                },
                member_bill: {
                    required: true
                },
                member_bill_name: {
                    required: true
                },
                nominal: {
                    required: true
                },
                wallet_address: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'fa fa-exclamation-triangle', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                var total_payment   = $('input[name="nominal"]', form_withdraw).val();
                total_payment       = total_payment.replace(/\./g,'');
                total_payment       = parseInt(total_payment) || 0;
                saldo               = parseInt(saldo) || 0;

                if ( $('.alert-notify').length ) {
                    $('.alert-notify').remove();
                }

                if ( total_payment > saldo ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Your Saldo Wallet is not sufficient for this withdraw ! !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_withdraw).focus();
                    return false;
                }

                if ( minimal > total_payment ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Minimal Withdraw '+ App.formatCurrency(minimal), 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_withdraw).focus();
                    return false;
                }

                if ( ! total_payment || total_payment == '' || total_payment == 0 || total_payment == undefined ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Transaction cannot be processed. Nominal is required !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_withdraw).focus();
                    return false;
                }
                bootbox.confirm("Is the withdraw data correct  ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        if ( $('#modal-form-withdraw').length ) {
                                            $('#modal-form-withdraw').modal('hide');
                                        }
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    // ---------------------------------
    // Handle Form Transfer 
    // ---------------------------------
    var handleFormWithdraw = function() {
        // Send OTP Code
        $("body").delegate( "#btn_send_otp", "click", function( e ) {
            e.preventDefault();
            var url             = $(this).data('url');
            if ( ! url || url == '' || url == undefined ) {
                return;
            }
            $.ajax({
                type:   "POST",
                 url:    url,
                beforeSend: function (){
                    if ( $('.alert-notify').length ) {
                        $('.alert-notify').remove();
                    }
                    $('#btn_send_otp').addClass('pl-5');
                    $('#btn_send_otp').append('<span class="spinner-border spinner-otp text-white" style="left:12px; background: transparent; z-index: 999;"></span>');
                },
                success: function( response ){
                    response = $.parseJSON(response);
                    if( response.status == 'login' ){
                        $(location).attr('href',response.url);
                    }else{
                        if( response.status == 'success'){
                            var _icon = 'fa fa-check-circle';
                            var _type = 'success';
                        }else{
                            var _icon = 'fa fa-exclamation-triangle';
                            var _type = 'danger';
                        }
                        setTimeout(function(){ 
                            $('.spinner-otp').remove();
                            $('#btn_send_otp').removeClass('pl-5');
                            App.notify({
                                message: response.message, 
                                icon: _icon, 
                                type: _type,
                            });
                        }, 1000);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ) {
                    App.close_Loader();
                    bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                        location.reload();
                    });
                }
            });
            return false;
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationWithdraw();
            handleFormWithdraw();
        },
    };
}();

// ============================================================
// Form Validation Deposit
// ============================================================
var FV_Deposit = function () {  
    var form_deposit    = $('#form-deposit');
    var wrapper         = $('.wrapper-form-deposit');
    var saldo           = $(form_deposit).data('saldo');
    var minimal         = $(form_deposit).data('min');
    minimal             = parseInt(minimal) || 1;

    // ---------------------------------
    // Handle Validation Withdraw 
    // ---------------------------------
    var handleValidation = function() {
        if ( ! form_deposit.length ) {
            return;
        }

        form_deposit.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                search_stockist: {
                    required: true
                },
                nominal: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'fa fa-exclamation-triangle', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                var total_payment   = $('input[name="nominal"]', form_deposit).val();
                total_payment       = total_payment.replace(/\./g,'');
                total_payment       = parseInt(total_payment) || 0;

                if ( $('.alert-notify').length ) {
                    $('.alert-notify').remove();
                }

                if ( minimal > total_payment ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Minimal Withdraw '+ App.formatCurrency(minimal), 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_deposit).focus();
                    return false;
                }

                if ( ! total_payment || total_payment == '' || total_payment == 0 || total_payment == undefined ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Transaction cannot be processed. Nominal is required !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_deposit).focus();
                    return false;
                }
                bootbox.confirm("Apakah data deposit sudah benar ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        bootbox.alert(response.message, function(){ 
                                            if ( $('#card-form-deposit').length ) {
                                                $('#card-form-deposit').slideUp('hide');
                                            }
                                            if ( $('#card-form-deposit').length ) {
                                                $('#card-form-deposit').slideUp('hide');
                                            }
                                            if ( $('#btn_list_table_deposite').length ) {
                                                $('#btn_list_table_deposite').trigger('click');
                                            }
                                            if ( $('#btn_list_table_deposite_history').length ) {
                                                $('#btn_list_table_deposite_history').trigger('click');
                                            }
                                            if ( $('#btn-add-deposite').length ) {
                                                $('#btn-add-deposite').show();
                                            }
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    // ---------------------------------
    // Handle Form General 
    // ---------------------------------
    var handleFormGeneral = function() {
        // Send OTP Code
        $("body").delegate( "#btn-cancel-deposit", "click", function( e ) {
            e.preventDefault();
            if ( $('#card-form-deposit').length ) {
                $('#card-form-deposit').slideUp('hide');
            }
            if ( $('#btn-add-deposite').length ) {
                $('#btn-add-deposite').show();
            }

            if ($('.alert').length) { $('.alert').remove(); }
            if ($('.alert-notify').length) { $('.alert-notify').remove(); }
            $('input[name="search_stockist"]', form_deposit).parent().parent().removeClass('has-danger');
            $('input[name="search_stockist"]', form_deposit).parent().parent().find('.invalid-feedback').empty().hide();
            $('input[name="nominal"]', form_deposit).parent().parent().removeClass('has-danger');
            $('input[name="nominal"]', form_deposit).parent().parent().find('.invalid-feedback').empty().hide();
            $('input[name="password"]', form_deposit).parent().parent().removeClass('has-danger');
            $('input[name="password"]', form_deposit).parent().parent().find('.invalid-feedback').empty().hide();
            return false;
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidation();
            handleFormGeneral();
        },
    };
}();

// ============================================================
// Form Validation Withdraw
// ============================================================
var FV_FlipToppup = function () {  
    var form_topup      = $('#form-flip-topup');
    var wrapper         = $('.wrapper-form-flip-topup');
    var minimal         = $(form_topup).data('min');
    minimal             = parseInt(minimal) || 100000;

    // ---------------------------------
    // Handle Validation Topup Flip 
    // ---------------------------------
    var handleValidationTopupFlip = function() {
        if ( ! form_topup.length ) {
            return;
        }

        form_topup.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                nominal: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'fa fa-exclamation-triangle', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                var total_payment   = $('input[name="nominal"]', form_topup).val();
                total_payment       = total_payment.replace(/\./g,'');
                total_payment       = parseInt(total_payment) || 0;

                if ( $('.alert-notify').length ) {
                    $('.alert-notify').remove();
                }

                if ( minimal > total_payment ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Minimal Topup '+ App.formatCurrency(minimal), 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_topup).focus();
                    return false;
                }

                if ( ! total_payment || total_payment == '' || total_payment == 0 || total_payment == undefined ) {
                    App.alert({
                        type: 'danger',
                        icon: 'fa fa-exclamation-triangle', 
                        message: 'Transaction cannot be processed. Nominal is required !', 
                        container: wrapper, 
                        closeInSeconds: 5,
                        place: 'prepend'
                    });
                    $('input[name="nominal"]', form_topup).focus();
                    return false;
                }
                bootbox.confirm("Apakah anda yakin akan Topup Flip ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        if ( $('#modal-form-flip-topup').length ) {
                                            $('#modal-form-flip-topup').modal('hide');
                                        }
                                        bootbox.alert(response.message, function(){ 
                                            location.reload();
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'bell', 
                                            message: response.message, 
                                            container: wrapper, 
                                            closeInSeconds: 5,
                                            place: 'prepend'
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };

    // ---------------------------------
    // Handle Validation Topup Flip 
    // ---------------------------------
    var handleGeneralTopupFlip = function() {
        // Button Topup Flip
        $("body").delegate( "#btn-modal-flip-topup", "click", function( event ) {
            event.preventDefault();
            const _modal    = $('#modal-form-flip-topup');
            const _form     = $('#form-flip-topup');

            if ( !_modal.length || !_form.length ) {
                return;
            }

            _form[0].reset();
            $('input[name="nominal"]', _form).val('');
            $('input[name="nominal"]', _form).focus();
            _modal.modal({backdrop: 'static', keyboard: false, show: true});
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationTopupFlip();
            handleGeneralTopupFlip();
        },
    };
}();

// ============================================================
// Form Validation As Stockist
// ============================================================
var FV_AsStockist = function () {    
    // ---------------------------------
    // Handle Validation Generate pin
    // ---------------------------------
    var handleValidationAsStokist = function() {
        var form            = $('#form-select-stockist');
        var wrapper         = $('.wrapper-form-stockist');

        if ( ! form.length ) {
            return;
        }

        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                asmember: {
                    required: true
                },
                stockist_type: {
                    required: true
                },
                stockist_status: {
                    required: true
                },
                stockist_province: {
                    required: true
                },
                stockist_district: {
                    required: true
                },
                stockist_subdistrict: {
                    required: true
                },
                stockist_village: {
                    required: true
                },
                stockist_address: {
                    required: true
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'Ada beberapa error, silahkan cek formulir di bawah!', 
                    container: wrapper, 
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var tStockist   = $('select[name="stockist_status"] option:selected').text();
                var msg         = 'Anda yakin akan merubah tipe member ini menjadi <b>'+tStockist+'</b> ? ';
                var url         = $(form).attr('action');

                if ( $('.alert-notify').length ) { $('.alert-notify').remove(); }
                bootbox.confirm(msg, function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        $(form)[0].reset();
                                        $('#modal-form-select-stockist').modal('hide');
                                        bootbox.alert(response.message, function(){ 
                                            $('#btn_list_table_member').trigger('click');
                                        });
                                    }else{
                                        App.notify({
                                            icon: 'fa fa-exclamation-circle', 
                                            type: 'warning',
                                            message: response.message, 
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationAsStokist();
        },
    };
}();

// ============================================================
// Form Validation Status Campaign Promo
// ============================================================
var FV_StatusCampaignPromo = function () {    
    // ---------------------------------
    // Handle Validation
    // ---------------------------------
    var handleValidationStatusCP = function() {
        var form            = $('#form-status-cp');

        if ( ! form.length ) {
            return;
        }

        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                status_cp: {
                    required: true
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'Ada beberapa error, silahkan cek formulir di bawah!', 
                    container: form, 
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var tSstatus    = $('select[name="status_cp"] option:selected', $(form)).text();
                var msg         = 'Anda yakin akan merubah Status CP member ini menjadi <b>'+tSstatus+'</b> ? ';
                var url         = $(form).attr('action');

                if ( $('.alert-notify').length ) { $('.alert-notify').remove(); }
                bootbox.confirm(msg, function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        $(form)[0].reset();
                                        $('#modal-form-status-cp').modal('hide');
                                        bootbox.alert(response.message, function(){ 
                                            $('#btn_list_table_reward').trigger('click');
                                        });
                                    }else{
                                        App.notify({
                                            icon: 'fa fa-exclamation-circle', 
                                            type: 'danger',
                                            message: response.message, 
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
                return false;
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationStatusCP();
        },
    };
}();

// ============================================================
// Form Validation Staff
// ============================================================
var FV_Staff = function () {    
    // ---------------------------------
    // Handle Validation Staff
    // ---------------------------------
    var handleValidationStaff = function() {
        var form            = $('#form-staff');
        var wrapper         = $('.wrapper-form-staff');
        var action          = $(form).data('actionsubmit');   

        if ( ! form.length ) {
            return;
        }

        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                staff_username: {
                    minlength: 5,
                    required: true,
                    unamecheck: true,
                    remote: {
                        url: $("#staff_username").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            username: function() {
                                return $("#staff_username").prop( 'readonly' ) ? '' : $("#staff_username").val();
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                },
                staff_password: {
                    minlength: 6,
                    required: true,
                    pwcheck: true,
                },
                staff_password_confirm: {
                    required: true,
                    equalTo: '#staff_password'
                },
                staff_name: {
                    minlength: 3,
                    required: true,
                    lettersonly: true,
                },
                staff_phone: {
                    minlength: 8,
                    required: true,
                    remote: {
                        url: $("#staff_phone").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            phone: function() {
                                return action == 'edit' ? '' : $("#staff_phone").val();
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                },
                staff_email: {
                    email: true,
                    required: true,
                    remote: {
                        url: $("#staff_email").data('url'),
                        type: "post",
                        data: {
                            [App.dhaName()]: function() {
                                return App.dhaToken();
                            },
                            email: function() {
                                return action == 'edit' ? '' : $("#staff_email").val();
                            }
                        },
                        dataFilter: function(response) {
                            response = $.parseJSON(response);
                            if ( response.token ) {
                                App.dhaToken(response.token);
                            }
                            return response.status;
                        }
                    }
                }
            },
            messages: {
                staff_username: {
                    remote: "Username sudah digunakan. Silahkan gunakan username lain",
                },
                staff_password_confirm: {
                    equalTo: "Password konfirmasi tidak cocok dengan password yang di atas",
                },
                staff_email: {
                    remote: "Email sudah digunakan. Silahkan gunakan email lain",
                },
                staff_phone: {
                    remote: "No. Telp/HP sudah digunakan. Silahkan gunakan No. Telp/HP lain",
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').length > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').length > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').length > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').length > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below !', 
                    container: wrapper, 
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                bootbox.confirm("Apakah anda yakin akan simpan data Staff ini ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                response = $.parseJSON(response);
                                App.close_Loader();

                                if ( response.token ) {
                                    App.dhaToken(response.token);
                                }
                                
                                if( response.status == 'access_denied' ){
                                    $(location).attr('href',response.url);
                                }else{
                                    if( response.status == 'success'){
                                        $(form)[0].reset();
                                        bootbox.alert(response.message, function(){ 
                                            if ( response.url ) {
                                                $(location).attr('href', response.url);
                                            } else {
                                                location.reload();
                                            }
                                        });
                                    }else{
                                        App.alert({
                                            type: 'danger', 
                                            icon: 'fa fa-exclamation-triangle', 
                                            message: response.message, 
                                            container: wrapper, 
                                            place: 'prepend',
                                            closeInSeconds: 5,
                                        });
                                    }
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
            }
        });

        $.validator.addMethod("pwcheck", function(value) {
            return /[a-z].*[0-9]|[0-9].*[a-z]/i.test(value); // consists of only these
        }, "Password must be a combination of letters and numbers" );
        
        $.validator.addMethod("unamecheck", function(value) {
            return /^[A-Za-z0-9]{4,16}$/i.test(value);   // consists of only these
        }, "Username tidak memenuhi kriteria" );
        
        $.validator.addMethod("lettersonly", function(value, element) {
            return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
        }, "Silahkan inputkan Nama dengan huruf saja" );
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationStaff();
        },
    };
}();

// ============================================================
// Form Validation Setting Withdraw
// ============================================================
var FV_SettingWithdraw = function () {    
    // ---------------------------------
    // Handle Validation Setting Withdraw
    // ---------------------------------
    var handleValidationSettingWithdraw = function() {
        var form        = $( '#form-setting-wd' );
        var wrapper     = $( '.wrapper-setting-withdraw' );

        if ( ! form.length ) {
            return;
        }
        
        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                wd_min: {
                    required: true,
                },
                wd_fee: {
                    required: true,
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit 
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'There are some errors, please check the form below!',
                    container: wrapper,
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url         = $(form).attr('action');
                bootbox.confirm("Update Withdraw (Bonus) Setting ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                App.close_Loader();
                                response = $.parseJSON(response);
                                var alert_type = 'danger';
                                var alert_icon = 'fa fa-exclamation-triangle';
                                if ( response.status == 'login' ) {
                                    $(location).attr('href', response.url);
                                }
                                if ( response.status == 'success' ) {
                                    alert_type = 'success';
                                    alert_icon = 'fa fa-check';
                                }
                                App.alert({
                                    type: alert_type,
                                    icon: alert_icon,
                                    message: response.message,
                                    container: wrapper,
                                    closeInSeconds: 5,
                                    place: 'prepend'
                                });
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    var handleValidationSettingWithdrawFee = function() {
        var form        = $( '#form-setting-wd-fee' );
        var wrapper     = $( '.wrapper-setting-withdraw-fee' );

        if ( ! form.length ) {
            return;
        }
        
        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                wd_fee_min: {
                    required: true,
                },
                wd_fee_fee: {
                    required: true,
                }
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit 
                App.alert({
                    type: 'danger',
                    icon: 'warning',
                    message: 'There are some errors, please check the form below!',
                    container: wrapper,
                    closeInSeconds: 5,
                    place: 'prepend'
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                var url         = $(form).attr('action');
                bootbox.confirm("Update Withdraw (Fee) Setting ?", function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   $(form).serialize(),
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                App.close_Loader();
                                response = $.parseJSON(response);
                                var alert_type = 'danger';
                                var alert_icon = 'fa fa-exclamation-triangle';
                                if ( response.status == 'login' ) {
                                    $(location).attr('href', response.url);
                                }
                                if ( response.status == 'success' ) {
                                    alert_type = 'success';
                                    alert_icon = 'fa fa-check';
                                }
                                App.alert({
                                    type: alert_type,
                                    icon: alert_icon,
                                    message: response.message,
                                    container: wrapper,
                                    closeInSeconds: 5,
                                    place: 'prepend'
                                });
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationSettingWithdraw();
            handleValidationSettingWithdrawFee();
        },
    };
}();

// ============================================================
// Form Validation Notification
// ============================================================
var FV_Notification = function () {    
    // ---------------------------------
    // Handle Validation Notification
    // ---------------------------------
    var handleValidationUpdateNotification = function() {
        // for more info visit the official plugin documentation: 
        // http://docs.jquery.com/Plugins/Validation

        var form        = $('#form_notif_edit');
        var wrapper     = $('.wrapper_notif_edit');
        
        form.validate({
            errorElement: 'div', //default input error message container
            errorClass: 'invalid-feedback', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                notif_id: {
                    required: true
                },
                notif_type: {
                    required: true
                },
                notif_title: {
                    required: true
                },
                notif_status: {
                    required: true
                },
            },
            errorPlacement: function (error, element) { // render error placement for each input type
                if (element.parent(".input-group").length > 0) {
                    error.insertAfter(element.parent(".input-group"));
                } else if (element.attr("data-error-container")) { 
                    error.appendTo(element.attr("data-error-container"));
                } else if (element.parents('.radio-list').length > 0) { 
                    error.appendTo(element.parents('.radio-list').attr("data-error-container"));
                } else if (element.parents('.radio-inline').length > 0) { 
                    error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
                } else if (element.parents('.checkbox-list').length > 0) {
                    error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
                } else if (element.parents('.checkbox-inline').length > 0) { 
                    error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit              
                App.alert({
                    type: 'danger', 
                    icon: 'bell', 
                    message: 'There are some errors, please check the form below!', 
                    container: wrapper, 
                    place: 'prepend',
                    closeInSeconds: 5,
                });
            },
            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                $(element).closest('.help-block').remove();
            },
            success: function (label) {
                label.closest('.form-group').removeClass('has-error'); // set success class to the control group
                label.closest('.help-block').remove();
            },
            submitHandler: function (form) {
                var url             = $(form).attr('action');
                var notif_id        = $('input[name=notif_id]', $(form)).val();
                var notif_type      = $('input[name=notif_type]', $(form)).val();
                var notif_title     = $('input[name=notif_title]', $(form)).val();
                var notif_status    = $('select[name=notif_status]', $(form)).val();
                var content_plain   = $('textarea[name=notif_content_plain]', $(form)).val();
                var content_email   = CKEDITOR.instances['notif_content_email'].getData();

                var data = {
                    'notif_id'      : notif_id,
                    'notif_type'    : notif_type,
                    'notif_title'   : notif_title,
                    'notif_status'  : notif_status,
                    'content_plain' : content_plain,
                    'content_email' : content_email
                }

                bootbox.confirm('Apakah anda yakin akan edit Notifikasi ini ?', function(result) {
                    if( result == true ){
                        $.ajax({
                            type:   "POST",
                            url:    url,
                            data:   data,
                            beforeSend: function (){
                                App.run_Loader('timer');
                            },
                            success: function( response ){
                                App.close_Loader();
                                response = $.parseJSON(response);
                                if(response.status == 'login'){
                                    $(location).attr('href',response.login);
                                    return false;
                                }else{
                                    if(response.status == 'success'){
                                        var type = 'success';
                                        var icon = 'check';
                                        wrapper  = $('#notification_list').parents('.dataTables_wrapper');
                                        $('#modal-form-notification').modal('hide');
                                        $('#btn_notification_list').trigger('click');
                                    }else{
                                        var type = 'danger';
                                        var icon = 'warning';
                                    }
                                    App.alert({
                                        type: type,
                                        icon: icon,
                                        message: response.message,
                                        container: wrapper,
                                        closeInSeconds: 3,
                                        place: 'prepend'
                                    });
                                    return false;
                                }
                            },
                            error: function( jqXHR, textStatus, errorThrown ) {
                                App.close_Loader();
                                bootbox.alert('A system error occurred! Repeat the process in a few more moments.', function(){ 
                                    location.reload();
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    
    return {
        //main function to initiate the module
        init: function () {
            handleValidationUpdateNotification();
        },
    };
}();