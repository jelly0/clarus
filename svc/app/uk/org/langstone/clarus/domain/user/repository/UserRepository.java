package uk.org.langstone.clarus.domain.user.repository;

import uk.org.langstone.clarus.domain.project.model.Project;
import uk.org.langstone.clarus.domain.user.model.User;

import java.util.List;

public interface UserRepository {
    User findUserByEmail(String email);

    List<Project> findProjectsForUser(Integer userId);

    void activate(User user);

    User set(User user);

    User get(Integer userId);

    List<User> getAll();

    void update(User user);

    void remove(User user);
}
