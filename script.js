// Your JavaScript code here
// Чистая функция для подсчета баллов опросника
function calculateScore(answers) {
  if (!answers || answers.length === 0) {
    return 0;
  }

  const totalScore = answers.reduce((sum, answer, index) => {
    if (answer === null || answer === undefined) {
      return sum;
    }
    return sum + answer;
  }, 0);

  return totalScore;
}

// Вспомогательная функция для расчета процентов
function calculatePercentage(score, maxPossibleScore) {
  if (maxPossibleScore === 0) return 0;
  return Math.round((score / maxPossibleScore) * 100);
}

// Функция для определения уровня состояния
function determineConditionLevel(score, totalQuestions) {
  const maxScore = (totalQuestions - 1) * 4;
  const percentage = calculatePercentage(score, maxScore);

  if (percentage < 25) {
    return { level: 'normal', message: 'Состояние в пределах нормы' };
  } else if (percentage < 50) {
    return { level: 'mild', message: 'Легкое снижение настроения' };
  } else if (percentage < 75) {
    return { level: 'moderate', message: 'Выраженные признаки снижения настроения' };
  } else {
    return { level: 'severe', message: 'Сильно выраженные признаки' };
  }
}

// Экспортируем функции для тестов
export {
  calculateScore,
  calculatePercentage,
  determineConditionLevel
};