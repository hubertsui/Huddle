"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var metricValue_1 = require("./metricValue");
var reasonMetric_1 = require("./reasonMetric");
var WeekInputViewModel = /** @class */ (function () {
    function WeekInputViewModel() {
        this.inputLength = 7;
        this.metricValueArray = new Array();
        this.reasonValueArray = new Array();
        for (var i = 0; i < this.inputLength; i++) {
            this.metricValueArray.push(new metricValue_1.MetricValue());
            this.reasonValueArray.push(new reasonMetric_1.ReasonMetric());
        }
    }
    WeekInputViewModel.prototype.resetIssue = function (issue) {
        //this.metricValueArray.forEach(metricValue => {
        //    metricValue.issue = issue;
        //});
    };
    return WeekInputViewModel;
}());
exports.WeekInputViewModel = WeekInputViewModel;
//# sourceMappingURL=weekInputViewModel.js.map