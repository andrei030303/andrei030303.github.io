$(document).ready(function () {
 
    // home slider
    var slider = new Swiper('.js--hero-swiper', {
      speed: 400,
      spaceBetween: 12,
      loop:true,
      autoplay: {
        delay: 5000,
      },

      // If we need pagination
      pagination: {
        el: '.hero-slider .swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.hero-slider .swiper-button-next',
        prevEl: '.hero-slider .swiper-button-prev',
      },
    });

    // home slider

    var slider = new Swiper('.js--products-reviews', {
      speed: 400,
      spaceBetween: 0,
      slidesPerView:4,
      spaceBetween:24, 
      // loop:true, 

      // Navigation arrows
      navigation: {
        nextEl: '.products-reviews .swiper-button-next',
        prevEl: '.products-reviews .swiper-button-prev',
      },

      breakpoints:{
        760: {
            slidesPerView: "auto",
            spaceBetween: 20,
        },
        960: {
            slidesPerView: 3,
            setWrapperSize:true,
        },
        1180: {
            slidesPerView: 4,
            setWrapperSize:true,
        },
      },

    });

    $(document).on('click','.quickorder-custom-button',function(e){
        let wrapper = $(this).closest('#dialog');
        if(wrapper.length > 0) {
            wrapper.find('.dialog-close').trigger('click');
        }
    })


    // home tabs

    $(document).on('click','.products-tab__tab',function(e){
        e.preventDefault();

        let $that = $(this);
        let $wrapper = $that.closest('.products-tab');
        let id = $(this).attr('href');

        $wrapper.find('.products-tab__tab').removeClass('is-active');
        $wrapper.find('.products-tab__content').fadeOut(300);
        setTimeout(function(){
            $wrapper.find(id).fadeIn(300);
        },300);

        $that.addClass('is-active');


    })

    // home about more btn

    $(document).on('click','.js--more-btn',function(e){
        e.preventDefault();
        let $wrapper = $(this).closest(".s-about");

        $(this).toggleClass('is-active');
        $wrapper.find('.s-about__text').toggleClass('s-about__text--limited');
    });


    //CART dialog for multi-SKU products
    $('.dialog').on('click', 'a.dialog-close', function () {
        $(this).closest('.dialog').hide().find('.cart').empty();
        return false;
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            $(".dialog:visible").hide().find('.cart').empty();
        }
    });


    // CATEGORY

    // open category-sidebar
    $(document).on('click','.js--open-category-sidebar', function(e){
        e.preventDefault();
        $('body').addClass('is-show--category-sidebar');
    });

    // close category-sidebar
    $(document).on('click','.js--close-category-sidebar', function(e){
        e.preventDefault();
        $('body').removeClass('is-show--category-sidebar');
    });


    // filter btn more
    $(document).on('click','.filter-item__btn-more', function(e){
        e.preventDefault();
        $(this).closest('.filter-param').toggleClass('is-show');
    });

    // select sorting
    $(document).on('click', '.select-list_toggle', function(e){
        e.preventDefault();
        $(this).closest('.select-list').toggleClass('is-show');
    });

    $(document).on('click', '.select-list__items li', function(){

        let that = $(this),
            select = that.closest('.select-list');

        select.toggleClass('is-show');
        select.find('.select-list_toggle span').html(that.html());
        select.find('li').removeClass('selected');
        that.addClass('selected');
    });

    $(document).on('click', '.select-list_toggle a', function(e){
         e.preventDefault();
    });

    $(document).on('click', function(e){
         if($(e.target).closest('.select-list').length == 0 && $(document).find('.select-list').hasClass('is-show')){
            $(document).find('.select-list').removeClass('is-show');
         }
    });


    // stock
    $(document).on('click','.stocks .select-list__items li',function(){

        let that = $(this),
            select = that.closest('.select-list'),
            wrapper = that.closest('.stock-row');

        wrapper.find('.stock-row__info').html(that.data('html'));

    });


    // home slider 

    var carouselIndex = 0;

    $(document).find('.js--products-carousel').each(function(){

        carouselIndex = carouselIndex + 1;
        $(this).closest('.related').addClass('js-carousel-'+carouselIndex);
        $(this).find('.product-item').addClass('swiper-slide');

        let carouselClass = ".js-carousel-"+carouselIndex+" .js--products-carousel";

        var slider = new Swiper(carouselClass, { 

          speed: 400,
          spaceBetween: 24,
          slidesPerView:5,
          setWrapperSize:true,
          pagination: {
            el: '.js-carousel-'+carouselIndex+' .swiper-pagination',
          },
          
          // loop:true,
          // Navigation arrows 
          
          navigation: {
            nextEl: '.js-carousel-'+carouselIndex+' .swiper-button-next',
            prevEl: '.js-carousel-'+carouselIndex+' .swiper-button-prev',
          }, 

          breakpoints:{
            0: {
                slidesPerView: 2, 
            },
            760: {
                slidesPerView: 3,
                
            },
            1080: {
                slidesPerView: 4, 
            },
            1280: {
                slidesPerView: 5, 
            },
          },

        });

    });


    var switchProductListView  = function(){
        var _this = this,
            cookieOptions = {expires: 7, path: '/'},
            switchBtn = $('.js-switch-pr-view');

        $('body').on('click', '.js-switch-pr-view', function(){
            var $this = $(this),
                type = $this.data('view');

            if(type){
                $.cookie('CategoryProductsView', type, cookieOptions);
            }

            var form = $('.js-filters.js-ajax form');

            ajaxUpdateList(window.location.search);

            switchBtn.removeClass('selected');
            $this.addClass('selected');
        });


    }

    switchProductListView();

    var ajaxUpdateList = function(url, $isPushState){
        var _this = this;
        var productList = $('.js-product-list-ajax');
        var loader = $('.js-product-list-ajax-loader');

        $(window).lazyLoad && $(window).lazyLoad('sleep');
        productList.html("");
        loader.show();
        var getUrl = (url.indexOf('?') < 0) ? url+'?_' : url;
        getUrl += '&_=_'+ (new Date().getTime()) + Math.random();
        $.get(getUrl, function(html) {
            var tmp = $('<div></div>').html(html);
            productList.html(tmp.find('.js-product-list-ajax').html()); 
            loader.hide();
            if (!!(history.pushState && history.state !== undefined) && $isPushState) {
                if(url == "?") url = window.location.pathname;
                window.history.pushState({}, '', url);
            }

            $(window).lazyLoad && $(window).lazyLoad('reload');

            $(window).on("popstate", function(e) {
                location.reload();
            }); 

            if (typeof $.autobadgeFrontend !== 'undefined') {
                $.autobadgeFrontend.reinit();
            }
            if (typeof $.pluginprotilegallery !== 'undefined') {
                $.pluginprotilegallery.lazyload();
            }
 
        });
    }

     

    //ADD TO CART
    $(".container").on('submit', '.product-list form.addtocart', function () {
        var f = $(this);
        f.find('input[type=submit]').addClass('is-loading');
        if (f.data('url')) {
            var d = $('#dialog');
            var c = d.find('.cart');
            c.load(f.data('url'), function () {
                f.find('input[type=submit]').removeClass('is-loading');
                c.prepend('<a href="#" class="dialog-close"></a>');
                d.show();
            });
            return false;
        }
        $.post(f.attr('action') + '?html=1', f.serialize(), function (response) {
            f.find('input[type=submit]').removeClass('is-loading').addClass('is-added');
            // f.find('input[type=submit]').val('В корзине');

            if (response.status == 'ok') {

                var cart_count = $(".js--cart-count");
                cart_count.closest('.g-header-cart__link').removeClass('is-empty');
                cart_count.closest('.navbar-item--cart').removeClass('is-empty');

                messageAlert(f.find('span.added2cart').text(), 'success', '4000');

                cart_count.each(function(){
                    let that = $(this);
                    that.animate({opacity: 1}, function(){
                        let _blinked = 0;
                        setInterval(function(){
                            if (_blinked < 6){
                                that.toggleClass("is-blinked");
                            }
                            _blinked++;
                         },300);
                    });
                });

                if ( MatchMedia("only screen and (max-width: 760px)") ) {
                    
                    cart_count.html(response.data.count);
                     

                } else {

                    // flying cart
                    var origin = f.closest('li');
                    var block = $('<div></div>').append(origin.html());
                    block.css({
                        'z-index': 100500,
                        background: '#fff',
                        top: origin.offset().top,
                        left: origin.offset().left,
                        width: origin.width()+'px',
                        height: origin.height()+'px',
                        position: 'absolute',
                        overflow: 'hidden'
                    }).appendTo('body').animate({
                        top: cart_count.offset().top,
                        left: cart_count.offset().left,
                        width: '10px',
                        height: '10px',
                        opacity: 0.7
                    }, 700, function() {
                        $(this).remove();
                        cart_count.html(response.data.count);

                        var $addedText = $('<div class="cart-just-added"></div>').html(f.find('span.added2cart').text());
                        $('#cart-content').append($addedText);
                        setTimeout( function() {
                            $addedText.remove();
                        }, 2000);

                        if ($('#cart').hasClass('fixed'))
                            $('.cart-to-checkout').show();
                    });
                }
            } else if (response.status == 'fail') {
                alert(response.errors);
            }

        }, "json");
        return false;
    });


    //PRODUCT FILTERING
    var f = function () {

        var ajax_form_callback = function (f) {
            var fields = getFields(f);
            var params = [];

            $.each(fields, function(i, field) {
                if (field.name && field.value) {
                    params.push(field.name + '=' + field.value);
                }
            });

            var url = location.pathname + ( params.length ? "?" + params.join('&') : "");

            $(window).lazyLoad && $(window).lazyLoad('sleep');
            $('#product-list').html('<img src="' + f.data('loading') + '">');
            $.get(url, function(html) {
                var tmp = $('<div></div>').html(html);
                $('#product-list').html(tmp.find('#product-list').html());
                if (!!(history.pushState && history.state !== undefined)) {
                    window.history.pushState({}, '', url);
                }
                $(window).lazyLoad && $(window).lazyLoad('reload');
            });

            function getFields($form) {
                var result = [];

                var form_array = $form.serializeArray();

                $.each(form_array, function(i, field) {
                    var full_name = field.name,
                        search_string = "[unit]";

                    var is_unit = (full_name.substr(-(search_string.length)) === search_string);
                    if (is_unit) {
                        var param_name = full_name.substr(0, full_name.length - search_string.length);
                        var is_param_set = checkParam(param_name);
                        if (is_param_set) {
                            result.push(field);
                        }

                    } else {
                        result.push(field);
                    }
                });

                return result;

                function checkParam(param_name) {
                    var result = false;

                    $.each(form_array, function(i, field) {
                        if (field.name === param_name +"[min]" || field.name === param_name +"[max]") {
                            if (field.value.length) {
                                result = true;
                                return true;
                            }
                        }
                    });

                    return result;
                }
            }
        };

        $('.filters.ajax form input').change(function () {
            ajax_form_callback($(this).closest('form'));
        });
        $('.filters.ajax form').submit(function () {
            ajax_form_callback($(this));
            return false;
        });

        $('.filters .slider').each(function () {
            if (!$(this).find('.filter-slider').length) {
                $(this).append('<div class="filter-slider"></div>');
            } else {
                return;
            }
            var min = $(this).find('.min');
            var max = $(this).find('.max');
            var min_value = parseFloat(min.attr('placeholder'));
            var max_value = parseFloat(max.attr('placeholder'));
            var step = 1;
            var slider = $(this).find('.filter-slider');
            if (slider.data('step')) {
                step = parseFloat(slider.data('step'));
            } else {
                var diff = max_value - min_value;
                if (Math.round(min_value) !== min_value || Math.round(max_value) !== max_value) {
                    var tail_length = 0;
                    try {
                        if (min_value > 0) {
                            var min_tail = (min_value + "").split(".")[1];
                            if (min_tail && min_tail.length) {
                                tail_length = min_tail.length;
                            }
                        }

                        if (max_value > 0) {
                            var max_tail = (max_value + "").split(".")[1];
                            if (max_tail && max_tail.length && max_tail.length > tail_length) {
                                tail_length = max_tail.length;
                            }
                        }
                    } catch(error) {
                        (console && console.log(error.message));
                    }

                    if (tail_length > 0) {
                        step = 1 / Math.pow(10, tail_length);
                    }

                //     step = diff / 10;
                //     var tmp = 0;
                //     while (step < 1) {
                //         step *= 10;
                //         tmp += 1;
                //     }
                //     step = Math.pow(10, -tmp);
                //     tmp = Math.round(100000 * Math.abs(Math.round(min_value) - min_value)) / 100000;
                //     if (tmp && tmp < step) {
                //         step = tmp;
                //     }
                //     tmp = Math.round(100000 * Math.abs(Math.round(max_value) - max_value)) / 100000;
                //     if (tmp && tmp < step) {
                //         step = tmp;
                //     }
                }
            }
            slider.slider({
                range: true,
                min: parseFloat(min.attr('placeholder')),
                max: parseFloat(max.attr('placeholder')),
                step: step,
                values: [parseFloat(min.val().length ? min.val() : min.attr('placeholder')),
                    parseFloat(max.val().length ? max.val() : max.attr('placeholder'))],
                slide: function( event, ui ) {
                    var v = ui.values[0] == $(this).slider('option', 'min') ? '' : ui.values[0];
                    min.val(v);
                    v = ui.values[1] == $(this).slider('option', 'max') ? '' : ui.values[1];
                    max.val(v);
                },
                stop: function (event, ui) {
                    min.change();
                }
            });
            min.add(max).change(function () {
                var v_min =  min.val() === '' ? slider.slider('option', 'min') : parseFloat(min.val());
                var v_max = max.val() === '' ? slider.slider('option', 'max') : parseFloat(max.val());
                if (v_max >= v_min) {
                    slider.slider('option', 'values', [v_min, v_max]);
                }
            });
        });

        window.addEventListener('popstate', function(event) {
            location.reload();
        });
    };
    f();

    //SLIDEMENU sidebar navigation
    $('.slidemenu')
        .on('afterLoadDone.waSlideMenu', function () {
            f();
            $('img').retina();
            $(window).lazyLoad && $(window).lazyLoad('reload');
        })
        .on('onLatestClick.waSlideMenu', function () {
            if ( (!!('ontouchstart' in window)) && ( MatchMedia("only screen and (max-width: 760px)") ) ) {
                $('.nav-sidebar-body').slideUp(200);
            }
        });

    //LAZYLOADING
    if ($.fn.lazyLoad) {
        var paging = $('.lazyloading-paging');
        if (!paging.length) {
            return;
        }

        var times = parseInt(paging.data('times'), 10);
        var link_text = paging.data('linkText') || 'Load more';
        var loading_str = paging.data('loading-str') || 'Loading...';

        // check need to initialize lazy-loading
        var current = paging.find('li.selected');
        if (current.children('a').text() != '1') {
            return;
        }
        paging.hide();
        var win = $(window);

        // prevent previous launched lazy-loading
        win.lazyLoad('stop');

        // check need to initialize lazy-loading
        var next = current.next();
        if (next.length) {
            win.lazyLoad({
                container: '#product-list .product-list',
                load: function () {
                    win.lazyLoad('sleep');

                    var paging = $('.lazyloading-paging').hide();

                    // determine actual current and next item for getting actual url
                    var current = paging.find('li.selected');
                    var next = current.next();
                    var url = next.find('a').attr('href');
                    if (!url) {
                        win.lazyLoad('stop');
                        return;
                    }

                    var product_list = $('#product-list .product-list');
                    var loading = paging.parent().find('.loading').parent();
                    if (!loading.length) {
                        loading = $('<div><i class="icon16 loading"></i>'+loading_str+'</div>').insertBefore(paging);
                    }

                    loading.show();
                    $.get(url, function (html) {
                        var tmp = $('<div></div>').html(html);
                        if ($.Retina) {
                            tmp.find('#product-list .product-list img').retina();
                        }
                        product_list.append(tmp.find('#product-list .product-list').children());
                        var tmp_paging = tmp.find('.lazyloading-paging').hide();
                        paging.replaceWith(tmp_paging);
                        paging = tmp_paging;

                        times -= 1;

                        // check need to stop lazy-loading
                        var current = paging.find('li.selected');
                        var next = current.next();
                        if (next.length) {
                            if (!isNaN(times) && times <= 0) {
                                win.lazyLoad('sleep');
                                if (!$('.lazyloading-load-more').length) {
                                    $('<a href="#" class="lazyloading-load-more">' + link_text + '</a>').insertAfter(paging)
                                        .click(function () {
                                            loading.show();
                                            times = 1;      // one more time
                                            win.lazyLoad('wake');
                                            win.lazyLoad('force');
                                            return false;
                                        });
                                }
                            } else {
                                win.lazyLoad('wake');
                            }
                        } else {
                            win.lazyLoad('stop');
                            $('.lazyloading-load-more').hide();
                        }

                        loading.hide();
                        tmp.remove();
                    });
                }
            });
        }
    }

});

// Show Filters for Mobile
( function($) {

    var storage = {
        shownClass: "is-shown"
    };

    var bindEvents = function() {
        $("#filters-toggle-link").on("click", function() {
            toggleFilters( $(this) );
        });
    };

    var toggleFilters = function($link) {
        var $filters = $link.closest(".filters"),
            activeClass = storage.shownClass,
            show_text = $link.data("show-text"),
            hide_text = $link.data("hide-text"),
            is_active = $filters.hasClass(activeClass);

        if (is_active) {
            $filters.removeClass(activeClass);
            $link.text(show_text);
        } else {
            $filters.addClass(activeClass);
            $link.text(hide_text);
        }
    };

    $(document).ready( function() {
        bindEvents();
    });

})(jQuery);

 