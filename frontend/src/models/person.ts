
export type Person={
    id:string,
    birth_year:string,
    eye_color:string,
    hair_color:string,
    height:number,
    homeworldID:string,
    mass:number,
    name:string,
    skin_color:string,
    vehiclesIDS:Array<string>,
    speciesIDS:Array<string>,
    descriptor:string
}

export type PersonResponse={
    next?:string,
    prev?:string,
    people:Array<Person>
}