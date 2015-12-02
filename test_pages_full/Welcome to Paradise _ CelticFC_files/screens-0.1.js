$(document).ready(function () {
    $(function () {
        $("dl.tabs dt").click(function () {
            $("#tab1")
                .siblings().removeClass("active").end()
                .next("dd").andSelf().addClass("active");
        });

        $(".selectFx").click(function (e) {
            e.preventDefault();
            var valuesfx = $(this).attr("data-href");
            $("#pkgs").val(valuesfx);
            var value = $(this).attr("data-attr");
            $("#pkg").val(value);
            var valueitem = $(this).attr("data-item");
            $("#screenItem").val(valueitem);

            if (valuesfx == 10) {
                $('#uploadImg').hide();
                $('#upImg').hide();
            } else {
                $('#uploadImg').show();
                $('#upImg').show();
            }

            $("#tab2")
                .siblings().removeClass("active").end()
                .next("dd").andSelf().addClass("active");
            event.preventDefault();
            return true;
            $('#tab2').trigger('click');
        });

        $(".selectFx2").click(function (e) {
            $("#tab2")
                .siblings().removeClass("active").end()
                .next("dd").andSelf().addClass("active");
            event.preventDefault();
            return true;
            $('#tab2').trigger('click');
        });


        $(".selectItm").click(function () {
            $("#tab3")
                .siblings().removeClass("active").end()
                .next("dd").andSelf().addClass("active");
            event.preventDefault();
            return true;
        });

        $("#proceed").click(function () {
            $("#tab4")
                .siblings().removeClass("active").end()
                .next("dd").andSelf().addClass("active");
            event.preventDefault();
            return true;
        });
    });

    $(".selectItm").click(function (evt) {
        evt.preventDefault();
        var value = $(this).attr("data-attr");
        $("#screenFixtureId").val(value);
        var value2 = $(this).attr("data-href");
        $("#fixture").val(value2);
        var value3 = $(this).attr("data-fxdate");
        $("#fixtureDate").val(value3);

        $('#loadingmessage').show();
        $.ajax({
            url: 'assets/scripts/ajaxsend.ajax',
            type: 'POST',
            data: {fixtureId: value},
            success: function (data) {
                setTimeout(function () {
                    $("#dataAjx").html(data)
                }, 1000);
                $('#loadingmessage').hide();
            }
        });
    });

    $('#proceed').hover(function () {
        if (!$("#fname").val()) {
            $("#fname").css("border-color", "#E0A425");
            return false;
        }
        if (!$("#lname").val()) {
            $("#lname").css("border-color", "#E0A425");
            return false;
        }
        if (!$("#msg").val()) {
            $("#msg").css("border-color", "#E0A425");
            return false;
        }
    });

    function submitDetailsForm() {
        $("#confirmOrder").submitmyForm();
    }

     $('.payBtn').click(function(){
        $('#WPform').submit();
     });

});