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
