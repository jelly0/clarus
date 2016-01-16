package uk.org.langstone.clarus.domain.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import io.jsonwebtoken.Claims;
import play.Logger;
import play.libs.Json;
import play.mvc.Http;
import uk.org.langstone.clarus.infrastructure.mail.EmailService;
import uk.org.langstone.clarus.infrastructure.security.authentication.Principal;
import uk.org.langstone.clarus.domain.project.model.ProjectMember;
import uk.org.langstone.clarus.domain.user.model.User;
import uk.org.langstone.clarus.domain.user.UserRepository;
import uk.org.langstone.clarus.domain.ServiceResult;
import uk.org.langstone.clarus.domain.project.model.Project;
import uk.org.langstone.clarus.domain.project.ProjectRepository;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

public class CreateProjectOperation {
    private static final Logger.ALogger LOG = Logger.of(CreateProjectOperation.class);

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Inject
    public CreateProjectOperation(ProjectRepository projectRepository,
                                  UserRepository userRepository,
                                  EmailService emailService) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public ServiceResult execute(JsonNode jsonRequest) {
        final Principal principal = (Principal) Http.Context.current().args.get(Principal.class.getName());
        final Project project = new Project();

        project.setTitle(jsonRequest.findPath("title").textValue());
        project.setProjectCode(jsonRequest.findPath("projectCode").textValue());
        project.setClient(jsonRequest.findPath("client").textValue());
        project.setSummary(jsonRequest.findPath("summary").textValue());
        project.setStatus(jsonRequest.findPath("status").textValue());
        project.setOwnerId(new Integer(principal.getSubject()));

        final List<ProjectMember> members = new ArrayList<>();
        for (JsonNode jsonMember : jsonRequest.findValue("members")) {
            final ProjectMember member = new ProjectMember();
            member.setEmail(jsonMember.findPath("email").textValue());
            member.setRole(ProjectMember.Role.MEMBER);

            final User user = userRepository.findUserByEmail(jsonMember.findPath("email").textValue());
            if (user != null) {
                member.setForename(user.getForename());
                member.setSurname(user.getSurname());
            }
            members.add(member);
        }

        final Claims claims = principal.getClaims();
        final ProjectMember ownerMember = new ProjectMember();

        ownerMember.setUserId(new Integer((String) claims.get("id")));
        ownerMember.setForename((String) claims.get("forename"));
        ownerMember.setSurname((String) claims.get("surname"));
        ownerMember.setEmail((String) claims.get("email"));
        ownerMember.setRole(ProjectMember.Role.OWNER);

        members.add(ownerMember);
        project.setMembers(members);

        final Project savedProject = projectRepository.set(project);
        return new ServiceResult(Json.toJson(savedProject));
    }
}
