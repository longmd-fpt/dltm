(function($, window, document, undefined) {
  "use strict";
  
  var layoutRender = {
    _fixedNav: false,
    init: function() {
      if($('.navbar').hasClass('forced-mini-nav')) {
        layoutRender._fixedNav = true;
      }
      
      layoutRender.slideRender();
      layoutRender.navConfig();
      layoutRender.paralaxRender();
      $( window ).scroll(function() {
        layoutRender.navConfig();
        layoutRender.paralaxRender();
      });
      layoutRender.rateInit();
    },
    slideRender: function() {
      if($('.services').length) {
        $('.services').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 2,
          autoplay: true,
          autoplaySpeed: 3000,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
      
      if($('.lazy-carousel').length) {
        $('.lazy-carousel').slick({
          lazyLoad: 'ondemand',
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          dots: false,
          infinite: true
        });
      }
    },
    navConfig: function() {
      var height = $(window).scrollTop();

      if(height  > $('header').height() + $('.navbar').height()) {
        if(layoutRender._fixedNav) {
          $('.navbar').removeClass('forced-mini-nav');
        } else {
          $('.navbar').addClass('fixed-nav');
        }
      } else {
        if(layoutRender._fixedNav) {
          $('.navbar').addClass('forced-mini-nav');
        } else {
          $('.navbar').removeClass('fixed-nav');
        }
      }
    },
    paralaxRender: function() {
      if(!$('.paralax-part').length) {
        return;
      }
      
      var height = $(window).scrollTop(),
          $sects = $('.paralax-part');
      for(var i = 0; i < $sects.length; i++) {
        if(height + $(window).height() - 15 > $sects.eq(i).offset().top) {
          $sects.eq(i).find('.animate').each(function(i, el) {
            $(el).addClass('animated ' + ($(this).data('animate') || 'fadeIn'))
                 .removeClass('animate');
          });
        }
      }
    },
    rateInit: function() {
      if(!$('.rate:not(.view)').length) {
        return;
      }
      
      var rateControl = $('.rate:not(.view)');
      rateControl.find('a').click(function(e) {
        e.preventDefault();
        $(this).parent().addClass('choiced');
        $(this).parent().find('a').removeClass('active');
        $(this).prevAll().addClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.rate-value').val($(this).parent().find('.active').length);
        $(this).parent().parent().find('.rate-text').text($(this).parent().find('.active').length);
      });
      rateControl.find('a').mouseenter(function() {
        if($(this).parent().hasClass('choiced')) {
          return;
        }
        $(this).parent().find('a').removeClass('active');
        $(this).prevAll().addClass('active');
        $(this).addClass('active');
        $(this).parent().parent().find('.rate-text').text($(this).parent().find('.active').length);
      });
    }
  };
  
  var formHandler = {
    timer: null,
    delayTime: 1000 * 50,
    spinner: '#loading',
    cue: 'in',
    sent: false,
    init: function() {
      if(!$('form').length) {
        return;  
      }
      
      formHandler.uploadHandler();
      
      $('input').change(function(e) {
        e.preventDefault();
        formHandler.validate($('form'));
      });

      $('#btnSubmit').click(function(e) {
        e.preventDefault();
        if(!formHandler.sent) {
          formHandler.submit($('form'));
        }
      });
    },
    uploadHandler: function() {
      if($('#photo-upload').length) {
        $('#photo-upload').change(function(){
          formHandler.renderPreview(this, $(this).parent());
        });
      }
    },
    renderPreview: function(input, preview) {
      if (input.files && input.files[0]) {
        var file    = input.files[0];
        var reader  = new FileReader();

        reader.addEventListener("load", function () {
          preview.css('background-image', 'url("' + reader.result + '")');
          preview.removeClass('upload-img');
        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      }
    },
    validate: function($f) {
      var $form = $($f);

      var valid = true;
      $('.err-msg').remove();
      $('.error').removeClass('error');

      $.each($form.find('*[required]'), function(key, value) {
        if($(value).val().length === 0) {
          $(value).addClass('error');
          $(value).parent().append('<div class="err-msg">Thông tin bắt buộc nhập</div>');
          valid = false;  
        }
      });

      $.each($form.find('input[data-validate="number"]'), function(key, value) {
        if($(value).val().length === 0) {
           return;
        }
        if(!$.isNumeric($(value).val())) {
          $(value).addClass('error');
          $(value).parent().append('<div class="err-msg">Thông tin phải là dạng số</div>');
          valid = false; 
        }
      });

      $.each($form.find('input[data-validate="email"]'), function(key, value) {
        if($(value).val().length === 0) {
           return;
        }
        var emailRegex = /^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailRegex.test($(value).val())) {
          $(value).addClass('error');
          $(value).parent().append('<div class="err-msg">Thông tin phải là dạng email</div>');
          valid = false; 
        }
      });

      return valid;
    },
    submit: function($f) {
      var valid = true;
      var $form = $($f);

      valid = formHandler.validate($form);
      if (valid) {
        formHandler.sent = true;
        
        $('.err-status-msg').fadeOut();
        
        $('#btnSubmit').val('Đang gửi ...');

        if ($form.hasClass('ajax-form')) {
          // ajax submission
            formHandler.ajaxSubmit($form);
        } else {
          $form.submit();
        }
      } else {
        //invalid form
      }
    },
    resetForm: function() {
      $('.form').each(function() {
        $(this)[0].reset();
      });
    },
    ajaxSubmit: function($form) {
      var url = $form.attr('action');
      var method = $form.attr('method');
      $.ajax({
        type: method,
        url: url,      
        data: JSON.stringify(formHandler.getFormData($form)),
        contentType: 'application/json',
        encode: true
      })
      .done(function(data) {
        console.log("Sent Data Successful"); 
        alert(data.status);
        //window.location.replace("cam-on/");
      })
      .fail(function() {
        formHandler.sent = false;
        console.log("Sent Data Fails"); 
        $('#btnSubmit').val('Thử lại');
        $('.err-status-msg').html("Có lỗi trong quá trình..");
        $('.err-status-msg').fadeIn();
        //window.location.replace("cam-on/");
      });

    },
    getFormData: function($form){
      var unindexed_array = $form.serializeArray();
      var indexed_array = {};

      $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
      });

      return indexed_array;
    }
  };
  
  var mapHandler = {
    map: null,
    makers: [],
    styles: {
      default: null,
      retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#c9b2a6'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#dcd2be'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ae9e90'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#93817c'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#a5b076'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#447530'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#fdfcf8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#f8c967'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#e9bc62'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#e98d58'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#db8555'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ebe3cd'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#dfd2ae'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#b9d3c2'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#92998d'}]
        }
      ]
    },
    init: function() {
      if(!$('#map').length) {
        return;
      }
      
      var mapSelector = document.getElementById('map'),
          mapLat = mapSelector.dataset.lat || 21.0287797,
          mapLng = mapSelector.dataset.lng || 105.850176,
          mapZoom = mapSelector.dataset.zoom || 16;
      
      if($(window).width() < 640) {
        mapZoom *= 0.96;
      }
      
      //add map location
      mapHandler.map = new google.maps.Map(mapSelector, {
        zoom: parseInt(mapZoom),
        center: new google.maps.LatLng(mapLat, mapLng),
        styles: mapHandler.styles.retro
      });
      
      mapHandler.addTabsEvent();
    },
    addTabsEvent: function() {
      $('.targets-tab a').click(function(e) {
        e.preventDefault();
        
        $('.targets-tab a').removeClass('active');
        $(this).addClass('active');
        
        var mapSelector = document.getElementById('map'),
            pinImg = mapSelector.dataset.pinUrl || '';
        var pinList = null;
        
        //clear old pin
        mapHandler.setMapOnAll(null);
          
        //get pin list
        var apiUrl = $(this).data('api'),
            apiMethod = $(this).data('method') || "GET";
        
        if(apiUrl === undefined || apiUrl.length === 0) {
          return;
        }
        
        $.ajax({
          url: apiUrl,
          type: apiMethod,
          data: this.id,
          contentType: 'application/json',
          encode: true
        })
        .done(function(data) {
          pinList = data;
          
          if(pinList === null || pinList.length === 0) {
            return;
          }
          
          pinList.forEach(function(el) {
            var pinMarker = new google.maps.Marker({
              position: new google.maps.LatLng(el.lat, el.lng),
              map: mapHandler.map,
              icon: pinImg,
              title: el.title,
              animation: google.maps.Animation.DROP
            });
            mapHandler.makers.push(pinMarker);
          });
        })
        .fail(function() {
          return;
        });
        
      });
      
      //click tab 1
      $('.targets-tab a#map-history').click();
    },
    setMapOnAll: function(map) {
      for (var i = 0; i < mapHandler.makers.length; i++) {
        mapHandler.makers[i].setMap(map);
      }
      mapHandler.makers = [];
    }
  }
  
  $(document).ready(function() {
    layoutRender.init();
    //formHandler.init();
    mapHandler.init();
  });
})(jQuery, window, document);