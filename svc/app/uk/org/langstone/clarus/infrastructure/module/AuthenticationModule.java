package uk.org.langstone.clarus.infrastructure.module;

import com.google.inject.AbstractModule;
import uk.org.langstone.clarus.infrastructure.security.authentication.Authenticator;
import uk.org.langstone.clarus.infrastructure.security.authentication.UserBearerDbAuthenticator;
import uk.org.langstone.clarus.infrastructure.security.cipher.BCryptCipher;
import uk.org.langstone.clarus.infrastructure.security.cipher.Cipher;

public class AuthenticationModule extends AbstractModule {
    protected void configure() {

        bind(Authenticator.class).to(UserBearerDbAuthenticator.class);
        bind(Cipher.class).to(BCryptCipher.class);
    }
}
