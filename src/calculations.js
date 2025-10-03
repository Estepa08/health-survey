// Чистая функция для подсчета баллов опросника
export function calculateScore(answers) {
  if (!answers || answers.length === 0) return 0;

  return answers.reduce((sum, answer) => {
    return sum + (answer || 0);
  }, 0);
}
