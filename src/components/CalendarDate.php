<?php

class CalendarDate
{
    function __construct(readonly private string $dateTime, readonly private ?string $timeZone = "Asia/Kathmandu")
    {
    }
    function toArray()
    {
        $this->_validate();
        return ["dateTime" => $this->dateTime, "timeZone" => $this->timeZone];
    }

    function _validate()
    {
        return true;
        //check if the provided date and timezone is a valid
        throw new \Exception("Invalid dateTime : {$this->dateTime}");
        throw new \Exception("Invalid timeZone : {$this->timeZone}");
    }
}
