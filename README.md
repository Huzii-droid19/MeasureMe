
# MeasureMe

MeasureMe is a todo list application that allows you to measure yourself, helps in you in manageing your daily tasks and events.


## Features

- Light and Dark Mode
- Integrated with Google Calendar
- Fullscreen mode
- Cross platform i.e., work on IOS and android


## Tech Stack

**Client:** React Native, UI Kitten, Styled Components, Ramda, Redux Toolkit Query.

**Server:** Mock API


## API Reference

#### Generate .env file

```http
BASE_URL='YOUR_MOCK_API_BASE_URL'
GOOGLE_API_KEY='YOUR_GOOGLE_API_KEY'
GOOGLE_CLIENT_ID='YOUR_GOOGLE_WEB_CLIENT_ID'
GOOGEL_CALENDAR_BASE_URL=https://www.googleapis.com/calendar/v3/

```
## Mock API Schema
#### users

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. your name |
| `DeviceId` | `string` | **Required**. your DeviceId, auto-fetched when registering from application |
| `email` | `string` | **Required**. your email address|

#### Task

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. task title |
| `description` | `string` | **Required**. task description |
| `date` | `date` | **Required**. task deadline |
| `isCompleted` | `boolean` | **Required**. task completion status |
| `userId` | `number` | **Required**. task creator id |
| `eventId` | `string` | **Optional**. Google Event Id |
| `hangoutLink` | `string` | **Optional**. Google meet Join link |



## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)


## Authors

- [@Huzii-droid19](https://github.com/Huzii-droid19)

