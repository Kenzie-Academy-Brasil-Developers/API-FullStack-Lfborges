import { Repository } from "typeorm";
import { SessionCreate, SessionReturn } from "interfaces/sessionInterface";
import User from "../entities/userEntities";
import { AppDataSource } from "dataSource";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dontenv/config";
import { ErrorApp } from "errors/errorApp";

const login = async (payload: SessionCreate): Promise<SessionReturn> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await repository.findOne({
        where:{
            email:payload.email,
        },
    });

    if(!user){
        throw new ErrorApp("Invalid creadencial", 401);
    }

    const password = await bcrypt.compare(
        payload.password,
        user.password
    );
    
    if(!password){
        throw new ErrorApp("Invalid creadencial", 401);
    }

    const token: string = jwt.sign(
        {userId: user.id, registrationDate: user. registration_date},
        process.env.SCRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
        }
    );

    return {token};
};

export default {login}