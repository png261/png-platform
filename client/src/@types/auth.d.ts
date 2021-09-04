interface User {
    _id: string;
    email: string;
    username: string;
    createdAt: string;
}

interface Account {
    email: string;
    password: string;
}

interface NewAccount {
    email: string;
    username: string;
    password: string;
}

interface UpdateAccount {
    newPassword?: string;
    newUsername: string;
}
