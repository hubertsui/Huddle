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
var issue_1 = require("../shared/models/issue");
var category_1 = require("../shared/models/category");
var issue_service_1 = require("../services/issue.service");
var reason_service_1 = require("../services/reason.service");
var commonUtil_1 = require("../utils/commonUtil");
var fabricHelper_1 = require("../utils/fabricHelper");
var AddIssueComponent = /** @class */ (function () {
    function AddIssueComponent(issueService, reasonService, router) {
        this.issueService = issueService;
        this.reasonService = reasonService;
        this.router = router;
        this.afterAddedIssue = new core_1.EventEmitter();
        this.onClosed = new core_1.EventEmitter();
        this.selectedCategory = '';
        this.selectedUser = '';
        this.categories = new Array();
        this.toAddIssue = new issue_1.Issue();
        this.users = new Array();
        this.isSaving = false;
        this.teamId = '1';
        this.isShown = false;
    }
    AddIssueComponent.prototype.ngOnInit = function () {
        //this.initTeamContext();
        //this.initCategoriesAndReasons();
    };
    AddIssueComponent.prototype.open = function () {
        this.initTeamContext();
        jQuery("div.add-issue-dialog").find("li.ms-Dropdown-item").removeClass('is-selected');
        jQuery("div.add-issue-dialog").find('span.ms-Dropdown-title').html('');
        this.toAddIssue = new issue_1.Issue();
        this.initCategories();
        this.initUsers();
        this.isShown = true;
    };
    AddIssueComponent.prototype.close = function () {
        this.isShown = false;
        this.isSaving = false;
        this.onClosed.emit(this.toAddIssue);
    };
    AddIssueComponent.prototype.initUsers = function () {
        var _this = this;
        this.issueService.getUsers(this.teamId)
            .subscribe(function (resp) {
            _this.users = resp;
            if (_this.users.length > 0) {
                _this.selectedUser = _this.users[0].mail;
            }
            _this.toAddIssue.owner = _this.selectedUser;
        });
    };
    AddIssueComponent.prototype.initCategories = function () {
        var _this = this;
        this.issueService.getCategories()
            .subscribe(function (resp) {
            _this.categories = resp;
            if (_this.categories.length > 0) {
                _this.selectedCategory = _this.categories[0].name;
            }
            _this.toAddIssue.category = _this.getCategoryByName(_this.selectedCategory);
        });
    };
    AddIssueComponent.prototype.initTeamContext = function () {
        this.teamId = commonUtil_1.CommonUtil.getTeamId();
    };
    AddIssueComponent.prototype.selectCategory = function (categoryName) {
        this.selectedCategory = categoryName;
    };
    AddIssueComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
        this.toAddIssue.owner = this.selectedUser;
    };
    AddIssueComponent.prototype.getCategoryByName = function (categoryName) {
        var filterResult = this.categories.filter(function (category) { return category.name == categoryName; });
        if (filterResult.length > 0)
            return filterResult[0];
        return new category_1.Category(-1, '');
    };
    AddIssueComponent.prototype.isSaveDisabled = function () {
        return !this.toAddIssue.name || !this.toAddIssue.metric || this.isSaving;
    };
    AddIssueComponent.prototype.saveIssue = function () {
        var _this = this;
        this.isSaving = true;
        this.toAddIssue.category = this.getCategoryByName(this.selectedCategory);
        this.issueService.addIssue(this.toAddIssue, this.teamId)
            .subscribe(function (result) {
            if (result && result > 0) {
                _this.close();
            }
        });
    };
    AddIssueComponent.prototype.ngAfterViewChecked = function () {
        fabricHelper_1.FabricHelper.initFabricDropdown();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], AddIssueComponent.prototype, "afterAddedIssue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _b || Object)
    ], AddIssueComponent.prototype, "onClosed", void 0);
    AddIssueComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/issue/addIssue.component.html',
            selector: 'add-issue',
            styleUrls: ['app/issue/addIssue.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [issue_service_1.IssueService, reason_service_1.ReasonService, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
    ], AddIssueComponent);
    return AddIssueComponent;
    var _a, _b, _c;
}());
exports.AddIssueComponent = AddIssueComponent;
//# sourceMappingURL=addIssue.component.js.map