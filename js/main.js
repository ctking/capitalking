(function ($) {
    "use strict";

    // common variable
    var windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        headTag = $('head'),
        body = $('body'),
        isMobile = windowWidth < 768;

    // Jquery Smooth Scroll
    $('.scroll_button h6 a').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top + 2 + 'px'
        }, 1500, 'easeInOutCubic');
        event.preventDefault();
    });

    // Owl Carousel for Main Slider
    var project_slider = $('.project_slider');
    project_slider.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            992: {
                items: 4
            }
        }
    });

    $('ul.project_nav li').eq(0).on('click', function () {
        project_slider.trigger('prev.owl.carousel');
    });
    $('ul.project_nav li').eq(1).on('click', function () {
        project_slider.trigger('next.owl.carousel');
    });
    // Jquery counterUp
    $('.counter').counterUp({
        time: 3000
    });
    // Footer Map
    $(".scroll_button > p a, .footer_area .scroll_button i").on('click', function () {
        $("#footermap").toggleClass('show');
    });

    // Owl Carousel for Main Slider
    var client_slider = $('.client_slider');
    client_slider.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });

    // Partner Slider
    var partner_slider = $('.partner_slider');
    partner_slider.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 4
            },
            992: {
                items: 6
            }
        }
    });

    // Partner Slider
    var clientsd = $('.clientsd');
    clientsd.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            992: {
                items: 1
            }
        }
    });

    // Owl Carousel for Main Slider
    var pro_sing_slider = $('.pro_sing_slider');
    pro_sing_slider.owlCarousel({
        loop: true,
        margin: 0,
        autoplay: false,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            992: {
                items: 2
            }
        }
    });

    $('ul.pro_sing_nav .testi_next').on('click', function () {
        pro_sing_slider.trigger('next.owl.carousel');
    });
    $('ul.pro_sing_nav .testi_prev').on('click', function () {
        pro_sing_slider.trigger('prev.owl.carousel');
    });

    // --------- Google Map init ----------  //
    var googleMapSelector = $('#map'),
        myCenter = new google.maps.LatLng(22.645568, 75.818995);

    function initialize() {
        var mapProp = {
            center: myCenter,
            zoom: 15,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapProp);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE,
            icon: 'img/google-pin.png'
        });
        marker.setMap(map);
    }
    if (googleMapSelector.length) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }

//    $('.footer_area .scroll_button i').on('click', function () {
//        $('html, body').animate({
//            scrollTop: 0
//        }, 4000);
//        return false;
//    });

    /*====== camera slider for Home-2 ======*/
    isMobile ? windowHeight = 648 : null;
    var camWraper = $('.camera_wraper');
    if (camWraper.length) {
        camWraper.camera({
            height: windowHeight + 'px',
            pagination: false,
            autoAdvance: false,
            thumbnails: false,
            loader: false,
            playPause: false,
            fx: 'random'
        });
    }
    // mobile Menu area
    $('nav.mb_menu').meanmenu({
        meanScreenWidth: '767'
    });

    $(window).load(function(){
        $('.grid').masonry({
            // options
            itemSelector: '.grid-item'
        });
    });

})(jQuery);


 


function requestCallback(){
		$('#submitDatabutton').button('loading');
	    var username = $('#username').val();
        var email= $('#email').val();
        var phoneNumber= $('#phoneNumber').val();
        var typeBusiness= $('#typeBusiness').val();
        var city= $('#city').val();
        var tandc= $('#terms').is(":checked");
		if(!tandc){
			 Toast.error('Please agree on terms and conditions to get start support');
			 $('#submitDatabutton') .button('reset');
			 return;
			}
    //console.log(username+':'+email+':'+typeBusiness);
    //var jsonObject ="{\"username\":\""+username+"\",\"email\":\""+email+"\",\"phoneNumber\":"+phoneNumber+",\"typeBusiness\":\""+typeBusiness+"\"}";
    //console.log(jsonObject);
   $('#submitDatabutton').prop('disabled', true);
    $.post( "requestCallback.php", {username:username,email:email,phoneNumber:phoneNumber,typeBusiness:typeBusiness})
    .done(function( data ) {
    Toast.info(data);
    resetRequestCallbackData();
   });
 }


function resetRequestCallbackData(){
        $('#username').val('');
        $('#email').val('');
        $('#phoneNumber').val('');
        $('#typeBusiness').val('Business Consulting');
        $('#myModal').modal('toggle');
        $('#submitDatabutton').prop('disabled', false);
         $('#submitDatabutton') .button('reset');
}

 function requestCallbackCallback(){
    alert("Request Completed successfully our executive will contact you");
 }

