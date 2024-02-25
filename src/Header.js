import './App.css';
function Header() {

  return (
    <div className='d-flex justify-content-evenly mt-3' >
      <button type="button" class="btn btn-danger">return list</button>
      <button type="button" class="btn btn-danger">Sort by name</button>
      <button type="button" class="btn btn-danger">Sort by brand</button>
      <div class="text_links_catalog">
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="add price" />
      </div>
      <button type="button" class="btn btn-danger">Sort by price</button>
    </div>
  );
}

export default Header;
