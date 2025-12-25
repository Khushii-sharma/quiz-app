# Quiz App

An interactive, responsive ##Multiple Choice Quiz Application** built for the Edzy.Ai.
The app allows students to select a subject, attempt quizzes question-by-question, receive instant feedback, and view a detailed summary at the end.

---

## How to Run the Project
### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Start development server
```bash
npm run dev
```

The app runs locally at: `http://localhost:3000`

## Libraries Used:
- **Next.js (App Router)** – React framework for building scalable applications with file-based routing.
- **React** – For building interactive UI components and managing quiz state.
- **Tailwind CSS** – Utility-first CSS framework for responsive and modern styling.
- **Shadcn/UI** – Accessible UI components used for buttons, cards, and layout.
- **TanStack Query** – Manages API fetching, caching, and loading/error states.
- **Axios** – HTTP client used for making API requests in a clean and reusable way.
- **Edzy Quiz API** – Provides dynamic quiz data including questions, options, and solutions.


## Workflow:
- User selects a subject and number of questions.
- Quiz data is fetched dynamically from the Edzy Quiz API.
- Questions are displayed one at a time.
- User selects an option and submits the answer.
- Immediate feedback is shown (correct / incorrect).
- Incorrect answers can be retried until correct.
- A countdown timer runs for each question and resets on navigation.
- Progress bar updates as the quiz advances.
- On completion, a summary screen shows the final score and incorrect attempts.


## Improvements Planned:
- Dark / Light theme toggle
- Show total time taken in summary
- Animations for correct / incorrect feedback
- Question-wise analytics
- Resume quiz functionality




### Author:
Khushi | sharmakhushi1501@gmail.com
