var ajaxCounter = 0;
var lastactiveDivSites = "";
var lastactiveOpenInnerSitesPage = "";
var contextUser;
var csrfCookieTime=34;
var csrfCookiePath="/"
var browserVersion="323232"
function showMainLoading(checkbar) {

    var timer = 0;
    window.setTimeout(function () {
        timer = timer + 1;
    }, 120000);
    $body = $("body");


    if (ajaxCounter > 0) {
        if (checkbar) {
            startAnimationBar(checkbar)
        }
        showLogoloading();
        window.setInterval(function () {
            if (timer > 0) {
                hideLogoloading();
                clearAnimationBar();
            }
        }, 600);

    } else {
        hideLogoloading();

    }
}

function startAnimationBar(checkbar) {

    var bar = $("#loadingBarWidth");
    var perc = "100%";
    var current_perc = 0;
    var progress = setInterval(function () {

        if (current_perc < 75) {
            current_perc += 1;
            bar.css('width', (current_perc) + '%');
        } else {
            if (current_perc <= 100) {
                if (hasValue(checkbar)) {
                    if (ajaxCounter == 0) {
                        current_perc += 1;
                    } else {
                        if (current_perc < 90) {
                            current_perc += 0.2;
                        }
                        if (current_perc > 90) {
                            current_perc = 94;
                        }
                    }

                } else {
                    current_perc += 0.2;
                }
                bar.css('width', (current_perc) + '%');
            } else {
                bar.css('width', '100%');
            }
        }

        if (current_perc >= 100) {
            clearAnimationBar();
        }

    });
}

function clearAnimationBar() {

    $('#loadingBarWidth').css("width", "1%");
}
/*function to replace 'space' by '&nbsp;'*/
function replaceSpace(value) {
    var newValue = replaceAll(" ", value, "&nbsp;");
    return newValue;
}

function formatStringEllipsis(value, length) {
    var val = "";
    if (hasValue(value)) {
        var len = value.length;
        if (len >= length) {
            var str = value.substring(0, length);
            val = str + "...";
        } else
            return value;
        return val;
    } else
        return "--";
}

function formatDoubleEllipsis(stringValue, length) {
    var value = stringValue + "";

    var res = "";

    if (hasValue(value)) {
        var len = value.length;
        if (len >= length) {
            var str = value.substring(0, length);
            res = str;

        } else
            return value;
        return res;
    } else
        return "--";
}

/*This function formats the value of given string in Camel Format(It splits the value with space)*/
function formatInCamelString(value) {
    var rankName = new Array();

    rankName = value.split(" ");
    var str = "";
    var size = rankName.length;
    for (i = 0; i < rankName.length; i++) {
        var fc = rankName[i].charAt(0).toUpperCase();
        str += fc + rankName[i].substr(1, rankName[i].length - 1).toLowerCase() + " ";
    }

    return str.substr(0, str.length - 1);
}

/*this function is to format the name field upto 60 characters*/
function formatName(value, count) {
    if (!hasValue(count))
        count = 45;
    var str = "";
    if (hasValue(value)) {
        if (value.length > count)
            str = "<span title='" + value + "'>" + value.substring(0, count - 3) + "..." + "</span>";
        else
            str = "<span title='" + value + "'>" + value + "</span>";

        return str;
    }

    return value;
}

function ellipsis(text) {
    if (BrowserDetect.browser == "Explorer") {
        var val = text + "";
        if (val != null && val.length > 10) {
            return val.substring(0, 10) + "...";
        } else {
            return val;
        }
    } else {
        return text;
    }
}

/*This function is used for open page in main div*/
function openPage(page, sidbarflag) {
    hasSession();
    if(page!=editProfile_html)
    EDIT_PROFILE_BACK = page;
    var dataflag = true;

    if (lastactivePageforOpenpage == page) {
        if (hasValue(sidbarflag)) {
            dataflag = false;
        }
    }
    if(page=="my_task/my_task.html")
        dataflag = true;
    if (dataflag) {
        lastactivePageforOpenpage = page;
        startAnimationBar(false);
        currentActivePage = page;
        pageLowerLimit = 0;
        pageUpperLimit = maxlimitofpagination;
        FILTER_TASK_VALUE = 'All';
        FILTER_TASK_TYPE = '';
        isFiltter = false;


        if (hasValue(dummyid))
            sendDELETERequest(context + "/rest/QualityAudit/delete/" + dummyid, "", "delete_quality_audit_common_callback", "");

        if (hasValue(lastactivePage)) {
            if (lastactivePage == page) {
                $("#" + lastactiveDiv).empty();



                $('#' + lastactiveDiv).append('<div class="loaded_content_wrapper" id="' + lastactiveDiv + '_samepage" style=" margin-left: 0% !important;"></div>');
                appendDataInDiv(lastactiveDiv + '_samepage  ', page);
            } else {
                var show = 1;
                var w = $('#admin_content').width() / show;

                $('#main_div').width(w);

                if ($('#main_div div').hasClass("loaded_content_wrapper")) {
                    $('#main_div').first().animate({
                        marginLeft: -w
                    }, 'slow', function () {

                        //$("#main_div_1").appendTo($(this).parent()).css({marginLeft: 0});

                        $wrapper = $('<div>');
                        $wrapper.addClass('loaded_content_wrapper').appendTo('#main_div_1').load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

                            if (page != page_500_html && page != page_404_html) {
                                lastactivePage = page;
                            }
                            lastactivePageforOpenpage = page;
                            lastactiveDiv = "main_div_1"
                            $(this).animate({
                                marginLeft: 0
                            }, 'slow').prev().animate({
                                marginLeft: '0%'
                            }, 'slow', function () {

                                $(this).remove(); //remove previous content once the animation is complete

                            });
                            window.setTimeout(function () {
                                $("#main_div").empty();
                                $("#main_div").remove();
                                $("#admin_content").append('<div class="sites-list-box" id="main_div"></div>')
                            }, 50);
                        })

                    });
                } else {

                    $('#main_div_1').first().animate({
                        marginLeft: -w
                    }, 'slow', function () {

                        $wrapper = $('<div>');
                        $wrapper.addClass('loaded_content_wrapper').appendTo('#main_div').load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

                            if (page != page_500_html && page != page_404_html) {
                                lastactivePage = page;
                            }
                            lastactivePageforOpenpage = page;
                            lastactiveDiv = "main_div"
                            $(this).animate({
                                marginLeft: 0
                            }, 'slow').prev().animate({
                                marginLeft: '0%'
                            }, 'slow', function () {

                                $(this).remove(); //remove previous content once the animation is complete

                            });
                        })
                        window.setTimeout(function () {
                            $("#main_div_1").empty();
                            $("#main_div_1").remove();
                            $("#admin_content").append('<div class="sites-list-box" id="main_div_1"></div>')
                        }, 50);
                    });



                }

            }

        } else {
            animationCall("main_div", page);
        }
    }
}

function animationCall(divid, page) {


    if (page != sitesmapview_html) {
        $wrapper = $('<div>');
        $wrapper.addClass('loaded_content_wrapper').appendTo('#' + divid).load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

            if (page != page_500_html && page != page_404_html) {
                lastactivePage = page;
            }
            lastactivePageforOpenpage = page;
            lastactiveDiv = divid;
            $(this).animate({
                marginLeft: 0
            }, 'slow').prev().animate({
                marginLeft: '0%'
            }, 'slow', function () {

                $(this).remove(); //remove previous content once the animation is complete
            });
        })
    } else {
        $('#main_div').append('<div class="loaded_content_wrapper" id="main_divsitesmapview_html" style="margin-left: 0% !important;"></div>');
        appendDataInDiv('main_divsitesmapview_html', sitesmapview_html)

    }
}

function delete_quality_audit_common_callback(XMLHttpRequest, data, rpcRequest) {

    if (!checkException(XMLHttpRequest.responseText)) {
        if (statuscheck(XMLHttpRequest.status, 'quality_audit')) {
            if (XMLHttpRequest.status == 204) {


            } else {
                showCenteredLoading(ERROR_IN_DELETE);
            }
        }
    }
}

/*this function is to show the set site list or grid type  */
function openPageByViewType(type, htmlPage) {
    viewType = type;
    openPage(htmlPage);
}

/*this function is to show the set workorder list or grid type  */
function openPageByViewTypeWorkorder(type, htmlPage) {
    viewTypeWrokOrder = type;
    openPage(htmlPage);
}

/*this function is to show the success message*/
function showSuccessMessage(msg) {

}

