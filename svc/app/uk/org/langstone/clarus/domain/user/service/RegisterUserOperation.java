package uk.org.langstone.clarus.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.ServiceResult;
import uk.org.langstone.clarus.domain.user.model.User;
import uk.org.langstone.clarus.domain.user.UserRepository;
import uk.org.langstone.clarus.infrastructure.mail.EmailService;
import uk.org.langstone.clarus.infrastructure.security.cipher.BCryptCipher;
import uk.org.langstone.clarus.infrastructure.util.RandomKeyGenerator;
import uk.org.langstone.clarus.infrastructure.util.RequestUtil;

import javax.inject.Inject;

public class RegisterUserOperation {
    private static final Logger.ALogger LOG = Logger.of(RegisterUserOperation.class);

    private final UserRepository repository;
    private final BCryptCipher cipher;
    private final RandomKeyGenerator randomKeyGenerator;
    private final EmailService emailService;
    private final RequestUtil requestUtil;

    @Inject
    public RegisterUserOperation(UserRepository repository,
                                 BCryptCipher cipher,
                                 RandomKeyGenerator randomKeyGenerator,
                                 EmailService emailService,
                                 RequestUtil requestUtil) {
        this.repository = repository;
        this.cipher = cipher;
        this.randomKeyGenerator = randomKeyGenerator;
        this.emailService = emailService;
        this.requestUtil = requestUtil;
    }

    public ServiceResult execute(JsonNode jsonRequest) {
        final User existingUser = repository.findUserByEmail(jsonRequest.findPath("email").textValue());
        if (existingUser != null) {
            return new ServiceResult(ServiceResult.Status.OP_ERROR);
        } else {
            final User user = Json.fromJson(jsonRequest, User.class);

            user.setPassword(cipher.hash(jsonRequest.findPath("password").textValue()));
            user.setActivated(false);
            user.setActivationKey(randomKeyGenerator.generate());
            user.setRole(User.Role.USER);

            repository.set(user);

            emailService.sendEmail(user.getEmail(), "Please activate your account",
                    views.html.mailtemplates.userActivation.render(user, requestUtil.getBaseUrl()).toString());

            return new ServiceResult(jsonRequest);
        }
    }
}
