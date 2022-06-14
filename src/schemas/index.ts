import {Task} from 'types';
import * as yup from 'yup';

export const editTaskSchema = (task: Task) =>
  yup.object().shape({
    title: yup
      .string()
      .required()
      .test('is-title', 'Title is not updated', value => {
        return value !== task.title;
      }),
    description: yup
      .string()
      .required()
      .test('is-description', 'Description is not updated', value => {
        return value !== task.description;
      }),
    date: yup
      .date()
      .required()
      .test('is-date', 'Date is not updated', value => {
        return value?.toDateString() !== new Date(task.date).toDateString();
      }),
  });

export const createTaskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date().required(),
  isCompleted: yup.boolean(),
});
export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),
});
