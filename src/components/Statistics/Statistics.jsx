import React from "react";
import { Statistic } from "../../components";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  let average = (good * 1 + neutral * 0 + bad * -1) / all;
  let positive = (good / all) * 100;
  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <>
      <Statistic text="good" value={good} />
      <Statistic text="neutral" value={neutral} />
      <Statistic text="bad" value={bad} />
      <Statistic text="all" value={all} />
      <Statistic text="average" value={average} />
      <Statistic text="positive" value={positive + " %"} />
    </>
  );
};

export default Statistics;
