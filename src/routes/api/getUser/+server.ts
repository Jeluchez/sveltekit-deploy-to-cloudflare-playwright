import { json } from '@sveltejs/kit';
export interface User{
    name: string
    age: string
    email: string
}
export async function POST({ request }:any) {
	// const { a, b } = await request.json();
    const user = {
        name: 'Jose',
        age: '31',
        email:'jose@gmail.com'
    }
	return json(user);
}