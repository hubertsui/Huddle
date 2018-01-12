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
var reason_service_1 = require("../services/reason.service");
var metric_service_1 = require("../services/metric.service");
var state_1 = require("../shared/models/state");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var newReason_component_1 = require("./newReason.component");
var editReason_component_1 = require("./editReason.component");
var metric_1 = require("../shared/models/metric");
var ReasonListComponent = /** @class */ (function () {
    function ReasonListComponent(reasonService, metricServics, router, activateRoute, cookieService) {
        this.reasonService = reasonService;
        this.metricServics = metricServics;
        this.router = router;
        this.activateRoute = activateRoute;
        this.cookieService = cookieService;
        this.reasonsArray = new Array();
        this.metricId = 1;
        this.ifHidden = true;
        this.reasonWeelyArray = [];
        this.reasonDailyArray = [];
    }
    ReasonListComponent.prototype.ngOnInit = function () {
        //this.initReasons();
    };
    ReasonListComponent.prototype.initReasons = function () {
        var _this = this;
        this.reasonService.getReasonsByMetric(this.currentMetric.id)
            .subscribe(function (reasons) {
            _this.filterReasons(reasons);
        });
    };
    ReasonListComponent.prototype.filterReasons = function (reasons) {
        this.reasonDailyArray = [];
        this.reasonWeelyArray = [];
        for (var i = 0; i < reasons.length; i++) {
            if (reasons[i].trackingFrequency == state_1.TrackFrequency.daily) {
                this.reasonDailyArray.push(reasons[i]);
            }
            else {
                this.reasonWeelyArray.push(reasons[i]);
            }
        }
    };
    //popup
    ReasonListComponent.prototype.addReasonClick = function () {
        this.modalAddReason.open();
    };
    ReasonListComponent.prototype.editReasonClick = function (id) {
        this.reasonToEditId = id;
        this.modalEditReason.open();
    };
    ReasonListComponent.prototype.closed = function () {
    };
    ReasonListComponent.prototype.dismissed = function () {
    };
    ReasonListComponent.prototype.opened = function () {
        this.addReasonPopUp.iniControls();
    };
    ReasonListComponent.prototype.editReasonOpened = function () {
        this.editReasonPopUp.iniControls(this.reasonToEditId);
    };
    //switch
    ReasonListComponent.prototype.onSwitch = function (id) {
        this.reasonService.updateReasonStatus(id);
        for (var i = 0; i < this.reasonWeelyArray.length; i++) {
            if (this.reasonWeelyArray[i].id == id) {
                var reasonState = this.reasonWeelyArray[i].reasonState;
                if (reasonState == state_1.State.active)
                    this.reasonWeelyArray[i].reasonState = state_1.State.closed;
                else
                    this.reasonWeelyArray[i].reasonState = state_1.State.active;
            }
        }
        for (var i = 0; i < this.reasonDailyArray.length; i++) {
            if (this.reasonDailyArray[i].id == id) {
                var reasonState = this.reasonDailyArray[i].reasonState;
                if (reasonState == state_1.State.active)
                    this.reasonDailyArray[i].reasonState = state_1.State.closed;
                else
                    this.reasonDailyArray[i].reasonState = state_1.State.active;
            }
        }
    };
    ReasonListComponent.prototype.show = function () {
        this.ifHidden = false;
        this.initReasons();
    };
    ReasonListComponent.prototype.hide = function () {
        this.ifHidden = true;
    };
    ReasonListComponent.prototype.afterCloseNewReason = function (toAddReason) {
        this.modalAddReason.close();
    };
    ReasonListComponent.prototype.afterCloseEditReason = function (toAddReason) {
        this.modalEditReason.close();
    };
    __decorate([
        core_1.ViewChild('modalAddReason'),
        __metadata("design:type", typeof (_a = typeof ng2_bs3_modal_1.ModalComponent !== "undefined" && ng2_bs3_modal_1.ModalComponent) === "function" && _a || Object)
    ], ReasonListComponent.prototype, "modalAddReason", void 0);
    __decorate([
        core_1.ViewChild(newReason_component_1.NewReasonComponent),
        __metadata("design:type", newReason_component_1.NewReasonComponent)
    ], ReasonListComponent.prototype, "addReasonPopUp", void 0);
    __decorate([
        core_1.ViewChild('modalEditReason'),
        __metadata("design:type", editReason_component_1.EditReasonComponent)
    ], ReasonListComponent.prototype, "modalEditReason", void 0);
    __decorate([
        core_1.ViewChild(editReason_component_1.EditReasonComponent),
        __metadata("design:type", editReason_component_1.EditReasonComponent)
    ], ReasonListComponent.prototype, "editReasonPopUp", void 0);
    __decorate([
        core_1.Input('currentMetric'),
        __metadata("design:type", metric_1.Metric)
    ], ReasonListComponent.prototype, "currentMetric", void 0);
    ReasonListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/reason/reasonList.component.html',
            selector: 'reason-list',
            styleUrls: ['app/reason/reasonList.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [reason_service_1.ReasonService, metric_service_1.MetricService, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object, typeof (_c = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _c || Object, cookie_service_1.CookieService])
    ], ReasonListComponent);
    return ReasonListComponent;
    var _a, _b, _c;
}());
exports.ReasonListComponent = ReasonListComponent;
//# sourceMappingURL=reasonList.component.js.map