!function(o,r,s,e){"use strict";var t={init:function(){t.slideRender(),t.navConfig(),t.paralaxRender(),o(r).scroll(function(){t.navConfig(),t.paralaxRender()})},slideRender:function(){o(".services").length&&o(".services").slick({infinite:!0,slidesToShow:3,slidesToScroll:2,autoplay:!0,autoplaySpeed:3e3,responsive:[{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]}),o(".lazy-carousel").length&&o(".lazy-carousel").slick({lazyLoad:"ondemand",slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:6e3,dots:!1,infinite:!0})},navConfig:function(){o(r).scrollTop()>o("header").height()+o(".navbar").height()?o(".navbar").addClass("fixed-nav"):o(".navbar").removeClass("fixed-nav")},paralaxRender:function(){if(o(".paralax-part").length)for(var e=o(r).scrollTop(),t=o(".paralax-part"),a=0;a<t.length;a++)e+o(r).height()-15>t.eq(a).offset().top&&t.eq(a).find(".animate").each(function(e,t){o(t).addClass("animated "+(o(this).data("animate")||"fadeIn")).removeClass("animate")})}},n={map:null,makers:[],styles:{default:null,retro:[{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}]},init:function(){if(o("#map").length){var e=s.getElementById("map"),t=e.dataset.lat||21.0287797,a=e.dataset.lng||105.850176,l=e.dataset.zoom||16;o(r).width()<640&&(l*=.96),n.map=new google.maps.Map(e,{zoom:parseInt(l),center:new google.maps.LatLng(t,a),styles:n.styles.retro}),n.addTabsEvent()}},addTabsEvent:function(){o(".targets-tab a").click(function(e){e.preventDefault(),o(".targets-tab a").removeClass("active"),o(this).addClass("active");var a=s.getElementById("map").dataset.pinUrl||"",t=null;n.setMapOnAll(null);var l=o(this).data("api"),r=o(this).data("method")||"GET";void 0!==l&&0!==l.length&&o.ajax({url:l,type:r,data:this.id,contentType:"application/json",encode:!0}).done(function(e){null!==(t=e)&&0!==t.length&&t.forEach(function(e){var t=new google.maps.Marker({position:new google.maps.LatLng(e.lat,e.lng),map:n.map,icon:a,title:e.title,animation:google.maps.Animation.DROP});n.makers.push(t)})}).fail(function(){})}),o(".targets-tab a#map-history").click()},setMapOnAll:function(e){for(var t=0;t<n.makers.length;t++)n.makers[t].setMap(e);n.makers=[]}};o(s).ready(function(){t.init(),n.init()})}(jQuery,window,document);