function requestToSubscribe(){
    var email= $('#subsEmail').val();
    var phoneNumber= $('#subsPhoneNumber').val();
    $.post( "subscription.php", {email:email,phoneNumber:phoneNumber})
    .done(function( data ) {
    Toast.info(data);
    resetRequestToSubscribe();
   });
 }

function resetRequestToSubscribe(){
        $('#subsEmail').val('');
        $('#subsPhoneNumber').val('');
}


function requestToContact(){
    var name= $('#name').val();
    var email= $('#email').val();
    var phoneNumber= $('#phone').val();
    var comment= $('#textarea1').val();
    $.post( "contact.php", {name:name,email:email,phoneNumber:phoneNumber,comment:comment})
    .done(function( data ) {
    Toast.info(data);
    resetRequestToContact();
   });
 }

function resetRequestToContact(){
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#textarea1').val('');
}

function getServiceData(data){
    console.log(data);
    $("#cpservice" ).html(getActiveService(data));
}

function getServiceHeaderData(serviceType){
    var dataService="";
    dataService += "<div class=\"col-xs-10 col-sm-12 pull-left\" style=\"width:90%\" >";
    dataService += "<div class=\"service_content_detail\">";
    dataService += "<h3><a href=\"#\"  >"+serviceType+"<\/a><\/h3>";
    return dataService;
}

function getServiceTitleData(serviceType){
var dataService="<p>";
    switch (serviceType) {
        case 'Stock Cash Control':
            dataService += "Our Intraday Cash Services For NSE Traders Those Are Trade In Cash Market. In which we will be providing all the recommendation generated in Intraday Cash segment, Nifty Review, Technical & Fundamental News And Resistance & Support. In this package we provide fair, reliable and timely calls to our clients can make money with us and get a high profit.";
            break;
        case 'Stock Future Control':
            dataService +="Intraday Future enables you to trade in a futures contract with an intraday perspective. i.e., you can take intraday positions in various future contracts, but these positions will have to be necessarily squared off by day end. In Intraday Future Service is for traders who trade in Stock Futures. In this service we provide intraday calls on Stock Futures.";
            break;
        case 'Stock Option Control':
            dataService +="This Service is the most reliable package of our firm. In this service we provide tips on call put and put options. Which is way to lock in profits, reduce overall portfolio risk, and provide additional income streams. With least amount trader can enter in this Service to enjoy good profit with minimum negative ratio.";
            break;
        case 'Nifty Future and Bank Nifty Control':
            dataService +="This Services Is For Those Trader’s And Investor’s, Who Want To Deal In Nifty And Bank Nifty Intraday Trading, We provide you around 1-2 nifty, Bank Nifty Future Tips, You get sufficient time to enter in our calls and can increase your profit with us.";
            break;
        case 'Nifty Option and Bank Nifty Control':
            dataService +="This Services Is Specially Designed Keeping In View The Trader’s Focus Who Trade Only In Index Option / Nifty Option. We Provide You Calls With a High Level Of Accuracy As Per The Market Trend. Our Nifty / Bank Nifty Option Control Package Includes The Following Special Features.";
            break;
        case 'Stock BTST/STBT Control':
            dataService +="In this service we provide more than 10-12 BTST/STBT calls of stock market ( Cash, Future, Option ) And Commodity Market. You get sufficient time to enter in our calls and can maximize your profit with us. We provide you High accuracy with enough time. It Is a Ideal Service For The Trader’s Who Are Not Able To Track Live Market Daily.";
            break;
        case 'Commodity Control':
            dataService +="As We Know That Commodity Market is Totally Depends Upon The Global Market Our team keeps an eye on global market and correlates the Indian market with it, in this service you can get intraday trading calls in Commodity. Team at Capital King supports you 24/7. We provide you proper follow-ups during the trade and make you update regarding Intraday Technical levels. These calls will be purely intraday basis.";
            break;
        case 6:
            dataService +="";
      }

    return dataService+"<\/p>";
}

function getActiveService(serviceType){
    var dataService=getServiceHeaderData(serviceType);
    dataService+=getServiceTitleData(serviceType);
    dataService += "<\/div>";
    dataService += "<h4 style=\"color: yellowgreen;\">Service Features:<\/h4>";
    dataService += "<div>";
    dataService += "<div class=\"heightlight_details\" style=\"width:100%;margin-bottom: 3%;\" ><p>";

    switch (serviceType) {
        case 'Stock Cash Control':
            dataService += getStockCashServiceData();
            break;
        case 'Stock Future Control':
            dataService +=getStockFutureServiceData();
            break;
        case 'Stock Option Control':
            dataService +=getStockOptionServiceData();
            break;
        case 'Nifty Future and Bank Nifty Control':
            dataService +=getNiftyFutureandBankNiftyServiceData();
            break;
        case 'Nifty Option and Bank Nifty Control':
            dataService +=getNiftyOptionandBankNiftyServiceData();
            break;
        case 'Stock BTST/STBT Control':
            dataService +=getStockBTSTSTBTServiceData();
            break;
        case 'Commodity Control':
            dataService +=getCommodityControlServiceData();
            break;
        case 6:
            dataService +="";
}
dataService += "<\/div><\/div><\/div>";
return dataService; 
}


