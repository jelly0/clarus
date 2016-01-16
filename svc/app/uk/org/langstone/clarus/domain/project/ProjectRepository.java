package uk.org.langstone.clarus.domain.project;

import uk.org.langstone.clarus.domain.project.model.Project;

import java.util.List;

public interface ProjectRepository {
    Project get(Integer projectId);

    List<Project> getAll();

    void update(Project project);

    void remove(Project project);

    Project set(Project project);
}
