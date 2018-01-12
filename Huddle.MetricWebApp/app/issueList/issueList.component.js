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
var issue_service_1 = require("../services/issue.service");
var issueState_1 = require("../shared/models/issueState");
var issue_viewmodel_1 = require("./issue.viewmodel");
var allowIssueClick_1 = require("../shared/models/allowIssueClick");
var issueState_viewmodel_1 = require("../shared/models/issueState.viewmodel");
var constants_1 = require("../shared/constants");
var commonUtil_1 = require("../utils/commonUtil");
var addIssue_component_1 = require("../issue/addIssue.component");
var editIssue_component_1 = require("../issue/editIssue.component");
var header_component_1 = require("../header/header.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var IssueListComponent = /** @class */ (function () {
    function IssueListComponent(issueService, router, activateRoute, cookieService, cdRef) {
        this.issueService = issueService;
        this.router = router;
        this.activateRoute = activateRoute;
        this.cookieService = cookieService;
        this.cdRef = cdRef;
        this.issueArray = new Array();
        this.selectedIssueState = new issueState_viewmodel_1.IssueStateViewModel();
        this.isCreateBtnVisible = true;
        this.teamId = constants_1.Constants.teamId;
        this.afterCheckAllowClick = new core_1.EventEmitter();
    }
    IssueListComponent.prototype.ngOnInit = function () {
        if (commonUtil_1.CommonUtil.isInMsTeam()) {
            this.initTeamContext();
        }
        else {
            this.initTeamContext();
        }
        this.isNewIssueButtonClicked = false;
        this.isRequestCompleted = false;
    };
    IssueListComponent.prototype.ngAfterViewChecked = function () {
        this.expandDefaultIssue();
        this.cdRef.detectChanges();
    };
    IssueListComponent.prototype.initIssues = function () {
        this.initIssueStates();
    };
    IssueListComponent.prototype.isMetricUrl = function () {
        return location.pathname.indexOf(constants_1.Constants.route.metricIssue) >= 0;
    };
    IssueListComponent.prototype.getIssueId = function () {
        var issueIdStr = this.cookieService.get("issueId");
        if (issueIdStr != '')
            return parseInt(issueIdStr);
        return 0;
    };
    IssueListComponent.prototype.initSelectedIssue = function () {
        var _this = this;
        if (this.isMetricUrl()) {
            this.issueArray.forEach(function (issue) {
                if (_this.selectedIssue && _this.selectedIssue.Issue && issue.Issue.id == _this.selectedIssue.Issue.id) {
                    issue.IsSelected = true;
                }
            });
        }
    };
    IssueListComponent.prototype.initTeamContext = function () {
        this.teamId = commonUtil_1.CommonUtil.getTeamId();
        this.initIssues();
    };
    IssueListComponent.prototype.initIssueStates = function () {
        var _this = this;
        this.selectedIssueState = this.header.selectedIssueState;
        var issueId = this.getIssueId();
        if (issueId > 0) {
            this.issueService.getIssueById(issueId)
                .subscribe(function (issue) {
                _this.selectedIssue = new issue_viewmodel_1.IssueViewModel();
                _this.selectedIssue.Issue = issue;
                _this.selectedIssueState = _this.selectedIssueState;
                _this.doFilterIssues(_this.selectedIssueState.value);
            });
        }
        else {
            this.selectedIssueState = this.selectedIssueState;
            this.doFilterIssues(this.selectedIssueState.value);
        }
    };
    IssueListComponent.prototype.clickIssue = function (item) {
        this.issueArray.forEach(function (item) { return item.IsSelected = false; });
        item.IsSelected = true;
        this.selectedIssue = item;
        this.afterCheckAllowClick.emit(false);
        if (this.allowClick.allowClick)
            this.doNavigateIssue(item);
    };
    IssueListComponent.prototype.doNavigateIssue = function (item) {
        if (item && item.Issue) {
            this.cookieService.put("issueId", item.Issue.id.toString());
            //open issue
        }
        else {
            //open first issue;
        }
    };
    IssueListComponent.prototype.doNavigate = function () {
        if (!this.isNewIssueButtonClicked)
            this.doNavigateIssue(this.selectedIssue);
        else
            this.doNavigateIssue();
    };
    IssueListComponent.prototype.doFilterIssues = function (state) {
        var _this = this;
        this.issueService.filterIssueList(state, this.teamId)
            .subscribe(function (resp) {
            _this.issueArray = resp.map(function (issue, index) {
                var issueModel = new issue_viewmodel_1.IssueViewModel();
                issueModel.Issue = issue;
                issueModel.IsSelected = false;
                return issueModel;
            });
            _this.isRequestCompleted = true;
        });
    };
    IssueListComponent.prototype.createIssue = function () {
        this.isNewIssueButtonClicked = true;
        this.afterCheckAllowClick.emit(false);
        if (this.allowClick.allowClick) {
            this.addIssue.open();
        }
    };
    IssueListComponent.prototype.issueAdded = function (event) {
        if (event.id <= 0)
            return;
        this.issueArray.forEach(function (item) { return item.IsSelected = false; });
        var newIssueModel = new issue_viewmodel_1.IssueViewModel();
        newIssueModel.IsSelected = true;
        newIssueModel.IssueState = issueState_1.IssueState.active.toString();
        newIssueModel.Issue = event;
        this.issueArray.push(newIssueModel);
        this.doNavigateIssue(newIssueModel);
    };
    IssueListComponent.prototype.updateIssue = function (updatedIssue) {
        var findResult = this.issueArray.filter(function (issue) { return issue.Issue.id == updatedIssue.id; });
        if (findResult.length == 0)
            return;
        findResult[0].Issue.name = updatedIssue.name;
        findResult[0].Issue.metric = updatedIssue.metric;
    };
    IssueListComponent.prototype.afterFilterIssue = function (issueState) {
        this.doFilterIssues(issueState.value);
    };
    IssueListComponent.prototype.afterQuerySelected = function (selectedItem) {
        var selectedIssue;
        if (selectedItem['category'] !== undefined) {
            var searchedIssues = this.issueArray.filter(function (issue, index) {
                return issue.Issue.id == selectedItem.id;
            });
            if (searchedIssues.length > 0) {
                selectedIssue = searchedIssues[0];
            }
        }
        else if (selectedItem['issue'] !== undefined) {
            this.issueArray.forEach(function (issue) {
                if (issue.Issue.id == selectedItem.issue.id) {
                    selectedIssue = issue;
                }
            });
        }
        else {
            this.issueArray.forEach(function (issue) {
                if (issue.Issue.id == selectedItem.metric.issue.id) {
                    selectedIssue = issue;
                }
            });
        }
        if (selectedIssue != null) {
            this.expandIssue(selectedIssue);
        }
    };
    //popup issue
    IssueListComponent.prototype.addIssueClick = function () {
        this.modalAddIssue.open();
    };
    IssueListComponent.prototype.closed = function () {
    };
    IssueListComponent.prototype.dismissed = function () {
    };
    IssueListComponent.prototype.opened = function () {
        this.addIssue.open();
    };
    IssueListComponent.prototype.editIssueOpened = function () {
        this.editIssue.open(this.toEditIssue.id);
    };
    //switch
    IssueListComponent.prototype.onSwitch = function (a) {
        console.log(a);
    };
    IssueListComponent.prototype.checkAllowWeekClick = function (event) {
        this.header.checkAllowWeekClick(event);
    };
    IssueListComponent.prototype.expandDefaultIssue = function () {
        if (this.issueArray.length === 0)
            return;
        if (this.issueArray.filter(function (issue) { return issue.Expanded == true; }).length === 0)
            this.expandIssue(this.issueArray[0]);
    };
    IssueListComponent.prototype.expandIssueClick = function (issue) {
        if (issue.Expanded)
            issue.Expanded = false;
        else
            this.expandIssue(issue);
    };
    IssueListComponent.prototype.expandIssue = function (issue) {
        var _this = this;
        this.issueArray.forEach(function (issue) {
            issue.Expanded = false;
            var metricList = _this.getRelatedMetricList(issue);
            if (metricList !== null)
                metricList.hide();
        });
        issue.Expanded = true;
        var currentMetricList = this.getRelatedMetricList(issue);
        if (currentMetricList !== null)
            currentMetricList.show();
    };
    IssueListComponent.prototype.getRelatedMetricList = function (issue) {
        var result = this.metricLists.filter(function (metricList) { return metricList.currentIssue.id == issue.Issue.id; });
        if (result.length > 0)
            return result[0];
        return null;
    };
    IssueListComponent.prototype.getMetricAndReasonValues = function () {
    };
    IssueListComponent.prototype.editIssueClick = function (issue) {
        this.toEditIssue = issue.Issue;
        this.modalEditIssue.open();
    };
    IssueListComponent.prototype.saveIssueClick = function (issue) {
        console.log(issue);
    };
    IssueListComponent.prototype.afterCloseNewIssue = function (toAddIssue) {
        this.modalAddIssue.close();
    };
    IssueListComponent.prototype.afterCloseEditIssue = function (toEditIssue) {
        this.modalEditIssue.close();
    };
    __decorate([
        core_1.Input('allowClick'),
        __metadata("design:type", allowIssueClick_1.AllowIssueClick)
    ], IssueListComponent.prototype, "allowClick", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], IssueListComponent.prototype, "afterCheckAllowClick", void 0);
    __decorate([
        core_1.ViewChild(addIssue_component_1.AddIssueComponent),
        __metadata("design:type", addIssue_component_1.AddIssueComponent)
    ], IssueListComponent.prototype, "addIssue", void 0);
    __decorate([
        core_1.ViewChild(editIssue_component_1.EditIssueComponent),
        __metadata("design:type", editIssue_component_1.EditIssueComponent)
    ], IssueListComponent.prototype, "editIssue", void 0);
    __decorate([
        core_1.ViewChild(header_component_1.HeaderComponent),
        __metadata("design:type", header_component_1.HeaderComponent)
    ], IssueListComponent.prototype, "header", void 0);
    __decorate([
        core_1.ViewChildren('metricLists'),
        __metadata("design:type", typeof (_b = typeof core_1.QueryList !== "undefined" && core_1.QueryList) === "function" && _b || Object)
    ], IssueListComponent.prototype, "metricLists", void 0);
    __decorate([
        core_1.ViewChild('modalAddIssue'),
        __metadata("design:type", typeof (_c = typeof ng2_bs3_modal_1.ModalComponent !== "undefined" && ng2_bs3_modal_1.ModalComponent) === "function" && _c || Object)
    ], IssueListComponent.prototype, "modalAddIssue", void 0);
    __decorate([
        core_1.ViewChild('modalEditIssue'),
        __metadata("design:type", typeof (_d = typeof ng2_bs3_modal_1.ModalComponent !== "undefined" && ng2_bs3_modal_1.ModalComponent) === "function" && _d || Object)
    ], IssueListComponent.prototype, "modalEditIssue", void 0);
    IssueListComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/issueList/issueList.component.html',
            selector: 'issue-list',
            styleUrls: ['app/issueList/issueList.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [issue_service_1.IssueService, typeof (_e = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _e || Object, typeof (_f = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _f || Object, cookie_service_1.CookieService, typeof (_g = typeof core_1.ChangeDetectorRef !== "undefined" && core_1.ChangeDetectorRef) === "function" && _g || Object])
    ], IssueListComponent);
    return IssueListComponent;
    var _a, _b, _c, _d, _e, _f, _g;
}());
exports.IssueListComponent = IssueListComponent;
//# sourceMappingURL=issueList.component.js.map