'use strict';

function clearFormErrors() {
    $('.form-group').each( function(index, element) {
        $(element).removeClass('has-error');
    });
}

function resetForm() {
    $('#frmAddProduct')[0].reset();
    clearFormErrors();
}

function isFormValid() {
    
    var formStatus = true;

    $('.form-control').each( function(index, element) {
        
        if ($(element).val().length === 0) {
            formStatus = false;
            $(element).parent().addClass('has-error');
        }
    });

    // for image url
    var inputImageUrl = $('.form-control#image').val();
    var validUrlFormat = new RegExp('(http|ftp|https)://[a-z0-9\-_]+(\.[a-z0-9\-_]+)+([a-z0-9\-\.,@\?^=%&;:/~\+#]*[a-z0-9\-@\?^=%&;/~\+#])?', 'i');

    if (!validUrlFormat.test(inputImageUrl)) {
        formStatus = false;
        $('.form-control#image').parent().addClass('has-error');
    }

    // for price
    var inputPrice = $('.form-control#price').val();
    var validPriceFormat = /^[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i;

    if (!validPriceFormat.test(inputPrice)) {
        formStatus = false;
        $('.form-control#price').parent().addClass('has-error');
    }

    // for Weight
    var inputWeight = $('.form-control#weight').val();
    var validWeightFormat = /^[0-9]*[0-9]\.?[0-9]{0,2}$/i;

    if (!validWeightFormat.test(inputWeight)) {
        formStatus = false;
        $('.form-control#weight').parent().addClass('has-error');
    }

    return formStatus;
}

$(document).ready(function() {

    $('ul.nav a').filter(function() {
        return this.href === window.location.href;
    }).parent().addClass('active');
    
    $('#btnSaveProduct').click(function() {

        $('#add-product_status-success').hide();
        $('#add-product_status-error').hide();
        clearFormErrors();

        if (isFormValid()) {
            
            $.ajax({
                method: 'POST',
                url: '/add-product',
                data: $('#frmAddProduct').serialize(),
                dataType: 'json'
            })
            .done (function(data, textStatus, jqXHR) { 
                resetForm();
                $('#add-product_status-success').show();
            })
            .fail (function(jqXHR, textStatus, errorThrown) { 
                $('#add-product_status-error').show();
            })
        }
        
        return false;
        
    });

    
    $('#btnResetProduct').click(function() {

        $('#add-product_status-success').hide();
        $('#add-product_status-error').hide();

        resetForm();
        return false;
    });

    $('.color-box').each( function(index, element) {
        var colour = $(element).has('span').text();
        $(element).css('background-color', colour);
    });

});
