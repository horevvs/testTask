import './App.css';
import { useState } from 'react';

const date = new Date().toISOString().replace('-', '').split('T')[0].replace('-', '');
let pass = 'Valantis'
let md5 = require('md5');
let result = md5(pass + '_' + date)




function Header(props) {

  const [inputs, setInputs] = useState([])

  //функция только отправляет пост запрос, надо оправить пост запрос с фильтрацией и посмореть что будет
  // потом положить в основное состояние

  const sendmsg = () => {
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
      .then(resp => console.log(resp))





    console.log(inputs)
  }

  return (
    <div className='d-flex justify-content-evenly mt-3' >
      <button type="button" class="btn btn-danger">return list</button>
      <button type="button" class="btn btn-danger">Sort by name</button>
      <button type="button" class="btn btn-danger">Sort by brand</button>
      <div class="text_links_catalog">
        <input type="email" class="form-control" id="exampleFormControlInput1" onChange={(e) => setInputs(e.target.value)} placeholder="add price" />
      </div>
      <button onClick={sendmsg} type="button" class="btn btn-danger">Sort by price</button>
    </div>
  );
}

export default Header;
