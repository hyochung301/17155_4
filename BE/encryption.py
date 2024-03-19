# import cipher

def encrypt(inputText, N = 3, D = 1):
    if N < 1 or (D != 1 and D != -1):
        return "Invalid N or D"
    
    reversedText = inputText[::-1]
    encryptedText = ""

    for char in reversedText:
        if char == " " or char == "!":
            encryptedText += char
        else:
            ascii_offset = 34  # ASCII printable characters start from 34
            encryptedText += chr((ord(char) - ascii_offset + (N * D)) % 93 + ascii_offset)  # 93 is the number of ASCII printable characters from 34 to 126

    return encryptedText

def decrypt(encryptedText, N, D):
    if N < 1 or (D != 1 and D != -1):
        return "Invalid N or D"
    
    decryptedText = ""

    for char in encryptedText:
        if char == " " or char == "!":
            decryptedText += char
        else:
            ascii_offset = 34  # ASCII printable characters start from 34
            decryptedText += chr((ord(char) - ascii_offset - N * D) % 93 + ascii_offset)  # 93 is the number of ASCII printable characters from 34 to 126

    return decryptedText[::-1]


def test(filename):
    # read file and store the ID and passwords
    # Peter !! we will need to change the format of this data for it to work with mongoDB. Should have each user be a seperate dictonary and each user data value be its own name:data pair
    table = {
        "asamant": "Temp123",
        "aissa": "TheKing%^&",
        "bjha": "$72messenger",
        "skharel": "Life15$",
        "Ally!": "God$12"
    }

    userIDs = []
    passwords = []
    with open(filename, 'r') as file:
        for line in file:
            userID, password = line.strip().split(' ')
            userIDs.append(userID)
            passwords.append(password)

    for i in range(len(userIDs)):
        encrypt_id = userIDs[i]
        encrypt_pw = passwords[i]
        s = 3
        d = 1
        decrypted_id = decrypt(encrypt_id, s, d)
        decrypted_pw = decrypt(encrypt_pw, s, d)

        if decrypted_id in table:
            if table[decrypted_id] == decrypted_pw:
                print(f"{decrypted_id} and password are in the table.")
            else:
                print(f"{decrypted_id}'s password does not match.")
        else:
            print(f"{decrypted_id} does not meet the requirements of a userID.")
    

        
    
def main():
    #1. Which of the userid and password combination(s) in the table above are present in the database?
    # asamant and skharel has id and pw in the table
    #2. Which userid(s) is/are present in the database, but the password does not match the password(s) in the table above?
    # aissa and bjha ids are in the table but pw different
    #3. Which userid(s) do/does not meet the requirements of a userid
    # Ally! does not meet the requirement
    test("database.txt")

    #print(encrypt("Ally!", 3, 1))

if __name__ == "__main__":
    main()