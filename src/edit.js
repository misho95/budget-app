window.addEventListener('DOMContentLoaded', () => {

    let id = new URLSearchParams(document.location.search);
    const getID = id.get('ID');

    const data = JSON.parse(localStorage.getItem('data'));

    const filter = data.filter( (inv) => {
        if(inv.id === +getID){
            return inv;
        }
    });


const root = document.querySelector('#root');

root.innerHTML = `
<form id="invForm" class="w-full sm:w-1/2 flex flex-col text-gray-600 dark:text-gray-300 gap-3">
<fieldset class="border-2 border-gray-300 dark:border-gray-600 p-2">
    <legend class="px-2 ">Date</legend>
    <input id="date" value=${filter[0].date} type="date" class="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
</fieldset>
<fieldset class="border-2 border-gray-300 dark:border-gray-600 p-2">
    <legend class="px-2 ">Type</legend>
    <lable>
        Income
        <input type="radio" name="income" ${filter[0].type ? 'checked' : ''}>
    </lable>
    <lable>
        Expense
        <input type="radio" name="income" ${filter[0].type ? '' : 'checked'}>
    </lable>
</fieldset>
<fieldset class="border-2 border-gray-300 dark:border-gray-600 p-2">
    <legend class="px-2 ">Category</legend>
    <select id="category" class="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required>
    ${filter[0].type ? `
    <option>invoice</option>
    <option>other</option>
    ` : `
    <option>shopping</option>
    <option>gym</option>
    <option>family</option>
    <option>invoice</option>
    <option>other</option>
    `}
       
    </select>
</fieldset>
<fieldset class="border-2 border-gray-300 dark:border-gray-600 p-2">
    <legend class="px-2 ">Amount</legend>
    <input value=${filter[0].amount} id="amount" type="text" placeholder="amount.." class="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
</fieldset>
<button class="bg-purple-300 dark:bg-purple-400 text-purple-800 p-3">Add New Invoice</button>
</form>`;

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


} )    

