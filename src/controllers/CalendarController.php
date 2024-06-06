<?php
require_once 'src/base/BaseController.php';
require_once 'src/dto/CalendarDto.php';

/*
This controller handles the user input, 
call respective service providers
and return approporate response message
*/
class CalendarController extends BaseController
{
    /*
    Initialize the GoogleCalendarService
    */
    function __construct(private GoogleCalendarService $service)
    {
    }

    /*
    createEventHandler creates event handler method
    */
    function createEventHandler()
    {
        try {
            $eventData = new CalendarDto($this->getRequest());
            $this->service->createEvent($eventData->toArray());
            return $this->setSuccessResponse("Event created successfully!");
        } catch (\Exception $e) {
            return $this->setErrorResponse($e->getMessage());
        }
    }
    /*
    getEventHandler list event handler method
    */
    function getEventListHandler()
    {
        try {
            $events = $this->service->listEvents();
            return $this->setSuccessResponse($events);
        } catch (Exception $e) {
            return $this->setErrorResponse($e->getMessage());
        }
    }

    /*
    deleteEventHandler delete event handler method
    */
    function deleteEventHandler()
    {
        try {
            $eventId = $this->get("id");
            if (empty($eventId)) {
                return $this->setErrorResponse("id is required", 400);
            }
            $this->service->deleteEvent($eventId);
            return $this->setSuccessResponse("Event deleted successfully!");
        } catch (\Exception $e) {
            return $this->setErrorResponse($e->getMessage());
        }
    }
}
