package uk.org.langstone.clarus.infrastructure.module;

import com.google.inject.AbstractModule;
import uk.org.langstone.clarus.dal.jpa.Comment.CommentJpaRepository;
import uk.org.langstone.clarus.dal.jpa.meeting.MeetingJpaRepository;
import uk.org.langstone.clarus.dal.jpa.project.ProjectJpaRepository;
import uk.org.langstone.clarus.dal.jpa.user.UserJpaRepository;
import uk.org.langstone.clarus.domain.model.Comment.CommentRepository;
import uk.org.langstone.clarus.domain.model.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.model.project.ProjectRepository;
import uk.org.langstone.clarus.domain.model.user.UserRepository;

public class RepositoryModule extends AbstractModule {
    protected void configure() {

        bind(ProjectRepository.class).to(ProjectJpaRepository.class);
        bind(UserRepository.class).to(UserJpaRepository.class);
        bind(MeetingRepository.class).to(MeetingJpaRepository.class);
        bind(CommentRepository.class).to(CommentJpaRepository.class);
    }
}