/*generic function to check the ajax response*/
function isAuthorize(rpcResponse, data, rpcRequest, callbackFunc) {

    loading_counter = loading_counter - 1;
    try {
        if (hasValue(rpcResponse.responseText)) {
            var sessionString = rpcResponse.responseText.substring(0, 30);
            if (sessionString.indexOf("<>") == 0) {
                window.location.href = context + "/jsp/login.jsp";
                return false;
            }
        }

        if (rpcResponse.status == 0) {

            return false;
        }

        if (rpcResponse.status == 403) {
            showCenteredLoading(access_failure_message);
            return false;
        }

        if (rpcResponse.status == 500) {
            $(".close").click();
            openPage(page_500_html);
            return false;
        } else if (rpcResponse.status == 404) {

            $(".close").click();
            openPage(page_404_html);
            return false;
        } else if (rpcResponse.status == 401) { /*Session expire message*/
            showCenteredLoading(gettingDetails_Error);
            return false;
        }
    } catch (e) {}
    return true;
}

var loading_counter = 0;
/*send json request*/

function sendPOSTRequest(url, jsonParams, callbackFunc, addlParam) {

    setCsrfCookie();
    loading_counter = loading_counter + 1;
    $.ajax({
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "application/json",
        headers: {
            "csrfParam": getCookieClosePortal()
        },
        beforeSend: function () {
            ajaxCounter = ajaxCounter + 1;
            showMainLoading(true);
            return true;
        },
        complete: function () {
            ajaxCounter = ajaxCounter - 1;
            showMainLoading();
        },
        data: {myData:jsonParams},
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
            } else {
                return false;
            }
        },
        success: function (data, status, errorThrown) {
            if (isAuthorize(XMLHttpRequest, status, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
            } else {
                return false;
            }
        }
    });
    delete_cookie('csrfToken');
}

/*send json request*/
function sendPUTRequest(url, jsonParams, callbackFunc, addlParam) {
    loading_counter = loading_counter + 1;

    $.ajax({
        type: "PUT",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "application/json",
        headers: {
            
        },
        beforeSend: function () {
            ajaxCounter = ajaxCounter + 1;
            showMainLoading(true);
            return true;
        },
        complete: function () {
            ajaxCounter = ajaxCounter - 1;
            showMainLoading();
        },
        data: jsonParams,
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
            } else {
                return false;
            }
        },
        success: function (data, textStatus, errorThrown) {
            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
            } else {
                return false;
            }
        }
    });
}

/*determine the monthname based on value*/
function getMonthName(monthNum) {
    var monthName = "Unknown";
    switch (monthNum) {
    case 0:
        monthName = "Jan";
        break;
    case 1:
        monthName = "Feb";
        break;
    case 2:
        monthName = "Mar";
        break;
    case 3:
        monthName = "Apr";
        break;
    case 4:
        monthName = "May";
        break;
    case 5:
        monthName = "Jun";
        break;
    case 6:
        monthName = "Jul";
        break;
    case 7:
        monthName = "Aug";
        break;
    case 8:
        monthName = "Sep";
        break;
    case 9:
        monthName = "Oct";
        break;
    case 10:
        monthName = "Nov";
        break;
    case 11:
        monthName = "Dec";
        break;
    }
    return monthName;
}

function sendGETRequest(url, callbackFunc, addlParam, notShowLoading) {
    loading_counter = loading_counter + 1;

    setCsrfCookie();
    $.ajax({

        type: "GET",
        url: url,
        headers: {
            
            "csrfParam": getCookieClosePortal()
        },
        beforeSend: function () {
            ajaxCounter = ajaxCounter + 1;
            showMainLoading();
            return true;
        },
        complete: function () {
            ajaxCounter = ajaxCounter - 1;
            showMainLoading();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {

                eval(callbackFunc + "(arguments[0], arguments[2].responseText, arguments[2], \"" + addlParam + "\")");
            } else {
                return false;
            }
        },
        success: function (data, status, request) {

           if (isAuthorize(request, status, data, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[2], arguments[0], arguments[1], \"" + addlParam + "\")");
            } else {
                return false;
            }
        }
    });
    delete_cookie('csrfToken');
}

function delete_cookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function getCookieClosePortal() {
    var csrfCookie = document.cookie;


    if (hasValue(csrfCookie)) {
        return getCookieValue('csrfToken')
    }
    return '';
}

function setCsrfCookie() {
    currentTime = new Date();

    if ((currentTime - csrfCookieTime) > 10000) {
        document.cookie = "csrfToken=" + Math.random().toString(36).substring(7) + ";Path=" + csrfCookiePath + ";Secure;";
        csrfCookieTime = new Date();
    }
}

function getCookieValue(c_name) {
    var c_value = document.cookie;

    if (c_value.indexOf(';') > -1)
        c_value = c_value.split(";")[1];

    c_value = c_value.split("=")[1];
    return c_value;

}

function sendDELETERequest(url, json, callbackFunc, addlParam) {

    $.ajax({
        type: "DELETE",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "application/json",
        data: json,
        headers: {
           
        },
        beforeSend: function () {
            ajaxCounter = ajaxCounter + 1;
            showMainLoading();
            return true;
        },
        complete: function () {
            ajaxCounter = ajaxCounter - 1;
            showMainLoading();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[0], arguments[1], arguments[2], \"" + addlParam + "\")");
            } else {
                return false;
            }
        },
        success: function (data, textStatus, errorThrown) {
            if (isAuthorize(XMLHttpRequest, textStatus, errorThrown, url, callbackFunc)) {
                eval(callbackFunc + "(arguments[2], arguments[1], arguments[0], \"" + addlParam + "\")");
            } else {
                return false;
            }
        }
    });
}

function hasValue(form, fieldId) {
    if (form == null) return false;
    var val = form.getValue(fieldId);
    return hasValue(val);
}

function hasValue(val) {
    return (val != null && val != undefined && val != NaN && val != "NaN" && val != "null" && val != "undefined" && (val != "" || String(val) == "0") && val != "-Please select-" && val != "--");
}

function formatAsDate(dt, separator, showYear) {
    if (hasValue(dt)) {
        if (!hasValue(separator)) separator = "-";
        var newDate = new Date(dt);

        var date = newDate.getFullYear() + separator;
        var month = newDate.getMonth() + 1 + "";
        var day = newDate.getDate() + "";
        month = (month.length == 1 ? ("0" + month) : month);
        day = (day.length == 1 ? ("0" + day) : day);
        date += month + separator + day;

        return date;
    } else return "";
}

function DateformatAsDDMMYYYY(dt, separator) {
    if (hasValue(dt)) {
        if (!hasValue(separator)) separator = "-";
        var newDate = new Date(dt);


        var month = newDate.getMonth() + 1 + "";
        var day = newDate.getDate() + "";
        var year = newDate.getFullYear();
        month = (month.length == 1 ? ("0" + month) : month);
        day = (day.length == 1 ? ("0" + day) : day);
        var date = day + separator + month + separator + year;

        return date;
    } else return "--";
}

function DateformatAsYYYYMMDD(dt, separator) {
    
    if (hasValue(dt)) {
        if (!hasValue(separator)) separator = "-";
        var newDate = new Date(dt);
        var month = newDate.getMonth() + 1 + "";
        var day = newDate.getDate() + "";
        var year = newDate.getFullYear();
        month = (month.length == 1 ? ("0" + month) : month);
        day = (day.length == 1 ? ("0" + day) : day);
        var date =year + separator + month  + separator +  day;
        return date;
    } else return "";
}

function formatAsDateandTime(dt, separator, showYear) {
    if (hasValue(dt)) {
        if (_.isNumber(dt)) {
            if (!hasValue(separator)) separator = "-";
            var newDate = new Date(dt);
            var date = newDate.getDate() + separator + getMonthName(newDate.getMonth());
            if (showYear) date += separator + newDate.getFullYear();
            date += "&nbsp;" + newDate.toLocaleTimeString();
            return date;
        } else {
            return "--";
        }
    } else return "--";
}
function formatAsDDMMYYYYandTime(dt, separator, showYear) {
    if (hasValue(dt)) {
        if (_.isNumber(dt)) {
            if (!hasValue(separator)) separator = "-";
            var newDate = new Date(dt);
            var date = DateformatAsDDMMYYYY(dt,"-")
            date += "&nbsp;" + newDate.toLocaleTimeString();
            return date;
        } else {
            return "--";
        }
    } else return "--";
}

function formatAsDateINMMM(dt, separator, showYear) {
    if (hasValue(dt)) {
        if (!hasValue(separator))
            separator = "-";
        var newDate = new Date(dt);
        var date = newDate.getDate() + separator + getMonthName(newDate.getMonth());
        if (showYear)
            date += separator + newDate.getFullYear().toString().substring(2);
        return date;
    } else
        return "--";
}

/*this function is to return the date based on the value selected*/
function getSearchDateValue(value) {
    var val = "";
    if (value == "Any_time") val = "";
    if (value == "0") val = new Date();
    if (value == "1") val = getBeforeDate('1');
    if (value == "7") val = getCurrentWeek();
    if (value == "15") val = getBeforeDate('15');
    if (value == "30") val = getCurrentMonth();
    if (value == "90") val = getCurrentQuarter();
    if (value == "365") val = getCurrentYear();

    if (hasValue(val)) {
        return convertToSendFormatFordate(val);
    } else return "";

}

