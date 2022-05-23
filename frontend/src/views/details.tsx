import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { Loading } from "../components/Loading";
import { PersonDetails, VehiclesDetail } from "../components/PersonDetails";
import { useData } from "../context";
import { Person } from "../models/person";
import { Vehicle } from "../models/vehicle";
import { fetchVehicles } from "../services/swapi";

export const DetailPerson=():JSX.Element|null=> {
    const [vehicles,setVehicles]=useState<Array<Vehicle>>([]);
    const [loading,setLoading]=useState<boolean>(false);
    const {data}=useData()
    const params=useParams();
    const navigate=useNavigate();
    const persons:Array<Person>=data;
    const person:Person|undefined=persons.find(person=>person.id===params.personId);


    useEffect(()=>{
       
        if(person){
            setLoading(true);
            fetchVehicles(person.vehiclesIDS).then((vehicles)=>{
                setVehicles(vehicles);
                setLoading(false);
            }).catch(error=>{
                console.log(error);
                setLoading(false);
            })
        }
    },[params])


    
    

    return (
        <>
        <AppBar title={person?.name||"No Name"} onPrevClick={()=>{navigate("/")}}/>
        <Loading loading={loading}></Loading>
        {(person&&!loading)?<PersonDetails person={person} />:null}
        {(vehicles&&!loading)?<VehiclesDetail vehicles={vehicles} />:null}
        </>
        
    )
}