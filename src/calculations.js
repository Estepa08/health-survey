// Чистая функция для подсчета баллов опросника
export function calculateScore(answers) {
  if (!answers || answers.length === 0) return 0;

  return answers.reduce((sum, answer) => {
    return sum + (answer || 0);
  }, 0);
}

// Функция для вывода результата
export function showResult(score, totalQuestions) {
  const maxScore = (totalQuestions - 1) * 4;
  const percentage = maxScore === 0 ? 0 : Math.round((score / maxScore) * 100);

  let message;
  if (percentage < 25) {
    message = 'Состояние в пределах нормы';
  } else if (percentage < 50) {
    message = 'Легкое снижение настроения';
  } else if (percentage < 75) {
    message = 'Выраженные признаки снижения настроения';
  } else {
    message = 'Сильно выраженные признаки';
  }

  console.log(`Результат: ${score} баллов (${percentage}%) - ${message}`);
  return { score, percentage, message };
}
