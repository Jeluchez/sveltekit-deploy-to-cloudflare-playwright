import { json } from '@sveltejs/kit';
export async function POST({ request }: any) {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const res = await fetch(url)
    const data = await res.json();
    return json(data);
}