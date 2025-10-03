// Функция для загрузки вопросов
export async function loadQuestions() {
  try {
    const response = await fetch('./questions.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Ошибка загрузки вопросов:', error);
    return [];
  }
}
