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
var issueState_1 = require("../shared/models/issueState");
var issueState_viewmodel_1 = require("../shared/models/issueState.viewmodel");
var constants_1 = require("../shared/constants");
var query_service_1 = require("../services/query.service");
var data_service_1 = require("../services/data.service");
var commonUtil_1 = require("../utils/commonUtil");
var allowClick_1 = require("../shared/models/allowClick");
var dateHelper_1 = require("../utils/dateHelper");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(queryService, dataService) {
        var _this = this;
        this.queryService = queryService;
        this.dataService = dataService;
        this.filterIssueState = new core_1.EventEmitter();
        this.selectQuery = new core_1.EventEmitter();
        this.issueStates = new Array();
        //suggestedIssues: Observable<IssueViewModel>;
        this.allowWeekClick = new allowClick_1.AllowClick(true);
        this.currentWeekDays = new Array();
        this.suggestedQueryResultList = function (keyword) {
            if (keyword && keyword.length >= constants_1.Constants.suggestCharNum) {
                return _this.queryService.searchQuery(_this.selectedIssueState.value, keyword, _this.teamId);
            }
            else {
                return Rx_1.Observable.of([]);
            }
        };
        this.initIssueStates();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.initTeamId();
    };
    HeaderComponent.prototype.initIssueStates = function () {
        var issueActive = new issueState_viewmodel_1.IssueStateViewModel();
        issueActive.title = issueState_1.IssueState[issueState_1.IssueState.active];
        issueActive.value = issueState_1.IssueState.active;
        this.issueStates.push(issueActive);
        var issueClosed = new issueState_viewmodel_1.IssueStateViewModel();
        issueClosed.title = issueState_1.IssueState[issueState_1.IssueState.closed];
        issueClosed.value = issueState_1.IssueState.closed;
        this.issueStates.push(issueClosed);
        this.selectedIssueState = issueActive;
    };
    HeaderComponent.prototype.initTeamId = function () {
        this.teamId = commonUtil_1.CommonUtil.getTeamId();
    };
    HeaderComponent.prototype.changeIssueFilter = function (issueState) {
        this.filterIssueState.emit(issueState);
    };
    HeaderComponent.prototype.suggestFormatter = function (data) {
        return "" + data.name;
    };
    HeaderComponent.prototype.selectQueryItem = function (selected) {
        this.selectQuery.emit(selected);
    };
    HeaderComponent.prototype.checkAllowWeekClick = function (event) {
        return this.allowWeekClick;
    };
    HeaderComponent.prototype.weekChange = function (event) {
        this.selectWeekDay = event;
        this.currentWeekDays = dateHelper_1.DateHelper.getDaysofWeek(this.selectWeekDay);
        //init weekInputModel get values;
        //this.rebuildWeekInputViewModel();
    };
    __decorate([
        core_1.Input('displayTitle'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "displayTitle", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], HeaderComponent.prototype, "filterIssueState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _b || Object)
    ], HeaderComponent.prototype, "selectQuery", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/header/header.component.html',
            selector: 'header',
            styleUrls: ['app/header/header.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [query_service_1.QueryService, data_service_1.DataService])
    ], HeaderComponent);
    return HeaderComponent;
    var _a, _b;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map