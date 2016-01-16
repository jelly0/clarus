package uk.org.langstone.clarus.infrastructure.module;

import com.google.inject.AbstractModule;
import uk.org.langstone.clarus.dal.Comment.CommentJpaRepository;
import uk.org.langstone.clarus.dal.meeting.MeetingJpaRepository;
import uk.org.langstone.clarus.dal.project.ProjectJpaRepository;
import uk.org.langstone.clarus.dal.user.UserJpaRepository;
import uk.org.langstone.clarus.domain.comment.CommentRepository;
import uk.org.langstone.clarus.domain.meeting.MeetingRepository;
import uk.org.langstone.clarus.domain.project.ProjectRepository;
import uk.org.langstone.clarus.domain.user.UserRepository;

public class RepositoryModule extends AbstractModule {
    protected void configure() {

        bind(ProjectRepository.class).to(ProjectJpaRepository.class);
        bind(UserRepository.class).to(UserJpaRepository.class);
        bind(MeetingRepository.class).to(MeetingJpaRepository.class);
        bind(CommentRepository.class).to(CommentJpaRepository.class);
    }
}
