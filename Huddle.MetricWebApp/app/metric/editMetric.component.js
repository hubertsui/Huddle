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
var metric_1 = require("../shared/models/metric");
var metric_service_1 = require("../services/metric.service");
var issue_service_1 = require("../services/issue.service");
var issue_1 = require("../shared/models/issue");
var state_1 = require("../shared/models/state");
var EditMetricComponent = /** @class */ (function () {
    function EditMetricComponent(metricService, issueService, router) {
        this.metricService = metricService;
        this.issueService = issueService;
        this.router = router;
        this.afterAddedIssue = new core_1.EventEmitter();
        this.onClosed = new core_1.EventEmitter();
        this.isSaving = false;
        this.isShown = false;
        this.toEditMetric = new metric_1.Metric();
        this.issue = new issue_1.Issue();
    }
    EditMetricComponent.prototype.ngOnInit = function () {
    };
    EditMetricComponent.prototype.open = function (issueId, metricId) {
        var _this = this;
        this.isShown = true;
        this.isSaving = false;
        if (issueId > 0) {
            this.issueService.getIssueById(issueId)
                .subscribe(function (issue) {
                _this.issue.id = issue.id;
                _this.issue.name = issue.name;
                _this.toEditMetric.issue = issue;
            });
        }
        if (metricId > 0) {
            this.metricService.getMetricById(metricId)
                .subscribe(function (metric) {
                _this.toEditMetric.id = metric.id;
                _this.toEditMetric.name = metric.name;
                _this.toEditMetric.valueType = metric.valueType;
                _this.toEditMetric.metricState = metric.metricState;
                _this.toEditMetric.targetGoal = metric.targetGoal;
            });
        }
    };
    EditMetricComponent.prototype.close = function () {
        this.isShown = false;
        this.isSaving = false;
        this.onClosed.emit(this.toEditMetric);
    };
    EditMetricComponent.prototype.updateValueType = function (valueType) {
        this.toEditMetric.valueType = valueType;
    };
    EditMetricComponent.prototype.saveMetric = function () {
        var _this = this;
        this.isSaving = true;
        this.toEditMetric.metricState = (this.toEditMetric.metricState.toLocaleString() === 'false' ? state_1.State.closed : state_1.State.active);
        this.metricService.editMetric(this.toEditMetric)
            .subscribe(function (result) {
            _this.close();
        });
    };
    EditMetricComponent.prototype.ngAfterViewChecked = function () {
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], EditMetricComponent.prototype, "afterAddedIssue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _b || Object)
    ], EditMetricComponent.prototype, "onClosed", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EditMetricComponent.prototype, "issueId", void 0);
    EditMetricComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/metric/editMetric.component.html',
            selector: 'edit-metric',
            styleUrls: ['app/metric/editMetric.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [metric_service_1.MetricService, issue_service_1.IssueService, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
    ], EditMetricComponent);
    return EditMetricComponent;
    var _a, _b, _c;
}());
exports.EditMetricComponent = EditMetricComponent;
//# sourceMappingURL=editMetric.component.js.map