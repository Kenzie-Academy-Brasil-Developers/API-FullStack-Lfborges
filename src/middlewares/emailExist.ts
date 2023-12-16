import { NextFunction, Request, Response } from "express";
import { User } from '../entities/userEntities';
import { Repository } from "typeorm";
import { AppDataSource } from "data-source";

const checkEmailExist = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const existUser = await userRepository.findOne({where: {email}});

    if(existUser){
        return res.status(409).json({error: 'E-mail already in use'});
    }

    next();
}

export default checkEmailExist;