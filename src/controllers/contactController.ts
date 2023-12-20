import { Response, Request } from "express";
import { contactService } from "../services";
import { ContactCreate, ContactRead, ContactReturn, ContactUpdate } from "../interfaces/contactInterface";

const create = async (req: Request, res: Response): Promise<Response> => {
    const payload: ContactCreate = req.body;
    const contact: ContactReturn = await contactService.createContact(payload);
    return res.status(201).json(contact);
}

const read = async (req: Request, res: Response): Promise<Response> => {
    const payload: ContactRead = await contactService.readContacts();
    return res.status(200).json(payload);
}

const update = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.contactId);
    const payload: ContactUpdate = req.body;
    const updatedContact: ContactReturn = await contactService.updateContact(id, payload);
    return res.status(200).json(updatedContact);
} 

const destroy = async (req: Request, res: Response): Promise<Response> => {
    const id: number = Number(req.params.contactId);
    await contactService.destroyContact(id);
    return res.status(204).send();
}

export {create, read, update, destroy}