/*this function is to get the before date from the passed days*/
function getBeforeDate(days) {
    var today = new Date();
    var todayTime = today.getTime();
    var one_day = 1000 * 60 * 60 * 24;

    var beforeTime = todayTime - (parseInt(days) * one_day)
    var beforeDate = new Date(beforeTime);
    return beforeDate;
}

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();

    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};

//function to convert date inputs to sending Date format
function convertToSendFormatFordate(dateObj) {
    var currentDate = dateObj.getDate();
    var currentMonth = dateObj.getMonth() + 1;
    var currentYear = dateObj.getFullYear();

    var currentHour = dateObj.getHours();
    var currentMinute = dateObj.getMinutes();
    var currentSecond = dateObj.getSeconds();

    var dateToSend = currentYear + "-" + currentMonth + "-" + currentDate;
    return dateToSend;
}


function isIntegar(value) {
    var isNumber = /^\d+$/.test(value);
    return isNumber;
}

function convertTimeStamp2Date(data, type, full) {
    if (data != null) {
        var date;
        if (isIntegar(data))
            date = new Date(parseInt(data));
        else
            date = new Date(data);

        var str = date.toDateString();
        return str;
    }

    return "";
}

function convertTimeStamp2DateTime(data, type, full) {
    if (data != null) {
        var date;
        if (isIntegar(data))
            date = new Date(parseInt(data));
        else
            date = new Date(data);

        var str = date.toDateString() + " " + date.toLocaleTimeString();
        return str;
    }

    return "";
}

/*function to check Exception*/
function checkException(data) {
    if (hasValue(data)) {
        var responseMessage = data;

        if (responseMessage.indexOf("errors") != -1) {
            var jsonmessage = JSON.parse(responseMessage);
            showCenteredLoading(JSON.stringify(jsonmessage.errors[0].name) + " " + JSON.stringify(jsonmessage.errors[0].value.message));

            return true;
        }
        if (responseMessage.indexOf("excpmesg") != -1) {
            var jsonmessage = JSON.parse(responseMessage);
            var msg = jsonmessage.excpmesg.split("at row");
            showCenteredLoading(msg);

            return true;
        } if (responseMessage.indexOf("errorMsg") != -1) {
            var jsonmessage = JSON.parse(responseMessage);
            var msg = jsonmessage.errorMsg;
            showCenteredLoading(msg);

            return true;
        } 
         else {
            return false;

        }
    }
}

function makeFirstLetterUpperCase(value) {
    if (hasValue(value)) {
        var upper = value.charAt(0).toUpperCase() + value.slice(1)

        //showCenteredLoading(upper);

        if (upper == "Circle") {
            upper = "R4GState";

        }

        return upper;
    }

    return value;
}

function calculate_time_difference(data) {
    var date = new Date(parseInt(data));
    var today = new Date();

    var diffMs = (today - date);
    var diffDays = Math.round(diffMs / 86400000);
    var diffHrs = Math.round((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);


    if (diffDays != 0) {
        return date.toDateString();
    } else if (diffHrs != 0) {
        return diffHrs + "hr";
    } else {

        return diffMins + "min"
    }

}

function imageUploaded(status) {
    if (status) {
        showSuccessMessage(imageupload_success_message);
    } else showCenteredLoading(imageupload_failure_message);
}

/*Find Index by Column name*/
function getIndexOfTableByName(oSettings, colname) {
    for (var i = 0; i < oSettings.aoColumns.length; i++) {
        if (oSettings.aoColumns[i].sTitle == $.trim(colname)) {
            return i;
        }
    }
}

function statuscheck(statuscode, tablename) {
    if (statuscode == 500) {

        return false;
    } else if (statuscode == 404) {

        return false;

    }

    return true;

}

function hasSession() {
    isSessionAvailable();
}

function isSessionAvailable() {
    sendGETRequest(context + "/rest/Users/isUserAvailable?date=" + new Date(), "isSessionAvailableCallback", "", true);
}

function isSessionAvailableCallback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        if(data!=true){
            location.reload();
        }
    } else {
        //window.location.href = "index.jsp";
    }

}

function commentAddpress(formId) {

    $('#' + formId).find('input:text').keypress(function (e) {

        if (e.keyCode == 13) {
            return false;
        } else {

        }

    });
}

function getCurrentDate() {
    var dateObj = new Date();

    return dateObj.getFullYear() + "-" + (((dateObj.getMonth() + 1) < 10) ? "0" : "") + (dateObj.getMonth() + 1) + "-" + ((dateObj.getDate() < 10) ? "0" : "") + dateObj.getDate();

}

function Dateinlineformat(date) {

    var dateObj = new Date(date);
    return dateObj.getFullYear() + "-" + (((dateObj.getMonth() + 1) < 10) ? "0" : "") + (dateObj.getMonth() + 1) + "-" + ((dateObj.getDate() < 10) ? "0" : "") + dateObj.getDate();

}

function customInlineCall(check, gridId) {

    jQuery("#" + gridId).saveRow(check, true, 'clientArray');
    var newdata = jQuery("#" + gridId).getRowData(check);
    var replacedata = JSON.stringify(newdata);
    var data = replacedata.replace(':{', '":{"');
    data = data.replace('!@#$%^&"', '"}');
    var callId = gridId.split("_grid");
    var call = callId[0].substr(0, 1).toUpperCase() + callId[0].substr(1);

    jQuery("#" + gridId).jqGrid('hideCol', 'actions_inline');
    jQuery("#" + gridId).jqGrid('showCol', 'actions');
    sendPUTRequest(context + "/rest/" + call + "/update/", data, "edit_" + callId[0] + "_callback", "");

}

//function to get selectbox valuemap 
function getHdrCtrlDataWithValue(data, valueItem, fieldItem, isAppendNull) {
    var isAppend = false;
    if (hasValue(isAppendNull)) {
        isAppend = true;
    }

    if (data !== null) {
        var arrStr = "";
        if (isAppendNull) {
            arrStr = "{\"\":\"  -  \",";
        } else {
            arrStr = "{";
        }
        for (var i = 0; i < data.length; i++) {
            arrStr += "\"" + eval("arguments[0][" + i + "]." + fieldItem) + "\":\"" + eval("arguments[0][" + i + "]." + valueItem) + "\",";
        }
        if (arrStr.length > 1) {
            arrStr = arrStr.substring(0, arrStr.length - 1);
        }
        arrStr += "}";

        return arrStr;
    }
}

function mergeTwoJSON(json1, json2) {
    json1 = json1.substring(0, json1.length - 1);
    json2 = json2.substring(1, json2.length);
    json1 += ',' + json2;
    return json1;
}

function checkStringInArray(arr, str) {
    var j = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
            j = 1;
            return true;
        }
        if (j == 0) {
            return false;
        }
    }

}

function getIndexStringInArray(arr, str) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == str) {
            return i;

        }

    }

}

function dateformatforHistory(date) {

    var dateObj = new Date(date);
    return dateObj.getFullYear() + "-" + (((dateObj.getMonth() + 1) < 10) ? "0" : "") + (dateObj.getMonth() + 1) + "-" + ((dateObj.getDate() < 10) ? "0" : "") + dateObj.getDate() + " " + dateObj.toLocaleTimeString();

}

function makeFirstLetterUpperCaseAndRemoveUnderscore(value) {
    if (hasValue(value)) {
        var upper = value.charAt(0).toUpperCase() + value.slice(1)

        if (upper == "Circle") {
            upper = "R4GState";
        }

        return replaceAll("_", upper, " ");
    }

    return value;
}

function replaceIncaseSensitiveString(Str, StrToReplace, isCss) {
    var isApplyCss = true;
    if (hasValue(isCss))
        isApplyCss = false;

    var re = new RegExp('(' + StrToReplace + ')', 'gi');
    if (isApplyCss)
        Str = Str.replace(re, '<span class="highlighted">$1</span>');
    else
        Str = Str.replace(re, '<span>$1</span>');
    return Str;
}

function replaceAll(oldStrPattern, str, newStrPattern) {
    var temp = "";
    if (str != null && oldStrPattern != null) {
        var idx = str.indexOf(oldStrPattern);
        while (idx > -1) {
            temp += str.substr(0, idx);
            temp += newStrPattern;
            str = str.substr(idx + oldStrPattern.length, str.length);
            idx = str.indexOf(oldStrPattern);
        }
        temp += str;
    }
    return temp;
}

function getUniqueArray(arr) {
    if (arr.length > 0)
        return _.uniq(arr);

    return arr;
}

function resetTestEditor(id) {
    $('#' + id + ' #editor').text("");
    $("#" + id).trigger('reset');
    $("#" + id).find("input[type=text], textarea").val("");
    $('#' + id).validationEngine('hideAll');
  //  appendRoleInform('add_user_form','roles');
    appendStatesForUser();
    $("#leadContainer").css("display", "none");
    $("#imei_number_div").css("display", "none");
    $("#add_user_form #jio_state_div").css("display", "none");
    $("#add_user_form #city_div").css("display", "none");
    $("#add_user_form #jio_center_div").css("display", "none");
    populateStateForUserAddress();
    $('#create_user_body').slimscroll({
        color: '#5F6173',
        height: '440px'
    });     

}

