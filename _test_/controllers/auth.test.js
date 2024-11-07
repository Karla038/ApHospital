// __tests__/auth.test.js

const { crearUsuario, loginUsuario, actualizarUsuario } = require('../../controllers/auth');
const User = require('../../models/User');
const Especialidad = require('../../models/Especialidad');
const Suscripcion = require('../../models/Suscripcion');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../../helpers/jwt');

// Mocking dependencies
jest.mock('../../models/User');
jest.mock('../../models/Especialidad');
jest.mock('../../models/Suscripcion');
jest.mock('bcrypt');
jest.mock('../../helpers/jwt');

describe('Auth Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('crearUsuario', () => {
        it('should return 400 if email already exists', async () => {
            User.findOne.mockResolvedValueOnce({ email: 'karladk038@gmail.com' });

            const req = { body: { email: 'karladk038@gmail.com', password: 'karladk038@gmail.com' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await crearUsuario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                ok: false,
                msg: 'Correo electronico ya existe',
            });
        });

        it('should create a new user if email does not exist', async () => {
            User.findOne.mockResolvedValueOnce(null);
            Especialidad.findById.mockResolvedValueOnce({ _id: '652af985f9ff24fa7ebaa896', name: 'Cardiología Intervencionista' });
            Suscripcion.findById.mockResolvedValueOnce({ _id: '456', name: 'Suscripción Básica' });
            User.prototype.save = jest.fn().mockResolvedValueOnce({
                _id: '652af985f9ff24fa7ebaa896',
                email: 'karladk038@gmail.com',
                role: 'DOCTOR',
                especialidad: '652af985f9ff24fa7ebaa896',
             });
            bcrypt.genSaltSync.mockReturnValue('salt');
            bcrypt.hashSync.mockReturnValue('hashed_password');
            generarJWT.mockResolvedValueOnce('fake-jwt');
        
            const req = {
                body: {
                    email: 'karladk038@gmail.com',
                    password: 'karladk038@gmail.com',
                    role: 'DOCTOR',
                    especialidad: '652af985f9ff24fa7ebaa896' // Aquí usamos el ObjectId
                }
            };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            await crearUsuario(req, res);
        
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                ok: true,
                msg: 'El usuario se creo con exito',
                data: 'fake-jwt',
            }));
        });
    });

    describe('loginUsuario', () => {
        it('should return 400 if email does not exist', async () => {
            User.findOne.mockResolvedValueOnce(null);

            const req = { body: { email: 'nonexistent@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await loginUsuario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                ok: false,
                msg: 'Correo electronico o contraseña incorrectos',
            });
        });

        it('should return 400 if password is invalid', async () => {
            User.findOne.mockResolvedValueOnce({ email: 'user@example.com', password: 'hashed_password' });
            bcrypt.compareSync.mockReturnValueOnce(false);

            const req = { body: { email: 'user@example.com', password: 'wrongpassword' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await loginUsuario(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                ok: false,
                msg: 'Contraseña invalida',
            });
        });

        it('should log in successfully with correct email and password', async () => {
            // Mockear las dependencias y el usuario
            User.findOne.mockResolvedValueOnce({
                email: 'user@example.com',
                password: 'hashed_password',
                save: jest.fn().mockResolvedValueOnce({})
            });
            bcrypt.compareSync.mockReturnValueOnce(true); // Contraseña válida
            generarJWT.mockResolvedValueOnce('fake-jwt'); // Generar un JWT falso
        
            // Configurar req y res
            const req = { body: { email: 'user@example.com', password: 'password123' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Ejecutar el controlador
            await loginUsuario(req, res);
        
            // Verificar que el código de estado sea 200
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                ok: true,
                msg: 'Hemos enviado un email con tu codigo de verificacion',
            }));
        });        
    });
});
