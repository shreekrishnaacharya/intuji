<?php
require_once 'src/components/CalendarDate.php';

class CalendarDto
{
    private string $summary;
    private string $description;
    private CalendarDate $start;
    private CalendarDate $end;

    //converting user submitted event json to dto
    function __construct(array $event)
    {
        try {
            $this->summary = $event["summary"] ?? "";
            $this->description = $event["description"] ?? "";
            $this->start = new CalendarDate($event["start"]);
            $this->end = new CalendarDate($event["end"]);
        } catch (\Exception $ex) {
            throw new \Exception(`Unable to parse calendar event : {$ex->getMessage()}`);
        }
    }

    //Converting the calendar dto into array after validation
    function toArray()
    {
        $this->_validate();
        return [
            "summary" => $this->summary,
            "description" => $this->description,
            "start" => $this->start->toArray(),
            "end" => $this->end->toArray(),
        ];
    }

    function _validate()
    {
        if (empty($this->summary)) {
            throw new \Exception("Summary cannot be empty");
        }
        $this->start->_validate();
        $this->end->_validate();
        return true;
    }
}
