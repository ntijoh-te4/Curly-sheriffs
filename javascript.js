























function index(){
    const main = document.querySelector('main');
    const template = document.querySelector('.start_words');
    const clone = template.content.cloneNode(true);

    main.appendChild(clone)
}
