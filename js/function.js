$(document).ready(function () {
    function toggleChevron(e) {
        $(e.target)
            .prev('.panel-title')
            .find("span.caret")
            .toggleClass('caret-up caret-down');
    }
    $('#realtyAccordion').on('hidden.bs.collapse', toggleChevron);
    $('#realtyAccordion').on('shown.bs.collapse', toggleChevron);
    $( function(){
        $( '.float-gallery').each( function(){
            new FloatGalery( $( this ) );
        } );
    } );

    $('.main-nav').on('shown.bs.dropdown', function () {
        $('<div class="modal-backdrop dropdown-overlay"></div>').appendTo(document.body).hide().fadeIn(100);
    });
    $('.main-nav').on('hide.bs.dropdown', function () {
        $('.modal-backdrop').fadeOut(100, function() {
            $(this).remove();
        });
    });
    $("input, textarea").each(
        function () {
            $(this).data('holder', $(this).attr('placeholder'));
            $(this).focusin(function () {
                $(this).attr('placeholder', '');
            });
            $(this).focusout(function () {
                $(this).attr('placeholder', $(this).data('holder'));
            });

        });

    var timer;

    function selectNext() {
        var $this = $(".feature-list-playlist li.hover");
        var next = $this.next();
        if (!next.length) {
            next = $this.siblings(':first');
        }
        var i = next.index() + 1;

        $(".feature-list-playlist li").removeClass('hover');
        $('.feature-box').removeClass('active');

        $('.feature-box.feature-' + i).addClass('active');
        next.addClass("hover");
    }

    function startInterval() {
        timer = setInterval(function() {
            selectNext();
        }, 3000);
    }

    $(".feature-list-playlist li").hover(
        function () {
            var i = $(this).index() + 1;

            clearInterval(timer);

            $(".feature-list-playlist li").removeClass('hover');
            $('.feature-box').removeClass('active');

            $('.feature-box.feature-' + i).addClass('active');
            $(this).addClass("hover");
        },
        function () {
            startInterval();
        }
    );

    startInterval();
    // This triggers after each slide change
    $('#propertyObjectsCarousel').on('slid.bs.carousel', function () {
        var carouselData = $(this).data('bs.carousel');
        var currentIndex = carouselData.getActiveIndex();
        var total = carouselData.$items.length;

        // Now display this wherever you want
        var text = (currentIndex + 1) + "/" + total;
        $('.slider-counter').text(text);
    });
});

jQuery(document).ready(function() {
    var offset = 100;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.scroll-to-top').fadeIn(duration);
        } else {
            jQuery('.scroll-to-top').fadeOut(duration);
        }
    });

    jQuery('.scroll-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

(function($) {

    $(document)
        .on( 'hidden.bs.modal', '.modal', function() {
            $(document.body).removeClass( 'modal-scrollbar' );
        })
        .on( 'show.bs.modal', '.modal', function() {
            // Bootstrap's .modal-open class hides any scrollbar on the body,
            // so if there IS a scrollbar on the body at modal open time, then
            // add a right margin to take its place.
            if ( $(window).height() < $(document).height() ) {
                $(document.body).addClass( 'modal-scrollbar' );
            }
        });

})(window.jQuery);

window.jQuery(function() {
    // detect browser scroll bar width
    var scrollDiv = $('<div class="scrollbar-measure"></div>')
            .appendTo(document.body)[0],
        scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    $(document)
        .on('hidden.bs.modal', '.modal', function(evt) {
            // use margin-right 0 for IE8
            $(document.body).css('margin-right', '');
        })
        .on('show.bs.modal', '.modal', function() {
            // When modal is shown, scrollbar on body disappears.  In order not
            // to experience a "shifting" effect, replace the scrollbar width
            // with a right-margin on the body.
            if ($(window).height() < $(document).height()) {
                $(document.body).css('margin-right', scrollBarWidth + 'px');
            }
        });
});

