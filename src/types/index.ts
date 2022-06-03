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
}
export interface TaskForm {
  title: string;
  description: string;
  date: Date;
  isCompleted: Boolean;
}
export interface RegisterForm {
  email: string;
  name: string;
}
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
  };
  accessToken: string;
}
