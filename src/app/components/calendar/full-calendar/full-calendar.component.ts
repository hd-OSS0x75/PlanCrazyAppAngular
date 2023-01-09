import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from "@fullcalendar/core/locales/fr";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, {DateClickArg} from '@fullcalendar/interaction';
import {AppUser} from "../../../models/app-user";
import {ActivatedRoute, Router} from "@angular/router";
import {AppUserService} from "../../../services/app-user-authentification/app-user.service";
import {TaskService} from "../../../services/calendar/task.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Task} from 'src/app/models/task';
import {AddTaskComponent} from "../add-task/add-task.component";
// import { INITIAL_EVENTS, createEventId } from '../../event-utils';
let newTask: Task;

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit {
  taskList?: any[];

  @Output() choseThisDateEvent = new EventEmitter<string>();

  choseThisDate(date: string) {
    this.choseThisDateEvent.emit(date);
  }

  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    events: this.taskList,
    editable: true,
    nowIndicator: true,
    dateClick: this.handleDateSelect.bind(this), //todo : make it work
    eventClick: this.handleEventClick.bind(this), //todo : make it work
    eventColor: "#90B77D",
  };


  //BehaviorSubject est un observable et plus exactement un sous type de subject
  //doit être initialisé avec une valeur par défaut afin de pouvoir tjs retourner une valeur aux observateurs
  event$: BehaviorSubject<any> = new BehaviorSubject<any>([])


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
              title: value1['taskTitle'],
              start: value1['startingDate'],
              end: value1['endingDate']
            };
          }
        );
        this.updateCalendar();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private updateCalendar() {
    this.calendarOptions = {
      locale: frLocale,
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,],
      events: this.taskList,
      editable: true,
      nowIndicator: true,
      dateClick: this.handleDateSelect.bind(this),//todo : make it work
      eventClick: this.handleEventClick.bind(this), //todo : make it work
      eventColor: "#90B77D",
    };
  }

//AU CLIC SUR UNE DATE PERMET DE MODIFIER LA VALEUR DE LA DATE
  handleDateSelect(selectDateInfo: DateClickArg) {
    let clickedDate = selectDateInfo.dateStr;
    // console.log(clickedDate);
    this.choseThisDate(clickedDate);
    //On entre des taches dans le calendrier
    // const title = prompt(clickedDate + ' - Veuillez entrer un titre à votre tâche');
    // const calendarApi = selectDateInfo.view.calendar;
    // //  var addTaskComponent = new AddTaskComponent();
    // calendarApi.unselect(); // clear date selection
    // if (title) {
    //   calendarApi.addEvent({
    //     title,
    //     start: selectDateInfo.dateStr,
    //     end: selectDateInfo.dateStr,
    //     allDay: selectDateInfo.allDay
    //   });

      // //ENREGISTREMENT EN BDD
      // //Pour récupérer la date pour notre BDD il faut transformer la date du calendrier (string) en format date
      // const[year, month, day] = clickedDate.split('-')
      //  console.log(day);
      //  console.log(month);
      //  console.log(year);
      //  const date = new Date(+year, +month - 1, +day);
      //  console.log(date);
      //  newTask.startingDate = date;
      //  newTask.taskTitle = title;
      //  console.log(newTask.taskTitle);
      // this.taskService.add(newTask);
  }

  //AU CLIC SUR UN EVENEMENT, UNE TACHE ON A SON DETAIL
  handleEventClick(clickInfo: EventClickArg) {
    //QUAND ON CLIQUE SUR UN EVENEMENT on affiche son nom dans la console ou son id
    console.log(clickInfo.event.title)
    console.log(clickInfo.event.id)
    console.log(clickInfo)

    this.taskService.get(clickInfo.event.id).subscribe({
      next: () => this.router.navigate(['/details/:clickInfo.event.id']),
      error: (err) => console.log(err)
    });
  }


}
