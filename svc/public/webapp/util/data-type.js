"use strict";

var $$dataType = {
    NAME: /^[A-Za-z]+$/,

    /** UK date format - does not validate leap year  */
    DATE: /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/(19\d{2})|([2]\d{3})$/,

    /** UK Government provided regex */
    POSTCODE: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([AZa-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/,

    /** UK national insurance number */
    NI_NUMBER: /^\s*([a-zA-Z]){2}(\s*[0-9]\s*){6}([a-zA-Z]){1}?$/
};
