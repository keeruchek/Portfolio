(function($) {
    var $window = $(window), $body = $('body'), $wrapper = $('#wrapper'), $header = $('#header'), $nav = $('#nav'), $main = $('#main');
    // Breakpoints.
    breakpoints({
        xlarge:  [ '1281px',  '1680px' ],
        large:   [ '981px',   '1280px' ],
        medium:  [ '737px',   '980px'  ],
        small:   [ '481px',   '736px'  ],
        xsmall:  [ null,      '480px'  ]
    });
    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });
    // Scrolly.
    $('.scrolly').scrolly();
})(jQuery);
