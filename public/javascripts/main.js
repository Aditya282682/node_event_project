function customAjaxCall(url, data, actionFunction, loadIcon) {
    $.ajax({
        url: url,
        data: data,
        type: 'post',
        dataType: "json",
        beforeSend: function () {
            if (loadIcon === 1) {
                //to do loading

                $('.loading').show();
            }
        },
        complete: function () {

            //$('.loading').hide();
        },
        success: function (output) {

            if (output.redirect) {
                // data.redirect contains the string URL to redirect to
                window.location.href = output.redirect;
            }
            else {

                //this is the function defined for the action 
                actionFunction(output);
            }
        }
    });
}

function sweet_alert(code,message){
    if(code == 103){
        swal({
            title: '',
            text: message,
            timer: 1000,
            type: 'success',
            showConfirmButton:false,
        });
    }else{
        swal({
            title: '',
            text: message,
            timer: 1500,
            type: 'error',
            showConfirmButton:false,
        });
    }
}