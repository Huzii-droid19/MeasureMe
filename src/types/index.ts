export interface User {
  id: number;
  name: string;
  DeviceId: string;
}
export interface Task {
  id: number;
  title: string;
  description: string;
  date: Date;
  isCompleted: Boolean;
  userId: number;
}
