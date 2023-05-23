import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import PhotosUploader from "../photosUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
export default function VechiclesFormPage() {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1200);
  const [brand, setBrand] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/vehicles/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setPhone(data.phone);
      setPrice(data.price);
      setBrand(data.brand);
    });
  }, [id])
 
  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-gray-400 text-sm">{text}</p>
    )
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  // our vehicles data
  const vehicleData = {
    id, title, description, addedPhotos, phone, price, brand
  }
  // adding new vehicles
  async function saveVehicle(ev) {
    ev.preventDefault();
    if (id) {
      // this part is the update
      await axios.put('/vehicles', { id, ...vehicleData });
      alert("Your vehicle was updated");
      setRedirect(true)
    } else {
      // new place
      await axios.post('/vehicles', vehicleData);
      alert("Your new vehicle was added successfully")
      setRedirect(true)
    }
  }


  if (redirect) {
    return <Navigate to={'/account/vehicles'}></Navigate>
  }

  return (
    <div>
      <AccountNav></AccountNav>
      <form onSubmit={saveVehicle} className="mx-12">
        {preInput('Title', 'Add title for your Car or Bike')}
        <input type="text" placeholder="Title: Your Car Brand and Model" value={title} onChange={ev => setTitle(ev.target.value)} />
        {preInput('Brand', 'Add Brand New of your Vehicle')}
        <input type="text" placeholder="Brand: Your Car Brand Name" value={brand} onChange={ev => setBrand(ev.target.value)} />

        {/* photo upload by link functionality */}
        {preInput('Photos', 'Add some photos for your Car or Bike')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}></PhotosUploader>
        {/* Description of the vehicle */}
        {preInput('Description', 'Add some Description for your Car or Bike like number plate, milege, color')}
        <textarea className="" value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Add the small description for your listing" />

        {/*Phone NUmber  */}
        <div>
          {preInput('Phone Number', 'Add your contact info')}
          <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)} placeholder="9800001230" />
        </div>
        <div>
          {preInput('Price Per Day', "Add the desired price:")}
          <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} />
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
    )
}