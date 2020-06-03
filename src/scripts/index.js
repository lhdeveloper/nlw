const buttonSearch = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const close = document.querySelector('.close');

buttonSearch.addEventListener('click', () => {
    modal.classList.remove('hide');
})

close.addEventListener('click', () => {
    modal.classList.add('hide');
})