function formatRichTextValue(value) {

    value = replaceAll("\\", value, "\\\\");
    value = replaceAll("\"", value, "\\\"");
    return value;
}

function getImageById(taskId) {
    sendGETRequest(context + "/rest/Image/search?_s=site.id==" + workOrderSiteId + ";parentCategory==Installation&orderBy=id&orderType=acs&ulimit=100&llimit=0&date="+new Date(), "getImageDatabySiteID", "", true);
}

function getImageDatabySiteID(XMLHttpRequest, data, rpcRequest) {
    //showCenteredLoading(data);
    if (statuscheck(XMLHttpRequest.status, 'image')) {
        if (!checkException(XMLHttpRequest.responseText)) {
            if (XMLHttpRequest.status == 200) {

                Imagelistdata = data;
                var imagename;
                var id;
                for (var i = 0; i < Imagelistdata.length; i++) {
                    id = Imagelistdata[i].id;

                    //imagename=Imagelistdata[i].name;
                    imagename = (Imagelistdata[i].name).replace(/ /g, "_");

                    if (Imagelistdata[i].fileUploads != null) {
                        var imageUrl = Imagelistdata[i].fileUploads.file;
                        $('#' + imagename).attr('src', "../" + imageUrl.split("siteforge/")[1]);
                        $('#' + imagename).parent().attr('href', "#image_file_upload_modal");
                        $('#' + imagename).parent().attr('onclick', "openFileuploadPage('" + id + "');");

                        //  $('#' + imagename).attr('id', id);

                    } else {

                        //showCenteredLoading(imagename+" = "+Imagelistdata[i].id);
                        $('#' + imagename).parent().attr('href', "#image_file_upload_modal");
                        $('#' + imagename).parent().attr('onclick', "openFileuploadPage('" + id + "');");

                        // $('#' + imagename).attr('id', id);


                    }

                }
            }
        }
    }
}


function closeAndRefreshTheTab() {
    var flag = true;
    var myVar = setInterval(function () {
        myTimer()
    }, 2000);

    function myTimer() {
        if (flag)
            getImageById();
        flag = false;
    }
    $('.modal-backdrop').css('z-index', -3);

}


function replaceUnderscore(string, isForInput) {

    if (hasValue(string)) {
        string = string.toString();
        if (string.indexOf('_') != -1) {
            var temp = string.split('_');
            var returnValue = "";
            for (var i = 0; i < temp.length; i++) {
                returnValue += temp[i] + " ";
            }
            return returnValue.replace("LSMR", "LSM-R");
        } else {
            return string.replace("LSMR", "LSM-R");
        }
    } else {
        if (hasValue(isForInput))
            return "";
        else
            return "--";
    }
}

/***default functions to call from index jsp***/
/*this function is get the login user details*/
function getLoginUserDetail() {
    sendGETRequest(context + "/rest/Users/userincontext?date=" + new Date(), "getLoginUserDetailCallback", '', true);
}
var jioCenterObject;
/*callback for the login user detail*/
function getLoginUserDetailCallback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        var username;
        var firstname = "";
        var lastname = "";
        userid = data.userid;
        email = data.email;
        roles = data.roles;
        if(hasValue(data.firstname)){
            firstname=data.firstname;
        }
        if(hasValue(data.lastname)){
            lastname=data.lastname;
        }
        if(hasValue(data.username)){
            USER_NAME=data.username;
        }

        if (data.firstname == null || data.firstname == "Empty" || data.firstname == "--") {
            username = data.username;
        } else {
            username = firstname + " " + lastname;
        }
        $('#user-nameco').attr('title', username);
        loggedinUserName = username;
        document.getElementById("user-nameco").innerHTML = formatStringEllipsis(username, 15);
        contextUser = data;

        if (admin)
            roleNameLabel = "Admin";
        if (NHQPMO)
            roleNameLabel = "NHQ PMO";
        if (NHQEngineer)
            roleNameLabel = "NHQ Engineer";
        if (REExecutive)
            roleNameLabel = "RE Executive";
        if (FacilityEngineer)
            roleNameLabel = "Facility Engineer";
        if (FiberEngineer)
            roleNameLabel = "Fiber Engineer";
        if (FieldEngineerOperation)
            roleNameLabel = "Field Engineer";
        if (FCA)
            roleNameLabel = "FCA";      
         if(usermgmt)   
          roleNameLabel = "Admin";

        document.getElementById("userrolename").innerHTML =roleNameLabel;
        createIndexPageSideMenuBar();

    }

}
/* Call Back Function of get all zone */
function getZoneDataCallBack(XMLHttpRequest, data, rpcRequest) {
    if (statuscheck(XMLHttpRequest.status, 'site')) {
        if (!checkException(XMLHttpRequest.responseText)) {
            if (XMLHttpRequest.status == 200) {
                $('#editGovCircle').empty();
                zoneDataObject = data;
            }
        }
    }
}

/*this function is to get the login user profile image for the right hand top side*/
function getLoginUserImage() {
    sendGETRequest(context + "/rest/Users/getUserImage?date=" + new Date(), "getLoginUserImageCallback", "", true);
}

/*callback for the login user profile image*/
function getLoginUserImageCallback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        var datetime = new Date();
        datetime = datetime.getTime();
        jQuery("#user_profile_image").attr("src", "../rest/Users/getUserImage?date=" + datetime);
    } else {
        jQuery("#user_profile_image").attr("src", "../images/user.jpg");
    }
}

/*this function is to get the login user notification list for the top*/
function getLoginUserNotification() {
    var date = new Date();
    sendGETRequest(context + "/rest/EmailNotifications/FIQLsearch?_s=createdDate=ge=" + date.yyyymmdd() + ";sentTo.userid==" + userid + ";email==" + email + "&date=" + new Date() + "&ulimit=1000&llimit=0&orderBy=createdDate&orderType=desc", "getLoginUserNotificationCallback", "", true);
}

/*callback to get the login user notification list for the top*/
function getLoginUserNotificationCallback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        email_notifications = data.length;
        $("#emailnotify").append(email_notifications);

        $("#emailnotifyul").append("<li class='nav-header' id='emailnotifyli'><i class='icon-mail'></i> " + email_notifications + " emails</li>");
        emailNotificationRowData = data;
        createUserNotificationList(data);
    }
}

/*this function is to get the login user activity data for the top*/
function getLoginUserActivity() {
    var date = new Date();
    date.setDate(date.getDate() - 1);
    sendGETRequest(context + "/rest/ActivityStream/FIQLsearch?_s=date=ge=" + date.yyyymmdd() + ";user.userid==" + userid + "&date=" + new Date() + "&ulimit=1000&llimit=0&orderBy=date&orderType=desc", "getLoginUserActivityCallback", "", true);

}

/*callback to get the login user activity data for the top*/
function getLoginUserActivityCallback(XMLHttpRequest, data, rpcRequest) {
    if (XMLHttpRequest.status == 200) {
        notifications = data.length;
        $("#notify").append(notifications);
        $("#notifyul").append("<li class='nav-header' id='notifyli'><i class='icon-bell '></i> " + notifications + " notifications </li>");
        notificationRowData = data;
        createUserActvityList(data);
    }
}

/*this function is to show the default image when no image is set for the profile*/
function ImgError(source) {
    source.src = "../images/user.jpg";
    source.onerror = "";
    return true;
}

