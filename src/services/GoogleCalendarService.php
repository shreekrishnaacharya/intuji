<?php
class GoogleCalendarService
{
    private $service;

    public function __construct(Google_Client $client)
    {
        $service = new Google_Service_Calendar($client);
        $this->service = $service;
    }

    public function listEvents()
    {
        $calendarId = 'primary';
        $optParams = array(
            'maxResults' => 10,
            'orderBy' => 'startTime',
            'singleEvents' => true,
            'timeMin' => date('c'),
        );
        return $this->service->events->listEvents($calendarId, $optParams)->getItems();
    }

    public function createEvent($eventData)
    {
        $event = new Google_Service_Calendar_Event($eventData);
        $calendarId = 'primary';
        return $this->service->events->insert($calendarId, $event);
    }

    public function deleteEvent($eventId)
    {
        $calendarId = 'primary';
        $this->service->events->delete($calendarId, $eventId);
    }
}
