$(document).ready(function () {

    var animating = false,
        submitPhase1 = 1100,
        submitPhase2 = 400,
        logoutPhase1 = 800,
        $login = $(".login"),
        $app = $(".app");

    function ripple(elem, e) {
        $(".ripple").remove();
        var elTop = elem.offset().top,
            elLeft = elem.offset().left,
            x = e.pageX - elLeft,
            y = e.pageY - elTop;
        var $ripple = $("<div class='ripple'></div>");
        $ripple.css({
            top: y,
            left: x
        });
        elem.append($ripple);
    };

    $(document).on("click", ".login__submit", async function (e) {
        console.log('here');
        if (animating) return;
        animating = true;
        var that = this;
        $app = $(".app");
        ripple($(that), e);
        $(that).addClass("processing");
        setTimeout(async () => {
            var id = document.getElementById('user-id').value;
            var pw = document.getElementById('user-pw').value;
            var response = fetch(`/tryLogin`, {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    pw: pw
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            response.then(res => {
                res.json().then(data => {
                    if (data.error) {
                        console.log(data.error);
                        $(that).removeClass("processing");
                        animating = false;
                        return;
                    } else {
                        console.log('worked');
                        document.getElementById('signup-tag').innerText = 'Welcome, ' + data.first_name;
                        $('.signup-input').addClass('hide');
                        $('#info-retrieve').removeClass('hide');
                        setTimeout(() => {
                            window.location = `/bucketList?id=${data.id}`
                        }, 4000);
                        console.log(data);
                        $(that).addClass("success");

                        setTimeout(function () {
                            $app.show();
                            $app.css("top");
                            $app.addClass("active");
                        }, submitPhase2 - 70);

                        setTimeout(function () {
                            $login.hide();
                            $login.addClass("inactive");
                            animating = false;
                            $(that).removeClass("success processing");
                        }, submitPhase2);
                    }

                })

            })
        }, 1500);
    });

    $(document).on("click", ".signup_submit", async function (e) {
        console.log('here');
        if (animating) return;
        animating = true;
        var that = this;
        $app = $(".app");
        ripple($(that), e);
        $(that).addClass("processing");
        setTimeout(async () => {
            $(that).removeClass("processing");
            animating = false;
            $(that).addClass("success");
            setTimeout(function () {
                $app.show();
                $app.css("top");
                $app.addClass("active");
            }, submitPhase2 - 70);

            setTimeout(function () {
                $login.hide();
                $login.addClass("inactive");
                animating = false;
                $(that).removeClass("success processing");
            }, submitPhase2);
        }, 1500);
    });

    $(document).on("click", ".submit-signup", signUpUser);
});

function signUpUser() { 
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var username = document.getElementById('uname').value;
    var pw = document.getElementById('pw-signup').value;
    var response = fetch(`/signup`, {
        method: 'POST',
        body: JSON.stringify({
           fname: fname,
           lname: lname,
           username: username,
           pw: pw
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    response.then(async res => { 
        if (await res.json().error) return;

        window.location.reload();
    })

}