/*this function is to create the email notification list for the top*/
function createUserNotificationList(data) {
    var len;
    len = (email_notifications < 4) ? email_notifications : 4;

    for (i = 0; i < len; i++) {
        var userId = data[i].sentTo.userid;
        $("#emailnotifyul").append("<li><a href='#' onclick='createEmailNotificationTab()' ><img class='btn-mini' style='max-height:18px;max-width:18px;' width='18px' height='18px' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + ">" + data[i].subject + "</BR>    " + convertTimeStamp2Date(data[i].createdDate) + "</a></li>");
    }

    $("#emailnotifyul").append("<div style='text-align: center;'><a href='#' onclick=openPage('emailnotificationslist.html')>See all</a></div>");
}

/*this function is to create the activity data for the top*/
function createUserActvityList(data) {
    var len;
    len = (notifications < 4) ? notifications : 4;
    for (i = 0; i < len; i++) {
        if (data[i].message.length <= 30) {
            var userId = data[i].user.userid;
            $("#notifyul").append("<li><a href='#' onclick='createAllNotificationTab()'><img class='btn-mini' style='max-height:18px;max-width:18px;' height='18px' width='18px' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + " /> " + data[i].message + "</a></li>");
        } else {
            var userId = data[i].user.userid;
            var message = data[i].message.substring(0, 27);
            message = message + "...";
            $("#notifyul").append("<li><a href='#' onclick='createAllNotificationTab()'><img class='btn-mini' style='max-height:18px;max-width:18px;' height='18px' width='18px' onError='ImgError(this);' src=" + context + "/rest/Users/getUserImageById/" + userId + "/>" + message + "</a></li>");
        }
    }

    $("#notifyul").append("<div style='text-align: center;'><a href='#' onclick=openPage('notificationslist.html')>See all</a></div>");
}

/*this funciton is to format the date for the recent activity*/
function formatStreamDate(date, addLineChnage) {
    var validateDate = formatDateForStream(date);
    var todayDate = formatDateForStream(new Date());
    var yesterdayDate = formatDateForStream(getBeforeDate(1));
    var timezone = " " + getTimeZone(date);
    var br = "&nbsp;"
    if (addLineChnage)
        br = "<br>";
    if (validateDate == todayDate)
        return "Today" + br + getStreamTime(date) + timezone;
    if (validateDate == yesterdayDate)
        return "Yesterday" + br + getStreamTime(date) + timezone;
    return getFormattedDate(new Date(date)) + br + getStreamTime(date) + timezone;
}

/*this function is to show the date in format  dd - monthname - year   : returns '-' if empty value*/
function formatDateForStream(value) {
    if (hasValue(value)) {
        var date = new Date(value);
        return getFormattedDate(date, '-', true)
    }
    return '-';
}
/*format date object in readle date format  dd-monthName-yyyy*/

function getFormattedDate(dt, separator, showYear) {
    if (!hasValue(separator)) separator = "-";
    var day = dt.getDate()
    if (day < 10)
        day = "0" + day;
    var date = day + separator + getMonthName(dt.getMonth());
    if (showYear) {
        var curYear = dt.getFullYear();
        date += separator + curYear.toString().slice(2);
    }
    return date;
}

/*this funciton is to return the time zone*/
function getTimeZone(date) {
    var d = new Date(date);
    var usertime = d.toLocaleString();
    // Some browsers / OSs provide the timezone name in their local string:
    var tzsregex = /\b(ACDT|ACST|ACT|ADT|AEDT|AEST|AFT|AKDT|AKST|AMST|AMT|ART|AST|AWDT|AWST|AZOST|AZT|BDT|BIOT|BIT|BOT|BRT|BST|BTT|CAT|CCT|CDT|CEDT|CEST|CET|CHADT|CHAST|CIST|CKT|CLST|CLT|COST|COT|CST|CT|CVT|CXT|CHST|DFT|EAST|EAT|ECT|EDT|EEDT|EEST|EET|EST|FJT|FKST|FKT|GALT|GET|GFT|GILT|GIT|GMT|GST|GYT|HADT|HAEC|HAST|HKT|HMT|HST|ICT|IDT|IRKT|IRST|IST|JST|KRAT|KST|LHST|LINT|MART|MAGT|MDT|MET|MEST|MIT|MSD|MSK|MST|MUT|MYT|NDT|NFT|NPT|NST|NT|NZDT|NZST|OMST|PDT|PETT|PHOT|PKT|PST|RET|SAMT|SAST|SBT|SCT|SGT|SLT|SST|TAHT|THA|UYST|UYT|VET|VLAT|WAT|WEDT|WEST|WET|WST|YAKT|YEKT)\b/gi;
    // In other browsers the timezone needs to be estimated based on the offset:
    var timezonenames = {
        "UTC+0": "GMT",
        "UTC+1": "CET",
        "UTC+2": "EET",
        "UTC+3": "EEDT",
        "UTC+3.5": "IRST",
        "UTC+4": "MSD",
        "UTC+4.5": "AFT",
        "UTC+5": "PKT",
        "UTC+5.5": "IST",
        "UTC+6": "BST",
        "UTC+6.5": "MST",
        "UTC+7": "THA",
        "UTC+8": "AWST",
        "UTC+9": "AWDT",
        "UTC+9.5": "ACST",
        "UTC+10": "AEST",
        "UTC+10.5": "ACDT",
        "UTC+11": "AEDT",
        "UTC+11.5": "NFT",
        "UTC+12": "NZST",
        "UTC-1": "AZOST",
        "UTC-2": "GST",
        "UTC-3": "BRT",
        "UTC-3.5": "NST",
        "UTC-4": "CLT",
        "UTC-4.5": "VET",
        "UTC-5": "EST",
        "UTC-6": "CST",
        "UTC-7": "MST",
        "UTC-8": "PST",
        "UTC-9": "AKST",
        "UTC-9.5": "MIT",
        "UTC-10": "HST",
        "UTC-11": "SST",
        "UTC-12": "BIT"
    };
    var timezone = usertime.match(tzsregex);
    if (timezone) {
        timezone = timezone[timezone.length - 1];
    } else {
        var offset = -1 * d.getTimezoneOffset() / 60;
        offset = "UTC" + (offset >= 0 ? "+" + offset : offset);
        timezone = timezonenames[offset];
    }
    return timezone;
}

/*this function is to return the current time*/
function getStreamTime(value) {
    var date = new Date(value);
    var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var hourPrefix = hours;
    var hourSuffix = "";
    var time = hourPrefix + ":" + min;
    return time;
}
/*checkStartEndDate for check start and end date  */
function checkStartEndDate(formId, startDateId, endDateId, buttonId) {
    var startDate = $('#' + formId + ' #' + startDateId).val();
    var endDate = $('#' + formId + ' #' + endDateId).val();
    if (endDate != "") {
        if (endDate < startDate) {
            showCenteredLoading("Planned completion date should be greater than planned start date ");
        } else {
            return true;
        }
    }
}
/*checkStartEndDate for check start and end date for form  */
function checkStartEndDateForForm(startDateval, endDateval) {

    if (endDateval != "") {
        if (endDateval < startDateval) {
            showCenteredLoading("Planned completion date should be greater than planned start date ");
        } else {
            return true;
        }
    }
}


/* get all roles */
function getRoleList() {
    sendGETRequest(context + "/rest/Roles/search?orderBy=rolename&orderType=asc&ulimit=100&llimit=0", "getRolesListCallback");
}
/* get all roles callback */
function getRolesListCallback(XMLHttpRequest, data, rpcRequest) {
    if (!checkException(XMLHttpRequest.responseText)) {

        if (XMLHttpRequest.status == 200) {
            ROLE_DATA=data;
            rolesListforOrganizaton = data;
            //  showCenteredLoading(JSON.stringify(rolesListforOrganizaton));
        }

    }

}

/* get all roles */
function getStateList() {
    sendGETRequest(context + "/rest/JioState/search?orderBy=name&orderType=asc&ulimit=100&llimit=0", "getStateListCallback");
}
/* get all roles callback */
function getStateListCallback(XMLHttpRequest, data, rpcRequest) {
    if (!checkException(XMLHttpRequest.responseText)) {

        if (XMLHttpRequest.status == 200) {
            STATE_LIST_DATA=data;
        }

    }
    populateStateForCityList();
}

function checkValueInRoleObjectFormate(data, name) {
    
    for (var i = 0; i < data.length; i++) {
        if (changeRoleName(data[i].rolename) == name){
            
            return data[i]
        }
    }

    return "";
}

function checkRoleInArr(formid, id, roleArr) {
    var option = "";
    $('#' + formid + ' #' + id).empty();
    if (ROLE_DATA != null) {
       var  sortedRole = "["

        for (i = 0; i < roleArr.length; i++) {
            var row = checkValueInRoleObjectFormate(ROLE_DATA, roleArr[i])
            if (hasValue(row))
                sortedRole += "{\"rolename\":\""+changeRoleName(row.rolename)+"\",\"roleid\":\""+row.roleid+"\"},"
        }
            sortedRole = sortedRole.substring(0,sortedRole.length-1)+"]"
            sortedRole = eval(sortedRole);
        var sorted = sortedRole.sort(function(a, b) { 
        return b.rolename < a.rolename ?  1 
             : b.rolename > a.rolename ? -1 
             : 0;                   
        });
        option += '<option value="">--Please select--</option>';

        for (i = 0; i < sorted.length; i++) {
            var row = sorted[i]
            if (hasValue(row) && row.rolename!='admin' )
                option += '<option value="' + row.roleid + '">' + changeRoleName(row.rolename) + '</option>';
        }
        $('#' + formid + ' #' + id).append(option);
    }
}


function appendRoleInform(formid, id) {
    var option = "";
     $('#' + formid + ' #' + id).empty();
    
    if (ROLE_DATA != null) {
        var  sortedRole = "["
             for (i = 0; i < ROLE_DATA.length; i++){
                  var row = ROLE_DATA[i]
                 sortedRole += "{\"rolename\":\""+changeRoleName(row.rolename)+"\",\"roleid\":\""+row.roleid+"\"},"
                 }
            sortedRole = sortedRole.substring(0,sortedRole.length-1)+"]"
            sortedRole = eval(sortedRole);
        
     var sorted = sortedRole.sort(function(a, b) { 
    return b.rolename < a.rolename ?  1 
         : b.rolename > a.rolename ? -1 
         : 0;                   
    });
        option += '<option value="">--Please select--</option>';

        for (i = 0; i < sorted.length; i++) {
            var row = sorted[i]
            if (hasValue(row) && row.rolename!='admin' )
                option += '<option value="' + row.roleid + '">' + changeRoleName(row.rolename) + '</option>';
        }
        $('#' + formid + ' #' + id).append(option);
    }

    
}




function logOutConfirmation(){
    bootbox.confirm("<font size='3'>Do you want to logout from the application ?</font>",function(result) {
    if(result) {
            window.onbeforeunload = null;
            logout();
        }
    });
}

function logout() {
    logoutform.submit();
}

/*Function used to download attachement */
function attachment_download(id, filename) {
    var url = context + "/attachment.jsp?attachment=" + id + "&filename=" + filename;
    window.open(url);
}

/*this functoion is to show logo loading*/
function showLogoloading() {
    $('#logoimage').addClass("spinner-icon");
    if (hasValue(browserVersion)) {
        if ((browserVersion.indexOf("MSIE") > -1)) {
            $('#logoimage').attr("src", "../images/animation.gif");
        }
    }
}

/*this functoion is to hide logo loading*/
function hideLogoloading() {

    $('#logoimage').removeClass("spinner-icon");
    if (hasValue(browserVersion)) {
        if ((browserVersion.indexOf("MSIE") > -1)) {
            $('#logoimage').attr("src", "../images/logo-small.png");
        }
    }
}
/*This function is to show regular loading*/
function showRegularLoading() {
    showLogoloading();
    uniqueid = $.gritter.add({
        title: 'Loading........',
        text: '',
        sticky: false,
        class_name: 'gritter-bottom-left'
    });
    return false;
}
/*This function is use to remove all loaders*/
function RemoveAllLoading() {
    hideLogoloading();
    $.gritter.removeAll();
    return false;
}
/*This function is remove specific loaders*/
function RemoveUniqueLoading() {

    $.gritter.remove(uniqueid, {
        fade: true, // optional
        speed: 'medium' // optional
    });
}

/*This function is use to cenetered loading*/
function showExpiryLoading(text) {

    $.gritter.add({
        title: text,
        //text: 'Just add a "gritter-center" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
        class_name: 'gritter-warning gritter-bottom-right',
        time: 5000
    });

    return false;

}
/*This function is use to cenetered loading*/
function showCenteredLoading(text) {

    $.gritter.add({
        title: text,
        //text: 'Just add a "gritter-center" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
        class_name: 'gritter-info gritter-bottom-right',
        time: 500
    });

    return false;

}

function getDateDifference(date1, date2) {
    date1 = new Date(date1);
    if (hasValue(date2)) {
        date2 = new Date(date2);
    } else
        date2 = new Date();

    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();
    if (date1 > date2) {
        // Calculate the difference in milliseconds
        var difference_ms = date1_ms - date2_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day) + " days left";
    } else {
        var difference_ms = date2_ms - date1_ms;

        // Convert back to days and return
        return Math.round(difference_ms / one_day) + " days aqo";
    }
}




function getImageUrl() {
    return "../images/";
}


//Html data append in div
function appendDataInDiv(div_id, html_page) {
    var url = context + "/pages/" + html_page;
    jQuery.get(url + "?date=" + encodeURIComponent(new Date()), function (data) {
        $('#' + div_id + '').html(data);
    });
}
/*This function is used to append right side slider*/
function sliderRightToggle() {

    if ($("#wrap").hasClass("slidein"))
        $("#wrap").removeClass("slidein");
    else {
        appendDataInDiv('sliderRightScroller', '../pages/misc/slidebar.html')
        $("#wrap").addClass("slidein");
    }

    if ($("#main-content").hasClass("slidein"))
        $("#main-content").removeClass("slidein");
    else
        $("#main-content").addClass("slidein");

}

function formatTextAreaData(text) {
    var str = "";
    if (hasValue(text)) {
        var o = {};
        $(text.split(/\n|\r/)).each(function (i) {
            o[i] = this;
            str += o[i].trim() + "<br>";
        });
    }
    str = str.substring(0, str.length - 4);
    return formatRichTextValue(str);
}

function showRejectJustificationModalWindow(taskId) {

    sendGETRequest(COMMENT_SEARCH_WORKORDER + "?_s=task.id==" + taskId + "&date=" + new Date(), "showRejectJustificationModalWindowCallback", "", true);
}
/* this function of callback of edit task */
function showRejectJustificationModalWindowCallback(XMLHttpRequest, data, rpcRequest) {

    if (!checkException(XMLHttpRequest.responseText)) {
        if (statuscheck(XMLHttpRequest.status, 'task')) {
            if (XMLHttpRequest.status == 200) {
                var comment = ""
                for (var i = 0; i < data.length; i++) {
                    comment += " " + data[i].comment

                }
                //showCenteredLoading(replaceAll('<br>',data[0].comment,'\n'))
                $("#Justification_view").html(htmlDecode(data[0].comment));


            }
        }
    }
}
/*function to return index page tabs*/
function createIndexPageSideMenuBar() {
    var mainStr = "";
    var navSelected = "";
    
  

    var userStr = '<div class="menu-box ng-scope" id="users_li" ><a href="javascript:void(0)" onclick="openPage(users_list_html,\'sidbarflag\');selectTopNav(\'users_li\')"><i class="icon-user-managment"></i><p class="ng-binding">User<br>Management</p></a></div>';
    var mytaskStr= '<div class="menu-box ng-scope" id="mytask_li" ><a href="javascript:void(0)" onclick="openPage(my_task_html,\'sidbarflag\');selectTopNav(\'mytask_li\')"><i class="glyphicon glyphicon-list-alt"></i><p class="ng-binding">My Tasks</p></a></div>';
    //var mystr= '<div class="menu-box ng-scope" id="my_li" ><a href="javascript:void(0)" onclick="openPage(my_html,\'sidbarflag\');selectTopNav(\'my_li\')"><i class="glyphicon glyphicon-list-alt"></i><p class="ng-binding">my tab</p></a></div>';
    
    
     if(admin)
    {
        EDIT_PROFILE_BACK=users_list_html;
        mainStr=userStr;
        openPage(users_list_html);
        navSelected = 'users_li';
    }
    
     if(NHQPMO)
    {
        mainStr=mytaskStr;
        openPage(my_task_html);
        navSelected = 'mytask_li';
    }
   
    $("#main-menu-div").empty();
    $("#main-menu-div").append(mainStr);
    selectTopNav(navSelected);
}

function getArrayFromObject(data, fieldItem) {
    if (data != null) {
        var arrStr = new Array();
        for (var i = 0; i < data.length; i++) {
            var value = (eval("arguments[0][" + i + "]." + fieldItem));
            if (value < 0)
                value = value * -1;
            arrStr.push(value);
        }
        return arrStr;
    }
}

function getDayDifferenceBetweenDates(date1, date2) {
    if (hasValue(date1))
        date1 = new Date(date1);
    else
        date1 = new Date();

    if (hasValue(date2))
        date2 = new Date(date2);
    else
        date2 = new Date();

    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date1_ms - date2_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
}

function differenceBetweenDateArray(array1, array2) {
    var arraydiff = new Array();
    if (array1.length == array2.length) {
        for (var i = 0; i < array1.length; i++) {
            arraydiff[i] = getDayDifferenceBetweenDates(array1[i], array2[i]);
        }
    } else {
        alert("invalid array length of objects")
    }

    return arraydiff;

}

function setBrowserVersion() {
    if (navigator.appVersion.indexOf(';') > 1)
        browserVersion = navigator.appVersion.split(';')[1];
    else
        browserVersion = navigator.appVersion;
}

function loadGlobalSiteSearch() {
    jQuery.widget("custom.catcomplete", jQuery.ui.autocomplete, {
        _renderMenu: function (ul, items) {
            var that = this,
                currentCategory = "";
            jQuery.each(items, function (index, item) {

                $("<li></li>").data("ui-autocomplete-item", item)
                    .append("<a>" + getInputCharacterZoom(item.name) + " <h6 style='display:inline;'>" + getInputCharacterZoom(item.assignedId) + "</h6></a>")
                    .appendTo(ul);
            });
        }
    });

    $(function () {
        $("#searchSitesIndex").catcomplete({
            delay: 0,
            source: function (request, response) {
                var term = request.term;
                siteFilterValue = term;
                jQuery.getJSON("../rest/Site/search?_s=(name==" + term + "),(assignedId==" + term + ")&orderBy=modifiedTime&orderType=desc&ulimit=100&llimit=0", request, function (data, status, xhr) {
                    return response(data);
                });
            },
            focus: function (event, ui) {
                /*$( "#searchSitesIndex" ).val(ui.item.name+" "+ui.item.assignedId);*/
                return false;
            },
            select: function (event, ui) {
                openSiteDetails(ui.item.id);
            },
            close: function (event, ui) {
                $("#searchSitesIndex").val("");
                return false;
            },
            minLength: 1,
            autoFocus: true
        });
    });

}
/*this funtion use for Bold Autocomplete value*/
function getInputCharacterZoom(input) {

    var intput1 = input.toLowerCase();
    var siteFilterValue1 = siteFilterValue.toLowerCase();
    var x1 = siteFilterValue1.length;
    var tmp = intput1.indexOf(siteFilterValue1);
    if (tmp > -1) {

        var v1 = input.substring(0, tmp);
        var v2 = input.substring(tmp, tmp + x1);
        var v3 = input.substring(tmp + x1, input.length);
        return v1 + "<b>" + v2 + "</b>" + v3;
    }
    return input;
}

/*Need to remove this functions*/
function requestTOExecuteQuery(formId) {
    if (jQuery('#' + formId).validationEngine('validate')) {
        var siteid = $('#' + formId + ' #siteid').val();
        var lsmrIp = $('#' + formId + ' #lsmrIp').val();
        sendGETRequest(context + '/rest/Dashboard/commandStatusExecute?ipLSMR=' + lsmrIp + '&siteID=' + siteid, "requestTOExecuteQueryCallback", siteid);
    }
}

/*Need to remove this functions*/
function requestTOExecuteQueryCallback(XMLHttpRequest, data, rpcRequest, param) {
    if (XMLHttpRequest.status == 204) {
        showCenteredLoading(SUCCESS_EXECUTE_QUERY);
        $('#executequeryModalWindowlink').css('display', '');
        $('#executequeryModalWindowlinkHref').attr('href', '../uploads/ATP11B_log_' + param + '.txt')
    } else {
        showCenteredLoading(SUCCESS_EXECUTE_QUERY);
        $('#executequeryModalWindowlink').css('display', '');
    }
}

function changeGlbSearchBgColor1(x) {
    $(".searchPanel").css("background", "white");
}

function changeGlbSearchBgColor(x) {
    $(".searchPanel").css("background", "#F2F2F2");
}




/*function to set placeholders in iE*/
function setPalceHolderOnIE() {

    var version = navigator.appVersion.split(';')[1];
    if (hasValue(version)) {
        if ((version.indexOf("MSIE 9.0") > -1)) {
            $(function () {
                var input = document.createElement("input");
                if (('placeholder' in input) == false) {
                    $('[placeholder]').focus(function () {
                        var i = $(this);
                        if (i.val() == i.attr('placeholder')) {
                            i.val('').removeClass('placeholder');
                            if (i.hasClass('password')) {
                                i.removeClass('password');
                                this.type = 'password';
                            }
                        }
                    }).blur(function () {
                        var i = $(this);
                        if (i.val() == '' || i.val() == i.attr('placeholder')) {
                            if (this.type == 'password') {
                                i.addClass('password');
                                this.type = 'text';
                            }
                            i.addClass('placeholder').val(i.attr('placeholder'));
                        }
                    }).blur().parents('form').submit(function () {
                        $(this).find('[placeholder]').each(function () {
                            var i = $(this);
                            if (i.val() == i.attr('placeholder'))
                                i.val('');
                        })
                    });
                }
            });
        }
    }
}

function openLastactivePage() {

    lastactiveOpenInnerSitesPage = "";
    openPage(lastactivePage);

}



function isScriptTagInRemarks(text) {
    return text.indexOf('<script>') > -1;
}

/* function for encode text content*/
function htmlEncode(value) {
    if (value) {
        return jQuery('<div />').text(value).html();
    } else {
        return '';
    }
}

/* function for decode text content*/
function htmlDecode(value) {
    if (value) {
        return $('<div />').html(value).text();
    } else {
        return '';
    }
}

function openSitesPageInCommonDiv(page, selectedLi, param) {

    $('#summaryUl li').each(function () {
        var id = $(this).attr('id');
        if (hasValue(id)) {
            if ($("#" + id).hasClass('active')) {
                $("#" + id).removeClass("active");
            }
        }
    });

    $("#" + selectedLi).addClass('active');
    if (hasValue(param)) {
        if (lastactiveOpenInnerSitesPage != page)
            openanimationForInnerSitePages(page);

    } else
        openanimationForInnerSitePages(lastactiveOpenInnerSitesPage)
}

function openanimationForInnerSitePages(page) {
    hasSession();

    if (hasValue(lastactiveDivSites)) {
        var show = 1;
        var w = $('#site-content').width() / show;

        $('#sitesCommonDiv').width(w);

        if ($('#sitesCommonDiv div').hasClass("loaded_content_wrapper_sites")) {
            $('#sitesCommonDiv').first().animate({
                marginLeft: -w
            }, 'slow', function () {

                $wrapper = $('<div>');
                $wrapper.addClass('loaded_content_wrapper_sites').appendTo('#sitesCommonDivSecond').load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

                    lastactiveOpenInnerSitesPage = page;
                    lastactiveDivSites = "sitesCommonDivSecond"
                    $(this).animate({
                        marginLeft: 0
                    }, 'slow').prev().animate({
                        marginLeft: '0%'
                    }, 'slow', function () {

                        $(this).remove();

                    });
                    window.setTimeout(function () {
                        $("#sitesCommonDiv").empty();
                        $("#sitesCommonDiv").remove();
                        $("#site-content").append('<div class="main-content-right animate-opacity ng-scope" id="sitesCommonDiv"></div>')
                    }, 50);
                })

            });
        } else {
            var show = 1;
            var w = $('#site-content').width() / show;

            $('#sitesCommonDivSecond').width(w);
            $('#sitesCommonDivSecond').first().animate({
                marginLeft: -w
            }, 'slow', function () {

                $wrapper = $('<div>');
                $wrapper.addClass('loaded_content_wrapper_sites').appendTo('#sitesCommonDiv').load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

                    lastactiveOpenInnerSitesPage = page;
                    lastactiveDivSites = "sitesCommonDiv"
                    $(this).animate({
                        marginLeft: 0
                    }, 'slow').prev().animate({
                        marginLeft: '0%'
                    }, 'slow', function () {
                        $(this).remove();

                    });
                })
                window.setTimeout(function () {
                    $("#sitesCommonDivSecond").empty();
                    $("#sitesCommonDivSecond").remove();
                    $("#site-content").append('<div class="main-content-right animate-opacity ng-scope" id="sitesCommonDivSecond"></div>')
                }, 50);
            });



        }

    } else {
        lastactiveOpenInnerSitesPage = page;
        $wrapper = $('<div>');
        $wrapper.addClass('loaded_content_wrapper_sites').appendTo('#sitesCommonDiv').load("../pages/" + page + "?date=" + encodeURIComponent(new Date()), function () {

            lastactiveDivSites = "sitesCommonDiv"

            $(this).animate({
                marginLeft: 0
            }, 'slow').prev().animate({
                marginLeft: '0%'
            }, 'slow', function () {

                $(this).remove();
            });
        })
    }
}


