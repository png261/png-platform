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
