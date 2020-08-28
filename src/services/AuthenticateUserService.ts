import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUsersService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // Primeiro parâmetro: payload. Fica dentro do token, criptografado mas não seguro. Qualquer um conseguiria ver
        // Segundo parâmetro: chave secreta que só a aplicação conhece.
        // Terceiro parâmetro é objeto com configurações do token:
        //      subject: ID do usuário
        //      expiresIn: Quanto tempo o token vai durar. Nunca usar 999d na aplicação web.
        //                 Se for querer que o usuário fique logado pra sempre, usar estratégias de refresh token

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUsersService;
