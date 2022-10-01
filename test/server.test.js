describe("/users/", () => {
    test("'login' should return { status: 200 }", async () => {
        await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: 'admin' })
        })
            .then(res => expect(res.status).toBe(200))
        return
    });
});

describe("/users/", () => {
    test("'login' should countain { token } property", async () => {
        await fetch("http://localhost:3000/users/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: 'admin', password: 'admin' })
        })
            .then(async (res) => {
                const body = await res.json()
                expect(body).toHaveProperty('token')
            })
        return
    });
});

