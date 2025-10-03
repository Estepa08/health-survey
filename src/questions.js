// Функция для загрузки вопросов
export async function loadQuestions() {
  console.log('🔄 Пытаюсь загрузить questions.json...');

  try {
    const response = await fetch('./questions.json');
    console.log('📡 Ответ от сервера:', response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const questions = await response.json();
    console.log('✅ Вопросы загружены:', questions);
    return questions;
  } catch (error) {
    console.error('❌ Ошибка загрузки вопросов:', error);
    return [];
  }
}
