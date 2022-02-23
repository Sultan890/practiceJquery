$(document).ready(function () {
            var max_length = 15;
            $('textarea').keyup(function () {
                var len = max_length - $(this).val().length;
                $('.GFG').text(len);
            });

        });
