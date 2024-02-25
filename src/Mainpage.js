import { NavLink } from "react-router-dom"
import './App.css';
import Header from './Header';
import { useState, useEffect } from 'react';
let md5 = require('md5');

const date = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '');
let pass = 'Valantis'
let result = md5(pass + '_' + date)
let jsonObject;
let uniqueSet;
let uniqueArray;


function App() {
    const [state, setState] = useState([])
    const [inputs, setInputs] = useState([])
    useEffect(() => {
        try {
            fetch("http://api.valantis.store:40000/",
                {
                    method: 'POST',
                    headers: {
                        "X-Auth": result,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "action": "get_ids",
                        "params": { "offset": 0, "limit": 25 }
                    })
                }
            )
                .then(resp => resp.json())
                .then((response) => {
                    fetch("http://api.valantis.store:40000/",
                        {
                            method: 'POST',
                            headers: {
                                "X-Auth": result,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "action": "get_items",
                                "params": {
                                    "ids": response.result
                                }
                            })
                        }
                    )
                        .then(resp => resp.json())
                        .then((response) => {
                            jsonObject = response.result.map(JSON.stringify);
                            uniqueSet = new Set(jsonObject);
                            uniqueArray = Array.from(uniqueSet).map(JSON.parse);
                            console.log(uniqueArray)
                            setState(uniqueArray)
                        })
                })
        } catch (err) {
            console.error(err) // в консоль попадает сообщение об ошибке и стек ошибки
        }
    }, []);

    return (
        <div >
            <header className=''  >
                <Header inputs={inputs}/>
                <ul class="pagination d-flex justify-content-center m-4">
                    <li class="page-item"> <NavLink to="/" className='page-link'> 1 </NavLink> </li>
                    <li class="page-item"> <NavLink to="/pagination" className='page-link'> 2 </NavLink> </li>
                </ul>
                <div className='d-flex justify-content-evenly flex-wrap mt-2  '>
                    {state.map((item) => {
                        return (
                            <div key={item.id} className='card m-2 bg-secondary-subtle'>
                                <div className=' m-2'>
                                    {item.id}
                                </div>
                                <div className=' m-2'>
                                    бренд:   {item.brand}
                                </div>
                                <div className=' m-2'>
                                    цена: {item.price}
                                </div>
                                <div className=' m-2'>
                                    Наименование: {item.product}
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </header>
        </div>
    );
}

export default App;
