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
var state_1 = require("../shared/models/state");
var EditReasonComponent = /** @class */ (function () {
    function EditReasonComponent(reasonService, metricService, router) {
        this.reasonService = reasonService;
        this.metricService = metricService;
        this.router = router;
        this.onClosed = new core_1.EventEmitter();
        this.toEditReason = new reason_1.Reason();
    }
    EditReasonComponent.prototype.ngOnInit = function () {
    };
    EditReasonComponent.prototype.iniControls = function (reasonId) {
        var _this = this;
        if (reasonId > 0) {
            this.reasonService.getReasonById(reasonId)
                .subscribe(function (reason) {
                _this.toEditReason.metric = _this.relatedMetric;
                _this.toEditReason.id = reason.id;
                _this.toEditReason.name = reason.name;
                _this.toEditReason.reasonTracking = reason.reasonTracking;
                _this.toEditReason.trackingFrequency = reason.trackingFrequency;
                _this.toEditReason.valueType = reason.valueType;
                _this.toEditReason.reasonState = reason.reasonState;
            });
        }
    };
    EditReasonComponent.prototype.clearData = function () {
        //this.toEditReason = new Reason();
    };
    EditReasonComponent.prototype.open = function () {
    };
    EditReasonComponent.prototype.close = function () {
        this.onClosed.emit(this.toEditReason);
    };
    EditReasonComponent.prototype.setToTrackingFrequency = function (value) {
        this.toEditReason.trackingFrequency = value;
    };
    EditReasonComponent.prototype.setToValueType = function (value) {
        this.toEditReason.valueType = value;
    };
    EditReasonComponent.prototype.saveReason = function () {
        var _this = this;
        this.toEditReason.reasonState = (this.toEditReason.reasonState.toLocaleString() === 'false' ? state_1.State.closed : state_1.State.active);
        this.reasonService.editReason(this.toEditReason).subscribe(function (result) {
            _this.close();
        });
    };
    EditReasonComponent.prototype.ngAfterViewChecked = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", metric_1.Metric)
    ], EditReasonComponent.prototype, "relatedMetric", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], EditReasonComponent.prototype, "onClosed", void 0);
    EditReasonComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/reason/editReason.component.html',
            selector: 'edit-reason',
            styleUrls: ['app/reason/editReason.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [reason_service_1.ReasonService, metric_service_1.MetricService, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
    ], EditReasonComponent);
    return EditReasonComponent;
    var _a, _b;
}());
exports.EditReasonComponent = EditReasonComponent;
//# sourceMappingURL=editReason.component.js.map