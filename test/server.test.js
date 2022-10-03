describe('/users/', () => {
  test("'login' should return { status: 422 } when not sending { username } param", async () => {
    await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: 'admin' })
    })
      .then(res => expect(res.status).toBe(422))
  })
  test("'login' should return { status: 422 } when not sending { password } param", async () => {
    await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'admin' })
    })
      .then(res => expect(res.status).toBe(422))
  })
  test("'login' should return { status: 401 } when incorrect 'password' or 'username'", async () => {
    await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'admin', password: '123' })
    })
      .then(res => expect(res.status).toBe(401))
  })
  test("'login' should return { status: 200 }", async () => {
    await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'admin', password: 'admin' })
    })
      .then(res => expect(res.status).toBe(200))
  })
  test("'login' should countain { token } property", async () => {
    await fetch('http://localhost:3000/users/login', {
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
  })
})
