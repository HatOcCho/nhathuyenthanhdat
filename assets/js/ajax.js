/* 
 * Subscribe to our newsletter
 */
$("#Subscribe").on('click', function () {
    var email = $('#subscribeEmail').val();
    var baseUrl = getBaseURL();
    $.ajax({
        type: "POST",
        url: baseUrl + "Newsletter/subscribeNewsletter",
        data: {emailid: email},
        dataType: "html",
        beforeSend: function () {
            $("#subscrive_response_div").html("<center><img src='" + baseUrl + "assets/images/ajaxloader.gif'/></center>");
            ajaxLoaderShow();
        },
        success: function (data) {
            $('#subscrive_response_div').html(data);
            ajaxLoaderHide();
        },
        error: function () {
            alert("Response Failure !!!");
            ajaxLoaderHide();
        }
    });
});

$("#login").on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var baseUrl = getBaseURL();
    $.ajax({
        type: "POST",
        url: baseUrl + "User/userLoginAction",
        data: {username: username, password: password},
        dataType: "json",
        beforeSend: function () {
            $("#userLoginResponse").html("<center><img src='" + baseUrl + "assets/images/loading.gif' style='height:50px;'/></center>");
            //ajaxLoaderShow();
        },
        success: function (data) {
            if (data['status'] == 'error') {
                $('#userLoginResponse').html(bootstrap_alert('danger', data['msg']));
                //ajaxLoaderHide();
            }
            if (data['status'] == 'success') {
                $('#userLoginResponse').html(bootstrap_alert('success', data['msg']));
                location.reload();
            }
        },
        error: function () {
            alert("Response Failure !!!");
            //ajaxLoaderHide();
        }
    });
});

$("#customerState").on('change', function () {
    var stateId = $('#customerState').val();
    var baseUrl = getBaseURL();
    $.ajax({
        type: "POST",
        url: baseUrl + "Csc/getCustomerCityList",
        data: {stateId: stateId},
        dataType: "html",
        beforeSend: function () {
            $("#waitCityResponse").html("<img src='" + baseUrl + "assets/images/loading.gif' style='height:30px;'/>");
            ajaxLoaderShow();
        },
        success: function (data) {
            $('#customerCity').html(data);
            $("#waitCityResponse").html('');
            ajaxLoaderHide();
        },
        error: function () {
            alert("Response Failure !!!");
            ajaxLoaderHide();
        }
    });
});

$("#distributor_state").on('change', function () {
    alert(1)
    var stateId = $('#distributor_state').val();
    var baseUrl = getBaseURL();
    $.ajax({
        type: "POST",
        url: baseUrl + "Csc/getCustomerCityList",
        data: {stateId: stateId},
        dataType: "html",
        beforeSend: function () {
            $("#waitCityResponse").html("<img src='" + baseUrl + "assets/images/loading.gif' style='height:30px;'/>");
            ajaxLoaderShow();
        },
        success: function (data) {
            $('#distributor_city').html(data);
            $("#waitCityResponse").html('');
            ajaxLoaderHide();
        },
        error: function () {
            //alert("Response Failure !!!");
            ajaxLoaderHide();
        }
    });
});

function getUserDetails(userid) {
    var baseUrl = getBaseURL();
    ajaxLoaderShow();
    $.ajax({
        type: "POST",
        url: baseUrl + "User/getUserDetails",
        data: {userid: userid},
        dataType: "json",
        success: function (data) {
            $("#e_usertype").val(data[0].usertype);
            /*$("#e_usertype").selectpicker('refresh');*/

            $("#e_name").val(data[0].name);
            $("#e_email").val(data[0].email);
            $("#e_mobile").val(data[0].mobile);
            $("#e_password").val(data[0].password);
            $("#editid").val(data[0].id);
            ajaxLoaderHide();
        },
        error: function () {
            //alert("Response Failure !!!");
        }
    });
}

function changeStatus(status, table, id, id_attribute, moduleid) {
    var baseUrl = getBaseURL();
    $.ajax({
        type: "POST",
        url: baseUrl + "data/changeStatus",
        data: {status: status, id: id, table: table, id_attribute, moduleid: moduleid},
        dataType: "html",
        beforeSend: function () {
            $("#response_status_" + id).html("<center><img src='" + baseUrl + "assets/images/loading_xxsmall.gif' style='height:22px;'/></center>");
        },
        success: function (data) {
            if (data != 0) {
                $("#response_status_" + id).html(data);
            } else {
                location.reload();
            }
        },
        error: function () {
            //alert("Response Failure !!!");
        }
    });
}

//-------------------Cart Action----------------------------------
function addToCart(pid, quantity = '1') {
    //alert(quantity);return false;
    var baseUrl = getBaseURL();
    if (quantity == '' || isNaN(quantity)) {
        quantity = '1';
    }
    $.ajax({
        type: "POST",
        url: baseUrl + "Cart/addToCart",
        data: {productId: pid, quantity: quantity},
        dataType: "json",
        beforeSend: function () {
            //$("#cartWait" + pid).html("<center style='display:none'><img src='" + baseUrl + "assets/images/loading.gif' style='height:15px;'/></center>");
            ajaxLoaderShow();
        },
        success: function (data) {
            if (data['status'] == 'success') {
                countCartItem();
            }
            alertifyMsg(data['status'], data['msg'], '', '');
            $("#cartWait" + pid).html('');
            ajaxLoaderHide();
        },
        error: function () {
            //alert("Response Failure !!!");
            ajaxLoaderHide();
        }
    });
}

