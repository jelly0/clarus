package uk.org.langstone.clarus.domain.meeting.service;

import play.Logger;
import uk.org.langstone.clarus.domain.ServiceResult;

import javax.inject.Inject;

public class FindMeetingOperation {
    private static final Logger.ALogger LOG = Logger.of(FindMeetingOperation.class);


    @Inject
    public FindMeetingOperation() {
    }

    public ServiceResult execute(Integer id) {
        return null;
    }
}
