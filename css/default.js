$.ajaxSetup({ cache: false });

$(window).scroll(function(e){
 
    let $header = $('.g-header');  

    if($(window).scrollTop() > $header.offset().top + $header.outerHeight()){
        $('body').addClass('is-fixed--header');
    }else{
        $('body').removeClass('is-fixed--header');
        extendMyMenu();
    }
});

function messageAlert(text, type, time, event) {

    var text = (text === undefined) ? "Some message" : text;
    var time = (time === undefined) ? "3000" : time;
    var type = (type === undefined) ? "" : type;
    var stamp = "message-"+Date.now();

    if(type == ""){
        var template = '<div class="message-alert '+stamp+'">'+text+'</div>';
    } else {
        var template ='<div class="message-alert '+stamp+' message-alert--'+type+'">'+text+'</div>';    
    }

    $('body').append(template);

    setTimeout(function(){
        $('body').find("."+stamp).addClass('is-show');
    },100);

    setTimeout(function(){
        $('body').find("."+stamp).removeClass('is-show');
        setTimeout(function(){
            $('body').find("."+stamp).remove();
        }, 800);
    }, time);

    return event;
}

var MatchMedia = function( media_query ) {
    var matchMedia = window.matchMedia,
        is_supported = (typeof matchMedia === "function");
    if (is_supported && media_query) {
        return matchMedia(media_query).matches
    } else {
        return false;
    }
};


    

     $.fn.extendMenu = function(params) { 
        //reload
        $(this).find('.ul-menu__li--extend').children().unwrap();
        $(this).find('.ul-menu__ul--extend').children().unwrap();
        $(this).find('.ul-menu__a--more').remove();

        //var
        var vars = {
            widthMenu: $(this).width(),
            buttonText: 'Еще',
            openMenu: 'hover',
            buttonHideText: '',
            hiddenMenuClass: ''
        }
          , options = $.extend(vars, params);

        var cont, wtotal = 0, contt = $(this).children().length, thisis = $(this), that = $(this).children();

        //find count
        that.each(function() {
            wtotal = wtotal + $(this).outerWidth();
            if (wtotal > options.widthMenu) {
                cont = $(this).index();
                return false;
            }
        });

        //wrap
        if (typeof cont != "undefined" && contt > 0) { 
            if (cont < 0)
                cont = 0;
            that.slice(cont, contt).wrapAll('<ul class="ul-menu__ul ul-menu__ul--extend"></ul>');
            if (cont > 0) {
                thisis.find('.ul-menu__ul--extend').wrapAll('<li class="ul-menu__li ul-menu__li--extend"></li>');
                thisis.find('.ul-menu__li--extend').prepend('<a href="#" class="ul-menu__a ul-menu__a--more">' + options.buttonText + '</a>');
            }
        }
        
    }

    function extendMyMenu(){
        $('.menu-extend').extendMenu({
            widthMenu: $('.g-header-top__menu').outerWidth() - 60,
            buttonText: 'Еще'
        });
    }

    extendMyMenu();

    $(window).resize(function() {
        extendMyMenu();
    });

    
$(document).ready(function() {

    $(document).on('mouseover','.ul-menu__li',function(){
        var that_ul = $(this).find('.ul-menu__ul');
        if(that_ul.length > 0){
            if(($(window).width() - $(this).offset().left - $(this).outerWidth() - that_ul.outerWidth()) < 20){
                $(this).addClass('ul-menu__li--right-ul');
            }else{
                $(this).removeClass('ul-menu__li--right-ul');
            }
        } 

    });



// mobile menu


$(document).on('click','.js--mobile-menu-open',function(e){
    e.preventDefault();
    $('body').addClass('is-show--menu-mobile');
    if($('.mobile-menu__body ul').length == 0){
        $('.mobile-menu__body').html($('.js--mobile-menu-open').data('content'));
    }
});

$(document).on('click','.js--mobile-menu-close',function(e){
    e.preventDefault();
    $('body').removeClass('is-show--menu-mobile');
});


// catalog 
    
    //open
    $(document).on("click",'.js--open-catalog', function(){

        //for toogle effect
        if($('body').hasClass('is-show--catalog')){
            closeCatalog();
        }else{
            openCatalog();
        }
        
    });

    // close
    $(document).on('click','.js--close-catalog',function(){
        closeCatalog();
    });

    var openCatalog = function () {

        let isMobile = $('body').hasClass('is-mobile');

        $('.g-header-catalog .g-catalog').remove();

        if( MatchMedia("only screen and (max-width: 768px)") || isMobile == true ){
            //for mobile and max-width 768px

            if($('body > .g-catalog').length == 0){
                $('.g-catalog').unwrap();
            }

            // unwrap for > 1180
            if( MatchMedia("only screen and (max-width: 1180px)")){
                $(document).find('.cmenu-item--more').children().unwrap();
                $(document).find('.cmenu-item-megalist').children().unwrap();
                $(document).find('.cmenu-subitem--large').children().unwrap();
                $(document).find('.cmenu-item__link--more').remove();
            }

            

        }else{
            //for desktop and min-width 768px
           
            if($('.g-header-catalog .g-catalog').length == 0){
                $('.g-header-catalog').append($('.g-catalog').clone());
            }
            // unwrap for > 1180
            if( MatchMedia("only screen and (max-width: 1180px)")){
                $(document).find('.g-header-catalog .cmenu-item--more').children().unwrap();
                $(document).find('.g-header-catalog .cmenu-item-megalist').children().unwrap();
                $(document).find('.g-header-catalog .cmenu-subitem--large').children().unwrap();
                $(document).find('.g-header-catalog .cmenu-item__link--more').remove();
            }

        }

        // add open class
        $('body').addClass('is-show--catalog');

    }

    var closeCatalog = function(){
        $('body').removeClass('is-show--catalog');
    }

    

    function openSubCat(){
        let isMobile = $('body').hasClass('is-mobile');
        if( MatchMedia("only screen and (max-width: 768px)") || isMobile == true ){
            $(document).on('click', '.cmenu-item__arrow', function(event){
                event.preventDefault();
                event.stopPropagation(); 

                console.log('openSubCat');

                $(this).closest('.cmenu-item').toggleClass('is-active');
                $(this).closest('.cmenu-item').find('.cmenu-item__submenu').slideToggle();

                return false;
            });
        }
    }

    openSubCat()
    

    $(document).on('click','.bg-overlay',function(){
        if($('body').hasClass('is-show--catalog')){
            $('body').removeClass('is-show--catalog');
        }
        if($('body').hasClass('is-show--menu-mobile')){
            $('body').removeClass('is-show--menu-mobile');
        }
        if($('body').hasClass('is-show--category-sidebar')){
            $('body').removeClass('is-show--category-sidebar');
        }
    });
    
 
});

