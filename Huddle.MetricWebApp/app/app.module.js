"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var ngx_cookie_1 = require("ngx-cookie");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
var auto_complete_1 = require("@ngui/auto-complete");
var ngx_ui_switch_1 = require("ngx-ui-switch");
var issueList_component_1 = require("./issueList/issueList.component");
var header_component_1 = require("./header/header.component");
var addIssue_component_1 = require("./issue/addIssue.component");
var editIssue_component_1 = require("./issue/editIssue.component");
var metricIssue_component_1 = require("./issue/metricIssue.component");
var addMetric_component_1 = require("./metric/addMetric.component");
var editMetric_component_1 = require("./metric/editMetric.component");
var weekSelector_component_1 = require("./issue/weekSelector.component");
var weekInput_component_1 = require("./issue/weekInput.component");
var addReason_component_1 = require("./issue/addReason.component");
var input_popup_component_1 = require("./issue/input.popup.component");
var metricList_component_1 = require("./metric/metricList.component");
var teamTab_component_1 = require("./teamTab/teamTab.component");
var teamTab_configure_component_1 = require("./teamTab/teamTab.configure.component");
var teamTab_signIn_component_1 = require("./teamTab/teamTab.signIn.component");
var teamTab_signIn_callback_component_1 = require("./teamTab/teamTab.signIn.callback.component");
var teamTab_privacy_component_1 = require("./teamTab/teamTab.privacy.component");
var teamTab_terms_component_1 = require("./teamTab/teamTab.terms.component");
var reasonList_component_1 = require("./reason/reasonList.component");
var newReason_component_1 = require("./reason/newReason.component");
var editReason_component_1 = require("./reason/editReason.component");
var cookie_service_1 = require("./services/cookie.service");
var data_service_1 = require("./services/data.service");
var issue_service_1 = require("./services/issue.service");
var reason_service_1 = require("./services/reason.service");
var metricValue_service_1 = require("./services/metricValue.service");
var query_service_1 = require("./services/query.service");
var metric_service_1 = require("./services/metric.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_2.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_1.routing,
                ng2_bs3_modal_1.Ng2Bs3ModalModule,
                auto_complete_1.NguiAutoCompleteModule,
                ngx_ui_switch_1.UiSwitchModule,
                ngx_cookie_1.CookieModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                issueList_component_1.IssueListComponent,
                header_component_1.HeaderComponent,
                addIssue_component_1.AddIssueComponent,
                editIssue_component_1.EditIssueComponent,
                metricIssue_component_1.MetricIssueComponent,
                weekInput_component_1.WeekInputComponent,
                weekSelector_component_1.WeekSelectorComponent,
                addReason_component_1.AddReasonComponent,
                input_popup_component_1.InputPopupComponent,
                teamTab_component_1.TeamTabComponent,
                teamTab_configure_component_1.TeamTabConfigureComponent,
                teamTab_signIn_component_1.TeamTabSignInComponent,
                teamTab_signIn_callback_component_1.TeamTabSignInCallBackComponent,
                teamTab_privacy_component_1.TeamTabPrivacyComponent,
                teamTab_terms_component_1.TeamTabTermsComponent,
                reasonList_component_1.ReasonListComponent,
                newReason_component_1.NewReasonComponent,
                editReason_component_1.EditReasonComponent,
                metricList_component_1.MetricListComponent,
                addMetric_component_1.AddMetricComponent,
                editMetric_component_1.EditMetricComponent
            ],
            providers: [
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
                cookie_service_1.CookieService,
                data_service_1.DataService,
                issue_service_1.IssueService,
                reason_service_1.ReasonService,
                metricValue_service_1.MetricValueService,
                query_service_1.QueryService,
                metric_service_1.MetricService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map