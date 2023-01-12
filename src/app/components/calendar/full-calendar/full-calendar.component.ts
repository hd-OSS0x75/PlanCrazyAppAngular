import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {ActivatedRoute, Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {Task} from 'src/app/models/task';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  taskList!: any[];
  task: any[] | undefined;

  @Output() choseThisDateEvent = new EventEmitter<string>();

  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    locale: frLocale,
    timeZone: 'UTC',
    initialView: 'dayGridMonth',
    views: {
      dayGridMonth: {
        titleFormat: { month: 'long', year: 'numeric'}
      }
    },
    contentHeight: 500,
    dayMaxEventRows: true,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    // events: this.taskList,
    headerToolbar: {
      start:'title',
      end: 'today prev, next',
    },
    footerToolbar:{
      center : "dayGridMonth,timeGridWeek,timeGridDay"
    },
    editable: true, // permet de déplacer la réunion en drag and drop //todo: la MAJ ne se fait pas en BDD
    // eventDrop: (infos) => {
    //   if(!confirm("Etes vous sûr de vouloir déplacer l'évènements?")) {infos.revert();}
    //      // else{this.updateDateEvent(infos.event.id)}
    //     },
    eventDrop: this.updateDateEvent.bind(this),
    nowIndicator: true,
    selectable: true,
    dateClick: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventColor: "#90B77D",
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appUserService: AppUserService,
              private taskService: TaskService) {
  }


 ngOnInit(): void {
    this.taskService.getAll().subscribe({
      next: value => {
        this.taskList = value.map(
          value1 => {
            return {
              id: value1['taskId'],
              title: value1['taskTitle'],
              description: value1['description'],
              location: value1['location'],
              start: (value1['startingDate'] + ' ' + value1['startingHour']),
              end: (value1['endingDate'] + ' ' + value1['endingHour']),
              private: value1['private']
            };
          }
        );
      //  this.updateCalendar();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  // private updateCalendar() {
  //   this.calendarOptions = {
  //     locale: frLocale,
  //     timeZone: 'UTC',
  //     initialView: 'dayGridMonth',
  //     views: {
  //       dayGridMonth: {
  //         titleFormat: { month: 'long', year: 'numeric'}
  //       }
  //     },
  //     contentHeight: 500,
  //     dayMaxEventRows: true,
  //     plugins: [
  //       interactionPlugin,
  //       dayGridPlugin,
  //       timeGridPlugin,
  //       listPlugin,],
  //     events: this.taskList,
  //     headerToolbar: {
  //       start:'title',
  //       end: 'today prev, next',
  //     },
  //     footerToolbar:{
  //       center : "dayGridMonth,timeGridWeek,timeGridDay"
  //     },
  //     editable: true, // permet de déplacer la réunion en drag and drop //todo: la MAJ ne se fait pas en BDD
  //     // eventDrop: (infos) => {
  //     //   if(!confirm("Etes vous sûr de vouloir déplacer l'évènements?")) {infos.revert();}
  //     //      // else{this.updateDateEvent(infos.event.id)}
  //     //     },
  //     eventDrop: this.updateDateEvent.bind(this),
  //     nowIndicator: true,
  //     selectable: true,
  //     dateClick: this.handleDateSelect.bind(this),
  //     eventClick: this.handleEventClick.bind(this), //todo : make it work. What do we want from it ?
  //     eventColor: "#90B77D",
  //     eventTimeFormat: { // like '14:30:00'
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       meridiem: false
  //     },
  //   };
  // }

//AU CLIC SUR UNE DATE PERMET DE MODIFIER LA VALEUR DE LA DATE DANS LE TITRE ET FAIT APPARAITRE TACHES DU JOUR
  handleDateSelect(selectDateInfo: DateClickArg) {
    let clickedDate = selectDateInfo.dateStr;
    this.choseThisDate(clickedDate);
  }

  //AU CLIC SUR UN EVENEMENT, UNE TACHE ON A SON DETAIL
  handleEventClick(clickInfo: EventClickArg) {
   let id= clickInfo.event.id;
    this.taskService.get(id).subscribe({
      next: () => this.router.navigate(['/task/details/' + id]),
      error: (err) => console.log(err)
    });
  }

  choseThisDate(date: string) {
    this.choseThisDateEvent.emit(date);
  }

  updateDateEvent(events: any){let task: Task = {
      taskId: events.event.id,
      taskTitle: events.event.title,
      description: this.taskList.filter(elem => elem.id == events.event.id)[0].description,
      location: this.taskList.filter(elem => elem.id == events.event.id)[0].location,
      startingDate: events.event.start.toJSON(),
      startingHour: events.event.start.toTimeString().split(' ')[0],
      endingDate: events.event.end.toJSON(),
      endingHour: events.event.end.toTimeString().split(' ')[0],
      private: this.taskList.filter(elem => elem.id == events.event.id)[0].private
    };
    this.taskService.update(task).subscribe({
      next:()=>console.log("Mise à jour effectuée"),
      error:(err)=>console.log(err)
    });

  }

}
