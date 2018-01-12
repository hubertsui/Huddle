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
var data_service_1 = require("../services/data.service");
var constants_1 = require("../shared/constants");
var QueryService = /** @class */ (function () {
    function QueryService(dataService) {
        this.dataService = dataService;
    }
    QueryService.prototype.searchQuery = function (state, keyword, teamId) {
        var _this = this;
        var activeObject = new Rx_1.ReplaySubject(1);
        this.dataService.getArray(constants_1.Constants.webAPI.queryUrl + "/" + state + "/" + keyword + '/' + teamId + '/')
            .subscribe(function (resp) {
            var result = [];
            resp.forEach(function (item, index) {
                result.push(item);
            }, _this);
            activeObject.next(result);
        }, function (error) { activeObject.error(error); });
        return activeObject;
    };
    QueryService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [data_service_1.DataService])
    ], QueryService);
    return QueryService;
}());
exports.QueryService = QueryService;
//# sourceMappingURL=query.service.js.map