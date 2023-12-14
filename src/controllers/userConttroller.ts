import { Request, Response } from "express";
import { userService } from "../services";
import { UserCreate, UserRead, UserReturn, UserUpdate } from "interfaces/userInterface";
import { ContactCreate, ContactReturn } from "interfaces/contactInterface";

const create = async (req: Request, res: Response): Promise<Response> => {
    const payload: UserCreate = req.body;
    const user: UserReturn = await userService.createUser(payload);
    return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
    const users: UserRead = await userService.readUsers();
    return res.status(200).json(users);
};

const update = async(req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.userId);
    const payload: UserUpdate = req.body;
    const updatedUser: UserReturn = await userService.updateUser(id, payload);
    return res.status(200).json(updatedUser);
}

const destroy = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.userId);
    await userService.destroyUser(id);
    return res.status(204).send();
}

const addContact = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = Number(req.params.userId);
    const payload: ContactCreate = req.body;
    const newContact: ContactReturn = await userService.addContact(userId, payload);
    return res.status(201).json(newContact);
}

const removeContact = async (req: Request, res: Response): Promise<void> => {
    const userId: number = Number(req.params.userId);
    const contactId: number = parseInt(req.params.contactId, 10);
    const result = await userService.removeContact(userId, contactId);
    if(result === null){
        res.status(404).json({message: 'Contact not found'});
    }else{
        res.status(204).json(result);
    }

};


export {create, read, update, destroy, addContact, removeContact}
