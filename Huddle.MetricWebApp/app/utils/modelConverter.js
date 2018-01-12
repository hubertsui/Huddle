"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateHelper_1 = require("../utils/dateHelper");
var ModelConverter = /** @class */ (function () {
    function ModelConverter() {
    }
    ModelConverter.ToReasonListBackend = function (reasons) {
        var _this = this;
        return reasons.map(function (reason) { return _this.ToReasonBackend(reason); });
    };
    ModelConverter.ToReasonBackend = function (reason) {
        return {
            Id: reason.id,
            //issue is removed from reason
            //Issue: this.ToIssueBackend(reason.issue),
            Name: reason.name,
            State: reason.reasonState,
            ReasonTracking: reason.reasonTracking,
            TrackingFrequency: reason.trackingFrequency,
            ValueType: reason.valueType,
            Metric: {
                Id: reason.metric.id,
                Name: reason.metric.name
            }
        };
    };
    ModelConverter.ToIssueBackend = function (issue) {
        return {
            Id: issue.id,
            Name: issue.name,
            Metric: issue.metric,
            State: issue.issueState,
            TargetGoal: issue.targetGoal,
            Category: this.toCategoryBackend(issue.category),
            StartDate: issue.startDate,
            Owner: issue.owner
        };
    };
    ModelConverter.ToMetricBackend = function (metric) {
        return {
            Id: metric.id,
            Name: metric.name,
            Issue: {
                Id: metric.issue.id,
                Name: metric.issue.name
            },
            TargetGoal: metric.targetGoal,
            ValueType: metric.valueType,
            State: metric.metricState
        };
    };
    ModelConverter.toCategoryBackend = function (category) {
        return {
            Id: category == null ? 0 : category.id,
            Name: category == null ? '' : category.name
        };
    };
    ModelConverter.toIssueMetricBackend = function (metricValue) {
        return {
            Id: metricValue.id,
            InputDate: dateHelper_1.DateHelper.LocalToUTC(metricValue.inputDate),
            MetricValues: metricValue.metricValues
            //changed to metric
            //Issue: this.ToIssueBackend(metricValue.issue)
        };
    };
    ModelConverter.toReasonMetricBackend = function (reasonMetric) {
        return {
            Id: reasonMetric.id,
            InputDate: dateHelper_1.DateHelper.LocalToUTC(reasonMetric.inputDate),
            ReasonMetricValues: reasonMetric.reasonMetricValues,
            Reason: this.ToReasonBackend(reasonMetric.reason)
        };
    };
    return ModelConverter;
}());
exports.ModelConverter = ModelConverter;
//# sourceMappingURL=modelConverter.js.map