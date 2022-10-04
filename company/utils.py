from cryptography.fernet import Fernet


fernet_key = b'YDMimaEVL722izWNn7WnnGlEMf53P-r3rAhXh967G00='

def encrypt_string(link):
    fernet = Fernet(fernet_key)
    enc_link = fernet.encrypt(link.encode())
    return enc_link.decode('utf-8')

def decrypt_string(link):
    fernet = Fernet(fernet_key)

    encrypted_link = bytes(link, 'utf-8')
    return fernet.decrypt(encrypted_link).decode()