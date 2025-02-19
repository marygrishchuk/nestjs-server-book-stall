import { ApiProperty } from "@nestjs/swagger";

export class AccessTokenPayload {
    @ApiProperty()
    accessToken: string;
}
export class LoginPayload {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
export const allUsersExample = [
    {
        id: 1,
        createdAt: "2025-01-21T23:10:15.215Z",
        updatedAt: "2025-01-22T02:21:54.381Z",
        name: "user",
        email: "user@gmail.com",
        age: 30,
        passwordHash: "$2b$10$UXnm.dg3crHznu5ulhFOgeh13eC//Ft3xgHInCwKhYxRJr1byekwm"
    },
]

export const badCreateUserRequestResponseExample = {
    message: [
        "email must be an email",
        "age must not be greater than 120",
        "age must not be less than 1"
    ],
    error: "Bad Request",
    statusCode: 400
}

export const badCreateBookRequestResponseExample = {
    "message": [
        "ageRestriction must not be greater than 120"
    ],
    "error": "Bad Request",
    "statusCode": 400
}