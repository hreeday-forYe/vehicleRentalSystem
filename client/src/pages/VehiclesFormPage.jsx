import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import PhotosUploader from "../photosUploader";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
export default function VechiclesFormPage(){
  const {id} = useParams();
  console.log(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos,setAddedPhotos] = useState('');
  const [RentDate, setRentDate] = useState('');
  const [RentTill, setRentTill] = useState('');
  const[phoneNumber, setPhoneNumber] = useState('');
  const [redirect, setRedirect] =useState(false);
  const [price, setPrice] = useState(1200);
  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get('/vehicles/'+id).then(response =>{
      const {data} = response;
      setTitle(data.title);
      setDescription(data.description);
      setAddedPhotos(data.photos);
      setRentDate(data.RentDate);
      setRentTill(data.RentTill);
      setPhoneNumber(data.phoneNumber);
      setPrice(data.price);
    });
  },[id])
  function inputHeader(text){
    return (
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }
  function inputDescription(text){
    return(
      <p className="text-gray-400 text-sm">{text}</p>
    )
  }
  function preInput(header, description){
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  // our vehicles data
  const vehicleData = {
    id ,title, description,addedPhotos,phoneNumber,RentDate,RentTill,price
  }
  // adding new vehicles
  async function saveVehicle(ev){
    ev.preventDefault();
    if(id){
      // this part is the update
      await axios.put('/vehicles',{id, ...vehicleData});
      alert("Your vehicle was updated");
      setRedirect(true)
    }else{
      // new place
      await axios.post('/vehicles',vehicleData);
      alert("Your new vehicle was added successfully")
      setRedirect(true)
    }
  }
  

  if(redirect){
    return <Navigate to= {'/account/vehicles'}></Navigate>
  }

  return(<div>
    <AccountNav></AccountNav>
    <form onSubmit={saveVehicle} className="mx-12">
      {preInput('Title', 'Add title for your Car or Bike')}
      <input type="text" placeholder="Title: Your Car Brand and Model" value={title} onChange={ev =>setTitle(ev.target.value)} />

      {/* photo upload by link functionality */}
      {preInput('Photos', 'Add some photos for your Car or Bike')}
      <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}></PhotosUploader>
      {/* Description of the vehicle */}
      {preInput('Description', 'Add some Description for your Car or Bike like number plate, milege, color')}
      <textarea className=""  value={description} onChange={ev => setDescription(ev.target.value)} placeholder="Add the small description for your listing" />

      {/* Check in and out times */}
      {preInput('Rent Date and Rent Till', 'For how long you want to rent your vehicle')}
      <div className="grid gap-2 sm:grid-cols-3">
        <div>
          <h3>Rent Date</h3>
          <input type="date" value={RentDate} onChange={ev=> setRentDate(ev.target.value)} />
        </div>
        <div>
          <h3>Rent Till</h3>
          <input type="date" value={RentTill} onChange={ev=> setRentTill(ev.target.value)} />
        </div>
      </div>
      <div>
      {preInput('Phone Number', 'Add your contact info')}
      <input type="text" value={phoneNumber} onChange={ev=> setPhoneNumber(ev.target.value)} placeholder="9800001230" />
      </div>
      <div>
        {preInput('Price Per Day', "Add the desired price:")}
        <input type="number" value={price} onChange={ev=> setPrice(ev.target.value)} />
      </div>
      <div>
        <button className="primary my-4">Save</button>
      </div>
    </form>
  </div>)
}