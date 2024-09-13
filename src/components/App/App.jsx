import { useEffect, useState } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

export default function App() {
  const [feedback, setfeedback] = useState(() => {
    const storedFeedback = localStorage.getItem("feedback");
    return storedFeedback
      ? JSON.parse(storedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  // useEffect(() => {
  //   const storedFeedback = localStorage.getItem('feedback');
  //   if(storedFeedback) {
  //     setfeedback(JSON.parse(storedFeedback));
  //   }
  // }, []);

  // useEffect(() => {
  //   const storedFeedback = JSON.parse(localStorage.getItem("feedback"));
  //   if (storedFeedback) {
  //     setfeedback(storedFeedback);
  //   }
  // }, []);

  useEffect(() => {
    // console.log("Зберігаємо в localStorage:", feedback);
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setfeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setfeedback({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
