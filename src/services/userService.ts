import { Repository } from "typeorm";
import { UserCreate, UserUpdate, UserReturn } from "interfaces/userInterface";
import User from "../entities/userEntities";
import { AppDataSource } from "../data-source";
import { userReadSchema, userReturnSchema } from "../schemas/userSchema";
import { Contact } from "../entities";
import { ContactCreate } from "../interfaces/contactInterface";

const createUser = async (payload: UserCreate): Promise<UserReturn> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const createUser: User = repository.create({...payload, contacts: []});
    console.log(createUser);

    await repository.save(createUser);

    const result: UserReturn = userReturnSchema.parse(createUser);

    return result;
};

const readUsers = async (): Promise<UserReturn[]> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepository.find({relations: ["contacts"]});

    const result: UserReturn[] = userReadSchema.parse(users);

    return result;
}

const updateUser = async (
    id: number,
    payload: UserUpdate
): Promise<UserReturn> => {
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const foundUser: User | null = await repository.findOne({
        where: {
            id: id,
        }, relations:{contacts: true}
    });
    const user: User = repository.create({
        ...foundUser,
        ...payload,
    });
    console.log(user);
    
    await repository.save(user);

    const result: UserReturn = userReturnSchema.parse(user);
    return result;
};

const destroyUser = async (id: number): Promise<void> =>{
    const repository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await repository.findOne({
        where:{
            id:id,
        },
    });
    await repository.softRemove(user!);
};

const addContact = async(
    userId: number,
    payload: ContactCreate
): Promise<UserReturn> =>{
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);

    const user: User | null = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contacts")
    .where("user.id = :userid", {userId})
    .getOne();

    if(!user){
        return {} as UserReturn;
    }

    const newContact = new Contact();
    newContact.full_name = payload.full_name;
    newContact.email = payload.email;
    newContact.phone_number = payload.phone_number;

    user.contacts.push(newContact);

    await contactRepository.save(newContact);
    await userRepository.save(user);

    const result: UserReturn = userReturnSchema.parse(user);

    return result;
};

const removeContact = async(
    userId: number,
    contactId: number
): Promise<UserReturn | null> =>{
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.contacts", "contacts")
    .where("user.id = :userid", {userId})
    .getOne();

    if(!user){
        return null;
    }

    const contactRemoveIndex = user.contacts.findIndex(
        (contact) => contact.id === contactId
    );
    
    if(contactRemoveIndex === -1){
        return null;
    }

    user.contacts.splice(contactRemoveIndex, 1);

    await userRepository.save(user);

    const formattedContacts = user.contacts.map((contact) =>({
        id: contact.id,
        full_name: contact.full_name,
        email: contact.email,
        phone_number: contact.phone_number,
        registration_date: contact.registration_date,
        delete_date: contact.delete_date,
    }));

    const result: UserReturn = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        registration_date: user.registration_date,
        delete_date: user.delete_date,
        contacts: formattedContacts,
    };

    return result;
}

export default { createUser, readUsers, updateUser, destroyUser, addContact, removeContact };

