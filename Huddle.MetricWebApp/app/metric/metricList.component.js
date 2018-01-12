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
var cookie_service_1 = require("../services/cookie.service");
var metric_service_1 = require("../services/metric.service");
var issue_1 = require("../shared/models/issue");
var metric_viewmodel_1 = require("./metric.viewmodel");
var constants_1 = require("../shared/constants");
var commonUtil_1 = require("../utils/commonUtil");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var dateHelper_1 = require("../utils/dateHelper");
var addMetric_component_1 = require("./addMetric.component");
var editMetric_component_1 = require("./editMetric.component");
var MetricListComponent = /** @class */ (function () {
    function MetricListComponent(metricService, router, activateRoute, cookieService) {
        this.metricService = metricService;
        this.router = router;
        this.activateRoute = activateRoute;
        this.cookieService = cookieService;
        this.metricArray = new Array();
        this.teamId = constants_1.Constants.teamId;
        this.ifHidden = true;
        this.currentIssueId = 0;
        this.currentMetricId = 0;
        this.currentWeekDays = new Array();
        this.metricWeekInputViewModelArray = new Array();
        this.reasonWeekInputViewModelArray = new Array();
    }
    MetricListComponent.prototype.ngOnInit = function () {
        this.initTeamContext();
    };
    MetricListComponent.prototype.show = function () {
        var _this = this;
        this.ifHidden = false;
        this.currentIssueId = this.currentIssue.id;
        this.metricService.getMetricsById(this.currentIssue.id)
            .subscribe(function (resp) {
            _this.metricArray = resp.map(function (metric, index) {
                metric.issue = _this.currentIssue;
                var metricViewModel = new metric_viewmodel_1.MetricViewModel();
                metricViewModel.metric = metric;
                metricViewModel.expanded = false;
                return metricViewModel;
            });
            _this.rebuildWeekInputViewModel();
        });
    };
    MetricListComponent.prototype.hide = function () {
        this.ifHidden = true;
    };
    MetricListComponent.prototype.initTeamContext = function () {
        this.teamId = commonUtil_1.CommonUtil.getTeamId();
    };
    MetricListComponent.prototype.onSwitch = function () {
    };
    MetricListComponent.prototype.closed = function () { };
    MetricListComponent.prototype.expandMetricClick = function (metric) {
        var _this = this;
        this.metricArray.forEach(function (metric) {
            metric.expanded = false;
            var metricList = _this.getRelatedReasonList(metric);
            if (metricList !== null)
                metricList.hide();
        });
        metric.expanded = true;
        var currentMetricList = this.getRelatedReasonList(metric);
        if (currentMetricList !== null)
            currentMetricList.show();
    };
    MetricListComponent.prototype.getRelatedReasonList = function (metric) {
        var result = this.reasonLists.filter(function (reasonList) { return reasonList.currentMetric.id == metric.metric.id; });
        if (result.length > 0)
            return result[0];
        return null;
    };
    MetricListComponent.prototype.rebuildWeekInputViewModel = function () {
        var _this = this;
        //to be replaced with week selector component;
        this.selectWeekDay = dateHelper_1.DateHelper.getStartAndEndDayOfWeek();
        if (this.metricArray.length > 0) {
            this.metricWeekInputViewModelArray = this.metricArray.map(function (metricView) {
                return dateHelper_1.DateHelper.getWeekInputViewModel(false, _this.selectWeekDay, metricView.metric, null);
            });
        }
        //this.getMetricValues();
    };
    MetricListComponent.prototype.editMetricClick = function (id) {
        this.currentMetricId = id;
        this.modalEditMetric.open();
    };
    MetricListComponent.prototype.addMetricClick = function () {
        this.modalAddMetric.open();
    };
    MetricListComponent.prototype.opened = function () {
        this.addMetricPopUp.open(this.currentIssue.id);
    };
    MetricListComponent.prototype.editMetricOpened = function () {
        this.editMetricPopUp.open(this.currentIssue.id, this.currentMetricId);
    };
    MetricListComponent.prototype.afterCloseNewMetric = function () {
        this.modalAddMetric.close();
    };
    MetricListComponent.prototype.afterCloseEditMetric = function () {
        this.modalEditMetric.close();
    };
    __decorate([
        core_1.Input('currentIssue'),
        __metadata("design:type", issue_1.Issue)
    ], MetricListComponent.prototype, "currentIssue", void 0);
    __decorate([
        core_1.ViewChildren('reasonLists'),
        __metadata("design:type", typeof (_a = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" && _a || Object)
    ], MetricListComponent.prototype, "reasonLists", void 0);
    __decorate([
        core_1.ViewChild('modalAddMetric'),
        __metadata("design:type", typeof (_b = typeof ng2_bs3_modal_1.ModalComponent !== "undefined" && ng2_bs3_modal_1.ModalComponent) === "function" && _b || Object)
    ], MetricListComponent.prototype, "modalAddMetric", void 0);
    __decorate([
        core_1.ViewChild(addMetric_component_1.AddMetricComponent),
        __metadata("design:type", addMetric_component_1.AddMetricComponent)
    ], MetricListComponent.prototype, "addMetricPopUp", void 0);
    __decorate([
        core_1.ViewChild('modalEditMetric'),
        __metadata("design:type", typeof (_c = typeof ng2_bs3_modal_1.ModalComponent !== "undefined" && ng2_bs3_modal_1.ModalComponent) === "function" && _c || Object)
    ], MetricListComponent.prototype, "modalEditMetric", void 0);
    __decorate([
        core_1.ViewChild(editMetric_component_1.EditMetricComponent),
        __metadata("design:type", editMetric_component_1.EditMetricComponent)
    ], MetricListComponent.prototype, "editMetricPopUp", void 0);
    MetricListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/metric/metricList.component.html',
            selector: 'metric-list',
            styleUrls: ['app/metric/metricList.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [metric_service_1.MetricService, typeof (_d = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _d || Object, typeof (_e = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _e || Object, cookie_service_1.CookieService])
    ], MetricListComponent);
    return MetricListComponent;
    var _a, _b, _c, _d, _e;
}());
exports.MetricListComponent = MetricListComponent;
//# sourceMappingURL=metricList.component.js.map