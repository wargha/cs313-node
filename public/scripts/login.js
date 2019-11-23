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
            var response = fetch(`/bucket-list`, {
                method: 'POST',
                body: JSON.stringify({id: id, pw: pw}),
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
                        document.getElementById('welcome-name').innerText = 'Welcome, ' + data.first_name;
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
    
});