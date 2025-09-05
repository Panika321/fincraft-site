const quizForm = document.getElementById('quizForm');
const steps = document.querySelectorAll('.quiz-step');
let currentStep = 1;
let selectedGoal = '';

document.querySelectorAll('[data-step="1"] button').forEach(btn => {
  btn.addEventListener('click', () => {
    selectedGoal = btn.dataset.value;
    showStep(2);
    const paramOptions = document.getElementById('paramOptions');
    paramOptions.innerHTML = '';
    if(selectedGoal.includes('карта')){
      ['Кэшбэк','Мили','Премиум-сервис','Без разницы'].forEach(opt => addOption(opt));
    } else if(selectedGoal.includes('Кредит') || selectedGoal.includes('Займ')){
      ['До 100 тыс','100–500 тыс','Более 500 тыс'].forEach(opt => addOption(opt));
    } else if(selectedGoal.includes('РКО')){
      ['Низкая комиссия','Быстрые платежи','Удобный онлайн-банк'].forEach(opt => addOption(opt));
    } else if(selectedGoal.includes('ИП')){
      ['Уже работаю','Только начинаю'].forEach(opt => addOption(opt));
    }
  });
});

function addOption(text){
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = text;
  btn.addEventListener('click', () => showStep(3));
  document.getElementById('paramOptions').appendChild(btn);
}

function showStep(step){
  steps.forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');
  currentStep = step;
}

quizForm.addEventListener('submit', async e => {
  e.preventDefault();
  quizForm.style.display='none';
  document.getElementById('quizSuccess').style.display='block';
  incrementCounter();
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    q.parentElement.classList.toggle('active');
  });
});

// Счётчик заявок
let counter = Math.floor(Math.random()*50)+80;
document.getElementById('counterValue').innerText = `Сегодня уже ${counter} клиентов оставили заявки 🚀`;
function incrementCounter(){
  counter++;
  document.getElementById('counterValue').innerText = `Сегодня уже ${counter} клиентов оставили заявки 🚀`;
}
