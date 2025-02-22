const searchInput = document.querySelector('.search-input')
const searchForm = document.querySelector('.search-form')
const expenseForm = document.querySelector('.expense-form')
const addButton = document.querySelector('.add-expense')
const overlay = document.querySelector('.overlay')
const userProfile = document.querySelector('.user-profile')
const userIcon = document.querySelector('.user')
const backButton = document.querySelector('.back-button')
const homepage = document.querySelector('.homepage')


searchInput.addEventListener('focus', (e) => {
  searchForm.classList.add('focused')
})

addButton.addEventListener('click', (e) => {
  expenseForm.classList.add('active')
  overlay.classList.add('active')
})

overlay.addEventListener('click', (e) => {
  expenseForm.classList.remove('active')
  overlay.classList.remove('active')
})


userIcon.addEventListener('click', (e) => {
  userProfile.classList.add('active')
  setTimeout(() => {
    homepage.classList.add('hidden')
  }, 200)
})


backButton.addEventListener('click', (e) => {
  homepage.classList.remove('hidden')
  userProfile.classList.remove('active')
})