"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var weekDay_1 = require("../shared/models/weekDay");
var weekInputViewModel_1 = require("../shared/models/weekInputViewModel");
var metricValue_1 = require("../shared/models/metricValue");
var reasonMetric_1 = require("../shared/models/reasonMetric");
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.getStartAndEndDayOfWeek = function (date) {
        var now = date ? new Date(date) : new Date();
        now.setHours(0, 0, 0, 0);
        var firstDay = new Date(now);
        firstDay.setDate(firstDay.getDate() - firstDay.getDay());
        var endDay = new Date(now);
        endDay.setDate(endDay.getDate() - endDay.getDay() + 6);
        var result = new weekDay_1.WeekDay();
        result.startDay = firstDay;
        result.endDay = endDay;
        return result;
    };
    DateHelper.getDaysofWeek = function (weekDay) {
        var result = new Array();
        for (var i = 0; i < 7; i++) {
            var startDay = new Date(weekDay.startDay);
            var current = startDay.setDate(startDay.getDate() + i);
            result.push(new Date(current));
        }
        return result;
    };
    DateHelper.getStartDateString = function (weekDay) {
        var startDate = weekDay.startDay;
        return this.LocalToUTC(startDate).substring(0, 10);
    };
    DateHelper.getWeekInputViewModel = function (isMetricValue, weekDay, metric, reason) {
        var aWeekInputViewModel = new weekInputViewModel_1.WeekInputViewModel();
        aWeekInputViewModel.isMetricValue = isMetricValue;
        aWeekInputViewModel.weekDay = weekDay;
        var daysOfWeek = this.getDaysofWeek(weekDay);
        var i = 0;
        while (i < aWeekInputViewModel.inputLength) {
            var inputDate = daysOfWeek[i];
            if (isMetricValue) {
                var metricValue = new metricValue_1.MetricValue();
                metricValue.inputDate = inputDate;
                metricValue.metric = metric;
                aWeekInputViewModel.metricValueArray[i] = metricValue;
            }
            else {
                var reasonMetric = new reasonMetric_1.ReasonMetric();
                reasonMetric.inputDate = inputDate;
                reasonMetric.reason = reason;
                aWeekInputViewModel.reasonValueArray[i] = reasonMetric;
            }
            i++;
        }
        return aWeekInputViewModel;
    };
    DateHelper.UTCToLocal = function (utcTime) {
        var utcString = '';
        if ((typeof utcTime) == 'string')
            utcString = utcTime.toString();
        else
            utcString = utcTime.toISOString();
        return moment.utc(utcString).toDate();
    };
    DateHelper.LocalToUTC = function (date) {
        return date.toISOString();
    };
    DateHelper.getDatesIntervalStr = function (weekDay) {
        var result = '';
        if (weekDay.startDay.getFullYear() != weekDay.endDay.getFullYear()) {
            var format1 = 'MMM DD, YYYY';
            return moment(weekDay.startDay).format(format1) + ' - ' + moment(weekDay.endDay).format(format1);
        }
        else if (weekDay.startDay.getMonth() != weekDay.endDay.getMonth()) {
            var format2 = 'MMM DD';
            return moment(weekDay.startDay).format(format2) + ' - ' + moment(weekDay.endDay).format(format2) + ', ' + moment(weekDay.startDay).format('YYYY');
        }
        else {
            return moment(weekDay.startDay).format('MMM') + ' ' + moment(weekDay.startDay).format('DD') + ' - ' + moment(weekDay.endDay).format('DD') + ', ' + moment(weekDay.startDay).format('YYYY');
        }
    };
    return DateHelper;
}());
exports.DateHelper = DateHelper;
//# sourceMappingURL=dateHelper.js.map