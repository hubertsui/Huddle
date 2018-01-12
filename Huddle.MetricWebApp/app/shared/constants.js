"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.suggestCharNum = 3;
    Constants.teamId = "6adc71b5-8158-4002-b4c7-48b37c3acd5e";
    Constants.route = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.addIssue = 'add-issue',
        _a.metricIssue = 'metric-issue',
        _a);
    Constants.issueState = (_b = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _b.unselectedIssueState = -1,
        _b.defaultIssueState = 1,
        _b);
    Constants.webAPI = (_c = /** @class */ (function () {
            function class_3() {
            }
            return class_3;
        }()),
        _c.userUrl = '/api/user',
        _c.teamsUrl = '/api/teams',
        _c.issuesUrl = '/api/issues',
        _c.issueEditUrl = '/api/issues/editIssue',
        _c.categoriesUrl = '/api/categories',
        _c.reasonsUrl = '/api/reasons',
        _c.reasonStatusUrl = '/api/reasons/updatereasonstatus',
        _c.reasonsListUrl = 'api/reasons/reasonlist',
        _c.reasonEditUrl = 'api/reasons/editReason',
        _c.metricValuesUrl = '/api/metricvalues',
        _c.issuesFilterUrl = '/api/issuesFilter',
        _c.queryUrl = '/api/itemsquery',
        _c.metricsUrl = '/api/metrics',
        _c.metricUrl = '/api/metric',
        _c.metricEditUrl = '/api/metricedit',
        _c.categoryUrl = '/api/category',
        _c);
    return Constants;
    var _a, _b, _c;
}());
exports.Constants = Constants;
//# sourceMappingURL=constants.js.map