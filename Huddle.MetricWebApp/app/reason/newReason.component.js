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
var router_1 = require("@angular/router");
var reason_1 = require("../shared/models/reason");
var metric_1 = require("../shared/models/metric");
var reason_service_1 = require("../services/reason.service");
var metric_service_1 = require("../services/metric.service");
var NewReasonComponent = /** @class */ (function () {
    function NewReasonComponent(reasonService, metricService, router) {
        this.reasonService = reasonService;
        this.metricService = metricService;
        this.router = router;
        this.onClosed = new core_1.EventEmitter();
        this.metricName = '';
        this.toAddReason = new reason_1.Reason();
        this.isSaving = false;
        this.isShown = false;
        this.checked = false;
    }
    NewReasonComponent.prototype.ngOnInit = function () {
    };
    NewReasonComponent.prototype.iniControls = function () {
        this.clearData();
        this.issueName = this.relatedMetric.issue.name;
        this.metricName = this.relatedMetric.name;
        this.toAddReason.metric = this.relatedMetric;
    };
    NewReasonComponent.prototype.clearData = function () {
        this.toAddReason = new reason_1.Reason();
    };
    NewReasonComponent.prototype.close = function () {
        this.clearData();
        //this.isShown = false;
        //this.isSaving = false;
        this.onClosed.emit(this.toAddReason);
    };
    NewReasonComponent.prototype.updateValueType = function (valueType) {
        this.toAddReason.valueType = valueType;
    };
    NewReasonComponent.prototype.updateTrackingFrequency = function (value) {
        this.toAddReason.trackingFrequency = value;
    };
    NewReasonComponent.prototype.saveReason = function () {
        var _this = this;
        this.isSaving = true;
        this.reasonService.addReason(this.toAddReason).subscribe(function (result) {
            _this.close();
        });
    };
    NewReasonComponent.prototype.ngAfterViewChecked = function () {
        //FabricHelper.initFabricDropdown();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", metric_1.Metric)
    ], NewReasonComponent.prototype, "relatedMetric", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], NewReasonComponent.prototype, "onClosed", void 0);
    NewReasonComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/reason/newReason.component.html',
            selector: 'new-reason',
            styleUrls: ['app/reason/newReason.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [reason_service_1.ReasonService, metric_service_1.MetricService, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
    ], NewReasonComponent);
    return NewReasonComponent;
    var _a, _b;
}());
exports.NewReasonComponent = NewReasonComponent;
//# sourceMappingURL=newReason.component.js.map