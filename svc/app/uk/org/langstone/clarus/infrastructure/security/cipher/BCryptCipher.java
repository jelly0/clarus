package uk.org.langstone.clarus.infrastructure.security.cipher;

import uk.org.langstone.clarus.infrastructure.security.cipher.algorithm.BCrypt;

public class BCryptCipher implements Cipher {

    @Override
    public String hash(String plaintext) {
        return BCrypt.hashpw(plaintext, BCrypt.gensalt());
    }

    @Override
    public boolean verify(String plaintext, String hashed) {
        return BCrypt.checkpw(plaintext, hashed);
    }
}
