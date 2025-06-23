# AnswersAi - Frontend Engineer Take-Home Assignment
Live at - https://answers-ai-frontend-task.vercel.app/dashboard

##  Screens Implemented

### 1. **Dashboard Screen**
- Displays a primary line chart visualization.
- Includes a Variables Panel with interactive variable tags.
- "Edit Variables" button triggers a slide-over panel.

### 2. **Slide-Over Variable Editor**
- Triggered from the Dashboard.
- Smooth transition overlay card with variable selection controls.

### 3. **Details Tooltip (Data Hover)**
- On hovering over chart data points:
  - A dynamic tooltip appears.
  - Shows value, target comparison, and percentage change.
  - Features smooth fade/slide-in animation and hover line.


###  Slide-Over Card
- Triggered via "Edit Variables".
- Smooth animated slide-in/out behavior.
- Click-outside-to-close + Close button.

###  Data Point Hover
- Tooltip appears with animated hover feedback.
- Glowing data point with vertical hover line and interpolated marker lines.

###  Variable Selection
- Click to toggle variable state (selected/unselected).
- Hovering shows description after a delay.
- Automatic hide after delay on mouse leave.

---

##  Stack 

- **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **React Context** for state management
- **React Router** for navigation
- **Chart.js** for data visualization
- **Firebase Auth** (Google & Email/Password) – optional placeholder config
- **Vite** for build tooling

---

## Live preview link 

https://answers-ai-frontend-task.vercel.app/dashboard
##  Local Setup Instructions

### 1. Clone the repository

```bash
git https://github.com/maniksharma424/AnswersAiFrontendTask.git

npm install

Add Env variables as shared in the mail 

npm run dev