function countCartItem() {
    var baseUrl = getBaseURL();
    //ajaxLoaderShow();
    $.ajax({
        type: "POST",
        url: baseUrl + "Cart/countCartItem",
        data: {},
        dataType: "html",
        beforeSend: function () {
            //ajaxLoaderShow();
        },
        success: function (data) {
            $("#cartCount").html(data);
            //ajaxLoaderHide();
        },
        error: function () {
            //alert("Response Failure !!!");
            //ajaxLoaderHide();
        }
    });
}

function confirmDeleteItemFromCart(id) {
    ajaxLoaderShow();
    $("#cartItemDeleteModal").modal({backdrop: true});
    $('#deleteOrderItemId').val(id);
    ajaxLoaderHide();
}

function changeItemQuantity(quantity, cartItemId) {
    var baseUrl = getBaseURL();
    if (quantity != 0 && quantity > 0) {
        $.ajax({
            type: "POST",
            url: baseUrl + "Cart/updateCartItem",
            data: {quantity: quantity, cartItemId: cartItemId},
            dataType: "html",
            beforeSend: function () {

            },
            success: function (data) {
                if (data == 1) {
                    location.reload();
                } else {

                }
            },
            error: function () {
                //alert("Response Failure !!!");
            }
        });
    } else {
        alert('Item quantity must be greater than 0.');
        location.reload();
    }
}

//Change Password Show Hide Password Feature Start
$(document).ready(function () {
    $('.pass_show').append('<span class="ptxt">Show</span>');
});
$(document).on('click', '.pass_show .ptxt', function () {
    $(this).text($(this).text() == "Show" ? "Hide" : "Show");
    $(this).prev().attr('type', function (index, attr) {
        return attr == 'password' ? 'text' : 'password';
    });
});
//Change Password Show Hide Password Feature End
//-------------------End Cart Action-----------------------------
function alertifyMsg(type, message, icon, url) {
    $.notify(
            {
                icon: icon,
                message: message,
                animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
                },
                url: url
            },
            {
                type: type
            }
    );
}
/***********************************************************\
 |                                                                                                   |
 |                                   Helper Functions                                         |
 |                                                                                                   |
 \***********************************************************/

function bootstrap_alert(alert_class, alert_msg) {
    alert_msg = '<div class="alert alert-' + alert_class + ' alert-dismissible fade show"><button type="button" class="close" data-dismiss="alert">&times;</button>' + alert_msg + '</div>';
    return alert_msg;
}

function ajaxLoaderShow() {
    var baseurl = getBaseURL();
    $.loadingBlockShow({
        imgPath: baseurl + 'assets/overley/img/default.svg',
        text: 'Please wait ...',
    });
}

function ajaxLoaderHide() {
    setTimeout($.loadingBlockHide, 500);
}

function changeLocation(Chlocation) {
    window.location.href = Chlocation;
}

selectAll = function (form_id)
{
    if ($('#' + form_id + ' input[name="select_all"]').is(':checked'))
    {
        $('#' + form_id + ' input[name="row[]"]').closest("span").addClass("checked");
        $('#' + form_id + ' input[name="row[]"]').prop("checked", true);
    } else
    {
        $('#' + form_id + ' input[name="row[]"]').closest("span").removeClass("checked");
        $('#' + form_id + ' input[name="row[]"]').prop("checked", false);
    }

}

/*
 Usage: enable_disable_all_elems_within_box(<tag_id>, <true/false>);
 Params: tag_id = div tag id inwhich inputs are to be enalbled/disabled, 
 true = make enable, false = make disable
 */
enable_disable_all_elems_within_box = function (elem_id, enable)
{
    if (enable)
        $('#' + elem_id).find('*').prop('disabled', true);
    else
        $('#' + elem_id).find('*').prop('disabled', false);

    //var workshop_type=$("#workshop_id").find(':selected').data('workshop-type');
    //alert(workshop_type);

}

formSubmitByName = function (form_name)
{
    $("form[name=" + form_name + "]").submit();
}

formSubmitById = function (form_id)
{
    $("#" + form_id).submit();
}

/***********************************************************\
 |															|
 |				Helper Static Functions						|
 |															|
 \***********************************************************/
function ucfirst(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function ucwords(str, force) {
    str = force ? str.toLowerCase() : str;
    return str.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,
            function (firstLetter) {
                return firstLetter.toUpperCase();
            });
}

function getBaseURL()
{
    var subdir = "";
    return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/" + subdir;
}

$(document).ready(function () {
    $('#horizontalTab').easyResponsiveTabs({
        type: 'default', //Types: default, vertical, accordion           
        width: 'auto', //auto or any width like 600px
        fit: true, // 100% fit in a container
        closed: 'accordion', // Start closed if in accordion view
        activate: function (event) { // Callback function if tab is switched
            var $tab = $(this);
            var $info = $('#tabInfo');
            var $name = $('span', $info);
            $name.text($tab.text());
            $info.show();
        }
    });
    $('#verticalTab').easyResponsiveTabs({
        type: 'vertical',
        width: 'auto',
        fit: true
    });
});

function goBack() {
    window.history.back();
}