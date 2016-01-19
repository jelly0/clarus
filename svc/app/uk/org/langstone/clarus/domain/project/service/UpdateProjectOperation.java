package uk.org.langstone.clarus.domain.project.service;

import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import play.libs.Json;
import uk.org.langstone.clarus.domain.ServiceResult;
import uk.org.langstone.clarus.domain.project.ProjectRepository;
import uk.org.langstone.clarus.domain.project.model.Project;
import uk.org.langstone.clarus.infrastructure.mail.EmailService;

import javax.inject.Inject;

public class UpdateProjectOperation {
    private static final Logger.ALogger LOG = Logger.of(UpdateProjectOperation.class);

    private final ProjectRepository projectRepository;
    private final EmailService emailService;


    @Inject
    public UpdateProjectOperation(ProjectRepository projectRepository,
                                  EmailService emailService) {
        this.projectRepository = projectRepository;
        this.emailService = emailService;
    }

    public ServiceResult execute(JsonNode jsonRequest) {
        final Project project = Json.fromJson(jsonRequest, Project.class);
        final Project updatedProject = projectRepository.update(project);

        // TODO email new project members


        return new ServiceResult(Json.toJson(updatedProject));
    }
}
