# Email & Password

User's can authenticate themselves with an email and a password.

During login, the server searches for users in the database who share the same email. If one is found, the (Todo: Password Encryption)
password included in the request is compared to the encrypted version in the database. If the passwords match, the user is said to be
authenticated.

# JSON Web Token (JWT)

JSON Web Tokens (JWT) are used so that clients aren't required to provide their email & password in each API request.

During initial authentication, the client sends an email & password to the server via in the 'login' or 'registration' API.

Once the server authenticates the client, it uses a private key to sign a JWT with the RS256 algorithm. 
The server sends the compactly serialized JWT to the client via the `GN-Access-Token` header.

```
GN-Access-Token: "eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAi..."
```

The client stores the value of `GN-Access-Token` to local storage.

One subsequent requests, the client checks if it's local storage has a token cached.
If it does, it sends the token to the server using the `Authorization` request header. 

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLA0KICJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJqb2UiLA0KICJleHAiOjEzMDA4MTkzODAsDQogImh0dHA6Ly9leGFtcGxlLmNvbS9pc19yb290Ijp0cnVlfQ.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
```

Upon receiving a request with an `Authorization` header, the server attempts to verify the included JWT.
If verification succeeds, the server performs whatever actions were requested by the client.

Before responding to the client, the server updates the expiration date of the JWT so that login-time is prolonged.
It then returns the updated JWT in the `GN-Access-Token` header.

※ The default expiration time of the JWT is 1 hour from time of creation.

Here is a diagram (taken from the Auth0 website) showing the JWT authentication flow.

<p><img src="/images/jwt-diagram.png" alt="JWT Diagram"/></p>

### JWT Format for User Authentication

| Key | Meaning                | Value                                   |
|-----|------------------------|-----------------------------------------|
| iss | Issuer of JWT          | api.get-native.com                      |
| sub | The subject of the JWT | The unique ID of the authenticated user |
| aud | The intended audience  | (The IP address / User Agent ?)         |
| exp | The expiration date    | 1 hour from last update                 |

```json
{
	"iss": "api.get-native.com",
	"sub": 123456,
	"aud": "136.61.59.52",
	"exp": "1483652706600"
}
```

### Usage of WWW-Authenticate header

If the client requests a protected resource without including an `Authorization` header, 
the server responds with a client error (4xx) status code and a `WWW-Authenticate` response header using the `Bearer` auth-scheme.

```
WWW-Authenticate: Bearer
```

### Logging in vs. Logging out

To login, you use the POST /account/login API endpoint. To logout, no API interaction is necessary.
By deleting the access token in the local storage, the client forfeits the ability to make authenticated requests.
