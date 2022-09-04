const modalWindow = document.querySelector('#modal');
const modalMessage = document.querySelector('#modalMessage');
const btns = document.querySelectorAll('.delete');

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        showModalMessage(e)
    })
})

function showModalMessage(linkEvent) {
    modalMessage.classList.add('show');
    modalMessage.querySelector('.yes-btn').addEventListener('click', () => {

    });
    modalMessage.querySelector('.no-btn').addEventListener('click', () => {
        linkEvent.preventDefault()
    });
}
