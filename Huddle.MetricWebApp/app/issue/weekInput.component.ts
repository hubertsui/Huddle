import { Component, OnInit, Input } from '@angular/core';
import { WeekDay } from '../shared/models/weekDay';
import { WeekInputViewModel } from '../shared/models/weekInputViewModel';
import { DateHelper } from '../utils/dateHelper';
import { WeekSelectorService } from '../services/weekSelector.service';

@Component({
    templateUrl: 'app/issue/weekInput.component.html',
    selector: 'week-input',
    styleUrls: ['app/issue/weekInput.component.css', 'app/shared/shared.css']
})

export class WeekInputComponent implements OnInit {
    currentWeekDays: Array<Date>;
    @Input('rowIndex') rowIndex: number;
    @Input('weekInputViewModel') weekInputViewModel: WeekInputViewModel;
    constructor(private weekSelectorService: WeekSelectorService) {
    }
    ngOnInit(): void {
        this.subscribeWeekSelector();
        this.currentWeekDays = this.weekSelectorService.getCurrentWeekDays();
    }
    
    subscribeWeekSelector() {
        this.weekSelectorService.selectWeek.subscribe(weekDay => {
            this.currentWeekDays = this.weekSelectorService.getCurrentWeekDays();
        });
    }
}
