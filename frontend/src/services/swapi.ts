import { Planet } from './../models/planet';
import { PersonResponse } from './../models/person';
import { CustomError } from "../errors";
import { Person } from "../models/person";
import { Vehicle } from "../models/vehicle";
import { Specie } from '../models/specie';

const peopleURL:string='https://swapi.py4e.com/api/people';
const vehicleURL:string='https://swapi.py4e.com/api/vehicles'
const specieURL:string='https://swapi.py4e.com/api/species/';
const planetsURL:string='https://swapi.py4e.com/api/planets/'
export const getPersonResponse=async (page:number):Promise<PersonResponse>=>{
    try{
        const requestURL:string=`${peopleURL}/?page=${page}`;
        const response=await fetch(requestURL);
        const jsonResponse=await response.json();
        const people:Array<Person>=jsonResponse['results'].map((person:any):Person=>{
            return {
                id:person.url.split('/')[5],
                birth_year:person.birth_year,
                eye_color:person.eye_color,
                hair_color:person.hair_color,
                height:Number(person.height),
                homeworldID:person.homeworld?.split("/")[5],
                mass:Number(person.mass),
                name:person.name,
                skin_color:person.skin_color,
                vehiclesIDS:person.vehicles?.map((v:any)=>v.split("/")[5]),
                speciesIDS:person.species?.map((v:any)=>v.split("/")[5]),
                descriptor:""
            }
        })
        const peopleWithDescriptor:Array<Person>=await Promise.all(people.map(async person=>{
            const p:Person=person
            p.descriptor=await getDescriptor(p)
            return p
        }))

        return {
            prev:jsonResponse['previous'],
            next:jsonResponse['next'],
            people:peopleWithDescriptor
        }
    }catch(error:any){
        throw new CustomError({code:400,message:error.message})
    }
}

export const getVehicle=async (id:number):Promise<Vehicle>=>{
    try{
        const requestURL:string=`${vehicleURL}/${id}`;
        const response=await fetch(requestURL);
        const jsonResponse=await response.json();
        return {
            id:jsonResponse.url.split('/')[5],
            cargo_capacity:Number(jsonResponse.cargo_capacity),
            consumables:jsonResponse.consumables,
            cost_in_credits:Number(jsonResponse.cost_in_credits),
            crew:Number(jsonResponse.crew),
            length:Number(jsonResponse.length),
            manufacturer:jsonResponse.manufacturer,
            max_atmosphering_speed:Number(jsonResponse.max_atmosphering_speed),
            model:jsonResponse.model,
            passengers:Number(jsonResponse.passengers),
            vehicle_class:jsonResponse.vehicle_class,
            name:jsonResponse.name
        }
    }catch(error:any){
        throw new CustomError({code:400,message:error.message})
    }

}

export const getSpecie=async (id:number):Promise<Specie>=>{
    try{
        const requestURL:string=`${specieURL}/${id}`;
        const response=await fetch(requestURL);
        const jsonResponse=await response.json();
        return {
            id:jsonResponse.url.split('/')[5],
            classification:jsonResponse.classification,
            name:jsonResponse.name}
    }catch(error:any){
        throw new CustomError({code:400,message:error.message})
    }
}

export const getPlanet=async (id:number):Promise<Planet>=>{
    try{
        const requestURL:string=`${planetsURL}/${id}`;
        const response=await fetch(requestURL);
        const jsonResponse=await response.json();
        return {
            id:jsonResponse.url.split('/')[5],
            name:jsonResponse.name}
    }catch(error:any){
        throw new CustomError({code:400,message:error.message})
    }
}

export const getDescriptor=async (person:Person):Promise<string>=>{
    try{
        const specieIDS:Array<string>=person.speciesIDS
        const planet:Planet=await getPlanet(Number(person.homeworldID))
        const specie:Specie=await getSpecie(Number(specieIDS[0]))
        const label= `${specie.name} from ${planet.name}`
        return label
    }catch(error:any){
        console.log(error)
        return "Unreachable Description"
    }
}



export const fetchVehicles=async (ids:Array<string>):Promise<Array<Vehicle>>=>{
    try{
        const vehicles:Array<Vehicle>=[]
        for(let id of ids){
            vehicles.push(await getVehicle(Number(id)))
        }
        return vehicles
    }catch(error:any){
        console.log(error)
        return []
    }
}

export const fetchSpecies=async (ids:Array<string>):Promise<Array<Specie>>=>{
    try{
        const species:Array<Specie>=[]
        for(let id of ids){
            species.push(await getSpecie(Number(id)))
        }
        return species
    }catch(error:any){
        console.log(error)
        return []
    }
}

export const fetchSpeciesAndVehicles=async (person:Person):Promise<{person:Person,vehicles:Array<Vehicle>,species:Array<Specie>}>=>{
    try{
        const vehicles:Array<Vehicle>=await fetchVehicles(person.vehiclesIDS);
        const species:Array<Specie>=await fetchSpecies(person.speciesIDS);
    
        return {
            person,
            vehicles,
            species
        }
    }catch(error:any){
        return {
            person,
            vehicles:[],
            species:[]
        }
    }
}

