export function configureFakeBackend () {
    const users = [
      {
        id: 1,
        username: 'test',
        password: 'test',
        firstName: 'Test',
        lastName: 'User'
      }
    ]
    const currentFetch = window.fetch
    window.fetch = function (url, opts) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
            const params = JSON.parse(opts.body)

            const filteredUsers = users.filter(user => {
              return (
                user.username === params.username &&
                user.password === params.password
              )
            })

            if (filteredUsers.length) {
              const user = filteredUsers[0]
              const responseJson = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
              }
              resolve({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(responseJson))
              })
            } else {
              reject('Неверный логин или пароль')
            }

            return
          }

          if (url.endsWith('/users') && opts.method === 'GET') {
            if (
              opts.headers &&
              opts.headers.Authorization === 'Bearer fake-jwt-token'
            ) {
              resolve({
                ok: true,
                text: () => Promise.resolve(JSON.stringify(users))
              })
            } else {
              reject('Неавторизован')
            }

            return
          }

          currentFetch(url, opts).then(response => resolve(response))
        }, 500)
      })
    }
  }
