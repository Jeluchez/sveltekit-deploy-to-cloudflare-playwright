async function getPosts() {
    const response = await fetch("/api/getPosts", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
    });
    if (response.ok) {
        const data = await response.json();
        return data.slice(1, 10);
    
    } else {
        console.error("Error fetching posts:", response.statusText);
    }
}
