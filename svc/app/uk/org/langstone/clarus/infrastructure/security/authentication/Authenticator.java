package uk.org.langstone.clarus.infrastructure.security.authentication;

public interface Authenticator {

    Principal validateToken(final String token);

    Principal authenticate(final String username, final String password);
}
