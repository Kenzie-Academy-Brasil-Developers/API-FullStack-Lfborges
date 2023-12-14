import { Repository } from "typeorm";
import { ContactCreate, ContactRead, ContactReturn, ContactUpdate } from "interfaces/contactInterface";
import Contact from "../entities/contactEntities";
import { AppDataSource } from "dataSource";
import { contactReadSchema, contactReturnSchema } from "../schemas/contactSchema";

const createContact = async (payload: ContactCreate): Promise<ContactReturn> => {
    try{
        const {email, phone_number} = payload;

        if (!email && !phone_number){
            throw new Error("Email or Phone Number is riquired for adding a contact");
        }

        const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

        const createContact: Contact = repository.create({
            full_name: payload.full_name || 'Contato sem Nome',
            email: email,
            phone_number: phone_number,
            registration_date: new Date().toISOString(),
        });

        await repository.save(createContact);

        const result: ContactReturn = contactReturnSchema.parse(createContact);

        return result;

    } catch(error){
        throw error;
    }
};

const readContacts = async  (): Promise<ContactRead> =>{
    const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

    const contacts: Contact[] = await repository.find();

    const result: ContactRead = contactReadSchema.parse(contacts);

    return result;
}

const updateContact = async (id: number, payload: ContactUpdate): Promise<ContactReturn> => {
    const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

    const foundContact: Contact | null = await repository.findOne({
        where: {
            id:id,
        },
    });
    const contact: Contact = repository.create({
        ...foundContact,
        ...payload,
    })

    await repository.save(contact);

    const result: ContactReturn = contactReturnSchema.parse(contact);

    return result;
}

const destroyContact = async (id: number): Promise<void> => {
    const repository: Repository<Contact> = AppDataSource.getRepository(Contact);

    const contact: Contact | null = await repository.findOne({
        where:{
            id:id,
        },
    })
    await repository.softRemove(contact!);
}

export default {createContact, readContacts, updateContact, destroyContact}