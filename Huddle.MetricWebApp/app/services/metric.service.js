"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var data_service_1 = require("../services/data.service");
var constants_1 = require("../shared/constants");
var modelConverter_1 = require("../utils/modelConverter");
var dateHelper_1 = require("../utils/dateHelper");
var MetricService = /** @class */ (function () {
    function MetricService(dataService) {
        this.dataService = dataService;
    }
    MetricService.prototype.addMetric = function (metric) {
        var activeObject = new Rx_1.ReplaySubject(1);
        var convertedMetric = modelConverter_1.ModelConverter.ToMetricBackend(metric);
        this.dataService.post(constants_1.Constants.webAPI.metricUrl, { metric: convertedMetric })
            .subscribe(function (resp) {
            activeObject.next(resp.reasonId);
        }, function (error) { return activeObject.error(error); });
        return activeObject;
    };
    MetricService.prototype.editMetric = function (metric) {
        var activeObject = new Rx_1.ReplaySubject(1);
        var convertedMetric = modelConverter_1.ModelConverter.ToMetricBackend(metric);
        this.dataService.post(constants_1.Constants.webAPI.metricEditUrl, { metric: convertedMetric })
            .subscribe(function (resp) {
            activeObject.next(resp.reasonId);
        }, function (error) { return activeObject.error(error); });
        return activeObject;
    };
    MetricService.prototype.getMetricsById = function (metricId) {
        var activeObject = new Rx_1.ReplaySubject(1);
        this.dataService.getObject(constants_1.Constants.webAPI.metricsUrl + "/" + metricId)
            .subscribe(function (metricArray) {
            metricArray.forEach(function (metric) { return metric.startDate = dateHelper_1.DateHelper.UTCToLocal(metric.startDate); });
            activeObject.next(metricArray);
        }, function (error) {
            activeObject.error(error);
        });
        return activeObject;
    };
    MetricService.prototype.getMetricById = function (metricId) {
        var activeObject = new Rx_1.ReplaySubject(1);
        this.dataService.getObject(constants_1.Constants.webAPI.metricUrl + "/" + metricId)
            .subscribe(function (metric) {
            activeObject.next(metric);
        }, function (error) {
            activeObject.error(error);
        });
        return activeObject;
    };
    MetricService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], MetricService);
    return MetricService;
}());
exports.MetricService = MetricService;
//# sourceMappingURL=metric.service.js.map