/* this function is used for open emf tool and call data for refresh emf calculator */
function openEmfTools(toolId) {
    var isOpen = $('#' + toolId).parent().hasClass('opened');
    $('#' + toolId).parent().toggleClass('opened');
    /*if (!isOpen && hasValue(siteIdforFilter)) {
        feedSectorWiseParam(siteIdforFilter);
    }*/
}

function formatDate(d) {
    if(hasValue(d))
    {
        return formatAsDateINMMM(d,'-',true)
    }
    else
        return "--";
}

function formatDateForBuildingDetails(dt) {
   if (hasValue(dt)) {
        var separator = "-";
        var newDate = new Date(dt);
        var date = newDate.getFullYear() + separator + (newDate.getMonth()+1)+separator+newDate.getDate();
        return date;
    } else
        return "--";
}

function openModalForStates() {
    if(ch){
        openPageForCities();
    }else if(bh){
        $("#city_launch_modal").modal('show');
        $('#populated_states option:first').prop("selected", "selected");
    }

}

function populateStateForCityList() {
    $("#populated_states").empty();
    $("#populated_states").append("<option>-Please Select-</option>");
    for (var i = 0; i < STATE_LIST_DATA.length; i++) {
        $("#populated_states").append("<option value=" + STATE_LIST_DATA[i].id + ">" + STATE_LIST_DATA[i].name + "</option>");
    }

}