function getStockCashServiceData(){
    var strVar="";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
    strVar += "<h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
    strVar += "<h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>   BUY Biocon Ltd Above 965 target 977, 985, 993 Stoploss 953.<\/p>";
    strVar += "<h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  Update – Biocon Ltd Made a High Of 978 Our 1st TGT Achieved. Book Partially Profit And wait For Our 2nd TGT<\/p><p>";
    strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  Update – Biocon Ltd Made a High Of 982 Book Full Profit On CMP.<\/p>";
    return strVar;
}

function getStockFutureServiceData(){
        var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>    BUY INDIACEM Above 110 target 113, 115, 120 Stoploss 106.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Update – INDIACEM Made a High Of 114.40 Our 1st TGT Achieved. Book Partially Profit And wait For Our 2nd & 3RD TGT<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – INDIACEM Made a High Of 121.60 Our All TGT Achived Book Full Profit.<\/p>  ";
return strVar;
}

function getStockOptionServiceData(){
        var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   BUY VEDL 210 PUT ABOVE 3.60 1ST TGT 4.30, 2ND  4.80, 3RD TGT, 5.00 SL 3<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Update –VEDL PUT Made a High Of 4.40 Our 1st TGT Achieved. Book Partially Profit And wait For Our 2nd & 3RD TGT<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Update – VEDL  Made a High Of  5.60 Our All TGT Achived Book Full Profit.<\/p>  ";
return strVar;
}

function getNiftyFutureandBankNiftyServiceData(){
       var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>    BUY Nifty Future Above 7970  target  8050, 8100 , 8150 Stoploss 7900.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>    BUY Bank Nifty Future Above 17700 target  17750, 17810, 17850 Stoploss 17645.<\/p>";
        strVar += "                             ";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – Nifty Future Made a High Of 8060 Our 1st TGT Achieved. Book Partially Profit And wait For Our 2nd & 3RD TGT<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – Nifty Future Made a High Of 8120 Our 2ND TGT Achived Book Profit.<\/p> ";
return strVar;
}


function getNiftyOptionandBankNiftyServiceData(){
      var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>    Buy NIFTY 8000 CALL ABOVE 43.10, 1st TGT 55.30, 2nd TGT 64.80, 3rd TGT 70.10, SL 36.50.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update - Nifty CALL Made a High Of 58.10 Our 1st TGT Achived. Book Partially Profit And Wait For Our 2nd & 3rd TGT.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update - Nifty Made a High Of 72.30 Our All TGT Achived Book Full Profit.<\/p>  ";
return strVar;
}

function getStockBTSTSTBTServiceData(){
     var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   BTST CALL - BUY CEAT  FUTURE ABOVE 248  TGT 250 , 253 , 255 SL 246.40<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – BTST Followup CEAT FUTURE  Made a High Of 249.70 Near Our 1st TGT wait For Our Target’s<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – BTST CEAT FUTURE Made a High Of 250.10  Our 1st  TGT Achived Book Profit<\/p> ";
return strVar;
}

function getCommodityControlServiceData(){
     var strVar="";
        strVar += "<i class=\"icofont icofont-curved-double-right\"><\/i>  In this pack we will provide you Limited But Quality 2-3 calls in a day. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Each call consist 3 targets and 1 Stop loss.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Proper follow-ups and  World Market Updates. <\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Clint Support From 8:30AM To 8:00PM.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Provide Nifty & Bank Nifty Support, Resistance & Trend.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Domestic and Global Market position Overview.<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Provide Proper Follow up Through SMS And Chat Room.<\/p><p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Medium of Calls:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   Calls will be given only on SMS & Instant Messenger.<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Trial Call:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>   BUY GOLD JAN Above 27000 target 27070, 27120, 27150 Stoploss 26945<\/p>";
        strVar += "                             <h4 style=\"color: yellowgreen;\">Updates:<\/h4><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update –GOLD JAN Made a High Of 27084 Our 1st TGT Achieved. Book Partially Profit And wait For Our 2nd & 3RD TGT<\/p><p>";
        strVar += "                             <i class=\"icofont icofont-curved-double-right\"><\/i>  Update – GOLD JAN Made a High Of 27185 Our All TGT Achived Book Full Profit<\/p>  ";
    return strVar;
}
