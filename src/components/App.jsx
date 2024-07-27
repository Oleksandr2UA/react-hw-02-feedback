import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onBtnClick = e => {
    const { name } = e.currentTarget;

    this.setState(prevState => ({
      [name]: (prevState[name] += 1),
    }));
  };

  countTotalFeedback = () => {
    const values = Object.values(this.state);
    const total = values.reduce((acc, currValue) => acc + currValue, 0);

    return total;
  };
  countPositiveFeedbackPercentage = () => {
    const positiveTotal = this.state.good;
    const total = this.countTotalFeedback();

    if (total > 0) return (positiveTotal / total) * 100;
    return null;
  };

  render() {
    const { good, neutral, bad } = this.state;

    const options = Object.keys(this.state);
    const total = this.countTotalFeedback();
    const posPercentage = Math.round(this.countPositiveFeedbackPercentage());

    return (
      <>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.onBtnClick}
          />
        </Section>

        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={posPercentage}
            />
          </Section>
        )}
      </>
    );
  }
}
