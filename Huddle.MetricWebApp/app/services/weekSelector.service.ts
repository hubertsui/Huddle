import { Injectable,Output,EventEmitter} from '@angular/core';
import { WeekDay} from '../shared/models/weekDay';
import { DateHelper } from '../utils/dateHelper';

@Injectable()
export class WeekSelectorService {

    currentWeek: WeekDay;
    currentWeekDays:Array<Date>;
    @Output() selectWeek: EventEmitter<WeekDay> = new EventEmitter<WeekDay>();

    getCurrentWeek() {
        if (this.currentWeek != null)
            return this.currentWeek;
        this.currentWeek = DateHelper.getStartAndEndDayOfWeek();
        return this.currentWeek;
    }

    getCurrentWeekDays() {
        if (this.currentWeekDays != null)
            return this.currentWeekDays;
        this.currentWeekDays = DateHelper.getDaysofWeek(this.getCurrentWeek());
        return this.currentWeekDays;
    }

    gotoPreviousWeek() {
        let dayBeforeWeek = this.currentWeek.startDay.setDate(this.currentWeek.startDay.getDate() - 2);
        this.currentWeek = DateHelper.getStartAndEndDayOfWeek(new Date(dayBeforeWeek));
        this.currentWeekDays = DateHelper.getDaysofWeek(this.currentWeek);
        this.selectWeek.emit(this.currentWeek);
    }

    gotoNextWeek() {
        let dayAfterWeek = this.currentWeek.endDay.setDate(this.currentWeek.endDay.getDate() + 1);
        this.currentWeek = DateHelper.getStartAndEndDayOfWeek(new Date(dayAfterWeek));
        this.currentWeekDays = DateHelper.getDaysofWeek(this.currentWeek);
        this.selectWeek.emit(this.currentWeek);
    }

}