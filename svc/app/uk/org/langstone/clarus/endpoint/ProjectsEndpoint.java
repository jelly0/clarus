package uk.org.langstone.clarus.endpoint;

import play.Logger;
import play.db.jpa.Transactional;
import play.mvc.Result;
import uk.org.langstone.clarus.domain.meeting.service.MeetingService;
import uk.org.langstone.clarus.domain.project.service.ProjectService;

import javax.inject.Inject;

public class ProjectsEndpoint extends ResourceEndpoint {
    private static final Logger.ALogger LOG = Logger.of(ProjectsEndpoint.class);

    private final ProjectService projectService;
    private final MeetingService meetingService;

    @Inject
    public ProjectsEndpoint(ProjectService projectService,
                            MeetingService meetingService) {
        this.projectService = projectService;
        this.meetingService = meetingService;
    }

    // GET {path}/{resource}
    @Transactional
    public Result list() {
        return response(projectService.list());
    }

    // GET {path}/{resource}/:id
    @Transactional
    public Result find(final Integer id) {
        return response(projectService.find(id));
    }

    // POST {path}/{resource}

    @Transactional
    public Result create() {
        return response(projectService.create(request().body().asJson()));
    }

    // PUT {path}/{resource}
    @Transactional
    public Result update() {
        return response(projectService.update(request().body().asJson()));
    }

    // DELETE {path}/{resource}/:id
    @Transactional
    public Result delete(final Integer projectId) {
        return response(projectService.delete(projectId));
    }

    // DELETE {path}/{resource}/:id
    @Transactional
    public Result listMeeting(final Integer projectId) {
        return response(meetingService.findProjectMeetings(projectId));
    }

    @Transactional
    public Result listIssue(final Integer projectId) {
        return response(projectService.listIssue(projectId));
    }

    @Transactional
    public Result createIssue(final Integer projectId) {
        return response(projectService.createIssue(projectId));
    }

    @Transactional
    public Result updateIssue(final Integer projectId) {
        return response(projectService.updateIssue(projectId));
    }
}
