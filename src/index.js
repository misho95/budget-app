const data = JSON.parse(localStorage.getItem('data'));

const sortBy = document.querySelector('#sortBy');

const sortData = (data, sortBy) => {
    switch(sortBy){
        case 'Date':
           data.sort( (a, b) => {
                return new Date(b.date) - new Date(a.date);
            })
            render(data);
            break;
            
        case 'Expense':
            data.sort( (a, b) => {
                return a.type - b.type;
            })
            render(data);
            break;

        case 'Income':
            data.sort( (a, b) => {
                return b.type - a.type;
            })
            render(data);
            break;
        case 'Amount inc':
            data.sort( (a, b) => {
                return a.amount - b.amount;
            })
            render(data);
            break;
        case 'Amount dec':
            data.sort( (a, b) => {
                return b.amount - a.amount;
            })
            render(data);
            break;
        
    }
}


const render = (data) => {
    const mapData = data.map( (inv) => {

        return `
        <!-- invoice -->
        <div class="w-full sm:w-fit h-fit ${inv.type ? 'bg-green-300 dark:bg-green-400' : 'bg-red-300 dark:bg-red-400'} p-3 rounded-lg text-gray-800 flex flex-col gap-2 relative pr-12">
            <div class="absolute right-3 top-3 pb-3 h-full flex flex-col justify-between">
                <button>
                    <span class="material-symbols-outlined">
                        delete
                        </span>
                </button>
                <button>
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </div>
             <div class="flex items-center gap-2"><span class="material-symbols-outlined">
                 calendar_month
                 </span>${inv.date}</div>
             <div class="flex items-center gap-2"><span class="material-symbols-outlined">${inv.icon}</span> ${inv.category}</div>
             <div class="flex items-center gap-2"><span class="material-symbols-outlined">
                 paid
                 </span> ${inv.amount}</div>
        </div>

        `
    });

    const joinMap = mapData.join('');
    const root = document.querySelector('#root');
    const before = `
    <div onclick="addInv()" class="bg-purple-300 dark:bg-purple-400 text-purple-800 w-full sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg">
    <span class="material-symbols-outlined select-none" style="font-size: 30px">
        add_box
        </span>
    </div>
    `;
    const html = before.concat(joinMap);
    root.innerHTML = html;

    sortBy.addEventListener('change', (e) => {
        sortData(data, e.target.value);
    })
    }

    if(data){
       render(data);
    };


    const filterForm = document.querySelector('#filterForm');
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const filterDate = document.querySelector('#filterDate');
        const filterCategory = document.querySelector('#filterCategory');
        const filterMin = document.querySelector('#filterMin');
        const filterMax = document.querySelector('#filterMax');

        const filterData = data.filter( (inv) => {
            if(filterDate.value && filterDate.value === inv.date || 
                filterCategory.value && filterCategory.value === inv.category ||
                filterMin.value && filterMin.value < inv.amount || 
                filterMax.value && filterMax.value > inv.amount) return inv;
        })

       render(filterData);
    });


    (() => {


        //calculate total stats

        const filterDataByCategoryAndReduce = (data, category) => {
            const filter = data.filter( (inv) => {
                if(category === inv.category) return inv;
            })
    
            const reduce = filter.reduce( (val, el) => {
                return val+= +el.amount;
            }, 0);
    
            return reduce;
        }
    
        const stats = [
            {
                name: 'shopping',
                amount: filterDataByCategoryAndReduce(data, 'shopping')
            },
            {
                name: 'gym',
                amount: filterDataByCategoryAndReduce(data, 'gym')
            },
            {
                name: 'family',
                amount: filterDataByCategoryAndReduce(data, 'family')
            },
            {
                name: 'invoice',
                amount: filterDataByCategoryAndReduce(data, 'invoice')
            },
            {
                name: 'other',
                amount: filterDataByCategoryAndReduce(data, 'other')
            }
        ];
    
        const mapStats = stats.map( (stat) => {
            return `
                <span>${stat.name} ${stat.amount}</span>
            `;
        });
    
        const mapStatsJoin = mapStats.join('');
    
        const statsDiv = document.querySelector('#stats');
    
        const before = statsDiv.innerHTML;
    
        const html = before.concat(mapStatsJoin);
    
        statsDiv.innerHTML = html;


    })();
   

    ( () => {

        // calculate top3

        const sortTop = data.sort( (a,b) => {
            return b.amount - a.amount;
        })

        const slice = sortTop.slice(0,3);

        const top3 = slice.map( (inv) => {
            return `<span>${inv.category} ${inv.amount}</span>`;
        });

        const joinTop3 = top3.join('');

        const top3Div = document.querySelector('#top3');

        const before = top3Div.innerHTML;

        const html = before.concat(joinTop3);

        top3Div.innerHTML = html;


    })();

    ( () => {

        //calculate income/diff/expense

        const filterData = (data, type) => {
            const filter = data.filter( (inv) => {
                if(type === inv.type) return inv;
            })

            const reduce = filter.reduce( (val, el) => {
                return val += +el.amount;
            }, 0)

            return reduce;
        }

        const income = filterData(data, true);
        const expense = filterData(data, false);
        const diff = income - expense;

        const html = `
            <span>Income: ${income}</span>
            <span>Difference: ${diff}</span>
            <span>Expense: ${expense}</span>
        `;

        const topStats = document.querySelector('#topStats');
        topStats.innerHTML = html;

    })();