function clearAllFormData(formId){
    $("#"+formId +" input").val("");
    $("#"+formId +" textarea").val("");
    $("#"+formId +" select option:first").prop("selected","selected");
    $("#"+formId).validationEngine('hideAll');
}

function detectBrowser(){
    var browserName = navigator.userAgent;
    if(browserName.indexOf("Firefox") > -1){
        isMozilla = true;
    }
    if(browserName.indexOf("MSIE") > -1){
        isIE = true;
    }
}

/*This function prevents user from entering value other than number*/
function checkForNumber(id){
    $("#"+id).bind('keypress',function(e){
        var key = e.which;
        isNumber = (key >= 48 && key <= 57) || key==8 || key==9;
        if(!isNumber){
        
            e.preventDefault();
        }
            
    });
}

/*This function prevents user from entering number and special characters and allows only alphabets*/
function checkForAlphabets(id){
    $("#"+id).bind('keypress',function(e){
        var key = e.which;
        isalphabet = (key >= 97 && key <= 122) || (key >= 65 && key <= 90) || key==8 || key==9;
        if(!isalphabet){
        
            e.preventDefault();
        }
            
    });
}

function getChildRoleOfLoggedInUser()
{
    if(pmo)
    {
        return "A";
    }
}

function changeRoleName(rolename){
    switch(rolename){
        case "State market planning":
            return "Market Planning Head";
        case "Acquisition Lead":
            return "Building Acquisition Lead";
        case "SPOG Head":
            return "Business Head";
        case "City Head":
            return "JC Head";
        case "TeamLead":
            return "Acquisition Team Lead";
        case "QCLead":
            return "QCLead";
        case "QCEngineer":
            return "QC Engineer";
        case "NPE":
            return "Network Planning Engineer";
        case "NPH":
            return "Network Planning Head";
        case "businessHead":
            return "OLT Business Head";
        case "technicalHead":
            return "Technical Head";
        case "commercialHead":
            return "Commercial Head";
        case "salesAndDistribution":
            return "Sales & Distribution";
        case "acquisitionExecutive":
            return "Acquisition Executive";
        case "CE":
            return "Construction Engineer";
        case "gisServiceEngineer":
            return "GIS Service Engineer";
        case "buildingConnectLead":
            return "Building Connect Lead";
        case "fcaLead":
            return "Finance Control Lead";
        case "rowExecutive":
            return "Public ROW Executive";
        case "Public ROW Executive":
            return "Public ROW Executive";
        case "surveyEngineer":
            return "Survey Engineer";
        case "technicalLead":
            return "Technical Lead";
        case "jcManager":
            return "Jio Center Manager";
        case "jioCenterManager":
            return "Jio Center Manager";
        case "JioCenterManager":
            return "Jio Center Manager";
        case "inBuildingConnectLead":
            return "In Building Connect Lead";
        case "designAcceptanceEngineer":
            return "Design Acceptance Engineer";
        case "FSA Technical Lead":
            return "FTTx Technical Lead";   
        case "QCLead":
            return "QCLead";
        case "QCEngineer":
            return "QC Engineer";
        case "Supervisor":
            return "Supervisor";
        case "UB GIS Executive":
            return "UB GIS Executive";
        default:
            return rolename;
    }
}



