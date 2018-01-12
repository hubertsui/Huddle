import { Component, OnInit,Input,Output, EventEmitter} from '@angular/core';
import { DateHelper } from '../utils/dateHelper';
import { AllowIssueClick } from '../shared/models/allowIssueClick';
import { WeekDay } from '../shared/models/weekDay';
import { WeekSelectorService } from '../services/weekSelector.service';

@Component({
    templateUrl: 'app/issue/weekSelector.component.html',
    selector: 'week-selector',
    styleUrls: ['app/issue/weekSelector.component.css', 'app/shared/shared.css']
})

export class WeekSelectorComponent implements OnInit {

    weekDisplay: string;
    //@Output() selectWeek: EventEmitter<WeekDay> = new EventEmitter<WeekDay>();
    @Input('allowClick') allowClick: AllowIssueClick;
    @Output() afterCheckAllowClick: EventEmitter<boolean> = new EventEmitter<boolean>();

    clickPrevious: boolean;
    clickNext: boolean;

    datesIntervalStr: string;

    constructor(private weekSelectorService: WeekSelectorService) {
    }
    ngOnInit(): void {
        this.datesIntervalStr = DateHelper.getDatesIntervalStr(this.currentWeek());
        //this.selectWeek.emit(this.currentWeek);
        this.resetClickState();
    }

    currentWeek(): WeekDay{
        return this.weekSelectorService.getCurrentWeek();
    }

    clickPreviousWeek() {
        this.clickPrevious = true;
        this.afterCheckAllowClick.emit(false);
        if (!this.allowClick.allowClick)
            return;
        this.weekSelectorService.gotoPreviousWeek();
        this.datesIntervalStr = DateHelper.getDatesIntervalStr(this.currentWeek());
    }

    clickNextWeek(): void{
        this.clickNext = true;
        this.afterCheckAllowClick.emit(false);
        if (!this.allowClick.allowClick)
            return;
        this.gotoNextWeek();
        this.datesIntervalStr = DateHelper.getDatesIntervalStr(this.currentWeek());
    }

    changeWeek() {
        if (this.clickNext == true)
            this.gotoNextWeek();
        if (this.clickPrevious == true)
            this.gotoPreviousWeek();
    }

    gotoPreviousWeek() {
        this.weekSelectorService.gotoPreviousWeek();
        //this.selectWeek.emit(this.currentWeek);
        this.resetClickState();
    }

    gotoNextWeek() {
        this.weekSelectorService.gotoNextWeek();
        //this.selectWeek.emit(this.currentWeek);
        this.resetClickState();
    }

    resetClickState() {
        this.clickNext = false;
        this.clickPrevious = false;
    }
}