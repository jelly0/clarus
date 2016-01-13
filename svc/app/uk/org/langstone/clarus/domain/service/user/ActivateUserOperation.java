package uk.org.langstone.clarus.domain.service.user;

import uk.org.langstone.clarus.domain.model.user.User;
import uk.org.langstone.clarus.domain.model.user.UserRepository;
import uk.org.langstone.clarus.domain.service.ServiceResult;

import javax.inject.Inject;

public class ActivateUserOperation {

    private final UserRepository userRepository;

    @Inject
    public ActivateUserOperation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ServiceResult execute(final Integer userId, final String activationCode) {
        final User user = userRepository.get(userId);

        if (user == null) {
            return new ServiceResult(ServiceResult.Status.OP_ERROR, "User not found");
        } else if (user.isActivated()) {
            return new ServiceResult("User is already activated");
        } else if (user.getActivationKey().equals(activationCode)) {
            userRepository.activate(user);
            return (new ServiceResult(ServiceResult.Status.SUCCESS));
        } else {
            return new ServiceResult(ServiceResult.Status.OP_ERROR, "Activation code fo not match");
        }
    }
}