// MAILER app email subscribe form
var SubscribeSection = ( function($) {

    SubscribeSection = function(options) {
        var that = this;

        // DOM
        that.$wrapper = options["$wrapper"];
        that.$form = that.$wrapper.find("form");
        that.$emailField = that.$wrapper.find(".js-email-field");
        that.$submitButton = that.$wrapper.find(".js-submit-button");

        // VARS
        that.request_uri = options["request_uri"];
        that.locales = options["locales"];

        // DYNAMIC VARS

        // INIT
        that.initClass();
    };

    SubscribeSection.prototype.initClass = function() {
        var that = this;

        if (that.request_uri.substr(0,4) === "http") {
            that.request_uri = that.request_uri.replace("http:", "").replace("https:", "");
        }

        var $invisible_captcha = that.$form.find(".wa-invisible-recaptcha");
        if (!$invisible_captcha.length) {
            that.initView();
        }

        that.initSubmit();
    };

    SubscribeSection.prototype.initView = function() {
        var that = this;

        that.$emailField.on("focus", function() {
            toggleView(true);
        });

        $(document).on("click", watcher);

        function watcher(event) {
            var is_exist = $.contains(document, that.$wrapper[0]);
            if (is_exist) {
                var is_target = $.contains(that.$wrapper[0], event.target);
                if (!is_target) {
                    toggleView(false);
                }
            } else {
                $(document).off("click", watcher);
            }
        }

        function toggleView(show) {
            var active_class = "is-extended";
            if (show) {
                that.$wrapper.addClass(active_class);
            } else {
                var email_value = that.$emailField.val();
                if (!email_value.length) {
                    that.$wrapper.removeClass(active_class);
                } else {

                }
            }
        }
    };

    SubscribeSection.prototype.initSubmit = function() {
        var that = this,
            $form = that.$form,
            $errorsPlace = that.$wrapper.find(".js-errors-place"),
            is_locked = false;

        $form.on("submit", onSubmit);

        function onSubmit(event) {
            event.preventDefault();

            var formData = getData();

            if (formData.errors.length) {
                renderErrors(formData.errors);
            } else {
                request(formData.data);
            }
        }

        /**
         * @return {Object}
         * */
        function getData() {
            var result = {
                    data: [],
                    errors: []
                },
                data = $form.serializeArray();

            $.each(data, function(index, item) {
                if (item.value) {
                    result.data.push(item);
                } else {
                    result.errors.push({
                        name: item.name
                    });
                }
            });

            return result;
        }

        /**
         * @param {Array} data
         * */
        function request(data) {
            if (!is_locked) {
                is_locked = true;

                var href = that.request_uri;

                $.post(href, data, "jsonp")
                    .always( function() {
                        is_locked = false;
                    })
                    .done( function(response) {
                        if (response.status === "ok") {
                            renderSuccess();

                        } else if (response.errors) {
                            var errors = formatErrors(response.errors);
                            renderErrors(errors);
                        }
                    });
            }

            /**
             * @param {Object} errors
             * @result {Array}
             * */
            function formatErrors(errors) {
                var result = [];

                $.each(errors, function(text, item) {
                    var name = item[0];

                    if (name === "subscriber[email]") { name = "email"; }

                    result.push({
                        name: name,
                        value: text
                    });
                });

                return result;
            }
        }

        /**
         * @param {Array} errors
         * */
        function renderErrors(errors) {
            var error_class = "error";

            if (!errors || !errors[0]) {
                errors = [];
            }

            $.each(errors, function(index, item) {
                var name = item.name,
                    text = item.value;

                var $field = that.$wrapper.find("[name=\"" + name + "\"]"),
                    $text = $("<span class='c-error' />").addClass("error");

                if ($field.length && !$field.hasClass(error_class)) {
                    if (text) {
                        $field.parent().append($text.text(text));
                    }

                    $field
                        .addClass(error_class)
                        .one("focus click change", function() {
                            $field.removeClass(error_class);
                            $text.remove();
                        });
                } else {
                    $errorsPlace.append($text);

                    $form.one("submit", function() {
                        $text.remove();
                    });
                }
            });
        }

        function renderSuccess() {
            var $text = that.$wrapper.find(".js-success-message");
            $form.hide();
            $text.show();
        }
    };

    return SubscribeSection;

})(jQuery);