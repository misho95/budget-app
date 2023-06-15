const income = document.getElementsByName('income');
const category = document.querySelector('#category');

income[0].addEventListener(`click`, () => {
    html = `
    <option>invoice</option>
    <option>other</option>`;
    category.innerHTML = html;
})

income[1].addEventListener('click', () => {
    html = `
    <option>shopping</option>
    <option>gym</option>
    <option>family</option>
    <option>invoice</option>
    <option>other</option>`;
    category.innerHTML = html;
});





const invForm = document.querySelector('#invForm');

invForm.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem('data'));
    const date = document.querySelector('#date');
    const income = document.getElementsByName('income');
    const category = document.querySelector('#category');
    const amount = document.querySelector('#amount');
    const id = new Date().getTime();

    const numberRegex = /^\d+$/;

    const getIcon = (val) => {
        switch(val){
            case 'shopping':
                return 'storefront'
            case 'gym':
                return 'exercise'
            case 'family':
                return 'family_restroom'
            case 'invoice':
                return 'request_page'
            case 'other':
                return 'payments'
        }
    }


    if(!numberRegex.test(amount.value)){
        alert('amount input is invalid, please use only numbers');
        return;
    }

        if(data){
            const newData = {
                    id,
                    date: date.value,
                    type: income[0].checked ? true : false,
                    category: category.value,
                    amount: amount.value,
                    icon: getIcon(category.value)
                };
    
            data.push(newData);
    
            localStorage.setItem('data', JSON.stringify(data));
        } else {
            const newData = {
                id,
                date: date.value,
                type: income[0].checked ? true : false,
                category: category.value,
                amount: amount.value,
                icon: getIcon(category.value)
            }
            localStorage.setItem('data', JSON.stringify([newData]));
        }
   

 
    invForm.reset();
});