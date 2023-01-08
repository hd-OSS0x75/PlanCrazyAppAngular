import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from "@fullcalendar/core/locales/fr";
// import timeGridPlugin from '@fullcalendar/timegrid';
// import listPlugin from '@fullcalendar/list';
// import interactionPlugin from '@fullcalendar/interaction';
// import { INITIAL_EVENTS, createEventId } from '../../event-utils';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [dayGridPlugin]};



}
