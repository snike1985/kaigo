( function(){

    $(function(){

        $.each( $( '.testimonials' ), function () {
            new Testimonials( $(this) );
        } );

        $.each( $( '.year' ), function () {
            new Year( $(this) );
        } );

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.site').each( function() {
            new Site( $(this) );
        } );

    });

    var Testimonials = function ( obj ) {
        var _obj = obj,
            _slider = _obj.find('.testimonials__slider'),
            _next = _slider.find('.swiper-button-next'),
            _prev = _slider.find('.swiper-button-prev'),
            _swiper;

        var _onEvents = function () {

                _obj.on({
                    click: function () {


                    }
                } );

            },
            _initSlider = function() {
                _swiper = new Swiper(_slider, {
                    paginationClickable: true,
                    nextButton: _next,
                    prevButton: _prev,
                    loop: true,
                    spaceBetween: 30
                });
            },
            _construct = function() {
                _onEvents();
                _initSlider();
            };

        _construct()
    };

    var Year = function ( obj ) {
        var _obj = obj;

        var _onEvents = function () {

                _obj.on({
                    click: function () {


                    }
                } );

            },
            _currentYear = function() {
            var curYear = new Date();
                _obj.text(curYear.getFullYear());
            },
            _construct = function() {
                _onEvents();
                _currentYear();
            };

        _construct()
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' ),
            _item = _obj.find( '.menu__item' ),
            _wrap = _obj.find( '.menu__wrap' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _showMenu();
                        } else {
                            _hideMenu();
                        }
                    }
                });

                _item.on({
                    'click': function() {
                        event.preventDefault();
                        var elem = $( this ),
                            id = elem.attr( 'href' ),
                            way = $( id ).offset().top - $( '.site__header' ).outerHeight() + 1,
                            duration = 1000,
                            scrollWrap = $( 'body, html' );

                        if ( !elem.hasClass( 'active' ) ) {
                            scrollWrap.animate( { scrollTop: way }, duration );

                            setTimeout( function () {
                                scrollWrap.animate( { scrollTop: way - 1 }, 1 );
                            }, duration );

                            _item.removeClass( 'active' );
                            elem.addClass( 'active' );
                            _hideMenu();
                        }

                    }
                });

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _showMenu = function() {
                _obj.addClass( 'active' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'active' );
                _wrap.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Site = function(obj) {

        //private properties
        var _obj = obj,
            _header = _obj.find( '.site__header' ),
            _siteContent = _obj.find( '.site__content' ),
            _menuItems = $( '.menu__item' ),
            _window = $( window );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'load': function() {
                        _changeHeaderType();
                        _checkActiveMenu();
                    },
                    'scroll': function() {
                        _changeHeaderType();
                        _checkActiveMenu();
                    }
                });

            },
            _changeHeaderType = function() {
                var winScroll = $( window ).scrollTop(),
                    winFirstBlock = _siteContent.children().eq(0),
                    winHeight = winFirstBlock.outerHeight();

                if ( winScroll >= winHeight ) {
                    _header.addClass( 'fixed' );
                } else {
                    _header.removeClass( 'fixed' );
                }
            },
            _checkActiveMenu = function() {
                var winScrollTop = _window.scrollTop() + _window.outerHeight()*0.5,
                    siteBloks = _siteContent.children(),
                    activeID;

                siteBloks.each( function () {
                    var curElem = $(this),
                        curElemTop = curElem.offset().top;

                    if ( winScrollTop > curElemTop ) {
                        activeID = '#' + curElem.attr( 'id' );
                    }
                } );

                _menuItems.removeClass( 'active' );

                _menuItems.each( function() {
                    var elem = $(this),
                        elemHref = elem.attr( 'href' );

                    if ( elemHref == activeID ) {
                        elem.addClass( 'active' );
                    }
                } );

            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();