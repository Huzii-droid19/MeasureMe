export interface User {
  id: number;
  name: string;
  email: string;
  DeviceId: string;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date;
  isCompleted: boolean;
  userId: number;
  eventId: string;
}
export interface TaskForm extends Omit<Task, 'id' | 'userId'> {}
export interface RegisterForm extends Omit<User, 'id'> {}

export interface RootStackParamsList {
  Home: undefined;
  Details: {task: Task};
  Edit: {task: Task};
  NewTask: undefined;
  Register: undefined;
}
export interface CalendarApiParams {
  task: {
    summary: string;
    description: string;
    start: {
      dateTime: Date;
    };
    end: {
      dateTime: Date;
    };
    conferenceData?: {
      createRequest?: {
        requestId: string;
        conferenceSolutionKey: {
          type: string;
        };
      };
    };
  };
  accessToken: string;
}

export interface MeetButtonParams {
  isAdded: boolean;
  iconName: string;
  meetUpText: string;
}