function changeRoleNameReverse(rolename){
    
    switch(rolename){
        case "Admin":
            return "Admin";
        default:
            return rolename;
    }
}
function getPagination(divId,func,message)
{
  var pagerStr= '<div style="width:100%;background-color: #F8F8F8;"><div id="'+divId+'previousDataShow" style="display:inline-block;float: left;margin-top: 15px;width:128px;"></div><div style="display:inline-block;margin-left: 300px;"><ul class="pager" style="margin:5px;"><li><button type="button" class="btn btn-default btn-sm"  onclick="getPreviousRecord(\''+divId+'\',\''+func+'\');" style="border-radius:0px;margin-right:10px;">Previous</button></li><li>Page<span class="ui-pg-input text-field-pagination" id="'+divId+'PageNumber" style="width:40px;margin:5px 0px 0px 10px;border-radius:0px;" type="text" size="2" maxlength="7">1</span></li><li><button type="button" class="pageNext btn btn-default btn-sm" href="#" onclick="getNextRecord(\''+divId+'\',\''+func+'\',\''+message+'\');" style="border-radius:0px;margin-left:10px;">Next</button></li><li><select onchange="setPaginationValue(\''+divId+'\',\''+func+'\')" id="'+divId+'PagingLimit" style="height: 32px;margin-left: 10px;border-radius:0px;"><option checked>10</option><option>20</option><option>50</option></select></li></ul></div><div id="'+divId+'showCurrentRecordCount" style="display:inline-block"></div><div id="'+divId+'nextDataShow" style="display:inline-block;float: right;margin-top: 15px;width:128px;"></div></div>';
  
  $('#'+divId).append(pagerStr);    
}

function getNextRecord(divId,func,message)
{
    disableButton("pageNext");
    var pagesize=$('#'+divId+"PagingLimit").val();
    var pageno=$('#'+divId+"PageNumber").html();
    pageno=parseInt(pageno)+1;
    if(pageno >1)
    {
        $('#'+divId+"previousDataShow").html("");
    } 
        if(dataAvailableForPagination)
        {
            $('#'+divId+"nextDataShow").html("");
            $('#'+divId+"PageNumber").html(pageno);
            var ll = (parseInt(pageno) - 1) * parseInt(pagesize);
            var uu = (pageno * pagesize)-1;
            pageLowerLimit=ll;
            pageUpperLimit=uu;
            eval(func + "()");
        }
        else
        {
            if(hasValue(message))
                showCenteredLoading(message);
            else
                showCenteredLoading("No more data to show");
            enableButton("pageNext");
        }
}

function getPreviousRecord(divId,func)
{       
    var pagesize=$('#'+divId+"PagingLimit").val();
    var pageno=$('#'+divId+"PageNumber").html();
    enableButton("pageNext");
    if(pageno >1)
    {
        pageno=parseInt(pageno)-1;
        $('#'+divId+"PageNumber").html(pageno);
        $('#'+divId+"nextDataShow").html("");
        var ll = (parseInt(pageno) - 1) * parseInt(pagesize);
        var uu = (pageno * pagesize)-1;
        pageLowerLimit=ll;
        pageUpperLimit=uu;
        eval(func + "()");
    }
    else
    {
        showCenteredLoading("Can't go to previous page");
    }
}
function setPaginationValue(divId,func)
{
    var pagesize=$('#'+divId+"PagingLimit").val();
    $('#'+divId+"PageNumber").html("1");
    var pageno=$('#'+divId+"PageNumber").html();
    maxlimitofpagination=pagesize;
    enableButton("pageNext");
    var ll = (parseInt(pageno) - 1) * parseInt(pagesize);
    var uu = (pageno * pagesize)-1;
    pageLowerLimit=ll;
    pageUpperLimit=uu;
    eval(func + "()");
}

function isEmptydata(dataValue)
{
    if(!hasValue(dataValue))
        return "--";
    else
        return dataValue;
    
}

function checkDataForPagination(data)
{
    enableButton("pageNext");
    if(!hasValue(data) || data.length<maxlimitofpagination)
        dataAvailableForPagination=false;
    else
        dataAvailableForPagination=true;    
}

function resetPagination(divId)
{
    var pagesize=$('#'+divId+"PagingLimit").val();
    $('#'+divId+"PageNumber").html("1");
    var pageno=$('#'+divId+"PageNumber").html();
    maxlimitofpagination=pagesize;
    enableButton("pageNext");
    var ll = (parseInt(pageno) - 1) * parseInt(pagesize);
    var uu = (pageno * pagesize)-1;
    pageLowerLimit=ll;
    pageUpperLimit=uu;  
}



function disableButton(buttonid)
{
    $("."+buttonid).attr("disabled","disabled");
}
function enableButton(buttonid)
{
    $("."+buttonid).attr("disabled",false);
}

function disableButtonById(buttonid)
{
    $("#"+buttonid).attr("disabled","disabled");
}
function enableButtonById(buttonid)
{
    $("#"+buttonid).attr("disabled",false);
}


function getOrderParams()
{
    
        return "&orderBy=modifiedTime&orderType=desc"   ;
    
}

function getPagingParams()
{
    return "&ulimit="+pageUpperLimit+"&llimit="+pageLowerLimit;
}


function getTaskByEntityName(value,type)
{
    var valueToReturn;
    if(hasValue(value) && hasValue(type))
    {
     valueToReturn = value.split("##");
        if(type=="id")
            return valueToReturn[0];
        else if(type=="name")
            return valueToReturn[1];
        else if(type=="rjilId")
            return valueToReturn[2];
    }
    else
        return "";  
}

//function to reset the datepicker calendar to today date
function resetDatePicker(id)
{   
        $('#'+id).datepicker('remove');
        $('#'+id).datepicker({
              autoclose: true,
                width:200,
                date:new Date(),
                format:'dd-mm-yyyy'
                
        });
}

//function to convert the date format to send request 
function convertDateInSendFormat(toConvertDate)
{
    
    if(hasValue(toConvertDate))
    {
        var datearray=toConvertDate.split("-");
        toConvertDate=datearray[2]+"-"+datearray[1]+"-"+datearray[0];
        toConvertDate=DateformatAsYYYYMMDD(new Date(toConvertDate),"-");
        return toConvertDate;
    }
    else
        return toConvertDate;
}
