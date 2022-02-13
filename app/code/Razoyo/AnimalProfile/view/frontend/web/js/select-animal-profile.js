define(['jquery'], function($){
    return function(config, element){
        if (typeof code_happened === 'undefined') {
            window.code_happened = true;
            var animalCookie = getCookie("animal");
            var ani = animalCookie ? animalCookie : 'cat'
            view_profile(ani);
            $(element).val('')
            $(element).val(ani)
        }

        $(element).on('change', function (e) {
            view_profile($(this).val())
        });

        function view_profile(animal){
            var myCookie = getCookie("animal");
            myCookie != animal ? createCookie("animal", animal, "10") : deleteCookie();
            return $.ajax({
                url: config.photoUrl,
                type: 'GET',
                data: {
                    animal: animal
                }
            }).done(
                function (response) {
                    const photoImg = document.createElement('img');
                    photoImg.alt = 'Profile photo';
                    photoImg.src = response.photo;

                    const photoDiv = $(config.renderLocation);
                    if (photoDiv) {
                        photoDiv.html(photoImg);
                    }
                }
            );
        }

        function createCookie(name, value, days) {
          var expires;
          if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
          }
          else {
            expires = "";
          }
          document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
          document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
        }

        function deleteCookie() {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        }

        function getCookie(name) {
            var dc = document.cookie;
            var prefix = name + "=";
            var begin = dc.indexOf("; " + prefix);
            if (begin == -1) {
                begin = dc.indexOf(prefix);
                if (begin != 0) return null;
            }
            else
            {
                begin += 2;
                var end = document.cookie.indexOf(";", begin);
                if (end == -1) {
                end = dc.length;
                }
            }

            return decodeURI(dc.substring(begin + prefix.length, end));
        } 
    }
});
