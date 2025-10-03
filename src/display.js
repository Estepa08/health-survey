// Функция для отображения вопроса на странице
export function displayQuestion(question, questionIndex, onAnswerSelect) {
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');

  if (!questionText || !optionsContainer) {
    console.error('Не найдены элементы для отображения вопроса');
    return;
  }

  // Обновляем текст вопроса
  questionText.textContent = question.question;

  // Очищаем предыдущие варианты ответов
  optionsContainer.innerHTML = '';

  // Создаем варианты ответов
  question.options.forEach((optionText, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = optionText;
    optionElement.dataset.value = index;

    optionElement.addEventListener('click', () => {
      document.querySelectorAll('.option').forEach((opt) => {
        opt.classList.remove('selected');
      });
      optionElement.classList.add('selected');

      console.log(`Выбран ответ: ${optionText} (балл: ${index})`);

      if (onAnswerSelect) {
        onAnswerSelect(questionIndex, index);
      }
    });

    optionsContainer.appendChild(optionElement);
  });

  console.log(`Отображен вопрос: "${question.question}"`);
}

// Функция для обновления счетчика вопросов
export function updateQuestionCounter(current, total) {
  const currentQuestionSpan = document.getElementById('current-question');
  const totalQuestionsSpan = document.getElementById('total-questions');

  if (currentQuestionSpan) currentQuestionSpan.textContent = current;
  if (totalQuestionsSpan) totalQuestionsSpan.textContent = total;
}
