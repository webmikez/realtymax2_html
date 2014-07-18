var FloatGalery = function( obj ){
    this.obj = obj;
    this.window = $( window );
    this.items = this.obj.find( '.float-gallery__item' );
    this.wraper = this.obj.find( '.float-gallery__layout' );
    this.duration = 5000;
    this.scroll = 0;
    this.startScroll = 0;
    this.action = false;
    this.init();
};
FloatGalery.prototype = {
    init: function(){
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function(){
        var self = this;

        return {
            build: function(){
                self.core.refresh();
                self.core.controls();
            },
            refresh: function(){
                var index = 0;
                self.height = self.items.eq( 0 ).outerHeight();
                self.visible = Math.floor( ( self.window.height() - 10 ) / self.height );

                if(self.visible > self.items.length) {
                    self.visible = self.items.length;
                }

                if(($('article').offset().top + $('article').height()) < (self.wraper.offset().top + self.visible * self.height)) {
                    self.visible = Math.floor( ( $('article').height() - 40 ) / self.height );
                }

                self.step = 0;
                self.firstIndex = 0;
                self.lastVisible = self.visible - 1;
                self.items.css( { display: 'none' } );
                self.items.each( function( i ){
                    var curItem = $( this );

                    if( index == self.visible ){
                        index = 0
                    }
                    curItem.css( { top: index * self.height } );
                    if( i < self.visible ){
                        curItem.css( { display: 'block', opacity: 0} );
                        curItem.stop( true, false ).fadeTo( 300, 1 );
                    }

                    index++;
                } );
                self.wraper.height( self.visible * self.height );
                self.core.addPages();
                self.startScroll = self.window.scrollTop();
            },
            slideToNext: function(){
                clearTimeout( self.timer );
                self.timer = setTimeout( function(){
                    self.next.trigger( 'click' );
                }, self.duration );
            },
            addPages: function(){
                self.obj.find( '.float-gallery__pages').remove();
                var pages = $( '<div class="float-gallery__pages"></div>'),
                    count = Math.ceil( self.items.length / self.visible),
                    i;

                pages.append('<a href="#" class="float-gallery__prev"></a><span class="float-gallery__count">1</span>/' + count + '<a href="#" class="float-gallery__next"></a>')
                self.pages = pages.find( '.float-gallery__count' );
                self.prev = pages.find( '.float-gallery__prev' );
                self.next = pages.find( '.float-gallery__next' );
                self.obj.append( pages );

                self.prev.on( {
                    'click': function(){
                        self.core.toPrevPage();

                        return false;
                    }
                } );
                self.next.on( {
                    'click': function(){
                        self.core.toNextPage();

                        return false;
                    }
                } );

                self.obj.css( {
                    top: 0
                } );

                self.top = self.obj.offset().top - 10;
                self.footerTop = ($('.our-partners-holder').length > 0) ? $('.our-partners-holder').offset().top : $( 'footer' ).offset().top;
                if(count > 1) {
                    self.core.slideToNext()
                }
            },
            toPrevPage: function(){
                var start = self.lastVisible - ( self.visible*2)+1,
                    finish = start + self.visible,
                    counter,
                    counter2 = 0,
                    text = parseInt( self.pages.text() ),
                    i;

                if( start < 0 ){
                    start = self.items.length + start;
                    finish = start + self.visible;
                }
                clearTimeout( self.timer );
                if( !self.action ){
                    self.action = true;

                    self.items.fadeTo( 300, 0, function(){
                        $( this ).css( { display: 'none' } );
                    } );
                    for( i = start; i < finish; i++ ){
                        counter = i;
                        if ( i >= self.items.length ){
                            counter = i-self.items.length;
                        }
                        self.items.eq( counter ).css( {
                            display: 'block',
                            opacity: 0,
                            top: counter2 * self.height
                        } );
                        self.items.eq( counter ).stop( true, false ).fadeTo( 300, 1, function(){
                            self.action = false;
                            self.core.slideToNext();
                        } );
                        counter2++;
                    }
                    text--;
                    if( text < 1 ){
                        text = Math.ceil( self.items.length / self.visible )
                    }
                    self.pages.text( text );
                    self.lastVisible = finish - 1;
                    if( self.lastVisible >=  self.items.length ){
                        self.lastVisible = self.lastVisible-self.items.length;
                    }
                }
            },
            toNextPage: function(){
                var start = self.lastVisible + 1,
                    finish = start + self.visible,
                    counter,
                    counter2 = 0,
                    text = parseInt( self.pages.text() ),
                    i;

                clearTimeout( self.timer );
                if( !self.action ){
                    self.action = true;

                    self.items.fadeTo( 300, 0, function(){
                        $( this ).css( { display: 'none' } );
                    } );
                    for( i = start; i < finish; i++ ){
                        counter = i;
                        if ( i >= self.items.length ){
                            counter = i-self.items.length;
                        }
                        self.items.eq( counter ).css( {
                            display: 'block',
                            opacity: 0,
                            top: counter2 * self.height
                        } );
                        self.items.eq( counter ).stop( true, false ).fadeTo( 300, 1, function(){
                            self.action = false;
                            self.core.slideToNext();
                        } );
                        counter2++;
                    }
                    text++;
                    if( text > Math.ceil( self.items.length / self.visible ) ){
                        text = 1
                    }
                    self.pages.text( text );
                    self.lastVisible = finish - 1;
                    if( self.lastVisible >=  self.items.length ){
                        self.lastVisible = self.lastVisible-self.items.length;
                    }
                }
            },
            setPos: function(){
                self.obj.css( {
                    top: 0
                } );
                self.top = self.obj.offset().top - 10;
                self.footerTop = Math.floor(  ($('.our-partners-holder').length > 0) ? $('.our-partners-holder').offset().top : $( 'footer' ).offset().top );
                var curTop = self.top - self.window.scrollTop(),
                    curBottom = self.top + self.obj.height() + (-curTop) + 40;

                if( self.footerTop < curBottom ){
                    self.obj.css( {
                        top: self.footerTop - 40 - self.obj.height() - self.top
                    } );
                } else if ( curTop < 10 ){
                    self.obj.css( {
                        top: curTop * -1
                    } );
                } else {
                    self.obj.css( {
                        top: 0
                    } );
                }
            },
            controls: function(){
                self.window.on( {
                    'resize': function(){
                        self.core.refresh();
                        self.core.setPos();
                    },
                    'scroll': function(){
                        self.scroll = Math.abs( self.window.scrollTop() );
                        if ( Math.abs( self.startScroll - self.scroll ) >= ( self.window.height() * 2 ) ){
                            self.next.trigger( 'click' );
                            self.startScroll = self.window.scrollTop();
                        }

                        self.core.setPos();
                    }
                } );
            }
        };
    }
};