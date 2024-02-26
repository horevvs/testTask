import { NavLink } from "react-router-dom"
import './App.css';
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
    const [firststate, setfirstState] = useState([])
    const [inputs, setInputs] = useState([])
    const [inputs2, setInputs2] = useState([])
    const [inputsProduct, setinputsProduct] = useState([])

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
                        "params": { "offset": 25, "limit": 25 }
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
                            setfirstState(uniqueArray)
                        })
                })
        } catch (err) {
            console.error(err) // в консоль попадает сообщение об ошибке и стек ошибки
        }
    }, []);

    // Возвращает первоначальный список
    const Returnlist = () => {
        setState(firststate)
    }

    // Фильтрация по спискау брендов
    const SortBrand = () => {
        setState(state.filter(item => { return item.brand === inputs2 }))
    }

    // Фильтрация по спискау брендов
    const SorbytName = () => {
        setState(state.filter(item => { return item.product === inputsProduct }))
        
    }


    // Возвращает с апи все по одной цене
    const SortByPrice = () => {
        fetch("http://api.valantis.store:40000/",
            {
                method: 'POST',
                headers: {
                    "X-Auth": result,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "action": "filter",
                    "params": { "price": parseInt(inputs) }
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
                            "params": { "ids": response.result }
                        })
                    }
                )
                    .then(resp => resp.json())
                    .then(resp => {
                        setState(resp.result)
                    })
            })
    }

    return (
        <div >
            <div className='d-flex justify-content-evenly mt-3' >
                <button onClick={Returnlist} type="button" className="btn btn-danger">Return list</button>
                <div className="text_links_catalog">
                    <input type="email" className="form-control text_links_catalog" id="exampleFormControlInput1" onChange={(e) =>  {setinputsProduct(e.target.value)   }} placeholder="add brand" />
                </div>
                <button onClick={SorbytName} type="button" className="btn btn-danger">Sort by name</button>
                <div className="text_links_catalog">
                    <input type="email" className="form-control text_links_catalog" id="exampleFormControlInput1" onChange={(e) => setInputs2(e.target.value)} placeholder="add brand" />
                </div>
                <button onClick={SortBrand} type="button" className="btn btn-danger">Sort by brand</button>
                <div className="text_links_catalog">
                    <input type="email" className="form-control text_links_catalog" id="exampleFormControlInput1" onChange={(e) => setInputs(e.target.value)} placeholder="add price" />
                </div>
                <button onClick={SortByPrice} type="button" className="btn btn-danger">Sort by price</button>
            </div>

            <ul className="pagination d-flex justify-content-center m-4">
                <li className="page-item"> <NavLink to="/" className='page-link'> 1 </NavLink> </li>
                <li className="page-item"> <NavLink to="/pagination" className='page-link'> 2 </NavLink> </li>
            </ul>

            <div className='d-flex justify-content-evenly flex-wrap mt-2  '>
                {state.map((item) => {
                    return (
                        <div key={item.id} className='card m-2 bg-secondary-subtle'>
                            <div className='m-2'> {item.id} </div>
                            <div className='m-2'> бренд:{item.brand}</div>
                            <div className='m-2'> цена: {item.price}</div>
                            <div className='m-2'>Наименование: {item.product}</div>
                        </div>
                    )
                })
                }
            </div>
        </div >
    );
}

export default App;



// import { NavLink } from "react-router-dom"
// import './App.css';
// import Header from './Header';
// import { useState, useEffect } from 'react';

// let md5 = require('md5');
// const date = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '');
// let pass = 'Valantis'
// let result = md5(pass + '_' + date)

// let jsonObject;
// let uniqueSet;
// let uniqueArray;


// function App() {
//   const [state, setState] = useState([])
//   useEffect(() => {
//     try {
//       fetch("http://api.valantis.store:40000/",
//         {
//           method: 'POST',
//           headers: {
//             "X-Auth": result,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             "action": "get_ids",
//             "params": { "offset": 25, "limit": 25 }
//           })
//         }
//       )
//         .then(resp => resp.json())
//         .then((response) => {
//           fetch("http://api.valantis.store:40000/",
//             {
//               method: 'POST',
//               headers: {
//                 "X-Auth": result,
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 "action": "get_items",
//                 "params": {
//                   "ids": response.result
//                 }
//               })
//             }
//           )
//             .then(resp => resp.json())
//             .then((response) => {
//               jsonObject = response.result.map(JSON.stringify);
//               uniqueSet = new Set(jsonObject);
//               uniqueArray = Array.from(uniqueSet).map(JSON.parse);
//               console.log(uniqueArray)
//               setState(uniqueArray)
//             })
//         })
//     } catch (err) {
//       console.error(err) // в консоль попадает сообщение об ошибке и стек ошибки
//     }
//   }, []);

//   return (
//     <div >
//       <header className=''  >
//         {/* <Header /> */}

//         <ul class="pagination d-flex justify-content-center m-4">
//           <li class="page-item bg-primary-subtle"><NavLink to="/" className='page-link'> 1 </NavLink></li>
//           <li class="page-item"><NavLink to="/pagination" className='page-link'> 2 </NavLink></li>
//         </ul>

//         <div className='d-flex justify-content-evenly flex-wrap mt-2  '>
//           {state.map((item) => {
//             return (
//               <div key={item.id} className='card m-2 bg-secondary-subtle'>
//                 <div className=' m-2'>
//                   {item.id}
//                 </div>
//                 <div className=' m-2'>
//                   бренд:   {item.brand}
//                 </div>
//                 <div className=' m-2'>
//                   цена: {item.price}
//                 </div>
//                 <div className=' m-2'>
//                   Наименование: {item.product}
//                 </div>
//               </div>
//             )
//           })
//           }
//         </div>

//       </header>
//     </div>
//   );
// }

// export default App;
