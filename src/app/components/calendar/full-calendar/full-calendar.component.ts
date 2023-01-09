import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
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
import { Task } from 'src/app/models/task';
import {AddTaskComponent} from "../add-task/add-task.component";
// import { INITIAL_EVENTS, createEventId } from '../../event-utils';
let newTask: Task ;

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css']
})
export class FullCalendarComponent implements OnInit{
  // taskList: any[] = [];
  @Input("eventList")
  taskList?: any[];
  //   = [
  //   // { title: 'rdv dentiste', start: '2023-01-09 ', end: '2023-01-09', id: "3"},
  //   // {title: 'rdv banque', start: '2023-01-10', end: '2023-01-10', id: "2"},
  //   // {title: 'rdv dermatologue', start: '2023-01-15', end:'2023-01-15', id: "4"}
  // ];


  calendarVisible = true;

  calendarOptions: CalendarOptions = {
    locale: frLocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,],
    // events: [
    //   { title: 'rdv dentiste', date: '2023-01-09', id: "3"},
    //   {title: 'rdv banque', date: '2023-01-10', id: "2"}],
    events: this.taskList,
    editable: true,
    nowIndicator: true,
    dateClick: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventColor: "#90B77D",


  };


  //BehaviorSubject est un observable et plus exactement un sous type de subject
  //doit être initialisé avec une valeur par défaut afin de pouvoir tjs retourner une valeur aux observateurs
  event$:BehaviorSubject<any> = new BehaviorSubject<any>([])


  constructor(private route: ActivatedRoute,
              private router: Router,
              private appUserService: AppUserService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    //todo/ INITIALISER LE CALENDRIER AVEC DONNEES UTILISATEUR
    //
    //     this.taskService.getAll().subscribe((data)=>{
    //     this.events1 = data.ev
    //     this.event$.next(data.eventsByTaskId)
    //   })
  }

  //AU CLIC SUR UNE DATE ON A LES INFOS LIEES
  handleDateSelect(selectDateInfo: DateClickArg) {
    let clickedDate = selectDateInfo.dateStr;
    console.log(clickedDate)
    //On entre des taches dans le calendrier
    const title = prompt(clickedDate + ' - Veuillez entrer un titre à votre tâche');
    const calendarApi = selectDateInfo.view.calendar;
  //  var addTaskComponent = new AddTaskComponent();
    calendarApi.unselect(); // clear date selection
     if (title) {
      calendarApi.addEvent({
        title,
        start: selectDateInfo.dateStr,
        end: selectDateInfo.dateStr,
        allDay: selectDateInfo.allDay
      });

      //ENREGISTREMENT EN BDD
      //Pour récupérer la date pour notre BDD il faut transformer la date du calendrier (string) en format date
      const[year, month, day] = clickedDate.split('-')
       console.log(day);
       console.log(month);
       console.log(year);
       const date = new Date(+year, +month - 1, +day);
       console.log(date);
       newTask.startingDate = date;
       newTask.taskTitle = title;
       console.log(newTask.taskTitle);
      this.taskService.add(newTask);
   }
  }

  //AU CLIC SUR UN EVENEMENT, UNE TACHE ON A SON DETAIL
  handleEventClick(clickInfo: EventClickArg){
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
