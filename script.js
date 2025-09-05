// Quiz logic with single gray Back and working Main Menu
const quizForm = document.getElementById('quizForm');
const steps = document.querySelectorAll('.quiz-step');
let selectedGoal = '';
let selectedParam = '';

document.querySelectorAll('[data-step="1"] .opt').forEach(btn => {
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
  btn.className = 'opt';
  btn.textContent = text;
  btn.addEventListener('click', () => {
    selectedParam = text;
    document.getElementById('goalInput').value = selectedGoal;
    document.getElementById('paramsInput').value = selectedParam;
    showStep(3);
  });
  document.getElementById('paramOptions').appendChild(btn);
}

function showStep(step){
  steps.forEach(s => s.classList.remove('active'));
  const node = document.querySelector(`[data-step="${step}"]`);
  if(node) node.classList.add('active');
  window.scrollTo({top: document.getElementById('quiz').offsetTop - 20, behavior:'smooth'});
}

// Only one Back button (gray)
document.getElementById('backStep2').addEventListener('click', ()=> showStep(1));
document.getElementById('backStep3').addEventListener('click', ()=> showStep(2));

// Submit via Formspree
quizForm.addEventListener('submit', e => {
  e.preventDefault();
  fetch(quizForm.action, {
    method: "POST",
    body: new FormData(quizForm),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if(response.ok){
      quizForm.style.display='none';
      document.getElementById('quizSuccess').style.display='block';
    } else {
      // fallback UI
      alert('Не удалось отправить форму. Попробуйте позже.');
    }
  }).catch(()=> alert('Ошибка сети. Повторите попытку.'));
});

// Main menu button works
document.getElementById('menuBtn').addEventListener('click', () => {
  restartQuiz();
  document.getElementById('hero').scrollIntoView({behavior:'smooth'});
});

function restartQuiz(){
  quizForm.reset();
  selectedGoal = '';
  selectedParam = '';
  showStep(1);
  quizForm.style.display='block';
  document.getElementById('quizSuccess').style.display='none';
}
