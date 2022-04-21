interface Id {
    name: string;
    value: string;
}

export interface DateOfBirth {
    date: string;
    age: number;
}

interface Coordinates {
    latitude: string;
    longitude: string;
}

interface Street {
    number: number;
    name: string;
}

interface Timezone {
    offset: string;
    description: string;
}

export interface Location {
    city: string;
    coordinates: Coordinates;
    country: string;
    postcode: number;
    state: string;
    street: Street;
    timezone: Timezone;
}

export interface Login {
    md5: string;
    password: string;
    salt: string;
    sha1: string;
    sha256: string;
    username: string;
    uuid: string;
}

interface Name {
    first: string;
    last: string;
    title: string;
}

interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}

interface Registered {
    age: number;
    date: string;
}

export interface User {
    id: Id;
    phone: string;
    dob: DateOfBirth;
    email: string;
    gender: string;
    location: Location;
    login: Login;
    name: Name;
    nat: string;
    phoneNumber: string;
    picture: Picture;
    registered: Registered;
}
