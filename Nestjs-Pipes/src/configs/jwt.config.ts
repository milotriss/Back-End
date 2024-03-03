export const jwtConfig = {
    global: true,
    secret: 'hello',
    signOptions: {
        expiresIn: '1000000000000000s'
    }
}