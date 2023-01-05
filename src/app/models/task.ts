export interface Task {
    taskId?: string;
    taskTitle: string;
    description: string;
    location: string;
    startingDate: any;
    startingHour: any;
    endingDate: any;
    endingHour: any;
    private: boolean;
}
