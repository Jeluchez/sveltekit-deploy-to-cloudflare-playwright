<script lang="ts">
    import { onMount } from "svelte";
    import type { User } from "./api/getUser/+server";

    let user: User | null = null;
    let loading = false;
    let posts: any[] = [];
    async function getUser() {
        loading = true;
        const response = await fetch("/api/getUser", {
            method: "POST",
            body: JSON.stringify({}),
            headers: {
                "content-type": "application/json",
            },
        });
        user = await response.json();
        loading = false;
    }
    async function getPosts() {
        const response = await fetch("/api/getPosts", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            posts = data.slice(1, 10);
            console.log("POSTS");

            console.log(posts);
        } else {
            console.error("Error fetching posts:", response.statusText);
        }
    }

    onMount(() => {
        getUser();
        getPosts();
    });
</script>

{#if loading}
    <p>...loading</p>
{:else}
    <div class="container">
        <div>
            <p>Nombre</p>
            <span>{user?.name}</span>
            <p>Edad</p>
            <span>{user?.age}</span>
            <p>Email</p>
            <span>{user?.email}</span>
        </div>
        <h2>Posts</h2>
        <div class="list">
            {#each posts as { title }}
                <div class="item">
                    <p>Titulo</p>
                    <span>{title}</span>
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .item {
        margin: 40px;
        flex-shrink: 0;
        flex-basis: 400px;
    }
</style>
