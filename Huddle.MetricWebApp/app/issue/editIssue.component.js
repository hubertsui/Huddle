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
var issueState_1 = require("../shared/models/issueState");
var category_1 = require("../shared/models/category");
var issue_service_1 = require("../services/issue.service");
var reason_service_1 = require("../services/reason.service");
var commonUtil_1 = require("../utils/commonUtil");
var fabricHelper_1 = require("../utils/fabricHelper");
var EditIssueComponent = /** @class */ (function () {
    function EditIssueComponent(issueService, reasonService, router) {
        this.issueService = issueService;
        this.reasonService = reasonService;
        this.router = router;
        this.afterAddedIssue = new core_1.EventEmitter();
        this.onClosed = new core_1.EventEmitter();
        this.selectedCategory = '';
        this.selectedUser = '';
        this.categories = new Array();
        this.users = new Array();
        this.isSaving = false;
        this.teamId = '1';
        this.isShown = false;
        this.toEditIssue = new issue_1.Issue();
    }
    EditIssueComponent.prototype.ngOnInit = function () {
    };
    EditIssueComponent.prototype.open = function (issueId) {
        this.initTeamContext();
        jQuery("div.add-issue-dialog").find("li.ms-Dropdown-item").removeClass('is-selected');
        jQuery("div.add-issue-dialog").find('span.ms-Dropdown-title').html('');
        this.initIssue(issueId);
        this.isShown = true;
    };
    EditIssueComponent.prototype.close = function () {
        this.isShown = false;
        this.isSaving = false;
        this.onClosed.emit(this.toEditIssue);
    };
    EditIssueComponent.prototype.initIssue = function (issueId) {
        var _this = this;
        if (issueId > 0) {
            this.issueService.getIssueById(issueId)
                .subscribe(function (issue) {
                _this.toEditIssue.id = issue.id;
                _this.toEditIssue.name = issue.name;
                _this.toEditIssue.category = issue.category;
                _this.toEditIssue.owner = issue.owner;
                _this.toEditIssue.issueState = issue.issueState;
                _this.initUsers();
                _this.initCategories();
            });
        }
    };
    EditIssueComponent.prototype.initUsers = function () {
        var _this = this;
        this.issueService.getUsers(this.teamId)
            .subscribe(function (resp) {
            _this.users = resp;
            if (_this.users.length > 0) {
                for (var i = 0; i < _this.users.length; i++) {
                    if (_this.users[i].name == _this.toEditIssue.owner) {
                        _this.selectedUser = _this.users[i].mail;
                        break;
                    }
                }
            }
        });
    };
    EditIssueComponent.prototype.initCategories = function () {
        var _this = this;
        this.issueService.getCategories()
            .subscribe(function (resp) {
            _this.categories = resp;
            for (var i = 0; i < _this.categories.length; i++) {
                if (_this.categories[i].name == _this.toEditIssue.category) {
                    _this.selectedCategory = _this.categories[i].name;
                    break;
                }
            }
        });
    };
    EditIssueComponent.prototype.initTeamContext = function () {
        this.teamId = commonUtil_1.CommonUtil.getTeamId();
    };
    EditIssueComponent.prototype.selectCategory = function (categoryName) {
        this.selectedCategory = categoryName;
    };
    EditIssueComponent.prototype.selectUser = function (user) {
        this.selectedUser = user;
        this.toEditIssue.owner = this.selectedUser;
    };
    EditIssueComponent.prototype.getCategoryByName = function (categoryName) {
        var filterResult = this.categories.filter(function (category) { return category.name == categoryName; });
        if (filterResult.length > 0)
            return filterResult[0];
        return new category_1.Category(-1, '');
    };
    EditIssueComponent.prototype.isSaveDisabled = function () {
        return !this.toEditIssue.name || !this.toEditIssue.metric || this.isSaving;
    };
    EditIssueComponent.prototype.saveIssue = function () {
        var _this = this;
        this.isSaving = true;
        this.toEditIssue.category = this.getCategoryByName(this.selectedCategory);
        this.toEditIssue.issueState = (this.toEditIssue.issueState.toLocaleString() === 'false' ? issueState_1.IssueState.closed : issueState_1.IssueState.active);
        this.issueService.editIssue(this.toEditIssue)
            .subscribe(function (result) {
            if (result && result > 0) {
                _this.close();
            }
        });
    };
    EditIssueComponent.prototype.ngAfterViewChecked = function () {
        fabricHelper_1.FabricHelper.initFabricDropdown();
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_a = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _a || Object)
    ], EditIssueComponent.prototype, "afterAddedIssue", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", typeof (_b = typeof core_1.EventEmitter !== "undefined" && core_1.EventEmitter) === "function" && _b || Object)
    ], EditIssueComponent.prototype, "onClosed", void 0);
    EditIssueComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/issue/editIssue.component.html',
            selector: 'edit-issue',
            styleUrls: ['app/issue/editIssue.component.css', 'app/shared/shared.css']
        }),
        __metadata("design:paramtypes", [issue_service_1.IssueService, reason_service_1.ReasonService, typeof (_c = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _c || Object])
    ], EditIssueComponent);
    return EditIssueComponent;
    var _a, _b, _c;
}());
exports.EditIssueComponent = EditIssueComponent;
//# sourceMappingURL=editIssue.component.js.map