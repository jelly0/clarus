package uk.org.langstone.clarus.dal.project;

import play.Logger;
import uk.org.langstone.clarus.dal.EntityManagerProvider;
import uk.org.langstone.clarus.domain.SessionStatus;
import uk.org.langstone.clarus.domain.project.model.Project;
import uk.org.langstone.clarus.domain.project.model.ProjectMember;

import javax.inject.Inject;
import java.util.Iterator;
import java.util.List;

public class ProjectRepository {
    private static final Logger.ALogger LOG = Logger.of(ProjectRepository.class);

    private final EntityManagerProvider emProvider;
    private final ProjectMapper projectMapper;

    @Inject
    public ProjectRepository(EntityManagerProvider emProvider,
                             ProjectMapper projectMapper) {
        this.emProvider = emProvider;
        this.projectMapper = projectMapper;
    }

    public Project set(Project project) {
        final ProjectEntity newProjectEntity = projectMapper.projectToEntity(project);

        emProvider.getEntityManager().persist(newProjectEntity);
        project.setId((Integer) emProvider.getEntityManager().getEntityManagerFactory().getPersistenceUnitUtil().getIdentifier(newProjectEntity));
        newProjectEntity.setMembers(projectMapper.projectUsersToEntityList(project));
        emProvider.getEntityManager().merge(newProjectEntity);
        emProvider.getEntityManager().flush();
        emProvider.getEntityManager().refresh(newProjectEntity);

        return projectMapper.projectToBusinessObject(newProjectEntity);
    }

    public Project get(Integer projectId) {
        return projectMapper.projectToBusinessObject(emProvider.getEntityManager().find(ProjectEntity.class, projectId));
    }

    public List<Project> getAll() {
        final List<ProjectEntity> projectEntities = emProvider.getEntityManager().createNamedQuery(ProjectEntity.FIND_ALL).getResultList();
        return projectMapper.projectsToBusinessObjectList(projectEntities);
    }

    public Project update(Project project) {
        final ProjectEntity projectEntityToUpdate = emProvider.getEntityManager().find(ProjectEntity.class, project.getId());

        projectEntityToUpdate.setTitle(project.getTitle());
        projectEntityToUpdate.setProjectCode(project.getProjectCode());
        projectEntityToUpdate.setClient(project.getClient());
        projectEntityToUpdate.setSummary(project.getSummary());
        projectEntityToUpdate.setStatus(project.getStatus());

        for (ProjectMember projectMember : project.getMembers()) {
            if (projectMember.getSessionStatus() == SessionStatus.NEW) {
                final ProjectUserEntity newUserEntity = projectMapper.projectUserToEntity(projectMember, project);

                emProvider.getEntityManager().persist(newUserEntity);
                emProvider.getEntityManager().flush();
                emProvider.getEntityManager().refresh(newUserEntity);
            } else if (projectMember.getSessionStatus() == SessionStatus.REMOVED) {
                for (Iterator<ProjectUserEntity> it = projectEntityToUpdate.getMembers().iterator(); it.hasNext(); ) {
                    final ProjectUserEntity projectUserEntityToCheck = it.next();
                    if (projectUserEntityToCheck.getId().getUserEmail().equals(projectMember.getEmail())) {
                        it.remove();
                        emProvider.getEntityManager().remove(projectUserEntityToCheck);
                        break;
                    }
                }
            }
        }
        emProvider.getEntityManager().merge(projectEntityToUpdate);
        emProvider.getEntityManager().flush();
        emProvider.getEntityManager().refresh(projectEntityToUpdate);

        return projectMapper.projectToBusinessObject(projectEntityToUpdate);
    }

    public void remove(Project project) {
        final ProjectEntity projectToRemove = emProvider.getEntityManager().getReference(ProjectEntity.class, project.getId());
        emProvider.getEntityManager().remove(projectToRemove);
    }
}
