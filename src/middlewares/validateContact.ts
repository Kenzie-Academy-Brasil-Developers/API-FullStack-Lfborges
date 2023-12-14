import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/userEntities';

const validateContactUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> =>{
    try{
        const {email, phone_number} = req.body;

        const userRepository = getRepository(User);

        const existUser = await userRepository.findOne({
            where:[{email}, {phone_number}],
        })

        if(existUser){
           if (existUser.email !== email && existUser.phone_number !== phone_number){
                throw new Error("Invalid email or phone for te existing contact.");
           }

           req.body.contact_email = existUser.email;
           req.body.contact_phone_number = existUser.phone_number;
        }else{
            req.body.contact_email = email;
            req.body.contact_phone_number = phone_number;
        }

        return next();
    }catch(error){
        return next(error);
    }
};

export default validateContactUser;