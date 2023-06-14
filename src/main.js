
const theme = localStorage.getItem('theme');
const darkSlider = document.querySelector('#darkSlider');
const darkBTN = document.querySelector('#darkBTN');
const darkIcon = document.querySelector('#darkIcon');

if(theme === 'dark'){
    darkBTN.classList.add('left-8');
    document.documentElement.classList.add('dark');
    darkIcon.textContent = 'dark_mode';
}


const darkMode = () => { 
    const theme = localStorage.getItem('theme');
    if(theme === 'light'){
        darkBTN.classList.add('left-8');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        darkIcon.textContent = 'dark_mode';
    } else {
        darkBTN.classList.remove('left-8');
        darkBTN.classList.add('left-1');
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        darkIcon.textContent = 'light_mode';
    }
};


darkSlider.addEventListener(`click`, darkMode);

const addInv = () => {
    window.open("./addinvoice.html", "_self");
}